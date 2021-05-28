'use strict';
// утилитарный модуль - экспортирует общие функции и переменные для всех модулей
(function () {
    window.utils = {
        KeyCode: {
            BACKSPACE: 'Backspace',
            ESCAPE: 'Escape'
        }
    };
}());
// аккордеон для блока FAQ
(function () {
    var faqList = document.querySelector('.faq__list');
    if (faqList) {
        faqList.classList.remove('faq__list--nojs');
        var toggleFaqItem = function (item) {
            item.classList.toggle('faq__item--open');
        };
        faqList.addEventListener('click', function (evt) {
            var faqItem = evt.target.closest('li');
            toggleFaqItem(faqItem);
        });
    }
}());
// аккордеон для фильтра
(function () {
    var filter = document.querySelector('.filter');
    var filterButtons = document.querySelectorAll('.filter__item > button');
    if (filter && filterButtons) {
        filter.classList.remove('filter--nojs');
        for (var i = 0; i < filterButtons.length; i++) {
            filterButtons[i].addEventListener('click', function (evt) {
                evt.target.parentNode.classList.toggle('filter__item--open');
            });
        }
    }
}());
// мобильное меню - начиная с планшетной версии
(function () {
    var pageHeader = document.querySelector('.page-header');
    var headerToggle = document.querySelector('.page-header__toggle');
    var body = document.querySelector('body');
    if (pageHeader && headerToggle) {
        pageHeader.classList.remove('page-header--nojs');
        headerToggle.addEventListener('click', function () {
            if (pageHeader.classList.contains('page-header--closed')) {
                pageHeader.classList.remove('page-header--closed');
                pageHeader.classList.add('page-header--opened');
                body.classList.add('overlay--open');
            } else {
                pageHeader.classList.add('page-header--closed');
                pageHeader.classList.remove('page-header--opened');
                body.classList.remove('overlay--open');
            }
        });
    }
}());
// модальные окна
(function () {
    var modalcartOpen = document.querySelectorAll('.modal-open--cart');
    var modalcart = document.querySelector('.modal--cart');
    var modalcartClose = document.querySelector('.modal__close--cart');
    var body = document.querySelector('body');
    var setVisible = function (visible) {
        if (visible) {
            body.classList.add('overlay-cart--open');
            document.addEventListener('keydown', escapeClickHandler);
        } else {
            body.classList.remove('overlay-cart--open');
            document.querySelector('.modal-show').classList.remove('modal-show');
            document.querySelector('.overlay-cart').remove();
            document.removeEventListener('keydowm', escapeClickHandler);
        }
    };
    var escapeClickHandler = function (evt) {
        if (evt.key === window.utils.KeyCode.ESCAPE) {
            evt.preventDefault();
            setVisible(false);
        }
    };
    var createOverlay = function () {
        var overlay = document.createElement('div');
        overlay.classList.add('overlay-cart');
        body.appendChild(overlay);
        overlay.addEventListener('click', function (overlayEvt) {
            if (overlayEvt.target === overlay) {
                setVisible(false);
            }
        });
    };
    var modalOpenHandler = function (modal) {
        modal.classList.add('modal-show');
        createOverlay();
        setVisible(true);
    };
    var modalCloseHandler = function (evt) {
        evt.preventDefault();
        setVisible(false);
    };
    if (modalcartOpen && modalcart) {
        for (var i = 0; i < modalcartOpen.length; i++) {
            modalcartOpen[i].addEventListener('click', function (evt) {
                evt.preventDefault();
                modalOpenHandler(modalcart);
            });
        }
    }
    if (modalcartClose) {
        modalcartClose.addEventListener('click', modalCloseHandler);
    }
}());
// модальные окна
(function () {
    var modalLoginOpen = document.querySelector('.modal-open');
    var modalLogin = document.querySelector('.modal');
    var modalLoginClose = document.querySelector('.modal__close');
    var loginForm = document.querySelector('.login__form');
    var modalFilterOpen = document.querySelector('.catalog__filter-button');
    var modalFilter = document.querySelector('.filter');
    var modalFilterClose = document.querySelector('.filter__modal-close');
    var body = document.querySelector('body');
    var email = document.querySelector('[id=email]');
    var isStorage = true;
    var emailStorage = '';
    try {
        emailStorage = localStorage.getItem('emailStorage');
    } catch (err) {
        isStorage = false;
    }
    var setVisible = function (visible) {
        if (visible) {
            body.classList.add('overlay--open');
            document.addEventListener('keydown', escapeClickHandler);
        } else {
            body.classList.remove('overlay--open');
            document.querySelector('.modal-show').classList.remove('modal-show');
            document.querySelector('.overlay').remove();
            document.removeEventListener('keydowm', escapeClickHandler);
            if (modalFilter && modalFilterClose) {
                modalFilter.classList.remove('filter--modal-open');
            }
        }
    };
    var escapeClickHandler = function (evt) {
        if (evt.key === window.utils.KeyCode.ESCAPE) {
            evt.preventDefault();
            setVisible(false);
        }
    };
    var createOverlay = function () {
        var overlay = document.createElement('div');
        overlay.classList.add('overlay');
        body.appendChild(overlay);
        overlay.addEventListener('click', function (overlayEvt) {
            if (overlayEvt.target === overlay) {
                setVisible(false);
            }
        });
    };
    var modalOpenHandler = function (modal) {
        modal.classList.add('modal-show');
        createOverlay();
        setVisible(true);
    };
    var modalCloseHandler = function (evt) {
        evt.preventDefault();
        setVisible(false);
    };
    if (modalLoginOpen && modalLogin) {
        modalLoginOpen.addEventListener('click', function (evt) {
            evt.preventDefault();
            modalOpenHandler(modalLogin);
            email.focus();
            if (emailStorage) {
                email.value = emailStorage;
            }
        });
    }
    if (modalLoginClose) {
        modalLoginClose.addEventListener('click', modalCloseHandler);
    }
    if (loginForm) {
        loginForm.addEventListener('submit', function (evt) {
            if (!email.value) {
                evt.preventDefault();
            } else {
                if (isStorage) {
                    localStorage.setItem('emailStorage', email.value);
                }
            }
        });
    }
    if (modalFilterOpen && modalFilter) {
        modalFilterOpen.addEventListener('click', function (evt) {
            evt.preventDefault();
            modalOpenHandler(modalFilter);
            modalFilter.classList.add('filter--modal-open');
        });
    }
    if (modalFilterClose) {
        modalFilterClose.addEventListener('click', modalCloseHandler);
    }
}());
(function () {
    var catalog = document.querySelector('.page-catalog');
    var filter = document.querySelector('.filter__item');
    if (document.contains(catalog) && document.contains(filter)) {
        var depth = document.querySelector('.filter__line-depth');
        var line = document.querySelector('.filter__price-controls');
        var firstPin = {
            pin: document.querySelector('.filter__line-pin--min'),
            value: document.querySelector('.filter__value--first'),
            label: document.querySelector('.filter__label--first'),
            getX: function (x) {
                if (x < MIN) {
                    x = MIN;
                }
                if (x > MAX) {
                    x = MAX;
                }
                if (x > secondPin.pin.offsetLeft) {
                    x = secondPin.pin.offsetLeft;
                }
                this.pin.style.left = x + 'px';
                depth.style.left = x + 'px';
                return x;
            }
        };
        var secondPin = {
            pin: document.querySelector('.filter__line-pin--max'),
            value: document.querySelector('.filter__value--second'),
            label: document.querySelector('.filter__label--second'),
            getX: function (x, mx) {
                if (x < MIN) {
                    x = MIN;
                }
                if (x > MAX) {
                    x = MAX;
                }
                if (x < firstPin.pin.offsetLeft) {
                    x = firstPin.pin.offsetLeft;
                }
                if (firstPin.pin.offsetLeft === secondPin.pin.offsetLeft && secondPin.pin.offsetLeft - x > -1 && mx !== 0) {
                    x = firstPin.pin.offsetLeft + mx;
                    x = firstPin.getX(x);
                    firstPin.value.value = Math.floor(x / MAX * maxPrice);
                }
                this.pin.style.left = x + 'px';
                depth.style.right = MAX - x + 'px';
                return x;
            }
        };
        var MIN = 0;
        var MAX = line.offsetWidth - firstPin.pin.offsetWidth;
        var maxPrice = firstPin.value.max;
        var toValue = function (pin) {
            if (pin.classList.contains('filter__line-pin--min')) {
                return firstPin.value;
            } else {
                return secondPin.value;
            }
        };
        var sliderHandler = function (evt) {
            evt.preventDefault();
            var mouseMoveHandler = function (em) {
                em.preventDefault();
                if (evt.target.classList.contains('filter__line-pin--min')) {
                    var a = firstPin.pin.offsetLeft + em.movementX;
                    a = firstPin.getX(a);
                    firstPin.value.value = Math.floor(a / MAX * maxPrice);
                } else {
                    var b = secondPin.pin.offsetLeft + em.movementX;
                    b = secondPin.getX(b, em.movementX);
                    secondPin.value.value = Math.floor(b / MAX * maxPrice);
                }
            };
            var mouseUpHandler = function (eu) {
                eu.preventDefault();
                document.removeEventListener('mousemove', mouseMoveHandler);
                document.removeEventListener('mouseup', mouseUpHandler);
            };
            document.addEventListener('mousemove', mouseMoveHandler);
            document.addEventListener('mouseup', mouseUpHandler);
        };
        var mobileSliderHandler = function (evt) {
            evt.preventDefault();
            var touchStart = evt.changedTouches[0].pageX;
            var touchMoveHandler = function (tm) {
                var touchCurrent = tm.changedTouches[0].pageX - touchStart;
                if (evt.target.classList.contains('filter__line-pin--min')) {
                    var c = firstPin.pin.offsetLeft + touchCurrent;
                    c = firstPin.getX(c);
                    firstPin.value.value = Math.floor(c / MAX * maxPrice);
                } else {
                    var d = secondPin.pin.offsetLeft + touchCurrent;
                    d = secondPin.getX(d, touchCurrent);
                    secondPin.value.value = Math.floor(d / MAX * maxPrice);
                }
                touchStart = tm.changedTouches[0].pageX;
            };
            var touchEndHandler = function (te) {
                te.preventDefault();
                document.removeEventListener('touchmove', touchMoveHandler);
                document.removeEventListener('touchend', touchEndHandler);
            };
            document.addEventListener('touchmove', touchMoveHandler);
            document.addEventListener('touchend', touchEndHandler);
        };
        var numberChange = function (index) {
            if (index === 0) {
                var e = firstPin.value.value * MAX / maxPrice;
                e = firstPin.getX(e);
                if (e < firstPin.value.value * MAX / maxPrice) {
                    firstPin.value.value = secondPin.value.value;
                }
            } else {
                var f = secondPin.value.value * MAX / maxPrice;
                f = secondPin.getX(f);
                if (f > secondPin.value.value * MAX / maxPrice) {
                    secondPin.value.value = firstPin.value.value;
                }
            }
        };
        document.querySelectorAll('.filter__value').forEach(function (value, index) {
            value.addEventListener('change', function () {
                numberChange(index);
            });
        });
        document.querySelectorAll('.filter__line-pin').forEach(function (pin, index) {
            pin.addEventListener('mousedown', function (evt) {
                sliderHandler(evt);
            });
            pin.addEventListener('touchstart', function (evt) {
                mobileSliderHandler(evt);
            });
            pin.addEventListener('keydown', function (evt) {
                if (evt.keyCode === 39) {
                    toValue(pin).value = Number(toValue(pin).value) + 10;
                    numberChange(index);
                }
                if (evt.keyCode === 37) {
                    toValue(pin).value = Number(toValue(pin).value) - 10;
                    numberChange(index);
                }
            });
        });
    }
}());
const swiper = document.querySelectorAll('.shop__container');
if (document.querySelector(`.shop`)) {
    document.querySelector(`.shop__no-js`).classList.remove(`shop__no-js`);
    const swiper = new Swiper(`.shop__container`, {
        navigation: {
            nextEl: `.swiper-button-next`,
            prevEl: `.swiper-button-prev`
        },
        pagination: {
            el: `.swiper-pagination`,
            clickable: true,
            renderBullet(index, className) {
                return `<span class="` + className + `">` + (index + 1) + `</span>`;
            },
            renderFraction(currentClass, totalClass) {
                return `<span class="` + currentClass + `"></span>` + ` of ` + `<span class="` + totalClass + `"></span>`;
            }
        },
        slidesPerView: 4,
        slidesPerGroup: 4,
        loop: true,
        a11y: { enabled: true },
        spaceBetween: 30,
        breakpoints: {
            320: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                pagination: { type: `fraction` }
            },
            767: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                pagination: { type: `bullets` }
            },
            1201: {
                slidesPerView: 4,
                slidesPerGroup: 4,
                pagination: { type: `bullets` }
            }
        }
    });
}
// табы для карточки товара
(function () {
    var tabLinks = document.querySelectorAll('.card__tabs-menu label');
    var tabItems = document.querySelectorAll('.card__tabs-item');
    var linksArray = Array.from(tabLinks);
    if (linksArray && tabItems) {
        for (var i = 0; i < linksArray.length; i++) {
            linksArray[i].addEventListener('click', function (evt) {
                for (var j = 0; j < tabItems.length; j++) {
                    tabItems[j].classList.remove('card__tabs-item--active');
                }
                var index = linksArray.indexOf(evt.target);
                tabItems[index].classList.add('card__tabs-item--active');
            });
        }
    }
}());