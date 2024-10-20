// Dummy Firebase Authentication (you can integrate Firebase here)
const registerForm = document.getElementById('registerForm');
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const mobile = document.getElementById('mobile').value;

    // Check if the mobile number is a valid 10-digit number
    const mobilePattern = /^[0-9]{10}$/;
    if (!mobilePattern.test(mobile)) {
        alert('Enter a valid 10-digit mobile number');
        return;
    }

    // Show alert for demonstration purposes
    alert(`User registered with mobile: ${mobile}`);

    // Redirect to the emergency contacts page
    window.location.href = 'emergency-contacts.html'; // Make sure this page exists
});




// Google Maps for real-time location tracking
function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 14,
        center: { lat: -34.397, lng: 150.644 }
    });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            const marker = new google.maps.Marker({
                position: userLocation,
                map: map
            });

            map.setCenter(userLocation);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Initialize the map
window.onload = initMap;

// Tap-to-Call Emergency (3 taps to call)
let tapCount = 0;
let tapTimeout;
const contacts = JSON.parse(localStorage.getItem('emergencyContacts')) || [];

const handleTap = () => {
    tapCount += 1;

    if (tapCount === 3) {
        tapCount = 0;
        clearTimeout(tapTimeout);

        if (contacts.length > 0) {
            // Notify each contact that the user is in an unsafe location
            contacts.forEach((contact, index) => {
                setTimeout(() => {
                    alert(`Calling ${contact} to inform that you are in an unsafe place.`);
                    window.open(`tel:${contact}`);
                }, index * 5000); // Call each contact with a 5-second interval
            });
        } else {
            alert('No emergency contacts found. Please register contacts first.');
        }
    } else {
        tapTimeout = setTimeout(() => {
            tapCount = 0;
        }, 1000);
    }
};

// Fetch location data from backend for warning notification (Dummy example)
function checkForUnsafeLocation() {
    const isUnsafe = Math.random() > 0.5; // Random example for demo
    const notification = document.getElementById('warning-notification');

    if (isUnsafe) {
        notification.classList.remove('hidden');
    } else {
        notification.classList.add('hidden');
    }
}

// Check for unsafe location every 10 seconds (for demo)
setInterval(checkForUnsafeLocation, 10000);


