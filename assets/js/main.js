   function openMenu() {
            document.getElementById("mobileNav").classList.toggle("translate-x-full");
        }

        function closeMenu() {
            document.getElementById("mobileNav").classList.add("translate-x-full");
        }
        
 
    
    
    async function loadSlides() {
    try {
        const response = await fetch('https://run.mocky.io/v3/e13e550c-1bdd-48ac-914d-6d6332df0cf8'); // Replace with your raw Pastebin URL
        const data = await response.json();
        const swiperWrapper = document.querySelector('.swiper-wrapper');

        // Clear existing slides
        swiperWrapper.innerHTML = '';

        // Populate Swiper slides dynamically
        data.slides.forEach(slide => {
            const slideElement = document.createElement('div');
            slideElement.classList.add('swiper-slide');
            slideElement.innerHTML = `
                <a href="${slide.url}" target="_blank"> 
                    <img src="${slide.image}" alt="${slide.title}" class="w-full h-auto object-cover">
                    <div class="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                        <h4 class="text-white text-xl font-bold mb-2">${slide.title}</h4>
                        <p class="text-blue-200">${slide.description}</p>
                    </div>
                </a>
            `;
            swiperWrapper.appendChild(slideElement);
        });

        // Reinitialize Swiper after content is loaded
        new Swiper('.swiper-container', {
            loop: true,
            effect: 'slide',
            speed: 800,
            autoplay: {
                delay: 5000,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });

    } catch (error) {
        console.error('Error loading slides:', error);
    }
}

// Load slides on page load
document.addEventListener('DOMContentLoaded', loadSlides);
    
    // Calculate header height and set CSS variable
function updateMenuPosition() {
    const header = document.querySelector('header');
    const headerHeight = header.offsetHeight + 'px';
    document.documentElement.style.setProperty('--header-height', headerHeight);
}

// Update on resize and initial load
window.addEventListener('resize', updateMenuPosition);
document.addEventListener('DOMContentLoaded', () => {
    updateMenuPosition();
    
    // Update menu position when opening
    function openMenu() {
        updateMenuPosition();
        document.getElementById("mobileNav").classList.toggle("translate-x-full");
    }
    
    // Update original openMenu function
    window.openMenu = openMenu;
});
    
          
// Demo Video Modal
// Demo Video Modal
function playDemo() {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80';
    modal.id = "rr";  // Fixed typo
    modal.innerHTML = `
        <div class="relative bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full">
            <button class="absolute -top-12 right-0 text-white text-xl" onclick="closeDemo()">
                <i class="fas fa-times"></i>
            </button>
            <div class="aspect-video rounded-2xl overflow-hidden">
                <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/YOUR_DEMO_VIDEO_ID" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
}

// Function to close the modal
function closeDemo() {
    const modal = document.getElementById('rr');
    if (modal) {
        modal.remove();  // Remove the modal from DOM
        document.body.style.overflow = ''; // Restore scrolling
    }
}


// Notification System
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `fixed bottom-4 right-4 px-6 py-3 rounded-lg text-white ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } transform transition-transform duration-300 translate-y-full`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateY(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateY(full)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

  
