
var maps = [];
let selectedWeatherMode = 'clear_filter'; 

var map = L.map('routemap').setView([40.7128, -74.0060], 12);  
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
L.marker([40.7128, -74.0060]).addTo(map).bindPopup('New York City');




