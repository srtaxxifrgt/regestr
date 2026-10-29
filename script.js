(function () {
    'use strict';

    const form = document.getElementById('regForm');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone'); // если меняла email на телефон
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
        // Если проверка не пройдена — блокируем отправку
        if (!validate()) {
            e.preventDefault(); // Останавливаем форму
            statusEl.textContent = 'Пожалуйста, исправьте ошибки в форме.';
            return;
        }

        // ЕСЛИ ПРОВЕРКА ПРОЙДЕНА — НИЧЕГО НЕ ДЕЛАЕМ!
        // Браузер сам отправит форму на FormSubmit.
        // Только меняем текст на кнопке для красоты
        submitBtn.disabled = true;
        submitBtn.textContent = 'Отправляем...';
    });
})();
