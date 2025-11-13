document.addEventListener('DOMContentLoaded', () => {

    // --- Р›РѕРіРёРєР° РґР»СЏ СЃС‚СЂР°РЅРёС†С‹ СЂРµРіРёСЃС‚СЂР°С†РёРё (index.html) ---
    const registerForm = document.getElementById('registerForm');
    const messageElement = registerForm ? registerForm.querySelector('.message') : null;

    if (registerForm) {
        registerForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const login = document.getElementById('login').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const roleInput = document.querySelector('input[name="role"]:checked');
            const role = roleInput ? roleInput.value : '';

            if (login.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
                messageElement.textContent = 'РџРѕР¶Р°Р»СѓР№СЃС‚Р°, Р·Р°РїРѕР»РЅРёС‚Рµ РІСЃРµ РїРѕР»СЏ!';
                messageElement.className = 'message error';
                return;
            }
            if (password !== confirmPassword) {
                messageElement.textContent = 'РџР°СЂРѕР»Рё РЅРµ СЃРѕРІРїР°РґР°СЋС‚!';
                messageElement.className = 'message error';
                return;
            }
            if (role === '') {
                messageElement.textContent = 'РџРѕР¶Р°Р»СѓР№СЃС‚Р°, РІС‹Р±РµСЂРёС‚Рµ РІР°С€Сѓ СЂРѕР»СЊ!';
                messageElement.className = 'message error';
                return;
            }

            messageElement.textContent = 'Р РµРіРёСЃС‚СЂР°С†РёСЏ РїСЂРѕС€Р»Р° СѓСЃРїРµС€РЅРѕ! РџРµСЂРµРЅР°РїСЂР°РІР»РµРЅРёРµ...';
            messageElement.className = 'message success';

            setTimeout(() => {
                window.location.href = 'account.html';
            }, 2000);
        });
    }

    // --- Р›РѕРіРёРєР° РґР»СЏ СЃС‚СЂР°РЅРёС†С‹ РїРѕРїРѕР»РЅРµРЅРёСЏ (account.html) ---
    const amountOptions = document.querySelectorAll('.amount-option');
    const customAmountInput = document.getElementById('customAmount');
    const selectedAmountElement = document.getElementById('selectedAmount');
    const depositButton = document.getElementById('depositButton');
    const accountPageMessageElement = document.querySelector('.account-box .message'); // РЎРѕРѕР±С‰РµРЅРёРµ РЅР° СЃС‚СЂР°РЅРёС†Рµ РїРѕРїРѕР»РЅРµРЅРёСЏ

    let currentSelectedAmount = 0; // РџРµСЂРµРјРµРЅРЅР°СЏ РґР»СЏ С…СЂР°РЅРµРЅРёСЏ РІС‹Р±СЂР°РЅРЅРѕР№ СЃСѓРјРјС‹
    const MIN_DEPOSIT_AMOUNT = 100; // РњРёРЅРёРјР°Р»СЊРЅР°СЏ СЃСѓРјРјР° РїРѕРїРѕР»РЅРµРЅРёСЏ

    // Р¤СѓРЅРєС†РёСЏ РґР»СЏ РѕР±РЅРѕРІР»РµРЅРёСЏ РІС‹Р±СЂР°РЅРЅРѕР№ СЃСѓРјРјС‹
    function updateSelectedAmount(amount) {
        currentSelectedAmount = amount;
        if (selectedAmountElement) {
            selectedAmountElement.textContent = `${currentSelectedAmount} USD`;
        }
        if (accountPageMessageElement) {
            accountPageMessageElement.textContent = ''; // РћС‡РёС‰Р°РµРј СЃРѕРѕР±С‰РµРЅРёРµ
            accountPageMessageElement.className = 'message';
        }
    }

    // РРЅРёС†РёР°Р»РёР·Р°С†РёСЏ: РµСЃР»Рё selectedAmountElement СЃСѓС‰РµСЃС‚РІСѓРµС‚, СѓСЃС‚Р°РЅР°РІР»РёРІР°РµРј РЅР°С‡Р°Р»СЊРЅРѕРµ Р·РЅР°С‡РµРЅРёРµ
    if (selectedAmountElement) {
        selectedAmountElement.textContent = `${currentSelectedAmount} USD`;
    }

    // РћР±СЂР°Р±РѕС‚С‡РёРє РєР»РёРєР° РїРѕ РєРЅРѕРїРєР°Рј РІС‹Р±РѕСЂР° СЃСѓРјРјС‹
    amountOptions.forEach(option => {
        option.addEventListener('click', () => {
            amountOptions.forEach(o => { o.classList.remove('selected'); });
            option.classList.add('selected');

            if (customAmountInput) {
                customAmountInput.value = '';
            }
            updateSelectedAmount(parseInt(option.dataset.amount));
        });
    });

    // РћР±СЂР°Р±РѕС‚С‡РёРє РґР»СЏ РїРѕР»СЏ РІРІРѕРґР° СЃРІРѕРµР№ СЃСѓРјРјС‹
    if (customAmountInput) {
        customAmountInput.addEventListener('input', () => {
            const customValue = parseInt(customAmountInput.value);
            if (!isNaN(customValue) && customValue > 0) {
                amountOptions.forEach(o => { o.classList.remove('selected'); });
                updateSelectedAmount(customValue);
            } else {
                updateSelectedAmount(0); // РЎР±СЂР°СЃС‹РІР°РµРј, РµСЃР»Рё РІРІРѕРґ РЅРµРєРѕСЂСЂРµРєС‚РµРЅ
            }
        });
    }

    // РћР±СЂР°Р±РѕС‚С‡РёРє РґР»СЏ РєРЅРѕРїРєРё "РџРѕРїРѕР»РЅРёС‚СЊ" РЅР° СЃС‚СЂР°РЅРёС†Рµ РїРѕРїРѕР»РЅРµРЅРёСЏ
    if (depositButton) {
        depositButton.addEventListener('click', () => {
            if (currentSelectedAmount < MIN_DEPOSIT_AMOUNT) {
                if (accountPageMessageElement) {
                    accountPageMessageElement.textContent = `РњРёРЅРёРјР°Р»СЊРЅР°СЏ СЃСѓРјРјР° РїРѕРїРѕР»РЅРµРЅРёСЏ ${MIN_DEPOSIT_AMOUNT} USD. РџРѕР¶Р°Р»СѓР№СЃС‚Р°, РІС‹Р±РµСЂРёС‚Рµ СЃСѓРјРјСѓ РЅРµ РјРµРЅРµРµ ${MIN_DEPOSIT_AMOUNT} USD.`;
                    accountPageMessageElement.className = 'message error';
                }
            } else {
                // РџРµСЂРµРЅР°РїСЂР°РІР»СЏРµРј РЅР° СЃС‚СЂР°РЅРёС†Сѓ РїРѕРґС‚РІРµСЂР¶РґРµРЅРёСЏ, РїРµСЂРµРґР°РІР°СЏ СЃСѓРјРјСѓ С‡РµСЂРµР· URL
                window.location.href = `confirmation.html?amount=${currentSelectedAmount}`;
            }
        });
    }


    // --- Р›РѕРіРёРєР° РґР»СЏ СЃС‚СЂР°РЅРёС†С‹ РїРѕРґС‚РІРµСЂР¶РґРµРЅРёСЏ (confirmation.html) ---
    const finalAmountElement = document.getElementById('finalAmount');
    const countdownElement = document.getElementById('countdown');

    if (finalAmountElement && countdownElement) { // РџСЂРѕРІРµСЂСЏРµРј, РЅР°С…РѕРґРёРјСЃСЏ Р»Рё РјС‹ РЅР° СЃС‚СЂР°РЅРёС†Рµ РїРѕРґС‚РІРµСЂР¶РґРµРЅРёСЏ
        // РџРѕР»СѓС‡Р°РµРј СЃСѓРјРјСѓ РёР· URL-РїР°СЂР°РјРµС‚СЂРѕРІ
        const urlParams = new URLSearchParams(window.location.search);
        const amount = urlParams.get('amount');

        if (amount) {
            finalAmountElement.textContent = `${amount} USD`;
        } else {
            finalAmountElement.textContent = 'РЎСѓРјРјР° РЅРµ РѕРїСЂРµРґРµР»РµРЅР°';
        }

        let timeInSeconds = 15 * 60; // 15 РјРёРЅСѓС‚ РІ СЃРµРєСѓРЅРґР°С…

        const timerInterval = setInterval(() => {
            const minutes = Math.floor(timeInSeconds / 60);
            const seconds = timeInSeconds % 60;

            countdownElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

            if (timeInSeconds <= 0) {
                clearInterval(timerInterval);
                countdownElement.textContent = 'Р’СЂРµРјСЏ РёСЃС‚РµРєР»Рѕ!';
                // Р—РґРµСЃСЊ РјРѕР¶РЅРѕ РґРѕР±Р°РІРёС‚СЊ РґРѕРїРѕР»РЅРёС‚РµР»СЊРЅСѓСЋ Р»РѕРіРёРєСѓ, РЅР°РїСЂРёРјРµСЂ, СЃРєСЂС‹С‚СЊ РєРѕС€РµР»РµРє РёР»Рё РїРµСЂРµРЅР°РїСЂР°РІРёС‚СЊ.
                // РџРѕРєР° РїСЂРѕСЃС‚Рѕ РјРµРЅСЏРµРј С‚РµРєСЃС‚ Рё РѕСЃС‚Р°РІР»СЏРµРј РєРЅРѕРїРєСѓ "Р’РµСЂРЅСѓС‚СЊСЃСЏ".
            }
            timeInSeconds--;
        }, 1000); // РћР±РЅРѕРІР»СЏРµРј РєР°Р¶РґСѓСЋ СЃРµРєСѓРЅРґСѓ
    }
});
