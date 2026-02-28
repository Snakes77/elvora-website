// Ultra-Simple RSS Service for Elvora Consulting
// Monitors 3 reliable sources, updates every 4 hours

const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
const PORT = process.env.PORT || 3000;

// Simple in-memory cache (resets on restart)
let newsCache = {
  items: [],
  lastUpdate: 0,
  updateInterval: 4 * 60 * 60 * 1000 // 4 hours
};

// Targeted Sources for Adult Social Care Sector
const sources = [
  {
    name: 'CQC Adult Social Care',
    url: 'https://www.cqc.org.uk/guidance-regulation/providers/adult-social-care',
    selector: '.field-content, .news-item, article',
    baseUrl: 'https://www.cqc.org.uk',
    maxItems: 2,
    keywords: ['care home', 'home care', 'domiciliary', 'adult social care', 'residential care']
  },
  {
    name: 'CQC Care Homes',
    url: 'https://www.cqc.org.uk/search/all?filters%5B%5D=services%3Acare-home&radius=all',
    selector: '.field-content, .search-result',
    baseUrl: 'https://www.cqc.org.uk',
    maxItems: 2,
    keywords: ['care home', 'residential', 'nursing home']
  },
  {
    name: 'CQC Home Care',
    url: 'https://www.cqc.org.uk/search/all?filters%5B%5D=services%3Aservices-in-home&radius=all',
    selector: '.field-content, .search-result',
    baseUrl: 'https://www.cqc.org.uk',
    maxItems: 2,
    keywords: ['home care', 'domiciliary', 'services in home']
  },
  {
    name: 'CQC News',
    url: 'https://www.cqc.org.uk/news',
    selector: '.field-content',
    baseUrl: 'https://www.cqc.org.uk',
    maxItems: 2,
    keywords: ['care home', 'home care', 'adult social care', 'domiciliary', 'residential']
  },
  {
    name: 'CQC Press Releases',
    url: 'https://www.cqc.org.uk/search/press-releases',
    selector: '.field-content',
    baseUrl: 'https://www.cqc.org.uk',
    maxItems: 2,
    keywords: ['care home', 'home care', 'adult social care', 'domiciliary', 'residential']
  }
];

// Check if content is relevant to adult social care
function isRelevantContent(title, summary, keywords) {
  const text = (title + ' ' + (summary || '')).toLowerCase();
  
  // Must contain at least one relevant keyword
  const hasKeyword = keywords.some(keyword => text.includes(keyword.toLowerCase()));
  
  // Exclude irrelevant content
  const excludeTerms = ['dentist', 'hospital', 'gp', 'clinic', 'mental health', 'nhs trust', 'ambulance'];
  const hasExcludeTerm = excludeTerms.some(term => text.includes(term));
  
  return hasKeyword && !hasExcludeTerm;
}

// Fetch news from a single source
async function fetchFromSource(source) {
  try {
    console.log(`Fetching from ${source.name}...`);
    const response = await axios.get(source.url, {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ElvoraRSS/1.0)'
      }
    });
    
    const $ = cheerio.load(response.data);
    const items = [];
    
    $(source.selector).slice(0, source.maxItems || 2).each((i, element) => {
      const $el = $(element);
      const title = $el.find('h2, h3, h4, a').first().text().trim();
      const link = $el.find('a').first().attr('href');
      const summary = $el.find('p').first().text().trim();
      
      if (title && title.length > 10) {
        // Check if content is relevant to adult social care
        const isRelevant = isRelevantContent(title, summary, source.keywords);
        
        if (isRelevant) {
          items.push({
            title: title.substring(0, 80) + (title.length > 80 ? '...' : ''),
            link: link ? (link.startsWith('http') ? link : source.baseUrl + link) : source.url,
            summary: summary ? summary.substring(0, 150) + (summary.length > 150 ? '...' : '') : 'Latest update from ' + source.name,
            source: source.name,
            date: new Date().toISOString()
          });
        }
      }
    });
    
    return items;
  } catch (error) {
    console.error(`Error fetching from ${source.name}:`, error.message);
    return [];
  }
}

// Update news cache
async function updateNews() {
  try {
    console.log('Updating news cache...');
    const allItems = [];
    
    // Fetch from all sources in parallel
    const promises = sources.map(source => fetchFromSource(source));
    const results = await Promise.all(promises);
    
    // Combine and deduplicate
    results.forEach(items => allItems.push(...items));
    
    // Simple deduplication by title similarity
    const uniqueItems = [];
    allItems.forEach(item => {
      const isDuplicate = uniqueItems.some(existing => 
        existing.title.toLowerCase().includes(item.title.toLowerCase().substring(0, 20)) ||
        item.title.toLowerCase().includes(existing.title.toLowerCase().substring(0, 20))
      );
      if (!isDuplicate) {
        uniqueItems.push(item);
      }
    });
    
    // Sort by date and take top 6 for better coverage
    newsCache.items = uniqueItems
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 6);
    
    newsCache.lastUpdate = Date.now();
    console.log(`Updated cache with ${newsCache.items.length} items`);
    
  } catch (error) {
    console.error('Error updating news:', error.message);
  }
}

// Generate RSS XML
function generateRSS() {
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Elvora Consulting - Care Sector News</title>
    <description>Latest news from the care sector</description>
    <link>https://elvoraconsulting.co.uk</link>
    <lastBuildDate>${new Date().toISOString()}</lastBuildDate>
    ${newsCache.items.map(item => `
    <item>
      <title><![CDATA[${item.title}]]></title>
      <description><![CDATA[${item.summary}]]></description>
      <link>${item.link}</link>
      <pubDate>${new Date(item.date).toUTCString()}</pubDate>
      <source>${item.source}</source>
    </item>`).join('')}
  </channel>
</rss>`;
  return rss;
}

// Generate JSON for website
function generateJSON() {
  return {
    lastUpdate: newsCache.lastUpdate,
    items: newsCache.items,
    status: 'success'
  };
}

// Routes
app.get('/rss', (req, res) => {
  res.set('Content-Type', 'application/rss+xml');
  res.send(generateRSS());
});

app.get('/news', (req, res) => {
  res.set('Content-Type', 'application/json');
  res.set('Access-Control-Allow-Origin', '*');
  res.send(generateJSON());
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    lastUpdate: newsCache.lastUpdate,
    itemsCount: newsCache.items.length 
  });
});

// Check if we need to update
function checkAndUpdate() {
  const now = Date.now();
  if (now - newsCache.lastUpdate > newsCache.updateInterval) {
    updateNews();
  }
}

// Initial update
updateNews();

// Check every hour
setInterval(checkAndUpdate, 60 * 60 * 1000);

app.listen(PORT, () => {
  console.log(`RSS Service running on port ${PORT}`);
  console.log(`RSS Feed: http://localhost:${PORT}/rss`);
  console.log(`JSON API: http://localhost:${PORT}/news`);
});
1