document.addEventListener('DOMContentLoaded', () => {
    const appDiv = document.getElementById('app');

    // Создаем интерфейс для регистрации
    appDiv.innerHTML = `
        <div class="bg-white shadow-md rounded px-8 pt-6 pb-8">
            <h2 class="text-center text-2xl font-bold mb-4">Register</h2>
            <form id="registerForm">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Username</label>
                    <input id="username" type="text" placeholder="Enter username" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
                    <input id="email" type="email" placeholder="Enter email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
                    <input id="password" type="password" placeholder="Enter password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <button type="submit" class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Register
                </button>
            </form>
            <div id="message" class="text-center mt-4 text-red-500"></div>
        </div>
    `;

    // Обрабатываем отправку формы
    const registerForm = document.getElementById('registerForm');
    const messageDiv = document.getElementById('message');

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Получаем значения из формы
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Проверяем, что поля не пустые
        if (!username || !email || !password) {
            messageDiv.textContent = 'All fields are required.';
            messageDiv.classList.replace('text-green-500', 'text-red-500');
            return;
        }

        // Блокируем кнопку, чтобы предотвратить повторную отправку
        const button = registerForm.querySelector('button');
        button.disabled = true;
        button.textContent = 'Registering...';

        try {
            // Отправляем POST-запрос на сервер
            const response = await axios.post('http://127.0.0.1:8000/register', {
                username,
                email,
                password,
            });

            // Если регистрация успешна
            messageDiv.textContent = 'Registration successful!';
            messageDiv.classList.replace('text-red-500', 'text-green-500');

            // Очищаем форму
            document.getElementById('username').value = '';
            document.getElementById('email').value = '';
            document.getElementById('password').value = '';
        } catch (error) {
            // Если произошла ошибка
            console.error(error);
            messageDiv.textContent = error.response?.data?.detail || 'An unexpected error occurred.';
            messageDiv.classList.replace('text-green-500', 'text-red-500');
        } finally {
            // Разблокируем кнопку
            button.disabled = false;
            button.textContent = 'Register';
        }
    });
});
