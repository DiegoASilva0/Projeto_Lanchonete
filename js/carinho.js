var carrinho_msg = document.getElementById("carrinho_msg");

const pedidoAdicionado = document.getElementById("adicionadoPedido");

let carrinhoAdicionado = [];

// ==============================
// PRODUTOS
// ==============================

const produtoCadastrado = [
    // HAMBÚRGUERES
    { id: 1, nomeProduto: "X-tudo", quantidade: 0, preco: 29.9 },
    { id: 2, nomeProduto: "X-Salada", quantidade: 0, preco: 19.9 },
    { id: 3, nomeProduto: "X-Bacon", quantidade: 0, preco: 24.9 },
    { id: 4, nomeProduto: "X-Calabresa", quantidade: 0, preco: 25.9 },
    { id: 5, nomeProduto: "X-Egg", quantidade: 0, preco: 22.9 },
    { id: 6, nomeProduto: "X-Burguer", quantidade: 0, preco: 18.9 },
    { id: 7, nomeProduto: "X-Kids", quantidade: 0, preco: 14.9 },
    { id: 8, nomeProduto: "X-Smash Duplo", quantidade: 0, preco: 27.9 },

    // PIZZAS
    { id: 9, nomeProduto: "Pizza Calabresa", quantidade: 0, preco: 39.9 },
    { id: 10, nomeProduto: "Pizza Frango com Catupiry", quantidade: 0, preco: 49.9 },
    { id: 11, nomeProduto: "Pizza Portuguesa", quantidade: 0, preco: 24.9 },
    { id: 12, nomeProduto: "Pizza Quatro Queijos", quantidade: 0, preco: 47.9 },
    { id: 13, nomeProduto: "Pizza Bacon Especial", quantidade: 0, preco: 45.9 },
    { id: 14, nomeProduto: "Pizza Chocolate com Morango", quantidade: 0, preco: 49.9 },

    // PORÇÕES
    { id: 15, nomeProduto: "Batata Frita", quantidade: 0, preco: 19.9 },
    { id: 16, nomeProduto: "Batata com Cheddar e Bacon", quantidade: 0, preco: 29.9 },
    { id: 17, nomeProduto: "Calabresa Acebolada", quantidade: 0, preco: 26.9 },

    // BEBIDAS
    { id: 18, nomeProduto: "Coca-Cola 2L", quantidade: 0, preco: 13.9 },
    { id: 19, nomeProduto: "Guarana 2L", quantidade: 0, preco: 19.9 },
    { id: 20, nomeProduto: "Coca-Cola Latinha 350Ml", quantidade: 0, preco: 4.9 },
    { id: 21, nomeProduto: "Guarana Latinha 350Ml", quantidade: 0, preco: 4.0 },
];

// ==============================
// LOCAL STORAGE
// ==============================

function salvarCarrinho() {
    localStorage.setItem(
        "carrinho",
        JSON.stringify(carrinhoAdicionado)
    );
}

function carregarCarrinho() {
    const carrinhoSalvo = localStorage.getItem("carrinho");

    if (carrinhoSalvo) {
        try {
            carrinhoAdicionado = JSON.parse(carrinhoSalvo);
        } catch (erro) {
            console.error("Erro ao carregar o carrinho:", erro);

            carrinhoAdicionado = [];
            localStorage.removeItem("carrinho");
        }
    }

    atualizarCarrinhoNaTela();
}

// ==============================
// ATUALIZAR TELA DO CARRINHO
// ==============================

function atualizarCarrinhoNaTela() {
    if (carrinho_msg) {
        carrinho_msg.innerHTML = atualizarMgCarrinho();
    }
}

// ==============================
// MONTAR CARRINHO
// ==============================

function atualizarMgCarrinho() {
    let atualizarC = "";

    for (let i = 0; i < carrinhoAdicionado.length; i++) {
        let item = carrinhoAdicionado[i];

        atualizarC += `
            <div class="item-carrinho">

                <div class="item-info">

                    <span class="item-nome">
                        ${item.nomeProduto}
                    </span>

                    <span class="item-preco">
                        R$ ${(item.preco * item.quantidade).toFixed(2)}
                    </span>

                </div>

                <div class="item-quantidade">

                    <button
                        class="quantidadeMaior_Menor"
                        onclick="diminuirQuantidade(${item.id})"
                    >
                        -
                    </button>

                    <span class="item-quantidade-info">
                        ${item.quantidade}
                    </span>

                    <button
                        class="quantidadeMaior_Menor"
                        onclick="aumentarQuantidade(${item.id})"
                    >
                        +
                    </button>

                    <button
                        class="btn-danger"
                        type="button"
                        onclick="removerDoCarrinho(${item.id})"
                    >
                        🗑
                    </button>

                </div>

            </div>
        `;
    }

    subtotal();

    return atualizarC;
}

