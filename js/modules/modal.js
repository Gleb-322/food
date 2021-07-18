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