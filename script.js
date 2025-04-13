// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    // Navigation
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav a');
    
    // Forms
    const forms = document.querySelectorAll('form');
    
    // Initialize
    initNavigation();
    initForms();
    initScrollAnimations();
    initMobileMenu();
    initDeviceModels();
});

// Navigation
function initNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const activeLink = document.querySelector(`nav a[href="${currentPage}"]`);
    
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // Mobile menu toggle
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle sr-only';
    menuToggle.setAttribute('aria-label', 'Toggle menu');
    menuToggle.innerHTML = '<span></span><span></span><span></span>';
    
    const nav = document.querySelector('nav');
    if (nav) {
        nav.parentNode.insertBefore(menuToggle, nav);
        
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    // Плавный скролл для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Forms
function initForms() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = {
                name: formData.get('name'),
                phone: formData.get('phone'),
                email: formData.get('email'),
                device: formData.get('device'),
                'device-model': formData.get('device-model'),
                repair: formData.get('repair'),
                description: formData.get('description'),
                consent: formData.get('consent') === 'on'
            };

            try {
                const response = await fetch('process_form.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();
                
                if (result.success) {
                    alert('Спасибо! Ваша заявка успешно отправлена.');
                    form.reset();
                } else {
                    alert('Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже.');
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Notifications
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Trigger reflow
    notification.offsetHeight;
    
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Инициализация мобильного меню
function initMobileMenu() {
    const menuButton = document.querySelector('.mobile-menu-button');
    const nav = document.querySelector('nav');
    
    if (menuButton && nav) {
        menuButton.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuButton.classList.toggle('active');
        });
        
        // Закрываем меню при клике вне его
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !menuButton.contains(e.target)) {
                nav.classList.remove('active');
                menuButton.classList.remove('active');
            }
        });
    }
}

// Обработчик изменения размера окна с debounce
window.addEventListener('resize', debounce(() => {
    // Здесь можно добавить логику для адаптации под разные размеры экрана
}, 250));

// Каталог моделей устройств
const deviceModels = {
    iphone: [
        "iPhone 15 Pro Max",
        "iPhone 15 Pro",
        "iPhone 15 Plus",
        "iPhone 15",
        "iPhone 14 Pro Max",
        "iPhone 14 Pro",
        "iPhone 14 Plus",
        "iPhone 14",
        "iPhone 13 Pro Max",
        "iPhone 13 Pro",
        "iPhone 13",
        "iPhone 13 mini",
        "iPhone 12 Pro Max",
        "iPhone 12 Pro",
        "iPhone 12",
        "iPhone 12 mini",
        "iPhone 11 Pro Max",
        "iPhone 11 Pro",
        "iPhone 11",
        "iPhone XS Max",
        "iPhone XS",
        "iPhone XR",
        "iPhone X",
        "iPhone 8 Plus",
        "iPhone 8",
        "iPhone SE (2022)",
        "iPhone SE (2020)"
    ],
    samsung: [
        "Samsung Galaxy S24 Ultra",
        "Samsung Galaxy S24+",
        "Samsung Galaxy S24",
        "Samsung Galaxy S23 Ultra",
        "Samsung Galaxy S23+",
        "Samsung Galaxy S23",
        "Samsung Galaxy S22 Ultra",
        "Samsung Galaxy S22+",
        "Samsung Galaxy S22",
        "Samsung Galaxy S21 Ultra",
        "Samsung Galaxy S21+",
        "Samsung Galaxy S21",
        "Samsung Galaxy A54",
        "Samsung Galaxy A53",
        "Samsung Galaxy A34",
        "Samsung Galaxy A23",
        "Samsung Galaxy A13",
        "Samsung Galaxy M54",
        "Samsung Galaxy M53",
        "Samsung Galaxy M33",
        "Samsung Galaxy M23",
        "Samsung Galaxy M13"
    ],
    xiaomi: [
        "Xiaomi 14 Pro",
        "Xiaomi 14",
        "Xiaomi 13T Pro",
        "Xiaomi 13T",
        "Xiaomi 13 Pro",
        "Xiaomi 13",
        "Xiaomi 12T Pro",
        "Xiaomi 12T",
        "Xiaomi 12 Pro",
        "Xiaomi 12",
        "Xiaomi 11T Pro",
        "Xiaomi 11T",
        "Xiaomi 11",
        "Xiaomi Redmi Note 13 Pro+",
        "Xiaomi Redmi Note 13 Pro",
        "Xiaomi Redmi Note 13",
        "Xiaomi Redmi Note 12 Pro+",
        "Xiaomi Redmi Note 12 Pro",
        "Xiaomi Redmi Note 12",
        "Xiaomi Redmi 13C",
        "Xiaomi Redmi 12C",
        "Xiaomi POCO X6 Pro",
        "Xiaomi POCO X6",
        "Xiaomi POCO M6 Pro",
        "Xiaomi POCO M6"
    ],
    honor: [
        "Honor Magic6 Pro",
        "Honor Magic6",
        "Honor Magic5 Pro",
        "Honor Magic5",
        "Honor Magic4 Pro",
        "Honor Magic4",
        "Honor X9b",
        "Honor X9a",
        "Honor X8b",
        "Honor X8a",
        "Honor X7b",
        "Honor X7a",
        "Honor X6b",
        "Honor X6a",
        "Honor X5",
        "Honor Play7",
        "Honor Play6",
        "Honor Play5",
        "Honor Play4",
        "Honor 90",
        "Honor 80",
        "Honor 70",
        "Honor 60",
        "Honor 50"
    ]
};

// Инициализация списков моделей
function initDeviceModels() {
    const brandSelect = document.getElementById('device-brand');
    const modelGroup = document.querySelector('.device-model-group');
    const modelSelect = document.getElementById('device-model');

    if (brandSelect && modelSelect) {
        brandSelect.addEventListener('change', () => {
            const selectedBrand = brandSelect.value;
            
            // Очищаем список моделей
            modelSelect.innerHTML = '<option value="" disabled selected>Выберите модель</option>';
            
            if (selectedBrand && selectedBrand !== 'other') {
                // Показываем группу моделей
                modelGroup.style.display = 'block';
                
                // Добавляем модели для выбранного производителя
                deviceModels[selectedBrand].forEach(model => {
                    const option = document.createElement('option');
                    option.value = model.toLowerCase().replace(/\s+/g, '-');
                    option.textContent = model;
                    modelSelect.appendChild(option);
                });
            } else {
                // Скрываем группу моделей
                modelGroup.style.display = 'none';
            }
        });
    }
} 