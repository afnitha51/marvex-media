function showPage(id){
  if(id==='home'&&window._resetCounters)window._resetCounters();
  var target=document.getElementById('page-'+id);
  if(!target)return;
  document.querySelectorAll('.page').forEach(function(p){p.classList.remove('active');});
  target.classList.add('active');
  document.querySelectorAll('.nav-links a').forEach(function(a){a.classList.remove('active');});
  var nav=document.getElementById('nav-'+id);
  if(nav)nav.classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
  if(id==='services')setTimeout(function(){initFlowDiagram();},150);
}
function toggleMenu(){document.getElementById('mobileMenu').classList.toggle('open')}
function closeMenu(){document.getElementById('mobileMenu').classList.remove('open')}
function submitContact() {
  var fname = document.getElementById('f-fname').value.trim();
  var email = document.getElementById('f-email').value.trim();
  var msg   = document.getElementById('f-msg').value.trim();
  if (!fname || !email || !msg) {
    alert('Please fill in the required fields.');
    return;
  }

  var btn     = document.querySelector('.contact-form .btn-primary');
  var success = document.getElementById('contact-success');
  var loader  = document.getElementById('contact-loader');

  // Show loader, hide button
  btn.style.display    = 'none';
  loader.style.display = 'flex';
  success.style.display = 'none';

  // Simulate sending (2 s)
  setTimeout(function () {
    loader.style.display  = 'none';
    success.style.display = 'block';

    // Clear all fields
    ['f-fname','f-lname','f-email','f-phone','f-service','f-msg'].forEach(function(id) {
      var el = document.getElementById(id);
      if (el) el.value = '';
    });

    // Restore button after 3 s, hide success after 5 s
    setTimeout(function () { btn.style.display = 'flex'; }, 3000);
    setTimeout(function () { success.style.display = 'none'; }, 5000);
  }, 2000);
}
function openApply(title){document.getElementById('applyTitle').textContent=title;document.getElementById('applyModal').classList.add('open');document.getElementById('apply-success').style.display='none';['a-fname','a-lname','a-email','a-phone','a-linkedin','a-portfolio','a-cover'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});document.body.style.overflow='hidden';}
function closeApply(){document.getElementById('applyModal').classList.remove('open');document.body.style.overflow='';}
function submitApply(){const f=document.getElementById('a-fname').value,e=document.getElementById('a-email').value;if(!f||!e){alert('Please fill in required fields.');return;}document.getElementById('apply-success').style.display='block';setTimeout(()=>closeApply(),2800);}
var _applyModalEl=document.getElementById('applyModal');if(_applyModalEl)_applyModalEl.addEventListener('click',function(e){if(e.target===this)closeApply();});
function checkGrid(){const g=document.querySelector('.about-grid-home');if(!g)return;g.style.gridTemplateColumns=window.innerWidth<768?'1fr':'1fr 1fr';}
window.addEventListener('resize',checkGrid);checkGrid();
function checkGrid(){const g=document.querySelector('.about-grid-home');if(!g)return;g.style.gridTemplateColumns=window.innerWidth<768?'1fr':'1fr 1fr';}
window.addEventListener('resize',checkGrid);checkGrid();

// carousel handled below

function checkGrid(){const g=document.querySelector('.about-grid-home');if(!g)return;g.style.gridTemplateColumns=window.innerWidth<768?'1fr':'1fr 1fr';}
window.addEventListener('resize',checkGrid);checkGrid();

