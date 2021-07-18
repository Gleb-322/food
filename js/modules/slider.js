function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    // slider 

    const slider = document.querySelector(container),
        slidesWrapper = document.querySelector(wrapper),
        slides = document.querySelectorAll(slide),
        sliderPrev = document.querySelector(prevArrow),
        sliderNext = document.querySelector(nextArrow),
        idTotal = document.querySelector(totalCounter),
        idCurrent = document.querySelector(currentCounter),
        slideField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width;

    let activeSlideIndex = 1,
        offset = 0;

    if (slides.length > 0 && slides.length < 10) {
        idTotal.textContent = `0${slides.length}`;
        idCurrent.textContent =  `0${activeSlideIndex}`;
    } else {
        idTotal.textContent = slides.length;
        idCurrent.textContent =  activeSlideIndex;
    }
    

    slideField.style.width = 100 * slides.length + "%";
    slideField.style.display = 'flex';
    slideField.style.transition = '0.5s All';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(item => {
        item.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
        dots = [];

    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    sliderNext.addEventListener('click', () => {
        if (offset == deleteNoDigits(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNoDigits(width);
        }
        slideField.style.transform = `translateX(-${offset}px)`;
        setCurrentIndex();
        setCurrentId();
        StyleDotsActive();
    });

    sliderPrev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNoDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNoDigits(width);
        }
        slideField.style.transform = `translateX(-${offset}px)`;
        setCurrentIndex();
        setCurrentId();
        StyleDotsActive();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            activeSlideIndex = slideTo;
            offset = deleteNoDigits(width) * (slideTo - 1);

            slideField.style.transform = `translateX(-${offset}px)`;
            setCurrentId();
            StyleDotsActive();
        });
    });
    
    function deleteNoDigits (width) {
        return +width.replace(/\D/g, '');
    }

    function setCurrentIndex() {
        if (activeSlideIndex == 1) {
            activeSlideIndex = slides.length;
        } else {
            activeSlideIndex--;
        }
    }

    function setCurrentId() {
        if (slides.length < 10) {
            idCurrent.textContent =  `0${activeSlideIndex}`;
        } else {
            idCurrent.textContent =  activeSlideIndex;
        }
    }

    function StyleDotsActive() {
        dots.forEach(dot => dot.style.opacity = ".5");
        dots[activeSlideIndex - 1].style.opacity = 1;
    }
}

export default slider;