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
  var fname   = document.getElementById('f-fname').value.trim();
  var lname   = document.getElementById('f-lname').value.trim();
  var email   = document.getElementById('f-email').value.trim();
  var phone   = document.getElementById('f-phone').value.trim();
  var service = document.getElementById('f-service').value.trim();
  var msg     = document.getElementById('f-msg').value.trim();

  if (!fname || !email || !msg) {
    alert('Please fill in the required fields.');
    return;
  }

  var btn     = document.querySelector('.contact-form .btn-primary');
  var success = document.getElementById('contact-success');
  var loader  = document.getElementById('contact-loader');

  btn.style.display     = 'none';
  loader.style.display  = 'flex';
  success.style.display = 'none';

  fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({
      access_key: '62961f2c-6570-4db3-a495-d3e1dd2aa5ff',
      subject:    'New Enquiry from Marvex Website — ' + fname + ' ' + lname,
      name:       fname + ' ' + lname,
      email:      email,
      phone:      phone,
      service:    service,
      message:    msg
    })
  })
  .then(function(res) { return res.json(); })
  .then(function(data) {
    loader.style.display  = 'none';
    if (data.success) {
      success.style.display = 'block';
      ['f-fname','f-lname','f-email','f-phone','f-service','f-msg'].forEach(function(id) {
        var el = document.getElementById(id);
        if (el) el.value = '';
      });
      setTimeout(function () { btn.style.display = 'flex'; }, 3000);
      setTimeout(function () { success.style.display = 'none'; }, 5000);
    } else {
      btn.style.display = 'flex';
      alert('Something went wrong. Please try again.');
    }
  })
  .catch(function() {
    loader.style.display  = 'none';
    btn.style.display     = 'flex';
    alert('Network error. Please try again.');
  });
}
function openApply(title){
  document.getElementById('applyTitle').textContent = title;
  document.getElementById('applyModal').classList.add('open');
  document.getElementById('apply-success').style.display = 'none';
  ['a-fname','a-lname','a-email','a-phone','a-linkedin','a-portfolio','a-cover'].forEach(function(id){
    var el = document.getElementById(id);
    if(el) el.value = '';
  });
  document.body.style.overflow = 'hidden';
}
function closeApply(){document.getElementById('applyModal').classList.remove('open');document.body.style.overflow='';}
function submitApply(){
  var fname     = document.getElementById('a-fname').value.trim();
  var lname     = document.getElementById('a-lname').value.trim();
  var email     = document.getElementById('a-email').value.trim();
  var phone     = document.getElementById('a-phone').value.trim();
  var linkedin  = document.getElementById('a-linkedin') ? document.getElementById('a-linkedin').value.trim() : '';
  var portfolio = document.getElementById('a-portfolio') ? document.getElementById('a-portfolio').value.trim() : '';
  var cover     = document.getElementById('a-cover').value.trim();
  var jobTitle  = document.getElementById('applyTitle').textContent;

  if(!fname || !email){
    alert('Please fill in the required fields.');
    return;
  }

  var btn     = document.querySelector('.apply-modal .btn-primary');
  var success = document.getElementById('apply-success');
  btn.style.opacity = '0.5';
  btn.innerText     = 'Submitting...';

  fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({
      access_key: '62961f2c-6570-4db3-a495-d3e1dd2aa5ff',
      subject:    'New Job Application — ' + jobTitle + ' — ' + fname + ' ' + lname,
      name:       fname + ' ' + lname,
      email:      email,
      phone:      phone,
      position:   jobTitle,
      linkedin:   linkedin,
      portfolio:  portfolio,
      cover_letter: cover
    })
  })
  .then(function(res) { return res.json(); })
  .then(function(data) {
    btn.style.opacity = '1';
    btn.innerText     = 'Submit Application →';
    if (data.success) {
      btn.style.display     = 'none';
      success.style.display = 'block';
      setTimeout(function(){
        closeApply();
        btn.style.display = 'flex';
      }, 2500);
    } else {
      alert('Something went wrong. Please try again.');
    }
  })
  .catch(function(){
    btn.style.opacity = '1';
    btn.innerText     = 'Submit Application →';
    alert('Network error. Please try again.');
  });
}

function checkGrid(){
  var g=document.querySelector('.about-grid-home');
  if(!g)return;
  g.style.gridTemplateColumns=window.innerWidth<768?'1fr':'1fr 1fr';
}
window.addEventListener('resize',checkGrid);
checkGrid();

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

window.addEventListener('loaderFinished', function() {
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
  window.addEventListener('loaderFinished', function(){ setTimeout(tryRun, 300); });
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


// ── FAQ ACCORDION ────────────────────────────────────
function toggleFaq(btn) {
  var item = btn.closest('.faq-item');
  var isOpen = item.classList.contains('open');
  // close all
  document.querySelectorAll('.faq-item.open').forEach(function(i) { i.classList.remove('open'); });
  // open this one if it was closed
  if (!isOpen) item.classList.add('open');
}

// ── LEGAL MODAL (Privacy Policy / Terms of Service) ──────────────────────
var legalContent = {
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

// ── CONSULTATION MODAL ───────────────────────────────────
function openConsult() {
  var m = document.getElementById('consultModal');
  if (!m) return;
  m.classList.add('open');
  document.body.style.overflow = 'hidden';
  document.getElementById('consultForm').style.display = 'block';
  document.getElementById('consultLoader').style.display = 'none';
  document.getElementById('consultSuccess').style.display = 'none';
  ['c-name', 'c-email', 'c-phone'].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.value = '';
  });
}

function closeConsult() {
  var m = document.getElementById('consultModal');
  if (!m) return;
  m.classList.remove('open');
  document.body.style.overflow = '';
}

function submitConsult() {
  var name  = (document.getElementById('c-name')  || {}).value  || '';
  var email = (document.getElementById('c-email') || {}).value || '';
  var phone = (document.getElementById('c-phone') || {}).value || '';

  if (!name.trim()) {
    alert('Please enter your name.');
    return;
  }
  if (!email.trim() || !email.includes('@')) {
    alert('Please enter a valid email address.');
    return;
  }

  document.getElementById('consultForm').style.display   = 'none';
  document.getElementById('consultLoader').style.display = 'block';
  document.getElementById('consultSuccess').style.display = 'none';

  setTimeout(function() {
    document.getElementById('consultLoader').style.display  = 'none';
    var success = document.getElementById('consultSuccess');
    success.style.display = 'block';
    // restart SVG animations
    var circle = success.querySelector('.c-success-circle');
    var check  = success.querySelector('.c-success-check');
    if (circle) { circle.style.animation = 'none'; void circle.offsetWidth; circle.style.animation = ''; }
    if (check)  { check.style.animation  = 'none'; void check.offsetWidth;  check.style.animation  = ''; }
    setTimeout(function() { closeConsult(); }, 3200);
  }, 1800);
}

function showLegal(type) {
  var modal = document.getElementById('legalModal');
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
    closeConsult();
  }
});

