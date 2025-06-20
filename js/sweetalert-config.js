/**
 * SweetAlert Configuration Module
 */

const SweetAlertModule = (function () {
  'use strict';

  const CONFIG = {
    base: {
      background: 'var(--secondary-bg)',
      color: 'var(--text-primary)',
      customClass: {
        popup: 'custom-toast-popup',
        title: 'custom-toast-title'
      }
    },

    toast: {
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true
    }
  };

  const SweetAlertConfig = {
    successToast: {
      ...CONFIG.base,
      ...CONFIG.toast,
      icon: 'success',
      iconColor: 'var(--success)'
    },

    errorToast: {
      ...CONFIG.base,
      ...CONFIG.toast,
      icon: 'error',
      iconColor: 'var(--danger)',
      timer: 3000
    }
  };

  function showNotification(type, title, text) {
    if (!title) return;

    const config = {
      ...(type === 'error' ? SweetAlertConfig.errorToast : SweetAlertConfig.successToast),
      title,
      text
    };

    if (typeof Swal !== 'undefined') {
      Swal.fire(config);
    } else {
      console.error('SweetAlert2 is not loaded');
    }
  }

  window.SweetAlertConfig = SweetAlertConfig;
  window.showNotification = showNotification;

  return {
    config: SweetAlertConfig,
    showNotification
  };
})();