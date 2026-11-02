const units = {
    weight: {
        mg: 0.001,
        g: 1,
        kg: 1000
    },

    volume: {
        ml: 0.001,
        cl: 0.01,
        dl: 0.1,
        l: 1
    },

    // Fylles ut av updateLengthUnits() ut fra valgt modus
    length: {}
};


// ---------- LENGDE-MODUS (1, 2 eller 3) ----------

// Grunnfaktorer for lengde, i meter
const lengthBase = {
    mm: 0.001,
    cm: 0.01,
    dm: 0.1,
    m: 1,
    km: 1000
};

// 1 = lengde, 2 = areal (i andre), 3 = kubikk (i tredje)
let lengthPower = 1;

const powerSymbol = { 1: "", 2: "²", 3: "³" };
const lengthTitles = { 1: " Lengde", 2: " Areal (i andre)", 3: " Kubikk (i tredje)" };

// Viser f.eks. "cm²" i stedet for "cm"
function lengthLabel(unit) {
    return unit + powerSymbol[lengthPower];
}

// Regner ut faktorene: 1 cm² = 0.01² m², 1 cm³ = 0.01³ m³ osv.
function updateLengthUnits() {
    units.length = {};
    for (const unit in lengthBase) {
        units.length[unit] = Math.pow(lengthBase[unit], lengthPower);
    }
}

// Lager enhetsknappene på nytt med riktig ² eller ³
function renderLengthButtons() {
    ["left", "right"].forEach(function (side) {
        const container = document.getElementById(
            "length" + (side === "left" ? "Left" : "Right") + "Buttons"
        );
        container.innerHTML = "";

        for (const unit in lengthBase) {
            const button = document.createElement("button");
            button.textContent = lengthLabel(unit);
            if (selectedUnits.length[side] === unit) {
                button.classList.add("active");
            }
            button.addEventListener("click", function () {
                setUnit("length", side, unit);
            });
            container.appendChild(button);
        }

        const id = "length" + (side === "left" ? "LeftUnit" : "RightUnit");
        document.getElementById(id).textContent = lengthLabel(selectedUnits.length[side]);
    });
}

function setLengthMode(power) {
    lengthPower = power;

    [1, 2, 3].forEach(function (p) {
        document.getElementById("mode" + p).classList.toggle("active", p === power);
    });
    document.getElementById("lengthTitle").textContent = lengthTitles[power];

    updateLengthUnits();
    renderLengthButtons();
    convert("length", "left");
}

const selectedUnits = {
    weight: {
        left: "mg",
        right: "g"
    },

    volume: {
        left: "ml",
        right: "l"
    },

    length: {
        left: "mm",
        right: "cm"
    }
};


function setUnit(category, side, unit) {

    selectedUnits[category][side] = unit;

    if (category === "length") {
        renderLengthButtons();
    } else {
        const id = category + (side === "left" ? "LeftUnit" : "RightUnit");
        document.getElementById(id).textContent = unit;
    }

    convert(category, side);
}


function convert(category, side) {

    const leftInput = document.getElementById(category + "Left");
    const rightInput = document.getElementById(category + "Right");

    const leftUnit = selectedUnits[category].left;
    const rightUnit = selectedUnits[category].right;


    if (side === "left") {

        if (leftInput.value === "") {
            rightInput.value = "";
            return;
        }

        const value = Number(leftInput.value);

        const baseValue = value * units[category][leftUnit];

        const result = baseValue / units[category][rightUnit];

        rightInput.value = formatNumber(result);
    }


    if (side === "right") {

        if (rightInput.value === "") {
            leftInput.value = "";
            return;
        }

        const value = Number(rightInput.value);

        const baseValue = value * units[category][rightUnit];

        const result = baseValue / units[category][leftUnit];

        leftInput.value = formatNumber(result);
    }
}


// toFixed(10) ville gjort f.eks. 1 mm³ i km³ (0.000000000000000001) om til 0,
// så vi runder til 12 gjeldende siffer i stedet.
function formatNumber(number) {
    return Number(number.toPrecision(12));
}


// Start i vanlig lengde-modus
updateLengthUnits();
renderLengthButtons();


document.getElementById("weightLeft").addEventListener("input", function () {
    convert("weight", "left");
});

document.getElementById("weightRight").addEventListener("input", function () {
    convert("weight", "right");
});


document.getElementById("volumeLeft").addEventListener("input", function () {
    convert("volume", "left");
});

document.getElementById("volumeRight").addEventListener("input", function () {
    convert("volume", "right");
});


document.getElementById("lengthLeft").addEventListener("input", function () {
    convert("length", "left");
});

document.getElementById("lengthRight").addEventListener("input", function () {
    convert("length", "right");
});
