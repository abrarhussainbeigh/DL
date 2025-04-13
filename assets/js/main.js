// 🟢 Mobile Menu Functions
function openMenu() {
    const mobileNav = document.getElementById("mobileNav");
    mobileNav.classList.toggle("translate-x-full");
    updateMenuPosition();
}

function closeMenu() {
    document.getElementById("mobileNav").classList.add("translate-x-full");
}

// ✅ Update menu position dynamically
function updateMenuPosition() {
    const header = document.querySelector('header');
    if (header) {
        document.documentElement.style.setProperty('--header-height', header.offsetHeight + 'px');
    }
}

// ✅ Ensure menu position updates on load & resize
window.addEventListener('resize', updateMenuPosition);
document.addEventListener('DOMContentLoaded', updateMenuPosition);

// 🟢 Load Swiper slides dynamically & Lazy-Load Images
async function loadSlides() {
    try {
        const response = await fetch('./assets/data.json');
        if (!response.ok) throw new Error('Failed to load data');

        const data = await response.json();
        const swiperWrapper = document.querySelector('.swiper-wrapper');

        // ✅ Clear existing slides
        swiperWrapper.innerHTML = '';

        // ✅ Populate Swiper slides dynamically with lazy-loading
        data.slides.forEach(slide => {
            const slideElement = document.createElement('div');
            slideElement.classList.add('swiper-slide');
            slideElement.innerHTML = `
                <a href="${slide.url}" target="_blank">
                    <img src="${slide.image}" alt="${slide.title}" loading="lazy" class="w-full h-auto object-cover">
                    <div class="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                        <h4 class="text-white text-xl font-bold mb-2">${slide.title}</h4>
                        <p class="text-blue-200">${slide.description}</p>
                    </div>
                </a>
            `;
            swiperWrapper.appendChild(slideElement);
        });

        // ✅ Reinitialize Swiper after content is loaded
        initSwiper();

    } catch (error) {
        console.error('Error loading slides:', error);
        document.querySelector('.swiper-wrapper').innerHTML = `<p class="text-white text-center">Failed to load slides.</p>`;
    }
}

