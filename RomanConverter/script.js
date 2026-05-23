// Elements from HTML
const integerInput = document.getElementById("integerInput");
const romanInput = document.getElementById("romanInput");

const toRomanBtn = document.getElementById("toRomanBtn");
const toIntegerBtn = document.getElementById("toIntegerBtn");

const result = document.getElementById("result");
const errorMessage = document.getElementById("errorMessage");

// Roman numeral map
const romanMap = [
    { value: 1000, symbol: "M" },
    { value: 900, symbol: "CM" },
    { value: 500, symbol: "D" },
    { value: 400, symbol: "CD" },
    { value: 100, symbol: "C" },
    { value: 90, symbol: "XC" },
    { value: 50, symbol: "L" },
    { value: 40, symbol: "XL" },
    { value: 10, symbol: "X" },
    { value: 9, symbol: "IX" },
    { value: 5, symbol: "V" },
    { value: 4, symbol: "IV" },
    { value: 1, symbol: "I" }
];

// Sends custom events to Google Analytics
function trackEvent(eventName, parameters) {
    if (typeof gtag === "function") {
        gtag("event", eventName, parameters);
    }
}

// Convert Integer to Roman
function integerToRoman(number) {
    let roman = "";

    for (let i = 0; i < romanMap.length; i++) {
        while (number >= romanMap[i].value) {
            roman += romanMap[i].symbol;
            number -= romanMap[i].value;
        }
    }

    return roman;
}

// Convert Roman to Integer
function romanToInteger(roman) {
    let total = 0;

    const values = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000
    };

    for (let i = 0; i < roman.length; i++) {
        const current = values[roman[i]];
        const next = values[roman[i + 1]];

        if (next > current) {
            total += next - current;
            i++;
        } else {
            total += current;
        }
    }

    return total;
}

// Validate Roman numeral syntax
function validateRoman(roman) {
    const romanRegex = /^(M{0,3})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;
    return romanRegex.test(roman);
}

// Compatibility with previous function name
function isValidRoman(roman) {
    return validateRoman(roman);
}

// Clear previous messages
function clearMessages() {
    errorMessage.textContent = "";
}

// Integer to Roman button
toRomanBtn.addEventListener("click", () => {
    clearMessages();

    const number = parseInt(integerInput.value);

    if (isNaN(number) || number < 1 || number > 3999) {
        errorMessage.textContent = "Please enter a valid number between 1 and 3999.";
        result.textContent = "Waiting for conversion...";

        trackEvent("invalid_input", {
            input_type: "integer"
        });

        return;
    }

    const roman = integerToRoman(number);
    result.textContent = `${number} = ${roman}`;

    trackEvent("conversion_success", {
        conversion_type: "integer_to_roman"
    });
});

// Roman to Integer button
toIntegerBtn.addEventListener("click", () => {
    clearMessages();

    const roman = romanInput.value.toUpperCase().trim();

    if (!validateRoman(roman)) {
        errorMessage.textContent = "Invalid Roman numeral.";
        result.textContent = "Waiting for conversion...";

        trackEvent("invalid_input", {
            input_type: "roman"
        });

        return;
    }

    const number = romanToInteger(roman);
    result.textContent = `${roman} = ${number}`;

    trackEvent("conversion_success", {
        conversion_type: "roman_to_integer"
    });
});