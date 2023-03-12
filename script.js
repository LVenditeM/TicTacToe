// Variáveis globais
var jogadorAtual = "X";
var tabuleiro = ["", "", "", "", "", "", "", "", ""];
var imgX = "imgs/X.png"; // substitua pelo caminho da imagem do X
var imgO = "imgs/O.png";; // substitua pelo caminho da imagem do O
var jogadorXVitorias = 0;
var jogadorOVitorias = 0;
var NameX = "X";
var NameO = "O";
var X = "X";
var O = "O";
var Velha = 0;


function placar() {
    document.getElementById("jogadorXVitorias").textContent = jogadorXVitorias;
    document.getElementById("jogadorOVitorias").textContent = jogadorOVitorias;
    document.getElementById("Velha").textContent = Velha;


    const formulario = document.querySelector('#meu-formulario');

    formulario.addEventListener('submit', function (event) {
        // Impede o comportamento padrão de envio do formulário
        event.preventDefault();

        // Obtenha os dados do formulário
        const formData = new FormData(formulario);

        // Use a função fetch para enviar os dados do formulário para o servidor
        fetch('/url-do-seu-servidor', {
            method: 'POST',
            body: formData
        }).then(response => {
            // Manipule a resposta do servidor aqui
        }).catch(error => {
            // Manipule erros de envio aqui
        });
    });
}

function pegarValor() {
    NameX = document.getElementById("NameX").value;
    NameO = document.getElementById("NameO").value;

    document.getElementById("X").textContent = NameX;
    document.getElementById("O").textContent = NameO;

}

// Função que é chamada quando uma célula é clicada
function jogarCelula(event) {
    var celula = event.target;
    var idCelula = celula.id;
    document.getElementById("jogadorXVitorias").textContent = jogadorXVitorias;
    document.getElementById("jogadorOVitorias").textContent = jogadorOVitorias;
    document.getElementById("Velha").textContent = Velha;

    // Verifica se a célula já foi jogada
    if (tabuleiro[idCelula] !== "") {
        return;
    }

    // Registra o movimento do jogador atual
    tabuleiro[idCelula] = jogadorAtual;
    var img = document.createElement("img");
    img.src = jogadorAtual === "X" ? imgX : imgO;
    celula.appendChild(img);

    // Verifica se o jogo terminou
    var resultado = verificarFimDeJogo();
    if (resultado !== "") {
        exibirResultado(resultado);
        return;
    }

    // Alterna para o próximo jogador
    jogadorAtual = jogadorAtual === "X" ? "O" : "X";
}

function verificarFimDeJogo() {

    // Verifica se alguém ganhou
    var combinacoesGanhadoras = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (var i = 0; i < combinacoesGanhadoras.length; i++) {
        var combinacao = combinacoesGanhadoras[i];
        var a = tabuleiro[combinacao[0]];
        var b = tabuleiro[combinacao[1]];
        var c = tabuleiro[combinacao[2]];
        if (a !== "" && a === b && b === c) {
            return a;
        }
    }

    // Verifica se houve um empate
    if (tabuleiro.indexOf("") === -1) {
        return "Empate";
    }

    return "";
}

function exibirResultado(resultado) {
    // Exibe um alerta com o resultado do jogo

    if (resultado == "X") {
        jogadorXVitorias++;
        document.getElementById("jogadorXVitorias").textContent = jogadorXVitorias;
        Swal.fire(
            `Jogador ${NameX} ganhou essa rodada`,
            '',
            'success'
        )
    }
    if (resultado == "O") {
        jogadorOVitorias++;
        document.getElementById("jogadorOVitorias").textContent = jogadorOVitorias;
        Swal.fire(
            'Jogador ' + NameO + ' ganhou essa rodada',
            '',
            'success'
        )
    }
    // Atualiza o contador de vitórias
    if (resultado == "Empate") {
        Velha++;
        document.getElementById("Velha").textContent = Velha;
        Swal.fire(
            'Deu Velha',
            '',
            'info'
        )
    }


    // Reinicia o jogo
    jogadorAtual = "X";
    tabuleiro = ["", "", "", "", "", "", "", "", ""];
    var celulas = document.getElementsByTagName("td");
    for (var i = 0; i < celulas.length; i++) {
        celulas[i].textContent = "";
    }
}

// Registra o evento de clique em todas as células da tabela
var celulas = document.getElementsByTagName("td");
for (var i = 0; i < celulas.length; i++) {
    celulas[i].addEventListener("click", jogarCelula);
}