// 🔴 Initialize Swiper with autoplay fix & lazy-loading
function initSwiper() {
    new Swiper('.swiper-container', {
        loop: true,
        effect: 'slide',
        speed: 800,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false, // ✅ Fix: Keeps autoplay position even after manual swipe
        },
        lazy: true, // ✅ Lazy load images for speed boost
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
}

// ✅ Load slides and initialize Swiper on page load
document.addEventListener('DOMContentLoaded', () => {
    loadSlides();  // Loads slides dynamically
});

// 🎥 Play Demo Modal (Non-blocking execution)
function playDemo() {
    if (document.getElementById('demoModal')) return;

    requestAnimationFrame(() => {
        const modal = document.createElement('div');
        modal.id = "demoModal";
        modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80';
        modal.innerHTML = `
            <div class="relative bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full">
                <button class="absolute -top-12 right-0 text-white text-xl" onclick="closeDemo()">
                    <i class="fas fa-times"></i>
                </button>
                <div class="aspect-video rounded-2xl overflow-hidden">
                    <iframe 
                        width="100%" 
                        height="100%" 
                        src="https://www.youtube.com/embed/0GSf5KUyvss" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
    });
}

// ❌ Close Demo Modal
function closeDemo() {
    const modal = document.getElementById('demoModal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
}

// 🔔 Optimized Notification System (Non-blocking)

/*
function showNotification(message, type = 'success') {
    requestAnimationFrame(() => {
        // Create notification container
        const notification = document.createElement('div');
        notification.className = `fixed bottom-4 right-4 md:bottom-8 md:right-8 px-6 py-4 rounded-xl text-white shadow-xl 
            backdrop-blur-lg border border-white/10 transition-all transform scale-95 opacity-0 z-[1000] 
            ${
                type === 'success' 
                ? 'bg-gradient-to-r from-green-500 to-blue-500' 
                : 'bg-gradient-to-r from-red-500 to-purple-500'
            }`;
        
        // Add text with gradient effect
        notification.innerHTML = `
            <div class="flex items-center space-x-3">
                <i class="${type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-triangle'} text-xl"></i>
                <span class="text-lg font-semibold">${message}</span>
            </div>
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'scale(1)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'scale(0.95)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    });
}


function showNotification(message, type = 'success') {
    requestAnimationFrame(() => {
        // Create notification container
        const notification = document.createElement('div');
        notification.className = `fixed top-6 left-1/2 transform -translate-x-1/2 px-4 py-3 rounded-xl text-white shadow-xl 
            backdrop-blur-lg border border-white/10 transition-all scale-95 opacity-0 z-[1000] flex items-center space-x-3 
            ${
                type === 'success' 
                ? 'bg-gradient-to-r from-green-500 to-blue-500' 
                : 'bg-gradient-to-r from-red-500 to-purple-500'
            }`;

        // Add text and icon
        notification.innerHTML = `
            <i class="${type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-triangle'} text-xl"></i>
            <span class="text-lg font-semibold whitespace-nowrap">${message}</span>
        `;

        // Append to body
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(-50%) scale(1)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(-50%) scale(0.95)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    });
}

*/

function showNotification(message, type = 'success') {
    requestAnimationFrame(() => {
        // Check if toolbar exists
        const header = document.querySelector('header');
        const toolbarHeight = header ? header.offsetHeight + 16 : 64; // 16px gap

        // Create notification container
        const notification = document.createElement('div');
        notification.className = `fixed left-1/2 transform -translate-x-1/2 px-4 py-3 rounded-xl text-white shadow-xl 
            backdrop-blur-lg border border-white/10 transition-all scale-95 opacity-0 z-[1000] flex items-center space-x-3 
            ${
                type === 'success' 
                ? 'bg-gradient-to-r from-green-500 to-blue-500' 
                : 'bg-gradient-to-r from-red-500 to-purple-500'
            }`;

        // Set position below the toolbar
        notification.style.top = `${toolbarHeight}px`;

        // Add text and icon
        notification.innerHTML = `
            <i class="${type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-triangle'} text-xl"></i>
            <span class="text-lg font-semibold whitespace-nowrap">${message}</span>
        `;

        // Append to body
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(-50%) scale(1)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(-50%) scale(0.95)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    });
}



 // Elements ko select karo
        const modal = document.getElementById("gdprModal");
        const openBtn = document.getElementById("openModalBtn");
         
        const gdprContent = document.getElementById("gdprContent");

        // Function: GDPR content load karne ka
        function loadGDPRContent() {
            fetch("gdpr.html") // External HTML file ka path
                .then(response => response.text())
                .then(data => {
                    gdprContent.innerHTML = data; // GDPR ka content modal me inject karo
                })
                .catch(error => {
                    gdprContent.innerHTML = "<p class='text-red-500'>Error loading content.</p>";
                    console.error("Error loading GDPR content:", error);
                });
        }

        // Open Modal
        openBtn.addEventListener("click", function () {
            modal.classList.remove("hidden"); 
            loadGDPRContent(); // Content load karo jab modal khule
        });

         

        // Click outside to close
        window.addEventListener("click", function (event) {
            if (event.target === modal) {
                modal.classList.add("hidden");
            }
        });
        
         // Elements ko select karo
        const privacyModal = document.getElementById("privacyModal");
        const openPrivacyBtn = document.getElementById("openPrivacyBtn");
         
        const privacyContent = document.getElementById("privacyContent");

        // Function: Privacy Policy content load karne ka
        function loadPrivacyContent() {
            fetch("privacy-policy.html") // External HTML file ka path
                .then(response => response.text())
                .then(data => {
                    privacyContent.innerHTML = data; // Privacy policy ka content modal me inject karo
                })
                .catch(error => {
                    privacyContent.innerHTML = "<p class='text-red-500'>Error loading content.</p>";
                    console.error("Error loading Privacy Policy content:", error);
                });
        }

        // Open Modal
        openPrivacyBtn.addEventListener("click", function () {
            privacyModal.classList.remove("hidden"); 
            loadPrivacyContent(); // Content load karo jab modal khule
        });

      

        // Click outside to close
        window.addEventListener("click", function (event) {
            if (event.target === privacyModal) {
                privacyModal.classList.add("hidden");
            }
        });
        
        
        
