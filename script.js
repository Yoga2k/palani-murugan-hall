/* ====================================================
   ஸ்ரீ பழனி முருகன் விழா அரங்கம் — JavaScript
   ==================================================== */

'use strict';

// ── Navbar scroll effect ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ── Mobile Nav Toggle ──
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navToggle.classList.toggle('active');
  // Animate hamburger to X
  const spans = navToggle.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// Close nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

// ── Active nav link on scroll ──
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');
    if (scrollY >= top && scrollY < bottom) {
      navItems.forEach(link => {
        link.classList.remove('active-nav');
        if (link.getAttribute('href') === '#' + id) {
          link.classList.add('active-nav');
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });

// ── Intersection Observer — fade-in animations ──
const fadeEls = document.querySelectorAll(
  '.event-card, .feat-card, .info-card, .gal-item, .about-stat, ' +
  '.about-visual, .about-text-block, .timings-card'
);

fadeEls.forEach(el => el.classList.add('fade-in'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger delay based on index among siblings
      const siblings = [...entry.target.parentElement.children];
      const idx = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = `${idx * 0.08}s`;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

fadeEls.forEach(el => observer.observe(el));

// ── Smooth scroll for anchor links ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = navbar.offsetHeight + 16;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── Floating Book Button — show after scroll ──
const fab = document.getElementById('floating-book-btn');
if (fab) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      fab.style.opacity = '1';
      fab.style.pointerEvents = 'auto';
    } else {
      fab.style.opacity = '0';
      fab.style.pointerEvents = 'none';
    }
  }, { passive: true });

  fab.style.opacity = '0';
  fab.style.transition = 'opacity 0.4s ease';
}

// ── Marquee pause on hover ──
const marqueeTrack = document.querySelector('.marquee-track');
if (marqueeTrack) {
  marqueeTrack.addEventListener('mouseenter', () => {
    marqueeTrack.style.animationPlayState = 'paused';
  });
  marqueeTrack.addEventListener('mouseleave', () => {
    marqueeTrack.style.animationPlayState = 'running';
  });
}

// ── Active nav style ──
const style = document.createElement('style');
style.textContent = `
  .nav-links a.active-nav {
    color: var(--gold-light) !important;
    background: rgba(200,151,58,0.18) !important;
  }
`;
document.head.appendChild(style);

// ── Console branding ──
console.log(
  '%c🕉️ ஸ்ரீ பழனி முருகன் விழா அரங்கம் %c\nSri Palani Murugan Vizha Arangam | Vallavari, Thanjavur – 614801',
  'color:#e8b855; font-size:16px; font-weight:bold; background:#5a0f20; padding:8px 12px; border-radius:6px;',
  'color:#c8973a; font-size:12px;'
);

/* ====================================================
   ONLINE BOOKING & PAYMENT PROCESS
   ==================================================== */

// ── அதிகாரப்பூர்வ மண்டப வங்கி மற்றும் தொடர்பு விவரங்கள் (Official Bank & Contact Config) ──
const HALL_BANK_CONFIG = {
  accountName: 'ஸ்ரீ பழனி முருகன் விழா அரங்கம்',
  bankName: 'இந்தியன் வங்கி (Indian Bank)',
  accountNumber: '500101011234567',
  ifscCode: 'IDIB000P045',
  branch: 'பேராவூரணி கிளை, தஞ்சாவூர் மாவட்டம் – 614801',
  upiId: 'rajm19407-1@oksbi',
  phonePeNumber: '+91 9655609405',
  whatsappNumber: '91 9655609405'
};

function syncBankDetailsUI() {
  const accName = document.getElementById('disp-acc-name');
  const bankName = document.getElementById('disp-bank-name');
  const accNum = document.getElementById('disp-acc-num');
  const ifsc = document.getElementById('disp-ifsc');
  const branch = document.getElementById('disp-branch');
  const phone = document.getElementById('disp-phone');
  const upiIdDisplay = document.getElementById('upi-id-display');

  if (accName) accName.textContent = HALL_BANK_CONFIG.accountName;
  if (bankName) bankName.textContent = HALL_BANK_CONFIG.bankName;
  if (accNum) accNum.textContent = HALL_BANK_CONFIG.accountNumber;
  if (ifsc) ifsc.textContent = HALL_BANK_CONFIG.ifscCode;
  if (branch) branch.textContent = HALL_BANK_CONFIG.branch;
  if (phone) phone.textContent = HALL_BANK_CONFIG.phonePeNumber;
  if (upiIdDisplay) upiIdDisplay.textContent = HALL_BANK_CONFIG.upiId;

  // Sync Contact section card on homepage
  const contactBankCard = document.getElementById('contact-bank-card');
  if (contactBankCard) {
    const p = contactBankCard.querySelector('p');
    if (p) {
      p.innerHTML = `
        <strong>A/C:</strong> ${HALL_BANK_CONFIG.accountNumber}<br/>
        <strong>IFSC:</strong> ${HALL_BANK_CONFIG.ifscCode} (${HALL_BANK_CONFIG.bankName})<br/>
        <strong>UPI:</strong> ${HALL_BANK_CONFIG.upiId}<br/>
        <strong>Phone:</strong> ${HALL_BANK_CONFIG.phonePeNumber}<br/>
        <em>${HALL_BANK_CONFIG.branch}</em>
      `;
    }
  }

  // Render initial dynamic QR code
  renderDynamicUPIQR();
}

