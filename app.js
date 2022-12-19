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

const search_btn = document.querySelector('.search-icon');
search_btn.addEventListener('click', () => {
    document.querySelector('.search-box').classList.toggle('search-box-open');
});

const search_input = document.querySelector('#search-input');
search_input.addEventListener('blur', () => {
    document.querySelector('.search-box').classList.toggle('search-box-open');
});