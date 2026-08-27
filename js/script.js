function clickmenu() {
    const menu = document.getElementById("menu-mobile");

    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}

function fecharMenu() {
    const menu = document.getElementById("menu-mobile");

    if (menu) {
        menu.style.display = "none";
    }
}

function abrirCarrinho() {
    const carrinho = document.getElementById("compras");
    const overlay = document.getElementById("overlay");

    console.log("Abrindo carrinho...");

    carrinho.classList.add("aberto");
    overlay.classList.add("aberto");
}

function fecharCarrinho() {
    const carrinho = document.getElementById("compras");
    const overlay = document.getElementById("overlay");

    carrinho.classList.remove("aberto");
    overlay.classList.remove("aberto");
}