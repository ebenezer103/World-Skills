document.addEventListener('DOMContentLoaded', () => {
    console.log('Page loaded successfully!');

    function initMap() {
        const ukCenter = { lat: 54.5, lng: -3.5 }; // Center of the UK
        const map = new google.maps.Map(document.getElementById('map'), {
            zoom: 6,
            center: ukCenter,
        });

        // Add markers for cities
        const cities = [
            { name: 'London', position: { lat: 51.5074, lng: -0.1278 }, url: 'london.html' },
            { name: 'Manchester', position: { lat: 53.4808, lng: -2.2426 }, url: 'manchester.html' },
            { name: 'Edinburgh', position: { lat: 55.9533, lng: -3.1883 }, url: 'edinburgh.html' },
            { name: 'Birmingham', position: { lat: 52.4862, lng: -1.8904 }, url: 'birmingham.html' },
        ];

        cities.forEach(city => {
            const marker = new google.maps.Marker({
                position: city.position,
                map: map,
                title: city.name,
            });

            marker.addListener('click', () => {
                window.location.href = city.url;
            });
        });
    }

    // Initialize the map when the window loads
    window.initMap = initMap;
});