document.addEventListener('DOMContentLoaded', syncBankDetailsUI);

// ── Booking State ──
const bookingState = {
  eventType: '',
  eventTypeName: '',
  eventDate: '',
  eventTime: '',
  eventTimeName: '',
  guests: '',
  requirements: '',
  name: '',
  phone: '',
  email: '',
  village: '',
  address: '',
  paymentMethod: 'upi',
  advanceAmount: 5000,
  bookingId: '',
  selectedBank: '',
  txnId: ''
};

// Event labels lookup
const eventLabels = {
  'marriage': '💍 திருமணம் (Marriage)',
  'ear-piercing': '👶 காதணி விழா (Ear Piercing)',
  'moi-virunthu': '🍽️ மொய் விருந்து (Moi Virunthu)',
  'birthday': '🎂 பிறந்தநாள் (Birthday)',
  'valaikapu': '🤰 வளைகாப்பு (Baby Shower)',
  'puja': '🪔 பூஜை / விழா (Puja / Other)',
  'other': '🎉 பிற குடும்ப விசேஷம் (Other Celebration)'
};

const timeLabels = {
  'morning': '🌅 காலை (5:00 AM – 12:00 PM)',
  'afternoon': '☀️ பகல் (12:00 PM – 5:00 PM)',
  'evening': '🌆 மாலை (5:00 PM – 10:00 PM)',
  'fullday': '🌟 முழு நாள் (Full Day)'
};

// ── Modal Elements ──
const bookingModalOverlay = document.getElementById('bookingModalOverlay');
const bookingModal = document.getElementById('bookingModal');

// ── BOOKED SLOTS & 30-DAY BOOKING WINDOW SYSTEM ──
const BOOKING_LIMIT_DAYS = 30; // Maximum advance booking window (e.g. 12-10 to 12-11)
const BOOKED_SLOTS_STORAGE_KEY = 'spmva_booked_slots_v1';

function toISODate(d) {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function toDisplayDate(dStr) {
  if (!dStr) return '';
  const parts = dStr.split('-');
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

// Get Booked Slots (localStorage + initial sample booked dates)
function getBookedSlots() {
  const stored = localStorage.getItem(BOOKED_SLOTS_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.warn('Failed parsing booked slots', e);
    }
  }

  // Realistic sample booked dates relative to today for instant testing
  const now = new Date();
  const d5 = new Date(now); d5.setDate(d5.getDate() + 5);
  const d12 = new Date(now); d12.setDate(d12.getDate() + 12);
  const d20 = new Date(now); d20.setDate(d20.getDate() + 20);

  const initialSlots = [
    { date: toISODate(d5), time: 'fullday', event: 'திருமணம் (Marriage)', name: 'சுரேஷ்' },
    { date: toISODate(d12), time: 'morning', event: 'காதணி விழா (Ear Piercing)', name: 'முருகேசன்' },
    { date: toISODate(d20), time: 'fullday', event: 'மொய் விருந்து (Moi Virunthu)', name: 'செல்வராஜ்' }
  ];
  localStorage.setItem(BOOKED_SLOTS_STORAGE_KEY, JSON.stringify(initialSlots));
  return initialSlots;
}

// Save newly confirmed booking slot (Local Cache + MongoDB API Sync)
async function saveBookedSlot(slot) {
  const slots = getBookedSlots();
  slots.push(slot);
  localStorage.setItem(BOOKED_SLOTS_STORAGE_KEY, JSON.stringify(slots));

  // Sync to Node.js & MongoDB Server
  try {
    await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        bookingId: slot.bookingId || slot.id,
        eventType: bookingState.eventType,
        eventTypeName: slot.event || bookingState.eventTypeName,
        eventDate: slot.date,
        eventTime: slot.time,
        eventTimeName: bookingState.eventTimeName,
        guests: Number(bookingState.guests) || 100,
        requirements: bookingState.requirements || '',
        customerName: slot.name || bookingState.name,
        customerPhone: bookingState.phone,
        customerEmail: bookingState.email || '',
        village: bookingState.village || '',
        address: bookingState.address || '',
        advanceAmount: Number(bookingState.advanceAmount) || 5000,
        paymentMethod: bookingState.paymentMethod || 'upi',
        txnId: bookingState.txnId || ''
      })
    });
  } catch (err) {
    // Stored safely in local backup if offline
  }
}

