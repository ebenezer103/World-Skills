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
                url: 'bt-martlesham.html',
                icon: 'img/bt-logo.png'
            },
            { 
                name: 'BT Office - Sheffield Endeavour', 
                position: { lat: 53.3996, lng: -1.4385 }, 
                url: 'bt-sheffield.html',
                icon: 'img/bt-logo.png'
            },
            { 
                name: 'BT Office - One Braham, London', 
                position: { lat: 51.5156, lng: -0.0723 }, 
                url: 'bt-london.html',
                icon: 'img/bt-logo.png'
            },
            { 
                name: 'Rokos Capital Management', 
                position: { lat: 51.5128, lng: -0.1409 }, 
                url: 'rokos-london.html',
                icon: 'img/rcm-logo.jpeg'
            },
            { 
                name: 'JP Morgan - Victoria Embankment, London', 
                position: { lat: 51.5108, lng: -0.1044 }, 
                url: 'jp-london-victoria.html',
                icon: 'img/jpm-logo.jpg'
            },
            { 
                name: 'JP Morgan - Bank Street, London', 
                position: { lat: 51.5056, lng: -0.0176 }, 
                url: 'jp-london-bank.html',
                icon: 'img/jpm-logo.jpg'
            },
            { 
                name: 'JP Morgan - Argyle St, Glasgow', 
                position: { lat: 55.8574, lng: -4.2558 }, 
                url: 'jp-glasgow.html',
                icon: 'img/jpm-logo.jpg'
            }
        ];        

        const infoWindow = new google.maps.InfoWindow();

        offices.forEach(office => {
            const marker = new google.maps.Marker({
                position: office.position,
                map: map,
                title: office.name,
                icon: {
                    url: office.icon,
                    scaledSize: new google.maps.Size(60, 60)
                }
            });

            marker.addListener('click', () => {
                // Set the content of the InfoWindow
                infoWindow.setContent(`
                <div style="text-align: center; font-family: Arial, sans-serif; padding: 10px; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.3);">
                    <h2 style="margin: 0; color: #333;">${office.name}</h2>
                    <p style="margin: 10px 0; color: #666;">This is one of our prestigious offices located at a prime location.</p>
                    <button onclick="closeInfoWindow()" style="background-color: #007BFF; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">Close</button>
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