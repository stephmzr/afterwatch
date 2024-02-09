// @ts-nocheck
import ReactOnRails from 'react-on-rails'

export const Authenticity = {
  headers() {
    return {
      "X-CSRF-Param": document.head.querySelector("[name=csrf-param]").content,
      "X-CSRF-Token": ReactOnRails.authenticityToken(),
    };
  },
};
