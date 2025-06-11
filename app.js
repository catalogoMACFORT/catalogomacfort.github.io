
document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("product-list");
    fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vS4jvq-eB9Fn1bZQjdtiboCyn-0sGswn24iWNdJsWqw0MCz0AOhNoId6BKw8ZLFSg/pub?output=csv")
        .then(res => res.text())
        .then(csv => {
            const lines = csv.split("\n");
            let html = "<ul>";
            for (let i = 1; i < lines.length; i++) {
                const cols = lines[i].split(",");
                html += `<li><strong>${cols[0]}</strong>: ${cols[1]} (${cols[2]})</li>`;
            }
            html += "</ul>";
            container.innerHTML = html;
        })
        .catch(err => {
            container.innerHTML = "Error al cargar productos.";
            console.error(err);
        });
});
