/* ════════════════════════════════════════════════════════════════
   Nav, mobile menu, and premium pointer micro-interactions
═══════════════════════════════════════════════════════════════════ */
/* Safety net: guarantee the hero content is revealed even if the
   hero-scroll module or GSAP CDN never runs. */
window.addEventListener('load', function () {
  document.body.classList.add('is-loaded');
});

(function () {
  var nav = document.getElementById('site-nav');
  var hamburger = document.querySelector('.nav-hamburger');
  var mobileMenu = document.getElementById('mobile-menu');

  /* ---------- sticky nav shadow ---------- */
  if (nav) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) nav.classList.add('is-scrolled');
      else nav.classList.remove('is-scrolled');
    }, { passive: true });
  }

  /* ---------- mobile menu ---------- */
  if (hamburger && mobileMenu) {
    var openMenu = function () {
      mobileMenu.classList.add('is-open');
      mobileMenu.setAttribute('aria-hidden', 'false');
      hamburger.setAttribute('aria-expanded', 'true');
      hamburger.setAttribute('aria-label', 'Close menu');
    };
    var closeMenu = function () {
      mobileMenu.classList.remove('is-open');
      mobileMenu.setAttribute('aria-hidden', 'true');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.setAttribute('aria-label', 'Open menu');
    };
    hamburger.addEventListener('click', function () {
      mobileMenu.classList.contains('is-open') ? closeMenu() : openMenu();
    });
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
        closeMenu();
        hamburger.focus();
      }
    });
  }
})();

/* ════════════════════════════════════════════════════════════════
   Pointer micro-interactions — only where hover + fine pointer exist
   and motion is allowed. Touch and reduced-motion users get the
   clean static design with no JS-driven movement.
═══════════════════════════════════════════════════════════════════ */
(function () {
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!fine || reduce) return;

  /* ---------- mouse-follow glow on service rows ---------- */
  document.querySelectorAll('.service-item').forEach(function (row) {
    row.addEventListener('pointermove', function (e) {
      var r = row.getBoundingClientRect();
      row.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      row.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });

  /* ---------- 3D tilt on gallery tiles ---------- */
  var TILT = 6; // max degrees
  document.querySelectorAll('.gallery-item').forEach(function (tile) {
    var raf = null;
    tile.addEventListener('pointermove', function (e) {
      if (raf) return;
      raf = requestAnimationFrame(function () {
        raf = null;
        var r = tile.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        tile.style.transform =
          'perspective(900px) rotateY(' + (px * TILT) + 'deg) rotateX(' +
          (-py * TILT) + 'deg) translateZ(0)';
      });
    });
    tile.addEventListener('pointerleave', function () {
      tile.style.transform = '';
    });
  });

  /* ---------- magnetic primary buttons ----------
     Measure the resting rect ONCE on enter (no transform applied yet) and
     pull from that fixed centre. Measuring during pointermove would read
     the already-translated position and feed back into itself — that was
     the jitter/run-away bug. Travel is rAF-throttled and clamped. */
  var PULL = 0.34;
  var MAX = 16; // px — button never drifts further than this from rest
  document.querySelectorAll('.btn-primary').forEach(function (btn) {
    var base = null;
    var raf = null;

    btn.addEventListener('pointerenter', function () {
      base = btn.getBoundingClientRect();
    });

    btn.addEventListener('pointermove', function (e) {
      if (!base) base = btn.getBoundingClientRect();
      if (raf) return;
      var cx = e.clientX, cy = e.clientY;
      raf = requestAnimationFrame(function () {
        raf = null;
        var dx = (cx - (base.left + base.width / 2)) * PULL;
        var dy = (cy - (base.top + base.height / 2)) * PULL;
        dx = Math.max(-MAX, Math.min(MAX, dx));
        dy = Math.max(-MAX, Math.min(MAX, dy));
        btn.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
      });
    });

    btn.addEventListener('pointerleave', function () {
      if (raf) { cancelAnimationFrame(raf); raf = null; }
      btn.style.transform = '';
      base = null;
    });
  });
})();

(function () {
  var contactForm = document.querySelector('.contact-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var status = contactForm.querySelector('.contact-form-status');
    if (status) {
      status.textContent = 'Thank you. Please call or book on Fresha for the fastest confirmation while online enquiries are being connected.';
    }
    contactForm.reset();
  });
})();

