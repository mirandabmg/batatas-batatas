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

  // --- Formatação e Validação de Telefone ---
  const phoneInput = document.getElementById('phone');
  const phoneError = document.getElementById('phone-error');
  
  if (phoneInput) {
    // Adiciona +55 automaticamente ao focar no campo vazio
    phoneInput.addEventListener('focus', function() {
      if (!this.value) {
        this.value = '+55 ';
      }
    });

    // Formata o telefone enquanto o usuário digita
    phoneInput.addEventListener('input', function(e) {
      let value = e.target.value;
      
      // Remove tudo exceto números e o +
      value = value.replace(/[^\d+]/g, '');
      
      // Garante que sempre comece com +55
      if (!value.startsWith('+55')) {
        value = '+55';
      }
      
      // Remove o +55 para trabalhar apenas com os números
      let numbers = value.substring(3);
      
      // Limita a 11 dígitos (DDD + número)
      numbers = numbers.substring(0, 11);
      
      // Formata o telefone
      let formatted = '+55';
      
      if (numbers.length > 0) {
        formatted += ' (' + numbers.substring(0, 2);
        
        if (numbers.length > 2) {
          formatted += ') ' + numbers.substring(2, 7);
          
          if (numbers.length > 7) {
            formatted += '-' + numbers.substring(7, 11);
          }
        }
      }
      
      e.target.value = formatted;
      
      // Validação em tempo real
      validatePhone(formatted);
    });

    // Validação quando o usuário sai do campo
    phoneInput.addEventListener('blur', function() {
      validatePhone(this.value);
    });

    // Previne que o usuário apague o +55
    phoneInput.addEventListener('keydown', function(e) {
      const cursorPosition = this.selectionStart;
      
      // Se tentar apagar o +55
      if ((e.key === 'Backspace' || e.key === 'Delete') && cursorPosition <= 4) {
        e.preventDefault();
      }
    });
  }

  // Função de validação do telefone
  function validatePhone(phone) {
    // Remove formatação para contar apenas números
    const numbers = phone.replace(/[^\d]/g, '');
    
    phoneError.textContent = '';
    phoneInput.classList.remove('invalid', 'valid');
    
    // Valida se tem 13 dígitos (55 + 2 DDD + 9 número)
    if (numbers.length === 0) {
      return false;
    } else if (numbers.length < 12) {
      phoneError.textContent = 'Telefone incompleto. Digite DDD + número.';
      phoneInput.classList.add('invalid');
      return false;
    } else if (numbers.length === 12 || numbers.length === 13) {
      // Verifica se o DDD é válido (entre 11 e 99)
      const ddd = parseInt(numbers.substring(2, 4));
      if (ddd < 11 || ddd > 99) {
        phoneError.textContent = 'DDD inválido.';
        phoneInput.classList.add('invalid');
        return false;
      }
      
      phoneInput.classList.add('valid');
      return true;
    } else {
      phoneError.textContent = 'Número muito longo.';
      phoneInput.classList.add('invalid');
      return false;
    }
  }

  // --- Validação do Formulário ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      const phoneValue = phoneInput.value;
      
      // Valida o telefone antes de enviar
      if (!validatePhone(phoneValue)) {
        e.preventDefault();
        phoneInput.focus();
        
        if (!phoneError.textContent) {
          phoneError.textContent = 'Por favor, insira um telefone válido.';
        }
        return false;
      }
      
      // Se passou na validação, mostra loading
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
