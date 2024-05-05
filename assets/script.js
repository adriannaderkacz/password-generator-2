document.addEventListener('DOMContentLoaded', function () {
    const slider = document.getElementById("lengthRange");
    const resultEl = document.getElementById("password-el");
    const generateBtn = document.getElementById("button-el");
    const copyBtn = document.getElementById("copy-icon");
    const solidIcon = document.getElementById("solid-icon");
    const lengthNumber = document.getElementById("length-number");

    const settings = {
        uppercase: document.querySelector(".uppercase-selection input"),
        lowercase: document.querySelector(".lowercase-selection input"),
        number: document.querySelector(".number-selection input"),
        symbol: document.querySelector(".symbol-selection input"),
    };

    // Update slider background fill based on its value
    function updateSliderFill(slider) {
        const percentage = 100 * (slider.value - slider.min) / (slider.max - slider.min);
        slider.style.background = `linear-gradient(90deg, #059669 ${percentage}%, rgba(255, 255, 255, 0.214) ${percentage}%)`;
    }

    // Event listener to update the slider value display and fill
    slider.addEventListener("input", function () {
        lengthNumber.textContent = slider.value;
        updateSliderFill(slider);
    });

    // Initially update slider fill
    updateSliderFill(slider);

    // Function to generate random characters
    function getRandom(lower, upper, number, symbol, length) {
        const randomFunc = {
            lower: () => String.fromCharCode(Math.floor(Math.random() * 26) + 97),
            upper: () => String.fromCharCode(Math.floor(Math.random() * 26) + 65),
            number: () => String.fromCharCode(Math.floor(Math.random() * 10) + 48),
            symbol: () => {
                const symbols = '~!@#$%^&*()_+{}":?><;.,';
                return symbols[Math.floor(Math.random() * symbols.length)];
            }
        };

        let password = '';
        const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0]);
        if (typesArr.length === 0) return '';

        for (let i = 0; i < length; i += typesArr.length) {
            typesArr.forEach(type => {
                const funcName = Object.keys(type)[0];
                password += randomFunc[funcName]();
            });
        }

        return password.slice(0, length);
    }

    // Generate password event
    generateBtn.addEventListener("click", () => {
        const length = parseInt(slider.value);
        const password = getRandom(settings.lowercase.checked, settings.uppercase.checked, settings.number.checked, settings.symbol.checked, length);
        resultEl.textContent = password;
        solidIcon.style.display = "none"; // Reset copy icon state
        copyBtn.style.display = "inline-block";
    });

    // Copy password to clipboard
    copyBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(resultEl.textContent).then(() => {
            copyBtn.style.display = "none";
            solidIcon.style.display = "inline-block";
        }).catch(err => console.error('Failed to copy password: ', err));
    });
});