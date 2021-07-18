import {activateModal, hideModal} from './modal';
import {postData} from '../services/services';

function forms(formSelector, modalTimerId) {
    // send Form on server

    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'img/form/spinner.svg',
        send:'Спасибо! Мы с вами скоро свяжемся',
        error:'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    
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
        activateModal('.modal', modalTimerId);

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
            hideModal('.modal');
        }, 3000);
    }
}

export default forms;