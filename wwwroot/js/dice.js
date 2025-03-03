
let diceBox;  // Store a global reference

// Initialize DiceBox
async function initializeDiceBox() {
    try {
        const DiceBox = await waitForDiceBox();
        diceBox = DiceBox;

        if (diceBox != null && diceBox != undefined) {
            diceBox = new DiceBox("#dice-box", {
                assetPath: "/public/assets/DiceBox/",
                theme: "default",
                themeColor: "#feea03",
                offscreen: false,
                scale: 6
            });
            await diceBox.init();
        }
    } catch (error) {
        console.error(error);
    }
}

// Roll dice with a given dice notation (e.g., "4d6")
async function rollDice(diceNotation) {
    if (diceBox != null && diceBox != undefined) {
        await initializeDiceBox();
    }
    await diceBox.roll(diceNotation);
}

function waitForDiceBox() {
    return new Promise((resolve, reject) => {
        let attempts = 0;
        const check = () => {
            if (window.DiceBox) {
                console.error("returning dice box!");
                resolve(window.DiceBox);
            } else if (attempts < 10) {
                attempts++;
                setTimeout(check, 200); // Retry every 200ms
            } else {
                reject("DiceBox failed to load.");
            }
        };
        check();
    });
}

window.initializeDiceBox = initializeDiceBox;
window.rollDice = rollDice;
