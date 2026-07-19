// ========== SECTION NAVIGATION ==========
function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active-section');
    });
    
    // Show selected section
    const targetSection = document.getElementById('section-' + sectionName);
    if (targetSection) {
        targetSection.classList.add('active-section');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Update nav active state
    document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
        link.classList.remove('nav-active');
    });
    
    // Find and highlight the active nav link
    const activeLink = document.querySelector(`.nav-links a[onclick*="${sectionName}"]`);
    const activeMobileLink = document.querySelector(`.mobile-menu a[onclick*="${sectionName}"]`);
    if (activeLink) activeLink.classList.add('nav-active');
    if (activeMobileLink) activeMobileLink.classList.add('nav-active');
    
    // If apply section, reset form
    if (sectionName === 'apply') {
        resetForm();
        currentStep = 1;
        updateUI();
    }
    
    // Close mobile menu
    closeMobileMenu();
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) mobileMenu.classList.remove('show');
}

// ========== MOBILE MENU ==========
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    mobileMenu.classList.toggle('show');
});

document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileMenu.classList.remove('show');
    }
});

// ========== STATE ==========
let currentStep = 1, skills = [], uploadedFile = null;
const totalSteps = 4;

// ========== DOM ==========
const form = document.getElementById('applicationForm');
const steps = document.querySelectorAll('#section-home .f-step, #section-apply .f-step');
const pSteps = document.querySelectorAll('#section-home .p-step, #section-apply .p-step');
const pLines = document.querySelectorAll('#section-home .p-line, #section-apply .p-line');
const progressFill = document.getElementById('progressFill');
const formTitle = document.getElementById('formTitle');
const formSubtitle = document.getElementById('formSubtitle');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');
const skillsTags = document.getElementById('skillsTags');
const skillInput = document.getElementById('skillInput');
const successModal = document.getElementById('successModal');
const toastBox = document.getElementById('toastBox');

// ========== STEP CONFIG ==========
const config = {
    1: { title: 'Personal Information', subtitle: 'Fill in your basic details', progress: 25 },
    2: { title: 'Skills & Expertise', subtitle: 'Showcase your technical abilities', progress: 50 },
    3: { title: 'Experience & Documents', subtitle: 'Share your professional background', progress: 75 },
    4: { title: 'Review & Submit', subtitle: 'Verify all information', progress: 100 }
};

function updateUI() {
    if (formTitle) formTitle.textContent = config[currentStep].title;
    if (formSubtitle) formSubtitle.textContent = config[currentStep].subtitle;
    if (progressFill) progressFill.style.width = config[currentStep].progress + '%';
    
    pSteps.forEach((s, i) => {
        s.classList.remove('active', 'completed');
        if (i + 1 < currentStep) s.classList.add('completed');
        if (i + 1 === currentStep) s.classList.add('active');
    });
    
    pLines.forEach((l, i) => l.classList.toggle('completed', i + 1 < currentStep));
    
    // Show/hide current step content
    const activeSection = document.querySelector('.content-section.active-section');
    if (activeSection) {
        const sectionSteps = activeSection.querySelectorAll('.f-step');
        sectionSteps.forEach((s, i) => s.classList.toggle('active', i + 1 === currentStep));
    }
    
    if (prevBtn) prevBtn.style.display = currentStep === 1 ? 'none' : 'flex';
    if (nextBtn) nextBtn.style.display = currentStep === totalSteps ? 'none' : 'flex';
    if (submitBtn) submitBtn.style.display = currentStep === totalSteps ? 'flex' : 'none';
    
    if (currentStep === 4) generateReview();
}

