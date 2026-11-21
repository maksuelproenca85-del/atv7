
/* ==========================================
   MK2 STUDIO - JAVASCRIPT PRINCIPAL

   Template original:
   TemplateMo 615 Amber Folio
   https://templatemo.com/tm-615-amber-folio

   Personalização: MK2 Studio
========================================== */


/* ==========================================
   01. CARROSSEL 3D DO PORTFÓLIO
========================================== */

class PhotoCoverflow {

   constructor() {

      // Elementos do carrossel
      this.items = document.querySelectorAll('.coverflow-item');
      this.indicators = document.querySelectorAll('.indicator');

      // Configurações iniciais
      this.currentIndex = 4;
      this.totalItems = this.items.length;

      // Reprodução automática
      this.isPlaying = false;
      this.autoPlayInterval = null;
      this.autoPlaySpeed = 4000;

      this.init();
   }


   /* ------------------------------------------
      01.1. INICIALIZAÇÃO DO CARROSSEL
   ------------------------------------------ */

   init() {
      if (this.totalItems === 0) return;

      this.updateCoverflow();
      this.bindEvents();
   }


   /* ------------------------------------------
      01.2. EVENTOS E CONTROLES
   ------------------------------------------ */

   bindEvents() {

      // Botões de navegação
      const prevBtn = document.getElementById('prevBtn');
      const nextBtn = document.getElementById('nextBtn');
      const playPauseBtn = document.getElementById('playPauseBtn');

      if (prevBtn) {
         prevBtn.addEventListener('click', () => this.prev());
      }

      if (nextBtn) {
         nextBtn.addEventListener('click', () => this.next());
      }

     if (playPauseBtn) {
    playPauseBtn.addEventListener('click', () => {
        const itemAtual = this.items[this.currentIndex];

        if (itemAtual) {
            const videoSrc = itemAtual.getAttribute('data-video');

            if (videoSrc) {
                abrirVideo(videoSrc);
            }
        }
    });
}


      // Indicadores inferiores do carrossel
      this.indicators.forEach((indicator, index) => {
         indicator.addEventListener('click', () => this.goTo(index));
      });


      // Clique nos projetos do portfólio
   this.items.forEach((item, index) => {

      item.addEventListener('click', () => {

         // Se não estiver centralizado, centraliza primeiro
         if (index !== this.currentIndex) {
               this.goTo(index);
               return;
         }

         // Se estiver centralizado, abre o vídeo
         const videoSrc = item.getAttribute('data-video');

         if (videoSrc) {
               abrirVideo(videoSrc);
         }

      });

   });


      /* ------------------------------------------
         01.3. NAVEGAÇÃO PELO TECLADO
      ------------------------------------------ */

      document.addEventListener('keydown', (e) => {

         // Evita interferir na digitação do formulário
         if (
            e.target.closest(
               'input, textarea, select, button, [contenteditable]'
            )
         ) {
            return;
         }

         // Setas para navegar entre projetos
         if (e.key === 'ArrowLeft') {
            this.prev();
         }

         if (e.key === 'ArrowRight') {
            this.next();
         }

         // Barra de espaço para iniciar ou pausar
         if (e.key === ' ') {
            e.preventDefault();
            this.toggleAutoPlay();
         }

      });


      /* ------------------------------------------
         01.4. NAVEGAÇÃO POR TOQUE
      ------------------------------------------ */

      let startX = 0;
      let startY = 0;

      const container = document.getElementById('coverflowContainer');

      if (container) {

         // Início do toque
         container.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
         }, {
            passive: true
         });


