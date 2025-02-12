let score = 0, level = 1;
let stats = { conocimiento: 0, empatia: 0, resiliencia: 0 };
let playerChoices = {};

let challenges = {
    1: { description: "Resolver un acertijo de lógica", image: "images/acertijo.jpg", options: [
            { text: "Intuición", effect: "Creatividad", knowledge: 5 },
            { text: "Análisis lógico", effect: "Pensamiento crítico", knowledge: 10 },
            { text: "Ignorarlo", effect: "Sin cambios", knowledge: 0 }
        ]
    }
};

let achievements = {
    "sabio": { description: "📚 Conocimiento alto", condition: () => stats.conocimiento > 40, unlocked: false },
    "amigo_fiel": { description: "❤️ Decisiones empáticas", condition: () => stats.empatia > 40, unlocked: false }
};

    function startGame() {
    let challenge = challenges[level];

    // Verificar que haya un reto en este nivel
    if (!challenge) {
        endGame();
        return;
    }

    // Mostrar la pregunta y la imagen del reto
    document.getElementById("challenge-question").innerText = `Nivel ${level}: ${challenge.description}`;
    document.getElementById("challenge-image").src = challenge.image;
    document.getElementById("challenge-image").style.display = "block";

    let optionsContainer = document.getElementById("challenge-options");
    optionsContainer.innerHTML = ""; // Limpiar opciones previas

    challenge.options.forEach((option, index) => {
        let btn = document.createElement("button");
        btn.innerText = option.text;
        btn.classList.add("btn");

        // Mostrar el resultado tras elegir
        btn.onclick = function() {
            document.getElementById("result-message").innerText = `Has elegido: ${option.text}. ${option.effect}`;
            document.getElementById("result-message").style.display = "block";

            // Sumar puntos
            stats.conocimiento += option.knowledge || 0;
            stats.empatia += option.empatia || 0;
            stats.resiliencia += option.resiliencia || 0;

            // Efecto visual de selección
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
            }, 2000); // Espera 2 segundos antes de avanzar
        };

        optionsContainer.appendChild(btn);
    });

    document.getElementById("challenge-container").style.display = "block";
}
