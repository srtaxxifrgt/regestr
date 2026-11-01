(function () {
    'use strict';

    const form = document.getElementById('regForm');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const guestsSelect = document.getElementById('guests');
    const submitBtn = document.getElementById('submitBtn');
    const statusEl = document.getElementById('formStatus');

    const errorName = document.getElementById('error-name');
    const errorPhone = document.getElementById('error-phone');
    const errorGuests = document.getElementById('error-guests');

    // Очистка ошибки при вводе
    [nameInput, phoneInput, guestsSelect].forEach(function (el) {
        el.addEventListener('input', function () {
            el.classList.remove('invalid');
            const errEl = document.getElementById('error-' + el.id);
            if (errEl) errEl.textContent = '';
        });
    });

    function validate() {
        let ok = true;

        // Имя
        if (nameInput.value.trim().length < 2) {
            nameInput.classList.add('invalid');
            errorName.textContent = 'Введите имя (минимум 2 символа).';
            ok = false;
        }

        // Телефон (проверка на минимум 10 цифр)
        const phoneDigits = phoneInput.value.replace(/\D/g, '');
        if (phoneDigits.length < 10) {
            phoneInput.classList.add('invalid');
            errorPhone.textContent = 'Введите корректный номер телефона.';
            ok = false;
        }

        // Количество
        if (!guestsSelect.value) {
            guestsSelect.classList.add('invalid');
            errorGuests.textContent = 'Выберите количество человек.';
            ok = false;
        }

        return ok;
    }

    // Слушаем отправку формы
    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Блокируем обычную отправку страницы

        // Если проверка не пройдена — показываем ошибку
        if (!validate()) {
            statusEl.textContent = 'Пожалуйста, исправьте ошибки в форме.';
            return;
        }

        submitBtn.disabled = true;
        submitBtn.textContent = 'Отправляем...';
        statusEl.textContent = '';

        const data = new FormData(form);

        // Отправляем данные на Formspree через AJAX
        fetch(form.action, {
            method: 'POST',
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(function (response) {
            if (response.ok) {
                // Если всё ок — перекидываем на страницу благодарности
                window.location.href = 'thanks.html';
            } else {
                // Если ошибка — читаем ответ и показываем
                return response.json().then(function(errData) {
                    throw new Error(errData.errors ? errData.errors[0].message : 'Ошибка отправки');
                });
            }
        })
        .catch(function (error) {
            console.error(error);
            submitBtn.disabled = false;
            submitBtn.textContent = 'Зарегистрироваться 🌿';
            statusEl.textContent = 'Не удалось отправить. ' + error.message;
        });
    });
})();
