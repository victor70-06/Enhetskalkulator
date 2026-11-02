// Faktorer i forhold til m² og m³.
// 1 cm = 0.01 m, så 1 cm² = 0.01 · 0.01 m² og 1 cm³ = 0.01 · 0.01 · 0.01 m³
const units = {
    area: {
        "mm²": 0.000001,
        "cm²": 0.0001,
        "dm²": 0.01,
        "m²": 1,
        "km²": 1000000
    },

    cubic: {
        "mm³": 0.000000001,
        "cm³": 0.000001,
        "dm³": 0.001,
        "m³": 1,
        "km³": 1000000000
    }
};

const selectedUnits = {
    area: {
        left: "cm²",
        right: "m²"
    },

    cubic: {
        left: "cm³",
        right: "m³"
    }
};


function setUnit(category, side, unit) {

    selectedUnits[category][side] = unit;

    const id = category + (side === "left" ? "LeftUnit" : "RightUnit");

    document.getElementById(id).textContent = unit;

    convert(category, side);
}


// Runder til 12 gjeldende siffer, så også veldig små tall
// (f.eks. 1 mm³ = 0.000000000000000001 km³) blir vist riktig
function formatNumber(number) {
    return Number(number.toPrecision(12));
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


document.getElementById("areaLeft").addEventListener("input", function () {
    convert("area", "left");
});

document.getElementById("areaRight").addEventListener("input", function () {
    convert("area", "right");
});


document.getElementById("cubicLeft").addEventListener("input", function () {
    convert("cubic", "left");
});

document.getElementById("cubicRight").addEventListener("input", function () {
    convert("cubic", "right");
});
