import {iosVhFix} from './utils/ios-vh-fix';
import {Form} from './modules/form-validate/form';

// ---------------------------------
const mainNav = document.querySelector('[data-nav="main-nav"]');
const mainNavLinks = mainNav.querySelectorAll('[data-nav="main-nav-link"]');
const navToggler = document.querySelector('[data-button="main-nav-toggler"]');
const body = document.body;

window.addEventListener('DOMContentLoaded', () => {
  const tabletBreakpoint = window.matchMedia('(min-width: 768px)');
  // Utils
  // ---------------------------------
  const onCloseMobileMenu = () => {
    if (tabletBreakpoint.matches) {
      if (mainNav.classList.contains('header__user-navigation--opened')) {
        mainNav.classList.remove('header__user-navigation--opened');
        mainNav.classList.add('header__user-navigation--closed');
      }
    }
  };

  iosVhFix();

  // Modules
  // ---------------------------------

  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener('load', () => {
    if (mainNav && navToggler) {
      navToggler.addEventListener('click', () => {
        if (mainNav.classList.contains('header__user-navigation--closed')) {
          mainNav.classList.remove('header__user-navigation--closed');
          mainNav.classList.add('header__user-navigation--opened');
          body.style.overflow = 'hidden';
        } else {
          mainNav.classList.remove('header__user-navigation--opened');
          mainNav.classList.add('header__user-navigation--closed');
          body.style.overflow = 'auto';
        }
      });

      if (mainNavLinks) {
        Array.from(mainNavLinks).forEach((item) => {
          item.addEventListener('click', () => {
            if (mainNav.classList.contains('header__user-navigation--opened')) {
              mainNav.classList.remove('header__user-navigation--opened');
              mainNav.classList.add('header__user-navigation--closed');
              body.style.overflow = 'auto';
            } else {
              return;
            }
          });
        });
      }

      document.addEventListener('click', (evt) => {
        if (evt.target === mainNav || mainNav.contains(evt.target)) {
          return;
        } else {
          mainNav.classList.remove('header__user-navigation--opened');
          mainNav.classList.add('header__user-navigation--closed');
          body.style.overflow = 'auto';
        }
      });
    }
    tabletBreakpoint.addListener(onCloseMobileMenu);
    const form = new Form();
    window.form = form;
    form.init();
  });
});

// ---------------------------------

// ❗❗❗ обязательно установите плагины eslint, stylelint, editorconfig в редактор кода.

// привязывайте js не на классы, а на дата атрибуты (data-validate)

// вместо модификаторов .block--active используем утилитарные классы
// .is-active || .is-open || .is-invalid и прочие (обязателен нейминг в два слова)
// .select.select--opened ❌ ---> [data-select].is-open ✅

// выносим все в дата атрибуты
// url до иконок пинов карты, настройки автопрокрутки слайдера, url к json и т.д.

// для адаптивного JS используется matchMedia и addListener
// const breakpoint = window.matchMedia(`(min-width:1024px)`);
// const breakpointChecker = () => {
//   if (breakpoint.matches) {
//   } else {
//   }
// };
// breakpoint.addListener(breakpointChecker);
// breakpointChecker();

// используйте .closest(el)
