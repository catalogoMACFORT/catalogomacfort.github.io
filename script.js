
document.addEventListener("DOMContentLoaded", () => {
    fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vS4jvq-eB9Fn1bZQjdtiboCyn-0sGswn24iWNdJsWqw0MCz0AOhNoId6BKw8ZLFSg/pub?output=csv")
        .then(response => response.text())
        .then(data => {
            const rows = data.split("\n").slice(1);
            const catalogo = document.getElementById("catalogo");
            rows.forEach(row => {
                const cols = row.split(",");
                const itemHTML = `
                    <div class="producto">
                        <h2>${cols[0]}</h2>
                        <p><strong>Descripción:</strong> ${cols[1]}</p>
                        <p><strong>Unidad:</strong> ${cols[2]}</p>
                        <p><strong>Precio Bs:</strong> ${cols[3]}</p>
                    </div>
                `;
                catalogo.innerHTML += itemHTML;
            });
        });
});
