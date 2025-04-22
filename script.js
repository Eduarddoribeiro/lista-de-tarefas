let itemNome = document.querySelector("#item-nome");
let itemQuantidade = document.querySelector("#item-quantidade");
let categoriaItem = document.querySelector("#item-categoria");
let listaItens = document.querySelector("#lista-itens");
let formLista = document.querySelector("#form-lista");
let limparLista = document.querySelector("#btn-limpar-lista")

//Ao carregar a página
window.addEventListener("DomContentLoaded", () => {
    let listaSalva = JSON.parse(localStorage.getItem("listaDeCompras")) || [];

    listaSalva.forEach(item => {
        let novoItem = document.createElement("li");
        novoItem.textContent = item.nome + " - " + item.quantidade + "x (" + item.categoria + ")";
        listaItens.appendChild(novoItem);
    });
});

formLista.addEventListener("submit", (e) => {
    e.preventDefault();
    let novoItem = document.createElement("li");
    novoItem.textContent = itemNome.value + " - " + itemQuantidade.value + "x (" + categoriaItem.value +")";
    listaItens.appendChild(novoItem);

    //Salvar no LocalStorage
    let lista = JSON.parse(localStorage.getItem("listaDeCompras")) || [];
    lista.push ({
        nome: itemNome.value,
        quantidade: itemQuantidade.value,
        categoria: categoriaItem.value
    });

    localStorage.setItem("listaDeCompras", JSON.stringify(lista));

    //Limpar os campos
    itemNome.value = "";
    itemQuantidade.value = "";
});

//Limpar lista e localStorage
limparLista.addEventListener("click", () => {
    listaItens.innerHTML = "";
    localStorage.removeItem("listaDeCompras");
});