(function () {
  var modal = document.getElementById('booking-modal');
  if (!modal) return;

  var dialog = modal.querySelector('.booking-dialog');
  var teamWrap = modal.querySelector('[data-booking-team]');
  var servicesWrap = modal.querySelector('[data-booking-services]');
  var timesWrap = modal.querySelector('[data-booking-times]');
  var dateInput = modal.querySelector('[data-booking-date]');
  var totalEl = modal.querySelector('[data-booking-total]');
  var summaryEl = modal.querySelector('[data-booking-summary]');
  var nextBtn = modal.querySelector('[data-booking-next]');
  var backBtn = modal.querySelector('[data-booking-back]');
  var progressItems = Array.prototype.slice.call(modal.querySelectorAll('.booking-progress li'));
  var progressFill = modal.querySelector('.booking-progress-line span');
  var lastFocused = null;
  var currentStep = 1;
  var deposit = 650;
  var state = {
    team: null,
    services: [],
    date: '',
    time: '',
    paid: false
  };

  var team = [
    { id: 'nthabeleng', name: 'Nthabeleng', role: 'Consultant', initial: 'N' },
    { id: 'zandile', name: 'Zandile', role: 'Beauty Therapist', initial: 'Z' },
    { id: 'sindi', name: 'Sindi', role: 'Beauty Therapist', initial: 'S' },
    { id: 'simphiwe', name: 'Simphiwe', role: 'Therapist', initial: 'S' },
    { id: 'goodness', name: 'Goodness', role: 'Team Member', initial: 'G' }
  ];

  var services = [
    { id: 'back-neck-shoulder', name: 'Back, Neck & Shoulder Massage', duration: '30 min', price: 300, description: 'Focused relief for tension held in the upper body.' },
    { id: 'swedish-massage', name: 'Swedish Full Body Massage', duration: '60 min', price: 650, description: 'A calming full-body massage for deep relaxation.' },
    { id: 'deep-tissue', name: 'Deep Tissue Massage', duration: '60 min', price: 750, description: 'Firm therapeutic pressure for tired muscles.' },
    { id: 'skin-therapy', name: 'Revitalising Skin Therapy', duration: '60 min', price: 700, description: 'Organic facial care for a refreshed, healthy glow.' },
    { id: 'hands-feet', name: 'Hands & Feet Ritual', duration: '75 min', price: 550, description: 'A polished manicure and pedicure treatment.' },
    { id: 'couple-therapy', name: 'Couple Therapy Escape', duration: '90 min', price: 1350, description: 'A side-by-side spa experience for two guests.' },
    { id: 'body-therapy', name: 'Body Therapy Glow', duration: '75 min', price: 850, description: 'Exfoliation and body care for soft, radiant skin.' },
    { id: 'birthday-package', name: 'Birthday Spa Package', duration: '120 min', price: 1800, description: 'A celebratory spa package for special occasions.' }
  ];

  var times = ['08:00', '09:30', '11:00', '12:30', '14:00', '15:30', '17:00', '18:00'];

  function formatMoney(value) {
    return 'R' + value.toLocaleString('en-ZA');
  }

  function selectedServices() {
    return services.filter(function (service) {
      return state.services.indexOf(service.id) !== -1;
    });
  }

  function total() {
    return selectedServices().reduce(function (sum, service) {
      return sum + service.price;
    }, 0);
  }

  function setValidation(key, message) {
    var el = modal.querySelector('[data-booking-validation="' + key + '"]');
    if (el) el.textContent = message || '';
  }

  function clearValidation() {
    ['team', 'services', 'datetime', 'summary'].forEach(function (key) {
      setValidation(key, '');
    });
  }

  function renderTeam() {
    teamWrap.innerHTML = team.map(function (member) {
      var selected = state.team === member.id;
      return '<button class="booking-card booking-team-card' + (selected ? ' is-selected' : '') + '" type="button" data-team-id="' + member.id + '" aria-pressed="' + selected + '">' +
        '<span class="booking-avatar" aria-hidden="true">' + member.initial + '</span>' +
        '<h4>' + member.name + '</h4>' +
        '<p>' + member.role + '</p>' +
      '</button>';
    }).join('');
  }

  function renderServices() {
    servicesWrap.innerHTML = services.map(function (service) {
      var selected = state.services.indexOf(service.id) !== -1;
      return '<button class="booking-card booking-service-card' + (selected ? ' is-selected' : '') + '" type="button" data-service-id="' + service.id + '" aria-pressed="' + selected + '">' +
        '<span><h4>' + service.name + '</h4>' +
        '<span class="booking-service-meta"><span>' + service.duration + '</span><span>' + formatMoney(service.price) + '</span></span>' +
        '<p>' + service.description + '</p></span>' +
        '<span class="booking-check" aria-hidden="true">&#10003;</span>' +
      '</button>';
    }).join('');
    totalEl.textContent = formatMoney(total());
  }

  function renderTimes() {
    timesWrap.innerHTML = times.map(function (time) {
      var selected = state.time === time;
      return '<button class="booking-time' + (selected ? ' is-selected' : '') + '" type="button" data-time="' + time + '" aria-pressed="' + selected + '">' + time + '</button>';
    }).join('');
  }

  function renderSummary() {
    var member = team.find(function (item) { return item.id === state.team; });
    var serviceList = selectedServices();
    var fullAmount = total();
    var balance = Math.max(fullAmount - deposit, 0);
    summaryEl.innerHTML =
      '<div class="booking-summary-row"><span>Team Member</span><strong>' + (member ? member.name : 'Not selected') + '</strong></div>' +
      '<div class="booking-summary-row"><span>Services</span><strong class="booking-summary-services">' + serviceList.map(function (service) { return '<span>' + service.name + ' - ' + formatMoney(service.price) + '</span>'; }).join('') + '</strong></div>' +
      '<div class="booking-summary-row"><span>Date</span><strong>' + (state.date || 'Not selected') + '</strong></div>' +
      '<div class="booking-summary-row"><span>Time</span><strong>' + (state.time || 'Not selected') + '</strong></div>' +
      '<div class="booking-summary-row"><span>Full Amount</span><strong>' + formatMoney(fullAmount) + '</strong></div>' +
      '<div class="booking-summary-row"><span>Required Deposit</span><strong>' + formatMoney(deposit) + '</strong></div>' +
      '<div class="booking-summary-row"><span>Balance Due</span><strong>' + formatMoney(balance) + '</strong></div>';
    if (fullAmount < deposit) {
      setValidation('summary', 'The selected service total must be at least R650 to continue. Please add another treatment or choose a higher-value service.');
    } else {
      setValidation('summary', '');
    }
  }

  function updateProgress() {
    progressItems.forEach(function (item, index) {
      item.dataset.step = String(index + 1);
      item.classList.toggle('is-active', index + 1 === currentStep);
      item.classList.toggle('is-complete', index + 1 < currentStep);
    });
    if (progressFill) progressFill.style.setProperty('--booking-progress', ((currentStep - 1) / 4 * 100) + '%');
  }

  function showStep(step) {
    currentStep = step;
    Array.prototype.forEach.call(modal.querySelectorAll('.booking-step'), function (panel) {
      panel.hidden = Number(panel.dataset.step) !== currentStep;
    });
    backBtn.disabled = currentStep === 1;
    if (currentStep === 4) renderSummary();
    nextBtn.textContent = currentStep === 4 ? 'Pay Deposit' : (currentStep === 5 ? 'Close' : 'Next');
    updateProgress();
  }

  function validateStep() {
    clearValidation();
    if (currentStep === 1 && !state.team) {
      setValidation('team', 'Please choose a team member to continue.');
      return false;
    }
    if (currentStep === 2 && state.services.length === 0) {
      setValidation('services', 'Please select at least one service.');
      return false;
    }
    if (currentStep === 3 && (!state.date || !state.time)) {
      setValidation('datetime', 'Please select both a preferred date and an available time.');
      return false;
    }
    if (currentStep === 4 && total() < deposit) {
      setValidation('summary', 'The selected service total must be at least R650 to continue.');
      return false;
    }
    return true;
  }

  function openBooking(event) {
    if (event) event.preventDefault();
    lastFocused = document.activeElement;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('booking-open');
    clearValidation();
    showStep(1);
    window.setTimeout(function () { dialog.focus(); }, 20);
  }

  function closeBooking() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('booking-open');
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }

  document.querySelectorAll('[data-booking-trigger]').forEach(function (trigger) {
    trigger.addEventListener('click', openBooking);
  });

  modal.querySelectorAll('[data-booking-close]').forEach(function (close) {
    close.addEventListener('click', closeBooking);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) closeBooking();
  });

  teamWrap.addEventListener('click', function (event) {
    var card = event.target.closest('[data-team-id]');
    if (!card) return;
    state.team = card.dataset.teamId;
    setValidation('team', '');
    renderTeam();
  });

  servicesWrap.addEventListener('click', function (event) {
    var card = event.target.closest('[data-service-id]');
    if (!card) return;
    var id = card.dataset.serviceId;
    var index = state.services.indexOf(id);
    if (index === -1) state.services.push(id);
    else state.services.splice(index, 1);
    setValidation('services', '');
    renderServices();
  });

  timesWrap.addEventListener('click', function (event) {
    var slot = event.target.closest('[data-time]');
    if (!slot) return;
    state.time = slot.dataset.time;
    setValidation('datetime', '');
    renderTimes();
  });

  dateInput.addEventListener('change', function () {
    state.date = dateInput.value;
    setValidation('datetime', '');
  });

  backBtn.addEventListener('click', function () {
    if (currentStep > 1) showStep(currentStep - 1);
  });

  nextBtn.addEventListener('click', function () {
    if (currentStep === 5) {
      closeBooking();
      return;
    }
    if (!validateStep()) return;
    if (currentStep === 4) {
      state.paid = true;
      showStep(5);
      return;
    }
    showStep(currentStep + 1);
  });

  var today = new Date();
  var yyyy = today.getFullYear();
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var dd = String(today.getDate()).padStart(2, '0');
  dateInput.min = yyyy + '-' + mm + '-' + dd;

  renderTeam();
  renderServices();
  renderTimes();
  showStep(1);
})();