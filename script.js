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

 