         // Final do toque
         container.addEventListener('touchend', (e) => {

            if (!startX || !startY) return;

            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;

            const diffX = startX - endX;
            const diffY = startY - endY;

            // Detecta movimentos horizontais
            if (
               Math.abs(diffX) > Math.abs(diffY) &&
               Math.abs(diffX) > 50
            ) {

               if (diffX > 0) {
                  this.next();
               } else {
                  this.prev();
               }

            }

            startX = 0;
            startY = 0;

         }, {
            passive: true
         });

      }


      /* ------------------------------------------
         01.5. AJUSTE AO REDIMENSIONAR A TELA
      ------------------------------------------ */

      let resizeTimer;

      window.addEventListener('resize', () => {

         clearTimeout(resizeTimer);

         resizeTimer = setTimeout(() => {
            this.updateCoverflow();
         }, 100);

      });

   }


   /* ==========================================
      02. POSICIONAMENTO DOS PROJETOS EM 3D
   ========================================== */

   updateCoverflow() {

      const isMobile = window.innerWidth <= 768;
      const isSmallMobile = window.innerWidth <= 480;
      const viewportHeight = window.innerHeight;

      // Espaçamento inicial entre os projetos
      let baseSpacing = 220;


      // Ajuste de acordo com a altura da tela
      if (viewportHeight > 900) {
         baseSpacing = 250;
      } else if (viewportHeight < 768) {
         baseSpacing = 180;
      }


      // Ajuste para dispositivos móveis
      if (isSmallMobile) {
         baseSpacing = Math.min(baseSpacing * 0.7, 140);
      } else if (isMobile) {
         baseSpacing = Math.min(baseSpacing * 0.8, 170);
      }


      // Posicionamento individual de cada projeto
      this.items.forEach((item, index) => {

         let offset = index - this.currentIndex;


         // Permite que o carrossel funcione em ciclo
         if (offset > this.totalItems / 2) {
            offset -= this.totalItems;
         } else if (offset < -this.totalItems / 2) {
            offset += this.totalItems;
         }


         // Configurações iniciais de transformação
         let translateX = offset * baseSpacing;
         let translateZ = 0;
         let rotateY = 0;
         let scale = 1;
         let opacity = 1;


         // Projeto central
         if (offset === 0) {

            translateZ = 100;
            scale = 1.1;

         }

         // Projetos imediatamente ao lado
         else if (Math.abs(offset) === 1) {

            translateZ = 0;
            rotateY = offset * -40;
            scale = 0.85;
            opacity = 0.7;

         }

         // Projetos na segunda posição lateral
         else if (Math.abs(offset) === 2) {

            translateZ = -100;
            rotateY = offset * -50;
            scale = 0.7;
            opacity = 0.5;

         }

         // Projetos na terceira posição lateral
         else if (Math.abs(offset) === 3) {

            translateZ = -150;
            rotateY = offset * -60;
            scale = 0.6;
            opacity = 0.3;

         }

         // Projetos mais distantes
         else {

            translateZ = -200;
            rotateY = offset * -70;
            scale = 0.5;
            opacity = 0.2;

         }


         // Aplica as transformações 3D
         item.style.transform = `
            translate(-50%, -50%)
            translateX(${translateX}px)
            translateZ(${translateZ}px)
            rotateY(${rotateY}deg)
            scale(${scale})
         `;

         item.style.opacity = opacity;

         item.style.zIndex =
            this.totalItems - Math.abs(offset);

      });


      // Atualiza o indicador do projeto selecionado
      this.indicators.forEach((indicator, index) => {
         indicator.classList.toggle(
            'active',
            index === this.currentIndex
         );
      });

   }


   /* ==========================================
      03. REPRODUÇÃO AUTOMÁTICA DO CARROSSEL
   ========================================== */

   toggleAutoPlay() {

      const playPauseBtn = document.getElementById('playPauseBtn');

      if (this.isPlaying) {

         this.stopAutoPlay();

         if (playPauseBtn) {
            playPauseBtn.innerHTML = '▶';
            playPauseBtn.classList.remove('playing');
         }

      } else {

         this.startAutoPlay();

         if (playPauseBtn) {
            playPauseBtn.innerHTML = '❚❚';
            playPauseBtn.classList.add('playing');
         }

      }

   }


   // Inicia a reprodução automática
   startAutoPlay() {

      if (this.isPlaying) return;

      this.isPlaying = true;

      this.autoPlayInterval = setInterval(() => {
         this.next();
      }, this.autoPlaySpeed);

   }


   // Interrompe a reprodução automática
   stopAutoPlay() {

      this.isPlaying = false;

      if (this.autoPlayInterval) {
         clearInterval(this.autoPlayInterval);
         this.autoPlayInterval = null;
      }

   }


   /* ==========================================
      04. NAVEGAÇÃO ENTRE OS PROJETOS
   ========================================== */

   // Projeto anterior
   prev() {

      this.currentIndex =
         (this.currentIndex - 1 + this.totalItems) %
         this.totalItems;

      this.updateCoverflow();

   }


   // Próximo projeto
   next() {

      this.currentIndex =
         (this.currentIndex + 1) %
         this.totalItems;

      this.updateCoverflow();

   }


   // Seleciona um projeto específico
   goTo(index) {

      this.currentIndex = index;
      this.updateCoverflow();

   }

}


/* ==========================================
   05. INICIALIZAÇÃO GERAL DO SITE
========================================== */

