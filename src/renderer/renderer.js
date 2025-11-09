async function refresh() {
  const cur = await window.woa.auth.current();
  document.getElementById("auth-status").textContent =
    cur ? "Вы вошли как " + cur.username : "Не авторизованы";
}
refresh();

document.getElementById("login-form").onsubmit = async (e) => {
  e.preventDefault();
  try {
    await window.woa.auth.login(
      document.getElementById("login-user").value,
      document.getElementById("login-pass").value
    );
    refresh();
  } catch (err) {
    alert(err.message);
  }
};

document.getElementById("reg-form").onsubmit = async (e) => {
  e.preventDefault();
  try {
    await window.woa.auth.register(
      document.getElementById("reg-user").value,
      document.getElementById("reg-pass").value
    );
    refresh();
  } catch (err) {
    alert(err.message);
  }
};
