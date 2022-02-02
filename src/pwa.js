export const installPWA = (func) => {
  window.addEventListener("beforeinstallprompt", (e) => {
    func(e);
    console.log("PWA: Installable");
  });

  window.addEventListener("appinstalled", (evt) => {
    func(false);
    console.log("INSTALL: Success");
  });
};

export default installPWA;
