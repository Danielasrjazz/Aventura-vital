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
    document.getElementById("challenge-question").innerText = `Nivel ${level} - ${challenge.description}`;
    document.getElementById("challenge-image").src = challenge.image;
    document.getElementById("challenge-options").innerHTML = "";
    
    challenge.options.forEach((option, index) => {
        let btn = document.createElement("button");
        btn.innerText = option.text;
        btn.classList.add("btn");
        btn.onclick = function() {
            alert(`Resultado: ${option.effect}.`);
            stats.conocimiento += option.knowledge || 0;
            level++;
            if (level > Object.keys(challenges).length) endGame();
            else showSummary();
        };
        document.getElementById("challenge-options").appendChild(btn);
    });

    document.getElementById("challenge-container").style.display = "block";
}

function endGame() {
    document.getElementById("achievements-container").style.display = "block";
    let list = document.getElementById("achievements-list");
    list.innerHTML = "";
    for (let key in achievements) {
        if (achievements[key].condition()) {
            let li = document.createElement("li");
            li.innerText = achievements[key].description;
            list.appendChild(li);
        }
    }
}

function restartGame() {
    score = 0; level = 1;
    stats = { conocimiento: 0, empatia: 0, resiliencia: 0 };
    document.getElementById("final-container").style.display = "none";
    startGame();
}

startGame();