// ── FLOW DIAGRAM (Client → Marvex → Output) ───────────────
function initFlowDiagram() {
  var svg  = document.getElementById('flowSvg');
  var wrap = document.getElementById('flowWrap');
  if (!svg || !wrap) return;
  svg.innerHTML = '';

  // Don't draw on stacked mobile layout
  if (window.innerWidth <= 820) return;

  /* ── Resize the SVG to exactly match the wrap's rendered dimensions ── */
  var wRect = wrap.getBoundingClientRect();
  var W = wRect.width;
  var H = wRect.height;
  svg.setAttribute('width',   W);
  svg.setAttribute('height',  H);
  svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
  /* overflow:visible lets dots/glows bleed outside without being clipped */
  svg.setAttribute('overflow', 'visible');

  /* Helper: converts an element's viewport rect → SVG coordinate space */
  function cx(el) {
    var r = el.getBoundingClientRect();
    return { x: r.left + r.width  / 2 - wRect.left,
             y: r.top  + r.height / 2 - wRect.top  };
  }
  function re(el) { /* right-centre edge */
    var r = el.getBoundingClientRect();
    return { x: r.right - wRect.left, y: r.top + r.height / 2 - wRect.top };
  }
  function le(el) { /* left-centre edge */
    var r = el.getBoundingClientRect();
    return { x: r.left  - wRect.left, y: r.top + r.height / 2 - wRect.top };
  }
  function byId(id) { return document.getElementById(id); }

  var coreEl = byId('fb-core');
  if (!coreEl) return;
  var core = cx(coreEl);
  if (!core) return;

  /* Hub-and-spoke: every pill connects to the SAME Marvex center point.
     Left  pills → straight line → core → straight line → right pills
     All spokes radiate from one origin — creating the mind-map / neural-hub look.
     The dot travels: pill ──► core ──► paired output pill, continuously. */
  var pairs = [
    { left: 'fp-brief',  right: 'fp-web'    }, // Raw Data    → AI Automation
    { left: 'fp-goals',  right: 'fp-app'    }, // Strategy    → Scalable Apps
    { left: 'fp-budget', right: 'fp-ai'     }, // Concept     → Predictive Growth
    { left: 'fp-vision', right: 'fp-growth' }  // User Needs  → Smart UI/UX
  ];

  var DOT_R    = 5;      // dot radius px
  var DOT_DUR  = 5.0;    // seconds for full left → right journey
  var STAGGER  = 1.25;   // seconds between each pair's dot
  var PAUSE_F  = 0.44;   // fraction at which dot arrives at core (brief dwell)
  var PAUSE_T  = 0.08;   // fraction of total time spent dwelling at core

  pairs.forEach(function(pair, i) {
    var lEl = byId(pair.left);
    var rEl = byId(pair.right);
    if (!lEl || !rEl) return;
    var lPt = re(lEl);   /* right-centre edge of the left pill  */
    var rPt = le(rEl);   /* left-centre  edge of the right pill */
    if (!lPt || !rPt) return;

    /* Two-segment spoke: left edge → core → right edge (straight lines) */
    var d = 'M ' + lPt.x + ',' + lPt.y
          + ' L ' + core.x + ',' + core.y
          + ' L ' + rPt.x  + ',' + rPt.y;

    /* ── Glow layer (wider, very soft) ── */
    var glow = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    glow.setAttribute('d', d);
    glow.setAttribute('fill', 'none');
    glow.setAttribute('stroke', 'rgba(200,30,30,0.10)');
    glow.setAttribute('stroke-width', '5');
    glow.setAttribute('stroke-linecap', 'round');
    svg.appendChild(glow);

    /* ── Main track line ── */
    var track = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    track.setAttribute('d', d);
    track.setAttribute('fill', 'none');
    track.setAttribute('stroke', 'rgba(190,30,30,0.55)');
    track.setAttribute('stroke-width', '1.2');
    track.setAttribute('stroke-linecap', 'round');
    svg.appendChild(track);

    /* ── Hidden motion path for the dot ── */
    var mpId = 'mp_' + i;
    var mp   = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    mp.setAttribute('id', mpId);
    mp.setAttribute('d',  d);
    mp.setAttribute('fill',   'none');
    mp.setAttribute('stroke', 'none');
    svg.appendChild(mp);

    /* ── Glowing dot ── */
    var dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    dot.setAttribute('r',    DOT_R);
    dot.setAttribute('fill', '#e82020');
    dot.style.filter = 'drop-shadow(0 0 5px rgba(240,40,40,1)) drop-shadow(0 0 12px rgba(200,20,20,0.8))';

    /* Dot travels at uniform speed but dwells briefly at the core midpoint */
    var am = document.createElementNS('http://www.w3.org/2000/svg', 'animateMotion');
    am.setAttribute('dur',         DOT_DUR + 's');
    am.setAttribute('repeatCount','indefinite');
    am.setAttribute('calcMode',   'linear');
    am.setAttribute('keyTimes',   '0; ' + PAUSE_F + '; ' + (PAUSE_F + PAUSE_T) + '; 1');
    am.setAttribute('keyPoints',  '0; 0.5; 0.5; 1');
    am.setAttribute('begin',      (i * STAGGER) + 's');

    var mpath = document.createElementNS('http://www.w3.org/2000/svg', 'mpath');
    mpath.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#' + mpId);
    am.appendChild(mpath);
    dot.appendChild(am);
    svg.appendChild(dot);

    /* ── Small static dot at core junction — shows the convergence point ── */
    var jDot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    jDot.setAttribute('cx',   core.x);
    jDot.setAttribute('cy',   core.y);
    jDot.setAttribute('r',    '3');
    jDot.setAttribute('fill', 'rgba(220,30,30,0.5)');
    svg.appendChild(jDot);
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
    
    // Add global scroll function for arrows
    window.scrollTeamTrack = function(dir) {
      var amount = t.clientWidth * 0.7;
      t.scrollBy({ left: amount * dir, behavior: 'smooth' });
    };

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
  window.addEventListener('scroll', function() {
    var scrollY = window.scrollY;
    var cubes = document.querySelectorAll('.sh-cubes .cube');
    if(!cubes.length) return;
    
    var sp = document.getElementById('page-services');
    if (!sp || !sp.classList.contains('active')) return;
    
    cubes.forEach(function(cube, index) {
      var rotateX = 45 + (scrollY * (0.05 + index * 0.02));
      var rotateY = 45 + (scrollY * (0.08 - index * 0.01));
      var translateY = (scrollY * (-0.15 * ((index % 3) + 1)));
      cube.style.transform = 'translateY(' + translateY + 'px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
    });
  }, {passive: true});
})();


/* ══ TRANSLATION ENGINE — FULL SITE ════════════════ */

/* ── selector map: [cssSelector, english, arabic, useInnerHTML] ── */
var SELECTOR_MAP = [
  /* ── HOME hero eyebrows ── */
  ['#hs-0 .hero-eyebrow','Next-Gen Technology Solutions','حلول التقنية من الجيل القادم',false],
  ['#hs-1 .hero-eyebrow','Strategic Brand Engineering','هندسة استراتيجية للعلامات التجارية',false],
  ['#hs-2 .hero-eyebrow','AI & Automation Pioneers','روّاد الذكاء الاصطناعي والأتمتة',false],

  /* ── HOME highlight/about snippet ── */
  ['#page-home .highlight-section .section-tag','Who We Are','من نحن',false],
  ['#page-home .highlight-section .section-title','BUILT BY ENGINEERS.<br>DRIVEN BY INNOVATION.','بُنينا بأيدي المهندسين.<br>مدفوعون بـ<span class="red">الابتكار.</span>',true],
  ['#page-home .highlight-section .about-grid-home > div > p:first-of-type','Marvex Media is a full-stack technology company at the intersection of design, engineering, and strategy. We craft digital ecosystems that generate measurable results.','مارفيكس ميديا شركة تقنية متكاملة عند تقاطع التصميم والهندسة والاستراتيجية. نبني أنظمة رقمية تُحقق نتائج قابلة للقياس.',false],
  ['#page-home .highlight-section .about-grid-home > div > p:last-of-type','From startups disrupting markets to enterprises scaling globally — we deliver technology that works and compounds.','من الشركات الناشئة التي تُحدث ثورة في الأسواق إلى المؤسسات العالمية — نُقدّم تقنيات تعمل وتتضاعف.',false],
  ['#page-home .highlight-section .btn-link','Learn More About Us','اعرف المزيد عنّا',false],
  ['#page-home .highlight-section .tech-grid + p','+ 30 MORE MODERN TECHNOLOGIES','+ 30 تقنية حديثة أخرى',false],
  ['#page-home .highlight-section > div > div > div > p:first-child','TECH STACK','مجموعة التقنيات',false],

  /* ── HOME process section ── */
  ['#page-home > section:not(.home-team-section) .section-tag','Our Process','عمليتنا',false],
  ['#page-home > section:not(.home-team-section) .section-title','FROM IDEA TO LAUNCH IN 4 STEPS','من الفكرة إلى الإطلاق في 4 خطوات',false],

  /* ── HOME team section ── */
  ['#page-home .home-team-section .section-tag','Our Team','فريقنا',false],
  ['#page-home .home-team-section .section-title','MEET THE MIND BEHIND MARVEX','تعرف على العقل خلف مارفيكس',false],
  ['#page-home .home-team-sub','The person behind Marvex — building quietly, growing steadily, and staying focused on what actually matters.','الشخص خلف مارفيكس — يبني بهدوء، وينمو بثبات، ويركز على ما يهم فعلاً.',false],
  ['#page-home .tm-role-tag','Founder & MD','المؤسس والمدير الإداري',false],
  ['#page-home .tm-name','Muhammed Salman','محمد سلمان',false],
  ['#page-home .tm-title','Founder & Managing Director','المؤسس والمدير الإداري',false],
  ['#page-home .tm-bio','Visionary entrepreneur driving Marvex Media\'s mission to engineer tomorrow\'s digital reality across UAE, Qatar and India.','رائد أعمال ذو رؤية يقود مسيرة مارفيكس ميديا لهندسة الواقع الرقمي لأعمال الغد في الإمارات وقطر والهند.',false],
  ['#page-home .home-team-journey-text','Muhammed started Marvex with a simple belief — that good work, done honestly, builds something lasting. From early client projects to leading a cross-border team, every step has been about staying curious, staying grounded, and doing right by the people we work with.','بدأ محمد مارفيكس بقناعة بسيطة — أن العمل الجيد المنجز بأمانة يبني شيئاً راسخاً. من المشاريع الأولى إلى قيادة فريق عبر الحدود، كانت كل خطوة تتمحور حول الفضول والثبات والالتزام بمن نعمل معهم.',false],

  /* ── HOME services section header ── */
  ['#page-home .services-scroll-section .section-tag','What We Do','ماذا نفعل',false],
  ['#page-home .services-scroll-section .section-title','SERVICES','الخدمات',false],
  ['#page-home .services-header-right > p','End-to-end digital engineering for forward-thinking brands across UAE, Qatar, and India.','هندسة رقمية متكاملة للعلامات التجارية الطموحة في الإمارات وقطر والهند.',false],

  /* ── HOME clients section ── */
  ['#page-home .clients-header .section-tag','Trusted By','موثوق بنا من قِبَل',false],
  ['#page-home .clients-title','BRANDS THAT TRUST MARVEX','العلامات التجارية التي تثق بمارفيكس',false],

  /* ── HOME CTA ── */
  ['#page-home .cta-section h2','READY TO BUILD SOMETHING EXTRAORDINARY?','هل أنت مستعد لبناء شيء استثنائي؟',false],
  ['#page-home .cta-section p',"Let's engineer your vision into a powerful digital product that drives real, measurable results.",'دعنا نُحوّل رؤيتك إلى منتج رقمي قوي يحقق نتائج حقيقية وقابلة للقياس.',false],

  /* ── SERVICES PAGE hero ── */
  ['#page-services .sh-pill','<span class="pill-badge">SERVICES</span> Built for ambitious brands','<span class="pill-badge">الخدمات</span> مصممة للعلامات الطموحة',true],
  ['#page-services .sh-title','Elevate your<br>business.','ارتقِ<br>بأعمالك.',true],
  ['#page-services .sh-subtitle','We craft software, AI systems, and digital experiences that transform how your business grows and competes.','نصنع برمجيات وأنظمة ذكاء اصطناعي وتجارب رقمية تُحوّل طريقة نمو أعمالك.',false],

  /* ── SERVICES flow section ── */
  ['#page-services .flow-header .section-tag','AI-Powered Process','عملية مدعومة بالذكاء الاصطناعي',false],
  ['#page-services .flow-header .section-title','INTELLIGENT. EFFICIENT. <span class="red">SCALABLE.</span>','ذكي. فعّال. <span class="red">قابل للتوسع.</span>',true],
  ['#page-services .flow-subtitle','Watch how our team and AI systems process raw concepts into high-impact digital solutions.','شاهد كيف يحوّل فريقنا وأنظمة الذكاء الاصطناعي المفاهيم الخام إلى حلول رقمية عالية التأثير.',false],

  /* ── SERVICES services-section ── */
  ['#page-services .services-scroll-section .section-tag','What We Do','ماذا نفعل',false],
  ['#page-services .services-scroll-section .section-title','SERVICES','الخدمات',false],

  /* ── SERVICES CTA ── */
  ['#page-services .cta-section h2','READY TO BUILD SOMETHING EXTRAORDINARY?','هل أنت مستعد لبناء شيء استثنائي؟',false],
  ['#page-services .cta-section p',"Let's engineer your vision into a powerful digital product.",'دعنا نُحوّل رؤيتك إلى منتج رقمي قوي.',false],

  /* ── ABOUT hero ── */
  ['#page-about .about-hero .section-tag','Who We Are','من نحن',false],
  ['#page-about .about-hero .section-title','BUILT BY ENGINEERS.<br>DRIVEN BY <span class="red">RESULTS.</span>','بُنينا بأيدي المهندسين.<br>مدفوعون بـ<span class="red">النتائج.</span>',true],
  ['#page-about .about-hero > div > p:first-of-type','Marvex Media is a full-stack technology company at the intersection of design, engineering, and strategy — headquartered in Ajman, UAE, with operations across Qatar and India. We build digital products that generate real, measurable results for the businesses we work with.','مارفيكس ميديا شركة تقنية متكاملة عند تقاطع التصميم والهندسة والاستراتيجية — مقرها الرئيسي في عجمان بالإمارات مع عمليات في قطر والهند. نبني منتجات رقمية تحقق نتائج حقيقية وقابلة للقياس للشركات التي نعمل معها.',false],
  ['#page-about .about-hero > div > p:last-of-type',"Over 5 years, we've delivered 25+ projects for 20+ clients — from early-stage startups finding their footing to growing businesses ready to scale. Every engagement is built on honest work, clear communication, and a genuine commitment to client success.",'على مدار أكثر من 5 سنوات، قدّمنا أكثر من 25 مشروعاً لأكثر من 20 عميلاً — من الشركات الناشئة التي تبحث عن مسارها إلى الشركات الجاهزة للتوسع. كل مشاركة مبنية على عمل صادق وتواصل واضح والتزام حقيقي بنجاح العميل.',false],

  /* ── ABOUT values ── */
  ['#page-about section .section-tag','Our Values','قيمنا',false],
  ['#page-about section .section-title','WHAT DRIVES US FORWARD','ما يدفعنا للأمام',false],

  /* ── ABOUT LWT ── */
  ['#page-about .lwt-tagline',"Work with us if average isn't your thing.<br>Drop it, we'll build it.",'اعمل معنا إن لم يكن المتوسط خيارك.<br>أخبرنا، سنبنيه لك.',true],

  /* ── PORTFOLIO clients section ── */
  ['#page-portfolio .pf-header-label','OUR CLIENTS','عملاؤنا',false],
  ['#page-portfolio .pf-header-year','2024','٢٠٢٤',false],

  /* ── PORTFOLIO hero ── */
  ['#page-portfolio .page-hero .section-tag','Our Work','أعمالنا',false],
  ['#page-portfolio .page-hero .section-title','PROJECTS THAT MOVE THE NEEDLE','مشاريع تُحدث فارقاً',false],
  ['#page-portfolio .page-hero .section-subtitle',"A selection of high-impact digital products we've engineered for ambitious clients across the globe.",'مجموعة مختارة من المنتجات الرقمية عالية التأثير التي صممناها لعملاء طموحين حول العالم.',false],
  ['#page-portfolio .cta-section h2','YOUR PROJECT COULD BE NEXT','مشروعك القادم قد يكون هنا',false],
  ['#page-portfolio .cta-section p',"Let's talk about what we can build together.",'دعنا نتحدث عمّا يمكننا بناؤه معاً.',false],

  /* ── CONTACT page ── */
  ['#page-contact .contact-body .contact-item-text p:first-of-type','Ajman, United Arab Emirates','عجمان، الإمارات العربية المتحدة',false],
  ['#page-contact .contact-item-text p:last-of-type','24/7 Technical Support Available','دعم فني متاح على مدار الساعة طوال أيام الأسبوع',false],
  ['#page-contact .contact-body > div > div[style*="margin-top:40px"] > p','OUR LOCATIONS','مواقعنا',false],

  ['#page-contact .page-hero .section-tag','Get In Touch','تواصل معنا',false],
  ['#page-contact .page-hero .section-title',"LET'S BUILD SOMETHING<br>EXTRAORDINARY TOGETHER",'لنبنِ شيئاً<br>استثنائياً معاً',true],
  ['#page-contact .page-hero .section-subtitle',"Tell us about your project and we'll get back to you within 24 hours with a tailored proposal.",'أخبرنا عن مشروعك وسنعود إليك خلال 24 ساعة بعرض مخصص.',false],
  ['#page-contact .contact-body > div > h3','Contact Information','معلومات الاتصال',false],
  ['#page-contact .contact-form > h3','Send Us a Message','أرسل لنا رسالة',false],
  ['#page-contact .cta-section h2','PREFER TO JUMP ON A CALL?','تفضّل التحدث عبر مكالمة؟',false],
  ['#page-contact .cta-section p','Book a free 30-minute strategy call with one of our senior engineers.','احجز مكالمة استراتيجية مجانية مدتها 30 دقيقة مع أحد كبار مهندسينا.',false],

  /* ── CAREERS hero ── */
  ['#page-careers .page-hero .section-tag','Join Our Team','انضم لفريقنا',false],
  ['#page-careers .page-hero .section-title','BUILD THE FUTURE.<br>WITH THE BEST.','ابنِ المستقبل.<br>مع الأفضل.',true],
  ['#page-careers .page-hero .section-subtitle',"We're a team of engineers, designers, and growth hackers on a mission to redefine digital. If you're exceptional — we want to hear from you.",'نحن فريق من المهندسين والمصممين وخبراء النمو في مهمة لإعادة تعريف الرقمي. إذا كنت استثنائياً — نريد سماعك.',false],

  /* ── CAREERS perks section ── */
  ['#page-careers .highlight-section .section-tag','Life at Marvex','الحياة في مارفيكس',false],
  ['#page-careers .highlight-section .section-title','WHY JOIN US?','لماذا تنضم إلينا؟',false],

  /* ── CAREERS openings ── */
  ['#page-careers section .section-tag','Open Positions','الوظائف المتاحة',false],
  ['#page-careers section > h2','CURRENT OPENINGS','الشواغر الحالية',false],
  ['#page-careers section > div:last-of-type h3',"Don't See Your Role?",'لا تجد دورك؟',false],
  ['#page-careers section > div:last-of-type p',"We're always looking for exceptional talent. Send us your CV and tell us how you can contribute.",'نحن دائماً نبحث عن المواهب الاستثنائية. أرسل لنا سيرتك الذاتية وأخبرنا كيف يمكنك المساهمة.',false],
  ['#page-careers .cta-section h2','READY TO JOIN THE TEAM?','هل أنت مستعد للانضمام للفريق؟',false],
  ['#page-careers .cta-section p',"We're growing fast. Don't miss your chance to be part of something big.",'نحن ننمو بسرعة. لا تفوّت فرصتك لتكون جزءاً من شيء كبير.',false],

  /* ── FAQ hero ── */
  ['#page-faq .page-hero .section-tag','Got Questions?','هل لديك أسئلة؟',false],
  ['#page-faq .page-hero .section-title','FREQUENTLY ASKED<br><span class="red">QUESTIONS</span>','الأسئلة<br><span class="red">الشائعة</span>',true],
  ['#page-faq .page-hero .section-subtitle',"Everything you need to know about working with Marvex Media.",'كل ما تحتاج معرفته حول العمل مع مارفيكس ميديا.',false],
  ['#page-faq .faq-cta h3','Still have questions?','هل لا تزال لديك أسئلة؟',false],
  ['#page-faq .faq-cta p',"Our team is happy to help. Reach out directly and we'll get back to you within one business day.",'فريقنا سعيد بالمساعدة. تواصل معنا مباشرة وسنعود إليك خلال يوم عمل واحد.',false],
  ['#page-faq .cta-section h2','READY TO GET STARTED?','هل أنت مستعد للبدء؟',false],
  ['#page-faq .cta-section p',"Let's turn your vision into a product people love.",'دعنا نُحوّل رؤيتك إلى منتج يُحبه الناس.',false],

  /* ── TEAM quote ── */
  ['.tm-card--text .tm-quote-text',"We don't just build products — we architect outcomes that matter.",'نحن لا نبني منتجات فحسب — بل نهندس نتائج تُحدث فارقاً.',false],

  /* ── FOOTER ── */
  ['.footer-brand > p',"Engineering Tomorrow's Digital Reality. A full-stack technology partner for businesses that demand excellence.",'هندسة الواقع الرقمي للغد. شريك تقني متكامل للشركات التي تسعى للتميز.',false],
  ['.footer-bottom p:first-child','© 2026 Marvex Media. All rights reserved.','© 2026 مارفيكس ميديا. جميع الحقوق محفوظة.',false]
];

/* ── contact form labels & info headings (by index) ── */
var CONTACT_LABELS_EN = ['First Name *','Last Name','Email Address *','Phone Number','Service Interested In','Tell Us About Your Project *'];
var CONTACT_LABELS_AR = ['الاسم الأول *','اسم العائلة','البريد الإلكتروني *','رقم الهاتف','الخدمة التي تهمك','أخبرنا عن مشروعك *'];
var CONTACT_INFO_EN   = ['Email Us','Call Us','Headquarters','Support Hours'];
var CONTACT_INFO_AR   = ['راسلنا','اتصل بنا','المقر الرئيسي','ساعات الدعم'];
var CONTACT_PLACEHOLDERS_EN = ['John','Smith','john@company.com','+971 50 000 0000'];
var CONTACT_PLACEHOLDERS_AR = ['محمد','العمري','you@company.com','+971 50 000 0000'];

/* ── careers job cards (by index) ── */
var JOB_TITLES_EN = ['UI/UX Designer','Backend Developer','Frontend Developer'];
var JOB_TITLES_AR = ['مصمم UI/UX','مطوّر خلفيات','مطوّر واجهات'];
var JOB_META_EN   = [['Design','Remote — UAE / India','Full-Time'],['Engineering','Remote — India','Full-Time'],['Engineering','Remote — UAE / India','Full-Time']];
var JOB_META_AR   = [['تصميم','عن بُعد — الإمارات / الهند','دوام كامل'],['هندسة','عن بُعد — الهند','دوام كامل'],['هندسة','عن بُعد — الإمارات / الهند','دوام كامل']];

var TRANSLATIONS = {
  en: {
    "nav-home":"Home","nav-services":"Services","nav-about":"About","nav-portfolio":"Portfolio",
    "nav-careers":"Careers","nav-contact":"Contact","nav-faq":"FAQ","nav-team":"Team",
    "m-nav-home":"Home","m-nav-services":"Services","m-nav-about":"About","m-nav-portfolio":"Portfolio",
    "m-nav-careers":"Careers","m-nav-contact":"Contact","m-nav-faq":"FAQ","m-nav-team":"Team",
    "nav-cta-btn":"Get Started →",
    "hero-btn-0-0":"Start Your Project →","hero-btn-0-1":"View Our Work",
    "hero-btn-1-0":"Our Story →","hero-btn-1-1":"What We Do",
    "hero-btn-2-0":"Explore AI Services →","hero-btn-2-1":"Get Started",
    "services-overview-btn":"Full Services Overview",
    "home-team-view-all":"View Full Team →",
    "home-consult-btn":"Start Free Consultation →",
    "services-cta-btn":"Get Started →",
    "services-footer-cta":"Start Free Consultation →",
    "about-work-btn":"Work With Us →","about-services-btn":"Our Services",
    "about-lwt-cta":"SAY HELLO →",
    "portfolio-cta-btn":"Start a Conversation →",
    "careers-open-app-btn":"Send Open Application →","careers-footer-cta":"Apply Today →",
    "faq-contact-btn":"Contact Us →","faq-footer-cta":"Start Free Consultation →",
    "hero-h1-0":"ENGINEERING<br>TOMORROW'S<br><span class=\"red\">DIGITAL</span><br>REALITY.",
    "hero-sub-0":"We architect high-performance websites, scalable applications, and AI-powered marketing systems that dominate the digital landscape.",
    "hero-h1-1":"BUILDING<br>BRAND<br><span class=\"red\">LEGACIES</span><br>THAT LAST.",
    "hero-sub-1":"From startups disrupting markets to enterprises scaling globally — we craft digital ecosystems that generate measurable results.",
    "hero-h1-2":"TECHNOLOGY<br>THAT<br><span class=\"red\">EVOLVES</span><br>WITH YOU.",
    "hero-sub-2":"Custom AI models, intelligent automation, and data-driven frameworks that eliminate bottlenecks and accelerate exponential growth.",
    "tm-intro-tag":"Marvex Media","tm-intro-title":"MEET THE<br><span class=\"red\">TEAM</span>",
    "tm-intro-sub":"The visionaries, engineers, and creatives building the next generation of digital excellence.",
    "tm-name-01":"Salman Asharaf","tm-title-01":"Founder & Managing Director",
    "tm-bio-01":"A visionary entrepreneur and strategist, Salman leads Marvex Media with a focus on engineering high-impact digital solutions and scaling brands across the GCC through technical excellence and innovation.",
    "tm-name-02":"Ahammed","tm-title-02":"Co-Founder & Digital Marketing Expert",
    "tm-bio-02":"Performance-driven marketing expert specializing in data-driven growth and digital strategy. Leading the marketing initiatives at Marvex to deliver high-impact campaigns and optimized ROI.",
    "tm-name-03":"Afnitha Jaleel","tm-title-03":"Co-Founder & CEO",
    "tm-bio-03":"With a sharp focus on business growth and client experience, Afnitha spearheads the strategic vision and operational excellence at Marvex, building lasting partnerships and leading the team toward global success.",
    "presence-tag":"Our Presence","presence-title":"WHERE WE OPERATE",
    "pi-name-ae":"UAE — Headquarters","pi-loc-ae":"Ajman, UAE","pi-tag-ae":"PRIMARY OPERATIONS HUB",
    "pi-name-qa":"Qatar — Regional Office","pi-loc-qa":"Doha, Qatar","pi-tag-qa":"GCC CLIENT SERVICES",
    "pi-name-in":"India — Tech Hub","pi-loc-in":"Development Centre, India","pi-tag-in":"ENGINEERING & DEVELOPMENT",
    "fp-brief":"<span class=\"material-icons-round\">data_object</span>Raw Data",
    "fp-goals":"<span class=\"material-icons-round\">architecture</span>Strategy",
    "fp-budget":"<span class=\"material-icons-round\">lightbulb</span>Concept",
    "fp-vision":"<span class=\"material-icons-round\">groups</span>User Needs",
    "fp-web":"<span class=\"material-icons-round\">smart_toy</span>AI Automation",
    "fp-app":"<span class=\"material-icons-round\">layers</span>Scalable Apps",
    "fp-ai":"<span class=\"material-icons-round\">show_chart</span>Predictive Growth",
    "fp-growth":"<span class=\"material-icons-round\">dashboard_customize</span>Smart UI/UX",
    "c-btn-text":"BOOK MY CALL  →",
    "stats":["Projects Delivered","Happy Clients","Years Excellence","Client Satisfaction","Avg. Delivery"],
    "ssi-names":["WEBSITE<br>DEVELOPMENT","MOBILE<br>APPLICATIONS","SEO<br>OPTIMISATION","SOCIAL MEDIA<br>MARKETING","CLOUD<br>INFRASTRUCTURE","AI &amp;<br>AUTOMATION","E-COMMERCE<br>SOLUTIONS","BRANDING<br>&amp; DESIGN"],
    "ssi-descs":["Build blazing-fast, conversion-optimised sites engineered for performance and SEO dominance.","Cross-platform apps delivering native-grade experiences at scale across iOS and Android.","AI-powered strategies that dominate search rankings and compound organic growth.","Viral-ready content systems and influencer pipelines to amplify your brand presence.","Enterprise-grade scalability with 99.9% availability and 24/7 monitoring built in from day one.","Custom AI models and automation frameworks that eliminate bottlenecks and accelerate growth.","High-converting stores with seamless checkout, inventory management, and retargeting.","Memorable brand identities — from logo and visual language to full brand systems."],
    "value-titles":["Client Success First","Engineering Excellence","Continuous Innovation","Transparent Partnership","Design-Led Thinking","Global Mindset"],
    "value-descs":["Your growth is our growth. Every line of code, every campaign, every decision is made with your business outcomes in mind.","We hold ourselves to the highest technical standards. Clean code, scalable architecture, and rigorous testing are non-negotiable.","We stay ahead of the curve — adopting emerging technologies and methodologies to give our clients a competitive edge.","No black boxes. We communicate openly, report honestly, and build long-term relationships built on trust and mutual respect.","Great technology is nothing without great UX. We obsess over the user experience at every touchpoint of every product we ship.","With operations across UAE, Qatar, and India, we bring regional expertise with global-grade execution to every engagement."],
    "perk-titles":["Competitive Compensation","Remote-Friendly","Learning & Growth","High-Impact Work","Health Benefits","Ownership Culture"],
    "perk-descs":["Market-leading salaries, performance bonuses, and equity options for senior hires.","Work from anywhere in UAE, Qatar, or India. Flexible hours, no micromanagement.","Annual learning budget, conference sponsorships, and internal knowledge-sharing sessions.","Build products used by 200+ companies and millions of end users across the globe.","Comprehensive health insurance coverage for you and your dependents.","Your ideas matter here. We give ownership and autonomy to everyone on the team."],
    "faq-cats":["Getting Started","Pricing & Timelines","Process & Collaboration","Technical & Hosting"],
    "faq-qs":["How do I start a project with Marvex Media?","Do you offer a free consultation?","What information should I prepare before our first call?","How much does a website or app cost?","How long does a typical project take?","Do you offer payment plans?","How do you manage projects and keep clients updated?","Can I see design concepts before development begins?","What if I need changes after launch?","Who hosts the website after it's built?","Will my website be mobile-friendly and fast?","Do you build with open-source or proprietary technology?"],
    "faq-as":["Starting is simple. Click 'Get Started' or head to our Contact page and fill in the project brief form. One of our consultants will reach out within 24 hours to schedule a free discovery call. No pressure, no commitment at this stage — just a conversation.","Yes — we offer a complimentary 45-minute discovery call for every new project inquiry. During this session we scope your requirements, discuss your goals, and provide an honest assessment of the best approach. No sales pitch, just real advice.","It helps to have a rough idea of: (1) what problem you're trying to solve, (2) your target audience, (3) your budget range, and (4) your desired timeline. Even rough answers are fine — we'll help you refine everything during the call.","Pricing varies by scope. A professional marketing website typically starts at AED 8,000–18,000. A custom web application or mobile app usually starts at AED 25,000+. We provide detailed, transparent quotes after our discovery call — no vague estimates.","A standard marketing website takes 3–6 weeks. A complex web application or mobile app typically takes 8–20 weeks depending on features. We always provide a detailed project timeline in your proposal, with milestones and delivery dates agreed upfront.","Yes. We typically structure payments in milestones: 30% upfront, 40% at midpoint, and 30% on delivery. For larger projects, we can arrange custom payment schedules. We accept bank transfer (UAE, Qatar, India), Wise, and major cards.","Every client gets a dedicated project manager and access to a shared Notion workspace where you can see real-time progress, timelines, and deliverables. We hold weekly check-in calls and provide written updates every Friday.","Absolutely. Our design phase happens before any development work. You'll receive Figma mockups for every key screen and we iterate until you're 100% satisfied. Development only starts once designs are signed off.","All projects include a 30-day post-launch support window at no extra cost. After that, we offer flexible maintenance retainers starting at AED 1,500/month, covering updates, bug fixes, security patches, and performance monitoring.","You own all code and assets — fully. We can deploy to your preferred hosting provider (Vercel, AWS, DigitalOcean, etc.) or manage hosting on your behalf.","Always. Mobile-first, responsive design is standard on every project. We target 90+ Google PageSpeed scores across mobile and desktop, and conduct cross-browser testing before launch.","We use battle-tested open-source stacks (React, Next.js, Flutter, Node.js, Python) wherever possible so you're never locked into our services. Your codebase is clean, documented, and transferable."],
    "footer-h4s":["Services","Company","Contact","Powered by"],
    "process-titles":["Discovery","Architecture","Development","Launch & Scale"],
    "process-descs":["Deep-dive into your goals, audience & competitive landscape to define a winning strategy.","System design, wireframing, tech stack selection, and detailed technical specifications.","Agile sprints with continuous integration, weekly demos, and real-time collaboration.","Production deployment, monitoring, performance optimisation, and ongoing growth support."],
    "portfolio-titles":["LuxCart E-Commerce Platform","MedConnect Patient App","FinTrack Analytics Dashboard","BuildRight Construction CRM","EduPath Learning Platform","FoodRush Delivery App","Prestige Hotels Website","AutoServ AI Chatbot","LogiPro Supply Chain"],
    "portfolio-descs":["Shopify + Next.js storefront for a luxury retailer — 3.2x conversion uplift post-launch.","Flutter app connecting 50,000+ patients with healthcare providers in the GCC region.","Real-time financial analytics platform handling $2B+ in transaction data.","Custom CRM for a UAE construction firm managing 200+ active projects.","AI-powered e-learning platform serving 100,000+ students with personalised paths.","On-demand food delivery app launched across 5 cities in 90 days.","Luxury hotel booking platform achieving 98/100 PageSpeed score.","Custom-trained LLM chatbot reducing support tickets by 65%.","Supply chain visibility platform tracking 10,000+ daily shipments across MENA."]
  },
  ar: {
    "nav-home":"الرئيسية","nav-services":"خدماتنا","nav-about":"من نحن","nav-portfolio":"أعمالنا",
    "nav-careers":"الوظائف","nav-contact":"اتصل بنا","nav-faq":"الأسئلة الشائعة","nav-team":"الفريق",
    "m-nav-home":"الرئيسية","m-nav-services":"خدماتنا","m-nav-about":"من نحن","m-nav-portfolio":"أعمالنا",
    "m-nav-careers":"الوظائف","m-nav-contact":"اتصل بنا","m-nav-faq":"الأسئلة الشائعة","m-nav-team":"الفريق",
    "nav-cta-btn":"ابدأ الآن ←",
    "hero-btn-0-0":"ابدأ مشروعك ←","hero-btn-0-1":"شاهد أعمالنا",
    "hero-btn-1-0":"قصتنا ←","hero-btn-1-1":"ماذا نفعل",
    "hero-btn-2-0":"استكشف خدمات الذكاء الاصطناعي ←","hero-btn-2-1":"ابدأ الآن",
    "services-overview-btn":"نظرة عامة على الخدمات",
    "home-team-view-all":"شاهد الفريق بالكامل ←",
    "home-consult-btn":"ابدأ استشارة مجانية ←",
    "services-cta-btn":"ابدأ الآن ←",
    "services-footer-cta":"ابدأ استشارة مجانية ←",
    "about-work-btn":"اعمل معنا ←","about-services-btn":"خدماتنا",
    "about-lwt-cta":"قل مرحباً ←",
    "portfolio-cta-btn":"ابدأ محادثة ←",
    "careers-open-app-btn":"أرسل طلباً مفتوحاً ←","careers-footer-cta":"قدم اليوم ←",
    "faq-contact-btn":"اتصل بنا ←","faq-footer-cta":"ابدأ استشارة مجانية ←",
    "hero-h1-0":"هندسة<br>الواقع<br><span class=\"red\">الرقمي</span><br>للغد.",
    "hero-sub-0":"نحن نصمم مواقع ويب عالية الأداء وتطبيقات قابلة للتطوير وأنظمة تسويق مدعومة بالذكاء الاصطناعي تهيمن على المشهد الرقمي.",
    "hero-h1-1":"بناء<br>إرث<br><span class=\"red\">العلامات</span><br>التجارية.",
    "hero-sub-1":"من الشركات الناشئة التي تحدث ثورة في الأسواق إلى المؤسسات العالمية — نصنع أنظمة رقمية تحقق نتائج ملموسة.",
    "hero-h1-2":"تكنولوجيا<br>تتطور<br><span class=\"red\">معك</span>.",
    "hero-sub-2":"نماذج ذكاء اصطناعي مخصصة وأتمتة ذكية وأطر بيانات تُزيل العوائق وتُسرّع النمو الهائل.",
    "tm-intro-tag":"مارفيكس ميديا","tm-intro-title":"تعرف على<br><span class=\"red\">الفريق</span>",
    "tm-intro-sub":"المبتكرون والمهندسون والمبدعون الذين يبنون الجيل القادم من التميز الرقمي.",
    "tm-name-01":"سلمان أشرف","tm-title-01":"المؤسس والمدير الإداري",
    "tm-bio-01":"رائد أعمال واستراتيجي ذو رؤية، يقود سلمان مارفيكس ميديا مع التركيز على هندسة حلول رقمية عالية التأثير وتوسيع نطاق العلامات التجارية عبر دول مجلس التعاون الخليجي.",
    "tm-name-02":"أحمد","tm-title-02":"المؤسس المشارك وخبير التسويق الرقمي",
    "tm-bio-02":"خبير تسويق يعتمد على الأداء ومتخصص في النمو القائم على البيانات والاستراتيجية الرقمية. يقود مبادرات التسويق في مارفيكس لتقديم حملات عالية التأثير وتحسين العائد على الاستثمار.",
    "tm-name-03":"أفنيثا جليل","tm-title-03":"المؤسسة المشاركة والرئيسة التنفيذية",
    "tm-bio-03":"مع تركيز حاد على نمو الأعمال وتجربة العملاء، تقود أفنيثا الرؤية الاستراتيجية والتميز التشغيلي في مارفيكس، وبناء شراكات دائمة وقيادة الفريق نحو النجاح العالمي.",
    "presence-tag":"تواجدنا","presence-title":"أين نعمل",
    "pi-name-ae":"الإمارات العربية المتحدة — المقر الرئيسي","pi-loc-ae":"عجمان، الإمارات","pi-tag-ae":"مركز العمليات الأساسي",
    "pi-name-qa":"قطر — المكتب الإقليمي","pi-loc-qa":"الدوحة، قطر","pi-tag-qa":"خدمات عملاء مجلس التعاون",
    "pi-name-in":"الهند — المركز التقني","pi-loc-in":"مركز التطوير، الهند","pi-tag-in":"الهندسة والتطوير",
    "fp-brief":"<span class=\"material-icons-round\">data_object</span>بيانات خام",
    "fp-goals":"<span class=\"material-icons-round\">architecture</span>الاستراتيجية",
    "fp-budget":"<span class=\"material-icons-round\">lightbulb</span>المفهوم",
    "fp-vision":"<span class=\"material-icons-round\">groups</span>احتياجات المستخدم",
    "fp-web":"<span class=\"material-icons-round\">smart_toy</span>أتمتة ذكية",
    "fp-app":"<span class=\"material-icons-round\">layers</span>تطبيقات قابلة للتوسع",
    "fp-ai":"<span class=\"material-icons-round\">show_chart</span>نمو تنبؤي",
    "fp-growth":"<span class=\"material-icons-round\">dashboard_customize</span>واجهات ذكية",
    "c-btn-text":"احجز مكالمتي ←",
    "stats":["مشروع مُنجز","عميل سعيد","سنوات تميز","رضا العملاء","متوسط التسليم"],
    "ssi-names":["تطوير<br>المواقع","تطبيقات<br>الجوال","تحسين<br>البحث","التسويق<br>الاجتماعي","البنية<br>السحابية","الذكاء الاصطناعي<br>والأتمتة","حلول<br>التجارة الإلكترونية","الهوية التجارية<br>والتصميم"],
    "ssi-descs":["بناء مواقع فائقة السرعة ومُحسَّنة للتحويل ومصممة للأداء والسيطرة على نتائج البحث.","تطبيقات متعددة المنصات تقدم تجارب متميزة على iOS وAndroid على نطاق واسع.","استراتيجيات مدعومة بالذكاء الاصطناعي تهيمن على نتائج البحث وتُضاعف النمو العضوي.","أنظمة محتوى جاهزة للانتشار وشبكات مؤثرين لتضخيم حضور علامتك التجارية.","قابلية توسع على مستوى المؤسسات مع توفر 99.9% ومراقبة على مدار الساعة.","نماذج ذكاء اصطناعي مخصصة وأطر أتمتة تُزيل العوائق وتُسرّع النمو.","متاجر عالية التحويل مع دفع سلس وإدارة مخزون وإعادة استهداف فعّال.","هويات تجارية لا تُنسى — من الشعار إلى منظومة العلامة التجارية الكاملة."],
    "value-titles":["نجاح العميل أولاً","التميز الهندسي","الابتكار المستمر","الشراكة الشفافة","التفكير القائم على التصميم","عقلية عالمية"],
    "value-descs":["نموك هو نمونا. كل سطر كود وكل حملة وكل قرار يُتخذ مع أهداف أعمالك في الاعتبار.","نلتزم بأعلى المعايير التقنية. الكود النظيف والبنية القابلة للتوسع والاختبار الدقيق غير قابلة للتفاوض.","نبقى في طليعة المشهد — نتبنى التقنيات والمنهجيات الناشئة لمنح عملائنا ميزة تنافسية.","لا صناديق سوداء. نتواصل بصراحة ونُبلّغ بأمانة ونبني علاقات طويلة الأمد قائمة على الثقة والاحترام المتبادل.","التكنولوجيا الرائعة لا شيء بدون تجربة مستخدم رائعة. نهوس بتجربة المستخدم في كل نقطة تماس لكل منتج نُطلقه.","بعمليات في الإمارات وقطر والهند، نُقدّم خبرة إقليمية بتنفيذ عالمي المستوى في كل مشاركة."],
    "perk-titles":["تعويض تنافسي","عمل عن بُعد","التعلم والنمو","عمل عالي التأثير","مزايا صحية","ثقافة الملكية"],
    "perk-descs":["رواتب رائدة في السوق وعلاوات أداء وخيارات ملكية لكبار الموظفين.","اعمل من أي مكان في الإمارات أو قطر أو الهند. ساعات مرنة بدون إدارة تفصيلية.","ميزانية تعلم سنوية ورعاية المؤتمرات وجلسات مشاركة المعرفة الداخلية.","بناء منتجات يستخدمها أكثر من 200 شركة وملايين المستخدمين حول العالم.","تغطية تأمين صحي شاملة لك ولأفراد أسرتك.","أفكارك مهمة هنا. نمنح الملكية والاستقلالية للجميع في الفريق."],
    "faq-cats":["البداية","التسعير والجداول الزمنية","العملية والتعاون","التقنية والاستضافة"],
    "faq-qs":["كيف أبدأ مشروعاً مع مارفيكس ميديا؟","هل تقدمون استشارة مجانية؟","ما المعلومات التي يجب إعدادها قبل مكالمتنا الأولى؟","كم تكلف موقع الويب أو التطبيق؟","كم من الوقت يستغرق المشروع النموذجي؟","هل تقدمون خطط دفع؟","كيف تديرون المشاريع وتُبقون العملاء على اطلاع؟","هل يمكنني رؤية تصاميم المفاهيم قبل بدء التطوير؟","ماذا لو احتجت تعديلات بعد الإطلاق؟","من يستضيف الموقع بعد بنائه؟","هل سيكون موقعي متوافقاً مع الجوال وسريعاً؟","هل تبنون بتقنيات مفتوحة المصدر أم مملوكة؟"],
    "faq-as":["البداية بسيطة. انقر على 'ابدأ الآن' أو توجه إلى صفحة الاتصال واملأ نموذج الموجز. سيتواصل معك أحد مستشارينا خلال 24 ساعة لجدولة مكالمة استكشافية مجانية. لا ضغط ولا التزام في هذه المرحلة.","نعم — نقدم مكالمة استكشافية مجانية مدتها 45 دقيقة لكل استفسار مشروع جديد. نحدد فيها متطلباتك ونناقش أهدافك ونقدم تقييماً صادقاً للنهج الأفضل. لا عروض مبيعات، فقط نصائح حقيقية.","يساعد أن تكون لديك فكرة تقريبية عن: (1) المشكلة التي تحاول حلها، (2) جمهورك المستهدف، (3) نطاق ميزانيتك، (4) الجدول الزمني المطلوب. حتى الإجابات التقريبية مقبولة.","تتفاوت الأسعار حسب النطاق. موقع التسويق الاحترافي يبدأ عادةً من 8,000 — 18,000 درهم. تطبيق ويب مخصص أو تطبيق جوال يبدأ عادةً من 25,000 درهم فما فوق.","موقع التسويق القياسي يستغرق 3 — 6 أسابيع. تطبيق ويب معقد أو تطبيق جوال يستغرق عادةً 8 — 20 أسبوعاً حسب الميزات.","نعم. نُهيكل المدفوعات عادةً على مراحل: 30% مقدماً، 40% في منتصف المشروع، 30% عند التسليم. نقبل التحويل البنكي وWise والبطاقات الرئيسية.","كل عميل يحصل على مدير مشروع مخصص ووصول إلى مساحة عمل Notion مشتركة حيث يمكنك رؤية التقدم الفعلي والجداول الزمنية والمخرجات. نعقد مكالمات أسبوعية ونقدم تحديثات مكتوبة كل جمعة.","بالتأكيد. تحدث مرحلة التصميم قبل أي عمل تطوير. ستتلقى نماذج Figma لكل شاشة رئيسية ونتكرر حتى تكون راضياً 100%.","جميع المشاريع تتضمن نافذة دعم 30 يوماً بعد الإطلاق بدون تكلفة إضافية. بعدها نقدم خطط صيانة مرنة تبدأ من 1,500 درهم شهرياً.","أنت تملك كل الكود والأصول — بالكامل. يمكننا النشر على مزود الاستضافة المفضل لديك أو إدارة الاستضافة نيابةً عنك.","دائماً. التصميم المتجاوب الأول بالجوال معيار في كل مشروع. نستهدف نتائج PageSpeed فوق 90 على الجوال وسطح المكتب.","نستخدم stacks مفتوحة المصدر مُختبَرة (React وNext.js وFlutter وNode.js وPython) حيثما أمكن حتى لا تكون مقيداً بخدماتنا أبداً."],
    "footer-h4s":["الخدمات","الشركة","اتصل بنا","مدعوم بـ"],
    "process-titles":["الاستكشاف","الهندسة المعمارية","التطوير","الإطلاق والتوسع"],
    "process-descs":["تحليل معمّق لأهدافك وجمهورك والمشهد التنافسي لتحديد استراتيجية رابحة.","تصميم النظام والنماذج الأولية واختيار التقنيات والمواصفات التقنية التفصيلية.","سبرينتات رشيقة مع تكامل مستمر وعروض أسبوعية وتعاون فوري.","نشر في بيئة الإنتاج ومراقبة وتحسين الأداء ودعم النمو المستمر."],
    "portfolio-titles":["منصة LuxCart للتجارة الإلكترونية","تطبيق MedConnect للمرضى","لوحة تحليلات FinTrack المالية","نظام إدارة علاقات عملاء BuildRight","منصة EduPath للتعلم","تطبيق FoodRush للتوصيل","موقع فنادق Prestige","روبوت AutoServ الذكي","سلسلة توريد LogiPro"],
    "portfolio-descs":["واجهة Shopify + Next.js لبائع تجزئة فاخر — ارتفاع معدل التحويل 3.2 ضعفاً بعد الإطلاق.","تطبيق Flutter يربط أكثر من 50,000 مريض بمقدمي الرعاية الصحية في منطقة الخليج.","منصة تحليلات مالية في الوقت الفعلي تعالج بيانات معاملات تتجاوز 2 مليار دولار.","نظام CRM مخصص لشركة إنشاءات إماراتية تدير أكثر من 200 مشروع نشط.","منصة تعلم إلكتروني مدعومة بالذكاء الاصطناعي تخدم أكثر من 100,000 طالب بمسارات مخصصة.","تطبيق توصيل طعام فوري أُطلق في 5 مدن خلال 90 يوماً.","منصة حجز فندقية فاخرة حققت 98/100 في نتيجة PageSpeed.","روبوت محادثة مدرَّب على نماذج LLM مخصصة قلّل تذاكر الدعم بنسبة 65%.","منصة رؤية سلسلة التوريد تتتبع أكثر من 10,000 شحنة يومية عبر منطقة الشرق الأوسط وشمال أفريقيا."]
  }
};

function setLanguage(lang) {
  var html = document.documentElement;
  html.setAttribute('lang', lang);
  html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

  document.querySelectorAll('.lang-switch button').forEach(function(btn){ btn.classList.remove('active'); });
  var lb = document.getElementById('lang-' + lang);
  if(lb) lb.classList.add('active');

  var T = TRANSLATIONS[lang];

  // 1. ID-based string updates
  for(var id in T) {
    if(Array.isArray(T[id])) continue;
    var el = document.getElementById(id);
    if(!el) continue;
    if(T[id].indexOf('<') !== -1) el.innerHTML = T[id];
    else el.textContent = T[id];
  }

  // 2. Hero slides (each has .hero-h1 and .hero-sub)
  [0,1,2].forEach(function(i){
    var slide = document.getElementById('hs-' + i);
    if(!slide) return;
    var h1 = slide.querySelector('.hero-h1');
    var sub = slide.querySelector('.hero-sub');
    if(h1 && T['hero-h1-' + i]) h1.innerHTML = T['hero-h1-' + i];
    if(sub && T['hero-sub-' + i]) sub.textContent = T['hero-sub-' + i];
  });

  // Helper: update a list of elements by selector using a translations array
  function arr(sel, key, html) {
    var els = document.querySelectorAll(sel);
    var data = T[key];
    if(!data) return;
    els.forEach(function(el, i){
      var val = data[i % data.length];
      if(val === undefined || val === null) return;
      if(html) el.innerHTML = val;
      else el.textContent = val;
    });
  }

  // 3. Stats bar labels
  arr('.hero-stat-item .lbl', 'stats');

  // 4. Service item names (16 = 8 items × 2 pages)
  arr('.ssi-name', 'ssi-names', true);

  // 5. Service item descriptions (direct <p> child of .ssi-left)
  arr('.ssi-left > p', 'ssi-descs');

  // 6. About page — values cards
  arr('.card h3', 'value-titles');
  arr('.card p', 'value-descs');

  // 7. Careers — perk cards
  arr('.perk-card h4', 'perk-titles');
  arr('.perk-card p', 'perk-descs');

  // 7b. Home — process cards
  arr('.process-card h3', 'process-titles');
  arr('.process-card p', 'process-descs');

  // 7c. Portfolio cards
  arr('.portfolio-card .portfolio-body h3', 'portfolio-titles');
  arr('.portfolio-card .portfolio-body p', 'portfolio-descs');

  // 8. FAQ category labels
  arr('.faq-category-label', 'faq-cats');

  // 9. FAQ questions (replace innerHTML preserving the icon span)
  var faqQs = T['faq-qs'];
  if(faqQs) {
    document.querySelectorAll('.faq-q').forEach(function(btn, i){
      if(faqQs[i]) btn.innerHTML = faqQs[i] + ' <span class="faq-icon">+</span>';
    });
  }

  // 10. FAQ answers
  arr('.faq-a p', 'faq-as');

  // 11. Footer column headings
  var fh = T['footer-h4s'];
  if(fh) document.querySelectorAll('.footer-col h4').forEach(function(el, i){ if(fh[i]) el.textContent = fh[i]; });

  // 12. Consultation modal
  var cEye = document.querySelector('.consult-eyebrow');
  var cTit = document.querySelector('.consult-title');
  var cSub = document.querySelector('.consult-sub');
  var cLt  = document.querySelector('.c-loader-text');
  var cSh  = document.querySelector('.consult-success h3');
  var cSp  = document.querySelector('.consult-success p');
  if(lang === 'ar') {
    if(cEye) cEye.textContent = 'مكالمة استراتيجية مجانية';
    if(cTit) cTit.textContent = 'لنتحدث.';
    if(cSub) cSub.textContent = 'أترك بياناتك — سنتواصل معك خلال 24 ساعة.';
    if(cLt)  cLt.textContent  = 'جارٍ إرسال طلبك…';
    if(cSh)  cSh.textContent  = 'تم الحجز!';
    if(cSp)  cSp.textContent  = 'سنتواصل معك خلال 24 ساعة لتأكيد مكالمتك.';
    var cLabels = document.querySelectorAll('.consult-field label');
    var labAr = ['الاسم الكامل','البريد الإلكتروني','الهاتف / واتساب'];
    cLabels.forEach(function(lb, i){ if(labAr[i]) lb.textContent = labAr[i]; });
  } else {
    if(cEye) cEye.textContent = 'Free Strategy Call';
    if(cTit) cTit.textContent = "LET'S TALK.";
    if(cSub) cSub.textContent = "Drop your details — we'll reach out within 24 hours.";
    if(cLt)  cLt.textContent  = 'Sending your request…';
    if(cSh)  cSh.textContent  = "You're booked in!";
    if(cSp)  cSp.textContent  = "We'll be in touch within 24 hours to confirm your call.";
    var cLabels = document.querySelectorAll('.consult-field label');
    var labEn = ['Full Name','Email Address','Phone / WhatsApp'];
    cLabels.forEach(function(lb, i){ if(labEn[i]) lb.textContent = labEn[i]; });
  }

  // 13. SELECTOR_MAP — covers all page-scoped headings, paragraphs, tags, CTAs
  SELECTOR_MAP.forEach(function(entry) {
    var el = document.querySelector(entry[0]);
    if (!el) return;
    var val = lang === 'ar' ? entry[2] : entry[1];
    if (entry[3]) el.innerHTML = val;
    else el.textContent = val;
  });

  // 14. Contact form labels
  var cfLabels = document.querySelectorAll('#page-contact .form-group label');
  var cfArr = lang === 'ar' ? CONTACT_LABELS_AR : CONTACT_LABELS_EN;
  cfLabels.forEach(function(lb, i){ if (cfArr[i]) lb.textContent = cfArr[i]; });

  // 14b. Contact form placeholders
  var cfInputs = document.querySelectorAll('#page-contact .form-group input, #page-contact .form-group textarea, #page-contact .form-group select');
  var cfPh = lang === 'ar' ? CONTACT_PLACEHOLDERS_AR : CONTACT_PLACEHOLDERS_EN;
  cfInputs.forEach(function(inp, i){ if (cfPh[i]) inp.setAttribute('placeholder', cfPh[i]); });

  // 15. Contact info headings (Email Us / Call Us / Headquarters / Support Hours)
  var ciH4s = document.querySelectorAll('#page-contact .contact-item-text h4');
  var ciArr = lang === 'ar' ? CONTACT_INFO_AR : CONTACT_INFO_EN;
  ciH4s.forEach(function(el, i){ if (ciArr[i]) el.textContent = ciArr[i]; });

  // 16. Careers job card titles
  var jtEls = document.querySelectorAll('.job-title');
  var jtArr = lang === 'ar' ? JOB_TITLES_AR : JOB_TITLES_EN;
  jtEls.forEach(function(el, i){ if (jtArr[i]) el.textContent = jtArr[i]; });

  // 17. Careers job card meta tags (department / location / type)
  document.querySelectorAll('.job-card').forEach(function(card, i) {
    var metaTags = card.querySelectorAll('.job-tag');
    var meta = lang === 'ar' ? JOB_META_AR[i] : JOB_META_EN[i];
    if (meta) metaTags.forEach(function(t, j){ if (meta[j]) t.textContent = meta[j]; });
  });

  // 18a. Contact form submit button + success/loader text
  (function() {
    var cSubmit  = document.querySelector('#page-contact .btn-primary');
    var cLoader  = document.querySelector('#page-contact .cl-text');
    var cSuccess = document.getElementById('contact-success');
    if (lang === 'ar') {
      if (cSubmit)  cSubmit.textContent  = 'إرسال الرسالة ←';
      if (cLoader)  cLoader.childNodes[0].textContent = 'جارٍ إرسال رسالتك';
      if (cSuccess) cSuccess.textContent = '✓ شكراً! سنتواصل معك خلال 24 ساعة.';
    } else {
      if (cSubmit)  cSubmit.textContent  = 'Send Message →';
      if (cLoader)  cLoader.childNodes[0].textContent = 'Sending your message';
      if (cSuccess) cSuccess.textContent = "✓ Thank you! We'll be in touch within 24 hours.";
    }
  })();

  // 18. Careers job card "Apply Now" buttons
  document.querySelectorAll('.job-card .btn-primary').forEach(function(btn) {
    btn.textContent = lang === 'ar' ? 'قدّم الآن ←' : 'Apply Now →';
  });

  // 19. Apply modal labels and submit button
  (function() {
    var applyEyebrow = document.querySelector('.apply-modal-inner > div:first-child');
    var aSubmitBtn   = document.querySelector('#applyModal .btn-primary');
    var aSuccess     = document.getElementById('apply-success');
    if (lang === 'ar') {
      if (applyEyebrow) applyEyebrow.textContent = 'قدّم الآن';
      if (aSubmitBtn)   aSubmitBtn.textContent   = 'إرسال الطلب ←';
      if (aSuccess)     aSuccess.textContent     = '✓ تم استلام طلبك! سنراجعه ونتواصل معك قريباً.';
      var applyLabels = ['الاسم الأول *','اسم العائلة *','البريد الإلكتروني *','الهاتف','ملف LinkedIn','معرض الأعمال / GitHub','رسالة التقديم'];
      document.querySelectorAll('#applyModal .form-group label').forEach(function(lb, i){ if (applyLabels[i]) lb.textContent = applyLabels[i]; });
    } else {
      if (applyEyebrow) applyEyebrow.textContent = 'Apply Now';
      if (aSubmitBtn)   aSubmitBtn.textContent   = 'Submit Application →';
      if (aSuccess)     aSuccess.textContent     = "✓ Application received! We'll review it and contact you soon.";
      var applyLabels = ['First Name *','Last Name *','Email *','Phone','LinkedIn Profile','Portfolio / GitHub','Cover Letter'];
      document.querySelectorAll('#applyModal .form-group label').forEach(function(lb, i){ if (applyLabels[i]) lb.textContent = applyLabels[i]; });
    }
  })();

  translateServicePages(lang);
  localStorage.setItem('marvex_lang', lang);
}

function updateHeroTranslations(lang) {
  [0,1,2].forEach(function(i){
    var slide = document.getElementById('hs-' + i);
    if(!slide) return;
    var h1 = slide.querySelector('.hero-h1');
    var sub = slide.querySelector('.hero-sub');
    if(h1 && TRANSLATIONS[lang]['hero-h1-' + i]) h1.innerHTML = TRANSLATIONS[lang]['hero-h1-' + i];
    if(sub && TRANSLATIONS[lang]['hero-sub-' + i]) sub.textContent = TRANSLATIONS[lang]['hero-sub-' + i];
  });
}

document.addEventListener('DOMContentLoaded', function(){
  var savedLang = localStorage.getItem('marvex_lang') || 'en';
  if(savedLang === 'ar') setLanguage('ar');
});


/* ══════════════════════════════════════════════════════════════
   SERVICE DETAIL PAGE TRANSLATIONS  (sv-web … sv-brand)
   Called from setLanguage() — adds Arabic to all 8 detail pages
══════════════════════════════════════════════════════════════ */
var SV_DATA = {
  'sv-web': {
    tag:'الخدمة ٠١ / ٠٨',
    title:'تطوير<br><span style="color:var(--red-bright)">المواقع</span>',
    sub:'بناء مواقع فائقة السرعة ومُحسَّنة للتحويل، مهندسة للأداء والهيمنة على نتائج البحث والنمو طويل الأمد.',
    statLabels:['من الملخص إلى أول تصميم','متوسط درجة Lighthouse','متوسط نمو الزيارات العضوية سنة 1','موقع أُطلق عبر دول الخليج'],
    inclTag:'ما الذي ستحصل عليه', inclTitle:'ما يتضمنه الباقة',
    inclH:['تصميم وتطوير مخصص','هندسة الأداء','بنية جاهزة لمحركات البحث','تكامل نظام إدارة المحتوى','تجاوب وإتاحة شاملة','التحليلات والتتبع'],
    inclP:['تصميم UI/UX دقيق يُبنى من الصفر أو وفق إرشادات علامتك التجارية — لا قوالب، ولا اختصارات.','تحسين مؤشرات الويب الأساسية، التحميل الكسول، إعداد CDN وضغط الصور لأوقات تحميل دون ثانية.','HTML دلالي، بيانات منظمة، خريطة موقع، وتحسين الصفحات مدمج من اليوم الأول.','إعداد نظام إدارة محتوى بدون رأس (Sanity أو Contentful أو WordPress) بدون لمس الكود.','متوافق مع WCAG، مختبر على الأجهزة المحمولة والأجهزة اللوحية وسطح المكتب.','GA4 وGTM وMeta Pixel وتتبع التحويلات الكامل، مُهيَّأ ومُتحقَّق منه قبل الإطلاق.'],
    procTag:'كيف نعمل', procTitle:'عمليتنا',
    procH:['الاستكشاف','الهندسة المعمارية','التصميم','التطوير','ضمان الجودة والاختبار','الإطلاق والتسليم'],
    procP:['تحليل عميق لعلامتك وجمهورك وأهدافك. لا ندع شيئاً غير محدد قبل التصميم.','هيكل المعلومات وخريطة الموقع واختيار التقنيات. نخطط للتوسع منذ البداية.','من الإطارات السلكية إلى نماذج Figma عالية الدقة. تعتمد قبل كتابة أي كود.','تطوير قائم على سبرنت مع معاينات مرحلية. شفافية كاملة، لا صناديق سوداء.','اختبار على المتصفحات، تدقيق الأداء، التحقق من إمكانية الوصول، ومراجعة الأمان.','نشر مباشر، تدريب الفريق، توثيق كامل، و30 يوم دعم ما بعد الإطلاق.'],
    ctaH:'هل أنت مستعد للبناء؟', ctaP:'دعنا نُحوّل حضورك الرقمي إلى آلة أداء.', ctaBtn:'ابدأ استشارة مجانية ←', heroBtn:'ابدأ مشروعك ←', backBtn:'جميع الخدمات →'
  },
  'sv-mobile': {
    tag:'الخدمة ٠٢ / ٠٨',
    title:'تطبيقات<br><span style="color:var(--red-bright)">الجوال</span>',
    sub:'تطبيقات متعددة المنصات مبنية بـ Flutter وReact Native — أداء أصيل، قاعدة كود واحدة، توسع لا محدود على iOS وAndroid.',
    statLabels:['قاعدة كود لكلا المنصتين','متوسط تقييم متجر التطبيقات','أسرع في البناء من Native','تطبيق منشور في الخليج والهند'],
    inclTag:'ما الذي ستحصل عليه', inclTitle:'ما يتضمنه الباقة',
    inclH:['تطوير متعدد المنصات','تصميم UI/UX للجوال','تكامل الخلفية والAPI','الإشعارات وتفاعل المستخدمين','رفع التطبيق وASO','التحليلات وتقارير الأعطال'],
    inclP:['قاعدة كود Flutter أو React Native واحدة تُقدّم أداءً أصيلاً على iOS وAndroid في آنٍ واحد.','أنظمة تصميم مخصصة للجوال، تفاعلات دقيقة، واجهات تعمل باللمس، ودعم الوضعين الفاتح والداكن.','واجهات برمجة RESTful وGraphQL وFirebase وSupabase أو إعدادات خادم مخصصة.','تدفقات إشعارات ذكية، رسائل داخل التطبيق، ومعالجة الروابط العميقة لإعادة التفاعل.','رفع كامل على App Store وGoogle Play مع تحسين قائمة المتجر لزيادة الظهور.','Firebase Analytics وSentry لتقارير الأعطال وتتبع الأحداث من اليوم الأول.'],
    procTag:'كيف نعمل', procTitle:'عمليتنا',
    procH:['التخطيط والتحديد','بحث تجربة المستخدم','النموذج التفاعلي','التطوير المتقطع','اختبار على أجهزة حقيقية','الإطلاق وما بعده'],
    procP:['تحديد الميزات وتدفقات المستخدمين وحدود MVP للانطلاق السريع والتكرار بناءً على البيانات.','رسم خرائط شخصيات المستخدمين، التحليل التنافسي، ورسم خرائط رحلة المستخدم قبل أي تصميم.','نموذج Figma تفاعلي كامل لاعتماد أصحاب المصلحة قبل كتابة سطر كود.','سبرنت أسبوعيان مع إصدارات TestFlight/داخلية بعد كل سبرنت للتغذية الراجعة المستمرة.','اختبار آلي ويدوي على مجموعة من أجهزة iOS وAndroid الحقيقية — ليس فقط المحاكيات.','رفع المتجر، تحسين ASO، استراتيجية الإطلاق، ونافذة مراقبة لمدة 30 يوماً.'],
    ctaH:'تطبيقك. كلا المتجرين. فريق واحد.', ctaP:'دعنا نأخذ منتجك من الفكرة إلى المتجر.', ctaBtn:'ابدأ استشارة مجانية ←', heroBtn:'ابنِ تطبيقك ←', backBtn:'جميع الخدمات →'
  },
  'sv-seo': {
    tag:'الخدمة ٠٣ / ٠٨',
    title:'تحسين<br><span style="color:var(--red-bright)">محركات البحث</span>',
    sub:'استراتيجيات SEO مدعومة بالذكاء الاصطناعي لسوق الخليج — هندسة هيمنة بحثية عضوية تتراكم كل شهر.',
    statLabels:['متوسط نمو الزيارات العضوية','إلى الصفحة الأولى (متوسط)','تكتيكات القبعة السوداء. أبداً.','أسواق نهيمن عليها'],
    inclTag:'ما الذي ستحصل عليه', inclTitle:'ما يتضمنه الباقة',
    inclH:['تدقيق SEO التقني','بحث الكلمات المفتاحية وتخطيطها','استراتيجية المحتوى والكتابة','تحسين البحث المحلي وGoogle Business','بناء الروابط الخلفية','التقارير الشهرية'],
    inclP:['تحليل الزحف، مؤشرات الويب الأساسية، مشاكل الفهرسة، البيانات المنظمة، وتدقيق Tags الكنونية.','استراتيجية كلمات مفتاحية متعمقة تتوافق مع نية البحث والقيمة التجارية في أسواق الخليج.','مقالات مُحسَّنة لمحركات البحث، صفحات هبوط، ومحتوى عمودي مصمم للترتيب والتحويل.','تحسين Google Business Profile، استشهادات محلية، واستهداف جغرافي للإمارات وقطر.','بناء روابط بالقبعة البيضاء عبر العلاقات العامة الرقمية والتواصل التحريري والمنشورات الصناعية.','تتبع الترتيب، إسناد الزيارات، تحليل التحويلات — تقارير ROI واضحة بلا مقاييس وهمية.'],
    procTag:'كيف نعمل', procTitle:'عمليتنا',
    procH:['التدقيق الأساسي','بناء الاستراتيجية','إصلاحات الصفحة','تنفيذ المحتوى','بناء السلطة','المراجعة والتوسع'],
    procP:['تدقيق تقني ومحتوى كامل مع تحليل فجوات تنافسية. نرسم بالضبط ما يُعيقك.','استهداف كلمات مفتاحية، تقويم محتوى، وخارطة طريق نمو عضوي لـ6 أشهر.','تحسين تقني ومحتوى للصفحات ذات الأولوية — المكاسب السريعة أولاً.','إنتاج محتوى شهري متوافق مع استراتيجية الكلمات المفتاحية — بحثي وموجّه للتحويل.','اكتساب روابط خلفية مستمر وعلاقات عامة رقمية لبناء سلطة النطاق شهراً بشهر.','مراجعة شهرية للأداء مع تحديث الاستراتيجية. نضاعف ما ينجح ونقطع ما لا ينجح.'],
    ctaH:'ارتقِ في الترتيب. انمُ بشكل أسرع.', ctaP:'الإعلانات المدفوعة تتوقف. SEO يتراكم. دعنا نبني محركك العضوي.', ctaBtn:'احصل على تدقيق مجاني ←', heroBtn:'احصل على تدقيق SEO مجاني ←', backBtn:'جميع الخدمات →'
  },
  'sv-social': {
    tag:'الخدمة ٠٤ / ٠٨',
    title:'التسويق عبر<br><span style="color:var(--red-bright)">وسائل التواصل</span>',
    sub:'إدارة كاملة لوسائل التواصل الاجتماعي وإعلانات الأداء — من أنظمة المحتوى الفيروسي إلى حملات مدفوعة بعائد استثمار مُحسَّن.',
    statLabels:['متوسط ROAS على حملات Meta','علامة تجارية مُدارة عبر الخليج','مراقبة يومية للمجتمع','محتوى أصلي. دائماً.'],
    inclTag:'ما الذي ستحصل عليه', inclTitle:'ما يتضمنه الباقة',
    inclH:['استراتيجية وسائل التواصل','إنشاء المحتوى','إدارة المجتمع','إدارة إعلانات Meta','شراكات المؤثرين والمبدعين','التحليلات الشهرية'],
    inclP:['اختيار المنصة، استهداف الجمهور، ركائز المحتوى، وتكرار النشر المصمم خصيصاً لعلامتك.','فيديو قصير، Reels، TikToks، رسومات ثابتة وكتابة إبداعية — كلها أصلية وعلى العلامة التجارية.','مراقبة يومية، الردود على التعليقات، إدارة الرسائل المباشرة، وإدارة السمعة عبر جميع المنصات.','استراتيجية حملات Facebook وInstagram، اختبار الإبداع، تقسيم الجمهور، وتحسين ROAS.','اكتشاف المؤثرين، التحقق، الإحاطة، وإدارة تعاونات الخليج — من المؤثرين الصغار إلى الكبار.','لوحات أداء تغطي الوصول والتفاعل وCPM وCPC وROAS ونمو شهري.'],
    procTag:'كيف نعمل', procTitle:'عمليتنا',
    procH:['تدقيق العلامة والجمهور','وثيقة الاستراتيجية','الإنتاج الإبداعي','النشر والمجتمع','الحملات المدفوعة','المراجعة الشهرية'],
    procP:['مراجعة القنوات الحالية، تحليل المنافسين، وبحث الجمهور لفهم مكانتك الحالية.','ركائز المحتوى، أولويات المنصات، أسلوب الصوت، وخارطة طريق حملة 90 يوماً.','تصوير محتوى شهري، تصميم جرافيك، وإنتاج فيديو. كل شيء داخلياً، لا يُستعان بمصادر خارجية.','نشر مجدول، مراقبة مباشرة، وتفاعل نشط مع المجتمع — كل يوم، ليس فقط ساعات العمل.','إطلاق، اختبار، وتكرار حملات الأداء مع مراجعات أسبوعية للميزانية ودورات تجديد الإبداع.','مراجعة النتائج، تحليل أداء الإبداع، رؤى اختبار A/B، ومكالمة تخطيط الشهر القادم.'],
    ctaH:'أوقف التمرير. ابدأ البيع.', ctaP:'محتوى يحوّل. حملات تنمو. دعنا نبني حضورك الاجتماعي.', ctaBtn:'ابدأ استشارة مجانية ←', heroBtn:'نمّ علامتي ←', backBtn:'جميع الخدمات →'
  },
  'sv-cloud': {
    tag:'الخدمة ٠٥ / ٠٨',
    title:'البنية التحتية<br><span style="color:var(--red-bright)">السحابية</span>',
    sub:'بنية تحتية سحابية على مستوى المؤسسات مع ضمان 99.9% تشغيل، خطوط CI/CD مؤتمتة، ومراقبة 24/7.',
    statLabels:['ضمان وقت التشغيل SLA','مراقبة وتنبيهات','تأمين قانوني. أنت تملكه.','منصات سحابية مدعومة'],
    inclTag:'ما الذي ستحصل عليه', inclTitle:'ما يتضمنه الباقة',
    inclH:['تصميم البنية السحابية','إعداد خط CI/CD','الحاويات والتنسيق','الأمان والامتثال','إدارة قواعد البيانات','المراقبة والتنبيهات 24/7'],
    inclP:['بنية قابلة للتوسع ومتسامحة مع الأعطال على AWS أو GCP أو Azure — مصممة لعبء العمل وميزانيتك.','خطوط بناء واختبار ونشر مؤتمتة باستخدام GitHub Actions أو GitLab CI أو Jenkins. اشحن أسرع، اكسر أقل.','إعداد Docker وKubernetes للنشر المحمول والقابل للتوسع عبر جميع البيئات.','سياسات IAM، تكوين VPC، تشفير في حالة الراحة والنقل — بيئات جاهزة للامتثال من اليوم الأول.','قواعد بيانات مُدارة (RDS، Cloud SQL، MongoDB Atlas) مع نسخ احتياطية مؤتمتة وتجاوز الفشل.','لوحات Datadog أو Grafana أو CloudWatch مع استجابة للحوادث وخدمة مدعومة باتفاقية مستوى الخدمة.'],
    procTag:'كيف نعمل', procTitle:'عمليتنا',
    procH:['تدقيق البنية التحتية','تصميم المعمارية','الإعداد والهجرة','CI/CD والبنية كالكود','تصلّب الأمان','التسليم والمراقبة المستمرة'],
    procP:['تقييم إعدادك الحالي، نقاط الضعف، حدود التوسع، وعدم كفاءة التكلفة.','وثيقة تصميم سحابي مع تقديرات التكلفة وتوقعات التوسع وتحليل المخاطر.','نشر مرحلي أو هجرة باستراتيجية صفر توقف. لا انقطاعات مفاجئة.','إعداد الخط والبنية التحتية كالكود عبر Terraform — بنية تحتية قابلة للتكرار ومتحكم في إصدارها.','مراجعة أمنية، توصيات اختبار الاختراق، وفحوصات الامتثال قبل الإطلاق.','توثيق كامل، تدريب الفريق، وخدمات مُدارة اختيارية للراحة البال المستمرة.'],
    ctaH:'بنية تحتية لا تنام.', ctaP:'نبنيها بشكل صحيح في المرة الأولى — حتى لا تدفع لإعادة البناء لاحقاً.', ctaBtn:'ابدأ استشارة مجانية ←', heroBtn:'تدقيق بنيتي التحتية ←', backBtn:'جميع الخدمات →'
  },
  'sv-ai': {
    tag:'الخدمة ٠٦ / ٠٨',
    title:'الذكاء الاصطناعي<br><span style="color:var(--red-bright)">والأتمتة</span>',
    sub:'أنظمة ذكاء اصطناعي مخصصة وأطر أتمتة تُزيل الاختناقات وتخفض التكاليف التشغيلية وتُطلق الكفاءة المتراكمة في كل طبقة من أعمالك.',
    statLabels:['تسليم دليل المفهوم','متوسط الوقت التشغيلي الموفر','كل بناء يبدأ بواحد','نماذج مدعومة'],
    inclTag:'ما الذي ستحصل عليه', inclTitle:'ما يتضمنه الباقة',
    inclH:['أدوات وكلاء ذكاء اصطناعي مخصصة','روبوتات دردشة ذكية','أتمتة سير العمل (RPA)','التحليلات التنبؤية','أنظمة محتوى مدعومة بالذكاء الاصطناعي','تكامل API والأنظمة'],
    inclP:['أدوات داخلية قائمة على LLM، مساعدون ذكاء اصطناعي للعملاء، وأنظمة معالجة المستندات على GPT-4 أو Claude أو النماذج المفتوحة المصدر.','روبوتات واعية بالسياق لدعم العملاء، تأهيل الع&#1605;لاء المحتملين، ومكاتب المساعدة — مدمجة مع WhatsApp والويب وCRM.','إزالة العمليات اليدوية المتكررة عبر HR والمالية والعمليات وخدمة العملاء باستخدام n8n أو Zapier أو خطوط Python مخصصة.','نماذج ML لتوقع الطلب، التنبؤ بالاضطراب، تحسين التسعير، وذكاء أعمال قابل للتنفيذ.','توليد محتوى مؤتمت، محركات تخصيص، ومولدات وصف المنتجات التي تتوسع دون موارد بشرية.','ربط أدوات الذكاء الاصطناعي بـCRM وERP ومنصة التجارة الإلكترونية أو مستودع البيانات — بلا صوامع.'],
    procTag:'كيف نعمل', procTitle:'عمليتنا',
    procH:['اكتشاف العمليات','تصميم الحل','دليل المفهوم','البناء الإنتاجي','التدريب والتسليم','التكرار'],
    procP:['رسم خريطة سير عملك الحالي وتحديد فرص الأتمتة الأعلى عائداً — نبدأ حيث المكاسب الأكبر.','اختيار النماذج والأدوات والمعمارية المناسبة لحالة الاستخدام وبيئة البيانات. لا هندسة مفرطة.','نموذج أولي يعمل في 2-4 أسابيع حتى ترى النتائج وإمكانية ROI قبل الالتزام الكامل.','تطوير دليل المفهوم إلى نظام جاهز للإنتاج مع المراقبة ومعالجة الأخطاء والتسجيل.','تدريب الفريق وتوثيق حتى يتمكن موظفوك من إدارة النظام وتوسيعه بشكل مستقل.','ضبط النموذج المستمر وتحسين سير العمل مع نمو بياناتك وتطور احتياجاتك.'],
    ctaH:'اعمل بذكاء. توسع بلا حدود.', ctaP:'نُقدّم نتائج الذكاء الاصطناعي — مقاسة بالساعات الموفرة والأخطاء المنخفضة والإيرادات المُفتَحة.', ctaBtn:'ابدأ استشارة مجانية ←', heroBtn:'استكشف الذكاء الاصطناعي لأعمالي ←', backBtn:'جميع الخدمات →'
  },
  'sv-ecom': {
    tag:'الخدمة ٠٧ / ٠٨',
    title:'حلول<br><span style="color:var(--red-bright)">التجارة الإلكترونية</span>',
    sub:'متاجر عالية التحويل مهندسة لزيادة الإيرادات في كل خطوة من مسار المبيعات — من أول نقرة إلى الشراء المتكرر.',
    statLabels:['متوسط تخفيض التخلي عن السلة','متوسط نمو الإيرادات سنة 1','طرق دفع إقليمية مغطاة','متجرك لا يغلق أبداً'],
    inclTag:'ما الذي ستحصل عليه', inclTitle:'ما يتضمنه الباقة',
    inclH:['تصميم وتطوير المتجر','تحسين معدل التحويل','تكامل بوابة الدفع','إدارة المخزون والطلبات','أتمتة البريد الإلكتروني والرسائل القصيرة','أداء وSEO المنتجات'],
    inclP:['قوالب Shopify مخصصة أو بناء WooCommerce أو منصات تجارة إلكترونية مخصصة بالكامل — لا قوالب جاهزة.','تصميم صفحة المنتج، تحسين تدفق الدفع، إشارات الثقة، وأطر اختبار A/B مدمجة من اليوم الأول.','Stripe وPayTabs وTelr وTamara (BNPL) وطرق الدفع الإقليمية في الخليج — كل خيار يفضله العميل مغطى.','تكامل مع أنظمة إدارة المخزون ومنصات الشحن وإعدادات المستودعات المتعددة للعمليات السلسة.','استرداد السلة المتروكة، تسلسل ما بعد الشراء، وتدفقات الولاء عبر Klaviyo — إيرادات في وضع الطيار الآلي.','SEO صفحة المنتج، تحسين سرعة الموقع، والبيانات المنظمة لظهور Google Shopping.'],
    procTag:'كيف نعمل', procTitle:'عمليتنا',
    procH:['تدقيق المتجر أو الملخص','UX والتصميم','التطوير','التكاملات','الاختبار','الإطلاق والنمو'],
    procP:['متجر جديد: تحديد الأهداف والكتالوج ورحلة العميل. متجر قائم: تدقيق كامل للتحويل والأداء.','رسم مسار الشراء الرئيسي، ثم التصميم مع التحويل في المقدمة — كل عنصر يكسب مكانه.','كود نظيف وقابل للتوسع مع تحسين كامل للجوال. لا ملحقات منتفخة، لا ديون تقنية.','بوابات الدفع والخدمات اللوجستية وCRM وتكاملات منصة التسويق — مختبرة بالكامل قبل الإطلاق.','اختبار شامل لتدفق الدفع واختبار الأجهزة واختبار التحميل. إذا كان يمكن كسره، نكسره أولاً.','دعم الإطلاق المباشر، توصيات CRO ما بعد الإطلاق، والتحسين المستمر مشمول.'],
    ctaH:'ابنِ متجراً يبيع وأنت نائم.', ctaP:'مهندَس للتحويل من أول بكسل إلى آخر خطوة في الدفع.', ctaBtn:'ابدأ استشارة مجانية ←', heroBtn:'ابدأ البيع أكثر ←', backBtn:'جميع الخدمات →'
  },
  'sv-brand': {
    tag:'الخدمة ٠٨ / ٠٨',
    title:'العلامة التجارية<br><span style="color:var(--red-bright)">والتصميم</span>',
    sub:'من الشعار والهوية البصرية إلى أنظمة العلامة التجارية الكاملة وUI/UX — نبتكر علامات تجارية مصممة للبقاء والتميز.',
    statLabels:['تسليم مفهوم الشعار','مفاهيم أولية فريدة','ملفات المصدر لك تماماً','كل نقطة تواصل. علامة. دائماً.'],
    inclTag:'ما الذي ستحصل عليه', inclTitle:'ما يتضمنه الباقة',
    inclH:['تصميم الشعار','نظام الهوية البصرية','دليل العلامة التجارية','تصميم UI/UX','المواد التسويقية','عروض الأعمال والعروض التقديمية'],
    inclP:['علامات مخصصة وكلمات وعلامات مركبة مع إرشادات الاستخدام الكاملة وجميع تنسيقات الملفات.','لوحة الألوان، نظام الطباعة، الأيقونات، أسلوب التصوير، وإرشادات الرسوم التوضيحية — اللغة الكاملة.','دليل علامة تجارية شامل يغطي ما يجب فعله وما لا يجب فعله والاستخدام الصحيح عبر كل وسيلة إعلام.','تصميم تجربة المستخدم للويب والجوال — إطارات سلكية ومكتبات المكونات ونماذج Figma عالية الدقة.','بطاقات العمل والترويسات وقوالب العروض التقديمية وحزم وسائل التواصل الاجتماعي واللافتات.','عروض المستثمرين، عروض المبيعات، وسرديات قصة العلامة التجارية المصممة للإقناع والتحويل.'],
    procTag:'كيف نعمل', procTitle:'عمليتنا',
    procH:['اكتشاف العلامة التجارية','لوحة المزاج','تصميم المفهوم','التحسين','بناء النظام','التسليم'],
    procP:['ورشة عمل تغطي رؤيتك وقيمك وجمهورك ومنافسيك وتموضع العلامة على المدى البعيد. كل شيء يبدأ هنا.','2-3 مسارات توجيه بصرية مميزة لفريقك للتفاعل معها — الاتجاه قبل التصميم.','3 مفاهيم شعار وهوية مطورة بتفاصيل كاملة لمراجعتك وملاحظاتك.','جولات تغذية راجعة تعاونية حتى تكون الهوية صحيحة — بلا حدود تعديل عشوائية.','توسيع المفهوم المعتمد إلى نظام هوية كامل ومكتبة مكونات ووثيقة إرشادات العلامة.','جميع الملفات المصدر (Figma وAI وPDF)، حزم التصدير، ودليل العلامة — كل ما تحتاجه لتوسيع العلامة.'],
    ctaH:'ابنِ علامة تجارية يتذكرها الناس.', ctaP:'التصميم هو الاستراتيجية مرئية. دعنا نجعلك لا يمكن تجاهله.', ctaBtn:'ابدأ استشارة مجانية ←', heroBtn:'ابدأ مشروع علامتك ←', backBtn:'جميع الخدمات →'
  }
};

function translateServicePages(lang) {
  var isAr = lang === 'ar';
  Object.keys(SV_DATA).forEach(function(pid) {
    var page = document.getElementById('page-' + pid);
    if (!page) return;
    var d = SV_DATA[pid];

    // Hero
    var heroTag = page.querySelector('.page-hero .section-tag');
    var heroTitle = page.querySelector('.page-hero .section-title');
    var heroSub = page.querySelector('.page-hero .section-subtitle');
    var heroBtns = page.querySelectorAll('.page-hero .btn-primary, .page-hero .btn-outline');
    if (heroTag)   heroTag.textContent = isAr ? d.tag : heroTag.getAttribute('data-en') || heroTag.textContent;
    if (heroTitle) heroTitle.innerHTML = isAr ? d.title : heroTitle.getAttribute('data-en') || heroTitle.innerHTML;
    if (heroSub)   heroSub.textContent = isAr ? d.sub : heroSub.getAttribute('data-en') || heroSub.textContent;
    if (heroBtns[0]) heroBtns[0].textContent = isAr ? d.heroBtn : heroBtns[0].getAttribute('data-en') || heroBtns[0].textContent;
    if (heroBtns[1]) heroBtns[1].textContent = isAr ? d.backBtn : heroBtns[1].getAttribute('data-en') || heroBtns[1].textContent;

    // Stats labels
    var statLabels = page.querySelectorAll('.stat-label');
    statLabels.forEach(function(el, i) {
      if (!el.getAttribute('data-en')) el.setAttribute('data-en', el.textContent);
      el.textContent = isAr ? (d.statLabels[i] || el.getAttribute('data-en')) : el.getAttribute('data-en');
    });

    // Sections: What's Included (section 1) and Our Process (section 2)
    var sections = page.querySelectorAll('section');
    if (sections[0]) {
      var s1Tag = sections[0].querySelector('.section-tag');
      var s1Title = sections[0].querySelector('.section-title');
      if (s1Tag)   s1Tag.textContent = isAr ? d.inclTag : 'What You Get';
      if (s1Title) s1Title.textContent = isAr ? d.inclTitle : "WHAT'S INCLUDED";
      var inclCards = sections[0].querySelectorAll('.service-card');
      inclCards.forEach(function(card, i) {
        var h = card.querySelector('h3');
        var p = card.querySelector('p');
        if (h) { if (!h.getAttribute('data-en')) h.setAttribute('data-en', h.textContent); h.textContent = isAr ? (d.inclH[i]||h.getAttribute('data-en')) : h.getAttribute('data-en'); }
        if (p) { if (!p.getAttribute('data-en')) p.setAttribute('data-en', p.textContent); p.textContent = isAr ? (d.inclP[i]||p.getAttribute('data-en')) : p.getAttribute('data-en'); }
      });
    }
    if (sections[1]) {
      var s2Tag = sections[1].querySelector('.section-tag');
      var s2Title = sections[1].querySelector('.section-title');
      if (s2Tag)   s2Tag.textContent = isAr ? d.procTag : 'How We Work';
      if (s2Title) s2Title.textContent = isAr ? d.procTitle : 'OUR PROCESS';
      var procCards = sections[1].querySelectorAll('.card');
      procCards.forEach(function(card, i) {
        var h = card.querySelector('h3');
        var p = card.querySelector('p');
        if (h) { if (!h.getAttribute('data-en')) h.setAttribute('data-en', h.textContent); h.textContent = isAr ? (d.procH[i]||h.getAttribute('data-en')) : h.getAttribute('data-en'); }
        if (p) { if (!p.getAttribute('data-en')) p.setAttribute('data-en', p.textContent); p.textContent = isAr ? (d.procP[i]||p.getAttribute('data-en')) : p.getAttribute('data-en'); }
      });
    }

    // CTA
    var ctaH = page.querySelector('.cta-section h2');
    var ctaP = page.querySelector('.cta-section p');
    var ctaBtn = page.querySelector('.cta-section .btn-white');
    if (ctaH)   { if (!ctaH.getAttribute('data-en')) ctaH.setAttribute('data-en', ctaH.textContent);   ctaH.textContent = isAr ? d.ctaH : ctaH.getAttribute('data-en'); }
    if (ctaP)   { if (!ctaP.getAttribute('data-en')) ctaP.setAttribute('data-en', ctaP.textContent);   ctaP.textContent = isAr ? d.ctaP : ctaP.getAttribute('data-en'); }
    if (ctaBtn) { if (!ctaBtn.getAttribute('data-en')) ctaBtn.setAttribute('data-en', ctaBtn.textContent); ctaBtn.textContent = isAr ? d.ctaBtn : ctaBtn.getAttribute('data-en'); }
  });
}
