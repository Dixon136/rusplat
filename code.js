
document.addEventListener('DOMContentLoaded', () => {

    // --- Логика для страницы регистрации (index.html) ---
    const registerForm = document.getElementById('registerForm');
    const messageElement = registerForm.querySelector('.message');

    if (registerForm) { // Проверяем, находимся ли мы на странице регистрации
        registerForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Предотвращаем стандартную отправку формы

            const login = document.getElementById('login').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const role = document.querySelector('input[name="role"]:checked').value;

            // Простая валидация
            if (password !== confirmPassword) {
                messageElement.textContent = 'Пароли не совпадают!';
                messageElement.className = 'message error'; // Добавляем класс error
                return;
            }
            if (login.trim() === '' || password.trim() === '') {
                messageElement.textContent = 'Пожалуйста, заполните все поля!';
                messageElement.className = 'message error';
                return;
            }

            // Здесь в идеале должна быть отправка данных на сервер
            // Для простоты, имитируем успешную регистрацию
            messageElement.textContent = 'Регистрация прошла успешно! Перенаправление...';
            messageElement.className = 'message success'; // Добавляем класс success

            // Имитируем задержку перед перенаправлением
            setTimeout(() => {
                window.location.href = 'account.html'; // Перенаправляем на страницу пополнения
            }, 2000); // 2 секунды
        });
    }

    // --- Логика для страницы пополнения (account.html) ---
    const amountOptions = document.querySelectorAll('.amount-option');
    const customAmountInput = document.getElementById('customAmount');
    const cryptoWalletLink = document.getElementById('cryptoWallet');
    const selectedAmountElement = document.getElementById('selectedAmount'); // Новое поле для вывода выбранной суммы
    const confirmationMessageElement = document.querySelector('.account-box .message'); // Сообщение на странице пополнения

    if (amountOptions.length > 0) { // Проверяем, находимся ли мы на странице пополнения
        let currentSelectedAmount = 0; // Переменная для хранения выбранной суммы

        // Обработчик клика по кнопкам выбора суммы
        amountOptions.forEach(option => {
            option.addEventListener('click', () => {
                // Снимаем выделение со всех опций
                amountOptions.forEach(o => {
                    o.classList.remove('selected');
                });
                option.classList.add('selected'); // Выделяем выбранную опцию

                // Убираем выделение с поля ввода своей суммы, если оно было
                if (customAmountInput) {
                    customAmountInput.classList.remove('selected');
                }

                currentSelectedAmount = parseInt(option.dataset.amount); // Получаем сумму из data-атрибута
                if (selectedAmountElement) {
                    selectedAmountElement.textContent = `${currentSelectedAmount} USD`;
                }
                if (confirmationMessageElement) {
                    confirmationMessageElement.textContent = ''; // Очищаем сообщение при выборе новой суммы
                    confirmationMessageElement.className = 'message';
                }
            });
        });

        // Обработчик для поля ввода своей суммы
        if (customAmountInput) {
            customAmountInput.addEventListener('input', () => {
                const customValue = parseInt(customAmountInput.value);
                if (!isNaN(customValue) && customValue > 0) {
                    // Снимаем выделение со всех опций
                    amountOptions.forEach(o => {
                        o.classList.remove('selected');
                    });
                    currentSelectedAmount = customValue;
                    if (selectedAmountElement) {
                        selectedAmountElement.textContent = `${currentSelectedAmount} USD`;
                    }
                    if (confirmationMessageElement) {
                        confirmationMessageElement.textContent = '';
                        confirmationMessageElement.className = 'message';
                    }
                } else {
                    currentSelectedAmount = 0; // Сбрасываем, если ввод некорректен
                    if (selectedAmountElement) {
                        selectedAmountElement.textContent = '';
                    }
                }
            });
        }

        // Обработчик для кнопки "Пополнить" (имитация)
        const depositButton = document.querySelector('.account-box button'); // Предполагаем, что кнопка есть
        if (depositButton) {
            depositButton.addEventListener('click', () => {
                if (currentSelectedAmount > 0) {
                    if (confirmationMessageElement) {
                        confirmationMessageElement.textContent = `Пожалуйста, отправьте ${currentSelectedAmount} USD на кошелек: ${cryptoWalletLink ? cryptoWalletLink.textContent : 'адрес кошелька'}. Средства будут зачислены после подтверждения.`;
                        confirmationMessageElement.className = 'message success';
                    }
                    // В реальном приложении здесь была бы логика отправки данных
                } else {
                    if (confirmationMessageElement) {
                        confirmationMessageElement.textContent = 'Пожалуйста, выберите сумму для пополнения.';
                        confirmationMessageElement.className = 'message error';
                    }
                }
            });
        }
    }
});
