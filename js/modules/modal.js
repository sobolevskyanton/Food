function modal () {
    //Modal

    const btns = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector('.modal');

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    function showModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimeId);
    }
    btns.forEach(elem => {
        elem.addEventListener('click', showModal);
    });

    //close.addEventListener('click', closeModal);

    modal.addEventListener('click', (event) => {
        if(event.target.classList.contains('modal') || event.target.getAttribute('data-close') =='') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if(e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimeId = setTimeout(showModal, 50000);

    function showModalByScroll() {
        if(window.pageYOffset + document.documentElement.clientHeight  >= document.documentElement.scrollHeight - 1) {
            showModal();
            window.removeEventListener('scroll',showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);
}

module.exports = modal;