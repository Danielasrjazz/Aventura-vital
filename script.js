let score = 0, level = 1;
let stats = { conocimiento: 0, empatia: 0, resiliencia: 0 };
let playerChoices = {};

let challenges = {
    1: { 
        description: "Resolver un acertijo de lógica",
        image: "images/acertijo.jpg.webp",
        options: [
            { text: "Intuición", effect: "Creatividad aumentada", knowledge: 5, empatia: 0, resiliencia: 0 },
            { text: "Análisis lógico", effect: "Pensamiento crítico mejorado", knowledge: 10, empatia: 0, resiliencia: 0 },
            { text: "Ignorarlo", effect: "Sin cambios", knowledge: 0, empatia: 0, resiliencia: 0 }
        ]
    },
    2: { 
        description: "Tomar una decisión moral crucial",
        image: "images/decision_moral.jpg.webp",
        options: [
            { text: "Decir la verdad", effect: "Honestidad fortalecida", knowledge: 10, empatia: 5, resiliencia: 0 },
            { text: "Ocultar la verdad", effect: "Moralidad ambigua", knowledge: 5, empatia: 0, resiliencia: 0 },
            { text: "Mentir", effect: "Consecuencias futuras", knowledge: -5, empatia: 0, resiliencia: -5 }
        ]
    },
    3: { 
        description: "Un amigo te pide consejo sobre una situación difícil.",
        image: "images/amigo_consejo.jpg.webp",
        options: [
            { text: "Guiarlo con la verdad", effect: "Refuerzas tu sabiduría", knowledge: 10, empatia: 5, resiliencia: 0 },
            { text: "Darle una respuesta neutral", effect: "Nada cambia", knowledge: 0, empatia: 0, resiliencia: 0 }
        ]
    }
};

let achievements = {
    "sabio": { description: "📚 Conocimiento alto", condition: () => stats.conocimiento > 40, unlocked: false },
    "amigo_fiel": { description: "❤️ Decisiones empáticas", condition: () => stats.empatia > 40, unlocked: false }
};

function startGame() {
    let challenge = challenges[level];

    if (!challenge) {
        endGame();
        return;
    }

    document.getElementById("challenge-question").innerText = `Nivel ${level}: ${challenge.description}`;
    document.getElementById("challenge-image").src = challenge.image;
    document.getElementById("challenge-image").style.display = "block";

    let optionsContainer = document.getElementById("challenge-options");
    optionsContainer.innerHTML = ""; // Corrección aquí

    challenge.options.forEach((option, index) => {
        let btn = document.createElement("button");
        btn.innerText = option.text;
        btn.classList.add("btn");

        btn.onclick = function() {
            document.getElementById("result-message").innerText = `Has elegido: ${option.text}. ${option.effect}`;
            document.getElementById("result-message").style.display = "block";

            // Aplicar cambios a los atributos
            stats.conocimiento += option.knowledge || 0;
            stats.empatia += option.empatia || 0;
            stats.resiliencia += option.resiliencia || 0;

            btn.classList.add("selected");

            setTimeout(() => {
                level++;
                updateProgress();
                if (level > Object.keys(challenges).length) {
                    endGame();
                } else {
                    document.getElementById("result-message").style.display = "none";
                    startGame();
                }
            }, 2000);
        };

        optionsContainer.appendChild(btn);
    });

    document.getElementById("challenge-container").style.display = "block";
}

window.onload = function() {
    startGame();
};

console.log("Script cargado correctamente");
