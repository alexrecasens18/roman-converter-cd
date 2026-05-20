// DOM elements
const integerInput = document.getElementById("integerInput");
const romanInput = document.getElementById("romanInput");

const toRomanButton = document.getElementById("toRomanBtn");
const toIntegerButton = document.getElementById("toIntegerBtn");

const resultElement = document.getElementById("result");
const errorElement = document.getElementById("errorMessage");


// Constants
const MIN_NUMBER = 1;
const MAX_NUMBER = 3999;


// Roman numeral conversion map
const romanNumeralMap = [
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


// Displays the result message
function showResult(message) {
    resultElement.textContent = message;
}


// Displays an error message
function showError(message) {
    errorElement.textContent = message;
}


// Clears previous messages
function clearMessages() {
    showError("");
}


// Validates integer input
function validateInteger(number) {

    return !isNaN(number) &&
           number >= MIN_NUMBER &&
           number <= MAX_NUMBER;
}


// Validates Roman numeral syntax
function validateRoman(roman) {

    const romanRegex =
        /^(M{0,3})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;

    return romanRegex.test(roman);
}


// Converts integer to Roman numeral
function integerToRoman(number) {

    let romanResult = "";

    for (const item of romanNumeralMap) {

        while (number >= item.value) {
            romanResult += item.symbol;
            number -= item.value;
        }
    }

    return romanResult;
}


// Converts Roman numeral to integer
function romanToInteger(roman) {

    const romanValues = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000
    };

    let total = 0;

    for (let i = 0; i < roman.length; i++) {

        const currentValue = romanValues[roman[i]];
        const nextValue = romanValues[roman[i + 1]];

        if (nextValue > currentValue) {
            total += nextValue - currentValue;
            i++;
        } else {
            total += currentValue;
        }
    }

    return total;
}


// Integer to Roman conversion event
toRomanButton.addEventListener("click", () => {

    clearMessages();

    const number = parseInt(integerInput.value);

    if (!validateInteger(number)) {

        showError(
            `Please enter a valid number between ${MIN_NUMBER} and ${MAX_NUMBER}.`
        );

        showResult("Waiting for conversion...");
        return;
    }

    const romanResult = integerToRoman(number);

    showResult(`${number} = ${romanResult}`);
});


// Roman to Integer conversion event
toIntegerButton.addEventListener("click", () => {

    clearMessages();

    const roman = romanInput.value.toUpperCase().trim();

    if (!validateRoman(roman)) {

        showError("Invalid Roman numeral.");

        showResult("Waiting for conversion...");
        return;
    }

    const integerResult = romanToInteger(roman);

    showResult(`${roman} = ${integerResult}`);
});