// Sync booked dates from MongoDB on page load
async function fetchBookedDatesFromServer() {
  try {
    const res = await fetch('/api/bookings/booked-dates');
    if (res.ok) {
      const data = await res.json();
      if (data.slots && Array.isArray(data.slots)) {
        localStorage.setItem(BOOKED_SLOTS_STORAGE_KEY, JSON.stringify(data.slots));
      }
    }
  } catch (e) {
    // Offline / direct static file, relies on localStorage
  }
}

document.addEventListener('DOMContentLoaded', fetchBookedDatesFromServer);

// Check if a date + time slot is available or already booked
function checkSlotAvailability(selectedDate, selectedTime) {
  if (!selectedDate) return { available: false, reason: 'no_date', message: '' };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const minD = new Date(today);
  minD.setDate(minD.getDate() + 1); // Tomorrow

  const maxD = new Date(today);
  maxD.setDate(maxD.getDate() + BOOKING_LIMIT_DAYS); // 30 days ahead

  const selD = new Date(selectedDate);
  selD.setHours(0, 0, 0, 0);

  // Check 30-day window
  if (selD < minD || selD > maxD) {
    return {
      available: false,
      reason: 'out_of_range',
      message: `⚠️ முன்பதிவு அடுத்த 30 நாட்களுக்கு மட்டுமே அனுமதிக்கப்படுகிறது (${toDisplayDate(toISODate(minD))} முதல் ${toDisplayDate(toISODate(maxD))} வரை)`
    };
  }

  // Check already booked dates
  const slots = getBookedSlots();
  const existing = slots.find(s => {
    if (s.date !== selectedDate) return false;
    // Conflict if either is full day or both have identical time slot
    if (s.time === 'fullday' || selectedTime === 'fullday') return true;
    if (selectedTime && s.time === selectedTime) return true;
    return false;
  });

  if (existing) {
    return {
      available: false,
      reason: 'already_booked',
      message: `❌ இந்த தேதி (${toDisplayDate(selectedDate)}) ஏற்கனவே முன்பதிவு செய்யப்பட்டுள்ளது! [Already Booked - ${existing.event || 'நிகழ்வு'}] — தயவுசெய்து வேறு தேதியை தேர்வு செய்யவும்.`
    };
  }

  return {
    available: true,
    reason: 'available',
    message: `✅ இந்த தேதி (${toDisplayDate(selectedDate)}) முன்பதிவுக்கு தயாராக உள்ளது! (Slot Available)`
  };
}

// Live availability UI updater
function updateAvailabilityUI() {
  const dateInput = document.getElementById('bk-event-date');
  const timeInput = document.getElementById('bk-event-time');
  const wrap = document.getElementById('bk-availability-wrap');
  const banner = document.getElementById('bk-availability-banner');
  const nextBtn = document.getElementById('bk-next-1');

  if (!dateInput || !wrap || !banner) return;
  const selectedDate = dateInput.value;
  const selectedTime = timeInput ? timeInput.value : '';

  if (!selectedDate) {
    wrap.style.display = 'none';
    if (nextBtn) { nextBtn.disabled = false; nextBtn.style.opacity = ''; }
    return;
  }

  const result = checkSlotAvailability(selectedDate, selectedTime);
  wrap.style.display = 'block';
  banner.className = 'bk-avail-banner';

  if (result.reason === 'already_booked') {
    banner.classList.add('booked');
    banner.innerHTML = result.message;
    if (nextBtn) { nextBtn.disabled = true; nextBtn.style.opacity = '0.5'; }
    dateInput.style.borderColor = '#dc2626';
  } else if (result.reason === 'out_of_range') {
    banner.classList.add('invalid');
    banner.innerHTML = result.message;
    if (nextBtn) { nextBtn.disabled = true; nextBtn.style.opacity = '0.5'; }
    dateInput.style.borderColor = '#d97706';
  } else if (result.available) {
    banner.classList.add('available');
    banner.innerHTML = result.message;
    if (nextBtn) { nextBtn.disabled = false; nextBtn.style.opacity = '1'; }
    dateInput.style.borderColor = '#22c55e';
  }
}

