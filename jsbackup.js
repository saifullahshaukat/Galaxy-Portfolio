document.getElementById('searchButton').addEventListener('click', function() {
    var searchForm = document.getElementById('searchForm');
    if (searchForm.style.display === 'none') {
        searchForm.style.display = 'inline';
        this.style.display = 'none';
    }
});

document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var query = this.querySelector('input[type="search"]').value.toLowerCase();
    var sections = document.querySelectorAll('section');
    sections.forEach(function(section) {
        if (section.textContent.toLowerCase().includes(query)) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    });
    document.getElementById('searchForm').style.display = 'none';
    var searchButton = document.getElementById('searchButton');
    searchButton.style.display = 'inline';
});


// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0); // Make background transparent

// Create a container for the Three.js canvas
const container = document.createElement('div');
container.style.position = 'fixed';
container.style.top = '0';
container.style.left = '0';
container.style.width = '100%';
container.style.height = '100%';
container.style.zIndex = '-1'; // Ensure it is behind other content
document.body.appendChild(container);
container.appendChild(renderer.domElement);

// Particle system for stars
const particleGeometry = new THREE.BufferGeometry();
const particlesCount = 5000;
const particlesPosition = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
    particlesPosition[i] = (Math.random() - 0.5) * 2000; // Spread the particles randomly
}
particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlesPosition, 3));

const particleMaterial = new THREE.PointsMaterial({
    size: 2, // Size of each star
    sizeAttenuation: true,
    color: 0xffffff, // Color of the stars
    transparent: true,
    opacity: 0.8
});

// Create particle system
const particles = new THREE.Points(particleGeometry, particleMaterial);
scene.add(particles);

// Position the camera
camera.position.z = 500;

// Variables to track mouse movement
let mouseX = 0;
let mouseY = 0;
let isMouseMoving = false; // Track if mouse is moving

// Event listener for mouse movement
document.addEventListener('mousemove', (event) => {
    isMouseMoving = true; // Set flag when mouse moves
    mouseX = (event.clientX / window.innerWidth) * 2 - 1; // Normalize between -1 and 1
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

    // Reset the flag after a short delay (to stop the effect when the mouse stops)
    clearTimeout(window.mouseStopTimer);
    window.mouseStopTimer = setTimeout(() => {
        isMouseMoving = false;
    }, 100); // 100 ms delay
});