/* ══ CANVAS SLIDE PAINTER ═══════════════════════════ */
(function() {
  function rand(min, max) { return Math.random() * (max - min) + min; }

  // ─── SLIDE 0 : Data Center / Server Room ──────────
  function paintSlide0(canvas) {
    const W = canvas.width, H = canvas.height;
    const ctx = canvas.getContext('2d');

    // deep dark base
    ctx.fillStyle = '#060202';
    ctx.fillRect(0, 0, W, H);

    // right-side warm red glow radial
    const g0 = ctx.createRadialGradient(W * 0.72, H * 0.38, 0, W * 0.72, H * 0.38, W * 0.55);
    g0.addColorStop(0, 'rgba(120,18,18,0.75)');
    g0.addColorStop(0.5, 'rgba(70,8,8,0.45)');
    g0.addColorStop(1, 'rgba(6,2,2,0)');
    ctx.fillStyle = g0;
    ctx.fillRect(0, 0, W, H);

    // dark grid lines
    ctx.strokeStyle = 'rgba(110,16,16,0.12)';
    ctx.lineWidth = 0.5;
    for (let x = Math.round(W * 0.5); x < W; x += 60) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (let y = 0; y < H; y += 60) {
      ctx.beginPath(); ctx.moveTo(Math.round(W * 0.5), y); ctx.lineTo(W, y); ctx.stroke();
    }

    // server rack silhouettes
    const racks = [W*0.62, W*0.73, W*0.84, W*0.95];
    racks.forEach(rx => {
      const rw = W * 0.08, rh = H * 0.82, ry = H * 0.09;
      ctx.fillStyle = '#0b0404';
      ctx.fillRect(rx, ry, rw, rh);
      ctx.strokeStyle = '#1c0808';
      ctx.lineWidth = 1;
      ctx.strokeRect(rx, ry, rw, rh);
      // unit slots
      ctx.fillStyle = '#0e0505';
      for (let uy = ry + 6; uy < ry + rh - 6; uy += 22) {
        ctx.fillRect(rx + 3, uy, rw - 6, 16);
      }
      // LED dots
      const ledColors = ['#9B1B1B','#cc2020','#6E1010','#ff3030'];
      for (let li = 0; li < 12; li++) {
        ctx.fillStyle = ledColors[li % ledColors.length];
        ctx.shadowColor = ledColors[li % ledColors.length];
        ctx.shadowBlur = 4;
        ctx.beginPath();
        ctx.arc(rx + 8, ry + 14 + li * 22, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
    });

    // laser beams from focal point
    const focal = { x: W * 0.6, y: H * 0.45 };
    const beamTargets = [
      { x: W, y: H * 0.15, w: 2, a: 0.55 },
      { x: W, y: H * 0.42, w: 2.5, a: 0.75 },
      { x: W, y: H * 0.68, w: 1.5, a: 0.45 },
      { x: W * 0.85, y: 0, w: 1, a: 0.3 },
      { x: W, y: H * 0.85, w: 1, a: 0.3 },
    ];
    beamTargets.forEach(t => {
      const bg = ctx.createLinearGradient(focal.x, focal.y, t.x, t.y);
      bg.addColorStop(0, `rgba(255,40,40,${t.a})`);
      bg.addColorStop(1, `rgba(155,27,27,0)`);
      ctx.beginPath();
      ctx.moveTo(focal.x, focal.y);
      ctx.lineTo(t.x, t.y);
      ctx.strokeStyle = bg;
      ctx.lineWidth = t.w;
      ctx.stroke();
    });

    // focal glow
    const fg = ctx.createRadialGradient(focal.x, focal.y, 0, focal.x, focal.y, 50);
    fg.addColorStop(0, 'rgba(255,80,80,0.6)');
    fg.addColorStop(0.3, 'rgba(200,30,30,0.3)');
    fg.addColorStop(1, 'rgba(110,16,16,0)');
    ctx.fillStyle = fg;
    ctx.beginPath(); ctx.arc(focal.x, focal.y, 50, 0, Math.PI * 2); ctx.fill();
    // bright core
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.beginPath(); ctx.arc(focal.x, focal.y, 4, 0, Math.PI * 2); ctx.fill();

    // left vignette for text legibility
    const lv = ctx.createLinearGradient(0, 0, W * 0.65, 0);
    lv.addColorStop(0, 'rgba(6,2,2,0.88)');
    lv.addColorStop(0.5, 'rgba(6,2,2,0.4)');
    lv.addColorStop(1, 'rgba(6,2,2,0)');
    ctx.fillStyle = lv;
    ctx.fillRect(0, 0, W, H);

    // bottom vignette
    const bv = ctx.createLinearGradient(0, H * 0.55, 0, H);
    bv.addColorStop(0, 'rgba(6,2,2,0)');
    bv.addColorStop(1, 'rgba(6,2,2,0.95)');
    ctx.fillStyle = bv;
    ctx.fillRect(0, H * 0.55, W, H * 0.45);
  }

  // ─── SLIDE 1 : Architectural Corridor ─────────────
  function paintSlide1(canvas) {
    const W = canvas.width, H = canvas.height;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#050101';
    ctx.fillRect(0, 0, W, H);

    // warm red ambient
    const amb = ctx.createRadialGradient(W*0.55, H*0.4, 0, W*0.55, H*0.4, W*0.7);
    amb.addColorStop(0, 'rgba(130,22,22,0.85)');
    amb.addColorStop(0.45, 'rgba(65,8,8,0.6)');
    amb.addColorStop(1, 'rgba(5,1,1,0)');
    ctx.fillStyle = amb;
    ctx.fillRect(0, 0, W, H);

    // ceiling light strip glow
    const ceiling = ctx.createLinearGradient(W*0.3, 0, W*0.7, 0);
    ceiling.addColorStop(0, 'rgba(255,40,40,0)');
    ceiling.addColorStop(0.5, 'rgba(255,40,40,0.5)');
    ceiling.addColorStop(1, 'rgba(255,40,40,0)');
    ctx.fillStyle = ceiling;
    ctx.fillRect(W*0.3, 0, W*0.4, 10);

    const ceilGlow = ctx.createRadialGradient(W*0.5, 0, 0, W*0.5, 0, H*0.35);
    ceilGlow.addColorStop(0, 'rgba(255,30,30,0.18)');
    ceilGlow.addColorStop(1, 'rgba(255,30,30,0)');
    ctx.fillStyle = ceilGlow;
    ctx.fillRect(0, 0, W, H*0.35);

    // perspective corridor walls — curves
    // Right wall
    ctx.beginPath();
    ctx.moveTo(W, 0);
    ctx.quadraticCurveTo(W*0.58, H*0.5, W, H);
    ctx.closePath();
    ctx.fillStyle = 'rgba(25,5,5,0.6)';
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(W, 0);
    ctx.quadraticCurveTo(W*0.58, H*0.5, W, H);
    ctx.strokeStyle = 'rgba(90,14,14,0.7)';
    ctx.lineWidth = 3;
    ctx.stroke();

    // wall panel lines right
    [W*0.63, W*0.7, W*0.78, W*0.87, W*0.95].forEach(lx => {
      ctx.beginPath();
      ctx.moveTo(W, 0); ctx.quadraticCurveTo(lx, H*0.5, W, H);
      ctx.strokeStyle = 'rgba(60,10,10,0.3)';
      ctx.lineWidth = 0.8;
      ctx.stroke();
    });

    // Left wall
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(W*0.42, H*0.5, 0, H);
    ctx.closePath();
    ctx.fillStyle = 'rgba(18,4,4,0.55)';
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(0, 0); ctx.quadraticCurveTo(W*0.42, H*0.5, 0, H);
    ctx.strokeStyle = 'rgba(60,10,10,0.5)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // floor
    ctx.fillStyle = '#080202';
    ctx.fillRect(0, H*0.82, W, H*0.18);

    const floorGlow = ctx.createRadialGradient(W*0.5, H, 0, W*0.5, H, W*0.6);
    floorGlow.addColorStop(0, 'rgba(130,22,22,0.25)');
    floorGlow.addColorStop(1, 'rgba(5,1,1,0)');
    ctx.fillStyle = floorGlow;
    ctx.fillRect(0, H*0.75, W, H*0.25);

    // walking figures (silhouettes)
    function figure(x, y, scale, alpha) {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scale, scale);
      ctx.fillStyle = `rgba(18,4,4,${alpha})`;
      // head
      ctx.beginPath(); ctx.arc(0, -80, 13, 0, Math.PI*2); ctx.fill();
      // body
      ctx.fillRect(-9, -67, 18, 48);
      // arms
      ctx.strokeStyle = `rgba(18,4,4,${alpha})`;
      ctx.lineWidth = 9; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(-9,-35); ctx.lineTo(-22,8); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(9,-35); ctx.lineTo(24,5); ctx.stroke();
      // legs
      ctx.lineWidth = 11;
      ctx.beginPath(); ctx.moveTo(-5,-19); ctx.lineTo(-13,30); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(5,-19); ctx.lineTo(15,30); ctx.stroke();
      ctx.restore();
    }
    figure(W*0.35, H*0.65, 1, 0.9);
    figure(W*0.44, H*0.6, 0.72, 0.75);
    figure(W*0.5, H*0.56, 0.5, 0.55);

    // centre depth glow
    const dg = ctx.createRadialGradient(W*0.5, H*0.35, 0, W*0.5, H*0.35, W*0.4);
    dg.addColorStop(0, 'rgba(180,30,30,0.15)');
    dg.addColorStop(1, 'rgba(5,1,1,0)');
    ctx.fillStyle = dg; ctx.fillRect(0,0,W,H);

    // glass reflection tints on right side panels
    ctx.fillStyle = 'rgba(110,16,16,0.06)';
    ctx.fillRect(W*0.62, 0, W*0.38, H);

    // overlays
    const lv = ctx.createLinearGradient(0,0,W*0.62,0);
    lv.addColorStop(0,'rgba(5,1,1,0.82)');
    lv.addColorStop(0.5,'rgba(5,1,1,0.3)');
    lv.addColorStop(1,'rgba(5,1,1,0)');
    ctx.fillStyle = lv; ctx.fillRect(0,0,W,H);

    const bv = ctx.createLinearGradient(0,H*0.6,0,H);
    bv.addColorStop(0,'rgba(5,1,1,0)');
    bv.addColorStop(1,'rgba(5,1,1,0.95)');
    ctx.fillStyle = bv; ctx.fillRect(0,H*0.6,W,H*0.4);
  }

  // ─── SLIDE 2 : Digital Orb / Hands ────────────────
  function paintSlide2(canvas) {
    const W = canvas.width, H = canvas.height;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#040101';
    ctx.fillRect(0, 0, W, H);

    // background data-grid
    ctx.strokeStyle = 'rgba(110,16,16,0.07)';
    ctx.lineWidth = 0.5;
    for (let x = 0; x < W; x += 70) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
    for (let y = 0; y < H; y += 70) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }

    // deep ambient glow right-centre
    const bg = ctx.createRadialGradient(W*0.62, H*0.42, 0, W*0.62, H*0.42, W*0.55);
    bg.addColorStop(0, 'rgba(140,20,20,0.7)');
    bg.addColorStop(0.5, 'rgba(70,8,8,0.4)');
    bg.addColorStop(1, 'rgba(4,1,1,0)');
    ctx.fillStyle = bg; ctx.fillRect(0,0,W,H);

    // Hands (dark silhouettes)
    ctx.fillStyle = 'rgba(15,4,4,0.92)';
    // Left hand from bottom-left
    ctx.beginPath();
    ctx.moveTo(W*0.3, H);
    ctx.bezierCurveTo(W*0.28, H*0.75, W*0.35, H*0.6, W*0.45, H*0.52);
    ctx.bezierCurveTo(W*0.5, H*0.48, W*0.52, H*0.45, W*0.55, H*0.42);
    ctx.bezierCurveTo(W*0.57, H*0.4, W*0.57, H*0.38, W*0.55, H*0.36);
    ctx.bezierCurveTo(W*0.53, H*0.34, W*0.5, H*0.35, W*0.48, H*0.4);
    ctx.bezierCurveTo(W*0.42, H*0.48, W*0.35, H*0.55, W*0.25, H*0.62);
    ctx.bezierCurveTo(W*0.18, H*0.68, W*0.15, H*0.8, W*0.18, H);
    ctx.closePath();
    ctx.fill();

    // Right hand from bottom-right
    ctx.beginPath();
    ctx.moveTo(W*0.88, H);
    ctx.bezierCurveTo(W*0.86, H*0.75, W*0.79, H*0.6, W*0.72, H*0.52);
    ctx.bezierCurveTo(W*0.68, H*0.48, W*0.66, H*0.45, W*0.63, H*0.42);
    ctx.bezierCurveTo(W*0.61, H*0.4, W*0.61, H*0.38, W*0.63, H*0.36);
    ctx.bezierCurveTo(W*0.65, H*0.34, W*0.68, H*0.35, W*0.7, H*0.4);
    ctx.bezierCurveTo(W*0.76, H*0.48, W*0.82, H*0.55, W*0.9, H*0.62);
    ctx.bezierCurveTo(W*0.97, H*0.68, W*0.99, H*0.8, W*0.96, H);
    ctx.closePath();
    ctx.fill();

    // fingers suggestions
    for (let i = 0; i < 4; i++) {
      ctx.fillStyle = 'rgba(15,4,4,0.85)';
      // left fingers
      ctx.beginPath();
      ctx.ellipse(W*(0.42 + i*0.04), H*0.32, 8, 30, -0.3 + i*0.1, 0, Math.PI*2);
      ctx.fill();
      // right fingers
      ctx.beginPath();
      ctx.ellipse(W*(0.76 - i*0.04), H*0.32, 8, 30, 0.3 - i*0.1, 0, Math.PI*2);
      ctx.fill();
    }

    // Glowing orb between hands
    const cx = W*0.6, cy = H*0.38;
    const og = ctx.createRadialGradient(cx, cy, 0, cx, cy, 90);
    og.addColorStop(0, 'rgba(255,70,70,0.95)');
    og.addColorStop(0.25, 'rgba(200,30,30,0.8)');
    og.addColorStop(0.55, 'rgba(130,20,20,0.6)');
    og.addColorStop(1, 'rgba(80,10,10,0)');
    ctx.fillStyle = og;
    ctx.beginPath(); ctx.arc(cx, cy, 90, 0, Math.PI*2); ctx.fill();

    // bright inner core
    const ic = ctx.createRadialGradient(cx, cy, 0, cx, cy, 32);
    ic.addColorStop(0, 'rgba(255,200,200,0.95)');
    ic.addColorStop(0.4, 'rgba(255,80,80,0.85)');
    ic.addColorStop(1, 'rgba(200,30,30,0)');
    ctx.fillStyle = ic;
    ctx.beginPath(); ctx.arc(cx, cy, 32, 0, Math.PI*2); ctx.fill();

    // orbit rings
    [70, 90, 110].forEach((r, i) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(i * 0.6);
      ctx.beginPath();
      ctx.ellipse(0, 0, r, r*0.3, 0, 0, Math.PI*2);
      ctx.strokeStyle = `rgba(200,30,30,${0.4 - i*0.1})`;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();
    });

    // light beams from orb rightward
    [[W, H*0.15, 1.5, 0.55],[W, H*0.38, 2, 0.7],[W, H*0.6, 1, 0.35],[W*0.95, H*0.05, 0.8, 0.25]].forEach(([tx,ty,lw,la]) => {
      const lg = ctx.createLinearGradient(cx,cy,tx,ty);
      lg.addColorStop(0, `rgba(255,50,50,${la})`);
      lg.addColorStop(1, `rgba(155,20,20,0)`);
      ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(tx,ty);
      ctx.strokeStyle = lg; ctx.lineWidth = lw; ctx.stroke();
    });

    // floating data nodes
    [[W*0.72,H*0.22],[W*0.8,H*0.3],[W*0.85,H*0.2],[W*0.9,H*0.32],[W*0.76,H*0.16],[W*0.5,H*0.22]].forEach(([px,py]) => {
      ctx.fillStyle = 'rgba(155,27,27,0.6)';
      ctx.beginPath(); ctx.arc(px,py, rand(2,4), 0, Math.PI*2); ctx.fill();
    });

    // overlays
    const lv = ctx.createLinearGradient(0,0,W*0.58,0);
    lv.addColorStop(0,'rgba(4,1,1,0.88)');
    lv.addColorStop(0.5,'rgba(4,1,1,0.35)');
    lv.addColorStop(1,'rgba(4,1,1,0)');
    ctx.fillStyle = lv; ctx.fillRect(0,0,W,H);

    const bv = ctx.createLinearGradient(0,H*0.62,0,H);
    bv.addColorStop(0,'rgba(4,1,1,0)');
    bv.addColorStop(1,'rgba(4,1,1,0.98)');
    ctx.fillStyle = bv; ctx.fillRect(0,H*0.62,W,H*0.38);
  }

  // ─── Init + Resize ──────────────────────────────────
  const PAINTERS = [paintSlide0, paintSlide1, paintSlide2];

  function paintAll() {
    PAINTERS.forEach(function(painter, i) {
      const canvas = document.getElementById('canvas-slide-' + i);
      if (!canvas) return;
      canvas.width = canvas.offsetWidth || window.innerWidth;
      canvas.height = canvas.offsetHeight || window.innerHeight;
      painter(canvas);
    });
  }

  // Paint immediately, on DOMContentLoaded, on load, and on resize
  // Using multiple triggers ensures the canvas renders even in iframe/preview contexts
  function safePaintAll() {
    requestAnimationFrame(function() {
      requestAnimationFrame(paintAll);
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', safePaintAll);
  } else {
    safePaintAll();
  }
  window.addEventListener('load', function() {
    setTimeout(paintAll, 50);
    setTimeout(paintAll, 300);
  });
  window.addEventListener('resize', paintAll);
})();

/* ══ CAROUSEL LOGIC ═════════════════════════════════ */
var currentSlide = 0;
var totalSlides = 3;
var carouselTimer = null;
var progressFill = null;

function goToSlide(n) {
  var slides = document.querySelectorAll('.hero-slide');
  var dots = document.querySelectorAll('.c-dot');
  var counter = document.getElementById('slide-num-current');
  if (!slides.length) return;
  slides[currentSlide].classList.remove('active');
  if (dots[currentSlide]) dots[currentSlide].classList.remove('on');
  currentSlide = ((n % totalSlides) + totalSlides) % totalSlides;
  slides[currentSlide].classList.add('active');
  if (dots[currentSlide]) dots[currentSlide].classList.add('on');
  if (counter) counter.textContent = String(currentSlide + 1).padStart(2,'0');
  // reset progress
  if (!progressFill) progressFill = document.querySelector('.hero-progress-fill');
  if (progressFill) { progressFill.style.transition='none'; progressFill.style.width='0%'; setTimeout(function(){ progressFill.style.transition='width 5s linear'; progressFill.style.width='100%'; },30); }
  resetTimer();
}
function carouselNext() { goToSlide(currentSlide + 1); }
function carouselPrev() { goToSlide(currentSlide - 1); }
function resetTimer() { clearInterval(carouselTimer); carouselTimer = setInterval(carouselNext, 5000); }

document.addEventListener('DOMContentLoaded', function() {
  goToSlide(0);
  // keyboard
  document.addEventListener('keydown', function(e){ if(e.key==='ArrowRight') carouselNext(); if(e.key==='ArrowLeft') carouselPrev(); });
  // touch
  var ts = 0;
  var hero = document.querySelector('.hero');
  if (hero) {
    hero.addEventListener('touchstart', function(e){ ts = e.touches[0].clientX; });
    hero.addEventListener('touchend', function(e){ var d = ts - e.changedTouches[0].clientX; if(Math.abs(d)>50){ d>0?carouselNext():carouselPrev(); } });
  }
});

function checkGrid(){var g=document.querySelector('.about-grid-home');if(!g)return;g.style.gridTemplateColumns=window.innerWidth<768?'1fr':'1fr 1fr';}
window.addEventListener('resize',checkGrid);checkGrid();

/* ══ COUNT-UP ANIMATION ═════════════════════════════ */
(function(){
  var triggered = false;
  function ease(t){ return 1 - Math.pow(1-t,3); }
  function animEl(el){
    var target = parseFloat(el.dataset.target);
    var suffix = el.dataset.suffix||'';
    var dur = 2000, start = null;
    function step(ts){
      if(!start) start=ts;
      var p = Math.min((ts-start)/dur,1);
      el.textContent = Math.floor(ease(p)*target)+suffix;
      if(p<1) requestAnimationFrame(step);
      else el.textContent = target+suffix;
    }
    requestAnimationFrame(step);
  }
  function tryRun(){
    var els = document.querySelectorAll('.count-num');
    if(!els.length) return;
    var r = els[0].getBoundingClientRect();
    if(r.top < window.innerHeight+40){
      if(!triggered){ triggered=true; els.forEach(animEl); }
    }
  }
  window._resetCounters = function(){
    triggered=false;
    setTimeout(tryRun,500);
  };
  window.addEventListener('scroll',tryRun,{passive:true});
  window.addEventListener('load',function(){ setTimeout(tryRun,700); });
})();

/* ══ SERVICE HOVER CANVAS ═══════════════════════════ */
(function(){
  var PALETTES = [
    '#7a1010','#9B1B1B','#6E1010','#8B1515',
    '#aa2020','#751515','#8a1515','#601010'
  ];
  var done = {};

  function paint(canvas, idx){
    var W = canvas.offsetWidth||480, H=canvas.offsetHeight||300;
    canvas.width=W; canvas.height=H;
    var ctx=canvas.getContext('2d');
    var col = PALETTES[idx%PALETTES.length];

    // base
    ctx.fillStyle='#0a0303'; ctx.fillRect(0,0,W,H);

    // radial glow
    var g=ctx.createRadialGradient(W*.6,H*.45,0,W*.6,H*.45,W*.65);
    g.addColorStop(0,col); g.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=g; ctx.fillRect(0,0,W,H);

    // fine grid
    ctx.strokeStyle='rgba(155,27,27,0.1)'; ctx.lineWidth=0.5;
    for(var x=0;x<W;x+=36){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
    for(var y=0;y<H;y+=36){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}

    // diagonal lines
    ctx.strokeStyle='rgba(200,30,30,0.12)'; ctx.lineWidth=1;
    for(var d=-H;d<W+H;d+=55){ctx.beginPath();ctx.moveTo(d,0);ctx.lineTo(d+H,H);ctx.stroke();}

    // inner glow
    var sg=ctx.createRadialGradient(W*.55,H*.42,0,W*.55,H*.42,70);
    sg.addColorStop(0,'rgba(255,60,60,0.4)'); sg.addColorStop(1,'rgba(110,16,16,0)');
    ctx.fillStyle=sg; ctx.beginPath(); ctx.arc(W*.55,H*.42,70,0,Math.PI*2); ctx.fill();

    // scan line
    ctx.fillStyle='rgba(255,30,30,0.04)';
    for(var sl=0;sl<H;sl+=4){ ctx.fillRect(0,sl,W,2); }
  }

  document.addEventListener('mouseover', function(e){
    var item = e.target.closest('.service-scroll-item');
    if(!item) return;
    var numEl = item.querySelector('.ssi-num');
    if(!numEl) return;
    var idx = parseInt(numEl.textContent.trim(),10)-1;
    var visual = item.querySelector('.ssi-visual');
    var canvas = item.querySelector('canvas');
    if(!canvas||!visual) return;
    if(!done[idx]){ done[idx]=true; paint(canvas,idx); }
    visual.style.opacity='1'; visual.style.transform='scale(1)';
  });

  document.addEventListener('mouseout', function(e){
    var item = e.target.closest('.service-scroll-item');
    if(!item) return;
    if(e.relatedTarget && item.contains(e.relatedTarget)) return;
    var visual = item.querySelector('.ssi-visual');
    if(visual){ visual.style.opacity='0'; visual.style.transform='scale(1.04)'; }
  });
})();

function checkGrid(){var g=document.querySelector('.about-grid-home');if(!g)return;g.style.gridTemplateColumns=window.innerWidth<768?'1fr':'1fr 1fr';}
window.addEventListener('resize',checkGrid);checkGrid();
// ── FAQ ACCORDION ────────────────────────────────────
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const isOpen = item.classList.contains('open');
  // close all
  document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
  // open this one if it was closed
  if (!isOpen) item.classList.add('open');
}

// ── LEGAL MODAL (Privacy Policy / Terms of Service) ──────────────────────
const legalContent = {
  privacy: `
    <div style="font-size:10px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:var(--red-bright);margin-bottom:8px">Legal</div>
    <h2 style="font-family:var(--font-display);font-size:32px;letter-spacing:1px;color:var(--white);margin-bottom:28px">PRIVACY POLICY</h2>
    <p style="color:var(--text-muted);font-size:13px;font-weight:300;line-height:1.9;margin-bottom:16px">Last updated: January 2026</p>
    <h3 style="color:var(--white);font-size:14px;font-weight:700;letter-spacing:0.5px;margin:28px 0 10px">1. Information We Collect</h3>
    <p style="color:var(--text-muted);font-size:13px;font-weight:300;line-height:1.9;margin-bottom:16px">We collect information you provide directly to us, such as your name, email address, phone number, and any other information you submit through our contact forms or project inquiry forms.</p>
    <h3 style="color:var(--white);font-size:14px;font-weight:700;letter-spacing:0.5px;margin:28px 0 10px">2. How We Use Your Information</h3>
    <p style="color:var(--text-muted);font-size:13px;font-weight:300;line-height:1.9;margin-bottom:16px">We use the information we collect to respond to your inquiries, provide our services, send project updates, and improve our website and offerings. We do not sell your personal data to third parties.</p>
    <h3 style="color:var(--white);font-size:14px;font-weight:700;letter-spacing:0.5px;margin:28px 0 10px">3. Data Security</h3>
    <p style="color:var(--text-muted);font-size:13px;font-weight:300;line-height:1.9;margin-bottom:16px">We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction.</p>
    <h3 style="color:var(--white);font-size:14px;font-weight:700;letter-spacing:0.5px;margin:28px 0 10px">4. Contact</h3>
    <p style="color:var(--text-muted);font-size:13px;font-weight:300;line-height:1.9">For privacy-related queries, contact us at <a href="mailto:info@marvexmedia.com" style="color:var(--red-bright)">info@marvexmedia.com</a></p>
  `,
  terms: `
    <div style="font-size:10px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:var(--red-bright);margin-bottom:8px">Legal</div>
    <h2 style="font-family:var(--font-display);font-size:32px;letter-spacing:1px;color:var(--white);margin-bottom:28px">TERMS OF SERVICE</h2>
    <p style="color:var(--text-muted);font-size:13px;font-weight:300;line-height:1.9;margin-bottom:16px">Last updated: January 2026</p>
    <h3 style="color:var(--white);font-size:14px;font-weight:700;letter-spacing:0.5px;margin:28px 0 10px">1. Acceptance of Terms</h3>
    <p style="color:var(--text-muted);font-size:13px;font-weight:300;line-height:1.9;margin-bottom:16px">By accessing or using the Marvex Media website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
    <h3 style="color:var(--white);font-size:14px;font-weight:700;letter-spacing:0.5px;margin:28px 0 10px">2. Services</h3>
    <p style="color:var(--text-muted);font-size:13px;font-weight:300;line-height:1.9;margin-bottom:16px">Marvex Media provides web development, mobile application development, SEO, AI & automation, branding, and related digital services. All service engagements are subject to a separate written agreement or proposal signed by both parties.</p>
    <h3 style="color:var(--white);font-size:14px;font-weight:700;letter-spacing:0.5px;margin:28px 0 10px">3. Intellectual Property</h3>
    <p style="color:var(--text-muted);font-size:13px;font-weight:300;line-height:1.9;margin-bottom:16px">Upon full payment, clients receive full ownership of all custom deliverables created for them. Marvex Media retains the right to display completed work in its portfolio unless a non-disclosure agreement is in place.</p>
    <h3 style="color:var(--white);font-size:14px;font-weight:700;letter-spacing:0.5px;margin:28px 0 10px">4. Limitation of Liability</h3>
    <p style="color:var(--text-muted);font-size:13px;font-weight:300;line-height:1.9;margin-bottom:16px">Marvex Media's liability shall not exceed the total fees paid for the specific service giving rise to the claim. We are not liable for indirect, incidental, or consequential damages.</p>
    <h3 style="color:var(--white);font-size:14px;font-weight:700;letter-spacing:0.5px;margin:28px 0 10px">5. Contact</h3>
    <p style="color:var(--text-muted);font-size:13px;font-weight:300;line-height:1.9">For legal enquiries, contact us at <a href="mailto:info@marvexmedia.com" style="color:var(--red-bright)">info@marvexmedia.com</a></p>
  `
};

function showLegal(type) {
  const modal = document.getElementById('legalModal');
  document.getElementById('legalContent').innerHTML = legalContent[type] || '';
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeLegal() {
  document.getElementById('legalModal').style.display = 'none';
  document.body.style.overflow = '';
}

// Close legal modal on Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeLegal();
    closeApply();
  }
});

