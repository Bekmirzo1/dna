'use strict';
// *Эта функция проверяет поддерживается ли браузером формат изображения webp и если поддерживается, то эта функция добавляет из css-документа внутрь html-документа класс с изобажением формата webp
function testWebP(callback) {
    var webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
    if (support === true) {
        document.querySelector('html').classList.add('_webp');
    } else {
        document.querySelector('html').classList.add('_no-webp');
    }
});
const headerControlELement = document.querySelector('.page__header-min');

if (headerControlELement) {
    const header = document.querySelector('.header');
    const callback = function (entries, observer) {
        if (entries[0].isIntersecting) {
            header.classList.remove('_scroll');
        } else {
            // console.log('sxsax');
            header.classList.add('_scroll');
        }
    };
    const headerObserver = new IntersectionObserver(callback);
    headerObserver.observe(headerControlELement);
}

if (document.querySelector('.page')) {
    const wrapper = document.querySelector('.wrapper');
    let pageSlider = new Swiper('.page', {
        wrapperClass: 'page__wrapper',
        slideClass: 'page__screen',
        simulateTouch: false,
        direction: 'vertical',
        slidesPerView: 'auto',
        // parallax: true,
        mousewheel: {
            // Чувствительность колеса мыши
            sensitivity: 1,
        },
        watchOverflow: true,
        // speed: 1100,
        speed: 800,
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
        // Скролл
        scrollbar: {
            el: '.wrapper__scroll',
            dragClass: 'wrapper__scroll-drag',
            // Возможность перетаскивать скролл
            draggable: true,
        },
        init: false,
        on: {
            // Событие инициализации
            init: function () {
                setScrollType();
            },
            resize: function () {
                setScrollType();
            }
        },
    });

    function setScrollType() {
        if (wrapper.classList.contains('_free')) {
            wrapper.classList.remove('_free');
            pageSlider.params.freeMode = false;
        }
        for (let index = 0; index < pageSlider.slides.length; index++) {
            const pageSlide = pageSlider.slides[index];
            const pageSlideContent = pageSlide.querySelector('.screen__container');
            if (pageSlideContent) {
                const pageSlideContentHeight = pageSlideContent.offsetHeight;
                if (pageSlideContentHeight > window.innerHeight) {
                    wrapper.classList.add('_free');
                    pageSlider.params.freeMode = true;
                    break;
                }
            }
        }
    }

    // Scroll to content
    const scrollIcons = document.querySelectorAll('.screen__next');
    if (scrollIcons.length > 0) {
        for (let index = 0; index < scrollIcons.length; index++) {
            const scrollIcon = scrollIcons[index];
            scrollIcon.addEventListener('click', function (e) {
                pageSlider.slideTo(index + 1, 800);
                e.preventDefault();
            });
        }
    }

    // custom navigation
    const bullets = document.querySelectorAll('.screen__bullet');
    if (bullets.length > 0) {
        for (let index = 0; index < bullets.length; index++) {
            const bullet = bullets[index];
            bullet.addEventListener('click', function () {
                // const bulletIndex = bullet.getAttribute('[data-index]');
                const bulletIndex = Number(bullet.dataset.index);
                pageSlider.slideTo(bulletIndex, 800);
            });
        }
    }

    // Scroll top
    const headerLogo = document.querySelector('.header__logo');
    if (headerLogo) {
        headerLogo.addEventListener('click', function (e) {
            pageSlider.slideTo(0, 800)
            e.preventDefault();
        });
    }
    // Scroll to second
    const assortment = document.querySelector('.menu__item_assortment');
    if (assortment) {
        assortment.addEventListener('click', function (e) {
            pageSlider.slideTo(1, 800)
            e.preventDefault();
        });
    }
    pageSlider.init();
}

if (document.querySelector('.products-screen__body')) {
    new Swiper('.products-screen__body', {
        observer: true,
        observeParents: true,
        slidesPerView: 1,
        spaceBetween: 20,
        autoHeight: false,
        speed: 800,
        nested: true,
        // Arrows
        navigation: {
            nextEl: '.products-screen__body .products-screen__arrow_right',
            prevEl: '.products-screen__body .products-screen__arrow_left',
        },
        on: {
            lazyImageReady: function () {
            },
        }
    });
}