function goTo(s) {
    if (s >= 1 && s <= totalSteps) {
        currentStep = s;
        updateUI();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// ========== VALIDATION ==========
const rules = {
    required: v => v.trim().length > 0,
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    min: (v, n) => v.trim().length >= n,
    phone: v => /^03[0-9]{2}-?[0-9]{7}$/.test(v.replace(/\s/g, '')),
    cnic: v => /^[0-9]{5}-[0-9]{7}-[0-9]{1}$/.test(v),
    url: v => v === '' || /^https?:\/\/.+\..+/.test(v)
};

const msgs = {
    required: 'Required',
    email: 'Invalid email',
    min: 'Too short',
    phone: 'Use 03XX-XXXXXXX',
    cnic: 'Use 12345-1234567-1',
    url: 'Invalid URL'
};

function validate(input) {
    const r = input.dataset.validate;
    if (!r) return true;
    let ok = true, err = '';
    for (const p of r.split('|')) {
        const [n, v] = p.split(':');
        if (n === 'required' && !rules.required(input.value)) { ok = false; err = msgs.required; break; }
        if (input.value && n === 'email' && !rules.email(input.value)) { ok = false; err = msgs.email; break; }
        if (input.value && n === 'min' && !rules.min(input.value, +v)) { ok = false; err = msgs.min; break; }
        if (input.value && n === 'phone' && !rules.phone(input.value)) { ok = false; err = msgs.phone; break; }
        if (input.value && n === 'cnic' && !rules.cnic(input.value)) { ok = false; err = msgs.cnic; break; }
        if (input.value && n === 'url' && !rules.url(input.value)) { ok = false; err = msgs.url; break; }
    }
    const el = document.getElementById(input.id + 'Error');
    if (el) el.textContent = err;
    input.classList.remove('valid', 'invalid');
    if (input.value) input.classList.add(ok ? 'valid' : 'invalid');
    return ok;
}

function validateStep(n) {
    const activeSection = document.querySelector('.content-section.active-section');
    if (!activeSection) return true;
    
    const stepEl = activeSection.querySelector('#step' + n);
    if (!stepEl) return true;
    
    let ok = true;
    stepEl.querySelectorAll('[data-validate]').forEach(i => {
        if (!validate(i)) ok = false;
    });
    
    if (n === 2 && skills.length === 0) {
        const skillsErr = activeSection.querySelector('#skillsError');
        if (skillsErr) skillsErr.textContent = 'Add at least one skill';
        ok = false;
    }
    
    if (n === 3 && !uploadedFile) {
        const resumeErr = activeSection.querySelector('#resumeError');
        if (resumeErr) resumeErr.textContent = 'Upload your resume';
        ok = false;
    }
    
    if (n === 4) {
        const terms = activeSection.querySelector('#terms');
        const termsErr = activeSection.querySelector('#termsError');
        if (terms && !terms.checked) {
            if (termsErr) termsErr.textContent = 'Agree to terms';
            ok = false;
        } else if (termsErr) {
            termsErr.textContent = '';
        }
    }
    
    return ok;
}

// ========== SKILLS ==========
function addSkill(s) {
    s = s.trim();
    if (!s || skills.includes(s) || skills.length >= 12) return;
    skills.push(s);
    renderSkills();
    if (skillInput) { skillInput.value = ''; skillInput.focus(); }
}

function removeSkill(s) {
    skills = skills.filter(x => x !== s);
    renderSkills();
}

function renderSkills() {
    if (!skillsTags) return;
    skillsTags.innerHTML = skills.map(s => 
        `<span class="s-tag">${s} <button type="button" data-skill="${s}"><i class="fa-solid fa-xmark"></i></button></span>`
    ).join('');
    skillsTags.querySelectorAll('button').forEach(b => 
        b.addEventListener('click', () => removeSkill(b.dataset.skill))
    );
}

if (skillInput) {
    skillInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') { e.preventDefault(); addSkill(skillInput.value); }
    });
}

const skillAddBtn = document.getElementById('skillAddBtn');
if (skillAddBtn) {
    skillAddBtn.addEventListener('click', () => addSkill(skillInput.value));
}

document.querySelectorAll('.s-chip').forEach(c => 
    c.addEventListener('click', () => addSkill(c.textContent))
);

// ========== SALARY ==========
const sMin = document.getElementById('salaryMin');
const sMax = document.getElementById('salaryMax');

function updSalary() {
    if (!sMin || !sMax) return;
    let a = +sMin.value, b = +sMax.value;
    if (a > b) { [a, b] = [b, a]; sMin.value = a; sMax.value = b; }
    const salMinEl = document.getElementById('salMin');
    const salMaxEl = document.getElementById('salMax');
    if (salMinEl) salMinEl.textContent = 'PKR ' + (a / 1000).toFixed(0) + 'K';
    if (salMaxEl) salMaxEl.textContent = 'PKR ' + (b / 1000).toFixed(0) + 'K';
}

if (sMin) sMin.addEventListener('input', updSalary);
if (sMax) sMax.addEventListener('input', updSalary);

// ========== COVER LETTER ==========
const coverLetter = document.getElementById('coverLetter');
if (coverLetter) {
    coverLetter.addEventListener('input', function() {
        const charCountEl = document.getElementById('charCount');
        if (charCountEl) charCountEl.textContent = this.value.length;
    });
}

// ========== UPLOAD ==========
const drop = document.getElementById('uploadDrop');
const preview = document.getElementById('uploadFile');
const fileInp = document.getElementById('resume');

if (drop) drop.addEventListener('click', () => fileInp.click());
if (drop) {
    drop.addEventListener('dragover', e => { e.preventDefault(); drop.style.borderColor = 'var(--primary)'; });
    drop.addEventListener('dragleave', () => drop.style.borderColor = '');
    drop.addEventListener('drop', e => {
        e.preventDefault();
        drop.style.borderColor = '';
        handleFile(e.dataTransfer.files[0]);
    });
}
if (fileInp) fileInp.addEventListener('change', () => handleFile(fileInp.files[0]));

const uploadRemove = document.getElementById('uploadRemove');
if (uploadRemove) {
    uploadRemove.addEventListener('click', () => {
        uploadedFile = null;
        if (fileInp) fileInp.value = '';
        if (preview) preview.style.display = 'none';
        if (drop) drop.style.display = 'block';
        const resumeErr = document.getElementById('resumeError');
        if (resumeErr) resumeErr.textContent = '';
    });
}

