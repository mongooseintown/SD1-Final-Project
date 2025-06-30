// HAMBURGER MENU INTERACTIVITY WHILE IN MOBILE AND TABLET
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const closeBtn = document.getElementById('close-btn');

    hamburgerBtn.addEventListener('click', () => {
      hamburgerMenu.classList.remove('translate-x-full');
      hamburgerMenu.classList.add('translate-x-0');
      document.body.classList.add('overflow-hidden');
    });

    closeBtn.addEventListener('click', () => {
      hamburgerMenu.classList.remove('translate-x-0');
      hamburgerMenu.classList.add('translate-x-full');
      document.body.classList.remove('overflow-hidden');
    });

    document.addEventListener('click', function (event) {
      const isClickInsideMenu = hamburgerMenu.contains(event.target);
      const isClickOnButton = hamburgerBtn.contains(event.target);

      if (!isClickInsideMenu && !isClickOnButton) {
        hamburgerMenu.classList.remove('translate-x-0');
        hamburgerMenu.classList.add('translate-x-full');
        document.body.classList.remove('overflow-hidden');
      }
    });
    // HAMBURGER MENU INTERACTIVITY WHILE IN MOBILE AND TABLET

    // CANVAS ANIMATION
    document.addEventListener('DOMContentLoaded', () => {
      const canvas = document.getElementById('bubbleCanvas');
      const ctx = canvas.getContext('2d');

      // Set canvas to full window size
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;


      const particles = [];
      const particleCount = 100;
      const mouse = { x: null, y: null, radius: 100 };


      window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
      });



      window.addEventListener('touchmove', (e) => {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      });


      window.addEventListener('mouseout', () => {
        mouse.x = null;
        mouse.y = null;
      });


      window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      });


      class Particle {
        constructor() {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.size = Math.random() * 5 + 1;
          this.density = Math.random() * 30 + 1;
          this.color = `hsl(${Math.random() * 360}, 100%, 70%)`;
          this.baseX = this.x;
          this.baseY = this.y;
          this.velocity = Math.random() * 0.2 - 0.1;
          this.angle = 0;
        }

        draw() {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.closePath();
          ctx.fillStyle = this.color;
          ctx.fill();
        }

        update() {
          // Move particles in circular motion
          this.angle += this.velocity;
          this.baseX += Math.cos(this.angle) * 0.5;
          this.baseY += Math.sin(this.angle) * 0.5;

          // Collision detection with mouse
          if (mouse.x && mouse.y) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouse.radius) {
              const forceDirectionX = dx / distance;
              const forceDirectionY = dy / distance;
              const force = (mouse.radius - distance) / mouse.radius * 2;

              this.x -= forceDirectionX * force * this.density;
              this.y -= forceDirectionY * force * this.density;
            } else {
              // Return to base position
              if (this.x !== this.baseX) {
                const dx = this.x - this.baseX;
                this.x -= dx / 10;
              }
              if (this.y !== this.baseY) {
                const dy = this.y - this.baseY;
                this.y -= dy / 10;
              }
            }
          } else {
            // Return to base position when mouse is not hovering
            if (this.x !== this.baseX) {
              const dx = this.x - this.baseX;
              this.x -= dx / 10;
            }
            if (this.y !== this.baseY) {
              const dy = this.y - this.baseY;
              this.y -= dy / 10;
            }
          }

          this.draw();
        }
      }

      // Create particles
      function init() {
        for (let i = 0; i < particleCount; i++) {
          particles.push(new Particle());
        }
      }

      // Animation loop
      function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particles.length; i++) {
          particles[i].update();
        }

        // Draw connection lines between close particles
        connect();

        requestAnimationFrame(animate);
      }

      // Connect particles with lines
      function connect() {
        for (let a = 0; a < particles.length; a++) {
          for (let b = a; b < particles.length; b++) {
            const dx = particles[a].x - particles[b].x;
            const dy = particles[a].y - particles[b].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
              ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / 100})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(particles[a].x, particles[a].y);
              ctx.lineTo(particles[b].x, particles[b].y);
              ctx.stroke();
            }
          }
        }
      }

      init();
      animate();
    });
    // CANVAS ANIMATION

    const options = {
    chart: {
      type: 'radar',
      height: '100%',
      toolbar: { show: false },
      background: 'transparent',
    },
    series: [{
      name: 'CPI Score',
      data: [27, 25, 21, 18, 20, 23]
    }],
    stroke: {
      width: 3,
      colors: ['#FFD700'] // Gold-ish line
    },
    fill: {
      opacity: 0.25,
      colors: ['#FFD700']
    },
    markers: {
      size: 5,
      colors: ['#FFD700'],
      strokeColor: '#fff',
      strokeWidth: 2,
    },
    labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
    yaxis: {
      max: 30,
      min: 0,
      tickAmount: 6,
      show: true,
      labels: {
        style: { colors: '#fff' }
      }
    },
    xaxis: {
      labels: {
        style: { colors: '#fff' }
      }
    },
    tooltip: {
      theme: 'dark',
      style: {
        fontSize: '14px'
      }
    },
    legend: {
      labels: {
        colors: '#fff',
        useSeriesColors: false
      }
    },
    responsive: [
      {
        breakpoint: 640,
        options: {
          chart: {
            height: 350,
          },
        }
      }
    ]
  };

  const chart = new ApexCharts(document.querySelector("#corruptionChart"), options);
  chart.render();

  const counters = [
    { id: "complaintsCount", end: 250 },
    { id: "investigationsCount", end: 87 },
    { id: "exposedCount", end: 12 },
  ];

  counters.forEach(counter => {
    const el = document.getElementById(counter.id);
    let count = 0;
    const update = () => {
      if (count < counter.end) {
        count += Math.ceil(counter.end / 50);
        if (count > counter.end) count = counter.end;
        el.innerText = count + "+";
        requestAnimationFrame(update);
      }
    };
    update();
  });

  document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".mySwiper", {
    effect: "cards",
    grabCursor: true,
  });
});