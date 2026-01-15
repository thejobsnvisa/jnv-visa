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
    
    // Show loading state
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    submitBtn.disabled = true;
    
    try {
        // Prepare email data
        const emailData = {
            to: 'shreyash@growmore.one',
            subject: 'New Job Seeker Inquiry - JobsNVisa',
            type: 'job-seeker',
            data: {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            location: formData.get('location'),
            visaType: formData.get('visaType'),
            jobType: formData.get('jobType'),
            industry: formData.get('industry'),
            experience: formData.get('experience'),
            resume: formData.get('resume'),
            message: formData.get('message')
            }
        };
        
        // Send email (simulated - in real implementation, this would go to your backend)
        await sendEmail(emailData);
        
        // Close modal and show success
        closeModal(document.getElementById('jobSeekerModal'));
        showSuccessModal('Thank you for your application! We will review your profile and contact you within 24 hours with suitable opportunities.');
        
        // Reset form
        e.target.reset();
        updateFileInfo('resumeInfo', null);
        
    } catch (error) {
        console.error('Error submitting job seeker form:', error);
        alert('There was an error submitting your application. Please try again or contact us directly.');
    } finally {
        // Restore button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

async function handlePostJobSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const submitBtn = e.target.querySelector('.btn-submit');
    
    // Show loading state
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Posting...';
    submitBtn.disabled = true;
    
    try {
        // Prepare email data
        const emailData = {
            to: 'shreyash@growmore.one',
            subject: 'New Job Posting - JobsNVisa',
            type: 'post-job',
            data: {
                company: formData.get('company'),
                title: formData.get('title'),
                description: formData.get('description'),
                phone: formData.get('phone'),
                email: formData.get('email'),
                industry: formData.get('industry')
            }
        };
        
        // Send email (simulated - in real implementation, this would go to your backend)
        await sendEmail(emailData);
        
        // Close modal and show success
        closeModal(document.getElementById('postJobModal'));
        showSuccessModal('Your job posting has been submitted successfully! Our team will review it and contact you within 24 hours to discuss the next steps.');
        
        // Reset form
        e.target.reset();
        
    } catch (error) {
        console.error('Error submitting job posting:', error);
        alert('There was an error submitting your job posting. Please try again or contact us directly.');
    } finally {
        // Restore button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

async function handleContactSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const submitBtn = e.target.querySelector('.btn-submit');
    
    // Show loading state
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    try {
        // Prepare email data
        const emailData = {
            to: 'shreyash@growmore.one',
            subject: `Contact Form Submission - ${formData.get('subject')} - JobsNVisa`,
            type: 'contact',
            data: {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                subject: formData.get('subject'),
                message: formData.get('message')
            }
        };
        
        // Send email (simulated - in real implementation, this would go to your backend)
        await sendEmail(emailData);
        
        // Show success message
        showSuccessModal('Thank you for your message! We will get back to you within 24 hours.');
        
        // Reset form
        e.target.reset();
        
    } catch (error) {
        console.error('Error submitting contact form:', error);
        alert('There was an error sending your message. Please try again or contact us directly.');
    } finally {
        // Restore button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
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