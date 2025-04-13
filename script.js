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
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Собираем данные формы
            const formData = new FormData(form);
            const formValues = {};
            for (let [key, value] of formData.entries()) {
                formValues[key] = value;
            }
            
            // В реальном проекте здесь был бы AJAX-запрос к серверу
            console.log('Отправка формы:', formValues);
            
            // Показываем сообщение об успешной отправке
            alert('Спасибо! Ваша заявка принята. Мы свяжемся с вами в ближайшее время.');
            form.reset();
        });
    });
    
    // Обработка выбора модели устройства
    const deviceBrandSelect = document.getElementById('device-brand');
    const deviceModelGroup = document.querySelector('.device-model-group');
    const deviceModelSelect = document.getElementById('device-model');
    
    if (deviceBrandSelect && deviceModelGroup && deviceModelSelect) {
        deviceBrandSelect.addEventListener('change', function() {
            const selectedBrand = this.value;
            
            if (selectedBrand) {
                deviceModelGroup.style.display = 'block';
                
                // Очищаем текущие опции
                deviceModelSelect.innerHTML = '<option value="" disabled selected>Выберите модель</option>';
                
                // Добавляем модели в зависимости от выбранного бренда
                const models = getDeviceModels(selectedBrand);
                models.forEach(model => {
                    const option = document.createElement('option');
                    option.value = model.toLowerCase().replace(/\s+/g, '-');
                    option.textContent = model;
                    deviceModelSelect.appendChild(option);
                });
            } else {
                deviceModelGroup.style.display = 'none';
            }
        });
    }
    
    // Функция для получения моделей устройств
    function getDeviceModels(brand) {
        const models = {
            'iphone': [
                'iPhone 14 Pro Max',
                'iPhone 14 Pro',
                'iPhone 14 Plus',
                'iPhone 14',
                'iPhone 13 Pro Max',
                'iPhone 13 Pro',
                'iPhone 13',
                'iPhone 13 mini',
                'iPhone 12 Pro Max',
                'iPhone 12 Pro',
                'iPhone 12',
                'iPhone 12 mini'
            ],
            'samsung': [
                'Galaxy S23 Ultra',
                'Galaxy S23+',
                'Galaxy S23',
                'Galaxy S22 Ultra',
                'Galaxy S22+',
                'Galaxy S22',
                'Galaxy A54',
                'Galaxy A53',
                'Galaxy A34',
                'Galaxy A23'
            ],
            'xiaomi': [
                'Xiaomi 13 Pro',
                'Xiaomi 13',
                'Xiaomi 12T Pro',
                'Xiaomi 12T',
                'Xiaomi 12 Pro',
                'Xiaomi 12',
                'Xiaomi 11T Pro',
                'Xiaomi 11T',
                'Redmi Note 12 Pro+',
                'Redmi Note 12 Pro'
            ],
            'honor': [
                'Honor Magic5 Pro',
                'Honor Magic5',
                'Honor Magic4 Pro',
                'Honor Magic4',
                'Honor X9a',
                'Honor X8a',
                'Honor X7a',
                'Honor X6a'
            ]
        };
        
        return models[brand] || [];
    }
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

// Анимация появления элементов при прокрутке
const animateOnScroll = function() {
    const elements = document.querySelectorAll('.service-card, .feature, .model-card');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 50) {
            element.classList.add('reveal');
        }
    });
};

// Запускаем анимацию при загрузке и прокрутке
window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);

// Мобильное меню
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
        
        // Закрываем меню при клике на ссылку
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Закрываем меню при клике вне его
    document.addEventListener('click', function(event) {
        if (navMenu && navMenu.classList.contains('active') && 
            !navMenu.contains(event.target) && 
            !menuToggle.contains(event.target)) {
            navMenu.classList.remove('active');
        }
    });
}); 