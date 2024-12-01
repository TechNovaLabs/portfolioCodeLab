


const burger = document.querySelector('.burger');
const menu = document.querySelector('.menu');

// Переключение мобильного меню
burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    menu.classList.toggle('active');
});



const carousel = document.querySelector('.carousel');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

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

const imageModal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-img');
const closeImageModal = document.querySelector('#image-modal .close-modal');
const enlargeableImages = document.querySelectorAll('.enlargeable');

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


