document.addEventListener('DOMContentLoaded', function() {
    // Бургер-меню
    const burger = document.querySelector('.burger');
    const menu = document.querySelector('.menu');

    if (burger && menu) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('active');
            menu.classList.toggle('active');
        });
    }

    // Карусель
    const carousel = document.querySelector('.carousel');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    if (carousel && prevBtn && nextBtn) {
        let currentIndex = 0;

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });

        nextBtn.addEventListener('click', () => {
            if (currentIndex < carousel.children.length - 1) {
                currentIndex++;
                updateCarousel();
            }
        });

        function updateCarousel() {
            const offset = -currentIndex * 100;
            carousel.style.transform = `translateX(${offset}%)`;
        }
    }

    // Модальное окно изображений
    const imageModal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const closeImageModal = document.querySelector('#image-modal .close-modal');
    const enlargeableImages = document.querySelectorAll('.enlargeable');

    if (imageModal && modalImg && closeImageModal && enlargeableImages) {
        enlargeableImages.forEach(img => {
            img.addEventListener('click', () => {
                imageModal.style.display = 'block';
                modalImg.src = img.src;
            });
        });

        closeImageModal.addEventListener('click', () => {
            imageModal.style.display = 'none';
        });

        imageModal.addEventListener('click', (e) => {
            if (e.target === imageModal) {
                imageModal.style.display = 'none';
            }
        });
    }

    // Форма обратной связи
    const contactForm = document.getElementById("contact-form");
    const privacyCheckbox = document.getElementById('privacy-agree');
    const submitBtn = document.getElementById('submit-btn');
    const phoneInput = document.getElementById('phone');

    if (contactForm && privacyCheckbox && submitBtn && phoneInput) {
        // Изначально кнопка отправки неактивна
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.6';
        submitBtn.style.cursor = 'not-allowed';

        // Устанавливаем +7 в поле телефона
        phoneInput.value = '+7';

        // Маска для ввода телефона
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, ''); // Убираем все символы, кроме цифр
            
            if (!value.startsWith('7')) {
                value = '7' + value; // Убедимся, что номер начинается с 7
            }

            let formattedValue = '+7';
            
            if (value.length > 1) formattedValue += '(' + value.substring(1, 4);
            if (value.length > 4) formattedValue += ') ' + value.substring(4, 7);
            if (value.length > 7) formattedValue += '-' + value.substring(7, 9);
            if (value.length > 9) formattedValue += '-' + value.substring(9, 11);
            
            e.target.value = formattedValue;
        });

        // Управление состоянием кнопки отправки
        privacyCheckbox.addEventListener('change', function() {
            submitBtn.disabled = !this.checked;
            submitBtn.style.opacity = this.checked ? '1' : '0.6';
            submitBtn.style.cursor = this.checked ? 'pointer' : 'not-allowed';
        });

        // Обработка отправки формы
        contactForm.addEventListener("submit", function(event) {
            event.preventDefault();

            if (!privacyCheckbox.checked) {
                alert("Пожалуйста, согласитесь с обработкой персональных данных");
                return;
            }

            const formData = new FormData(this);

            fetch("send_email.php", {
                method: "POST",
                body: formData,
            })
            .then(response => response.text())
            .then(result => {
                if (result.trim() === "success") {
                    alert("Ваше сообщение отправлено!");
                    contactForm.reset();
                    submitBtn.disabled = true;
                    submitBtn.style.opacity = '0.6';
                    submitBtn.style.cursor = 'not-allowed';
                    privacyCheckbox.checked = false;
                    phoneInput.value = '+7'; // Сбрасываем поле телефона
                } else {
                    alert("Произошла ошибка. Попробуйте еще раз.");
                }
            })
            .catch(() => alert("Ошибка соединения. Проверьте интернет."));
        });
    }
});
