
document.addEventListener("DOMContentLoaded", () => {
    const selector = document.createElement("select");
    selector.innerHTML = `
        <option value="es">Español</option>
        <option value="en">English</option>
    `;
    document.body.insertBefore(selector, document.body.firstChild);
});
