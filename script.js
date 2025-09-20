document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("header nav a").forEach(link => {
        link.addEventListener("click", e => {
            const href = link.getAttribute("href");
            if (href && href.startsWith("#")) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    const btnArriba = document.createElement("button");
    btnArriba.innerText = "↑";
    btnArriba.id = "btn-arriba";
    document.body.appendChild(btnArriba);
    btnArriba.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #1C9AEA;
        color: black;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 22px;
        cursor: pointer;
        display: none;
        box-shadow: 0 4px 12px rgba(0,0,0,0.4);
        transition: transform 0.2s ease, background 0.3s;
        z-index: 1000;
    `;
    btnArriba.addEventListener("mouseover", () => btnArriba.style.transform = "scale(1.2)");
    btnArriba.addEventListener("mouseout", () => btnArriba.style.transform = "scale(1)");
    window.addEventListener("scroll", () => {
        btnArriba.style.display = window.scrollY > 200 ? "block" : "none";
    });
    btnArriba.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    const menuToggle = document.getElementById("menuHamburguesa");
    const nav = document.querySelector("header nav ul");
    if (menuToggle && nav) {
        menuToggle.addEventListener("click", e => {
            e.stopPropagation();
            nav.classList.toggle("activo");
        });
        document.addEventListener("click", e => {
            if (window.innerWidth <= 768 && nav.classList.contains("activo")) {
                if (!menuToggle.contains(e.target) && !nav.contains(e.target)) {
                    nav.classList.remove("activo");
                }
            }
        });
        function checkWidth() {
            if (window.innerWidth <= 768) {
                menuToggle.style.display = "block";
                nav.classList.remove("activo");
            } else {
                menuToggle.style.display = "none";
                nav.classList.remove("activo");
            }
        }
        checkWidth();
        window.addEventListener("resize", checkWidth);
    }

    const heroTitle = document.querySelector("#eslogan h1");
    if (heroTitle) {
        const texto = heroTitle.innerText;
        heroTitle.innerText = "";
        let i = 0;
        function escribir() {
            if (i < texto.length) {
                heroTitle.innerHTML += texto[i] === " " ? "&nbsp;" : texto[i];
                i++;
                setTimeout(escribir, 80);
            }
        }
        escribir();
    }

    document.querySelectorAll(".card, .noticia-principal").forEach(item => {
        item.addEventListener("mousemove", e => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rotateY = ((x / rect.width) - 0.5) * 10;
            const rotateX = ((y / rect.height) - 0.5) * -10;
            item.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
            item.style.boxShadow = "0 10px 20px rgba(0,0,0,0.3)";
        });
        item.addEventListener("mouseleave", () => {
            item.style.transform = "rotateX(0) rotateY(0) scale(1)";
            item.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
        });
    });

    const botonesLeer = document.querySelectorAll(".leer-texto");
    botonesLeer.forEach(btn => {
        btn.addEventListener("click", () => {
            const texto = btn.previousElementSibling;
            if (texto && texto.classList.contains("texto-extra")) {
                if (texto.style.display === "block") {
                    texto.style.display = "none";
                    btn.innerText = "Leer más";
                } else {
                    texto.style.display = "block";
                    btn.innerText = "Leer menos";
                }
            }
        });
    });

    const footerYear = document.getElementById("year");
    if (footerYear) {
        footerYear.innerText = new Date().getFullYear();
    }
});