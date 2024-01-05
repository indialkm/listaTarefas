// Garrafa enchendo
const inputTarefas = document.querySelector('.input');
const btnTarefa = document.querySelector('.btnTarefa');
const tarefas = document.querySelector('.tarefas');
const caixinha = document.querySelector('.caixinha');
const paragrafoTxt = document.querySelector('input .paragrafoTxt');

btnTarefa.addEventListener('click', function () {
    if (!inputTarefas.value) return;
    criarTarefa(inputTarefas.value);
    salvarTarefas();
});


/*************************Lista Tarefas ***********************/

function criarLi() { // criar função para criar um li
    const li = document.createElement("li"); // criar um elemento li
    return li; //retornar o elemento
}

function adicionarTexto(li, texto) {
    const p = document.createElement("p");
    p.setAttribute('class', 'paragrafoTxt');
    li.appendChild(p)
    p.innerHTML = texto;
}

function criarTarefa(textoInput) {
    const li = criarLi();
    criarChecklist(li);
    adicionarTexto(li, textoInput);
    tarefas.appendChild(li);
    criarBotaoApagar(li);
    limparInput();

}

function limparInput() {
    inputTarefas.value = "";
    inputTarefas.focus();
}

function criarBotaoApagar(li) {
    const botaoApagar = document.createElement('button');
    const icone = document.createElement('i');
    icone.innerHTML = "delete";
    icone.setAttribute('class', 'material-symbols-outlined');
    botaoApagar.setAttribute('class', 'Apagar');
    botaoApagar.setAttribute('title', 'Apagar esta tarefa');
    li.appendChild(botaoApagar);
    botaoApagar.appendChild(icone);

    botaoApagar.addEventListener('click', function () {
        li.remove();
        salvarTarefas();
    });
}

function criarChecklist(li) {
    const check = document.createElement('input');
    check.type = 'checkbox';
    check.setAttribute('class', 'caixinha');
    li.appendChild(check);
    console.log("esta funcionando");
}


document.addEventListener('click', function (evento) {
    const el = evento.target;
    if (el.classList.contains('Apagar')) {
        el.parentElement.remove();
        salvarTarefas()
    }
});

function salvarTarefas() {
    const liTarefas = tarefas.querySelectorAll('li');
    const listaDeTarefas = [];
    for (let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
        tarefaTexto = tarefaTexto.replace('delete', '').trim();
        listaDeTarefas.push(tarefaTexto);
    }
    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON);
}

function adicionaTarefasSalvas() {
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);
    for (let tarefa of listaDeTarefas) {
        criarTarefa(tarefa);
    }
}


adicionaTarefasSalvas();



inputTarefas.addEventListener('keypress', function (e) {
    if (e.keyCode == 13) {
        criarTarefa(inputTarefas.value);
        salvarTarefas();
    }
});


/*************************************************Pomodoro*******************************************************************/


const segundos = document.querySelector(".segundos");
const iniciar = document.querySelector(".iniciar");
const zerar = document.querySelector(".zerar");
const pausar = document.querySelector(".pausar");
const pomodoro = document.querySelector(".relogioPomodoro");
const zerarPomodoros = document.querySelector(".zerarPomodoros");
let tics = 0;
let relogio;
let tempos = [] ;


function iniciarTimer() {
    relogio = setInterval(function () {
        tics++;
        segundos.innerHTML = iniciarRelogio(tics);
    }, 1000)
}

function iniciarRelogio(tics) {
    const data = new Date(tics * 1000);
    return data.toLocaleTimeString('pt-BR', {
        hour12: false,
        timeZone: 'UTC'
    })
}

let temposPausados = [];

document.addEventListener('click', function (e) {
    const el = e.target;
    if (el.classList.contains('zerar')) {
        clearInterval(relogio);
        const tempoAtual = segundos.innerHTML;
        temposPausados.push(tempoAtual);
        listaPomodoro(temposPausados);
        tics = 0;
        segundos.innerHTML = '00:00:00';
        console.log(tempos)

        
    } else if (el.classList.contains('pausar')) {
        segundos.classList.add('pausar');
        clearInterval(relogio);

    } else if (el.classList.contains('iniciar')) {
        segundos.classList.remove('pausar');
        clearInterval(relogio);
        iniciarTimer();
    }
})

function criarLiPomodoro() {
    const liPomodoro = document.createElement("li")
    pomodoro.appendChild(liPomodoro);
    return liPomodoro;
}

function listaPomodoro(tempo) {
    pomodoro.innerHTML = '';
    tempos = tempo;
    for (let tempo of tempos) {
        const liPomodoro = criarLiPomodoro();
        liPomodoro.innerHTML = tempo;
        pomodoro.appendChild(liPomodoro);
    }
}

function zerarListaPomodoro() {
    listaPomodoro([]);
    temposPausados = [];
    console.log(tempos)
}

zerarPomodoros.addEventListener('click', zerarListaPomodoro);

/************************************************* Aguinha *******************************************************************/
const garrafinha = document.querySelector(".imagemGarrafa");
const contador = document.querySelector("#contadorAgua");
const btnControle = document.querySelector(".btnControle");
const btnControleLimpar = document.querySelector(".btnControleLimpar");
let totalAguaIngerida = 0;

if(localStorage.getItem('totalAguaIngerida')) {
    totalAguaIngerida = parseInt(localStorage.getItem('totalAguaIngerida'));
};


function calculoAguinha(quantidade) {
    const larguraTela = window.innerWidth;
    if (quantidade < 200) {
        alert("Pode colocar mais água nesse copo o minímo é 200ml")
    } else if (larguraTela <= 1024) {
        const maximo = 2000;
        totalAguaIngerida += quantidade;
        let beberAgua = 63 * (totalAguaIngerida / maximo)
        beberAgua = Math.min(beberAgua, 63);
       
        return beberAgua;
    } else if (larguraTela > 1024) {
        const maximo = 2000;
        totalAguaIngerida += quantidade;
        let beberAgua = 70 * (totalAguaIngerida / maximo)
        beberAgua = Math.min(beberAgua, 70);
        
        return beberAgua;

    }
}

function subirAgua(beberAgua) {
    document.documentElement.style.setProperty('--altura-agua', beberAgua.toFixed(2) + "%");
}

btnControle.addEventListener('click', function () {
    let contadorP = parseInt(contador.value)
    let quantidadeP = calculoAguinha(contadorP);
    subirAgua(quantidadeP);
})

btnControleLimpar.addEventListener('click', function () {
    document.documentElement.style.setProperty('--altura-agua', 0 + "%")
    totalAguaIngerida = 0
})

function relogioHoras(tictacs) {
    const data = new Date();
    return data.toLocaleTimeString('pt-BR', {
        hour12: false,
        timeZone: 'UTC'
    })
}



