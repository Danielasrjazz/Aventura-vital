let score = 0, level = 1;
let stats = { conocimiento: 0, empatia: 0, resiliencia: 0 };

let challenges = {
    1: { 
        description: "Resolver un acertijo de lógica",
        image: "images/acertijo.jpg.webp",
        options: [
            { text: "Intuición", effect: "Creatividad aumentada", knowledge: 5 },
            { text: "Análisis lógico", effect: "Pensamiento crítico mejorado", knowledge: 10 },
            { text: "Ignorarlo", effect: "Sin cambios", knowledge: 0 }
        ]
    },
    2: { 
        description: "Tomar una decisión moral crucial",
        image: "images/decision_moral.jpg.webp",
        options: [
            { text: "Decir la verdad", effect: "Honestidad fortalecida", knowledge: 10, empatia: 5 },
            { text: "Ocultar la verdad", effect: "Moralidad ambigua", knowledge: 5 },
            { text: "Mentir", effect: "Consecuencias futuras", knowledge: -5, resiliencia: -5 }
        ]
    }
};

function startGame() {
    let challenge = challenges[level];
    if (!challenge) {
        endGame();
        return;
    }

    console.log("Nivel actual:", level); // Debugging

    document.getElementById("challenge-question").innerText = `Nivel ${level}: ${challenge.description}`;
    document.getElementById("challenge-image").src = challenge.image;
    document.getElementById("challenge-container").style.display = "block";

    let optionsContainer = document.getElementById("challenge-options");
    optionsContainer.innerHTML = "";

    challenge.options.forEach((option) => {
        let btn = document.createElement("button");
        btn.innerText = option.text;
        btn.classList.add("btn");
        
        btn.onclick = function() {
            document.getElementById("result-message").innerText = `Has elegido: ${option.text}. ${option.effect}`;
            document.getElementById("result-message").style.display = "block";
            
            stats.conocimiento += option.knowledge || 0;
            stats.empatia += option.empatia || 0;
            stats.resiliencia += option.resiliencia || 0;

            btn.classList.add("selected");
            
            setTimeout(() => {
                level++;
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
}

function endGame() {
    document.getElementById("challenge-container").style.display = "none";
    document.getElementById("final-container").style.display = "block";
    document.getElementById("final-message").innerText = "¡Juego terminado!";
}

function restartGame() {
    level = 1;
    stats = { conocimiento: 0, empatia: 0, resiliencia: 0 };
    document.getElementById("final-container").style.display = "none";
    startGame();
}

window.onload = startGame;
