document.addEventListener('DOMContentLoaded', () => {
    console.log('Page loaded successfully!');

    /**
     * Initializes the Google Map and sets up markers with event listeners.
     */
    function initMap() {
        const ukCenter = { lat: 54.5, lng: -3.5 }; // Center of the UK
        const map = new google.maps.Map(document.getElementById('map'), {
            zoom: 6,
            center: ukCenter,
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
        });

        const infoWindow = new google.maps.InfoWindow();
        const visitedMarkers = new Set();
        let visitedCount = 0;

        // Load map marker data
        const offices = loadOfficeData();

        // Initialize counter UI
        const counterElement = initCounter(offices.length);

        // Add markers to the map
        offices.forEach(office => {
            const marker = new google.maps.Marker({
                position: office.position,
                map,
                title: office.name,
                icon: {
                    url: office.icon,
                    scaledSize: new google.maps.Size(60, 60),
                },
            });

            // Marker click event
            marker.addListener('click', () => handleMarkerClick(office, visitedMarkers, infoWindow, map, marker, counterElement, offices.length));
        });
    }

    /**
     * Handles marker click events, updates the counter, and opens the InfoWindow.
     */
    function handleMarkerClick(office, visitedMarkers, infoWindow, map, marker, counterElement, totalMarkers) {
        lastMarkerBeforeQuiz = false;

        if (!visitedMarkers.has(office.name)) {
            visitedMarkers.add(office.name);
            updateCounter(counterElement, visitedMarkers.size, totalMarkers);

            if (visitedMarkers.size === totalMarkers) {
                lastMarkerBeforeQuiz = true;
                infoWindow.close();
                showOverlay();
            }
        }

        if (!lastMarkerBeforeQuiz) {

            infoWindow.setContent(`
            <div class="info-window">
                <h2>${office.name}</h2>
                <p>${office.text}</p>
            </div>
        `);
            infoWindow.open(map, marker);

        }


    }

    /**
     * Initializes and returns the counter element.
     */
    function initCounter(totalMarkers) {
        const counterContainer = document.createElement('div');
        counterContainer.id = 'counterContainer';

        const counterElement = document.createElement('div');
        counterElement.id = 'counter';
        counterElement.textContent = `Locations Discovered: 0 / ${totalMarkers}`;
        counterContainer.appendChild(counterElement);

        document.body.appendChild(counterContainer);
        return counterElement;
    }

    /**
     * Updates the counter display.
     */
    function updateCounter(counterElement, visitedCount, totalMarkers) {
        counterElement.textContent = `Locations Discovered: ${visitedCount} / ${totalMarkers}`;
    }

    /**
     * Loads office data for markers.
     */
    function loadOfficeData() {
        return [
            { 
                name: 'EE Retail Shop - Buchanan St.',
                text: 'This shop implements a closed-door policy which reduces energy waste during heating and air conditioning seasons. Previously, open doors led to significant energy loss, but the new approach has resulted in noticeable energy savings.<br><br>As of mid-year, the shop has achieved a 10% reduction in energy consumption compared to the previous year, demonstrating the impact of this simple yet effective initiative.<br><br><a href="https://www.bt.com/about/digital-impact-and-sustainability/tackling-climate-change" target="_blank" style="font-style: italic;">Reference: BT Impact & Sustainability</a>',
                position: { lat: 55.8596643, lng: -4.258941 },
                icon: 'img/bt-logo.png'
            },
            { 
                name: 'BT Office - Sheffield',
                text: 'This office has significantly reduced CO2 emissions by transitioning its fleet to electric vehicles. By replacing traditional combustion-engine vehicles, the office is lowering its environmental impact while promoting responsible resource use.<br><br>The switch also sets an example for sustainable transportation practices within the industry.<br><br><a href="#" style="font-style: italic;">Reference: BT Intranet</a>',
                position: { lat: 53.3996, lng: -1.4385 },
                icon: 'img/bt-logo.png'
            },
            { 
                name: 'Rokos Capital Management',
                text: 'This office focuses on minimizing energy usage by using energy-efficient equipment and practices. It operates as a zero waste to landfill site, ensuring all waste is recycled in the UK office.<br><br>The team prioritizes sustainability by using recycled paper and partnering with PrintReleaf to offset paper usage. Additionally, they work with ClimeCo to offset carbon emissions through various initiatives, including reforestation projects.<br><br><a href="#" style="font-style: italic;">Reference: RCM Intranet ESG</a>',
                position: { lat: 51.5128, lng: -0.1409 }, 
                icon: 'img/rcm-logo.jpeg'
            },
            { 
                name: 'JP Morgan - Bournemouth',
                text: 'This office fully relies on solar panels installed across the roof to meet its energy needs.<br><br>By shifting entirely to renewable energy, it reduces dependency on non-renewable resources and promotes responsible energy production.<br><br><a href="https://www.bournemouthecho.co.uk/news/18477113.jp-morgan-build-canopy-solar-panels-bournemouth-car-park/" target="_blank" style="font-style: italic;">Reference: Bournemouth Echo</a>',
                position: { lat: 50.7205, lng: -1.8795 }, 
                icon: 'img/jpm-logo.jpg'
            },
            { 
                name: 'JP Morgan - Bank Street, London',
                text: 'This office implements energy-saving algorithms for resources & hardware around the office.<br><br>These systems reduce unnecessary energy consumption in daily operations, aligning with the goal of efficient resource use.<br><br><a href="#" style="font-style: italic;">Reference: JPM Intranet</a>',
                position: { lat: 51.5056, lng: -0.0176 }, 
                icon: 'img/jpm-logo.jpg'
            }
        ];
    }

    // Make initMap globally accessible for Google Maps API callback
    window.initMap = initMap;
});
