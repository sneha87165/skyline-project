document.addEventListener('DOMContentLoaded', function() {

    // --- 1. Navbar & Dropdown Logic ---
    const navbarToggler = document.getElementById('navbar-toggler');
    const dropdownMenu = document.getElementById('dropdown-menu');
    const dropdownLinks = document.querySelectorAll('.dropdown-item');

    // Toggle dropdown on hamburger click
    navbarToggler.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent click from bubbling up to document
        dropdownMenu.classList.toggle('show');
    });

    // Close dropdown when a link is clicked
    dropdownLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (dropdownMenu.classList.contains('show')) {
                dropdownMenu.classList.remove('show');
            }
        });
    });

    // Close dropdown when clicking anywhere else on the page
    document.addEventListener('click', function() {
        if (dropdownMenu.classList.contains('show')) {
            dropdownMenu.classList.remove('show');
        }
    });

    // --- 2. Passenger Popup & Toggles Logic ---
    
    // Trip Type Toggles
    const btnRoundTrip = document.getElementById('btn-round-trip');
    const btnOneWay = document.getElementById('btn-one-way');
    const fromCountryInput = document.getElementById('from-country');
    const toCountryInput = document.getElementById('to-country');
    const bookingForm = document.querySelector('.search-card form');

    function isForeignCountryName(value) {
        const trimmed = value.trim();
        return /^[A-Za-z\s]+$/.test(trimmed) && trimmed.split(/\s+/).length >= 2;
    }

    if (bookingForm) {
        bookingForm.addEventListener('submit', function(event) {
            const fromValue = fromCountryInput.value;
            const toValue = toCountryInput.value;

            if (!isForeignCountryName(fromValue) || !isForeignCountryName(toValue)) {
                event.preventDefault();
                alert('Please enter a valid foreign country name with at least two words for both From and To.');
            }
        });
    }

    function toggleTripType(activeBtn, inactiveBtn) {
        activeBtn.classList.add('active');
        inactiveBtn.classList.remove('active');
    }

    btnRoundTrip.addEventListener('click', (e) => { e.preventDefault(); toggleTripType(btnRoundTrip, btnOneWay); });
    btnOneWay.addEventListener('click', (e) => { e.preventDefault(); toggleTripType(btnOneWay, btnRoundTrip); });

    // Popup Logic
    const seatPaxInput = document.getElementById('seat-pax-display');
    const passengerPopup = document.getElementById('passenger-popup');
    const btnPaxDone = document.getElementById('btn-pax-done');
    const counts = { adult: 1, child: 0, infant: 0 };

    // Toggle Popup
    seatPaxInput.addEventListener('click', (e) => {
        e.stopPropagation();
        passengerPopup.classList.toggle('d-none');
    });

    // Prevent popup close when clicking inside
    passengerPopup.addEventListener('click', (e) => e.stopPropagation());

    // Close when clicking outside
    document.addEventListener('click', () => {
        if (!passengerPopup.classList.contains('d-none')) passengerPopup.classList.add('d-none');
    });

    // Counter Logic
    function setupCounter(type) {
        const minusBtn = document.getElementById(`pax-${type}-minus`);
        const plusBtn = document.getElementById(`pax-${type}-plus`);
        const display = document.getElementById(`pax-${type}-count`);

        minusBtn.addEventListener('click', () => {
            if (counts[type] > 0) {
                if (type === 'adult' && counts[type] === 1) return; // Min 1 adult
                counts[type]--;
                display.textContent = counts[type];
            }
        });
        plusBtn.addEventListener('click', () => {
            counts[type]++;
            display.textContent = counts[type];
        });
    }
    setupCounter('adult');
    setupCounter('child');
    setupCounter('infant');

    // Done Button
    btnPaxDone.addEventListener('click', () => {
        const totalPax = counts.adult + counts.child + counts.infant;
        const travelClass = document.getElementById('pax-class-select').value;
        seatPaxInput.value = `${totalPax} Pax, ${travelClass}`;
        passengerPopup.classList.add('d-none');
    });

    // --- 3. "Book Now" Button Logic ---
    const bookNowButtons = document.querySelectorAll('.book-now-btn');

    bookNowButtons.forEach(button => {
        button.addEventListener('click', () => {
            alert('Booking Successful!');
        });
    });

});
