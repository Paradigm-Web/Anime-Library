/**
 * HEADER HANDLERS
 */

const dark = true;
const theme = document.querySelector('#theme > img');
theme.addEventListener('click', () => {
    theme.classList.toggle('fa-moon');
    theme.classList.toggle('dark');
    theme.classList.toggle('light');
    theme.classList.toggle('fa-sun');
});

const search_input = document.querySelector('#search-input');
search_input.addEventListener('blur', () => {
    document.querySelector('.search-box').classList.toggle('search-box-open');
});

const search_btn = document.querySelector('.search-icon');
search_btn.addEventListener('click', () => {
    document.querySelector('.search-box').classList.toggle('search-box-open');
    search_input.focus();
});


/**
 * CONTROL HANDLERS
 */

const settings_wrapper = document.querySelector('.settings-wrapper');
const settings_btn = document.querySelector('#settings > i');
function openSettings() {
    settings_wrapper.classList.toggle('settings-open');
    document.querySelector('#settings').classList.toggle('settings-clicked');
}
settings_btn.addEventListener('click', () => {
    openSettings();
});


/**
 * MEDIA CARD HANDLERS
 */

const card = document.querySelector('.card-cover');
const card_img = card.querySelector('.card-cover img');
const more_btn = card.querySelector('.more-info');
let isActive = false;
let isHovered = false;

card_img.addEventListener('mouseenter', () => {
    isHovered = true;
    if (isActive) return;
    setTimeout(() => {
        if (!isHovered) return;
        card.classList.add('expand');
        isActive = true;
        setTimeout(() => {
            card_img.src = "https://media.giphy.com/media/3o6UBpHgaXFDNAuttm/giphy.gif";
        }, 75);
    }, 500);
});
card_img.addEventListener('mouseleave', () => {
    isHovered = false;
});

card.addEventListener('mouseleave', () => {
    isHovered = false;
    if (!isActive) return;
    card.classList.remove('expand');
    isActive = false;
    setTimeout(() => {
        card_img.src = "card_img/naruto.jpg";
    }, 100);
});