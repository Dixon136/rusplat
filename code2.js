document.addEventListener('DOMContentLoaded', () => {
    // Получаем ссылки на все необходимые HTML-элементы
    const amountButtons = document.querySelectorAll('.amount-btn');
    const customAmountInput = document.getElementById('customAmountInput');
    const selectedAmountValueSpan = document.getElementById('selectedAmountValue');
    const depositButton = document.getElementById('depositButton');

    let selectedAmount = 0; // Переменная для хранения текущей выбранной суммы
    const minDeposit = 100; // Минимальная сумма пополнения

    // Функция для обновления отображения суммы и состояния кнопки
    function updateDisplayAndButton(amount) {
        selectedAmount = Math.max(0, amount); // Гарантируем, что сумма не будет отрицательной
        selectedAmountValueSpan.textContent = selectedAmount;

        if (selectedAmount >= minDeposit) {
            depositButton.disabled = false; // Активируем кнопку
            // Можно добавить класс, чтобы кнопка выглядела активной
            depositButton.classList.add('active'); 
        } else {
            depositButton.disabled = true; // Деактивируем кнопку
            depositButton.classList.remove('active');
        }
    }

    // Добавляем обработчики событий для кнопок с предопределенными суммами
    amountButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Сначала убираем активное состояние со всех кнопок
            amountButtons.forEach(btn => btn.classList.remove('active-amount'));
            // Устанавливаем активное состояние для нажатой кнопки
            button.classList.add('active-amount');

            const amount = parseInt(button.dataset.amount); // Получаем сумму из атрибута data-amount
            customAmountInput.value = ''; // Очищаем поле ввода пользовательской суммы
            updateDisplayAndButton(amount);
        });
    });

    // Добавляем обработчик события для поля ввода пользовательской суммы
    customAmountInput.addEventListener('input', () => {
        // Убираем активное состояние со всех кнопок, если пользователь вводит свою сумму
        amountButtons.forEach(button => button.classList.remove('active-amount'));

        const amount = parseInt(customAmountInput.value) || 0; // Получаем сумму из поля ввода, или 0 если не число
        updateDisplayAndButton(amount);
    });

    // Добавляем обработчик для кнопки "Пополнить" (чтобы она что-то делала)
    depositButton.addEventListener('click', () => {
        if (selectedAmount >= minDeposit) {
            alert(`Выбрана сумма: ${selectedAmount} USD. Переходим к оплате...`);
            // Здесь может быть логика для перехода на страницу оплаты или отправки данных на сервер
            // Например: window.location.href = `/process-payment?amount=${selectedAmount}`;
        } else {
            alert(`Минимальная сумма пополнения ${minDeposit} USD.`);
        }
    });

    // Инициализация при загрузке страницы
    updateDisplayAndButton(0); // Изначально выбрано 0 USD, кнопка неактивна
});
