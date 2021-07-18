/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((module) => {

function calc() {
    // calc

    const result = document.querySelector('.calculating__result span');
    let sex = 'female',
        weight, height, age, 
        ratio = 1.375;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function localStorageSittings (selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }
    localStorageSittings('#gender div', 'calculating__choose-item_active');
    localStorageSittings('.calculating__choose_big div', 'calculating__choose-item_active');

    function calcTotal() {
        if (!sex || !weight || !height || !age || !ratio) {
            result.textContent = '___';
            return;
        }
    
        if (sex == 'female') {
            result.textContent = Math.round(447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age) * ratio);
        } else {
            result.textContent = Math.round(88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age) * ratio);
        }
    }
    calcTotal();

    function getStaticInfo (selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }
    
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
                e.target.classList.add(activeClass);
                calcTotal();
            });
        });
    }
    getStaticInfo('#gender div', 'calculating__choose-item_active');
    getStaticInfo('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamicInfo(inputSelector) {
        const input = document.querySelector(inputSelector);

        input.addEventListener('input', () => {
            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }
                
            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcTotal();
        });
    }
    getDynamicInfo('#height');
    getDynamicInfo('#weight');
    getDynamicInfo('#age');
}

module.exports = calc;

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((module) => {

function cards() {
    // создаем карточки при помощи классов

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.transfer = 27;
            this.parent = document.querySelector(parentSelector);
            this.changeToUAH();
        }
        changeToUAH() {
            this.price = this.price * this.transfer;
        }
        render() {
            const elem = document.createElement('div');
            
            if (this.classes.length === 0) {
                this.classes = 'menu__item';
                elem.classList.add(this.classes);
            } else {
                this.classes.forEach(className => elem.classList.add(className));
            }

            elem.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(elem);
        }
    }
    const getResource = async (url) => {
        const result = await fetch(url);
        if (!result.ok) {
            throw new Error(`Could not fetch ${url}, status: ${result.status}`);
        }

        return await result.json();
    };

    getResource('http://localhost:3000/menu')
    .then(data => {
        data.forEach(({img, altimg, title, descr, price}) => {
            new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
        });
    });

    // еще один вариант создания динамический элементов, если нам не нужно использовать шаблонизацию
    // getResource('http://localhost:3000/menu')
    //     .then(data => createCard(data));

    // function createCard(data) {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         const element = document.createElement('div');

    //         element.classList.add("menu__item");

    //         element.innerHTML = `
    //             <img src=${img} alt=${altimg}>
    //             <h3 class="menu__item-subtitle">${title}</h3>
    //             <div class="menu__item-descr">${descr}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //             </div>
    //         `;
    //         document.querySelector(".menu .container").append(element);
    //     });
    // }
}

module.exports = cards;

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((module) => {

function forms() {
    // send Form on server

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        send:'Спасибо! Мы с вами скоро свяжемся',
        error:'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await result.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            // скрипт для отправки данных в обычном формате на сервер

            /* fetch('server.php', {
                method: 'POST',
                // headers: {
                //     'Content-type': 'multipart/form-data'
                // },
                body: formData
            })
            .then(data => data.text())
            .then(data => {
                console.log(data);
                showModalThanks(message.send);
                statusMessage.remove();
            }).catch(() => {
                showModalThanks(message.error);
            }).finally(() => {
                form.reset();
            });
            */

            // скрипт для отправки данных в формате JSON на сервер, нам необходимо перевести данные в объект!

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showModalThanks(message.send);
                statusMessage.remove();
            }).catch(() => {
                showModalThanks(message.error);
            }).finally(() => {
                form.reset();
            });
            // 
        });
    }

    function showModalThanks(message) {
        const modalDialog = document.querySelector('.modal__dialog');
        modalDialog.classList.add('hide');
        activateModal();

        const modalThanks = document.createElement('div');
        modalThanks.classList.add('modal__dialog');
        modalThanks.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(modalThanks);
        setTimeout(() => {
            modalThanks.remove();
            modalDialog.classList.add('show');
            modalDialog.classList.remove('hide');
            hideModal();
        }, 3000);
    }
}

