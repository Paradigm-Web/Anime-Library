let myLibrary = [];

function Book() {

}

function addBookToLibrary() {
    
}


const theme = document.querySelector('.theme > img');
theme.addEventListener('click', () => {
    theme.classList.toggle('light');
    theme.classList.toggle('dark');
    document.body.classList.toggle('light');
    document.body.classList.toggle('dark');
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

const s_wrapper = document.querySelector('.settings-wrapper');
// const setting_caret = document.querySelector('.settingcaret')
const settings_btn = document.querySelector('.sbtn');

function openSettings() {
    s_wrapper.classList.toggle('settings-open');
}

settings_btn.addEventListener('click', () => {
    openSettings();
});
// setting_caret.addEventListener('click', () => {
//     openSettings();
// })
