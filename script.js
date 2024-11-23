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
        let visitedCount = 0;
        const visitedMarkers = new Set();

        // Counter container
        const counterContainer = document.createElement('div');
        counterContainer.id = 'counterContainer';

        // Counter element
        const counterElement = document.createElement('div');
        counterElement.id = 'counter';
        counterElement.textContent = `Locations clicked: 0 / ${offices.length}`;
        counterContainer.appendChild(counterElement);

        // Reopen Overlay button
        const reopenOverlayButton = document.createElement('button');
        reopenOverlayButton.id = 'reopenOverlay';
        reopenOverlayButton.textContent = 'Reopen Overlay';
        reopenOverlayButton.style.display = 'none'; // Initially hidden
        reopenOverlayButton.onclick = () => {
            overlayBox.style.display = 'block';
        };
        counterContainer.appendChild(reopenOverlayButton);

        document.body.appendChild(counterContainer);

        // Overlay div box
        const overlayBox = document.createElement('div');
        overlayBox.id = 'overlayBox';
        overlayBox.innerHTML = `
            <div id="overlayContent">
                <span id="closeOverlay">&times;</span>
                <h2>Quiz: Test Your Knowledge!</h2>
                <form id="quizForm">
                    <div class="question">
                        <p>1. What is the capital of the United Kingdom?</p>
                        <label><input type="radio" name="q1" value="a"> Manchester</label><br>
                        <label><input type="radio" name="q1" value="b"> Birmingham</label><br>
                        <label><input type="radio" name="q1" value="c"> London</label><br>
                        <label><input type="radio" name="q1" value="d"> Liverpool</label>
                    </div>
                    <div class="question">
                        <p>2. Which company has an office at Martlesham Heath?</p>
                        <label><input type="radio" name="q2" value="a"> Google</label><br>
                        <label><input type="radio" name="q2" value="b"> BT</label><br>
                        <label><input type="radio" name="q2" value="c"> JP Morgan</label><br>
                        <label><input type="radio" name="q2" value="d"> Rokos Capital</label>
                    </div>
                    <div class="question">
                        <p>3. What does "BT" stand for?</p>
                        <label><input type="radio" name="q3" value="a"> British Telecom</label><br>
                        <label><input type="radio" name="q3" value="b"> British Transport</label><br>
                        <label><input type="radio" name="q3" value="c"> Best Telecom</label><br>
                        <label><input type="radio" name="q3" value="d"> Binary Tech</label>
                    </div>
                    <div class="question">
                        <p>4. Where is JP Morgan's Glasgow office located?</p>
                        <label><input type="radio" name="q4" value="a"> Argyle St</label><br>
                        <label><input type="radio" name="q4" value="b"> George St</label><br>
                        <label><input type="radio" name="q4" value="c"> Sauchiehall St</label><br>
                        <label><input type="radio" name="q4" value="d"> Buchanan St</label>
                    </div>
                    <div class="question">
                        <p>5. Which London office is located at One Braham?</p>
                        <label><input type="radio" name="q5" value="a"> JP Morgan</label><br>
                        <label><input type="radio" name="q5" value="b"> BT</label><br>
                        <label><input type="radio" name="q5" value="c"> Rokos Capital</label><br>
                        <label><input type="radio" name="q5" value="d"> Google</label>
                    </div>
                    <button type="button" id="submitQuiz">Submit</button>
                </form>
                <div id="quizResult" style="display: none;">
                    <p id="resultMessage"></p>
                    <button id="retryQuiz">Retry Quiz</button>
                </div>
            </div>
        `;

        // Add event listeners for quiz functionality
        document.body.appendChild(overlayBox);

        document.getElementById('submitQuiz').addEventListener('click', () => {
            const answers = {
                q1: 'c',
                q2: 'b',
                q3: 'a',
                q4: 'a',
                q5: 'b'
            };

            let score = 0;
            const form = document.getElementById('quizForm');
            const formData = new FormData(form);

            for (const [question, correctAnswer] of Object.entries(answers)) {
                if (formData.get(question) === correctAnswer) {
                    score++;
                }
            }

            const passMark = 3; // 60% of 5 questions
            const resultMessage = document.getElementById('resultMessage');
            const quizResult = document.getElementById('quizResult');

            if (score >= passMark) {
                resultMessage.textContent = `Congratulations! You passed with a score of ${score}/5.`;
            } else {
                resultMessage.textContent = `Sorry, you failed with a score of ${score}/5. Please try again.`;
            }

            form.style.display = 'none';
            quizResult.style.display = 'block';
        });

        document.getElementById('retryQuiz').addEventListener('click', () => {
            const form = document.getElementById('quizForm');
            form.reset();
            form.style.display = 'block';

            const quizResult = document.getElementById('quizResult');
            quizResult.style.display = 'none';
        });

        document.body.appendChild(overlayBox);

        // Hide overlay initially
        overlayBox.style.display = 'none';

        // Add event listener to close the overlay
        const closeOverlayButton = document.getElementById('closeOverlay');
        closeOverlayButton.onclick = () => {
            overlayBox.style.display = 'none';
            reopenOverlayButton.style.display = 'block'; // Show the "Reopen Overlay" button
        };

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
                if (!visitedMarkers.has(office.name)) {
                    visitedMarkers.add(office.name);
                    visitedCount++;
                    counterElement.textContent = `Locations clicked: ${visitedCount} / ${offices.length}`;

                    // Show overlay if all locations are clicked
                    if (visitedCount === offices.length) {
                        overlayBox.style.display = 'block';
                        reopenOverlayButton.style.display = 'none'; // Hide "Reopen Overlay" button
                    }
                }

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