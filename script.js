// Smooth scrolling para los enlaces del navbar
const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Animaciones on-scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.problema-card, .servicio-card, .beneficio-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Contador de estadísticas
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// Observar stats para animar
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            entry.target.dataset.animated = 'true';
            const numbers = entry.target.querySelectorAll('.stat-number');
            numbers.forEach(num => {
                const value = parseInt(num.textContent);
                animateCounter(num, value);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// Formulario de contacto
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener valores del formulario
        const nombre = document.getElementById('nombre').value;
        const empresa = document.getElementById('empresa').value;
        const email = document.getElementById('email').value;
        const telefono = document.getElementById('telefono').value;
        const industria = document.getElementById('industria').value;
        const empleados = document.getElementById('empleados').value;
        const mensaje = document.getElementById('mensaje').value;
        
        // Construir mensaje para WhatsApp
        const whatsappMessage = `
*NUEVO LEAD - ASESORÍAS MMYH LTDA*

*Información del Cliente:*
• Nombre: ${nombre}
• Empresa: ${empresa}
• Email: ${email}
• Teléfono: ${telefono}
• Industria: ${industria}
• Número de empleados: ${empleados}

*Desafíos financieros:*
${mensaje}

---
Mensaje enviado desde el sitio web`;
        
        // Codificar el mensaje
        const encodedMessage = encodeURIComponent(whatsappMessage);
        
        // Número de WhatsApp (reemplazar con el tuyo)
        const whatsappNumber = '+573001234567';
        
        // Crear URL de WhatsApp
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        
        // Abrir WhatsApp
        window.open(whatsappURL, '_blank');
        
        // Limpiar formulario
        contactForm.reset();
        
        // Mostrar mensaje de confirmación
        alert('Redirigiendo a WhatsApp... Se abrirá una nueva ventana.');
    });
}

// Validación en tiempo real del formulario
const formInputs = document.querySelectorAll('input[required], select[required], textarea[required]');

formInputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.style.borderColor = 'var(--danger)';
        } else {
            this.style.borderColor = 'var(--border)';
        }
    });
    
    input.addEventListener('input', function() {
        if (this.value) {
            this.style.borderColor = 'var(--border)';
        }
    });
});

// Función para detectar cuando el usuario llega a una sección
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-menu a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const currentId = entry.target.getAttribute('id');
            navItems.forEach(item => {
                item.style.opacity = '0.7';
                if (item.getAttribute('href') === `#${currentId}`) {
                    item.style.opacity = '1';
                    item.style.fontWeight = '700';
                } else {
                    item.style.fontWeight = '500';
                }
            });
        }
    });
}, { threshold: 0.3 });

sections.forEach(section => {
    sectionObserver.observe(section);
});

// Efecto de scroll en navbar
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Parallax effect en hero
const hero = document.querySelector('.hero');

if (hero) {
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const heroBottom = hero.offsetTop + hero.offsetHeight;
        
        if (scrollTop < heroBottom) {
            hero.style.backgroundPosition = `0 ${scrollTop * 0.5}px`;
        }
    });
}

// Mensaje de bienvenida en consola
console.log('%cASESORÍAS MMYH LTDA', 'font-size: 24px; font-weight: bold; color: #2563eb;');
console.log('%cGerencia de Finanzas para PyMEs', 'font-size: 14px; color: #10b981;');
console.log('%c¡Evita que tu empresa quiebre!', 'font-size: 12px; color: #6b7280;');