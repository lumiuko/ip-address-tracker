import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const mapEl = document.getElementById('map')
const map = L.map(mapEl).setView([50.0, 15.0], 4)

const icon = L.icon({
  iconUrl: '/icon-location.svg',
  iconSize: [46, 56],
  iconAnchor: [23, 56]
})

const marker = L.marker([50.0, 15.0], { icon }).setOpacity(0).addTo(map)

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map)

map.zoomControl.remove()

function updateMap({ lat, lng }) {
  const latLng = new L.LatLng(lat, lng)

  marker.setOpacity(1).setLatLng(latLng)
  map.setView(latLng, 12)
}

export { map, marker, updateMap }