// ── FLOW DIAGRAM (AI Neural Process) ──────────────────────
function initFlowDiagram() {
  var svg  = document.getElementById('flowSvg');
  var wrap = document.getElementById('flowWrap');
  if (!svg || !wrap) return;
  svg.innerHTML = '';

  var wRect = wrap.getBoundingClientRect();

  function centerOf(id) {
    var el = document.getElementById(id); if (!el) return null;
    var r = el.getBoundingClientRect();
    return { x: r.left + r.width/2 - wRect.left, y: r.top + r.height/2 - wRect.top };
  }
  function rightOf(id) {
    var el = document.getElementById(id); if (!el) return null;
    var r = el.getBoundingClientRect();
    return { x: r.right - wRect.left, y: r.top + r.height/2 - wRect.top };
  }
  function leftOf(id) {
    var el = document.getElementById(id); if (!el) return null;
    var r = el.getBoundingClientRect();
    return { x: r.left - wRect.left, y: r.top + r.height/2 - wRect.top };
  }

  var coreC = centerOf('fb-core');
  if (!coreC) return;

  /* ─── helper: draw a neural path ─── */
  function drawLine(d, stroke, sw, drawDelay, dotDur, dotBegin, dotCount) {
    dotCount = dotCount || 1;
    // ghost track
    var ghost = document.createElementNS('http://www.w3.org/2000/svg','path');
    ghost.setAttribute('d',d); ghost.setAttribute('fill','none');
    ghost.setAttribute('stroke','rgba(155,27,27,0.1)');
    ghost.setAttribute('stroke-width', sw);
    svg.appendChild(ghost);

    // animated draw-on
    var anim = document.createElementNS('http://www.w3.org/2000/svg','path');
    anim.setAttribute('d',d); anim.setAttribute('fill','none');
    anim.setAttribute('stroke', stroke);
    anim.setAttribute('stroke-width', sw);
    var len = 600; // rough estimate, getTotalLength fails if not attached
    anim.style.strokeDasharray  = len;
    anim.style.strokeDashoffset = len;
    anim.style.animation = 'flowDraw 1.2s '+drawDelay+'s cubic-bezier(0.4,0,0.2,1) forwards';
    svg.appendChild(anim);

    // motion path
    var mpId = 'mp'+Math.random().toString(36).slice(2,7);
    var mp = document.createElementNS('http://www.w3.org/2000/svg','path');
    mp.setAttribute('id',mpId); mp.setAttribute('d',d);
    mp.setAttribute('fill','none'); mp.setAttribute('stroke','none');
    svg.appendChild(mp);

    // travelling dots
    for (var k = 0; k < dotCount; k++) {
      var dot = document.createElementNS('http://www.w3.org/2000/svg','circle');
      dot.setAttribute('r','3.5'); dot.setAttribute('fill','#d03028');
      dot.style.filter = 'drop-shadow(0 0 7px rgba(255,50,50,1))';
      var am = document.createElementNS('http://www.w3.org/2000/svg','animateMotion');
      am.setAttribute('dur', dotDur+'s');
      am.setAttribute('repeatCount','indefinite');
      am.setAttribute('calcMode','spline');
      am.setAttribute('keyTimes','0;1');
      am.setAttribute('keySplines','0.4 0 0.6 1');
      am.setAttribute('begin', (dotBegin + k * (dotDur/dotCount))+'s');
      var mpath = document.createElementNS('http://www.w3.org/2000/svg','mpath');
      mpath.setAttributeNS('http://www.w3.org/1999/xlink','xlink:href','#'+mpId);
      am.appendChild(mpath); dot.appendChild(am); svg.appendChild(dot);
    }
  }

  /* ─── 1. LEFT PILLS → CORE  (Inputs) ─── */
  var leftPills = ['fp-brief','fp-goals','fp-budget','fp-vision'];
  leftPills.forEach(function(id, i) {
    var pt = rightOf(id); if (!pt) return;
    var d = 'M'+pt.x+','+pt.y+' L'+coreC.x+','+coreC.y;
    drawLine(d, 'rgba(200,30,30,0.6)', 1.5, 0.1+i*0.1, 2.0, 0.2+i*0.4, 2);
  });

  /* ─── 2. CORE → RIGHT PILLS  (Outputs) ─── */
  var rightPills = ['fp-web','fp-app','fp-ai','fp-growth'];
  rightPills.forEach(function(id, i) {
    var pt = leftOf(id); if (!pt) return;
    var d = 'M'+coreC.x+','+coreC.y+' L'+pt.x+','+pt.y;
    drawLine(d, 'rgba(200,30,30,0.6)', 1.5, 0.6+i*0.1, 2.2, 1.0+i*0.5, 2);
  });
}

