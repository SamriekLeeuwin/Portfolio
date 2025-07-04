// Simple tab functionality
document.addEventListener('DOMContentLoaded', function() {
    // Tab switching
    const tabButtons = document.querySelectorAll('.tab-btn');
    const projectLists = document.querySelectorAll('.project-list');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all tabs and content
            tabButtons.forEach(b => b.classList.remove('active'));
            projectLists.forEach(list => list.classList.remove('active'));

            // Add active to clicked tab and corresponding content
            btn.classList.add('active');
            const targetTab = btn.getAttribute('data-tab');
            document.getElementById(`tab-${targetTab}`).classList.add('active');
        });
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Simple navbar background change on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 11, 0.95)';
        } else {
            navbar.style.background = 'rgba(10, 10, 11, 0.9)';
        }
    });
});

// Simple slideshow for project gallery
(function() {
  const gallery = document.querySelector('.project-gallery-slideshow');
  if (!gallery) return;
  const images = [
    'assets/Gitlab.png',
    'assets/Candidaten.png',
    'assets/Homepage.png',
    'assets/elections_uml.png'
  ];
  let current = 0;
  const img = gallery.querySelector('.slide-img');
  const dots = document.querySelectorAll('.slide-dots .dot');
  function show(idx) {
    img.src = images[idx];
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
  }
  gallery.querySelector('.prev').onclick = function() {
    current = (current - 1 + images.length) % images.length;
    show(current);
  };
  gallery.querySelector('.next').onclick = function() {
    current = (current + 1) % images.length;
    show(current);
  };
  // Keyboard support
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') gallery.querySelector('.prev').click();
    if (e.key === 'ArrowRight') gallery.querySelector('.next').click();
  });
  // Lightbox
  let lightbox = document.createElement('div');
  lightbox.className = 'lightbox-overlay';
  lightbox.innerHTML = '<img class="lightbox-img" src="" alt="Enlarged image" />';
  document.body.appendChild(lightbox);
  const lightboxImg = lightbox.querySelector('.lightbox-img');
  img.onclick = function() {
    lightboxImg.src = images[current];
    lightbox.style.display = 'flex';
  };
  lightbox.onclick = function(e) {
    if (e.target === lightbox) lightbox.style.display = 'none';
  };
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') lightbox.style.display = 'none';
  });
  lightbox.style.display = 'none';
  show(current);
})();
