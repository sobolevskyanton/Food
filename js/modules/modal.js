function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function showModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    console.log(modalTimerId);
    if(modalTimerId) {
        clearInterval(modalTimerId);
    }
    
}

function modal (triggerSelector, modalSelector, modalTimerId) {
    //Modal

    const btns = document.querySelectorAll(triggerSelector),
    modal = document.querySelector(modalSelector);


    btns.forEach(elem => {
        elem.addEventListener('click', () => showModal(modalSelector, modalTimerId));
    });

    //close.addEventListener('click', closeModal);

    modal.addEventListener('click', (event) => {
        if(event.target.classList.contains('modal') || event.target.getAttribute('data-close') =='') {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if(e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });


    function showModalByScroll() {
        if(window.pageYOffset + document.documentElement.clientHeight  >= document.documentElement.scrollHeight - 1) {
            showModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll',showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {
    closeModal
};
export {
    showModal
};