// Container for test results
const testResults = document.getElementById("testResults");


// Displays PASS message
function showPass(testId, description) {

    const message = document.createElement("p");

    message.className = "pass";

    message.textContent =
        `PASS - ${testId}: ${description}`;

    testResults.appendChild(message);
}


// Displays FAIL message
function showFail(testId, description, expected, actual) {

    const message = document.createElement("p");

    message.className = "fail";

    message.textContent =
        `FAIL - ${testId}: ${description}
        | Expected: ${expected}
        | Actual: ${actual}`;

    testResults.appendChild(message);
}


// Generic assertion function
function assertEquals(testId, description, expected, actual) {

    if (expected === actual) {
        showPass(testId, description);
    } else {
        showFail(testId, description, expected, actual);
    }
}


// =========================
// INTEGER TO ROMAN TESTS
// =========================

assertEquals(
    "TC-01",
    "Convert 1 to Roman numeral",
    "I",
    integerToRoman(1)
);

assertEquals(
    "TC-02",
    "Convert 4 to Roman numeral",
    "IV",
    integerToRoman(4)
);

assertEquals(
    "TC-03",
    "Convert 1994 to Roman numeral",
    "MCMXCIV",
    integerToRoman(1994)
);

assertEquals(
    "TC-04",
    "Convert 3999 to Roman numeral",
    "MMMCMXCIX",
    integerToRoman(3999)
);


// =========================
// ROMAN TO INTEGER TESTS
// =========================

assertEquals(
    "TC-05",
    "Convert I to integer",
    1,
    romanToInteger("I")
);

assertEquals(
    "TC-06",
    "Convert IV to integer",
    4,
    romanToInteger("IV")
);

assertEquals(
    "TC-07",
    "Convert MCMXCIV to integer",
    1994,
    romanToInteger("MCMXCIV")
);

assertEquals(
    "TC-08",
    "Convert MMMCMXCIX to integer",
    3999,
    romanToInteger("MMMCMXCIX")
);


// =========================
// VALIDATION TESTS
// =========================

assertEquals(
    "TC-09",
    "Detect invalid Roman numeral IIII",
    false,
    validateRoman("IIII")
);

assertEquals(
    "TC-10",
    "Detect invalid Roman numeral VV",
    false,
    validateRoman("VV")
);

assertEquals(
    "TC-11",
    "Detect invalid Roman numeral IC",
    false,
    validateRoman("IC")
);

assertEquals(
    "TC-12",
    "Detect valid Roman numeral X",
    true,
    validateRoman("X")
);

assertEquals(
    "TC-13",
    "Detect invalid Roman numeral XM",
    false,
    validateRoman("XM")
);

assertEquals(
    "TC-14",
    "Convert CM to integer",
    900,
    romanToInteger("CM")
);