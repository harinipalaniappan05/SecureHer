document.getElementById('contactsForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const contact1 = document.getElementById('contact1').value.trim();
    const contact2 = document.getElementById('contact2').value.trim();
    const contact3 = document.getElementById('contact3').value.trim();

    const phonePattern = /^[0-9]{10}$/;
    let valid = true;

    // Validate contact1
    if (!phonePattern.test(contact1)) {
        document.getElementById('error-contact1').style.display = 'block';
        valid = false;
    } else {
        document.getElementById('error-contact1').style.display = 'none';
    }

    // Validate contact2
    if (!phonePattern.test(contact2)) {
        document.getElementById('error-contact2').style.display = 'block';
        valid = false;
    } else {
        document.getElementById('error-contact2').style.display = 'none';
    }

    // Validate contact3
    if (contact3 && !phonePattern.test(contact3)) {
        document.getElementById('error-contact3').style.display = 'block';
        valid = false;
    } else {
        document.getElementById('error-contact3').style.display = 'none';
    }

    if (valid) {
        // Save contacts to localStorage
        const contacts = {
            contact1: contact1,
            contact2: contact2,
            contact3: contact3
        };
        localStorage.setItem('emergencyContacts', JSON.stringify(contacts));
        document.getElementById('success-section').classList.remove('hidden');

        // Redirect to the next page
        setTimeout(() => {
            window.location.href = 'index2.html'; // Replace with the actual URL of the next page
        }, 2000); // 2 seconds delay
    } else {
        console.error('Validation failed.');
    }
});



