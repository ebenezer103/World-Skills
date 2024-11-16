document.addEventListener('DOMContentLoaded', () => {
    console.log('Page loaded successfully!');

    function initMap() {
        const ukCenter = { lat: 54.5, lng: -3.5 }; // Center of the UK
        const map = new google.maps.Map(document.getElementById('map'), {
            zoom: 6,
            center: ukCenter,
        });

        // Add markers for offices
        const offices = [
            { 
                name: 'BT Office - Martlesham Heath', 
                position: { lat: 52.0597, lng: 1.2581 }, 
                url: 'bt-martlesham.html' 
            },
            { 
                name: 'BT Office - Sheffield Endeavour', 
                position: { lat: 53.3996, lng: -1.4385 }, 
                url: 'bt-sheffield.html' 
            },
            { 
                name: 'BT Office - One Braham, London', 
                position: { lat: 51.5156, lng: -0.0723 }, 
                url: 'bt-london.html' 
            },
            { 
                name: 'Rokos Capital Management', 
                position: { lat: 51.5128, lng: -0.1409 }, 
                url: 'rokos-london.html' 
            },
            { 
                name: 'JP Morgan - Victoria Embankment, London', 
                position: { lat: 51.5108, lng: -0.1044 }, 
                url: 'jp-london-victoria.html' 
            },
            { 
                name: 'JP Morgan - Bank Street, London', 
                position: { lat: 51.5056, lng: -0.0176 }, 
                url: 'jp-london-bank.html' 
            },
            { 
                name: 'JP Morgan - Argyle St, Glasgow', 
                position: { lat: 55.8574, lng: -4.2558 }, 
                url: 'jp-glasgow.html' 
            }
        ];        

        const infoWindow = new google.maps.InfoWindow();

        offices.forEach(office => {
            const marker = new google.maps.Marker({
                position: office.position,
                map: map,
                title: office.name,
            });

            marker.addListener('click', () => {
                // Set the content of the InfoWindow
                infoWindow.setContent(`
                    <div style="text-align: center;">
                        <h2>${office.name}</h2>
                        <button onclick="closeInfoWindow()">Close</button>
                    </div>
                `);

                // Open the InfoWindow at the marker
                infoWindow.open(map, marker);
            });
        });

        // Global function to close the InfoWindow
        window.closeInfoWindow = function() {
            infoWindow.close();
        };
    }
    

    // Initialize the map when the window loads
    window.initMap = initMap;
});