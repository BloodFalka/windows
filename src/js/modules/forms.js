import checkNumInputs from './checkNumInputs';

const forms = (state) => {
    const form = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input'),
          windows = document.querySelectorAll('[data-modal]');

    checkNumInputs('input[name="user_phone"]');

    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    const postData = async (url, data) => {
        document.querySelector('.status').textContent =message.loading;
        let res = await  fetch(url, {
            method: 'POST',
            body: data
        });

        return await res.text();
    };

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });
    };

    const resetState = () => {
        state.form = 1;
        state.width = '';
        state.height = '';
        state.type = 'tree';
        state.profile = '';
    }


    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            const closeForms = () => {
                item.parentNode.closest('[data-modal]').style.display = 'none';
                document.body.style.overflow = '';
                document.querySelector('body').style.marginRight = `0px`;
            };

            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);

            const formData = new FormData(item);
            if (item.getAttribute('data-calc') === 'end') {
                for (let key in state) {
                    formData.append(key, state[key]);
                }
            };

            postData('assets/server.php', formData)
                .then(res => {
                    console.log(res);
                    statusMessage.textContent = message.success;
                })
                .catch(() => statusMessage.textContent = message.failure)
                .finally(() => {
                    resetState();
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                    },2000);
                    setTimeout(() => {
                        closeForms();
                    },2500);
                });
        });
    });
};

export default forms;