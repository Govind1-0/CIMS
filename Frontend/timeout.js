(function () {
  const TIMEOUT_ADMIN = 30 * 60 * 1000;  // 30 minutes for admin
  const TIMEOUT_HOTEL = 15 * 60 * 1000;  // 15 minutes for hotel staff

  const role    = localStorage.getItem("cims_role");
  const timeout = role === "admin" ? TIMEOUT_ADMIN : TIMEOUT_HOTEL;

  let timer;

  function resetTimer() {
    clearTimeout(timer);
    timer = setTimeout(logoutDueToInactivity, timeout);
  }

  function logoutDueToInactivity() {
    localStorage.removeItem("cims_token");
    localStorage.removeItem("cims_user");
    localStorage.removeItem("cims_role");
    alert("You have been logged out due to inactivity.");
    window.location.href = "login.html";
  }

  // Reset timer on any user activity
  ["mousedown", "mousemove", "keydown", "scroll", "touchstart", "click"].forEach(event => {
    document.addEventListener(event, resetTimer, true);
  });

  // Start timer on page load
  resetTimer();

  // Also logout if tab is hidden for too long
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      timer = setTimeout(logoutDueToInactivity, timeout);
    } else {
      resetTimer();
    }
  });
})();