/**
 * GLOBAL FUNCTIONS / VARIABLES
 */
const scroller = (document.scrollingElement || document.body);
const contentArea = document.querySelector('.content');

/**
 * TOP HEADER HANDLERS
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
 * SECOND HEADER HANDLERS
 */

// CONTROLS
const settings_wrapper = document.querySelector('.settings-wrapper');
const settings_btn = document.querySelector('#settings > i');
function openSettings() {
    settings_wrapper.classList.toggle('settings-open');
    document.querySelector('#settings').classList.toggle('settings-clicked');
}
settings_btn.addEventListener('click', () => {
    openSettings(); 
});

// ADD BUTTON
const add_btn = document.querySelector('#add i');
const add_menu_wrapper = document.querySelector('.add-menu');
const add_btns = document.querySelectorAll('.add-menu p');
add_btn.addEventListener('click', () => {
    add_menu_wrapper.classList.add('active');
});
add_menu_wrapper.addEventListener('mouseleave', () => {
    add_menu_wrapper.classList.remove('active');
});
add_btns.forEach((b) => {
    b.addEventListener('click', () => {
        addBtnFunctions[b.getAttribute('data')]();
    });
});

let sample_no = 0;
let addBtnFunctions = {
    'new_list': () => {
        newList();
    },
    'quick_add': () => {
        quickAdd('current');
    },
    'new_item': () => {
        testerFunction();
    }
}


/**
 * Add Button Functions
 */

function newList() {
    let new_list = document.createElement('div');
        new_list.id = `sample-list${sample_no}`;
        let id = new_list.id;
        sample_no++;
        new_list.classList.add('content-section');

        let list_title = document.createElement('div');
        list_title.classList.add('field-title');
        let title_p = document.createElement('p');
        let title_input = document.createElement('input');
        title_input.type = 'text';
        title_input.placeholder = 'Sample List';
        title_input.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                title_input.style.display = 'none';
                title_p.textContent = title_input.value;
                title_p.style.display = 'inline-block';
                edit_title.style.display = 'inline-block'; 
            }
        });
        let edit_title = document.createElement('div');
        edit_title.classList.add('edit-title');
        let edit_icon = document.createElement('i');
        edit_icon.classList.add('fa-solid');
        edit_icon.classList.add('fa-pen');
        edit_icon.addEventListener('click', () => {
            title_input.style.display = 'inline-block';
            title_p.style.display = 'none';
            edit_title.style.display = 'none';
            title_input.focus();
            title_input.select();
        });
        list_title.appendChild(title_p);
        list_title.appendChild(title_input);
        edit_title.appendChild(edit_icon);
        list_title.appendChild(edit_title);
        

        let list_cards = document.createElement('div');
        list_cards.classList.add('cards-section');
        let list_addCard = document.createElement('div');
        list_addCard.classList.add('card-wrapper');
        list_addCard.classList.add('add-card');
        let addCard_icon = document.createElement('i');
        addCard_icon.classList.add('fa-solid');
        addCard_icon.classList.add('fa-plus');

        list_addCard.appendChild(addCard_icon);
        list_cards.appendChild(list_addCard);
        new_list.appendChild(list_title);
        new_list.appendChild(list_cards);
        contentArea.appendChild(new_list);
        scroller.scrollTop = scroller.scrollHeight;
        let this_title_input = contentArea.querySelector(`#${id} input`);
        this_title_input.focus();
        this_title_input.select();
}

function quickAdd(list) {
    let card = generateCard(list);
    insertCard(card, list);
    wireCard(card);
}