// ── Open / Close Modal ──
function openBookingModal() {
  if (!bookingModalOverlay) return;

  // Set min & max dates: 30-day advance booking limit (e.g. today+1 to today+30)
  const dateInput = document.getElementById('bk-event-date');
  const rangeHint = document.getElementById('bk-date-range-hint');
  const wrap = document.getElementById('bk-availability-wrap');

  if (dateInput) {
    const today = new Date();
    const minDate = new Date(today); minDate.setDate(minDate.getDate() + 1);
    const maxDate = new Date(today); maxDate.setDate(maxDate.getDate() + BOOKING_LIMIT_DAYS);

    dateInput.min = toISODate(minDate);
    dateInput.max = toISODate(maxDate);

    if (rangeHint) {
      rangeHint.textContent = `📅 முன்பதிவு காலம்: ${toDisplayDate(toISODate(minDate))} முதல் ${toDisplayDate(toISODate(maxDate))} வரை (அடுத்த 30 நாட்கள்)`;
    }
  }

  if (wrap) wrap.style.display = 'none';

  // If already confirmed previously, start fresh from step 1
  const step4 = document.getElementById('bk-step-4');
  if (step4 && step4.classList.contains('active')) {
    goToStep(1);
  }

  bookingModalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeBookingModal() {
  if (!bookingModalOverlay) return;
  bookingModalOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

// Close on backdrop click
if (bookingModalOverlay) {
  bookingModalOverlay.addEventListener('click', (e) => {
    if (e.target === bookingModalOverlay) {
      closeBookingModal();
    }
  });
}

// Close on Escape key
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && bookingModalOverlay && bookingModalOverlay.classList.contains('open')) {
    closeBookingModal();
  }
});

