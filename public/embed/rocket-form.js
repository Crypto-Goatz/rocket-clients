// ============================================================
// Rocket Form - Embeddable Lead Capture Widget
// ============================================================
// Drop this script on any website to capture leads
// 100% customizable via data attributes or config object
// ============================================================
//
// USAGE:
// <div id="rocket-form"
//      data-form-id="my-form"
//      data-business-name="{{business.name}}"
//      data-heading="Get Your Free Quote"
//      data-button-text="Get Started"
//      data-success-message="Thanks {{first_name}}! We'll call you soon."
//      data-workflow-id="abc123"
//      data-show-phone="true"
//      data-show-name="true"
//      data-theme="dark">
// </div>
// <script src="https://rocketclients.com/embed/rocket-form.js"></script>
//
// OR via JavaScript:
// RocketForm.init({
//   container: '#rocket-form',
//   formId: 'my-form',
//   businessName: '{{business.name}}',
//   heading: 'Get Your Free Quote',
//   ...
// })
// ============================================================

(function() {
  'use strict';

  // ============================================================
  // Default Configuration
  // ============================================================
  const DEFAULTS = {
    apiUrl: 'https://rocketclients.com/api/leads',
    formId: 'rocket-lead-form',
    businessName: 'Our Team',
    heading: 'Get Started Today',
    subheading: 'Fill out the form below and we\'ll be in touch shortly.',
    buttonText: 'Submit',
    buttonLoadingText: 'Sending...',
    successMessage: 'Thank you! We\'ll be in touch soon.',
    errorMessage: 'Something went wrong. Please try again.',
    showName: true,
    showPhone: true,
    showMessage: false,
    namePlaceholder: 'Your Name',
    emailPlaceholder: 'Email Address',
    phonePlaceholder: 'Phone Number',
    messagePlaceholder: 'How can we help?',
    nameRequired: false,
    phoneRequired: false,
    messageRequired: false,
    theme: 'light', // 'light', 'dark', 'rocket'
    workflowId: null,
    tags: [],
    customFields: {},
    onSuccess: null,
    onError: null,
    redirectUrl: null,
    redirectDelay: 2000,
  };

  // ============================================================
  // Styles
  // ============================================================
  const STYLES = `
    .rf-container {
      --rf-primary: #f97316;
      --rf-primary-hover: #ea580c;
      --rf-bg: #ffffff;
      --rf-bg-input: #f4f4f5;
      --rf-text: #18181b;
      --rf-text-muted: #71717a;
      --rf-border: #e4e4e7;
      --rf-error: #ef4444;
      --rf-success: #22c55e;
      --rf-radius: 8px;
      --rf-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);

      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      max-width: 420px;
      margin: 0 auto;
      padding: 24px;
      background: var(--rf-bg);
      border-radius: var(--rf-radius);
      box-shadow: var(--rf-shadow);
    }

    .rf-container.rf-dark {
      --rf-bg: #18181b;
      --rf-bg-input: #27272a;
      --rf-text: #fafafa;
      --rf-text-muted: #a1a1aa;
      --rf-border: #3f3f46;
    }

    .rf-container.rf-rocket {
      --rf-primary: linear-gradient(135deg, #f97316 0%, #ef4444 100%);
      --rf-primary-hover: linear-gradient(135deg, #ea580c 0%, #dc2626 100%);
      --rf-bg: linear-gradient(180deg, #18181b 0%, #09090b 100%);
      --rf-bg-input: #27272a;
      --rf-text: #fafafa;
      --rf-text-muted: #a1a1aa;
      --rf-border: #3f3f46;
      background: var(--rf-bg);
    }

    .rf-header {
      text-align: center;
      margin-bottom: 24px;
    }

    .rf-heading {
      font-size: 24px;
      font-weight: 700;
      color: var(--rf-text);
      margin: 0 0 8px 0;
      line-height: 1.3;
    }

    .rf-subheading {
      font-size: 14px;
      color: var(--rf-text-muted);
      margin: 0;
      line-height: 1.5;
    }

    .rf-form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .rf-field {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .rf-label {
      font-size: 14px;
      font-weight: 500;
      color: var(--rf-text);
    }

    .rf-label .rf-required {
      color: var(--rf-error);
      margin-left: 2px;
    }

    .rf-input {
      width: 100%;
      padding: 12px 16px;
      font-size: 16px;
      color: var(--rf-text);
      background: var(--rf-bg-input);
      border: 1px solid var(--rf-border);
      border-radius: var(--rf-radius);
      outline: none;
      transition: border-color 0.2s, box-shadow 0.2s;
      box-sizing: border-box;
    }

    .rf-input:focus {
      border-color: var(--rf-primary);
      box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.1);
    }

    .rf-input.rf-error {
      border-color: var(--rf-error);
    }

    .rf-input::placeholder {
      color: var(--rf-text-muted);
    }

    .rf-textarea {
      min-height: 100px;
      resize: vertical;
    }

    .rf-error-text {
      font-size: 12px;
      color: var(--rf-error);
      margin-top: 4px;
    }

    .rf-button {
      width: 100%;
      padding: 14px 24px;
      font-size: 16px;
      font-weight: 600;
      color: #ffffff;
      background: var(--rf-primary);
      border: none;
      border-radius: var(--rf-radius);
      cursor: pointer;
      transition: opacity 0.2s, transform 0.1s;
      margin-top: 8px;
    }

    .rf-button:hover {
      opacity: 0.9;
    }

    .rf-button:active {
      transform: scale(0.98);
    }

    .rf-button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }

    .rf-button-loading {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    .rf-spinner {
      width: 18px;
      height: 18px;
      border: 2px solid rgba(255,255,255,0.3);
      border-top-color: #ffffff;
      border-radius: 50%;
      animation: rf-spin 0.8s linear infinite;
    }

    @keyframes rf-spin {
      to { transform: rotate(360deg); }
    }

    .rf-message {
      padding: 16px;
      border-radius: var(--rf-radius);
      text-align: center;
      font-size: 14px;
      line-height: 1.5;
    }

    .rf-message.rf-success {
      background: rgba(34, 197, 94, 0.1);
      color: var(--rf-success);
      border: 1px solid rgba(34, 197, 94, 0.2);
    }

    .rf-message.rf-error-msg {
      background: rgba(239, 68, 68, 0.1);
      color: var(--rf-error);
      border: 1px solid rgba(239, 68, 68, 0.2);
    }

    .rf-success-icon {
      font-size: 48px;
      margin-bottom: 12px;
    }

    .rf-powered {
      text-align: center;
      margin-top: 16px;
      font-size: 11px;
      color: var(--rf-text-muted);
    }

    .rf-powered a {
      color: var(--rf-primary);
      text-decoration: none;
    }

    .rf-powered a:hover {
      text-decoration: underline;
    }

    .rf-hidden {
      display: none !important;
    }
  `;

  // ============================================================
  // Utility Functions
  // ============================================================

  function getUTMParams() {
    const params = new URLSearchParams(window.location.search);
    return {
      utmSource: params.get('utm_source'),
      utmMedium: params.get('utm_medium'),
      utmCampaign: params.get('utm_campaign'),
      utmTerm: params.get('utm_term'),
      utmContent: params.get('utm_content'),
    };
  }

  function interpolate(str, data) {
    if (!str) return str;
    return str.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return data[key] !== undefined ? data[key] : match;
    });
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validatePhone(phone) {
    if (!phone) return true;
    const cleaned = phone.replace(/[\s\-\(\)\.]/g, '');
    return /^\+?\d{10,15}$/.test(cleaned);
  }

  function injectStyles() {
    if (document.getElementById('rocket-form-styles')) return;
    const style = document.createElement('style');
    style.id = 'rocket-form-styles';
    style.textContent = STYLES;
    document.head.appendChild(style);
  }

  function parseDataAttributes(element) {
    const config = {};
    const attrs = element.attributes;

    for (let i = 0; i < attrs.length; i++) {
      const attr = attrs[i];
      if (attr.name.startsWith('data-')) {
        // Convert data-business-name to businessName
        const key = attr.name.slice(5).replace(/-([a-z])/g, (_, c) => c.toUpperCase());

        // Parse booleans and arrays
        let value = attr.value;
        if (value === 'true') value = true;
        else if (value === 'false') value = false;
        else if (value.startsWith('[') || value.startsWith('{')) {
          try { value = JSON.parse(value); } catch (e) {}
        }

        config[key] = value;
      }
    }

    return config;
  }

  // ============================================================
  // Form Builder
  // ============================================================

  function buildForm(config) {
    const c = { ...DEFAULTS, ...config };

    const container = document.createElement('div');
    container.className = `rf-container ${c.theme === 'dark' ? 'rf-dark' : ''} ${c.theme === 'rocket' ? 'rf-rocket' : ''}`;

    // Header
    const header = document.createElement('div');
    header.className = 'rf-header';
    header.innerHTML = `
      <h2 class="rf-heading">${c.heading}</h2>
      ${c.subheading ? `<p class="rf-subheading">${c.subheading}</p>` : ''}
    `;
    container.appendChild(header);

    // Form
    const form = document.createElement('form');
    form.className = 'rf-form';
    form.setAttribute('novalidate', '');

    // Name field
    if (c.showName) {
      form.innerHTML += `
        <div class="rf-field">
          <label class="rf-label" for="rf-name">
            Name${c.nameRequired ? '<span class="rf-required">*</span>' : ''}
          </label>
          <input
            type="text"
            id="rf-name"
            name="name"
            class="rf-input"
            placeholder="${c.namePlaceholder}"
            ${c.nameRequired ? 'required' : ''}
            autocomplete="name"
          />
        </div>
      `;
    }

    // Email field (always shown)
    form.innerHTML += `
      <div class="rf-field">
        <label class="rf-label" for="rf-email">
          Email<span class="rf-required">*</span>
        </label>
        <input
          type="email"
          id="rf-email"
          name="email"
          class="rf-input"
          placeholder="${c.emailPlaceholder}"
          required
          autocomplete="email"
        />
      </div>
    `;

    // Phone field
    if (c.showPhone) {
      form.innerHTML += `
        <div class="rf-field">
          <label class="rf-label" for="rf-phone">
            Phone${c.phoneRequired ? '<span class="rf-required">*</span>' : ''}
          </label>
          <input
            type="tel"
            id="rf-phone"
            name="phone"
            class="rf-input"
            placeholder="${c.phonePlaceholder}"
            ${c.phoneRequired ? 'required' : ''}
            autocomplete="tel"
          />
        </div>
      `;
    }

    // Message field
    if (c.showMessage) {
      form.innerHTML += `
        <div class="rf-field">
          <label class="rf-label" for="rf-message">
            Message${c.messageRequired ? '<span class="rf-required">*</span>' : ''}
          </label>
          <textarea
            id="rf-message"
            name="message"
            class="rf-input rf-textarea"
            placeholder="${c.messagePlaceholder}"
            ${c.messageRequired ? 'required' : ''}
          ></textarea>
        </div>
      `;
    }

    // Submit button
    form.innerHTML += `
      <button type="submit" class="rf-button">
        ${c.buttonText}
      </button>
    `;

    container.appendChild(form);

    // Success message (hidden initially)
    const successDiv = document.createElement('div');
    successDiv.className = 'rf-message rf-success rf-hidden';
    successDiv.id = 'rf-success';
    container.appendChild(successDiv);

    // Error message (hidden initially)
    const errorDiv = document.createElement('div');
    errorDiv.className = 'rf-message rf-error-msg rf-hidden';
    errorDiv.id = 'rf-error';
    container.appendChild(errorDiv);

    // Powered by
    if (!c.hideBranding) {
      const powered = document.createElement('div');
      powered.className = 'rf-powered';
      powered.innerHTML = `Powered by <a href="https://rocketclients.com" target="_blank" rel="noopener">Rocket+CRM</a>`;
      container.appendChild(powered);
    }

    return { container, form, successDiv, errorDiv, config: c };
  }

  // ============================================================
  // Form Handler
  // ============================================================

  function initForm(elements) {
    const { container, form, successDiv, errorDiv, config } = elements;
    const button = form.querySelector('.rf-button');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Get form values
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      // Clear previous errors
      form.querySelectorAll('.rf-error').forEach(el => el.classList.remove('rf-error'));
      form.querySelectorAll('.rf-error-text').forEach(el => el.remove());
      errorDiv.classList.add('rf-hidden');

      // Validate
      let hasErrors = false;

      // Email validation
      const emailInput = form.querySelector('#rf-email');
      if (!data.email || !validateEmail(data.email)) {
        emailInput.classList.add('rf-error');
        const errorText = document.createElement('span');
        errorText.className = 'rf-error-text';
        errorText.textContent = 'Please enter a valid email address';
        emailInput.parentNode.appendChild(errorText);
        hasErrors = true;
      }

      // Phone validation
      const phoneInput = form.querySelector('#rf-phone');
      if (phoneInput && config.phoneRequired && !data.phone) {
        phoneInput.classList.add('rf-error');
        const errorText = document.createElement('span');
        errorText.className = 'rf-error-text';
        errorText.textContent = 'Phone number is required';
        phoneInput.parentNode.appendChild(errorText);
        hasErrors = true;
      } else if (data.phone && !validatePhone(data.phone)) {
        phoneInput.classList.add('rf-error');
        const errorText = document.createElement('span');
        errorText.className = 'rf-error-text';
        errorText.textContent = 'Please enter a valid phone number';
        phoneInput.parentNode.appendChild(errorText);
        hasErrors = true;
      }

      // Name validation
      const nameInput = form.querySelector('#rf-name');
      if (nameInput && config.nameRequired && !data.name) {
        nameInput.classList.add('rf-error');
        const errorText = document.createElement('span');
        errorText.className = 'rf-error-text';
        errorText.textContent = 'Name is required';
        nameInput.parentNode.appendChild(errorText);
        hasErrors = true;
      }

      if (hasErrors) return;

      // Show loading state
      button.disabled = true;
      button.innerHTML = `
        <span class="rf-button-loading">
          <span class="rf-spinner"></span>
          ${config.buttonLoadingText}
        </span>
      `;

      // Get UTM params
      const utmParams = getUTMParams();

      // Build payload
      const payload = {
        ...data,
        formId: config.formId,
        source: config.businessName || 'Rocket Form',
        workflowId: config.workflowId,
        tags: config.tags,
        customFields: config.customFields,
        pageUrl: window.location.href,
        ...utmParams,
      };

      try {
        const response = await fetch(config.apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Rocket-Form-ID': config.formId,
          },
          body: JSON.stringify(payload),
        });

        const result = await response.json();

        if (result.success) {
          // Show success message
          form.classList.add('rf-hidden');

          // Interpolate success message with form data
          const successMsg = interpolate(config.successMessage, {
            first_name: data.name?.split(' ')[0] || '',
            name: data.name || '',
            email: data.email,
            business: config.businessName,
          });

          successDiv.innerHTML = `
            <div class="rf-success-icon">&#10003;</div>
            <p>${successMsg}</p>
          `;
          successDiv.classList.remove('rf-hidden');

          // Call success callback
          if (typeof config.onSuccess === 'function') {
            config.onSuccess(result, data);
          }

          // Redirect if configured
          if (config.redirectUrl) {
            setTimeout(() => {
              window.location.href = config.redirectUrl;
            }, config.redirectDelay);
          }
        } else {
          throw new Error(result.error || config.errorMessage);
        }
      } catch (error) {
        // Show error
        errorDiv.textContent = error.message || config.errorMessage;
        errorDiv.classList.remove('rf-hidden');

        // Reset button
        button.disabled = false;
        button.innerHTML = config.buttonText;

        // Call error callback
        if (typeof config.onError === 'function') {
          config.onError(error);
        }
      }
    });
  }

  // ============================================================
  // Public API
  // ============================================================

  const RocketForm = {
    init: function(config) {
      injectStyles();

      // Find container
      let containerEl;
      if (typeof config.container === 'string') {
        containerEl = document.querySelector(config.container);
      } else if (config.container instanceof Element) {
        containerEl = config.container;
      }

      if (!containerEl) {
        console.error('RocketForm: Container not found');
        return null;
      }

      // Parse data attributes and merge with config
      const dataConfig = parseDataAttributes(containerEl);
      const mergedConfig = { ...config, ...dataConfig };

      // Build and inject form
      const elements = buildForm(mergedConfig);
      containerEl.innerHTML = '';
      containerEl.appendChild(elements.container);

      // Initialize form handler
      initForm(elements);

      return elements;
    },

    // Allow updating config after init
    update: function(container, newConfig) {
      const el = typeof container === 'string' ? document.querySelector(container) : container;
      if (el) {
        this.init({ container: el, ...newConfig });
      }
    },
  };

  // ============================================================
  // Auto-initialization
  // ============================================================

  function autoInit() {
    // Find all elements with data-rocket-form attribute or id="rocket-form"
    const forms = document.querySelectorAll('[data-rocket-form], #rocket-form, .rocket-form');

    forms.forEach(el => {
      const config = parseDataAttributes(el);
      RocketForm.init({ container: el, ...config });
    });
  }

  // Auto-init on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInit);
  } else {
    autoInit();
  }

  // Expose globally
  window.RocketForm = RocketForm;

})();
