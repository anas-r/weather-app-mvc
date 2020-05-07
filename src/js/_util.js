export const $ = (selector) => document.querySelector(selector);
export const $$ = (selector) => document.querySelectorAll(selector);
export const $_ = (tag,className) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    return element;
}
