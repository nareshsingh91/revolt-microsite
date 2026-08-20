// Revolt Microsite Interactive Behaviors
document.addEventListener('DOMContentLoaded', () => {
  const leadForm = document.getElementById('microsite-lead-form');
  const pincodeInput = document.getElementById('user-pincode');
  const successModalElement = document.getElementById('successModal');
  const successModal = (typeof bootstrap !== 'undefined' && successModalElement) ? new bootstrap.Modal(successModalElement) : null;

  // Comprehensive Form Validation Elements
  const nameInput = document.getElementById('user-name');
  const mobileInput = document.getElementById('user-mobile');
  const submitBtn = document.getElementById('btn-submit-lead');
  const nameError = document.getElementById('name-error');
  const mobileError = document.getElementById('mobile-error');
  const pincodeError = document.getElementById('pincode-error');

  // Touch tracking for focus / click outside (blur)
  let nameTouched = false;
  let mobileTouched = false;
  let pincodeTouched = false;

  // Input Sanitization & Event Listeners
  if (nameInput) {
    nameInput.addEventListener('focus', () => { nameTouched = true; });
    nameInput.addEventListener('blur', () => { validateNameField(true); });
    nameInput.addEventListener('input', () => { if (nameTouched) validateNameField(false); });
  }

  if (mobileInput) {
    mobileInput.addEventListener('focus', () => { mobileTouched = true; });
    mobileInput.addEventListener('input', () => {
      mobileInput.value = mobileInput.value.replace(/\D/g, '').slice(0, 10);
      if (mobileTouched) validateMobileField(false);
    });
    mobileInput.addEventListener('blur', () => { validateMobileField(true); });
  }

  if (pincodeInput) {
    pincodeInput.addEventListener('focus', () => { pincodeTouched = true; });
    pincodeInput.addEventListener('input', () => {
      pincodeInput.value = pincodeInput.value.replace(/\D/g, '').slice(0, 6);
      if (pincodeTouched) validatePincodeField(false);
    });
    pincodeInput.addEventListener('blur', () => { validatePincodeField(true); });
  }

  // Field Validation Helper Functions with exact user-requested error text
  function validateNameField(forceShow = false) {
    if (!nameInput) return true;
    const val = nameInput.value.trim();
    const nameErrorText = nameError ? nameError.querySelector('.error-text') : null;
    let isValid = false;

    if (val === '') {
      if (nameErrorText) nameErrorText.textContent = 'Please enter your full name.';
      isValid = false;
    } else if (val.length < 2 || !/^[a-zA-Z\s.]{2,}$/.test(val)) {
      if (nameErrorText) nameErrorText.textContent = 'Name must be at least 2 characters.';
      isValid = false;
    } else {
      isValid = true;
    }

    if (!isValid && (nameTouched || forceShow)) {
      nameInput.classList.add('is-invalid');
      nameInput.classList.remove('is-valid');
      if (nameError) nameError.classList.add('show');
    } else if (isValid) {
      nameInput.classList.remove('is-invalid');
      nameInput.classList.add('is-valid');
      if (nameError) nameError.classList.remove('show');
    } else {
      nameInput.classList.remove('is-invalid', 'is-valid');
      if (nameError) nameError.classList.remove('show');
    }
    return isValid;
  }

  function validateMobileField(forceShow = false) {
    if (!mobileInput) return true;
    const val = mobileInput.value.trim();
    const mobileErrorText = mobileError ? mobileError.querySelector('.error-text') : null;
    let isValid = false;

    if (val === '') {
      if (mobileErrorText) mobileErrorText.textContent = 'Please enter your mobile number.';
      isValid = false;
    } else if (!/^[6-9]\d{9}$/.test(val)) {
      if (mobileErrorText) mobileErrorText.textContent = 'Invalid mobile number.';
      isValid = false;
    } else {
      isValid = true;
    }

    if (!isValid && (mobileTouched || forceShow)) {
      mobileInput.classList.add('is-invalid');
      mobileInput.classList.remove('is-valid');
      if (mobileError) mobileError.classList.add('show');
    } else if (isValid) {
      mobileInput.classList.remove('is-invalid');
      mobileInput.classList.add('is-valid');
      if (mobileError) mobileError.classList.remove('show');
    } else {
      mobileInput.classList.remove('is-invalid', 'is-valid');
      if (mobileError) mobileError.classList.remove('show');
    }
    return isValid;
  }

  function validatePincodeField(forceShow = false) {
    if (!pincodeInput) return true;
    const val = pincodeInput.value.trim();
    const pincodeErrorText = pincodeError ? pincodeError.querySelector('.error-text') : null;
    let isValid = false;

    if (val === '') {
      if (pincodeErrorText) pincodeErrorText.textContent = 'Please enter your pincode.';
      isValid = false;
    } else if (!/^[1-9]\d{5}$/.test(val)) {
      if (pincodeErrorText) pincodeErrorText.textContent = 'Invalid pincode.';
      isValid = false;
    } else {
      isValid = true;
    }

    if (!isValid && (pincodeTouched || forceShow)) {
      pincodeInput.classList.add('is-invalid');
      pincodeInput.classList.remove('is-valid');
      if (pincodeError) pincodeError.classList.add('show');
    } else if (isValid) {
      pincodeInput.classList.remove('is-invalid');
      pincodeInput.classList.add('is-valid');
      if (pincodeError) pincodeError.classList.remove('show');
    } else {
      pincodeInput.classList.remove('is-invalid', 'is-valid');
      if (pincodeError) pincodeError.classList.remove('show');
    }
    return isValid;
  }

  // Handle Form Submission
  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      nameTouched = true;
      mobileTouched = true;
      pincodeTouched = true;

      const isNameValid = validateNameField(true);
      const isMobileValid = validateMobileField(true);
      const isPincodeValid = validatePincodeField(true);

      if (!isNameValid) {
        if (nameInput) {
          nameInput.classList.add('is-invalid');
          if (nameError) nameError.classList.add('show');
          nameInput.focus();
        }
        return;
      }

      if (!isMobileValid) {
        if (mobileInput) {
          mobileInput.classList.add('is-invalid');
          if (mobileError) mobileError.classList.add('show');
          mobileInput.focus();
        }
        return;
      }

      if (!isPincodeValid) {
        if (pincodeInput) {
          pincodeInput.classList.add('is-invalid');
          if (pincodeError) pincodeError.classList.add('show');
          pincodeInput.focus();
        }
        return;
      }

      // Show submit button loading state
      const originalBtnText = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Submitting...';
      }

      setTimeout(() => {
        // Reset submit button state
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }

        // Show success modal
        if (successModal) {
          successModal.show();
        } else {
          alert('Request received! Our Revolt Mumbai sales team will contact you within 30 minutes.');
        }

        // Reset form & validation classes
        leadForm.reset();
        nameTouched = false;
        mobileTouched = false;
        pincodeTouched = false;

        [nameInput, mobileInput, pincodeInput].forEach(field => {
          if (field) field.classList.remove('is-invalid', 'is-valid');
        });
        [nameError, mobileError, pincodeError].forEach(err => {
          if (err) err.classList.remove('show');
        });
        if (pincodeInput) {
          pincodeInput.value = '400083';
        }
      }, 400);
    });
  }

  // Smooth scroll for all CTA anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Comprehensive Model Image & Color Data Mapping
  const bikeModelData = {
    'RV1': [
      { name: 'Titan Red', hex: '#d32f2f', img: 'https://www.revoltmotors.com/images/model/rv1/titan_red-02.png' },
      { name: 'Cosmos Red', hex: '#990000', img: 'https://www.revoltmotors.com/images/model/rv1/cosmos_red-02.png' },
      { name: 'Midnight Blue', hex: '#1e3a8a', img: 'https://www.revoltmotors.com/images/model/rv1/midnight_blue-02.png' },
      { name: 'Neon Green', hex: '#84cc16', img: 'https://www.revoltmotors.com/images/model/rv1/neon_green-02.png' }
    ],
    'RV1+': [
      { name: 'Titan Red', hex: '#d32f2f', img: 'https://www.revoltmotors.com/images/model/rv1-plus/titan_red-02.png' },
      { name: 'Cosmos Red', hex: '#990000', img: 'https://www.revoltmotors.com/images/model/rv1-plus/cosmos_red-02.png' },
      { name: 'Neon Green', hex: '#84cc16', img: 'https://www.revoltmotors.com/images/model/rv1-plus/neon_green-02.png' },
      { name: 'Midnight Blue', hex: '#1e3a8a', img: 'https://www.revoltmotors.com/images/model/rv1-plus/midnight_blue-02.png' }
    ],
    'RV BlazeX': [
      { name: 'Eclipse Red', hex: '#d32f2f', img: 'https://www.revoltmotors.com/images/model/blazex/eclipse-red-01.png' },
      { name: 'Sterling Silver', hex: '#9ca3af', img: 'https://www.revoltmotors.com/images/model/blazex/sterling-silver-01.png' }
    ],
    'RVX': [
      { name: 'Eclipse Red', hex: '#d32f2f', img: 'https://www.revoltmotors.com/images/model/rvx/eclipse-red-02.png' },
      { name: 'Electric Blue', hex: '#2563eb', img: 'https://www.revoltmotors.com/images/model/rvx/electric-blue-02.png' },
      { name: 'Cosmic Black', hex: '#111827', img: 'https://www.revoltmotors.com/images/model/rvx/cosmic-black-02.png' }
    ],
    'RV400': [
      { name: 'Cosmic Black', hex: '#111827', img: 'https://www.revoltmotors.com/images/model/rv400/cosmic-black-02.png' },
      { name: 'Eclipse Red', hex: '#d32f2f', img: 'https://www.revoltmotors.com/images/model/rv400/eclipse-red-02.png' },
      { name: 'Mist Grey', hex: '#9ca3af', img: 'https://www.revoltmotors.com/images/model/rv400/mist-grey-02.png' },
      { name: 'Dark Lunar Green', hex: '#14532d', img: 'https://www.revoltmotors.com/images/model/rv400/dark-lunar-green-02.png' }
    ],
    'RV400 BRZ': [
      { name: 'Cosmic Black', hex: '#111827', img: 'https://www.revoltmotors.com/images/model/rv400-brz/cosmic-black-02.png' },
      { name: 'Dark Silver', hex: '#6b7280', img: 'https://www.revoltmotors.com/images/model/rv400-brz/dark-silver-02.png' },
      { name: 'Pacific Blue', hex: '#2563eb', img: 'https://www.revoltmotors.com/images/model/rv400-brz/pacific-blue-02.png' },
      { name: 'Rebel Red', hex: '#dc2626', img: 'https://www.revoltmotors.com/images/model/rv400-brz/rebel-red-02.png' }
    ]
  };

  const carouselInner = document.querySelector('#bikeCarousel .carousel-inner');
  const swatchesContainer = document.querySelector('.color-swatches-container');

  function renderModelVisuals(modelName) {
    const colorList = bikeModelData[modelName] || bikeModelData['RV400'];
    if (!carouselInner || !swatchesContainer) return;

    // Render Carousel Items
    let carouselHtml = '';
    colorList.forEach((c, idx) => {
      carouselHtml += `
        <div class="carousel-item ${idx === 0 ? 'active' : ''}" style="display: ${idx === 0 ? 'block' : 'none'};">
          <img src="${c.img}" alt="Revolt ${modelName} ${c.name}" class="img-fluid" onerror="this.onerror=null; this.src='assets/revolt_rv400.jpg';">
          <div class="color-title d-lg-none mt-2">${c.name}</div>
        </div>
      `;
    });
    carouselInner.innerHTML = carouselHtml;

    // Render Swatches
    let swatchesHtml = '';
    colorList.forEach((c, idx) => {
      swatchesHtml += `
        <button type="button" class="color-swatch-btn ${idx === 0 ? 'active' : ''}" data-index="${idx}" style="background-color: ${c.hex};" aria-label="${c.name}" title="${c.name}"></button>
      `;
    });
    swatchesContainer.innerHTML = swatchesHtml;

    // Re-bind Swatch Click Listeners
    const newSwatches = swatchesContainer.querySelectorAll('.color-swatch-btn');
    const newCarouselItems = carouselInner.querySelectorAll('.carousel-item');

    newSwatches.forEach((swatch, idx) => {
      swatch.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        newCarouselItems.forEach((item, itemIdx) => {
          if (itemIdx === idx) {
            item.classList.add('active');
            item.style.display = 'block';
          } else {
            item.classList.remove('active');
            item.style.display = 'none';
          }
        });

        newSwatches.forEach((s, sIdx) => {
          if (sIdx === idx) {
            s.classList.add('active');
          } else {
            s.classList.remove('active');
          }
        });
      });
    });
  }

  // Model Selector Dropdown Logic
  const modelDropdownBtn = document.getElementById('modelDropdownMenuBtn');
  const modelDropdownMenu = document.querySelector('.model-dropdown-menu');
  const modelSelectItems = document.querySelectorAll('.model-select-item');
  const currentModelDisplay = document.getElementById('current-model-display');
  const heroSubhead = document.querySelector('.hero-subhead');
  const specVals = document.querySelectorAll('.spec-val');
  const leadFormHeading = document.getElementById('lead-form-heading');
  const btnSubmitLead = document.getElementById('btn-submit-lead');
  const modalText = document.querySelector('#successModal p');

  // Toggle dropdown on trigger click
  if (modelDropdownBtn && modelDropdownMenu) {
    modelDropdownBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      modelDropdownMenu.classList.toggle('show');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!modelDropdownBtn.contains(e.target) && !modelDropdownMenu.contains(e.target)) {
        modelDropdownMenu.classList.remove('show');
      }
    });
  }

  modelSelectItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const modelName = item.getAttribute('data-model');
      const priceText = item.getAttribute('data-price');
      const rangeText = item.getAttribute('data-range');
      const chargeText = item.getAttribute('data-charge');
      const costText = item.getAttribute('data-cost');

      // Update active state in menu
      modelSelectItems.forEach(mi => mi.classList.remove('active'));
      item.classList.add('active');

      // Update headline text
      if (currentModelDisplay) {
        currentModelDisplay.textContent = modelName;
      }

      // Update pricing subhead
      if (heroSubhead && priceText) {
        heroSubhead.textContent = priceText;
      }

      // Update specs bar
      if (specVals.length >= 3) {
        if (rangeText) specVals[0].textContent = rangeText;
        if (chargeText) specVals[1].textContent = chargeText;
        if (costText) specVals[2].textContent = costText;
      }

      // Update lead form heading & submit button dynamically
      if (leadFormHeading) {
        leadFormHeading.textContent = `Get ${modelName} price & availability in Mumbai`;
      }
      if (btnSubmitLead) {
        btnSubmitLead.innerHTML = `<span>Get ${modelName} offer price</span>`;
      }

      // Update confirmation modal copy dynamically
      if (modalText) {
        modalText.textContent = `Our Revolt Mumbai sales team will contact you within 30 minutes with exclusive ${modelName} price offers and test ride availability.`;
      }

      // Render model specific carousel images and swatches
      renderModelVisuals(modelName);

      // Close dropdown menu
      if (modelDropdownMenu) {
        modelDropdownMenu.classList.remove('show');
      }
    });
  });

  // Initialize RV400 model visuals on load
  renderModelVisuals('RV400');
});
