let itemNome = document.querySelector("#item-nome");
let itemQuantidade = document.querySelector("#item-quantidade");
let categoriaItem = document.querySelector("#item-categoria");
let listaItens = document.querySelector("#lista-itens");
let formLista = document.querySelector("#form-lista");
let limparLista = document.querySelector("#btn-limpar-lista");
let valorTotal = document.querySelector("#valor-total"); // Referência ao elemento de total

// Função para calcular o total
function atualizarTotal() {
    let lista = JSON.parse(localStorage.getItem("listaDeCompras")) || [];
    let total = 0;

    lista.forEach(item => {
        total += parseFloat(item.preco) * parseInt(item.quantidade);
    });

    valorTotal.textContent = total.toFixed(2).replace('.', ','); // 2 casas decimais
}

// Ao carregar a página
window.addEventListener("DOMContentLoaded", () => {
    let listaSalva = JSON.parse(localStorage.getItem("listaDeCompras")) || [];

    // Exibe os itens na lista
    listaSalva.forEach(item => {
        let novoItem = document.createElement("li");

        // Criar o nome do item clicável
        let nomeItem = document.createElement("span");
        nomeItem.textContent = item.nome + " - " + item.quantidade + "x (" + item.categoria + ")";
        novoItem.appendChild(nomeItem);

        // Criar o campo de preço editável
        let inputPreco = document.createElement("input");
        inputPreco.type = "number";
        inputPreco.classList.add("preco-editavel");
        inputPreco.step = "0.01"; // Centavos
        inputPreco.value = item.preco;

        // Adicionar o campo de preço ao item
        novoItem.appendChild(inputPreco);

        // Atualiza o total se o preço mudar
        inputPreco.addEventListener("input", () => {
            // Atualiza o valor no localStorage
            item.preco = inputPreco.value;
            localStorage.setItem("listaDeCompras", JSON.stringify(listaSalva));

            // Recalcular o total
            atualizarTotal();
        });

        // Adiciona a funcionalidade de riscar o nome ao clicar
        nomeItem.addEventListener("click", () => {
            nomeItem.classList.toggle("comprado");
        });

        listaItens.appendChild(novoItem);
    });

    // Atualizar o total após carregar a lista
    atualizarTotal();
});

// Ao adicionar um novo item
formLista.addEventListener("submit", (e) => {
    e.preventDefault();

    // Criar o novo item da lista
    let novoItem = document.createElement("li");

    // Criar o nome do item
    let nomeItem = document.createElement("span");
    nomeItem.textContent = itemNome.value + " - " + itemQuantidade.value + "x (" + categoriaItem.value + ")";
    novoItem.appendChild(nomeItem);

    // Preço
    let inputPreco = document.createElement("input");
    inputPreco.type = "number";
    inputPreco.classList.add("preco-editavel");
    inputPreco.step = "0.01"; // Centavos
    inputPreco.value = ""; // Inicializa com 0.00

    // Campo de preço ao item
    novoItem.appendChild(inputPreco);

    // Adicionar o item à lista
    listaItens.appendChild(novoItem);

    // Salvar no LocalStorage
    let lista = JSON.parse(localStorage.getItem("listaDeCompras")) || [];

    let novoObjeto = {
        nome: itemNome.value,
        quantidade: itemQuantidade.value,
        categoria: categoriaItem.value,
        preco: ""
    };
    
    lista.push(novoObjeto);
    localStorage.setItem("listaDeCompras", JSON.stringify(lista));
    
    // Adiciona o listener para atualizar o localStorage ao digitar o preço
    inputPreco.addEventListener("input", () => {
        novoObjeto.preco = inputPreco.value;
        localStorage.setItem("listaDeCompras", JSON.stringify(lista));
        atualizarTotal();
    });
    

    // Limpar os campos
    itemNome.value = "";
    itemQuantidade.value = "";

    // Atualizar o total após adicionar o item
    atualizarTotal();
});

// Limpar lista e LocalStorage
limparLista.addEventListener("click", () => {
    listaItens.innerHTML = "";
    localStorage.removeItem("listaDeCompras");

    // Atualizar o total após limpar
    atualizarTotal();
});
