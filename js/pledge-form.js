/* ============================================================
   pledge-form.js  –  The Her Economy | Buy Ticket / Pledge Form
   Handles:
     - "Other" checkbox reveals text inputs
     - Basic client-side validation feedback
   ============================================================ */

(function () {
  'use strict';

  /* ---------- "Other" text reveal helpers ---------- */

  /**
   * Wire up a checkbox so that when it is checked, a sibling
   * text input is shown; unchecking clears and hides it.
   */
  function wireOtherField(checkboxId, textInputId) {
    var cb   = document.getElementById(checkboxId);
    var inp  = document.getElementById(textInputId);
    if (!cb || !inp) return;

    cb.addEventListener('change', function () {
      if (cb.checked) {
        inp.classList.remove('hidden');
        inp.focus();
      } else {
        inp.classList.add('hidden');
        inp.value = '';
      }
    });
  }

  wireOtherField('status_other_cb',  'status_other_text');
  wireOtherField('hurdles_other_cb', 'hurdles_other_text');

  /* ---------- Basic form validation ---------- */
  var form = document.getElementById('pledgeForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var errors = [];

    /* Helper to mark a field as invalid */
    function validateRequired(fieldId, label) {
      var el = document.getElementById(fieldId);
      if (!el) return;
      if (!el.value.trim()) {
        errors.push(label + ' is required.');
        el.style.borderColor = '#e34a4f';
        el.addEventListener('input', function clearErr() {
          el.style.borderColor = '';
          el.removeEventListener('input', clearErr);
        });
      }
    }

    /* Clear previous error indicators */
    form.querySelectorAll('input, textarea, select').forEach(function (el) {
      el.style.borderColor = '';
    });

    /* Required text/email/tel fields */
    validateRequired('company_name',        'Company Name');
    validateRequired('country_origin',      'Country of Origin');
    validateRequired('first_name',          'Name');
    validateRequired('surname',             'Surname');
    validateRequired('designation',         'Designation');
    validateRequired('email',               'Email');
    validateRequired('mobile_phone',        'Mobile Phone');
    validateRequired('rand_value',          'Rand Value of Investment');
    validateRequired('location_investment', 'Location of Investment');
    validateRequired('employment',          'Employment');

    /* Final declaration checkbox */
    var finalDecl = form.querySelector('input[name="final_declaration"]');
    if (finalDecl && !finalDecl.checked) {
      errors.push('You must accept the Declaration.');
    }

    /* Honeypot check */
    var hp = document.getElementById('hp_field');
    if (hp && hp.value.trim() !== '') {
      /* silently discard – looks like a bot */
      return;
    }

    if (errors.length > 0) {
      /* Scroll to first error indicator */
      var firstInvalid = form.querySelector('[style*="border-color"]');
      if (firstInvalid) {
        firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    /* ---------- All valid – collect data ---------- */
    var formData = {
      company_name:        document.getElementById('company_name').value.trim(),
      country_origin:      document.getElementById('country_origin').value.trim(),
      first_name:          document.getElementById('first_name').value.trim(),
      surname:             document.getElementById('surname').value.trim(),
      designation:         document.getElementById('designation').value.trim(),
      email:               document.getElementById('email').value.trim(),
      mobile_phone:        document.getElementById('mobile_phone').value.trim(),
      rand_value:          document.getElementById('rand_value').value.trim(),
      location_investment: document.getElementById('location_investment').value.trim(),
      nature_investment:   getCheckedValues('nature_investment'),
      employment:          document.getElementById('employment').value.trim(),
      status:              getCheckedValues('status'),
      status_other:        document.getElementById('status_other_text').value.trim(),
      declaration_announcement: getCheckedValues('declaration_announcement'),
      hurdles:             getCheckedValues('hurdles'),
      hurdles_other:       document.getElementById('hurdles_other_text').value.trim(),
      final_declaration:   finalDecl ? finalDecl.checked : false,
      submission_date:     document.getElementById('submission_date').value
    };

    /*
     * TODO: Replace the console.log below with your actual form submission
     * e.g. fetch('/your-api-endpoint', { method: 'POST', body: JSON.stringify(formData) })
     */
    console.log('Form submission data:', formData);

    /* Temporary success feedback */
    showSuccessMessage();
  });

  /* ---------- Helper: get all checked values for a named checkbox group ---------- */
  function getCheckedValues(name) {
    var checked = form.querySelectorAll('input[name="' + name + '"]:checked');
    return Array.from(checked).map(function (cb) { return cb.value; });
  }

  /* ---------- Success message ---------- */
  function showSuccessMessage() {
    var existing = document.querySelector('.form-success-msg');
    if (existing) existing.remove();

    var msg = document.createElement('div');
    msg.className = 'form-success-msg';
    msg.setAttribute('role', 'alert');
    msg.innerHTML =
      '<strong>Thank you!</strong> Your submission has been received. We will be in touch shortly.';

    msg.style.cssText = [
      'margin-top: 24px',
      'padding: 18px 20px',
      'background: #d1fae5',
      'border: 1px solid #6ee7b7',
      'border-radius: 10px',
      'font-family: var(--font, Poppins, sans-serif)',
      'font-size: 15px',
      'color: #065f46',
      'text-align: center'
    ].join(';');

    form.appendChild(msg);
    msg.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

})();