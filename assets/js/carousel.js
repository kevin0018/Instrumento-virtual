const slides = document.querySelectorAll('.carousel-slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentIndex = 0;

function updateCarousel() {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentIndex);
    });
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === slides.length - 1;
}

prevBtn.addEventListener('click', function () {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

nextBtn.addEventListener('click', function () {
    if (currentIndex < slides.length - 1) {
        currentIndex++;
        updateCarousel();
    }
});

updateCarousel();