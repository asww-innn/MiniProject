const rssUrls = {
    'events': 'https://api.allorigins.win/raw?url=https://parks.ny.gov/feeds/events.ashx', //prefixed with https://api.allorigins.win/raw?url= for CORS bypass
    'meeting-notices': 'https://api.allorigins.win/raw?url=https://parks.ny.gov/feeds/meeting-notices.ashx', //prefixed with https://api.allorigins.win/raw?url= for CORS bypass
    'press-releases': 'https://api.allorigins.win/raw?url=https://parks.ny.gov/feeds/press-releases.ashx', //prefixed with https://api.allorigins.win/raw?url= for CORS bypass
    'lifestyle': 'https://ny1.com/services/contentfeed.nyc%7call-boroughs%7clifestyles%7con-the-town.landing.rss',
    'news': 'https://ny1.com/services/contentfeed.nyc%7call-boroughs%7cnews.landing.rss'
};

const rssFeedContainer = document.getElementById('rss-feed');

async function fetchRSSFeed(url) {
    const response = await fetch(url);
    const xmlText = await response.text();
    return new window.DOMParser().parseFromString(xmlText, "text/xml");
}

function displayRSSFeed(feed) {
    const items = feed.querySelectorAll('item');
    rssFeedContainer.innerHTML = '';  
    items.forEach(item => {
        const title = item.querySelector('title') ? item.querySelector('title').textContent : 'No title';
        const link = item.querySelector('link') ? item.querySelector('link').textContent : '#';
        let description = item.querySelector('description') ? item.querySelector('description').textContent : 'No description available';
        
        
        if (description.includes('<a href=')) {
            description = description.replace(/<a href="(.*?)">(.*?)<\/a>/g, '<a href="$1" target="_blank">$2</a>');  
        }
        
        const itemElement = document.createElement('div');
        itemElement.classList.add('item');
        itemElement.innerHTML = `
            <h2>${title}</h2>
            <p>${description}</p>
            <a href="${link}" target="_blank">Read more</a>
        `;
        rssFeedContainer.appendChild(itemElement);
    });
}

async function loadFeeds(category) {
    const selectedButton = document.querySelector('.category-button.selected');
    if (selectedButton) {
        selectedButton.classList.remove('selected');
    }
    document.querySelector(`[data-feed="${category}"]`).classList.add('selected');

    try {
        const feed = await fetchRSSFeed(rssUrls[category]);
        displayRSSFeed(feed);
    } catch (error) {
        console.error('Error fetching RSS feed:', error);
        rssFeedContainer.innerHTML = 'Failed to load feeds. Please try again later.';
    }
}


loadFeeds('meeting-notices');
