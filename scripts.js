const button = document.querySelector('.button-task');
const input = document.querySelector('.input-task');
const listaCompleta = document.querySelector('.list-task');

let minhaListaDeItens = [];

// Carrega as tarefas do localStorage quando a página é carregada
window.addEventListener('load', recarregarTarefas);

function adicionarUmaNovaTarefa() {
    const novaTarefa = input.value.trim();
    if (novaTarefa !== "") {
        minhaListaDeItens.push({
            tarefa: novaTarefa,
            concluida: false
        });

        input.value = '';

        mostrarTarefas();
        atualizarLocalStorage();
    } else {
        alert("Por favor, adicione uma descrição para a tarefa!");
    }
}

function mostrarTarefas() {
    let novaLi = '';

    minhaListaDeItens.forEach((item, posicao) => {
        novaLi += `
        <li class="task ${item.concluida ? "done" : ""}">
            <img src="imagens/checked.png" alt="check" onclick="concluirTarefa(${posicao})">
            <p>${item.tarefa}</p>
            <img src="imagens/trash.png" alt="trash" onclick="deletarItem(${posicao})">
        </li>
        `;
    });

    listaCompleta.innerHTML = novaLi;
}

function concluirTarefa(posicao) {
    minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida;
    mostrarTarefas();
    atualizarLocalStorage();
}

function deletarItem(posicao) {
    minhaListaDeItens.splice(posicao, 1);
    mostrarTarefas();
    atualizarLocalStorage();
}

function atualizarLocalStorage() {
    localStorage.setItem('minhaListaDeItens', JSON.stringify(minhaListaDeItens));
    console.log("Tarefas atualizadas no localStorage:", minhaListaDeItens);
}

function recarregarTarefas() {
    const tarefasDoLocalStorage = localStorage.getItem('minhaListaDeItens');

    if (tarefasDoLocalStorage) {
        minhaListaDeItens = JSON.parse(tarefasDoLocalStorage);
        console.log("Tarefas carregadas do localStorage:", minhaListaDeItens);
        mostrarTarefas();
    } else {
        console.log("Nenhuma tarefa encontrada no localStorage.");
    }
}

button.addEventListener('click', adicionarUmaNovaTarefa);
