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
                text: 'This office focuses on minimizing energy usage by using energy-efficient equipment and practices. It operates as a zero waste to landfill site, ensuring all waste is recycled in the UK office.<br><br>The team prioritizes sustainability by using recycled paper and partnering with PrintReleaf to offset paper usage. Additionally, they work with ClimeCo to offset carbon emissions through various initiatives, including reforestation projects.',
                position: { lat: 51.5128, lng: -0.1409 }, 
                icon: 'img/rcm-logo.jpeg'
            },
            { 
                name: 'JP Morgan - Bournemouth',
                text: 'This office fully relies on solar panels installed across the roof to meet its energy needs.<br><br>By shifting entirely to renewable energy, it reduces dependency on non-renewable resources and promotes responsible energy production.',
                position: { lat: 50.7205, lng: -1.8795 }, 
                icon: 'img/jpm-logo.jpg'
            },
            { 
                name: 'JP Morgan - Bank Street, London',
                text: 'This office implements energy-saving algorithms for resources & hardware around the office.<br><br>These systems reduce unnecessary energy consumption in daily operations, aligning with the goal of efficient resource use.',
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