// ── Step Navigation & Form Validation ──
function goToStep(stepNumber) {
  // Validate Step 1 before advancing to Step 2
  if (stepNumber === 2) {
    const eventType = document.getElementById('bk-event-type');
    const eventDate = document.getElementById('bk-event-date');
    const eventTime = document.getElementById('bk-event-time');
    const guests = document.getElementById('bk-guests');

    if (!eventType.value) {
      highlightError(eventType, 'தயவுசெய்து நிகழ்வு வகையை தேர்வு செய்யுங்கள் (Select Event Type)');
      return;
    }
    if (!eventDate.value) {
      highlightError(eventDate, 'தயவுசெய்து நிகழ்வு தேதியை தேர்வு செய்யுங்கள் (Select Event Date)');
      return;
    }
    if (!eventTime.value) {
      highlightError(eventTime, 'தயவுசெய்து நிகழ்வு நேரத்தை தேர்வு செய்யுங்கள் (Select Time Slot)');
      return;
    }

    // Check slot availability & 30-day limit
    const slotCheck = checkSlotAvailability(eventDate.value, eventTime.value);
    if (!slotCheck.available) {
      highlightError(eventDate, slotCheck.message);
      updateAvailabilityUI();
      return;
    }

    if (!guests.value || parseInt(guests.value, 10) < 1) {
      highlightError(guests, 'தயவுசெய்து விருந்தினர் எண்ணிக்கையை சரியாக குறிப்பிடவும் (Enter Guest Count)');
      return;
    }

    // Save Step 1 data
    bookingState.eventType = eventType.value;
    bookingState.eventTypeName = eventLabels[eventType.value] || eventType.value;
    bookingState.eventDate = eventDate.value;
    bookingState.eventTime = eventTime.value;
    bookingState.eventTimeName = timeLabels[eventTime.value] || eventTime.value;
    bookingState.guests = guests.value;
    bookingState.requirements = document.getElementById('bk-requirements')?.value || '';

    // Calculate advance amount based on event type
    if (bookingState.eventType === 'marriage') {
      bookingState.advanceAmount = 10000;
    } else if (bookingState.eventType === 'moi-virunthu') {
      bookingState.advanceAmount = 7500;
    } else {
      bookingState.advanceAmount = 5000;
    }
  }

  // Validate Step 2 before advancing to Step 3
  if (stepNumber === 3) {
    const name = document.getElementById('bk-name');
    const phone = document.getElementById('bk-phone');

    if (!name.value.trim()) {
      highlightError(name, 'தயவுசெய்து உங்கள் பெயரை உள்ளிடவும் (Enter your name)');
      return;
    }

    const cleanPhone = phone.value.replace(/[\s\-]/g, '');
    if (!cleanPhone || cleanPhone.length !== 10 || !/^[6-9]\d{9}$/.test(cleanPhone)) {
      highlightError(phone, 'சரியான 10 இலக்க மொபைல் எண்ணை உள்ளிடவும் (Enter valid 10-digit mobile number)');
      return;
    }

    // Save Step 2 data
    bookingState.name = name.value.trim();
    bookingState.phone = cleanPhone;
    bookingState.email = document.getElementById('bk-email')?.value.trim() || '';
    bookingState.village = document.getElementById('bk-village')?.value.trim() || '';
    bookingState.address = document.getElementById('bk-address')?.value.trim() || '';

    // Populate Step 3 Summary
    populateBookingSummary();
  }

  // Switch step panels
  for (let i = 1; i <= 4; i++) {
    const stepEl = document.getElementById(`bk-step-${i}`);
    if (stepEl) {
      stepEl.classList.remove('active');
    }
  }
  const currentStepEl = document.getElementById(`bk-step-${stepNumber}`);
  if (currentStepEl) {
    currentStepEl.classList.add('active');
  }

  // Update progress dots and lines
  updateProgressUI(stepNumber);

  // Scroll modal body to top smoothly
  if (bookingModal) {
    bookingModal.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// ── Progress UI updates ──
function updateProgressUI(step) {
  const dots = [
    document.querySelector('#bk-step-1-dot .bk-step-dot'),
    document.querySelector('#bk-step-2-dot .bk-step-dot'),
    document.querySelector('#bk-step-3-dot .bk-step-dot')
  ];
  const lines = [
    document.getElementById('bk-line-1'),
    document.getElementById('bk-line-2')
  ];

  dots.forEach((dot, idx) => {
    if (!dot) return;
    const stepNum = idx + 1;
    dot.classList.remove('active', 'done');
    if (stepNum < step) {
      dot.classList.add('done');
      dot.innerHTML = '✓';
    } else if (stepNum === step) {
      dot.classList.add('active');
      dot.textContent = stepNum;
    } else {
      dot.textContent = stepNum;
    }
  });

  if (lines[0]) {
    if (step >= 2) lines[0].classList.add('done');
    else lines[0].classList.remove('done');
  }
  if (lines[1]) {
    if (step >= 3) lines[1].classList.add('done');
    else lines[1].classList.remove('done');
  }
}

// ── Populate Summary on Step 3 ──
function populateBookingSummary() {
  const sumEvent = document.getElementById('sum-event');
  const sumDate = document.getElementById('sum-date');
  const sumTime = document.getElementById('sum-time');
  const sumGuests = document.getElementById('sum-guests');
  const sumName = document.getElementById('sum-name');
  const sumPhone = document.getElementById('sum-phone');
  const advanceDisplay = document.getElementById('bk-advance-amount');
  const payBtn = document.getElementById('bk-pay-btn');

  if (sumEvent) sumEvent.textContent = bookingState.eventTypeName;
  if (sumDate) {
    const parts = bookingState.eventDate.split('-');
    sumDate.textContent = `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  if (sumTime) sumTime.textContent = bookingState.eventTimeName;
  if (sumGuests) sumGuests.textContent = `${bookingState.guests} நபர்கள் (Guests)`;
  if (sumName) sumName.textContent = bookingState.name;
  if (sumPhone) sumPhone.textContent = `+91 ${bookingState.phone}`;

  const formattedAmount = '₹ ' + Number(bookingState.advanceAmount).toLocaleString('en-IN');
  if (advanceDisplay) advanceDisplay.textContent = formattedAmount;
  if (payBtn) {
    payBtn.innerHTML = `🔒 &nbsp; ${formattedAmount} முன்பணம் செலுத்துங்கள் | Pay Advance`;
  }

  // Update real dynamic UPI QR code with exact advance amount
  renderDynamicUPIQR();
}

// ── Highlight Error Field with Toast ──
function highlightError(field, message) {
  field.focus();
  field.style.borderColor = '#dc2626';
  field.style.boxShadow = '0 0 0 3px rgba(220, 38, 38, 0.2)';

  setTimeout(() => {
    field.style.borderColor = '';
    field.style.boxShadow = '';
  }, 3000);

  showToast(message, 'warning');
}

// ── Toast Notification System ──
function showToast(message, type = 'info') {
  let toast = document.getElementById('spmva-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'spmva-toast';
    toast.style.position = 'fixed';
    toast.style.bottom = '24px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%) translateY(100px)';
    toast.style.backgroundColor = '#1a050e';
    toast.style.color = '#fff';
    toast.style.padding = '14px 24px';
    toast.style.borderRadius = '50px';
    toast.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
    toast.style.zIndex = '999999';
    toast.style.fontSize = '0.9rem';
    toast.style.fontWeight = '600';
    toast.style.display = 'flex';
    toast.style.alignItems = 'center';
    toast.style.gap = '10px';
    toast.style.transition = 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)';
    toast.style.border = '1px solid #c8973a';
    toast.style.pointerEvents = 'none';
    document.body.appendChild(toast);
  }

  let icon = '🔔';
  if (type === 'success') {
    icon = '✅';
    toast.style.borderColor = '#22c55e';
  } else if (type === 'warning') {
    icon = '⚠️';
    toast.style.borderColor = '#e8711a';
  } else {
    toast.style.borderColor = '#c8973a';
  }

  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
  toast.style.transform = 'translateX(-50%) translateY(0)';
  toast.style.opacity = '1';

  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.style.transform = 'translateX(-50%) translateY(100px)';
    toast.style.opacity = '0';
  }, 3500);
}

// ── Live Estimate in Step 1 ──
const eventTypeSelect = document.getElementById('bk-event-type');
const eventDateInput = document.getElementById('bk-event-date');

if (eventTypeSelect) {
  eventTypeSelect.addEventListener('change', () => {
    const estEvent = document.getElementById('bk-estimate-event');
    if (estEvent) {
      estEvent.textContent = eventLabels[eventTypeSelect.value] || '—';
    }
  });
}

const eventTimeSelect = document.getElementById('bk-event-time');

if (eventDateInput) {
  eventDateInput.addEventListener('change', () => {
    const estDate = document.getElementById('bk-estimate-date');
    if (estDate && eventDateInput.value) {
      const parts = eventDateInput.value.split('-');
      estDate.textContent = `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    updateAvailabilityUI();
  });
  eventDateInput.addEventListener('input', updateAvailabilityUI);
}

if (eventTimeSelect) {
  eventTimeSelect.addEventListener('change', updateAvailabilityUI);
}

// ── Payment Tabs ──
function switchPayTab(tabId) {
  bookingState.paymentMethod = tabId;

  const tabs = ['upi', 'bank', 'card'];
  tabs.forEach(t => {
    const tabBtn = document.getElementById(`tab-${t}`);
    const panel = document.getElementById(`panel-${t}`);
    if (tabBtn) tabBtn.classList.toggle('active', t === tabId);
    if (panel) panel.classList.toggle('active', t === tabId);
  });
}

// ── Copy Text Helper for Bank Details ──
function copyText(elementId, btn) {
  const el = document.getElementById(elementId);
  if (!el) return;
  const text = el.textContent.trim();
  navigator.clipboard.writeText(text).then(() => {
    const orig = btn.innerHTML;
    btn.innerHTML = '✓ Copied!';
    btn.style.background = '#22c55e';
    btn.style.color = '#fff';
    setTimeout(() => {
      btn.innerHTML = orig;
      btn.style.background = '';
      btn.style.color = '';
    }, 2200);
    showToast(`நகலெடுக்கப்பட்டது: ${text}`, 'success');
  }).catch(() => {
    showToast(`விவரம்: ${text}`, 'info');
  });
}

// ── UPI Functions ──
function copyUPI() {
  const upiId = 'sripalanimurugan@upi';
  navigator.clipboard.writeText(upiId).then(() => {
    const btn = document.getElementById('upi-copy-btn');
    if (btn) {
      btn.textContent = '✓ நகலெடுக்கப்பட்டது (Copied)';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.textContent = '📋 Copy';
        btn.classList.remove('copied');
      }, 2500);
    }
    showToast('UPI ID நகலெடுக்கப்பட்டது: sripalanimurugan@upi', 'success');
  }).catch(() => {
    showToast('UPI ID: sripalanimurugan@upi', 'info');
  });
}

