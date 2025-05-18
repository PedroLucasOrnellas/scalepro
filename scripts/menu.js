
  class MenuCircular extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' }); // Shadow DOM aberto

      // Estilos e estrutura HTML
      this.shadowRoot.innerHTML = `
        <style>
          * {
            box-sizing: border-box;
          }

          .menu-container {
            position: fixed;
            bottom: 0px;
            left: 50%;
            transform: translateX(-50%);
            width: 80px;
            height: 80px;
            z-index: 999;
          }

          .menu-btn {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: #161b22;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            position: absolute;
            bottom: 0;
            left: 0;
            z-index: 2;
            transition: background 0.3s;
          }

          .menu-btn svg {
            width: 34px;
            height: 34px;
            fill: white;
          }

          .menu-item {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: #161b22;
            color: white;
            font-size: 18px;
            text-align: center;
            line-height: 60px;
            position: absolute;
            bottom: 45px;
            left: 50%;
            transform: translateX(-50%) scale(0);
            transition: transform 0.4s ease, bottom 0.4s ease, left 0.4s ease;
            z-index: 1;
          }

          .menu-container.active .menu-item {
            transform: translateX(-50%) scale(1);
          }

          @media (max-width: 600px) {
            .menu-container {
              width: 70px;
              height: 70px;
            }

            .menu-btn svg {
              width: 26px;
              height: 26px;
            }

            .menu-item {
              width: 50px;
              height: 50px;
              font-size: 16px;
              line-height: 50px;
            }
          }
        </style>

        <div class="menu-container">
          <div class="menu-btn">
            <svg viewBox="0 0 100 100">
              <circle cx="20" cy="20" r="10" />
              <circle cx="50" cy="20" r="10" />
              <circle cx="80" cy="20" r="10" />
              <circle cx="20" cy="50" r="10" />
              <circle cx="50" cy="50" r="10" />
              <circle cx="80" cy="50" r="10" />
              <circle cx="20" cy="80" r="10" />
              <circle cx="50" cy="80" r="10" />
              <circle cx="80" cy="80" r="10" />
            </svg>
          </div>
          <div class="menu-item"><a href="/">Home</a></div>
          <div class="menu-item"><a href="/afinador">Afinador</a></div>
          <div class="menu-item"><a href="/scale-trainer">Scalas</a></div>
          <div class="menu-item">4</div>
        </div>
      `;
    }

    connectedCallback() {
      const container = this.shadowRoot.querySelector('.menu-container');
      const btn = this.shadowRoot.querySelector('.menu-btn');
      const items = this.shadowRoot.querySelectorAll('.menu-item');

      btn.addEventListener('click', () => {
        container.classList.toggle('active');

        const radius = 130;
        const total = items.length;
        const startAngle = Math.PI / 6;
        const endAngle = Math.PI - startAngle;
        const angleStep = (endAngle - startAngle) / (total - 1);

        items.forEach((item, index) => {
          if (container.classList.contains('active')) {
            const angle = startAngle + (index * angleStep);
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            item.style.left = `calc(50% + ${x}px)`;
            item.style.bottom = `${35 + y}px`;
          } else {
            item.style.left = '50%';
            item.style.bottom = '45px';
          }
        });
      });
    }
  }

  // Registrar o elemento
  customElements.define('menu-circular', MenuCircular);