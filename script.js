// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.getElementById('nav-menu');
navToggle?.addEventListener('click', () => {
  navMenu.classList.toggle('open');
});

// Close menu on link click (mobile UX)
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => navMenu.classList.remove('open'));
});

// Scroll reveal
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
},{threshold:0.12});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Stats counter
const counters = document.querySelectorAll('.stat-num');
const runCounter = (el) => {
  const target = +el.getAttribute('data-target');
  const step = Math.max(1, Math.floor(target / 80));
  let current = 0;
  const tick = () => {
    current += step;
    if (current >= target){ el.textContent = target; return; }
    el.textContent = current;
    requestAnimationFrame(tick);
  };
  tick();
};
// Trigger counters when About is visible
const about = document.querySelector('#about');
if (about){
  const io = new IntersectionObserver(([e])=>{
    if (e.isIntersecting){
      counters.forEach(runCounter);
      io.disconnect();
    }
  },{threshold:0.2});
  io.observe(about);
}

// Contact form (static demo)
const form = document.getElementById('contact-form');
const status = document.querySelector('.form-status');
form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  status.textContent = 'Sending...';
  // Example: integrate with EmailJS, Formspree, or custom backend
  // For now, simulate success:
  setTimeout(()=>{
    status.textContent = 'Message sent! Thank you.';
    form.reset();
  }, 800);
});

// Dynamic year
document.getElementById('year').textContent = new Date().getFullYear();



// Skill bar animations
 document.addEventListener('DOMContentLoaded', function () {
  // Animate skill bars when they appear on screen
  const skillBars = document.querySelectorAll('.skill-bar .progress');

  skillBars.forEach(bar => {
    // Save the target width and set initial width to zero
    const targetWidth = bar.style.width;
    bar.style.width = '0';
    
    // Observer to fire animation when element enters viewport
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Animate bar to its intended width
            bar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
            bar.style.width = targetWidth;
            observer.unobserve(bar); // Animate only once
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(bar);
  });
});