// ── Real Dynamic UPI QR Code Renderer ──
function renderDynamicUPIQR() {
  const qrBox = document.getElementById('upi-qr-box');
  if (!qrBox) return;

  const upiId = (typeof HALL_BANK_CONFIG !== 'undefined' && HALL_BANK_CONFIG.upiId) ? HALL_BANK_CONFIG.upiId : 'sripalanimurugan@upi';
  const payeeName = 'Sri Palani Murugan Vizha Arangam';
  const amount = bookingState.advanceAmount || 5000;
  const note = 'AdvanceBooking';

  // NPCI Official UPI URI Specification
  const upiUri = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(payeeName)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;

  // Real Dynamic Scannable QR Code (180x180 px)
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(upiUri)}&margin=4`;

  qrBox.innerHTML = `
    <div class="dynamic-qr-wrapper" style="text-align:center; padding:6px; background:#fff; border-radius:12px;">
      <div style="font-size:0.75rem; font-weight:800; color:#5a0f20; margin-bottom:6px; letter-spacing:0.5px;">
        🕉️ BHIM <span style="color:#00853f;">UPI</span> &bull; ₹${Number(amount).toLocaleString('en-IN')}
      </div>
      <img
        id="upi-qr-image"
        src="${qrUrl}"
        alt="UPI QR Code - Scan with GPay, PhonePe, Paytm, BHIM"
        width="168"
        height="168"
        style="display:block; margin:0 auto; border-radius:6px; box-shadow:0 2px 8px rgba(0,0,0,0.08);"
        loading="eager"
      />
      <div style="display:flex; justify-content:center; gap:6px; margin-top:8px; font-size:0.65rem; font-weight:700;">
        <span style="color:#4285f4;">GPay</span> &bull; 
        <span style="color:#5f259f;">PhonePe</span> &bull; 
        <span style="color:#00b9f5;">Paytm</span> &bull; 
        <span style="color:#10843f;">BHIM</span>
      </div>
    </div>
  `;

  // Update intent link if present
  const intentLink = document.getElementById('upi-intent-link');
  if (intentLink) {
    intentLink.href = upiUri;
  }
}

// ── UPI Deep-Linking for GPay, PhonePe, Paytm, and BHIM ──
function triggerUPIApp(app) {
  const upiId = (typeof HALL_BANK_CONFIG !== 'undefined' && HALL_BANK_CONFIG.upiId) ? HALL_BANK_CONFIG.upiId : 'sripalanimurugan@upi';
  const payee = 'Sri Palani Murugan Vizha Arangam';
  const amount = bookingState.advanceAmount || 5000;
  const note = 'AdvanceBooking';

  const standardUri = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(payee)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;

  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const isAndroid = /Android/i.test(navigator.userAgent);

  const appConfig = {
    gpay: {
      name: 'Google Pay',
      androidIntent: `intent://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(payee)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}#Intent;scheme=upi;package=com.google.android.apps.nbu.paisa.user;end`,
      iosScheme: `tez://upi/pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(payee)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`
    },
    phonepe: {
      name: 'PhonePe',
      androidIntent: `intent://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(payee)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}#Intent;scheme=upi;package=com.phonepe.app;end`,
      iosScheme: `phonepe://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(payee)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`
    },
    paytm: {
      name: 'Paytm',
      androidIntent: `intent://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(payee)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}#Intent;scheme=upi;package=net.one97.paytm;end`,
      iosScheme: `paytmmp://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(payee)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`
    },
    bhim: {
      name: 'BHIM UPI',
      androidIntent: `intent://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(payee)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}#Intent;scheme=upi;package=in.org.npci.upiapp;end`,
      iosScheme: standardUri
    }
  };

  const target = appConfig[app] || { name: 'UPI' };

  if (isMobile) {
    showToast(`${target.name} திறக்கப்படுகிறது... (Opening ${target.name})`, 'info');
    if (isAndroid && target.androidIntent) {
      window.location.href = target.androidIntent;
    } else if (target.iosScheme) {
      window.location.href = target.iosScheme;
    } else {
      window.location.href = standardUri;
    }
  } else {
    showToast(`📱 மொபைலில் உள்ள உங்கள் ${target.name} செயலியை திறந்து QR Code-ஐ ஸ்கேன் செய்யவும்!`, 'info');
  }
}

