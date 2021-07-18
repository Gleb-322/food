function activateModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show', 'fade');
    modal.classList.remove('hide');

    document.body.style.overflow = 'hidden'; /* отключает прокрутку страницы */

    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
}

function hideModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show', 'fade');

    document.body.style.overflow = ''; /* включает прокрутку страницы */
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    // modal window

    const modal = document.querySelector(modalSelector),
        btnActiveModal = document.querySelectorAll(triggerSelector);

    btnActiveModal.forEach(item => {
        item.addEventListener('click', (event) => {
            event.preventDefault();
            activateModal(modalSelector, modalTimerId);
        });
    });


    /* функционал, закрывающий модальное окно по клику в любую область экрана, кроме самого окна */
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            hideModal(modalSelector);
        }
    });

    /* функционал, закрывающий модальное окно при нажатии на кнопку esc */
    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape") {
            hideModal(modalSelector);
        }
    });


    function showMyModalByScroll() {
        if (document.documentElement.clientHeight + window.pageYOffset >= document.documentElement.scrollHeight) {
            activateModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showMyModalByScroll);
        }
    }
    
    window.addEventListener('scroll', showMyModalByScroll);
}

export default modal;
export {activateModal};
export {hideModal};