function handleFile(f) {
    if (!f) return;
    if (!['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(f.type)) {
        toast('Only PDF/DOCX allowed', 'error');
        return;
    }
    if (f.size > 5242880) { toast('Max 5MB', 'error'); return; }
    uploadedFile = f;
    const uploadName = document.getElementById('uploadName');
    const uploadSize = document.getElementById('uploadSize');
    if (uploadName) uploadName.textContent = f.name;
    if (uploadSize) uploadSize.textContent = (f.size / 1024).toFixed(1) + ' KB';
    if (preview) preview.style.display = 'flex';
    if (drop) drop.style.display = 'none';
}

// ========== REVIEW ==========
function generateReview() {
    const reviewList = document.getElementById('reviewList');
    if (!reviewList) return;
    
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const cnic = document.getElementById('cnic');
    const city = document.getElementById('city');
    const linkedin = document.getElementById('linkedin');
    const experience = document.getElementById('experience');
    const portfolio = document.getElementById('portfolio');
    const github = document.getElementById('github');
    const currentRole = document.getElementById('currentRole');
    
    const fields = [
        ['Full Name', (firstName?.value || '') + ' ' + (lastName?.value || '')],
        ['Email', email?.value || ''],
        ['Phone', phone?.value || ''],
        ['CNIC', cnic?.value || ''],
        ['City', city?.value || ''],
        ['LinkedIn', linkedin?.value || '-'],
        ['Experience', experience?.value || ''],
        ['Portfolio', portfolio?.value || '-'],
        ['GitHub', github?.value || '-'],
        ['Current Role', currentRole?.value || ''],
        ['Salary', (document.getElementById('salMin')?.textContent || '') + ' - ' + (document.getElementById('salMax')?.textContent || '')]
    ];
    
    reviewList.innerHTML = fields.map(([l, v]) => 
        `<div class="r-item"><span class="r-label">${l}</span><span class="r-value">${v}</span></div>`
    ).join('') +
    `<div class="r-item"><span class="r-label">Skills</span><div class="r-skills">${skills.map(s => `<span class="r-skill">${s}</span>`).join('')}</div></div>` +
    `<div class="r-item"><span class="r-label">Resume</span><span class="r-value">${uploadedFile ? uploadedFile.name : '-'}</span></div>`;
}

// ========== CONFETTI ==========
function confetti() {
    const box = document.getElementById('confettiBox');
    if (!box) return;
    const colors = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
    for (let i = 0; i < 50; i++) {
        const p = document.createElement('div');
        p.className = 'conf-piece';
        p.style.left = Math.random() * 100 + '%';
        p.style.top = -(Math.random() * 25) + 'px';
        p.style.background = colors[Math.floor(Math.random() * colors.length)];
        p.style.animationDelay = Math.random() * 1 + 's';
        p.style.animationDuration = Math.random() * 2 + 1.5 + 's';
        box.appendChild(p);
        setTimeout(() => p.remove(), 3000);
    }
}

// ========== NAVIGATION ==========
if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        validateStep(currentStep) ? goTo(currentStep + 1) : toast('Fix errors first', 'error');
    });
}
if (prevBtn) {
    prevBtn.addEventListener('click', () => goTo(currentStep - 1));
}

// ========== LIVE VALIDATION ==========
document.querySelectorAll('[data-validate]').forEach(i => {
    i.addEventListener('blur', () => validate(i));
    i.addEventListener('input', () => { if (i.classList.contains('invalid')) validate(i); });
});

// ========== SUBMIT ==========
if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault();
        if (validateStep(currentStep)) {
            const firstName = document.getElementById('firstName');
            const applicantName = document.getElementById('applicantName');
            const refNumber = document.getElementById('refNumber');
            
            if (applicantName && firstName) applicantName.textContent = firstName.value;
            if (refNumber) refNumber.textContent = 'DH-' + Date.now().toString(36).toUpperCase();
            if (successModal) successModal.classList.add('show');
            confetti();
        } else {
            toast('Complete all fields', 'error');
        }
    });
}

// ========== CLOSE MODAL ==========
const closeModal = document.getElementById('closeModal');
if (closeModal) {
    closeModal.addEventListener('click', () => {
        if (successModal) successModal.classList.remove('show');
        resetForm();
        goTo(1);
    });
}

// ========== RESET FORM ==========
function resetForm() {
    skills = [];
    uploadedFile = null;
    renderSkills();
    if (preview) preview.style.display = 'none';
    if (drop) drop.style.display = 'block';
    if (fileInp) fileInp.value = '';
    document.querySelectorAll('.f-input, .f-select, .f-textarea').forEach(i => i.classList.remove('valid', 'invalid'));
    document.querySelectorAll('.f-error').forEach(e => e.textContent = '');
    const charCountEl = document.getElementById('charCount');
    if (charCountEl) charCountEl.textContent = '0';
    if (form) form.reset();
}

// ========== TOAST ==========
function toast(msg, type = 'success') {
    if (!toastBox) return;
    const t = document.createElement('div');
    t.className = `toast ${type}`;
    t.innerHTML = `<i class="fa-solid fa-${type === 'success' ? 'circle-check' : 'circle-exclamation'}"></i> ${msg}`;
    toastBox.appendChild(t);
    setTimeout(() => t.remove(), 3000);
}

// ========== INIT ==========
updateUI();
updSalary();