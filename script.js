// ============================================
// INITIALISATION ET VARIABLES GLOBALES
// ============================================

// Données pour les citations inspirantes
const quotes = [
    "Quand l'avancée est dure, seuls les durs avancent.",
    "La création est l'art de donner une forme à l'invisible et une voix au silence.",
    "Chaque obstacle est une opportunité déguisée en difficulté.",
    "La persévérance transforme l'impossible en possible.",
    "Le succès n'est pas final, l'échec n'est pas fatal : c'est le courage de continuer qui compte.",
    "La créativité, c'est l'intelligence qui s'amuse.",
    "Les données sont le nouveau pétrole, mais raffinées, elles deviennent l'énergie de l'innovation.",
    "L'IA ne remplacera pas les humains, mais les humains qui utilisent l'IA remplaceront ceux qui ne le font pas.",
    "En data science, chaque problème est une opportunité d'apprentissage.",
    "Le machine learning, c'est apprendre à un ordinateur à apprendre par lui-même.",
    "La data visualisation, c'est l'art de raconter des histoires avec des chiffres."
];

// Phrases pour l'effet machine à écrire
const typewriterTexts = [
    "Créateur passionné",
    "Développeur Data IA",
    "Designer Graphique",
    "Entrepreneur en devenir",
    "Scout engagé",
    "Artiste numérique",
    "Bâtisseur autodidacte",
    "Innovateur ivoirien"
];

// Variables globales
let projectCount = 0;
let currentTextIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let isTypingPaused = false;
let currentTheme = 'default';

// ============================================
// FONCTIONS D'INITIALISATION
// ============================================

// Fonction d'initialisation principale
function init() {
    // Initialiser le compteur de projets depuis le localStorage
    const savedCount = localStorage.getItem('projectCount');
    projectCount = savedCount ? parseInt(savedCount) : 0;
    updateProjectCounter();
    
    // Initialiser les événements
    setupEventListeners();
    
    // Démarrer l'effet machine à écrire
    startTypewriter();
    
    // Animer les barres de compétences au défilement
    animateSkillsOnScroll();
    
    // Initialiser le thème depuis le localStorage
    const savedTheme = localStorage.getItem('theme') || 'default';
    setTheme(savedTheme);
    
    // Initialiser la navigation fluide
    setupSmoothScrolling();
    
    // Animer les éléments au chargement
    animateOnLoad();
}

// ============================================
// EFFET MACHINE À ÉCRIRE
// ============================================

function startTypewriter() {
    const typewriterElement = document.getElementById('typewriter');
    if (!typewriterElement) return;
    
    function type() {
        const currentText = typewriterTexts[currentTextIndex];
        
        if (!isDeleting) {
            // Écriture
            typewriterElement.textContent = currentText.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            
            if (currentCharIndex === currentText.length) {
                // Pause à la fin du mot
                isDeleting = true;
                isTypingPaused = true;
                setTimeout(() => {
                    isTypingPaused = false;
                    type();
                }, 2000);
                return;
            }
        } else {
            // Effacement
            typewriterElement.textContent = currentText.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            
            if (currentCharIndex === 0) {
                // Passer au mot suivant
                isDeleting = false;
                currentTextIndex = (currentTextIndex + 1) % typewriterTexts.length;
            }
        }
        
        // Vitesse d'écriture/effacement
        const speed = isDeleting ? 50 : 100;
        setTimeout(type, isTypingPaused ? 2000 : speed);
    }
    
    type();
}

// ============================================
// GESTION DES ÉVÉNEMENTS
// ============================================

function setupEventListeners() {
    // Thème sombre/clair
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Compteur de projets
    const addProjectBtn = document.getElementById('addProject');
    const removeProjectBtn = document.getElementById('removeProject');
    const resetProjectsBtn = document.getElementById('resetProjects');
    
    if (addProjectBtn) addProjectBtn.addEventListener('click', () => updateProjectCounter(1));
    if (removeProjectBtn) removeProjectBtn.addEventListener('click', () => updateProjectCounter(-1));
    if (resetProjectsBtn) resetProjectsBtn.addEventListener('click', resetProjectCounter);
    
    // Générateur de citations
    const generateQuoteBtn = document.getElementById('generateQuote');
    if (generateQuoteBtn) {
        generateQuoteBtn.addEventListener('click', generateRandomQuote);
    }
    
    // Changement de palette de couleurs
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', () => {
            const theme = option.getAttribute('data-theme');
            setTheme(theme);
        });
    });
    
    // Formulaire de contact
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }
    
    // Navigation au scroll
    window.addEventListener('scroll', handleScroll);
    
    // Effet de révélation au défilement
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);
    
    // Observer les éléments à révéler
    document.querySelectorAll('.timeline-item, .project-card, .passion-card, .skill-item').forEach(el => {
        observer.observe(el);
    });
}

