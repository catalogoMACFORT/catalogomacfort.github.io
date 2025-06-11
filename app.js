
document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("product-list");
  const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS4jvq-eB9Fn1bZQjdtiboCyn-0sGswn24iWNdJsWqw0MCz0AOhNoId6BKw8ZLFSg/pub?output=csv";

  fetch(url)
    .then(response => response.text())
    .then(data => {
      const lines = data.split("\n");
      let html = "<ul>";
      for (let i = 1; i < lines.length; i++) {
        const cols = lines[i].split(",");
        if (cols.length > 1) {
          html += `<li><strong>${cols[0]}</strong> - ${cols[1]}</li>`;
        }
      }
      html += "</ul>";
      container.innerHTML = html;
    })
    .catch(error => {
      container.innerHTML = "Error al cargar productos.";
      console.error(error);
    });
});
