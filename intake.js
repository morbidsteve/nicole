// ==========================================
// PURELY PLANNED CONSULTING
// Client Intake Form with AI-Proof CAPTCHA & Spam Filtering
// ==========================================

// Track when form was loaded (for bot detection)
const formStartTime = Date.now();
document.getElementById('formStartTime').value = formStartTime;

// ==========================================
// CAPTCHA GENERATION (AI-Proof)
// ==========================================

let currentCaptchaAnswer = 0;

function generateCaptcha() {
    // Generate random numbers for math problem
    const num1 = Math.floor(Math.random() * 20) + 1;
    const num2 = Math.floor(Math.random() * 20) + 1;
    const operations = [
        { symbol: '+', calc: (a, b) => a + b, name: 'plus' },
        { symbol: '-', calc: (a, b) => a - b, name: 'minus' },
        { symbol: '×', calc: (a, b) => a * b, name: 'times' }
    ];

    const operation = operations[Math.floor(Math.random() * operations.length)];

    // For subtraction, ensure result is positive
    let first = num1;
    let second = num2;
    if (operation.symbol === '-' && num1 < num2) {
        first = num2;
        second = num1;
    }

    currentCaptchaAnswer = operation.calc(first, second);

    // Display question in text form
    const questionText = `What is ${first} ${operation.name} ${second}? *`;
    document.getElementById('captchaQuestion').textContent = questionText;
    document.getElementById('captchaCorrect').value = currentCaptchaAnswer;

    // Clear any previous answer
    document.getElementById('captchaAnswer').value = '';
}

// Generate initial CAPTCHA
generateCaptcha();

// Refresh CAPTCHA button
document.getElementById('refreshCaptcha').addEventListener('click', generateCaptcha);

// ==========================================
// CHARACTER COUNTER
// ==========================================

const projectDescription = document.getElementById('projectDescription');
const charCount = document.getElementById('charCount');

projectDescription.addEventListener('input', () => {
    charCount.textContent = projectDescription.value.length;
});

// ==========================================
// CONDITIONAL FIELD DISPLAY
// ==========================================

// Show snow bird section if multiple properties selected
document.querySelectorAll('input[name="multipleProperties"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
        const snowBirdSection = document.getElementById('snowBirdSection');
        if (e.target.value === 'yes') {
            snowBirdSection.style.display = 'block';
        } else {
            snowBirdSection.style.display = 'none';
        }
    });
});

// ==========================================
// FORM VALIDATION
// ==========================================

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length === 10;
}

function validateZip(zip) {
    return /^\d{5}$/.test(zip);
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorSpan = field.parentElement.querySelector('.error-message');

    field.classList.add('error');
    if (errorSpan) {
        errorSpan.textContent = message;
        errorSpan.classList.add('show');
    }
}

function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    const errorSpan = field.parentElement.querySelector('.error-message');

    field.classList.remove('error');
    if (errorSpan) {
        errorSpan.textContent = '';
        errorSpan.classList.remove('show');
    }
}

// Real-time validation
document.getElementById('emailAddress').addEventListener('blur', function() {
    if (this.value && !validateEmail(this.value)) {
        showError('emailAddress', 'Please enter a valid email address');
    } else {
        clearError('emailAddress');
    }
});

document.getElementById('phoneNumber').addEventListener('blur', function() {
    if (this.value && !validatePhone(this.value)) {
        showError('phoneNumber', 'Please enter a valid 10-digit phone number');
    } else {
        clearError('phoneNumber');
    }
});

document.getElementById('zipCode').addEventListener('blur', function() {
    if (this.value && !validateZip(this.value)) {
        showError('zipCode', 'Please enter a valid 5-digit zip code');
    } else {
        clearError('zipCode');
    }
});

