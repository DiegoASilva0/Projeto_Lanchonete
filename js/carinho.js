var carrinho_msg = document.getElementById("carrinho_msg");
const pedidoAdicionado = document.getElementById("adicionadoPedido")

let carrinhoAdicionado = [];

const hamburguer = [
  { id: 1, hamburguer: "X-tudo", quantidade: 0, preco: 29.9 },
  { id: 2, hamburguer: "X-Salada", quantidade: 0, preco: 19.9 },
  { id: 3, hamburguer: "X-Bacon", quantidade: 0, preco: 24.9 },
  { id: 4, hamburguer: "X-Calabresa", quantidade: 0, preco: 25.9 },
  { id: 5, hamburguer: "X-Egg", quantidade: 0, preco: 22.9 },
  { id: 6, hamburguer: "X-Burguer", quantidade: 0, preco: 18.9 },
  { id: 7, hamburguer: "X-Kids", quantidade: 0, preco: 14.9 },
  { id: 8, hamburguer: "X-Smash Duplo", quantidade: 0, preco: 27.9 },
];

function atualizarMgCarrinho() {
  let atualizarC = "";

  for (let i = 0; i < carrinhoAdicionado.length; i++) {
    let item = carrinhoAdicionado[i];

    atualizarC += `
    <div class="item-carrinho">
       <div class="item-info">
            <span class="item-nome">
                ${item.hamburguer}
            </span>

            <span class="item-preco">
                R$ ${(item.preco * item.quantidade).toFixed(2)}
            </span>
        </div>
        
        <div class="item-quantidade">
            <button class="quantidadeMaior_Menor" onclick="diminuirQuantidade(${item.id})">-</button>
            <span class="item-quantidade-info">${item.quantidade}</span>
            <button class="quantidadeMaior_Menor" onclick="aumentarQuantidade(${item.id})">+</button>
            <button class="btn-danger" type='button' onclick="removerDoCarrinho(${item.id})"> 🗑 </button>

        </div>
    </div>
    `;
  }

  subtotal();

  return atualizarC;
}

function adicionarAoCarrinho(produto) {
  let itemNoCarrinho = carrinhoAdicionado.find(
    (item) => item.id === produto.id,
  );

  if (itemNoCarrinho) {
    itemNoCarrinho.quantidade += 1;
  } else {
    produto.quantidade = 1;
    carrinhoAdicionado.push(produto);
  }

  carrinho_msg.innerHTML = atualizarMgCarrinho();
  console.log(produto);

  pedidoAdicionado.style.display = "block";

  setTimeout(() => {
    pedidoAdicionado.style.display = "none";
  }, 2500);
}

function aumentarQuantidade(id) {
  let itemEncontrado = carrinhoAdicionado.find((item) => item.id === id);
  if (itemEncontrado) {
    itemEncontrado.quantidade += 1;
  }

  carrinho_msg.innerHTML = atualizarMgCarrinho();
}

function diminuirQuantidade(id) {
  let itemDiminuir = carrinhoAdicionado.find((item) => item.id === id);
  if (itemDiminuir) {
    itemDiminuir.quantidade -= 1;

    if (itemDiminuir.quantidade <= 0) {
      removerDoCarrinho(id);
      return;
    }
  }
  carrinho_msg.innerHTML = atualizarMgCarrinho();
}

function removerDoCarrinho(id) {
  var carricionadoFiltrado = carrinhoAdicionado.filter(
    (item) => item.id !== id,
  );
  carrinhoAdicionado = carricionadoFiltrado;
  carrinho_msg.innerHTML = atualizarMgCarrinho();
}

function subtotal() {
  var sub = document.getElementById("subtotal");
  let totalGeral = 0;

  for (let i = 0; i < carrinhoAdicionado.length; i++) {
    let item = carrinhoAdicionado[i];
    totalGeral += item.preco * item.quantidade;
  }

  sub.innerHTML = `R$ ${totalGeral.toFixed(2)}`;
}

function finalizarPedido() {
  var pedidosMSG = "";
  var totalPedido = 0;

  pedidosMSG += `*NOVO PEDIDO*\n`;
  pedidosMSG += `━━━━━━━━━━━━━━\n\n`;

  for (let i = 0; i < carrinhoAdicionado.length; i++) {
    var item = carrinhoAdicionado[i];

    var subtotal = item.preco * item.quantidade;
    totalPedido += subtotal;

    pedidosMSG += `   *${item.hamburguer}*\n`;
    pedidosMSG += `   Quantidade: ${item.quantidade}\n`;
    pedidosMSG += `   Preço: R$ ${item.preco.toFixed(2)}\n`;
    pedidosMSG += `   Subtotal: R$ ${subtotal.toFixed(2)}\n\n`;
  }

  pedidosMSG += `━━━━━━━━━━━━━━\n`;
  pedidosMSG += `*TOTAL: R$ ${totalPedido.toFixed(2)}*\n\n`;
  pedidosMSG += `Obrigado!`;

  var numero = "5561999999999";

  var mensagem = encodeURIComponent(pedidosMSG);

  var linkWhatsApp = `https://wa.me/${numero}?text=${mensagem}`;

  window.open(linkWhatsApp, "_blank");
}