function generateCard(list) {
    // WRAPPERS
    let cardWrapper = document.createElement('div');
    cardWrapper.classList.add('card-wrapper');
    cardWrapper.setAttribute('data', list);

    let cardCover = document.createElement('div')
    cardCover.classList.add('card-cover');

    // CARD IMAGES
    let cardImage = document.createElement('div');
    function setupImages() 
    {
        cardImage.classList.add('card-img');
        let cardTitle = document.createElement('img');
        cardTitle.setAttribute('id', 'card-title')
        cardTitle.setAttribute('src', 'card_titles/narutoship.png');
        cardTitle.setAttribute('title', 'Naruto: Shippuden');

        let thumbnail = document.createElement('img');
        thumbnail.classList.add('img-front');
        thumbnail.setAttribute('src', 'card_img/naruto.jpg');

        let trailer = document.createElement('img');
        trailer.classList.add('img-back');
        trailer.setAttribute('src', 'https://i.pinimg.com/originals/76/96/98/769698307761143fa77e3db7dfa8030b.gif');
        
        cardImage.append(cardTitle, thumbnail, trailer);
        cardCover.appendChild(cardImage);
    }
    
    // MORE INFO 
    let moreInfo = document.createElement('div');
    function setupMore() 
    {
        moreInfo.classList.add('more-info');
        moreInfo.setAttribute('title', 'More Info');

        let moreInfoIcon = document.createElement('i');
        moreInfoIcon.classList.add('info-btn', 'fa-solid', 'fa-ellipsis');
        
        moreInfo.appendChild(moreInfoIcon);
        cardCover.appendChild(moreInfo);
    }

    // CARD INFO
    let cardInfo = document.createElement('div');
    function setupInfo()
    {
        cardInfo.classList.add('card-info');
        let cardInfoWrapper = document.createElement('div');
        cardInfoWrapper.classList.add('card-info-wrapper');

        // INFO HEADER
        let infoHeader = document.createElement('div');
        infoHeader.classList.add('info-header');
        function setupHeader()
        {
            // episode count
            let eps = document.createElement('div');
            eps.setAttribute('id', 'eps');
            let epsP = document.createElement('p');
            epsP.textContent = '3/500';
            eps.appendChild(epsP);
            let span = document.createElement('span');
            span.textContent = '+';
            eps.appendChild(span);

            // rating section
            let rating = document.createElement('div');
            rating.setAttribute('id', 'rating');
            let ratingP = document.createElement('p');
            ratingP.textContent = '0';
            rating.appendChild(ratingP);
            let ratingIcon = document.createElement('i');
            ratingIcon.classList.add('info-btn', 'fa-solid', 'fa-star');
            rating.appendChild(ratingIcon);

            // rating modal
            let ratingModal = document.createElement('div');
            ratingModal.setAttribute('id', 'rating-modal');

            // star wrappers
            let starWrapper = document.createElement('div');
            starWrapper.classList.add('stars-wrapper');
            starWrapper.setAttribute('id', 'stars-top');
            let moreStars = document.createElement('div')
            moreStars.classList.add('stars-more');
            let moreStarsIcon = document.createElement('i')
            moreStarsIcon.classList.add('fa-solid', 'fa-circle-down');
            moreStars.appendChild(moreStarsIcon);
            starWrapper.appendChild(moreStars);
            let starBottom = document.createElement('div');
            starBottom.classList.add('stars-wrapper');
            starBottom.setAttribute('id', 'stars-bottom');

            // 0 support
            let zero = document.createElement('i');
            zero.classList.add('info-btn', 'fa-solid', 'fa-0');
            zero.setAttribute('data', 'bottom');
            zero.setAttribute('data-rating', '0');
            zero.setAttribute('title', '0');
            zero.setAttribute('id', 'zero');
            starBottom.appendChild(zero);

            // generate stars
            createStars('top', starWrapper);
            createStars('bottom', starBottom);

            // create stars function
            function createStars(location, wrapper) {
                let len = 11;
                if (location == 'bottom') {
                    len = 10;
                }
                for(let i=1; i < len; i++) {
                    let star = document.createElement('i');
                    star.classList.add('info-btn', 'fa-solid', 'fa-star');
                    star.setAttribute('data', location);
                    star.setAttribute('data-rating', i);
                    star.setAttribute('title', i);
                    wrapper.appendChild(star);
                }
            }
            // spacer div
            // let space = document.createElement('div');
            // space.setAttribute('id', 'space');

            // append
            // starBottom.appendChild(space);
            ratingModal.appendChild(starWrapper);
            ratingModal.appendChild(starBottom);
            infoHeader.append(eps, rating, ratingModal);
        }

        // INFO BODY
        let infoBody = document.createElement('div');
        infoBody.classList.add('info-body');
        function setupBody()
        {
            // create body content
            let contentType = document.createElement('div');
            contentType.setAttribute('id', 'content-type');
            let releaseDate = document.createElement('div');
            releaseDate.setAttribute('id', 'release-date');
            let ageRating = document.createElement('div');
            ageRating.setAttribute('id', 'age-rating');
            let startDate = document.createElement('div');
            startDate.setAttribute('id', 'start-date');
            let finishDate = document.createElement('div');
            finishDate.setAttribute('id', 'finish-date');
            let genres = document.createElement('div');
            genres.setAttribute('id', 'genres');

            // set body content
            contentType.textContent = 'Series';
            releaseDate.textContent = 'Winter 2007';
            ageRating.textContent = 'PG-13';
            startDate.textContent = 'Started: 23.09.22';
            finishDate.textContent = '';
            genres.textContent = 'Action • Comedy • Shounen • Super Power';

            // append
            infoBody.append(contentType, releaseDate, ageRating, startDate, finishDate, genres);
        }

        // INFO FOOTER
        let infoFooter = document.createElement('div');
        infoFooter.classList.add('info-footer');
        function setupFooter()
        {
            // notes area
            let notes = document.createElement('div');
            notes.classList.add('notes');

            // notes input setup
            let notesInput = document.createElement('input');
            notesInput.setAttribute('id', 'notes-textbox');
            notesInput.setAttribute('type', 'text');
            notesInput.setAttribute('placeholder', 'Quick Notes');

            // append
            notes.appendChild(notesInput);
            infoFooter.append(notes);
        }

        // append
        setupHeader();
        setupBody();
        setupFooter();

        cardInfoWrapper.append(infoHeader, infoBody, infoFooter);
        cardInfo.append(cardInfoWrapper);
    }

    // APPEND
    setupImages();
    setupMore();
    setupInfo();

    cardCover.append(cardImage, moreInfo, cardInfo);
    cardWrapper.appendChild(cardCover);

    return cardWrapper;
}

