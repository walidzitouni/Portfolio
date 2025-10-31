document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initTypingEffect();
    initOrbitAnimations();
    initSmoothScroll();
    initSectionAnimations();
});

function initNavbar() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`a[href="#${entry.target.id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-100px 0px -100px 0px'
    });
    
    sections.forEach(section => observer.observe(section));
}

function initTypingEffect() {
    const typingText = document.getElementById('typing-text');
    if (!typingText) return;
    
    const phrases = [
        'Cybersecurity Engineer',
        'Pentester', 
        'Red Team Operator',
        'Security Researcher',
        'CTF Player',
        'Malware Developer'
    ];
    
    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeEffect() {
        const currentPhrase = phrases[currentPhraseIndex];
        
        if (isDeleting) {
            typingText.textContent = currentPhrase.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentPhrase.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && currentCharIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 2000;
        } 
        else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
            typingSpeed = 500;
        }
        
        setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();
}

function initOrbitAnimations() {
    const planets = document.querySelectorAll('.random-orbit');

    planets.forEach((planet, index) => {
        const startAngle = Math.random() * 360;
        const radius = 120 + (index * 40);
        const duration = 15 + Math.random() * 15;
        const direction = Math.random() > 0.5 ? 'normal' : 'reverse';

        planet.style.transform = `rotate(${startAngle}deg) translateX(${radius}px) rotate(-${startAngle}deg)`;

        const animationName = `orbit${index}`;
        const keyframes = `
            @keyframes ${animationName} {
                from {
                    transform: rotate(${startAngle}deg) translateX(${radius}px) rotate(-${startAngle}deg);
                }
                to {
                    transform: rotate(${startAngle + 360}deg) translateX(${radius}px) rotate(-${startAngle + 360}deg);
                }
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = keyframes;
        document.head.appendChild(styleSheet);

        planet.style.animation = `${animationName} ${duration}s linear infinite ${direction}`;

        planet.addEventListener('mouseenter', () => {
            planet.style.animationPlayState = 'paused';
        });

        planet.addEventListener('mouseleave', () => {
            planet.style.animationPlayState = 'running';
        });
    });
}

function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initSectionAnimations() {
    const elements = document.querySelectorAll('.slide-in-left, .slide-in-right, .slide-in-up');

    const elementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                if (entry.target.classList.contains('slide-in-left')) {
                    entry.target.style.transform = 'translateX(0)';
                } else if (entry.target.classList.contains('slide-in-right')) {
                    entry.target.style.transform = 'translateX(0)';
                } else {
                    entry.target.style.transform = 'translateY(0)';
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(element => elementObserver.observe(element));
}

// Contact form handling (optionnel - nécessite EmailJS)
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            
            // Vous pouvez intégrer EmailJS ici si besoin
            // Pour l'instant, affichage d'une alerte simple
            alert('✅ Message reçu! Je vous répondrai bientôt.');
            form.reset();
            
            /* Exemple avec EmailJS:
            emailjs.sendForm(
                "YOUR_SERVICE_ID",
                "YOUR_TEMPLATE_ID",
                this
            ).then(
                () => {
                    alert("✅ Message envoyé avec succès!");
                    form.reset();
                },
                (error) => {
                    alert("❌ Erreur lors de l'envoi: " + error.text);
                }
            );
            */
        });
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const cvButton = document.querySelector('.hero-buttons .glow-genz-button');
    
    if (cvButton) {
        cvButton.addEventListener('click', function() {
            // Create a temporary link and trigger download
            const link = document.createElement('a');
            link.href = 'WalidZitouni.pdf';
            link.download = 'Walid_Zitouni_CV.pdf';
            link.click();
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
  const chars = "!@#$%^&*()_+{}[]<>?/\\|~";
  const decryptEl = document.querySelector("#skills .decrypt");
  const progressEl = document.getElementById("decrypt-progress");
  const barEl = document.getElementById("decrypt-bar");
  let started = false;

  function startDecryption(el) {
    const text = el.textContent;
    let percent = 0;
    let iterations = 0;
    const totalBlocks = 20; // length of the bar

    const interval = setInterval(() => {
      // Update progress
      percent++;
      const filled = Math.floor((percent / 100) * totalBlocks);
      const bar = "█".repeat(filled) + "▒".repeat(totalBlocks - filled);
      barEl.textContent = bar;
      progressEl.textContent = percent + "%";

      // Update decryption in sync with percent
      iterations = Math.floor((percent / 100) * text.length);
      el.textContent = text
        .split("")
        .map((letter, i) => {
          if (i < iterations) return text[i];
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      // Stop when done
      if (percent >= 100) {
        clearInterval(interval);
        el.textContent = text; // ensure final clean text
      }
    }, 50); // adjust speed (50ms * 100 = ~5s total)
  }

  // Trigger only when section is visible
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        started = true;
        startDecryption(decryptEl);
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });

  observer.observe(document.querySelector("#skills"));
});
