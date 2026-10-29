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

    const phoneRegex = /^\+?[\d\s()\-]{10,}$/;


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

       // Телефон
    const phoneDigits = phoneInput.value.replace(/\D/g, '');
        if (!phoneRegex.test(phoneInput.value.trim()) || phoneDigits.length < 10) {
            phoneInput.classList.add('invalid');
            errorPhone.textContent = 'Введите корректный номер телефона (минимум 10 цифр).';
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

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (!validate()) {
            statusEl.textContent = 'Пожалуйста, исправьте ошибки в форме.';
            return;
        }

        submitBtn.disabled = true;
        submitBtn.textContent = 'Отправляем...';
        statusEl.textContent = '';

        const data = new FormData(form);

        fetch(form.action, {
            method: 'POST',
            body: data,
            headers: { 'Accept': 'application/json' }
        })
        .then(function (response) {
            if (response.ok) {
                // Успех: перенаправляем на thanks.html
                window.location.href = 'thanks.html';
            } else {
                throw new Error('Ошибка сервера: ' + response.status);
            }
        })
        .catch(function (err) {
            console.error(err);
            submitBtn.disabled = false;
            submitBtn.textContent = 'Зарегистрироваться 🌿';
            statusEl.textContent = 'Не удалось отправить. Проверьте соединение и попробуйте снова.';
        });
    });
})();