document.addEventListener('DOMContentLoaded', () => {


   /* ------------------------------------------
      05.1. INICIALIZAÇÃO DO PORTFÓLIO
   ------------------------------------------ */

   new PhotoCoverflow();


   /* ------------------------------------------
      05.2. TELA DE CARREGAMENTO
   ------------------------------------------ */

   const loadingScreen = document.getElementById('loadingScreen');

   if (loadingScreen) {

      setTimeout(() => {
         loadingScreen.classList.add('hidden');
      }, 1000);

   }


   /* ==========================================
      06. EFEITO DO CABEÇALHO AO ROLAR
   ========================================== */

   const header = document.getElementById('header');

   if (header) {

      window.addEventListener('scroll', () => {

         if (window.scrollY > 50) {
            header.classList.add('scrolled');
         } else {
            header.classList.remove('scrolled');
         }

      });

   }


   /* ==========================================
      07. MENU RESPONSIVO
   ========================================== */

   const menuToggle = document.getElementById('menuToggle');
   const navMenu = document.getElementById('navMenu');

   if (menuToggle && navMenu) {

      // Abre e fecha o menu
      menuToggle.addEventListener('click', () => {

         menuToggle.classList.toggle('active');
         navMenu.classList.toggle('active');

      });


      // Fecha o menu ao clicar em um link
      document.querySelectorAll('.nav-menu a').forEach(link => {

         link.addEventListener('click', () => {

            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');

         });

      });

   }


   /* ==========================================
      08. ROLAGEM SUAVE ENTRE AS SEÇÕES
   ========================================== */

   document.querySelectorAll('a[href^="#"]').forEach(anchor => {

      anchor.addEventListener('click', function (e) {

         const href = this.getAttribute('href');

         // Ignora links sem destino válido
         if (!href || href === '#') return;

         const target = document.getElementById(href.slice(1));

         if (target) {

            e.preventDefault();

            target.scrollIntoView({
               behavior: 'smooth',
               block: 'start'
            });

         }

      });

   });


   /* ==========================================
      09. DESTAQUE DO MENU DURANTE A ROLAGEM
   ========================================== */

   const sections = document.querySelectorAll('section[id]');
   const navLinks = document.querySelectorAll('.nav-menu a');

   window.addEventListener('scroll', () => {

      let current = '';

      sections.forEach(section => {

         const sectionTop = section.offsetTop;

         if (window.pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
         }

      });


      navLinks.forEach(link => {

         link.classList.remove('active');

         const href = link.getAttribute('href');

         if (href && href.slice(1) === current) {
            link.classList.add('active');
         }

      });

   });


   /* ==========================================
      10. ANIMAÇÕES AO ROLAR A PÁGINA
   ========================================== */

   const revealElements = document.querySelectorAll('.reveal');


   // Verifica quais elementos devem aparecer
   const revealOnScroll = () => {

      revealElements.forEach(element => {

         const elementTop =
            element.getBoundingClientRect().top;

         const elementVisible = 150;


         if (
            elementTop <
            window.innerHeight - elementVisible
         ) {

            element.classList.add('active');

         }

      });

   };


   // Executa durante a rolagem
   window.addEventListener('scroll', revealOnScroll);

   // Executa também quando o site é carregado
   revealOnScroll();

});

/* ==========================================
   11. REPRODUÇÃO DOS VÍDEOS DO PORTFÓLIO
========================================== */

function abrirVideo(caminho) {

    const modal = document.getElementById('videoModal');
    const video = document.getElementById('portfolioVideo');

    if (!modal || !video) {
        console.error("Janela ou player de vídeo não encontrado!");
        return;
    }

    video.src = caminho;
    modal.classList.add('active');
    video.load();

    video.play().catch(erro => {
        console.error("Erro ao reproduzir vídeo:", erro);
        console.log("Arquivo solicitado:", video.currentSrc);
    });

}



/* ==========================================
   FUNÇÃO PARA FECHAR O VÍDEO
========================================== */

function fecharVideo() {

    const modal = document.getElementById('videoModal');
    const video = document.getElementById('portfolioVideo');

    if (!modal || !video) return;

    // Para a reprodução
    video.pause();

    // Remove o vídeo carregado
    video.removeAttribute('src');
    video.load();

    // Fecha a janela
    modal.classList.remove('active');

}

/* ==========================================
   EVENTOS PARA FECHAR A JANELA DE VÍDEO
========================================== */

document.addEventListener('DOMContentLoaded', () => {

    const modal = document.getElementById('videoModal');
    const fechar = document.getElementById('videoClose');

    // Fecha ao clicar no X
    if (fechar) {
        fechar.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            fecharVideo();
        });
    }

    // Fecha ao clicar fora do vídeo
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                fecharVideo();
            }
        });
    }

    // Fecha ao pressionar ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            fecharVideo();
        }
    });

});



/* ==========================================
   FIM DO JAVASCRIPT PRINCIPAL - MK2 STUDIO
========================================== */