// Inject keyframe
(function(){
  var s = document.createElement('style');
  s.textContent = '@keyframes flowDraw { to { stroke-dashoffset: 0; } }';
  document.head.appendChild(s);
})();

// Init flow on load if services page is active
window.addEventListener('load', function() {
  var sp = document.getElementById('page-services');
  if (sp && sp.classList.contains('active')) setTimeout(initFlowDiagram, 200);
});
window.addEventListener('resize', function() {
  var sp2 = document.getElementById('page-services');
  if (sp2 && sp2.classList.contains('active')) initFlowDiagram();
});

/* ══ TEAM PAGE – drag scroll + progress ══════════════════ */
(function() {
  var track, isDragging = false, startX = 0, scrollStart = 0;

  function getTrack() {
    if (!track) track = document.getElementById('tmTrack');
    return track;
  }

  function updateProgress() {
    var t = getTrack();
    if (!t) return;
    var bar = document.getElementById('tmProgress');
    if (!bar) return;
    var max = t.scrollWidth - t.clientWidth;
    var pct = max > 0 ? (t.scrollLeft / max) * 100 : 0;
    bar.style.width = pct + '%';
  }

  function onMouseDown(e) {
    var t = getTrack(); if (!t) return;
    isDragging = true;
    startX = e.pageX;
    scrollStart = t.scrollLeft;
    t.classList.add('is-dragging');
    e.preventDefault();
  }
  function onMouseMove(e) {
    if (!isDragging) return;
    var t = getTrack(); if (!t) return;
    var dx = e.pageX - startX;
    t.scrollLeft = scrollStart - dx;
    updateProgress();
  }
  function onMouseUp() {
    isDragging = false;
    var t = getTrack(); if (t) t.classList.remove('is-dragging');
  }

  function initTeamDrag() {
    var t = getTrack(); if (!t || t._tmInit) return;
    t._tmInit = true;
    t.addEventListener('mousedown', onMouseDown);
    t.addEventListener('scroll', updateProgress);
    /* Touch */
    var ts = 0, tScroll = 0;
    t.addEventListener('touchstart', function(e) {
      ts = e.touches[0].clientX;
      tScroll = t.scrollLeft;
    }, { passive: true });
    t.addEventListener('touchmove', function(e) {
      var dx = ts - e.touches[0].clientX;
      t.scrollLeft = tScroll + dx;
      updateProgress();
    }, { passive: true });
    updateProgress();
  }

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);

  /* Hook into showPage to init when Team opens */
  var _spOrig = showPage;
  showPage = function(id) {
    _spOrig(id);
    if (id === 'team') setTimeout(function() { initTeamDrag(); updateProgress(); }, 80);
  };

  window.addEventListener('load', function() {
    var pg = document.getElementById('page-team');
    if (pg && pg.classList.contains('active')) setTimeout(initTeamDrag, 100);
  });
})();




