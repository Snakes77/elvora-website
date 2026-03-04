import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase credentials in .env.local");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const contacts = [
    // CONFIRMED ATTENDEES (HOT)
    { name: "Katie & Darren Starr", email: "katie.starr@myhomecare.co.uk\ndarren.starr@myhomecare.co.uk", branch: "West Sussex & Kent", size: "Large", tier: "hot", note: "Managing Director – warmest lead, gave the intro" },
    { name: "Peju Akintomide", email: "peju.akintomide@myhomecare.co.uk", branch: "St Albans / Luton", size: "Large", tier: "hot", note: "Owner, large branch" },
    { name: "Angela Lee & Han Lee", email: "angela.lee@myhomecare.co.uk", branch: "Kingston / New Malden", size: "Small", tier: "hot", note: "Husband & wife owners" },
    { name: "Ashish Majaladi & Sunil", email: "ashish@myhomecare.co.uk\nsunil@myhomecare.co.uk", branch: "Bristol", size: "Medium", tier: "hot", note: "Business partners, good size" },
    { name: "Blessing & Ben Ekundayo", email: "ben@myhomecare.co.uk\nblessing@myhomecare.co.uk", branch: "Oxford, Aylesbury, Hertfordshire", size: "Large", tier: "hot", note: "3 branches + launching supported living – high value" },
    { name: "Caroline Dunn & Piotr Kufel", email: "cdunn@myhomecaredundee.co.uk\npkufel@myhomecaredundee.co.uk", branch: "Dundee", size: "Large", tier: "hot", note: "Very large branch" },
    { name: "Jeanette Chambers (Danielle Millard – Mgr)", email: "jeanette.chambers@myhomecare.co.uk\ndanielle.millard@myhomecare.co.uk", branch: "Sutton & Surrey", size: "Large", tier: "hot", note: "Very large branch" },
    { name: "Danny Sampson", email: "danny.sampson@myhomecare.co.uk", branch: "Crowborough + Brighton (opening)", size: "Large", tier: "hot", note: "Very large, expanding – growth opportunity" },
    { name: "Egle Sakaliene", email: "egle@myhomecare.co.uk", branch: "Haringey / North London", size: "Small", tier: "hot", note: "Smaller branch" },
    { name: "Elaine Wright", email: "elaine.wright@myhomecare.co.uk", branch: "Milton Keynes", size: "Medium", tier: "hot", note: "Mid-sized branch" },
    { name: "Elizabeth Oyerokun & Sam", email: "elizabeth@myhomecare.co.uk", branch: "Barking / Dagenham + Blueboard SL", size: "Medium", tier: "hot", note: "Mid-sized + supported living under Blueboard brand" },
    { name: "Farzana Kausar", email: "farzana.kausa@myhomecare.co.uk", branch: "Peterborough + Bradford + Walsall (new)", size: "Medium", tier: "hot", note: "Expanding – 2 new branches opening soon" },
    { name: "MarkAnthony Emeka Offor", email: "emeka@myhomecare.co.uk\nsussan@myhomecare.co.uk", branch: "Edinburgh", size: "Large", tier: "hot", note: "Very large branch, wife Sussan co-manages" },
    { name: "Glynn Jepson", email: "glyn.jepson@myhomecare.co.uk", branch: "Leeds", size: "Large", tier: "hot", note: "Large branch, business partner absent" },
    { name: "Mbuso Ngubane", email: "mbuso.ngubane@myhomecare.co.uk\nracheal.hughes@myhomecare.co.uk", branch: "Gloucester", size: "Medium", tier: "hot", note: "Good size branch, Racheal (co-owner) not present" },
    { name: "Nasra Mwakalonge", email: "nasra@myhomecare.co.uk", branch: "Staffordshire", size: "Small", tier: "hot", note: "New branch (few months old), small – growth potential" },
    { name: "Olusola Ola", email: "olusola.ola@myhomecare.co.uk", branch: "Glasgow", size: "Large", tier: "hot", note: "Large branch" },
    // CONFIRMED / UNVERIFIED (WARM)
    { name: "Andy Barber", email: "Andy.barber@myhomecare.co.uk", branch: "Stockport", size: "Large", tier: "warm", note: "Confirmed, presence unverified" },
    { name: "Danny Thorpe (Jade Taylor absent)", email: "danny.thorpe@myhomecare.co.uk\njade.taylor@myhomecare.co.uk", branch: "Manchester West", size: "Large", tier: "warm", note: "Father & daughter owners, Jade cancelled morning of" },
    { name: "Joanne & Miriam Downing", email: "joanna.downing@myhomecare.co.uk\nmiriam.downing@myhomecare.co.uk", branch: "Chelmsford", size: "Medium", tier: "warm", note: "Business partners, possibly seen in morning" },
    { name: "Merjury Buwe & Edison Buwe", email: "merjury.buwe@myhomecare.co.uk", branch: "Chesterfield", size: "Small", tier: "warm", note: "Do not believe they showed" },
    { name: "Maryann Ansah", email: "maryann.ansah@myhomecare.co.uk", branch: "Redbridge / Ilford", size: "Small", tier: "warm", note: "Never met, presence unverified" },
    { name: "Leji Oommen & Shiji Oommen", email: "leji@myhomecare.co.uk\nshiji@myhomecare.co.uk", branch: "Leicester Central", size: "Large", tier: "warm", note: "Husband & wife, cancelled morning of" },
    { name: "Nadia Bibi", email: "naz@myhomecare.co.uk", branch: "Wakefield", size: "Medium", tier: "warm", note: "Confirmed but Darren didn't see her" },
];

async function seed() {
    // Format emails correctly. If a contact has multiple emails separated by \n, 
    // we join them with a comma instead so they fit perfectly into a single row's 'email' text column.
    const formattedContacts = contacts.map(c => ({
        name: c.name,
        email: c.email.replace(/\n/g, ', '),
        branch: c.branch,
        size: c.size,
        tier: c.tier,
        note: c.note,
        current_phase: 1,
        status: 'Active'
    }));

    console.log(`Attempting to seed ${formattedContacts.length} contacts...`);

    // Using upsert with 'email' as the conflict constraint so this script is idempotent
    const { data, error } = await supabase
        .from('leads')
        .upsert(formattedContacts, { onConflict: 'email' })
        .select();

    if (error) {
        console.error('❌ Error seeding data:');
        console.error(error.message);
        if (error.code === '42P01') {
            console.error('\n--> Hint: You need to run the CREATE TABLE SQL query in Supabase first!');
        }
    } else {
        console.log(`✅ Successfully seeded ${data.length} contacts! Your database is ready.`);
    }
}

seed();