// ============================================
// GESTION DU THÈME
// ============================================

function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('themeIcon');
    
    // Basculer entre les thèmes
    if (body.classList.contains('dark-theme')) {
        setTheme('default');
    } else if (body.classList.contains('creative-theme')) {
        setTheme('dark');
    } else {
        setTheme('creative');
    }
    
    // Animation de l'icône
    if (themeIcon) {
        themeIcon.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeIcon.style.transform = 'rotate(0deg)';
        }, 300);
    }
}

function setTheme(theme) {
    const body = document.body;
    const themeIcon = document.getElementById('themeIcon');
    
    // Retirer tous les thèmes
    body.classList.remove('dark-theme', 'creative-theme');
    currentTheme = theme;
    
    // Appliquer le nouveau thème
    switch(theme) {
        case 'dark':
            body.classList.add('dark-theme');
            if (themeIcon) {
                themeIcon.className = 'fas fa-sun';
            }
            break;
        case 'creative':
            body.classList.add('creative-theme');
            if (themeIcon) {
                themeIcon.className = 'fas fa-palette';
            }
            break;
        default:
            if (themeIcon) {
                themeIcon.className = 'fas fa-moon';
            }
            break;
    }
    
    // Sauvegarder le thème
    localStorage.setItem('theme', theme);
    
    // Mettre à jour les boutons de sélection de thème
    updateThemeButtons(theme);
}

function updateThemeButtons(theme) {
    document.querySelectorAll('.color-option').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-theme') === theme) {
            btn.classList.add('active');
        }
    });
}

// ============================================
// COMPTEUR DE PROJETS
// ============================================

function updateProjectCounter(change = 0) {
    projectCount = Math.max(0, projectCount + change);
    
    // Mettre à jour l'affichage
    const counterElement = document.getElementById('projectCounter');
    if (counterElement) {
        counterElement.textContent = projectCount;
        
        // Animation
        counterElement.style.transform = 'scale(1.2)';
        setTimeout(() => {
            counterElement.style.transform = 'scale(1)';
        }, 200);
    }
    
    // Sauvegarder dans le localStorage
    localStorage.setItem('projectCount', projectCount.toString());
    
    // Message spécial tous les 5 projets
    if (change > 0 && projectCount % 5 === 0) {
        showNotification(`Bravo ! ${projectCount} projets créés ! 🎉`);
    }
}

function resetProjectCounter() {
    if (projectCount > 0) {
        if (confirm('Voulez-vous vraiment réinitialiser le compteur de projets ?')) {
            projectCount = 0;
            updateProjectCounter();
            showNotification('Compteur réinitialisé !');
        }
    }
}

// ============================================
// GÉNÉRATEUR DE CITATIONS
// ============================================

function generateRandomQuote() {
    const quoteDisplay = document.getElementById('quoteDisplay');
    if (!quoteDisplay) return;
    
    // Exclure la citation actuelle
    const currentQuote = quoteDisplay.textContent;
    let availableQuotes = quotes.filter(quote => quote !== currentQuote);
    
    // Si toutes les citations ont été utilisées, réinitialiser
    if (availableQuotes.length === 0) {
        availableQuotes = [...quotes];
    }
    
    // Choisir une citation aléatoire
    const randomIndex = Math.floor(Math.random() * availableQuotes.length);
    const newQuote = availableQuotes[randomIndex];
    
    // Animation de transition
    quoteDisplay.style.opacity = '0';
    quoteDisplay.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        quoteDisplay.textContent = newQuote;
        quoteDisplay.style.opacity = '1';
        quoteDisplay.style.transform = 'translateY(0)';
    }, 300);
    
    // Animation du bouton
    const button = document.getElementById('generateQuote');
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 150);
}

// ============================================
## FORMULAIRE DE CONTACT
// ============================================

function handleContactFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    // Récupérer les données du formulaire
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Validation simple
    if (!formData.name || !formData.email || !formData.message) {
        showNotification('Veuillez remplir tous les champs obligatoires.', 'error');
        return;
    }
    
    // Simulation d'envoi
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        // Réinitialiser le formulaire
        form.reset();
        
        // Afficher un message de succès
        showNotification(`Merci ${formData.name} ! Votre message a été envoyé avec succès. Je vous répondrai dans les plus brefs délais.`, 'success');
        
        // Réactiver le bouton
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        // Animation de confirmation
        submitButton.style.backgroundColor = '#10b981';
        setTimeout(() => {
            submitButton.style.backgroundColor = '';
        }, 2000);
        
        // Log dans la console (pour le développement)
        console.log('Message envoyé:', formData);
        
    }, 2000);
}

// ============================================
## ANIMATIONS ET EFFETS
// ============================================

function animateSkillsOnScroll() {
    const skillBars = document.querySelectorAll('.skill-level');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.style.width;
                skillBar.style.width = '0';
                
                setTimeout(() => {
                    skillBar.style.transition = 'width 1.5s ease-in-out';
                    skillBar.style.width = width;
                }, 300);
                
                observer.unobserve(skillBar);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
}

function animateOnLoad() {
    // Animation d'entrée pour les éléments
    const elements = document.querySelectorAll('.hero-content, .hero-visual');
    
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // Animation des éléments flottants
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.5}s`;
    });
}

function handleScroll() {
    // Barre de navigation fixe avec effet
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
        navbar.style.backdropFilter = 'blur(0px)';
    }
    
    // Indicateur de scroll
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator && window.scrollY > 200) {
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.visibility = 'hidden';
    } else if (scrollIndicator) {
        scrollIndicator.style.opacity = '1';
        scrollIndicator.style.visibility = 'visible';
    }
    
    // Animation des cartes au scroll
    const cards = document.querySelectorAll('.project-card, .passion-card');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
            card.classList.add('animated');
        }
    });
}

function setupSmoothScrolling() {
    // Navigation fluide
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
## NOTIFICATIONS ET ALERTES
// ============================================

function showNotification(message, type = 'info') {
    // Supprimer les notifications existantes
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Créer la notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${getNotificationIcon(type)}"></i>
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Styles de la notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        display: flex;
        align-items: center;
        gap: 0.75rem;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 400px;
    `;
    
    // Style pour l'animation d'entrée
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            margin-left: auto;
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Fermeture automatique après 5 secondes
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
    
    // Fermeture manuelle
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
}

function getNotificationIcon(type) {
    switch(type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-circle';
        case 'warning': return 'exclamation-triangle';
        default: return 'info-circle';
    }
}

function getNotificationColor(type) {
    switch(type) {
        case 'success': return '#10b981';
        case 'error': return '#ef4444';
        case 'warning': return '#f59e0b';
        default: return '#3b82f6';
    }
}

// ============================================
## FONCTIONS UTILITAIRES
// ============================================

// Formatage des nombres
function formatNumber(num) {
    return num.toLocaleString('fr-FR');
}

// Génération d'un ID unique
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Vérification de la connexion internet
function checkOnlineStatus() {
    if (!navigator.onLine) {
        showNotification('Vous êtes hors ligne. Certaines fonctionnalités peuvent être limitées.', 'warning');
    }
}

// ============================================
## INITIALISATION AU CHARGEMENT
// ============================================

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', () => {
    // Initialiser l'application
    init();
    
    // Vérifier la connexion internet
    checkOnlineStatus();
    
    // Écouter les changements de connexion
    window.addEventListener('online', () => {
        showNotification('Vous êtes de nouveau en ligne !', 'success');
    });
    
    window.addEventListener('offline', () => {
        showNotification('Vous êtes hors ligne.', 'warning');
    });
    
    // Ajouter des styles pour les animations
    addAnimationStyles();
});

