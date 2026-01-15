// Form handling and modal functionality
document.addEventListener('DOMContentLoaded', function() {
    initModals();
    initForms();
    initFileUploads();
});

// Modal functionality
function initModals() {
    const jobSeekerBtn = document.getElementById('jobSeekerBtn');
    const postJobBtn = document.getElementById('postJobBtn');
    const jobSeekerModal = document.getElementById('jobSeekerModal');
    const postJobModal = document.getElementById('postJobModal');
    const successModal = document.getElementById('successModal');
    
    const closeJobSeekerModal = document.getElementById('closeJobSeekerModal');
    const closePostJobModal = document.getElementById('closePostJobModal');
    const closeSuccessModal = document.getElementById('closeSuccessModal');
    
    // Open modals
    jobSeekerBtn.addEventListener('click', () => {
        openModal(jobSeekerModal);
    });
    
    postJobBtn.addEventListener('click', () => {
        openModal(postJobModal);
    });
    
    // Close modals
    closeJobSeekerModal.addEventListener('click', () => {
        closeModal(jobSeekerModal);
    });
    
    closePostJobModal.addEventListener('click', () => {
        closeModal(postJobModal);
    });
    
    closeSuccessModal.addEventListener('click', () => {
        closeModal(successModal);
    });
    
    // Close modal when clicking outside
    [jobSeekerModal, postJobModal, successModal].forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                closeModal(activeModal);
            }
        }
    });
}

function openModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function showSuccessModal(message) {
    const successMessage = document.getElementById('successMessage');
    const successModal = document.getElementById('successModal');
    
    successMessage.textContent = message;
    openModal(successModal);
}

// Form handling
function initForms() {
    const jobSeekerForm = document.getElementById('jobSeekerForm');
    const postJobForm = document.getElementById('postJobForm');
    const contactForm = document.getElementById('contactForm');
    
    if (jobSeekerForm) {
        jobSeekerForm.addEventListener('submit', handleJobSeekerSubmit);
    }
    
    if (postJobForm) {
        postJobForm.addEventListener('submit', handlePostJobSubmit);
    }
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
}

async function handleJobSeekerSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const submitBtn = e.target.querySelector('.btn-submit');
    
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    submitBtn.disabled = true;
    
    try {
        const emailData = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            location: formData.get('location'),
            visaType: formData.get('visaType'),
            jobType: formData.get('jobType'),
            industry: formData.get('industry'),
            experience: formData.get('experience'),
            message: formData.get('message')
        };
        
        await sendToBackend('/api/job-seeker', emailData);
        closeModal(document.getElementById('jobSeekerModal'));
        showSuccessModal('Thank you for your application! We will review your profile and contact you within 24 hours.');
        e.target.reset();
        updateFileInfo('resumeInfo', null);
        
    } catch (error) {
        console.error('Error:', error);
        alert('There was an error submitting your application. Please try again.');
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

async function handlePostJobSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const submitBtn = e.target.querySelector('.btn-submit');
    
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Posting...';
    submitBtn.disabled = true;
    
    try {
        const jobData = {
            business_name: formData.get('business_name'),
            contact_person: formData.get('contact_person'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            job_title: formData.get('job_title'),
            job_location: formData.get('job_location'),
            employment_type: formData.get('employment_type'),
            sponsorship: formData.get('sponsorship'),
            message: formData.get('message')
        };
        
        await sendToBackend('/api/post-job', jobData);
        closeModal(document.getElementById('postJobModal'));
        showSuccessModal('Your job posting has been submitted successfully!');
        e.target.reset();
        
    } catch (error) {
        console.error('Error:', error);
        alert('There was an error submitting your job posting. Please try again.');
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

async function handleContactSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const submitBtn = e.target.querySelector('.btn-submit');
    
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    try {
        const contactData = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        await sendToBackend('/api/contact', contactData);
        showSuccessModal('Thank you for your message! We will get back to you within 24 hours.');
        e.target.reset();
        
    } catch (error) {
        console.error('Error:', error);
        alert('There was an error sending your message. Please try again.');
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

async function sendToBackend(endpoint, data) {
    const response = await fetch(`https://jnv-visa.vercel.app/${endpoint}`, { // Update with your actual API domain
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include',
        mode: 'cors'
    });
    
    if (!response.ok) throw new Error(`Server error: ${response.status}`);
    return response.json();
}

// Email sending function (simulated)
async function sendEmail(emailData) {
    // In a real implementation, this would send data to your backend API
    // which would then send the email using a service like SendGrid, Mailgun, etc.
    
    console.log('Email would be sent with data:', emailData);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demonstration, we'll create a mailto link as fallback
    const subject = encodeURIComponent(emailData.subject);
    let body = '';
    
    if (emailData.type === 'job-seeker') {
        body = encodeURIComponent(`
New Job Seeker Application

Name: ${emailData.data.name}
Phone: ${emailData.data.phone}
Email: ${emailData.data.email}
Preferred Industry: ${emailData.data.industry}

Resume: ${emailData.data.resume ? emailData.data.resume.name : 'Attached'}

Please review this application and contact the candidate.
        `);
    } else if (emailData.type === 'post-job') {
        body = encodeURIComponent(`
New Job Posting

Company: ${emailData.data.company}
Job Title: ${emailData.data.title}
Industry: ${emailData.data.industry}
Contact Phone: ${emailData.data.phone}
Contact Email: ${emailData.data.email}

Job Description:
${emailData.data.description}

Please review this job posting and contact the employer.
        `);
    } else if (emailData.type === 'contact') {
        body = encodeURIComponent(`
Contact Form Submission

Name: ${emailData.data.name}
Email: ${emailData.data.email}
Phone: ${emailData.data.phone}
Subject: ${emailData.data.subject}

Message:
${emailData.data.message}
        `);
    }
    
    // Create mailto link (this will open the user's email client)
    const mailtoLink = `mailto:${emailData.to}?subject=${subject}&body=${body}`;
    
    // In development, you might want to open this link
    // window.open(mailtoLink);
    
    return Promise.resolve();
}

// File upload handling
function initFileUploads() {
    const fileInputs = document.querySelectorAll('input[type="file"]');
    
    fileInputs.forEach(input => {
        input.addEventListener('change', handleFileUpload);
    });
}

function handleFileUpload(e) {
    const file = e.target.files[0];
    const fileInfoId = e.target.id === 'seekerResume' ? 'resumeInfo' : null;
    
    if (file && fileInfoId) {
        updateFileInfo(fileInfoId, file);
    }
}

function updateFileInfo(infoId, file) {
    const fileInfo = document.getElementById(infoId);
    
    if (!fileInfo) return;
    
    if (file) {
        const fileSize = (file.size / 1024 / 1024).toFixed(2);
        fileInfo.innerHTML = `
            <i class="fas fa-file-alt"></i>
            <strong>${file.name}</strong> (${fileSize} MB)
        `;
        fileInfo.classList.add('show');
    } else {
        fileInfo.classList.remove('show');
        fileInfo.innerHTML = '';
    }
}

// Form validation helpers
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[1-9][\d]{0,15}$/;
    return re.test(phone.replace(/\s/g, ''));
}

// Add real-time validation
document.addEventListener('DOMContentLoaded', function() {
    const emailInputs = document.querySelectorAll('input[type="email"]');
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    
    emailInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && !validateEmail(this.value)) {
                this.style.borderColor = 'var(--error)';
            } else {
                this.style.borderColor = '';
            }
        });
    });
    
    phoneInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && !validatePhone(this.value)) {
                this.style.borderColor = 'var(--error)';
            } else {
                this.style.borderColor = '';
            }
        });
    });
});