// ==============================
// ADICIONAR PRODUTO
// ==============================

function adicionarAoCarrinho(produto) {
    if (!produto) {
        console.error("Produto não encontrado.");
        return;
    }

    let itemNoCarrinho = carrinhoAdicionado.find(
        (item) => item.id === produto.id
    );

    if (itemNoCarrinho) {
        itemNoCarrinho.quantidade += 1;
    } else {
        let novoProduto = {
            ...produto,
            quantidade: 1,
        };

        carrinhoAdicionado.push(novoProduto);
    }

    salvarCarrinho();

    atualizarCarrinhoNaTela();

    console.log(carrinhoAdicionado);

    if (pedidoAdicionado) {
        pedidoAdicionado.style.display = "block";

        setTimeout(() => {
            pedidoAdicionado.style.display = "none";
        }, 2500);
    }
}

// ==============================
// AUMENTAR QUANTIDADE
// ==============================

function aumentarQuantidade(id) {
    let itemEncontrado = carrinhoAdicionado.find(
        (item) => item.id === id
    );

    if (itemEncontrado) {
        itemEncontrado.quantidade += 1;
    }

    salvarCarrinho();

    atualizarCarrinhoNaTela();
}

// ==============================
// DIMINUIR QUANTIDADE
// ==============================

function diminuirQuantidade(id) {
    let itemDiminuir = carrinhoAdicionado.find(
        (item) => item.id === id
    );

    if (!itemDiminuir) {
        return;
    }

    itemDiminuir.quantidade -= 1;

    if (itemDiminuir.quantidade <= 0) {
        removerDoCarrinho(id);
        return;
    }

    salvarCarrinho();

    atualizarCarrinhoNaTela();
}

// ==============================
// REMOVER PRODUTO
// ==============================

function removerDoCarrinho(id) {
    carrinhoAdicionado = carrinhoAdicionado.filter(
        (item) => item.id !== id
    );

    salvarCarrinho();

    atualizarCarrinhoNaTela();
}

// ==============================
// SUBTOTAL
// ==============================

function subtotal() {
    const sub = document.getElementById("subtotal");

    if (!sub) {
        return;
    }

    let totalGeral = 0;

    for (let i = 0; i < carrinhoAdicionado.length; i++) {
        let item = carrinhoAdicionado[i];

        totalGeral += item.preco * item.quantidade;
    }

    sub.innerHTML = `R$ ${totalGeral.toFixed(2)}`;
}

// ==============================
// FINALIZAR PEDIDO
// ==============================

function finalizarPedido() {
    if (carrinhoAdicionado.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let pedidosMSG = "";
    let totalPedido = 0;

    pedidosMSG += `*NOVO PEDIDO*\n`;
    pedidosMSG += `━━━━━━━━━━━━━━\n\n`;

    for (let i = 0; i < carrinhoAdicionado.length; i++) {
        let item = carrinhoAdicionado[i];

        let subtotalItem = item.preco * item.quantidade;

        totalPedido += subtotalItem;

        pedidosMSG += `*${item.nomeProduto}*\n`;
        pedidosMSG += `Quantidade: ${item.quantidade}\n`;
        pedidosMSG += `Preço: R$ ${item.preco.toFixed(2)}\n`;
        pedidosMSG += `Subtotal: R$ ${subtotalItem.toFixed(2)}\n\n`;
    }

    pedidosMSG += `━━━━━━━━━━━━━━\n`;
    pedidosMSG += `*TOTAL: R$ ${totalPedido.toFixed(2)}*\n\n`;
    pedidosMSG += `Obrigado!`;

    const numero = "5561999999999";

    const mensagem = encodeURIComponent(pedidosMSG);

    const linkWhatsApp =
        `https://wa.me/${numero}?text=${mensagem}`;

    window.open(linkWhatsApp, "_blank");
}

// ==============================
// CARREGAR CARRINHO AO ABRIR PÁGINA
// ==============================

document.addEventListener("DOMContentLoaded", () => {
    carregarCarrinho();
});