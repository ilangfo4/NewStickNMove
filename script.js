// Smooth scrolling for nav links
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// FAQ Accordion functionality
document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', function() {
    const answer = this.nextElementSibling;
    const toggle = this.querySelector('.faq-toggle');
    
    // Close all other FAQ items
    document.querySelectorAll('.faq-answer').forEach(item => {
      if (item !== answer) {
        item.classList.remove('active');
        item.previousElementSibling.querySelector('.faq-toggle').textContent = '+';
      }
    });
    
    // Toggle current FAQ item
    answer.classList.toggle('active');
    toggle.textContent = answer.classList.contains('active') ? '−' : '+';
  });
});

// Scroll to top button functionality
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', function() {
  if (window.pageYOffset > 300) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});

scrollTopBtn.addEventListener('click', function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Initialize EmailJS
(function() {
  emailjs.init("lQX6_zyhFX8AIOkE_"); // Replace with your EmailJS user ID
})();

// Add error logging for debugging
function logError(error) {
  console.error('EmailJS Error:', error);
  console.error('Error Details:', {
    text: error.text,
    status: error.status
  });
}

// Notification system
function showNotification(type, title, message) {
  const container = document.getElementById('notification-container');
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  
  const icon = type === 'success' ? '✅' : '❌';
  
  notification.innerHTML = `
    <div class="notification-icon">${icon}</div>
    <div class="notification-content">
      <div class="notification-title">${title}</div>
      <div class="notification-message">${message}</div>
    </div>
    <button class="notification-close" onclick="this.parentElement.remove()">×</button>
  `;
  
  container.appendChild(notification);
  
  // Show notification
  setTimeout(() => {
    notification.classList.add('show');
  }, 100);
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove();
      }
    }, 300);
  }, 5000);
}

// Form submission handlers
document.querySelector('.contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    message: document.getElementById('message').value
  };
  
  // Show loading state
  const submitBtn = this.querySelector('.submit-btn');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;
  
  // Send email using EmailJS
  emailjs.send('service_i8vqega', 'template_5vmt88z', {
    to_email: 'sticknmoveatl@gmail.com',
    from_name: formData.name,
    from_email: formData.email,
    message: formData.message,
    subject: 'New Contact Form Submission - Stick N Move ATL'
  })
  .then(function(response) {
    showNotification('success', 'Message Sent!', 'Thank you for your message! We\'ll get back to you soon.');
    document.querySelector('.contact-form').reset();
  })
  .catch(function(error) {
    logError(error);
    showNotification('error', 'Error Sending Message', 'There was an error sending your message. Please try again or contact us directly.');
  })
  .finally(function() {
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  });
});

document.querySelector('.booking-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const formData = {
    name: document.getElementById('booking-name').value,
    email: document.getElementById('booking-email').value,
    date: document.getElementById('booking-date').value,
    time: document.getElementById('booking-time').value,
    service: document.getElementById('service-type').value
  };
  
  // Show loading state
  const submitBtn = this.querySelector('.book-submit-btn');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Booking...';
  submitBtn.disabled = true;
  
  // Send email using EmailJS
  emailjs.send('service_i8vqega', 'template_uan72md', {
    to_email: 'sticknmoveatl@gmail.com',
    from_name: formData.name,
    from_email: formData.email,
    appointment_date: formData.date,
    appointment_time: formData.time,
    service_type: formData.service,
    subject: 'New Appointment Booking - Stick N Move ATL'
  })
  .then(function(response) {
    showNotification('success', 'Appointment Booked!', 'Appointment booked successfully! We\'ll confirm your details via email.');
    document.querySelector('.booking-form').reset();
  })
  .catch(function(error) {
    logError(error);
    showNotification('error', 'Booking Error', 'There was an error booking your appointment. Please try again or contact us directly.');
  })
  .finally(function() {
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  });
});

// Service booking buttons
document.querySelectorAll('.book-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const serviceName = this.closest('.service-card').querySelector('h3').textContent;
    // Scroll to booking section and pre-fill service
    document.querySelector('#book').scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      document.getElementById('service-type').value = serviceName.toLowerCase().replace(' ', '-');
    }, 500);
  });
});

// Contact button functionality
document.querySelectorAll('.contact-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    // Scroll to contact section
    document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
  });
});
