document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const container = document.querySelector('.container');
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const leftContainer = document.getElementById('leftContainer');
    const images = [document.getElementById('image0'), document.getElementById('image1')];
    const backgroundImages = document.querySelectorAll('.background-image');
    
    // State
    let isDark = false;
    let currentImageIndex = 0;
    let isLoaded = false;
    let backgroundCurrentIndex = 0;
    const totalBackgroundImages = backgroundImages.length;
    
    // Functions
    function toggleTheme() {
        isDark = !isDark;
        container.classList.toggle('dark');
        themeIcon.src = isDark ? '/icons/moon.svg' : '/icons/sun.svg';
    }
    
    function switchImage() {
        images[currentImageIndex].style.opacity = '0';
        currentImageIndex = (currentImageIndex + 1) % images.length;
        images[currentImageIndex].style.opacity = '1';
    }
    
    function handleMouseMove(event) {
        const rect = leftContainer.getBoundingClientRect();
        const mouseX = ((event.clientX - rect.left) / rect.width) * 100;
        const mouseY = ((event.clientY - rect.top) / rect.height) * 100;
        
        // Add subtle parallax effect to background images
        images.forEach(image => {
            const img = image.querySelector('img');
            img.style.transform = `translate(${mouseX / 50}px, ${mouseY / 50}px)`;
        });
    }

    // Background image functions
    function updateImageClasses() {
        backgroundImages.forEach((image, index) => {
            image.classList.remove('active', 'prev', 'next');
            
            if (index === backgroundCurrentIndex) {
                image.classList.add('active');
            } else if (index === getPrevIndex()) {
                image.classList.add('prev');
            } else if (index === getNextIndex()) {
                image.classList.add('next');
            }
        });
    }

    function getPrevIndex() {
        return (backgroundCurrentIndex - 1 + totalBackgroundImages) % totalBackgroundImages;
    }

    function getNextIndex() {
        return (backgroundCurrentIndex + 1) % totalBackgroundImages;
    }

    function switchBackgroundImage() {
        backgroundCurrentIndex = getNextIndex();
        updateImageClasses();
    }

    // Login handling function
    async function handleLogin(email, password) {
        try {
            // Here you would typically make an API call to verify credentials
            // For now, we'll simulate a successful login
            
            // You can add your authentication logic here
            // For example:
            // const response = await fetch('/api/login', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ email, password })
            // });
            
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Redirect to dashboard
            window.location.href = '/dashboard.html';
            
        } catch (error) {
            console.error('Login failed:', error);
            // Handle login error (show message to user, etc.)
        }
    }
    
    // Event Listeners
    themeToggle.addEventListener('click', toggleTheme);
    leftContainer.addEventListener('mousemove', handleMouseMove);
    
    // Form handling
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Log the attempt and handle login
        console.log('Login attempt:', { email, password });
        handleLogin(email, password);
    });
    
    // Initialize
    setTimeout(() => {
        isLoaded = true;
        container.style.opacity = '1';
    }, 100);
    
    // Initialize background images
    updateImageClasses();
    
    // Start both image rotations
    setInterval(switchBackgroundImage, 5000);
    setInterval(switchImage, 5000);
}); 