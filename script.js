let itemNome = document.querySelector("#item-nome");
let itemQuantidade = document.querySelector("#item-quantidade");
let categoriaItem = document.querySelector("#item-categoria");
let listaItens = document.querySelector("#lista-itens");
let formLista = document.querySelector("#form-lista");
let limparLista = document.querySelector("#btn-limpar-lista");
let valorTotal = document.querySelector("#valor-total");

function atualizarTotal() {
    let lista = JSON.parse(localStorage.getItem("listaDeCompras")) || [];
    let total = 0;

    lista.forEach(item => {
        let preco = parseFloat(item.preco);
        let quantidade = parseInt(item.quantidade);

        if (!isNaN(preco) && !isNaN(quantidade)) {
            total += preco * quantidade;
        }
    });

    valorTotal.textContent = total.toFixed(2).replace('.', ',');
}

function criarItemNaTela(item, listaSalva) {
    let novoItem = document.createElement("li");

    let nomeItem = document.createElement("span");
    nomeItem.textContent = item.nome + " - " + item.quantidade + "x (" + item.categoria + ")";
    novoItem.appendChild(nomeItem);

    nomeItem.addEventListener("click", () => {
        nomeItem.classList.toggle("comprado");
    });

    let inputPreco = document.createElement("input");
    inputPreco.type = "number";
    inputPreco.classList.add("preco-editavel");
    inputPreco.step = "0.01";
    inputPreco.value = item.preco;

    inputPreco.addEventListener("input", () => {
        item.preco = inputPreco.value;
        localStorage.setItem("listaDeCompras", JSON.stringify(listaSalva));
        atualizarTotal();
    });

    novoItem.appendChild(inputPreco);

    let btnRemover = document.createElement("button");
    btnRemover.textContent = "🗑️";
    btnRemover.style.marginLeft = "10px";
    btnRemover.style.border = "none";
    btnRemover.style.borderRadius = "8px";

    btnRemover.addEventListener("click", () => {
        novoItem.remove();
        let novaLista = listaSalva.filter(i => !(i.nome === item.nome && i.quantidade === item.quantidade && i.categoria === item.categoria));
        localStorage.setItem("listaDeCompras", JSON.stringify(novaLista));
        atualizarTotal();
    });

    novoItem.appendChild(btnRemover);
    listaItens.appendChild(novoItem);
}

window.addEventListener("DOMContentLoaded", () => {
    let listaSalva = JSON.parse(localStorage.getItem("listaDeCompras")) || [];
    listaSalva.forEach(item => criarItemNaTela(item, listaSalva));
    atualizarTotal();
});

formLista.addEventListener("submit", (e) => {
    e.preventDefault();

    let lista = JSON.parse(localStorage.getItem("listaDeCompras")) || [];

    let novoObjeto = {
        nome: itemNome.value,
        quantidade: itemQuantidade.value,
        categoria: categoriaItem.value,
        preco: ""
    };

    lista.push(novoObjeto);
    localStorage.setItem("listaDeCompras", JSON.stringify(lista));
    criarItemNaTela(novoObjeto, lista);

    itemNome.value = "";
    itemQuantidade.value = "";

    atualizarTotal();
});

limparLista.addEventListener("click", () => {
    listaItens.innerHTML = "";
    localStorage.removeItem("listaDeCompras");
    atualizarTotal();
});
