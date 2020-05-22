'use strict';

window.addEventListener('DOMContentLoaded', () => {

    // Tabs

    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');


    function hideTabContent() {
        tabsContent.forEach(item => {
            item.style.display = 'none';
        });
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].style.display = 'block';
        tabs[i].classList.add('tabheader__item_active');
    }

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });


    hideTabContent();
    showTabContent();

    // Timer

    const deadline = '2020-06-15';

    function setTimeRemaining(endtime) {
        const t = Date.parse(endtime) - new Date(),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor(t / (1000 * 60 * 60) % 24),
            minutes = Math.floor(t / (1000 * 60) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };

    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
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
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = setTimeRemaining(endtime);
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    setClock('.timer', deadline);

    // Modal

    const modal = document.querySelector('.modal'),
        modalBtn = document.querySelectorAll('[data-modal]');


    modalBtn.forEach((item) => {
        item.addEventListener('click', () => {
            openModal();
        });
    });

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(setTimerId);

    }

    function openModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', openModalByScroll);
        }
    }

    window.addEventListener('scroll', openModalByScroll);

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.which === 27 && modal.classList.contains('show')) {
            closeModal();
        }
    });

    const setTimerId = setTimeout(openModal, 10000);

    // Classes

    class oneMenuItem {
        constructor(src, alt, subtitle, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.subtitle = subtitle;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.classes = classes;
            this.transfer = 27;
            this.changeToUSD();
        }

        changeToUSD() {
            return this.price = this.price * this.transfer;
        }

        solution() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.element = 'menu-item';
                element.classList.add(this.element);
                this.classes.forEach(className => element.classList.add(className));
            }
            element.innerHTML = `
    <div class="menu__item">
        <img src=${this.src} alt=${this.alt}>
        <h3 class="menu__item-subtitle">${this.subtitle}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>
    </div>
    `;

            this.parent.append(element);
        }
    }

    const getResources = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    };

    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({
                img,
                alting,
                title,
                descr,
                price
            }) => {
                new oneMenuItem(img, alting, title, descr, price, '.menu .container').solution();
            });
        });

    // getResources('http://localhost:3000/menu')
    // .then(data => {
    //     data.forEach(({img, alting, title, descr, price}) => {
    //          new oneMenuItem(img, alting, title, descr, price, '.menu .container').solution();
    //     });
    // });

    // getResources('http://localhost:3000/menu')
    // .then(data => createCard(data));

    // function createCard(data) {
    //     data.forEach(({img, alting, title, descr, price}) => {
    //         const element = document.createElement('div');
    //         element.classList.add('menu__item');
    //         element.innerHTML = `
    //         <div class="menu__item">
    //             <img src=${img} alt=${alting}>
    //             <h3 class="menu__item-subtitle">${title}</h3>
    //             <div class="menu__item-descr">${descr}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //             </div>
    //         </div>
    //         `;
    //         document.querySelector('.menu .container').append(element);

    //     });


    // }
    // Forms

    const forms = document.querySelectorAll('form');
    const messages = {
        loading: 'img/form/original.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся.',
        failure: 'Что-то пошло не так.'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=utf-8'
            },
            body: data
        });
        return await res.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = messages.loading;
            statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;    
    `;

            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(messages.success);
                    statusMessage.remove();
                })
                .catch(() => {
                    showThanksModal(messages.failure);
                })
                .finally(() => {
                    form.reset();
                });

        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class ="modal__close" data-close>&times;</div>
                <div class ="modal__title">${message}</div>
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

    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));


    // Slider

    const slide = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slideWrapper = document.querySelector('.offer__slider-wrapper'),
        slideInner = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slideWrapper).width;


    let slideIndex = 1,
        offset = 0;

    slideInner.style.display = 'flex';
    slideInner.style.transition = '0.5s all';
    slideInner.style.width = 100 * slide.length + '%';

    slideWrapper.style.overflow = 'hidden';

    slide.forEach(item => {
        item.style.width = width;
    });
    


    if (slide.length < 10) {
        total.textContent = `0${slide.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slide.length;
        current.textContent = slideIndex;
    }

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
          dots = [];
    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for (let i = 0; i < slide.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    

    
    


    next.addEventListener('click', () => {
        if (offset == +width.slice(0, width.length - 2) * (slide.length - 1)) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2);
        }

        slideInner.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slide.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if (slide.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = ".5");
        dots[slideIndex-1].style.opacity = 1;
    });
    
    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = +width.slice(0, width.length - 2) * (slide.length - 1);
        } else {
            offset -= +width.slice(0, width.length - 2);
        }

        slideInner.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slide.length;
        } else {
            slideIndex--;
        }

        if (slide.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = ".5");
        dots[slideIndex-1].style.opacity = 1;
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = +width.slice(0, width.length - 2) * (slideTo - 1);

            slideInner.style.transform = `translateX(-${offset}px)`;

            if (slide.length < 10) {
                current.textContent =  `0${slideIndex}`;
            } else {
                current.textContent =  slideIndex;
            }

            dots.forEach(dot => dot.style.opacity = ".5");
            dots[slideIndex-1].style.opacity = 1;
        });
    });
    

    //   });
    // });
    








        // showSlides(slideIndex);

        // if (slide.length < 10) {
        //     total.textContent = `0${slide.length}`;
        // } else {
        //     total.textContent = slide.length;
        // }

        // function showSlides(n) {
        //     if (n > slide.length){
        //         n = 1;
        //     } else if (n < 1) {
        //         n = slide.length;
        //     }

        //     slide.forEach(item => {
        //         item.classList.remove('show');
        //         item.classList.add('hide');
        //     });

        //     slide[n - 1].classList.remove('hide');
        //     slide[n - 1].classList.add('show');

        //     if (slide.length < 10) {
        //         current.textContent = `0${n}`;
        //     } else {
        //         current.textContent = n;
        //     }


        // }   

        // function nextSlide(n) {
        //     showSlides(slideIndex += n);
        // }

        // prev.addEventListener('click', () => {
        //     nextSlide(-1);
        // });

        // next.addEventListener('click', () => {
        //     nextSlide(1);
        // });



    
});
            