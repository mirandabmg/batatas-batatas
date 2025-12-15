document.addEventListener('DOMContentLoaded', () => {

  // --- Inicialização do WOW.js ---
  new WOW().init();

  // --- Scroll Suave para links âncora ---
  const navLinks = document.querySelectorAll('.nav-links a, .logo-container');
  navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
          const targetId = e.currentTarget.getAttribute('href');
          if (!targetId || !targetId.startsWith('#')) return;
          e.preventDefault();
          const targetSection = document.querySelector(targetId);
          if (targetSection) {
              const offsetTop = targetSection.offsetTop;
              window.scrollTo({ top: offsetTop - 70, behavior: 'smooth' });
          }
      });
  });

  // --- Validação e Feedback do Formulário ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
      // Adiciona classe de loading ao enviar
      contactForm.addEventListener('submit', (e) => {
          const submitBtn = contactForm.querySelector('.btn');
          submitBtn.textContent = 'Enviando...';
          submitBtn.style.opacity = '0.7';
          submitBtn.disabled = true;
      });
  }

  // --- Efeito de Scroll na Navbar ---
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  // --- Bloco do Slider removido daqui ---

});



// === Carousel robusto (dinâmico, sem duplicações) ===
(function(){
  const container = document.querySelector('.carousel-container');
  const wrapper = document.querySelector('.carousel-wrapper');
  if (!container || !wrapper) return;

  const slides = wrapper.querySelectorAll('.carousel-slide');
  let idx = 0;
  const total = slides.length;

  function update(){
    wrapper.style.transform = `translateX(-${idx*100}%)`;
  }

  const nextBtn = container.querySelector('.carousel-btn.next');
  const prevBtn = container.querySelector('.carousel-btn.prev');

  if (nextBtn) nextBtn.onclick = () => { idx = (idx + 1) % total; update(); };
  if (prevBtn) prevBtn.onclick = () => { idx = (idx - 1 + total) % total; update(); };
})();