// ── Card Inputs Formatting ──
function formatCard(input) {
  let val = input.value.replace(/\D/g, '');
  if (val.length > 16) val = val.substring(0, 16);
  const formatted = val.match(/.{1,4}/g)?.join(' ') || val;
  input.value = formatted;
}

function formatExpiry(input) {
  let val = input.value.replace(/\D/g, '');
  if (val.length > 4) val = val.substring(0, 4);
  if (val.length >= 2) {
    input.value = val.substring(0, 2) + ' / ' + val.substring(2);
  } else {
    input.value = val;
  }
}

// ── Net Banking Selection ──
function selectBank(bankId, elem) {
  bookingState.selectedBank = bankId;
  document.querySelectorAll('.bank-btn').forEach(btn => btn.classList.remove('selected'));
  if (elem) elem.classList.add('selected');
  showToast(`தேர்ந்தெடுக்கப்பட்ட வங்கி: ${bankId.toUpperCase()}`, 'info');
}

// ── Payment Processing (Simulation with Live Gateway UX) ──
function processPayment() {
  const payBtn = document.getElementById('bk-pay-btn');
  if (!payBtn) return;

  // Validation based on chosen tab
  if (bookingState.paymentMethod === 'card') {
    const cardNum = document.getElementById('card-number')?.value.replace(/\s/g, '');
    const cardExp = document.getElementById('card-expiry')?.value;
    const cardCvv = document.getElementById('card-cvv')?.value;

    if (!cardNum || cardNum.length < 16) {
      showToast('சரியான 16 இலக்க அட்டை எண்ணை உள்ளிடவும் (Enter valid 16-digit card number)', 'warning');
      return;
    }
    if (!cardExp || cardExp.length < 5) {
      showToast('காலாவதி தேதியை உள்ளிடவும் MM/YY (Enter expiry date)', 'warning');
      return;
    }
    if (!cardCvv || cardCvv.length < 3) {
      showToast('CVV குறியீட்டை உள்ளிடவும் (Enter 3-digit CVV)', 'warning');
      return;
    }
  }

  if (bookingState.paymentMethod === 'bank') {
    const bankTxn = document.getElementById('bank-txn-id')?.value.trim();
    if (bankTxn) {
      bookingState.txnId = bankTxn;
    }
  }

  // Button loading state
  payBtn.classList.add('loading');
  payBtn.disabled = true;
  const originalHtml = payBtn.innerHTML;
  payBtn.innerHTML = `⏳ &nbsp; கட்டணம் செயலாக்கப்படுகிறது... | Processing...`;

  // Simulate payment gateway delay (1.4 seconds)
  setTimeout(() => {
    payBtn.classList.remove('loading');
    payBtn.disabled = false;
    payBtn.innerHTML = originalHtml;

    // Generate unique Booking ID
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const year = new Date().getFullYear();
    bookingState.bookingId = `SPMVA-${year}-${randomSuffix}`;

    // Populate confirmation screen
    const confId = document.getElementById('bk-conf-id');
    const confEvent = document.getElementById('conf-event');
    const confDate = document.getElementById('conf-date');
    const confName = document.getElementById('conf-name');
    const confPhone = document.getElementById('conf-phone');
    const confAmount = document.getElementById('conf-amount');
    const waBtn = document.getElementById('bk-whatsapp-btn');

    if (confId) confId.textContent = bookingState.bookingId;
    if (confEvent) confEvent.textContent = bookingState.eventTypeName;
    let formattedDateText = bookingState.eventDate;
    if (confDate && bookingState.eventDate) {
      const parts = bookingState.eventDate.split('-');
      formattedDateText = `${parts[2]}/${parts[1]}/${parts[0]}`;
      confDate.textContent = formattedDateText;
    }
    if (confName) confName.textContent = bookingState.name;
    if (confPhone) confPhone.textContent = `+91 ${bookingState.phone}`;
    const formattedAmount = '₹ ' + Number(bookingState.advanceAmount).toLocaleString('en-IN');
    if (confAmount) confAmount.textContent = `${formattedAmount} (Advance)`;

    // Save booked date & slot to storage so it cannot be double-booked
    saveBookedSlot({
      date: bookingState.eventDate,
      time: bookingState.eventTime,
      event: bookingState.eventTypeName,
      name: bookingState.name,
      bookingId: bookingState.bookingId
    });

    // Configure Real WhatsApp Confirmation Message
    if (waBtn) {
      const waMsg = `*ஸ்ரீ பழனி முருகன் விழா அரங்கம் - புதிய முன்பதிவு*\n\n` +
        `📋 *முன்பதிவு எண் (Booking ID):* ${bookingState.bookingId}\n` +
        `🎉 *நிகழ்வு:* ${bookingState.eventTypeName}\n` +
        `📅 *தேதி:* ${formattedDateText}\n` +
        `⏰ *நேரம்:* ${bookingState.eventTimeName}\n` +
        `👥 *விருந்தினர்:* ${bookingState.guests} பேர்\n` +
        `👤 *பெயர்:* ${bookingState.name}\n` +
        `📞 *மொபைல்:* +91 ${bookingState.phone}\n` +
        `🏡 *ஊர்:* ${bookingState.village || 'வல்லவாரி'}\n` +
        `💰 *செலுத்திய முன்பணம்:* ${formattedAmount}\n` +
        (bookingState.txnId ? `🔖 *UTR/Ref ID:* ${bookingState.txnId}\n` : '') +
        `\nதயவுசெய்து முன்பதிவை சரிபார்த்து உறுதி செய்யவும். நன்றி! 🙏`;
      const waTargetPhone = (HALL_BANK_CONFIG.whatsappNumber || '919655609405').replace(/\D/g, '');
      waBtn.href = `https://wa.me/${waTargetPhone}?text=${encodeURIComponent(waMsg)}`;
    }

    // Switch to Success step
    for (let i = 1; i <= 3; i++) {
      const stepEl = document.getElementById(`bk-step-${i}`);
      if (stepEl) stepEl.classList.remove('active');
    }
    const step4 = document.getElementById('bk-step-4');
    if (step4) step4.classList.add('active');

    // Mark all steps as complete
    document.querySelectorAll('.bk-step-dot').forEach(d => {
      d.classList.remove('active');
      d.classList.add('done');
      d.innerHTML = '✓';
    });
    document.querySelectorAll('.bk-progress-line').forEach(l => l.classList.add('done'));

    showToast('முன்பதிவு வெற்றிகரமாக உறுதியானது! (Booking Confirmed)', 'success');
    triggerConfetti();

    if (bookingModal) {
      bookingModal.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, 1400);
}

// ── Confetti Celebration Effect ──
function triggerConfetti() {
  const colors = ['#c8973a', '#e8711a', '#7a1c2e', '#22c55e', '#f5d080', '#e8b855'];
  const confettiCount = 50;
  const container = bookingModal || document.body;

  for (let i = 0; i < confettiCount; i++) {
    const el = document.createElement('div');
    el.style.position = 'absolute';
    el.style.width = `${Math.floor(Math.random() * 8) + 6}px`;
    el.style.height = `${Math.floor(Math.random() * 8) + 6}px`;
    el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    el.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    el.style.left = `${Math.random() * 90 + 5}%`;
    el.style.top = '10%';
    el.style.zIndex = '99999';
    el.style.opacity = '1';
    el.style.pointerEvents = 'none';
    el.style.transform = `rotate(${Math.random() * 360}deg)`;
    el.style.transition = `all ${Math.random() * 1.5 + 1.2}s cubic-bezier(0.25, 1, 0.5, 1)`;

    container.appendChild(el);

    setTimeout(() => {
      el.style.transform = `translate(${Math.random() * 100 - 50}px, ${Math.random() * 320 + 150}px) rotate(${Math.random() * 720}deg)`;
      el.style.opacity = '0';
    }, 20);

    setTimeout(() => {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, 2800);
  }
}

// ── Print Confirmation Slip ──
function printConfirmation() {
  window.print();
}