module.exports = forms;

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

function modal() {
    // modal window

    const modal = document.querySelector('.modal'),
        btnActiveModal = document.querySelectorAll('[data-modal]');

    function activateModal() {
        modal.classList.add('show', 'fade');
        modal.classList.remove('hide');

        document.body.style.overflow = 'hidden'; /* отключает прокрутку страницы */

        clearInterval(modalTimerId);
    }

    function hideModal() {
        modal.classList.add('hide');
        modal.classList.remove('show', 'fade');

        document.body.style.overflow = ''; /* включает прокрутку страницы */
    }

    btnActiveModal.forEach(item => {
        item.addEventListener('click', (event) => {
            event.preventDefault();
            activateModal();
        });
    });


    /* функционал, закрывающий модальное окно по клику в любую область экрана, кроме самого окна */
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            hideModal();
        }
    });

    /* функционал, закрывающий модальное окно при нажатии на кнопку esc */
    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape") {
            hideModal();
        }
    });

    const modalTimerId = setTimeout(activateModal, 50000);

    function showMyModalByScroll() {
        if (document.documentElement.clientHeight + window.pageYOffset >= document.documentElement.scrollHeight) {
            activateModal();
            window.removeEventListener('scroll', showMyModalByScroll);
        }
    }
    
    window.addEventListener('scroll', showMyModalByScroll);
}

module.exports = modal;

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((module) => {

function slider() {
    // slider 

    const slider = document.querySelector('.offer__slider'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slides = document.querySelectorAll('.offer__slide'),
        sliderPrev = document.querySelector('.offer__slider-prev'),
        sliderNext = document.querySelector('.offer__slider-next'),
        idTotal = document.querySelector('#total'),
        idCurrent = document.querySelector('#current'),
        slideField = document.querySelector('.offer__slider-inner'),
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

module.exports = slider;

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

function tabs(){
    // Tabs
    const tabContent = document.querySelectorAll('.tabcontent'),
    tabParent = document.querySelector('.tabheader__items'),
    tabs = document.querySelectorAll('.tabheader__item');


    function hideTabContent () {
        tabContent.forEach(item => {
            // item.style.display = 'none'; этот вариант не используется
            item.classList.add('hide');
            item.classList.remove('show' , 'fade'); /* fade - это анимация */
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });

    }

    function showTabContent (i = 0) {
        // tabContent[i].style.display = 'block'; этот вариант не используется
        tabContent[i].classList.add('show', 'fade');
        tabContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabParent.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((elem , i) => {
                if (elem == target) {
                    hideTabContent ();
                    showTabContent(i);
                }
            });
        }

    });
}

module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

function timer() {
    // Timer 
    const deadline = '2021-07-31';

    function getTimeRemaining (endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)), 
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            minutes = Math.floor(t / (1000 * 60) % 60),
            seconds = Math.floor(t / 1000 % 60);

        return {
           'total': t, 
           'days': days,
           'hours': hours,
           'minutes': minutes,
           'seconds': seconds
        };
    }

    function getZero (num) {
        if (num > 0 && num <= 9) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setTime (selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateTime, 1000);

            updateTime();

        function updateTime () {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
                days.innerHTML = '0';
                hours.innerHTML = '0';
                minutes.innerHTML = '0';
                seconds.innerHTML = '0';
            }
        }
    }
    setTime('.timer', deadline);
}

module.exports = timer;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
window.addEventListener('DOMContentLoaded', () => {
    const calc = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js"),
        cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js"),
        forms = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js"),
        modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
        slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js"),
        tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
        timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");

    calc();
    cards();
    forms();
    modal();
    slider();
    tabs();
    timer();
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map