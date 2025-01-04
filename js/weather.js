const LAT = 40.7128
const LONG = -74.0060
const API_KEY = 'f1e7e24cdc87f9baa9683f92fff0535c'

window.myWidgetParam ? window.myWidgetParam : window.myWidgetParam = [];  window.myWidgetParam.push({id: 11,cityid: '5128581',appid: API_KEY,units: 'metric',containerid: 'openweathermap-widget-11',  });  (function() {var script = document.createElement('script');script.async = true;script.charset = "utf-8";script.src = "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";var s = document.getElementsByTagName('script')[0];s.parentNode.insertBefore(script, s);  })();



var weathermap = L.map('weathermap', {
    center: [LAT, LONG],
    zoom: 10
});


var normalMapLayer = L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
    {
        opacity: 1, 
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }
).addTo(weathermap);


var weatherModes = ['temp_new', 'pressure_new', 'precipitation_new', 'wind_new', 'clouds_new'];
var currentWeatherLayer = null;


var marker = L.marker([40.7128, -74.0060]).addTo(weathermap);
marker.bindPopup("This is New York City.");


var weatherControl = L.control({ position: 'topright' });

weatherControl.onAdd = function(map) {
    var div = L.DomUtil.create('div', 'weather-control');
    div.style.background = 'white';
    div.style.padding = '10px';
    div.style.borderRadius = '5px';
    div.style.boxShadow = '0 0 10px rgba(0,0,0,0.3)';

    weatherModes.forEach(function(mode) {
        var button = L.DomUtil.create('button', 'weather-button', div);
        button.innerHTML = mode.replace('_new', '').toUpperCase();
        button.style.margin = '5px';
        button.style.cursor = 'pointer';

        L.DomEvent.on(button, 'click', function(e) {
            L.DomEvent.stopPropagation(e);
            if (currentWeatherLayer) {
                weathermap.removeLayer(currentWeatherLayer);
            }
            currentWeatherLayer = L.tileLayer(
                `https://tile.openweathermap.org/map/${mode}/{z}/{x}/{y}.png?appid=${API_KEY}`, 
                {
                    opacity: 0.6, 
                    attribution: '&copy; <a href="https://www.openweathermap.org">OpenWeatherMap</a>'
                }
            ).addTo(weathermap);
        });
    });

    var clearButton = L.DomUtil.create('button', 'clear-button', div);
    clearButton.innerHTML = "CLEAR FILTERS";
    clearButton.style.margin = '5px';
    clearButton.style.cursor = 'pointer';
    clearButton.style.background = '#ff4d4d';
    clearButton.style.color = 'white';

    L.DomEvent.on(clearButton, 'click', function(e) {
        L.DomEvent.stopPropagation(e);
        if (currentWeatherLayer) {
            weathermap.removeLayer(currentWeatherLayer);
            currentWeatherLayer = null;
        }
    });

    return div;
};

weatherControl.addTo(weathermap);


var sliderControl = L.control({ position: 'bottomleft' });

sliderControl.onAdd = function(map) {
    var container = L.DomUtil.create('div', 'slider-control');
    container.style.background = '#ffffff00';
    container.style.padding = '10px';
    container.style.borderRadius = '5px';
    container.style.boxShadow = '0 0 10px rgba(0,0,0,0.3)';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '10px';

    
    L.DomEvent.disableClickPropagation(container);
    L.DomEvent.disableScrollPropagation(container);

    
    var zoomLabel = L.DomUtil.create('label', '', container);
    zoomLabel.innerHTML = "Zoom";
    var zoomSlider = L.DomUtil.create('input', '', container);
    zoomSlider.style.width = "400px";
    zoomSlider.type = "range";
    zoomSlider.min = weathermap.getMinZoom();
    zoomSlider.max = weathermap.getMaxZoom();
    zoomSlider.value = weathermap.getZoom();
    zoomSlider.oninput = function() {
        weathermap.setZoom(parseInt(zoomSlider.value));
    };

    
    var normalOpacityLabel = L.DomUtil.create('label', '', container);
    normalOpacityLabel.innerHTML = "Normal Map Opacity";
    var normalOpacitySlider = L.DomUtil.create('input', '', container);
    normalOpacitySlider.style.width = "400px";
    normalOpacitySlider.type = "range";
    normalOpacitySlider.min = 0;
    normalOpacitySlider.max = 1;
    normalOpacitySlider.step = 0.025;
    normalOpacitySlider.value = normalMapLayer.options.opacity;
    normalOpacitySlider.oninput = function() {
        normalMapLayer.setOpacity(parseFloat(normalOpacitySlider.value));
    };

    
    var filterOpacityLabel = L.DomUtil.create('label', '', container);
    filterOpacityLabel.innerHTML = "Filter Opacity";
    var filterOpacitySlider = L.DomUtil.create('input', '', container);
    filterOpacitySlider.style.width = "400px";
    filterOpacitySlider.type = "range";
    filterOpacitySlider.min = 0;
    filterOpacitySlider.max = 1;
    filterOpacitySlider.step = 0.025;
    filterOpacitySlider.value = currentWeatherLayer ? currentWeatherLayer.options.opacity : 0.6;
    filterOpacitySlider.oninput = function() {
        if (currentWeatherLayer) {
            currentWeatherLayer.setOpacity(parseFloat(filterOpacitySlider.value));
        }
    };

    return container;
};

sliderControl.addTo(weathermap);


fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LONG}&appid=${API_KEY}&units=metric`)
  .then(response => response.json())
  .then(data => {
    const weatherInfo = `
      Temperature: ${data.main.temp}°C
      <br>Feels Like: ${data.main.feels_like}°C
      <br>Minimum Temperature: ${data.main.temp_min}°C
      <br>Maximum Temperature: ${data.main.temp_max}°C
      <br>Pressure: ${data.main.pressure} hPa
      <br>Humidity: ${data.main.humidity}%
      <br>Wind Speed: ${data.wind.speed} m/s
      <br>Cloudiness: ${data.clouds.all}%
    `;

    document.getElementById("weatherInfo").innerHTML += weatherInfo;
  })
  .catch(error => {
    document.getElementById("weatherInfo").innerHTML = `<p style="color: red;">Error fetching weather data: ${error.message}</p>`;
  });
