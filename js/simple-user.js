document.addEventListener('DOMContentLoaded', function () {
  var icon = document.getElementById('user-icon');
  if (!icon) return;

  try {
    var loggedIn = localStorage.getItem('mv_user_logged_in') === 'true';
    if (loggedIn) {
      icon.src = 'media/user.jpg';
      icon.alt = 'Logged-in User';
    } else {
      icon.src = 'media/guest.jpg';
      icon.alt = 'Guest User';
    }
  } catch (e) {}

  // clickable to login.html (your existing logic)
  icon.style.cursor = 'pointer';

  icon.onclick = function () {
    var p = window.location.pathname || '';
    if (p.toLowerCase().indexOf('login.html') !== -1) return;
    window.location.href = 'login.html';
  };

  icon.onkeydown = function (e) {
    var k = e.key || e.keyCode;
    if (k === 'Enter' || k === ' ' || k === 'Spacebar' || k === 13) {
      e.preventDefault && e.preventDefault();
      window.location.href = 'login.html';
    }
  };
});