var carrinho_msg = document.getElementById("carrinho_msg");

let carrinhoAdicionado = [];

const hamburguer = [
  { id: 1, hamburguer: "X-tudo", preco: 29.9 },
  { id: 2, hamburguer: "X-Salada", preco: 19.9 },
  { id: 3, hamburguer: "X-Bacon", preco: 24.9 },
  { id: 4, hamburguer: "X-Calabresa", preco: 25.9 },
  { id: 5, hamburguer: "X-Egg", preco: 22.9 },
  { id: 6, hamburguer: "X-Burguer", preco: 18.9 },
  { id: 7, hamburguer: "X-Kids", preco: 14.9 },
  { id: 8, hamburguer: "X-Smash Duplo", preco: 27.9 },
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
                R$ ${item.preco.toFixed(2)}
            </span>
        </div>
        
        <div class="item-quantidade">
            <button class="quantidadeMaior_Menor" onclick="diminuirQuantidade()">-</button>
            <span class="item-quantidade-info">1 x</span>
            <button class="quantidadeMaior_Menor" onclick="aumentarQuantidade()">+</button>
        </div>
    </div>
    `;
  }

  return atualizarC;
}

function adicionarAoCarrinho(produto) {
  carrinhoAdicionado.push(produto);
  carrinho_msg.innerHTML = atualizarMgCarrinho();
  console.log(produto);
}
