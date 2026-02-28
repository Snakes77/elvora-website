// Ultra-Simple Care News Integration for Elvora Consulting
// For now, let's use a simple approach that definitely works

class CareNewsIntegration {
  constructor() {
    this.newsContainer = document.getElementById('cqc-news-container');
    this.lastUpdate = null;
    this.updateInterval = 30 * 60 * 1000; // 30 minutes
    this.init();
    this.setupAutoRefresh();
  }

  async init() {
    // Try to load real-time news from scraper, fallback to static content
    try {
      await this.loadRealTimeNews();
    } catch (error) {
      this.showRealNews();
    }
  }

  setupAutoRefresh() {
    // Set up automatic refresh every 30 minutes
    setInterval(() => {
      this.checkForUpdates();
    }, this.updateInterval);
    
    // Also refresh when page becomes visible (user returns to tab)
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        this.checkForUpdates();
      }
    });
    
    // Add manual refresh button functionality
    const refreshBtn = document.getElementById('refresh-news-btn');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => {
        this.manualRefresh();
      });
    }
  }

  async manualRefresh() {
    const refreshBtn = document.getElementById('refresh-news-btn');
    if (refreshBtn) {
      refreshBtn.textContent = 'Refreshing...';
      refreshBtn.disabled = true;
    }
    
    try {
      await this.loadRealTimeNews();
      this.lastUpdate = new Date();
      
      if (refreshBtn) {
        refreshBtn.textContent = 'Updated!';
        setTimeout(() => {
          refreshBtn.textContent = 'Refresh News';
          refreshBtn.disabled = false;
        }, 2000);
      }
      
    } catch (error) {
      
      if (refreshBtn) {
        refreshBtn.textContent = 'Failed';
        setTimeout(() => {
          refreshBtn.textContent = 'Refresh News';
          refreshBtn.disabled = false;
        }, 2000);
      }
    }
  }

  async checkForUpdates() {
    try {
      await this.loadRealTimeNews();
      this.lastUpdate = new Date();
    } catch (error) {
      // Silent fail - use cached content
    }
  }

  async loadRealTimeNews() {
    try {
      // Try to fetch the news feed JSON file
      const response = await fetch('/news_feed.json');
      if (!response.ok) {
        throw new Error('News feed not available');
      }
      
      const newsItems = await response.json();
      
      if (newsItems && newsItems.length > 0) {
        this.updateNewsContainer(newsItems);
      } else {
        throw new Error('No news items found');
      }
      
    } catch (error) {
      throw error; // Re-throw to trigger fallback
    }
  }

  showRealNews() {
    if (!this.newsContainer) return;
    
    // Show multiple news items for better coverage - Updated with latest CQC news
    const newsItems = [
      {
        date: '19 September 2025',
        title: 'CQC takes action to protect people living at Muscliff Nursing Home in Dorset',
        summary: 'CQC enforcement action taken to protect vulnerable people at Muscliff Nursing Home, demonstrating regulatory oversight and care quality protection.',
        link: 'https://www.cqc.org.uk/news',
        source: 'CQC Press Release'
      },
      {
        date: '19 September 2025',
        title: 'CQC takes action to protect people at Bedfordshire care home',
        summary: 'CQC enforcement action taken to protect vulnerable people at Bedfordshire care home, highlighting ongoing regulatory monitoring.',
        link: 'https://www.cqc.org.uk/news',
        source: 'CQC Press Release'
      },
      {
        date: '19 September 2025',
        title: 'CQC rates the Council of the Isles of Scilly adult social care provision as good',
        summary: 'CQC rates Isles of Scilly adult social care as good, recognizing quality care provision and regulatory compliance.',
        link: 'https://www.cqc.org.uk/news',
        source: 'CQC Press Release'
      },
      {
        date: '3 September 2025',
        title: 'Two appointments to our Executive Team',
        summary: 'New leadership appointments bring fresh expertise to CQC, including focus on adult social care regulation and quality improvement.',
        link: 'https://www.cqc.org.uk/news/two-appointments-our-executive-team',
        source: 'CQC Official'
      }
    ];
    
    // Clear existing cards and create new ones
    this.newsContainer.innerHTML = '';
    
    // Show first 3 news items
    const itemsToShow = newsItems.slice(0, 3);
    
    itemsToShow.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'insight-card';
      card.innerHTML = `
        <div class="insight-date">${item.date}</div>
        <h3>${item.title}</h3>
        <p>${item.summary}</p>
        <a href="${item.link}" target="_blank" class="learn-more-btn">Read Full Article</a>
        <div class="news-source">Source: ${item.source}</div>
      `;
      
      this.newsContainer.appendChild(card);
    });
  }
  
  addMoreNewsItems(items) {
    // Insert additional news items after the first card
    const container = this.newsContainer;
    const firstCard = container.querySelector('.insight-card');
    
    items.forEach((item, index) => {
      const newCard = document.createElement('div');
      newCard.className = 'insight-card';
      newCard.innerHTML = `
        <div class="insight-date">${item.date}</div>
        <h3>${item.title}</h3>
        <p>${item.summary}</p>
        <a href="${item.link}" target="_blank" class="learn-more-btn">Read Full Article</a>
        <div class="news-source">Source: ${item.source}</div>
      `;
      
      // Insert after the first card
      firstCard.parentNode.insertBefore(newCard, firstCard.nextSibling);
    });
  }

  updateNewsContainer(newsItems) {
    if (!this.newsContainer || newsItems.length === 0) return;
    
    // Clear existing cards
    this.newsContainer.innerHTML = '';
    
    // Create cards for first 3 news items
    const itemsToShow = newsItems.slice(0, 3);
    
    itemsToShow.forEach((newsItem, index) => {
      const card = document.createElement('div');
      card.className = 'insight-card';
      card.innerHTML = `
        <div class="insight-date">${this.formatDate(newsItem.date)}</div>
        <h3>${newsItem.title}</h3>
        <p>${newsItem.summary}</p>
        <a href="${newsItem.url}" target="_blank" class="learn-more-btn">Read Full Article</a>
        <div class="news-source">Source: ${newsItem.source}</div>
      `;
      
      this.newsContainer.appendChild(card);
    });
  }

  showFallbackNews() {
    if (!this.newsContainer) return;
    
    // Clear existing cards
    this.newsContainer.innerHTML = '';
    
    // Create 3 fallback news cards
    const fallbackItems = [
      {
        date: 'Latest Update',
        title: 'Care Sector Updates',
        summary: 'Stay informed with the latest care sector news, regulatory updates, and industry insights. Our expert team monitors all developments to keep you ahead.',
        url: 'https://www.cqc.org.uk/news',
        source: 'Elvora Expert Analysis'
      },
      {
        date: 'Recent',
        title: 'CQC Regulatory Changes',
        summary: 'Keep up with the latest CQC regulatory changes and guidance updates that affect care providers across the UK.',
        url: 'https://www.cqc.org.uk/guidance',
        source: 'CQC Official'
      },
      {
        date: 'Ongoing',
        title: 'Care Quality Standards',
        summary: 'Expert analysis of care quality standards and best practices for achieving Outstanding ratings in care settings.',
        url: 'https://www.cqc.org.uk/news',
        source: 'Elvora Consulting'
      }
    ];
    
    fallbackItems.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'insight-card';
      card.innerHTML = `
        <div class="insight-date">${item.date}</div>
        <h3>${item.title}</h3>
        <p>${item.summary}</p>
        <a href="${item.url}" target="_blank" class="learn-more-btn">Read Full Article</a>
        <div class="news-source">Source: ${item.source}</div>
      `;
      
      this.newsContainer.appendChild(card);
    });
  }

  formatDate(dateString) {
    try {
      // Handle different date formats from CQC
      let date;
      
      if (dateString.includes('September 2025')) {
        // Parse "23 September 2025" format
        const parts = dateString.split(' ');
        const day = parts[0];
        const month = parts[1];
        const year = '2025'; // Correct year
        
        // Create proper date string
        const monthMap = {
          'January': '01', 'February': '02', 'March': '03', 'April': '04',
          'May': '05', 'June': '06', 'July': '07', 'August': '08',
          'September': '09', 'October': '10', 'November': '11', 'December': '12'
        };
        
        const formattedDate = `${year}-${monthMap[month]}-${day.padStart(2, '0')}`;
        date = new Date(formattedDate);
      } else {
        date = new Date(dateString);
      }
      
      const now = new Date();
      const diffTime = Math.abs(now - date);
      const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
      
      if (diffHours < 24) return 'Today';
      if (diffHours < 48) return 'Yesterday';
      
      return date.toLocaleDateString('en-GB', { 
        day: 'numeric', 
        month: 'short' 
      });
    } catch (error) {
      return 'Recent';
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  new CareNewsIntegration();
});
