

window.addEventListener('DOMContentLoaded', () => {

// Tabs

    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');
          

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show','fade');
        });
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');

        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        if(target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item,i) => {
                if(target == item) {
                    hideTabContent();
                    showTabContent(i);
                }

            });
        }
    });



// Timer

const deadline = '2022-12-20';
//const deadline = '2023-01-29';

function getTimeRemaining(endtime) {
    let days,hours,minutes,seconds;
    const t = Date.parse(endtime) - Date.parse(new Date());
    if(t <= 0) {
        days = 0;
        hours = 0;
        minutes = 0;
        seconds = 0;
    } else { 
        days = Math.floor(t / (1000 * 60 * 60 * 24));
        hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        minutes = Math.floor((t/ 1000 / 60) % 60);
        seconds =  Math.floor((t/ 1000) % 60);
    }
    return {
        'total': t,
        'days' : days,
        'hours': hours,
        'minutes' : minutes,
        'seconds' : seconds
    };
}
function getZero(num) {
    if(num >= 0 && num < 10) {
        return `0${num}`;
    } else {
        return num;
    }
}
function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
          days = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds'),
          timeInterval = setInterval(updateClock,1000);

    updateClock();

    function updateClock() {
        const t = getTimeRemaining(endtime);
        days.innerHTML = getZero(t.days);
        hours.innerHTML = getZero(t.hours);
        minutes.innerHTML = getZero(t.minutes);
        seconds.innerHTML = getZero(t.seconds);

        if(t.total <= 0) {
            clearInterval(timeInterval);
        } 
    }
}

setClock('.timer',deadline);


//Modal

const btns = document.querySelectorAll("[data-modal]"),
      modal = document.querySelector('.modal');
      //close = document.querySelector("[data-close]");
//console.dir(btns);

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



//Class MenuItem


class MenuItem {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.descr = descr;
        this.price = price;
        this.classes = classes;
        this.parent = document.querySelector(parentSelector);
        this.transfer = 27;
        this.changeToUAH();
    }
    changeToUAH() {
        this.price = this.price*this.transfer;
    }
    render() {
        const element = document.createElement('div');
        //elem.classList.add('menu__item');
        
            if(this.classes.length === 0) {
                //this.element = 'menu__item';
                element.classList.add('menu__item');
            } else {
                this.classes.forEach(className => {
                    element.classList.add(className);
                });  
            }
        
            element.innerHTML=`
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
        `;
        this.parent.append(element);
    }
}
new MenuItem(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"', 
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
     9, 
     ".menu__field .container"
     ).render();

new MenuItem(
    "img/tabs/elite.jpg",
    "elite",
    'Меню "Премиум"', 
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    20, 
    ".menu__field .container"
    ).render();

new MenuItem(
    "img/tabs/post.jpg",
    "post",
    'Меню "Постное"', 
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    16, 
    ".menu__field .container"
    ).render();



//Forms

const forms = document.querySelectorAll('form');
const message = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо, скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...'
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
        request.open('POST',"server.php");
        //request.setRequestHeader('Content-Type', 'multipart/form-data');
        request.setRequestHeader('Content-Type', 'application/json');
        const formData = new FormData(form);
        
        const object = {};
        formData.forEach((value, key) => {
            object[key] = value;
        });
        

        request.send(JSON.stringify(object));

        request.addEventListener('load', () => {
            if(request.status === 200) {
                console.log(request.response);
                showThanksModal(message.success);
                form.reset();
                statusMessage.remove();
            } else {
                showThanksModal(message.failure);
            }
        });
    });
} 

function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');
    prevModalDialog.classList.add('hide');
    showModal();


    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML= `
    <div class="modal__content">
        <div class="modal__close" data-close>×</div>
        <div class="modal__title">${message}</div>
    </div>
    `;

    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
        thanksModal.remove();
        prevModalDialog.classList.add('show');
        prevModalDialog.classList.remove('hide');
        closeModal();
    }, 4000);

}




});

