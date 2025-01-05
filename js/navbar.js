document.addEventListener("DOMContentLoaded", function() {
    const headerHTML = `
      <body>
        <div class="navbar">
          <nav>
            <ul>
                <li><a href="./index.html">Home</a></li>
                <li><a href="./gallery.html">Gallery</a></li>
                <li><a href="./culture.html">culture</a></li>
                <li><a href="./map.html">State Maps</a></li>
                <li><a href="./localmaps.html">Local Maps</a></li>
                <li><a href="./weather.html">Weather</a></li>
                <li><a href="./transport.html">Public Transport</a></li>

                <li><a href="./noticeboard.html">Notice Board</a></li>
                <li><a href="./events.html">Events</a></li>
                <li><a href="./hotels.html">Hotels</a></li>
                <li><a href="./tourism.html">tourism</a></li>
                <li><a href="./administration.html">Administration</a></li>
            </ul>
          </nav>
        </div>
      </body>
    `;
    
    
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
  });