function insertCard(card, list) {
    let section = contentArea.querySelector(`#${list}`);
    let placeholder = section.querySelector('.add-card');
    placeholder.insertAdjacentElement('beforebegin', card);
}

function wireCard(card) {
    let isActive = false;
    let isHovered = false;

    const cover = card.querySelector('.card-cover');
    const imageWrapper = card.querySelector('.card-img');
    const title = imageWrapper.children[0];
    const thumbnail = imageWrapper.children[1];
    const trailer = imageWrapper.children[2];
    const ratingModal = card.querySelector('#rating-modal'); 

    function hoverCard() {
        let spawn = 500;
        // hovering the card
        imageWrapper.addEventListener('mouseenter', () => {
            if(isActive) return;
            isHovered = true;

            setTimeout(() => {
                if (!isHovered) return;
                cover.classList.add('expand');
                isActive = true;
            }, spawn);
            // hovering animations
            fadeToTrailer();
            runTitle();
            hideTitle();
            hideThumbnail();
        });

        // no longer hovering card
        imageWrapper.addEventListener('mouseleave', () => {
            if(isActive)  return;
            isHovered = false;
        });

        // mouse leaving card animation
        cover.addEventListener('mouseleave', () => {
            isHovered = false;
            title.classList.remove('shown');
            ratingModal.classList.remove('active');

            if (!isActive) return;
            cover.classList.remove('expand');
            isActive = false;

            setTimeout(() => {
                thumbnail.style.opacity = '100%';
                trailer.classList.remove('fade-in');
                trailer.classList.add('fade-out');
                title.classList.remove('shown');
            }, 10);
        });

        // animation functions
        function fadeToTrailer() {
            setTimeout(() => {
                if(!isHovered) return;
                trailer.classList.add('fade-in');
                trailer.classList.remove('fade-out')
            }, spawn + 100);
        }
        function runTitle() {
            setTimeout(() => {
                if(!isHovered) return;
                title.classList.add('shown');
            }, spawn + 200)
        }
        function hideTitle() {
            setTimeout(() => {
                if(!isHovered || !isActive) return;
                title.classList.remove('shown');
            }, spawn + 4000);
        }
        function hideThumbnail() {
            setTimeout(() => {
                if (!isActive || !isHovered) return;
                thumbnail.style.opacity = '0';
            }, spawn + 700);
        }
    }

    function episodeSystem() {
        let epCount = card.querySelector('#eps > span'); 
        try {
            epCount.addEventListener('click', () => {
                let eps = card.querySelector('#eps > p');
                let txt = eps.textContent.split('/');
                let current = parseInt(txt[0]);
                let total = txt[1];
                current++;

                if (current == parseInt(total)) {
                    alert('Content completed!');
                    current = 0;
                }
                eps.textContent = current + '/' + total;
            });
        } catch (e) {
            return;
        }
    }

    function ratingSystem() {
        const topStars = ratingModal.querySelectorAll('#stars-top > .info-btn');
        const bottomStars = ratingModal.querySelectorAll('#stars-bottom > .info-btn');
        const moreStars = ratingModal.querySelector('.stars-more');
        const starRating = cover.querySelector('#rating > i');
        const starText = cover.querySelector('#rating p');

        starRating.addEventListener('mouseenter', () => {
            ratingModal.classList.add('active');
        });

        moreStars.addEventListener('mouseenter', () => {
            ratingModal.classList.add('more');
        });

        ratingModal.addEventListener('mouseleave', () => {
            ratingModal.classList.remove('active', 'more');
        });
        
        wireRatingSystem(starText, topStars);
        wireRatingSystem(starText, bottomStars);

    }


    // function calls
    hoverCard();
    episodeSystem();
    ratingSystem();
}

function wireRatingSystem(starText, stars) {
    stars.forEach((star, i) => {
        star.addEventListener('mouseover', () => {
            stars.forEach((star, j) => {
                i >= j ? star.classList.add('hovered') : star.classList.remove('hovered');
            });
        });
        star.addEventListener('click', () => {
            let rating = starText.textContent.split('.');
            let new_rating = star.getAttribute('data-rating');
            if (new_rating == '0') {
                starText.textContent = rating[0];
                hoverStars(stars, i);
                return;
            }
            else if (new_rating == '10') {
                starText.textContent = '10';
                hoverStars(stars, i);
                return;
            }
            star.getAttribute('data') == 'top' ? rating[0] = new_rating : rating[1] = new_rating;
            rating = rating.join('.');
            if (rating > 10) return;
            starText.textContent = rating;
            hoverStars(stars, i);
        });
    });
}
function hoverStars(stars, i) {
    stars.forEach((star, j) => {
        star.classList.remove('hovered');
        i >= j ? star.classList.add('active') : star.classList.remove('active');
    });
}