// Phone formatting
document.getElementById('phoneNumber').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 10) {
        value = value.slice(0, 10);
    }
    if (value.length >= 6) {
        value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6)}`;
    } else if (value.length >= 3) {
        value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
    }
    e.target.value = value;
});

// State uppercase
document.getElementById('state').addEventListener('input', function(e) {
    e.target.value = e.target.value.toUpperCase();
});

// ==========================================
// SPAM DETECTION FUNCTIONS
// ==========================================

function isSpamSubmission(formData) {
    const spamIndicators = [];

    // Check 1: Honeypot field (should be empty)
    if (formData.get('website')) {
        spamIndicators.push('Honeypot field filled');
        return { isSpam: true, reasons: spamIndicators };
    }

    // Check 2: Submission time (bots submit too fast - less than 10 seconds)
    const submissionTime = Date.now();
    const timeDiff = (submissionTime - formStartTime) / 1000;
    if (timeDiff < 10) {
        spamIndicators.push('Form submitted too quickly');
        return { isSpam: true, reasons: spamIndicators };
    }

    // Check 3: Excessive links in text fields
    const textFields = [
        formData.get('projectDescription'),
        formData.get('specialRequirements'),
        formData.get('snowBirdDetails')
    ];

    textFields.forEach(field => {
        if (field) {
            const urlPattern = /(https?:\/\/[^\s]+)/g;
            const urls = field.match(urlPattern);
            if (urls && urls.length > 2) {
                spamIndicators.push('Excessive URLs in text fields');
            }
        }
    });

    // Check 4: Suspicious patterns (common spam phrases)
    const spamPhrases = [
        'click here', 'buy now', 'limited time', 'act now',
        'make money', 'work from home', 'crypto', 'bitcoin',
        'viagra', 'casino', 'lottery', 'prize'
    ];

    const allText = textFields.join(' ').toLowerCase();
    spamPhrases.forEach(phrase => {
        if (allText.includes(phrase)) {
            spamIndicators.push(`Spam phrase detected: ${phrase}`);
        }
    });

    // Check 5: Email domain validation (block disposable email domains)
    const email = formData.get('emailAddress');
    const disposableDomains = [
        'tempmail.com', 'throwaway.email', '10minutemail.com',
        'guerrillamail.com', 'mailinator.com', 'maildrop.cc'
    ];

    if (email) {
        const domain = email.split('@')[1]?.toLowerCase();
        if (disposableDomains.includes(domain)) {
            spamIndicators.push('Disposable email address detected');
        }
    }

    // Check 6: Gibberish detection (repeated characters)
    const name = formData.get('firstName') + formData.get('lastName');
    if (name) {
        const repeatedPattern = /(.)\1{4,}/; // Same character repeated 5+ times
        if (repeatedPattern.test(name)) {
            spamIndicators.push('Suspicious name pattern');
        }
    }

    // Check 7: All caps in name or email (common spam pattern)
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    if (firstName === firstName.toUpperCase() && firstName.length > 3) {
        spamIndicators.push('All caps in first name');
    }
    if (lastName === lastName.toUpperCase() && lastName.length > 3) {
        spamIndicators.push('All caps in last name');
    }

    return {
        isSpam: spamIndicators.length > 0,
        reasons: spamIndicators
    };
}

// ==========================================
// FORM SUBMISSION
// ==========================================

const intakeForm = document.getElementById('intakeForm');
const intakeFormMessage = document.getElementById('intakeFormMessage');

intakeForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    // Clear previous messages
    intakeFormMessage.style.display = 'none';
    intakeFormMessage.className = 'form-message';

    // Validate required fields
    let isValid = true;
    const requiredFields = [
        'firstName', 'lastName', 'emailAddress', 'phoneNumber',
        'address', 'city', 'state', 'zipCode', 'preferredContact',
        'propertyType', 'projectDescription', 'timeline', 'captchaAnswer'
    ];

    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field.value.trim()) {
            showError(fieldId, 'This field is required');
            isValid = false;
        } else {
            clearError(fieldId);
        }
    });

    // Validate at least one service is selected
    const servicesChecked = document.querySelectorAll('input[name="services"]:checked');
    if (servicesChecked.length === 0) {
        intakeFormMessage.className = 'form-message error';
        intakeFormMessage.textContent = 'Please select at least one service.';
        intakeFormMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
    }

    // Validate consent checkbox
    const consent = document.getElementById('consent');
    if (!consent.checked) {
        intakeFormMessage.className = 'form-message error';
        intakeFormMessage.textContent = 'Please agree to our contact consent to proceed.';
        intakeFormMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
    }

    // Validate email
    const emailField = document.getElementById('emailAddress');
    if (!validateEmail(emailField.value)) {
        showError('emailAddress', 'Please enter a valid email address');
        isValid = false;
    }

    // Validate phone
    const phoneField = document.getElementById('phoneNumber');
    if (!validatePhone(phoneField.value)) {
        showError('phoneNumber', 'Please enter a valid 10-digit phone number');
        isValid = false;
    }

    // Validate zip
    const zipField = document.getElementById('zipCode');
    if (!validateZip(zipField.value)) {
        showError('zipCode', 'Please enter a valid 5-digit zip code');
        isValid = false;
    }

    // Validate CAPTCHA
    const captchaAnswer = parseInt(document.getElementById('captchaAnswer').value);
    const captchaCorrect = parseInt(document.getElementById('captchaCorrect').value);

    if (captchaAnswer !== captchaCorrect) {
        showError('captchaAnswer', 'Incorrect answer. Please try again.');
        isValid = false;
        generateCaptcha(); // Generate new CAPTCHA
    } else {
        clearError('captchaAnswer');
    }

    if (!isValid) {
        intakeFormMessage.className = 'form-message error';
        intakeFormMessage.textContent = 'Please correct the errors above and try again.';
        intakeFormMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
    }

    // Get form data
    const formData = new FormData(intakeForm);

    // Spam detection
    const spamCheck = isSpamSubmission(formData);
    if (spamCheck.isSpam) {
        console.warn('Spam detected:', spamCheck.reasons);

        // Don't send to email, but show a generic message to the user
        intakeFormMessage.className = 'form-message warning';
        intakeFormMessage.textContent = 'Thank you for your submission. We will review it and get back to you if it meets our requirements.';
        intakeFormMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Log spam attempt (for development)
        console.log('Spam submission blocked:', {
            reasons: spamCheck.reasons,
            timestamp: new Date().toISOString()
        });

        return; // Don't proceed with submission
    }

    // Show loading state
    const submitButton = this.querySelector('button[type="submit"]');
    submitButton.classList.add('loading');
    submitButton.disabled = true;

    // Prepare clean data object
    const services = Array.from(servicesChecked).map(cb => cb.value).join(', ');

    const submissionData = {
        // Personal Information
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('emailAddress'),
        phone: formData.get('phoneNumber'),
        address: formData.get('address'),
        city: formData.get('city'),
        state: formData.get('state'),
        zipCode: formData.get('zipCode'),
        preferredContact: formData.get('preferredContact'),
        bestTimeToContact: formData.get('bestTimeToContact') || 'Not specified',

        // Property Information
        propertyType: formData.get('propertyType'),
        propertySize: formData.get('propertySize') || 'Not specified',
        multipleProperties: formData.get('multipleProperties'),
        snowBird: formData.get('snowBird') || 'No',
        snowBirdDetails: formData.get('snowBirdDetails') || '',

        // Service Request
        services: services,
        projectDescription: formData.get('projectDescription'),
        timeline: formData.get('timeline'),
        budget: formData.get('budget') || 'Not specified',

        // Additional Information
        hearAboutUs: formData.get('hearAboutUs') || 'Not specified',
        specialRequirements: formData.get('specialRequirements') || 'None',

        // Metadata
        submittedAt: new Date().toISOString()
    };

    // Simulate submission (replace with actual email service)
    setTimeout(() => {
        console.log('LEGITIMATE SUBMISSION - Ready to send to:', 'nicole.mcallister.mgmt@gmail.com');
        console.log('Submission Data:', submissionData);

        // Success message
        intakeFormMessage.className = 'form-message success';
        intakeFormMessage.innerHTML = `
            <strong>Thank you for submitting your intake form!</strong><br>
            We have received your information and will contact you within 24-48 hours via your preferred method.<br><br>
            <strong>Next Steps:</strong><br>
            1. You will receive a confirmation email at ${submissionData.email}<br>
            2. Nicole will review your needs and prepare a customized proposal<br>
            3. We'll schedule an initial consultation to discuss your project<br><br>
            If you have any urgent questions, please email <a href="mailto:nicole.mcallister.mgmt@gmail.com">nicole.mcallister.mgmt@gmail.com</a>
        `;

        // Reset form
        intakeForm.reset();
        charCount.textContent = '0';
        generateCaptcha();

        // Scroll to success message
        intakeFormMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Remove loading state
        submitButton.classList.remove('loading');
        submitButton.disabled = false;

        // TODO: Replace with actual form submission service
        // Example with FormSpree:
        /*
        try {
            const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submissionData)
            });

            if (response.ok) {
                // Success message
                intakeFormMessage.className = 'form-message success';
                intakeFormMessage.innerHTML = `Success message here...`;
                intakeForm.reset();
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            intakeFormMessage.className = 'form-message error';
            intakeFormMessage.textContent = 'There was an error submitting your form. Please try again or email directly.';
        } finally {
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
        }
        */
    }, 2000);
});

// ==========================================
// FORM RESET HANDLING
// ==========================================

intakeForm.addEventListener('reset', () => {
    // Clear all error messages
    document.querySelectorAll('.error-message').forEach(error => {
        error.classList.remove('show');
    });

    // Clear all error states
    document.querySelectorAll('.error').forEach(field => {
        field.classList.remove('error');
    });

    // Reset character count
    charCount.textContent = '0';

    // Generate new CAPTCHA
    generateCaptcha();

    // Hide form message
    intakeFormMessage.style.display = 'none';
});

// ==========================================
// ACCESSIBILITY IMPROVEMENTS
// ==========================================

// Auto-scroll to first error on validation failure
function scrollToFirstError() {
    const firstError = document.querySelector('.error');
    if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstError.focus();
    }
}

// Announce errors to screen readers
function announceErrors(count) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'alert');
    announcement.setAttribute('aria-live', 'assertive');
    announcement.className = 'sr-only';
    announcement.textContent = `${count} validation error${count > 1 ? 's' : ''} found. Please review the form.`;
    document.body.appendChild(announcement);

    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 3000);
}

console.log('%cPurely Planned Consulting - Client Intake Form', 'font-size: 16px; font-weight: bold; color: #000;');
console.log('%cSpam protection active', 'font-size: 12px; color: #4a4a4a;');
