//  header js
// start
const menu = document.querySelector('.menu');
const openMenuBtn = document.querySelector('.open-menu-btn');
const closeMenuBtn = document.querySelector('.close-menu-btn');

// Check if menu, openMenuBtn, and closeMenuBtn are selected correctly
console.log(menu);
console.log(openMenuBtn);
console.log(closeMenuBtn);

// Add event listeners to open and close menu buttons
[openMenuBtn, closeMenuBtn].forEach((btn) => {
	btn.addEventListener('click', () => {
		menu.classList.toggle('open');
		menu.style.transition = 'transform 0.5s ease';
	});
});

menu.addEventListener('transitionend', function () {
	this.removeAttribute('style');
});

menu.querySelectorAll('.dropdown > i').forEach((arrow) => {
	arrow.addEventListener('click', function () {
		this.closest('.dropdown').classList.toggle('active');
	});
});

// ********END OF HEADER FUNCTIONALITY********

// ********START OF DATE FUNCTION********
// Function to update date and time for all elements with class 'date'
function updateDateTimeForAll() {
	// Get all elements with class 'date'
	const dateElement = document.getElementById('date');

	// Get current date and time
	const currentDate = new Date();

	// Format date (e.g., "Apr 15, 2024")
	const formattedDate = currentDate.toLocaleDateString('en-US', {
		month: 'short',
		day: '2-digit',
		year: 'numeric',
	});

	// Format time (e.g., "12:34:56 PM")
	const formattedTime = currentDate.toLocaleTimeString('en-US', {
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
	});

	// Update the content of the date element with formatted date and time
	dateElement.textContent = formattedDate + ' ' + formattedTime;
}

// Call the function initially to set the date and time
updateDateTimeForAll();

// Update date and time every second (1000 milliseconds)
setInterval(updateDateTimeForAll, 1000);

// END OF DATE FUNCTION
// ******************************************************************************************
// CAROUSEL FUNCTIONALITY
document.addEventListener('DOMContentLoaded', function () {
	const items = document.querySelectorAll('#carousel .carousel-item');
	let currentItem = 0;

	function showItem(index) {
		// Remove 'active' class from all items
		items.forEach((item) => item.classList.remove('active'));

		// Add 'active' class to the specified index
		items[index].classList.add('active');
	}

	// Show the first item initially
	showItem(currentItem);

	// Set interval to switch items based on animation timings
	setInterval(() => {
		currentItem = (currentItem + 1) % items.length;
		showItem(currentItem);
	}, 6000); // Adjust interval (in milliseconds) based on your preference
});

// END OF CAROUSEL FUNCTION

// ********************************************************************************************

// DYNAMIC TEXT

const texts = ['WELCOME', 'KÁÀBỌ̀'];
let index = 0;
let letterIndex = 0;
let isDeleting = false;

function type() {
	const text = texts[index];
	const speed = 500; // Typing speed in milliseconds
	const deletingSpeed = 500; // Deleting speed in milliseconds

	if (isDeleting) {
		letterIndex--;
	} else {
		letterIndex++;
	}

	document.getElementById('dynamic-text').innerHTML = text.substring(
		0,
		letterIndex
	);

	if (!isDeleting && letterIndex === text.length) {
		// When the entire text is typed, start deleting after a pause
		isDeleting = true;
		setTimeout(type, 1000); // Wait before starting to delete
	} else if (isDeleting && letterIndex === 0) {
		// When the entire text is deleted, move to the next text
		isDeleting = false;
		index = (index + 1) % texts.length; // Move to the next text
		setTimeout(type, 500); // Wait before starting to type the next text
	} else {
		// Continue typing or deleting
		setTimeout(type, isDeleting ? deletingSpeed : speed);
	}
}
window.onload = type;

// END OF DYNAMIC TEXT

// **************************************************************************************************

// IMPORT MAP

document.addEventListener('DOMContentLoaded', function () {
	const center = { lat: 51.5074, lng: -0.1278 }; // Example: London

	const map = new google.maps.Map(document.getElementById('map'), {
		center: center,
		zoom: 12,
	});

	const marker = new google.maps.Marker({
		position: center,
		map: map,
		title: 'My Location',
	});
});

// END OF IMPORT MAP

// ***************************************************************************

// HISTORY NUMBER COUNT
document.addEventListener('DOMContentLoaded', function () {
	const counters = document.querySelectorAll('.counter');
	const speed = 200; // The lower the value, the faster the animation

	counters.forEach((counter) => {
		const target = +counter.getAttribute('data-target');
		const increment = target / speed;

		const countSpan = counter.querySelector('.count');
		const text = counter.innerText.replace(/\d+/g, '');

		const updateCount = () => {
			const count = +countSpan.innerText;
			if (count < target) {
				countSpan.innerText = Math.ceil(count + increment);
				setTimeout(updateCount, 1);
			} else {
				countSpan.innerText = target;
			}
		};

		updateCount();
	});
});

// TO TOP BUTTON FUNCTION
window.addEventListener('scroll', function () {
	var homeSection = document.getElementById('home');
	var button = document.getElementById('menuToTopBtn');

	// Get the height of the home section
	var homeSectionHeight = homeSection.offsetHeight;

	// Check if we have scrolled past the home section
	if (window.scrollY > homeSectionHeight) {
		button.classList.add('show');
	} else {
		button.classList.remove('show');
	}
});

// ABOUT IMAGE CAROUSEL
document.addEventListener('DOMContentLoaded', function () {
	var photos = document.querySelectorAll('.photo');
	var index = 0;

	function showNextPhoto() {
		photos[index].classList.remove('active');
		index = (index + 1) % photos.length;
		photos[index].classList.add('active');
	}

	setInterval(showNextPhoto, 6000); // Change photo every 3 seconds
});

// CONTACT FORM
function sendEmail() {
	const name = document.getElementById('name');
	const email = document.getElementById('email');
	const phoneNumber = document.getElementById('number');
	const subject = document.getElementById('subject');
	const msg = document.getElementById('message');

	const bodyMessage = `Full Name: ${name.value} <br> Email: ${email.value} <br> Phone Number: ${phoneNumber.value} <br> Message: ${msg.value}`;

	Email.send({
		SecureToken: '797bea46-45ae-4ad7-87e8-2ba39fd7bc55',
		To: 'stpaulkorede@gmail.com',
		From: document.getElementById('email').value,
		Subject: subject.value,
		Body: bodyMessage,
	}).then((message) => {
		if ((message = 'OK')) {
			Swal.fire({
				title: 'Success',
				text: 'Your Message has been sent successfully',
				icon: 'success',
			});
		}
	});
}

// COPYRIGHT FOOTER
let footerParagraph = document.getElementById('footerParagraph');
let date = new Date();
let year = date.getFullYear();
footerParagraph.innerHTML = `&copy; ${year} St. Paul Catholic Church. All Rights Reserved`;