// Animate function
function animate() {
    requestAnimationFrame(animate);

    // Normal continuous rotation
    particles.rotation.x += 0.0005; // Slow base X rotation
    particles.rotation.y += 0.0005; // Slow base Y rotation

    // If the mouse is moving, apply faster rotation
    if (isMouseMoving) {
        particles.rotation.x += mouseY * 0.025; // Slower response to mouse Y
        particles.rotation.y += mouseX * 0.025; // Slower response to mouse X
    }

    renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

const scaleBox = document.querySelector('.about_grid');
const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
const aboutSecDiv = document.querySelector('.about_sec_div');
const aboutSecDivElements = aboutSecDiv.querySelectorAll('h2, p, .img-fluid, .wrapper');
const aboutFadeInClass = document.querySelector('.about-fade-in-class');
const aboutFadeInClassElements = aboutFadeInClass.querySelectorAll('*'); // Select all elements inside aboutFadeInClass

// Function to adjust the scale and opacity based on scroll position
function adjustScaleOnScroll() {
    const scrollTop = window.scrollY;
    const startScroll = window.innerHeight * 1; // 200vh
    const endScroll = window.innerHeight * 2; // 300vh

    if (scrollTop >= startScroll && scrollTop <= endScroll) {
        // Calculate a scale factor based on how far the user has scrolled (between 1 and 1.6)
        const scaleFactor = 1 + ((scrollTop - startScroll) / (endScroll - startScroll)) * 0.3; // Scales from 1 to 1.3
        // Apply the scale transformation
        scaleBox.style.transform = `scale(${scaleFactor})`;

        // Calculate opacity based on scale factor
        const opacity = 1 - ((scaleFactor - 1) / 0.3);
        aboutSecDivElements.forEach(element => {
            element.style.opacity = opacity;
            element.style.display = opacity === 0 ? 'none' : 'block';
        });

        // Hide the aboutFadeInClass elements
        aboutFadeInClassElements.forEach(element => {
            element.style.opacity = 0;
            element.style.display = 'none';
        });
    } else if (scrollTop < startScroll) {
        scaleBox.style.transform = 'scale(1)';
        aboutSecDivElements.forEach(element => {
            element.style.opacity = 1;
            element.style.display = 'block';
        });

        // Hide the aboutFadeInClass elements
        aboutFadeInClassElements.forEach(element => {
            element.style.opacity = 0;
            element.style.display = 'none';
        });
    } else if (scrollTop > endScroll) {
        scaleBox.style.transform = 'scale(1.3)';
        scaleBox.style.width = `${scaleBox.offsetWidth}px`; // Fix width
        scaleBox.style.height = `${scaleBox.offsetHeight}px`; // Fix height
        aboutSecDivElements.forEach(element => {
            element.style.opacity = 0;
            element.style.display = 'none';
        });

        // Show the aboutFadeInClass elements with a fade-in effect based on scroll position
        const fadeInOpacity = Math.min(1, (scrollTop - endScroll) / (window.innerHeight)); // Adjust fade-in speed
        aboutFadeInClassElements.forEach(element => {
            element.style.display = 'block';
            element.style.opacity = fadeInOpacity;
        });
    }
}

// Add the scroll event listener
window.addEventListener('scroll', adjustScaleOnScroll);











const sectionBanner = document.querySelector('.section-banner');
let bannerX = window.innerWidth / 2;
let bannerY = window.innerHeight / 2;
let bannerSpeedX = 2;
let bannerSpeedY = 2;
let isDragging = false;
let offsetX, offsetY;

function moveBanner() {
    if (!isDragging) {
        bannerX += bannerSpeedX;
        bannerY += bannerSpeedY;

        if (bannerX <= 0 || bannerX >= window.innerWidth - sectionBanner.offsetWidth) {
            bannerSpeedX *= -1;
        }
        if (bannerY <= 0 || bannerY >= window.innerHeight - sectionBanner.offsetHeight) {
            bannerSpeedY *= -1;
        }
    }

    // Ensure the banner stays within the viewport frame
    bannerX = Math.max(0, Math.min(bannerX, window.innerWidth - sectionBanner.offsetWidth));
    bannerY = Math.max(0, Math.min(bannerY, window.innerHeight - sectionBanner.offsetHeight));

    sectionBanner.style.left = `${bannerX}px`;
    sectionBanner.style.top = `${bannerY}px`; // Remove window.scrollY adjustment

    requestAnimationFrame(moveBanner);
}

document.addEventListener('scroll', function() {
    const stars = document.querySelectorAll('#star-1, #star-2, #star-3, #star-4, #star-5, #star-6, #star-7');
    const scrollPosition = window.scrollY;

    stars.forEach(star => {
        const speed = star.getAttribute('data-speed') || 0.5; // Set a default speed or use data-speed attribute for custom speed
        const translateY = scrollPosition * speed; // Adjust speed based on scroll
        star.style.transform = `translateY(${translateY}px)`; // Apply smooth translation
    });

    // Change background image of sectionBanner when scroll crosses 80vh
    if (scrollPosition > window.innerHeight * 0.5) {
        sectionBanner.style.backgroundImage = 'url("/assets/img/test.jpeg")'; // Change to PNG when scroll is past 80vh
    } else {
        sectionBanner.style.backgroundImage = 'url("/assets/img/earth.jpg")'; // Change back to JPG when scroll is within 80vh
    }
});

sectionBanner.addEventListener('mousedown', (event) => {
    isDragging = true;
    offsetX = event.clientX - sectionBanner.getBoundingClientRect().left;
    offsetY = event.clientY - sectionBanner.getBoundingClientRect().top;
});

document.addEventListener('mousemove', (event) => {
    if (isDragging) {
        bannerX = event.clientX - offsetX;
        bannerY = event.clientY - offsetY;

        bannerX = Math.max(0, Math.min(bannerX, window.innerWidth - sectionBanner.offsetWidth));
        bannerY = Math.max(0, Math.min(bannerY, window.innerHeight - sectionBanner.offsetHeight));
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});

window.addEventListener('resize', () => {
    bannerX = Math.min(bannerX, window.innerWidth - sectionBanner.offsetWidth);
    bannerY = Math.min(bannerY, window.innerHeight - sectionBanner.offsetHeight);
});

moveBanner();
