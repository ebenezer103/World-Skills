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
                text: 'This is one of our prestigious offices located at a prime location.',
                position: { lat: 52.0597, lng: 1.2581 }, 
                icon: 'img/bt-logo.png'
            },
            { 
                name: 'BT Office - Sheffield Endeavour',
                text: 'This is one of our prestigious offices located at a prime location.',
                position: { lat: 53.3996, lng: -1.4385 },
                icon: 'img/bt-logo.png'
            },
            { 
                name: 'BT Office - One Braham, London',
                text: 'This is one of our prestigious offices located at a prime location.',
                position: { lat: 51.5156, lng: -0.0723 }, 
                icon: 'img/bt-logo.png'
            },
            { 
                name: 'Rokos Capital Management',
                text: 'This is one of our prestigious offices located at a prime location.',
                position: { lat: 51.5128, lng: -0.1409 }, 
                icon: 'img/rcm-logo.jpeg'
            },
            { 
                name: 'JP Morgan - Victoria Embankment, London',
                text: 'This is one of our prestigious offices located at a prime location.',
                position: { lat: 51.5108, lng: -0.1044 }, 
                icon: 'img/jpm-logo.jpg'
            },
            { 
                name: 'JP Morgan - Bank Street, London',
                text: 'This is one of our prestigious offices located at a prime location.',
                position: { lat: 51.5056, lng: -0.0176 }, 
                icon: 'img/jpm-logo.jpg'
            },
            { 
                name: 'JP Morgan - Argyle St, Glasgow',
                text: 'This is one of our prestigious offices located at a prime location.',
                position: { lat: 55.8574, lng: -4.2558 }, 
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
                <div class="info-window">
                    <h2>${office.name}</h2>
                    <p>${office.text}</p>
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