// ── STATS COUNTER ANIMATION ──────────────────────────
(function() {
  var ran = false;

  function easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  function animateCounters() {
    if (ran) return;
    ran = true;
    var els = document.querySelectorAll('.stat-count');
    els.forEach(function(el) {
      var target   = parseFloat(el.getAttribute('data-target'));
      var suffix   = el.getAttribute('data-suffix') || '';
      var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
      var duration = 1800;
      var startTime = null;

      function step(ts) {
        if (!startTime) startTime = ts;
        var elapsed  = ts - startTime;
        var progress = Math.min(elapsed / duration, 1);
        var eased    = easeOutExpo(progress);
        var current  = eased * target;
        el.textContent = current.toFixed(decimals) + suffix;
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target.toFixed(decimals) + suffix;
      }
      requestAnimationFrame(step);
    });
  }

  // Trigger when hero-stats-bar enters viewport
  var bar = document.getElementById('heroStatsBar');
  if (!bar) return;

  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) { animateCounters(); obs.disconnect(); }
      });
    }, { threshold: 0.3 });
    obs.observe(bar);
  } else {
    // Fallback: run after 800ms
    setTimeout(animateCounters, 800);
  }
})();

/* -- 3D CUBES SCROLL ANIMATION ------------------------ */
(function(){
  var lastScrollY = window.scrollY;
  window.addEventListener('scroll', function() {
    var scrollY = window.scrollY;
    var cubes = document.querySelectorAll('.sh-cubes .cube');
    if(!cubes.length) return;
    
    // Check if services page is active
    var sp = document.getElementById('page-services');
    if (!sp || !sp.classList.contains('active')) return;
    
    cubes.forEach(function(cube, index) {
      // Rotate and float based on scroll position
      var rotateX = 45 + (scrollY * (0.05 + index * 0.02));
      var rotateY = 45 + (scrollY * (0.08 - index * 0.01));
      var translateY = (scrollY * (-0.15 * ((index % 3) + 1)));
      
      cube.style.transform = 'translateY(' + translateY + 'px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
    });
  }, {passive: true});
})();






