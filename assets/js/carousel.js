const track = document.getElementById('carouselTrack');
        const slides = document.querySelectorAll('.carousel-slide');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        let currentIndex = 0;
        // Update carousel position
        function updateCarousel() {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex === slides.length - 1;
        }
        // Previous button event
        prevBtn.addEventListener('click', function () {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });
        // Next button event
        nextBtn.addEventListener('click', function () {
            if (currentIndex < slides.length - 1) {
                currentIndex++;
                updateCarousel();
            }
        });
        // Swipe support for mobile devices
        let startX = 0;
        track.addEventListener('touchstart', function (e) {
            startX = e.touches[0].clientX;
        });
        track.addEventListener('touchend', function (e) {
            let endX = e.changedTouches[0].clientX;
            if (endX < startX - 30 && currentIndex < slides.length - 1) {
                currentIndex++;
                updateCarousel();
            }
            if (endX > startX + 30 && currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });
        updateCarousel();