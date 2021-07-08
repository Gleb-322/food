

window.addEventListener('DOMContentLoaded', () => {

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


    // Timer 
    const deadline = '2021-06-20';

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

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container',
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        18,
        '.menu .container',
    ).render();

    new MenuCard(
        "img/tabs/post.jpg" ,
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        14,
        '.menu .container',
    ).render();

    // send Form on server

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        send:'Спасибо! Мы с вами скоро свяжемся',
        error:'Что-то пошло не так...'
    };

    forms.forEach(item => {
        postData(item);
    });

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');

            // скрипт для отправки данных в обычном формате на сервер

            /* если мы используем FormData для отправки данных на сервер в связке с XMLHttpRequest, то для запроса заголовок не нужен, в FormData он уже есть автоматически!!!!! */

            // request.setRequestHeader('Content-type', 'multipart/form-data'); 

            // const formData = new FormData(form);
            // request.send(formData);
            //

            // скрипт для отправки данных в формате JSON на сервер, нам необходимо перевести данные в объект!

            request.setRequestHeader('Content-type', 'application/json'); 
            const formData = new FormData(form);

            const object = {};
            formData.forEach(function(value, key) {
                object[key] = value;
            });

            const json = JSON.stringify(object);

            request.send(json);
            // 

            request.addEventListener('load', () => {
                if (request.status === 200) {
                    console.log(request.response);
                    showModalThanks(message.send);
                    form.reset();
                    statusMessage.remove();
                } else {
                    showModalThanks(message.error);
                }
            });
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


    

});