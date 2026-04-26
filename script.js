window.onload = function() {
    console.log("冬奥数据可视化网站已加载完成");
    
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, observerOptions);

    document.querySelectorAll('.chart-container').forEach(container => {
        container.style.opacity = "0";
        container.style.transform = "translateY(20px)";
        container.style.transition = "all 0.8s ease-out";
        observer.observe(container);
    });

    initBannerCarousel();
};

function initBannerCarousel() {
    const root = document.querySelector('.banner-carousel');
    if (!root) return;

    const track = root.querySelector('.banner-carousel-track');
    const dotsWrap = root.querySelector('.banner-carousel-dots');
    const prevBtn = root.querySelector('.banner-carousel-prev');
    const nextBtn = root.querySelector('.banner-carousel-next');
    const slides = root.querySelectorAll('.banner-carousel-slide');
    const total = slides.length;
    if (!track || !dotsWrap || total === 0) return;

    let index = 0;
    let autoplayTimer = null;
    const autoplayMs = 5000;

    function goTo(i) {
        index = (i + total) % total;
        track.style.transform = 'translateX(-' + index * 100 + '%)';
        dotsWrap.querySelectorAll('.banner-carousel-dot').forEach(function (dot, di) {
            dot.setAttribute('aria-selected', di === index ? 'true' : 'false');
        });
    }

    for (let i = 0; i < total; i++) {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'banner-carousel-dot';
        dot.setAttribute('role', 'tab');
        dot.setAttribute('aria-label', '第 ' + (i + 1) + ' 张');
        dot.addEventListener('click', function () {
            goTo(i);
            resetAutoplay();
        });
        dotsWrap.appendChild(dot);
    }

    function resetAutoplay() {
        if (autoplayTimer) clearInterval(autoplayTimer);
        autoplayTimer = setInterval(function () {
            goTo(index + 1);
        }, autoplayMs);
    }

    prevBtn.addEventListener('click', function () {
        goTo(index - 1);
        resetAutoplay();
    });
    nextBtn.addEventListener('click', function () {
        goTo(index + 1);
        resetAutoplay();
    });

    root.addEventListener('mouseenter', function () {
        if (autoplayTimer) clearInterval(autoplayTimer);
        autoplayTimer = null;
    });
    root.addEventListener('mouseleave', resetAutoplay);

    goTo(0);
    resetAutoplay();
}