// Ajouter des styles CSS pour les animations
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* Animation pour les cartes */
        .project-card, .passion-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .project-card.animated, .passion-card.animated {
            animation: cardReveal 0.6s ease;
        }
        
        @keyframes cardReveal {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        /* Animation pour la timeline */
        .timeline-item.revealed {
            animation: timelineReveal 0.8s ease;
        }
        
        @keyframes timelineReveal {
            from {
                opacity: 0;
                transform: translateX(-20px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        /* Animation pour les compétences */
        .skill-item.revealed .skill-level {
            animation: skillFill 1.5s ease-out;
        }
        
        @keyframes skillFill {
            from { width: 0; }
        }
        
        /* Animation de pulse pour les CTA */
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        .btn-primary {
            animation: pulse 2s infinite;
        }
        
        /* Animation de shake pour les erreurs */
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        .shake {
            animation: shake 0.5s ease;
        }
        
        /* Animation de fade in */
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        .fade-in {
            animation: fadeIn 0.5s ease;
        }
        
        /* Animation de slide out pour les notifications */
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ============================================
## FONCTIONS SUPPLEMENTAIRES POUR L'INTERACTIVITÉ
// ============================================

// Mode focus pour la lecture
function enableFocusMode() {
    document.body.classList.add('focus-mode');
    showNotification('Mode focus activé. Les distractions sont réduites.', 'info');
}

function disableFocusMode() {
    document.body.classList.remove('focus-mode');
}

// Partage de la page
function sharePage() {
    if (navigator.share) {
        navigator.share({
            title: document.title,
            text: 'Découvrez mon portfolio personnel !',
            url: window.location.href
        });
    } else {
        // Fallback pour les navigateurs qui ne supportent pas l'API Share
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            showNotification('Lien copié dans le presse-papier !', 'success');
        });
    }
}

// Impression de la page
function printPage() {
    window.print();
}

// Retour en haut
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Ajouter un bouton de retour en haut
function addBackToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-chevron-up"></i>';
    button.className = 'back-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 999;
        transition: all 0.3s ease;
    `;
    
    button.addEventListener('click', scrollToTop);
    document.body.appendChild(button);
    
    // Afficher/cacher le bouton au scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            button.style.display = 'flex';
            setTimeout(() => {
                button.style.opacity = '1';
            }, 10);
        } else {
            button.style.opacity = '0';
            setTimeout(() => {
                if (window.scrollY <= 500) {
                    button.style.display = 'none';
                }
            }, 300);
        }
    });
}

// Initialiser le bouton de retour en haut
setTimeout(addBackToTopButton, 1000);

// ============================================
## FONCTIONNALITÉS EXPÉRIMENTALES (OPTIONNELLES)
// ============================================

// Mode confetti pour les célébrations
function launchConfetti() {
    const confettiCount = 100;
    const confettiContainer = document.createElement('div');
    confettiContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 10001;
    `;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: absolute;
            width: 10px;
            height: 10px;
            background: ${getRandomColor()};
            top: -20px;
            left: ${Math.random() * 100}%;
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            animation: confettiFall ${1 + Math.random() * 2}s linear forwards;
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes confettiFall {
                to {
                    transform: translateY(100vh) rotate(${Math.random() * 360}deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
        
        confettiContainer.appendChild(confetti);
    }
    
    document.body.appendChild(confettiContainer);
    
    // Supprimer après l'animation
    setTimeout(() => {
        confettiContainer.remove();
    }, 3000);
}

function getRandomColor() {
    const colors = ['#2563eb', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#ec4899'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Mode accessible
function enableAccessibilityMode() {
    document.body.classList.add('accessibility-mode');
    document.body.style.fontSize = '18px';
    document.body.style.lineHeight = '1.8';
    showNotification('Mode accessibilité activé', 'info');
}

// ============================================
## EXPORT DES FONCTIONS (pour la console)
// ============================================

// Exposer certaines fonctions à la console pour le débogage
window.App = {
    launchConfetti,
    enableFocusMode,
    disableFocusMode,
    enableAccessibilityMode,
    sharePage,
    printPage,
    setTheme,
    generateRandomQuote,
    updateProjectCounter,
    resetProjectCounter
};

// Message de bienvenue dans la console
console.log('%c🎨 Bienvenue sur le portfolio d\'Alexis KOUAKOU !', 'color: #2563eb; font-size: 16px; font-weight: bold;');
console.log('%c💡 Astuce : Essayez App.launchConfetti() dans la console !', 'color: #8b5cf6; font-size: 14px;');
console.log('%c👨‍💻 Développé avec passion par Alexis KOUAKOU', 'color: #10b981; font-size: 12px;');