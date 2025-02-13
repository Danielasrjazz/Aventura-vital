let score = 0, level = 1;
let selectedCharacter = null;
let stats = { conocimiento: 0, empatia: 0, resiliencia: 0 };

let characters = {
    "Brío": { description: "Energía y valentía", skills: ["Fuerza", "Resistencia"] },
    "Imagi": { description: "Creatividad e innovación", skills: ["Arte", "Solución de problemas"] },
    "Lógi": { description: "Razonamiento y lógica", skills: ["Matemáticas", "Pensamiento crítico"] },
    "Risco": { description: "Audacia y toma de riesgos", skills: ["Aventura", "Decisión"] },
    "Metis": { description: "Sabiduría y estrategia", skills: ["Planeación", "Astucia"] }
};

let challenges = {
    1: { description: "Resolver un acertijo de lógica.", character: "Lógi", image: "images/acertijo.jpg.webp", options: [
            { text: "Usar intuición", effect: "Creatividad aumentada", knowledge: 5 },
            { text: "Usar análisis lógico", effect: "Pensamiento crítico mejorado", knowledge: 10 },
            { text: "Ignorarlo", effect: "Sin cambios", knowledge: 0 }
        ] },
    2: { description: "Tomar una decisión moral crucial.", character: "Metis", image: "images/decision_moral.jpg.webp", options: [
            { text: "Decir la verdad", effect: "Honestidad fortalecida", knowledge: 10, empatia: 5 },
            { text: "Ocultar la verdad", effect: "Moralidad ambigua", knowledge: 5 },
            { text: "Mentir", effect: "Consecuencias futuras", knowledge: -5, resiliencia: -5 }
        ] },
    3: { description: "Un amigo te pide consejo sobre una situación difícil.", character: "Imagi", image: "images/amigo_consejo.jpg.webp", options: [
            { text: "Guiarlo con la verdad", effect: "Refuerzas tu sabiduría", knowledge: 10, empatia: 5 },
            { text: "Darle una respuesta neutral", effect: "Nada cambia", knowledge: 0 }
        ] }
};

function selectCharacter(character) {
    selectedCharacter = character;
    document.getElementById("intro-container").style.display = "none";
    document.getElementById("game-container").style.display = "block";
    document.getElementById("character-name").innerText = `Has elegido: ${character}`;
    document.getElementById("character-description").innerText = characters[character].description;
    startGame();
}

function startGame() {
    let challenge = challenges[level];
    if (!challenge) {
        endGame();
        return;
    }

    console.log("Nivel actual:", level, "Personaje en reto:", challenge.character);
    
    document.getElementById("challenge-question").innerText = `Nivel ${level} - ${challenge.character}\n${challenge.description}`;
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
    document.getElementById("final-message").innerText = "¡Juego terminado! Gracias por participar.";
}

function restartGame() {
    level = 1;
    stats = { conocimiento: 0, empatia: 0, resiliencia: 0 };
    document.getElementById("final-container").style.display = "none";
    document.getElementById("intro-container").style.display = "block";
}

window.onload = function() {
    document.getElementById("game-container").style.display = "none";
    document.getElementById("intro-container").style.display = "block";
};
