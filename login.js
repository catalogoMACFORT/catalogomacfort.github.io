document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("loginForm").addEventListener("submit", e => {
    e.preventDefault();
    const usuario = document.getElementById("username").value.trim();
    const tipo = document.getElementById("tipoUsuario").value;
    localStorage.setItem("usuario", usuario);
    localStorage.setItem("tipoUsuario", tipo);
    window.location.href = "index.html";
  });
});
