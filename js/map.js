let map = L.map('map').setView([46.603354, 1.888334], 6);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let icon1 = L.icon({
    iconUrl: 'resources/markers/icon1.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -42]
})
let icon2 = L.icon({
    iconUrl: 'resources/markers/icon2.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -42]
})
let icon3 = L.icon({
    iconUrl: 'resources/markers/icon3.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -42]
})

orders.forEach(order => {
    let orderNum = order.order_number
    let savedLat = localStorage.getItem(orderNum + "-lat")
    let savedLon = localStorage.getItem(orderNum + "-lon")
    if (savedLat) {
        console.log(savedLat + " " + savedLon)
        let delDate = localStorage.getItem(orderNum)
        let marker
        switch (delDate) {
            case '26/01/2026':
                marker = L.marker([savedLat, savedLon], { icon: icon1 }).addTo(map);
                break;
            case '27/01/2026':
                marker = L.marker([savedLat, savedLon], { icon: icon2 }).addTo(map);
                break;
            case '28/01/2026':
                marker = L.marker([savedLat, savedLon], { icon: icon3 }).addTo(map);
                break;

            default:
                break;
        }
        marker.bindPopup(`<b>${orderNum}</b><br>Livraison le ${delDate}`);

    }

});
