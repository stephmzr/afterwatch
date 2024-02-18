export const Authenticity = {
  headers() {
    return {
      "X-CSRF-Param": document.head.querySelector("[name=csrf-param]").content,
      "X-CSRF-Token": document.querySelector("meta[name='csrf-token']").content,
    };
  },
};
