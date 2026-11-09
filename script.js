const cartas = document.querySelectorAll(".carta");
const botaoReiniciar = document.getElementById("reiniciar");

let primeiraCarta = null;
let segundaCarta = null;
let bloqueado = false;

let jogadas = 0;
let paresEncontrados = 0;

let tempo = 0;
let intervalo = null;
let jogoIniciado = false;

function embaralharCartas() {

    const tabuleiro = document.getElementById("tabuleiro");

    const cartasArray = Array.from(cartas);

    for (let i = cartasArray.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [cartasArray[i], cartasArray[j]] =
        [cartasArray[j], cartasArray[i]];
    }

    cartasArray.forEach(carta => {
        tabuleiro.appendChild(carta);
    });
}

function iniciarCronometro() {

    if (jogoIniciado) {
        return;
    }

    jogoIniciado = true;

    intervalo = setInterval(() => {

        tempo++;

        const minutos = Math.floor(tempo / 60);
        const segundos = tempo % 60;

        const minutosFormatados =
            String(minutos).padStart(2, "0");

        const segundosFormatados =
            String(segundos).padStart(2, "0");

        document.getElementById("tempo").textContent =
            `${minutosFormatados}:${segundosFormatados}`;

    }, 1000);
}

function virarCarta(carta) {

    if (bloqueado) return;

    if (carta.classList.contains("virada")) return;

    if (carta.classList.contains("encontrada")) return;

    iniciarCronometro();

    carta.classList.add("virada");

    if (!primeiraCarta) {

        primeiraCarta = carta;

        return;
    }

    segundaCarta = carta;

    jogadas++;

    document.getElementById("jogadas").textContent = jogadas;

    compararCartas();
}

function compararCartas() {

    bloqueado = true;

    const nomePrimeira =
        primeiraCarta.dataset.nome;

    const nomeSegunda =
        segundaCarta.dataset.nome;

    if (nomePrimeira === nomeSegunda) {

        setTimeout(() => {

            primeiraCarta.classList.add("encontrada");
            segundaCarta.classList.add("encontrada");

            paresEncontrados++;

            document.getElementById("pares").textContent =
                `${paresEncontrados} / 6`;

            limparCartas();

            if (paresEncontrados === 6) {
                finalizarJogo();
            }

        }, 400);

    } else {

        setTimeout(() => {

            primeiraCarta.classList.remove("virada");
            segundaCarta.classList.remove("virada");

            limparCartas();

        }, 1000);
    }
}

function limparCartas() {

    primeiraCarta = null;
    segundaCarta = null;
    bloqueado = false;
}

function finalizarJogo() {

    clearInterval(intervalo);

    document.getElementById("resultadoJogadas").textContent =
        jogadas;

    document.getElementById("resultadoTempo").textContent =
        document.getElementById("tempo").textContent;

    document.getElementById("mensagemFinal").style.display =
        "block";
}

function reiniciarJogo() {

    clearInterval(intervalo);

    primeiraCarta = null;
    segundaCarta = null;

    bloqueado = false;

    jogadas = 0;
    paresEncontrados = 0;
    tempo = 0;
    jogoIniciado = false;

    document.getElementById("jogadas").textContent = "0";
    document.getElementById("tempo").textContent = "00:00";
    document.getElementById("pares").textContent = "0 / 6";

    document.getElementById("mensagemFinal").style.display =
        "none";

    cartas.forEach(carta => {

        carta.classList.remove("virada");
        carta.classList.remove("encontrada");

    });

    embaralharCartas();
}

cartas.forEach(carta => {

    carta.addEventListener("click", () => {
        virarCarta(carta);
    });

});

botaoReiniciar.addEventListener("click", reiniciarJogo);

embaralharCartas();