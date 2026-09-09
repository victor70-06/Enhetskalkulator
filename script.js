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

    length: {
        mm: 0.001,
        cm: 0.01,
        m: 1,
        km: 1000
    }
};

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

    const id = category + (side === "left" ? "LeftUnit" : "RightUnit");

    document.getElementById(id).textContent = unit;

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

        rightInput.value = Number(result.toFixed(10));
    }


    if (side === "right") {

        if (rightInput.value === "") {
            leftInput.value = "";
            return;
        }

        const value = Number(rightInput.value);

        const baseValue = value * units[category][rightUnit];

        const result = baseValue / units[category][leftUnit];

        leftInput.value = Number(result.toFixed(10));
    }
}


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
