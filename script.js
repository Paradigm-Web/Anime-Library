/**
 * OTHER FUNCTIONS
 */

const scroller = (document.scrollingElement || document.body);

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
// settings_wrapper.addEventListener('mouseleave', () => {
//     setTimeout(() => {
//         openSettings(); 
//     }, 50); 
// });


// ADD BUTTON HANDLERS
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
        content_area.appendChild(new_list);
        scroller.scrollTop = scroller.scrollHeight;
        let this_title_input = content_area.querySelector(`#${id} input`);
        console.log(id);
        console.log(this_title_input);
        this_title_input.focus();
        this_title_input.select();
    },
    'quick_add': () => {
        
    },
    'new_item': () => {
        
    }
}


/**
 * MEDIA CARD HANDLERS
 */


// REWORK THIS TO BE EASIER TO READ/MODIFY AND FIX IMAGE FADE TRANSITION
const content_area = document.querySelector('.content');
const list_sections = document.querySelectorAll('.content-section');
list_sections.forEach((s) => {
    const cards = s.querySelectorAll('.card-cover');
    const add_card = s.querySelector('.add-card');
    add_card.setAttribute('title', `Add to ${s.id} list`);
    try {
        cards[0].style.transformOrigin = '0 50%';
    } catch {
        console.log(`${s.id} section has no content yet`);
    }
    
    cards.forEach((card) => {
        const card_img = card.querySelector('.card-img');
        const card_title = card_img.children[0];
        const img1 = card_img.children[1];
        const img2 = card_img.children[2];
        const ep_count_btn = card.querySelector('#eps > span');
        const star_text = card.querySelector('#rating p');
        const star_rating = card.querySelector('#rating > i');
        const star_wrapper = card.querySelector('#rating-modal');
        let isActive = false;
        let isHovered = false;
    
        card_img.addEventListener('mouseenter', () => {
            isHovered = true;
            // more_btn.style.opacity = '100%';
            if (isActive) return;
            setTimeout(() => {
                if (!isHovered) return;
                card.classList.add('expand');
                isActive = true;
                setTimeout(() => {
                    if (!isHovered) return;
                    img2.classList.add('fade-in');
                    img2.classList.remove('fade-out');
                    setTimeout(() => {
                        if (!isHovered) return;
                        card_title.classList.add('shown');
                    }, 200);
                    setTimeout(() => {
                        if (!isActive) return;
                        if (!isHovered) return;
                        img1.style.opacity = '0%';
                        setTimeout(() => {
                            card_title.classList.remove('shown');
                        }, 3500);
                    }, 700);
                }, 100);
            }, 500);
        });
        card_img.addEventListener('mouseleave', (e) => {
            if(isActive) return;
            isHovered = false;
        // if (e.target == card_img) more_btn;
        // more_btn.style.opacity = '0';
        });
    
        card.addEventListener('mouseleave', () => {
            isHovered = false;
            card_title.classList.remove('shown');
            star_wrapper.classList.remove('active');
            if (!isActive) return;
            card.classList.remove('expand');
            isActive = false;
            setTimeout(() => {
                img1.style.opacity = '100%';
                img2.classList.remove('fade-in');
                img2.classList.add('fade-out');
                card_title.classList.remove('shown');
            }, 1);
        });

        const stars_top = star_wrapper.querySelectorAll('#stars-top > .info-btn');
        const stars_bottom = star_wrapper.querySelectorAll('#stars-bottom > .info-btn');
        const more_stars = star_wrapper.querySelector('.stars-more');
        wireRatingSystem(stars_top);
        wireRatingSystem(stars_bottom);

        function wireRatingSystem(stars) {
            stars.forEach((star, i) => {
                star.addEventListener('mouseover', () => {
                    stars.forEach((star, j) => {
                        i >= j ? star.classList.add('hovered') : star.classList.remove('hovered');
                    });
                });
                star.addEventListener('click', () => {
                    let rating = star_text.textContent.split('.');
                    let new_rating = star.getAttribute('data-rating');
                    if (new_rating == '0') {
                        star_text.textContent = rating[0];
                        hoverStars(stars, i);
                        return;
                    }
                    else if (new_rating == '10') {
                        star_text.textContent = '10';
                        hoverStars(stars, i);
                        return;
                    }
                    star.getAttribute('data') == 'top' ? rating[0] = new_rating : rating[1] = new_rating;
                    rating = rating.join('.');
                    if (rating > 10) return;
                    star_text.textContent = rating;
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

        
        more_stars.addEventListener('mouseenter', () => {
            star_wrapper.classList.add('more');
        });
        star_rating.addEventListener('mouseenter', () => {
            star_wrapper.classList.add('active');
        });
        star_wrapper.addEventListener('mouseleave', () => {
            star_wrapper.classList.remove('active');
            star_wrapper.classList.remove('more');
        });

        
        try {
            ep_count_btn.addEventListener('click', () => {
                let txt_p = card.querySelector('#eps > p');
                let txt = txt_p.textContent.split('/');
                let current = parseInt(txt[0]);
                let total = txt[1];
                current++;
                if (current == parseInt(total)) {
                    alert('Content completed!');
                    current = 0;
                }
                txt_p.textContent = current + '/' + total;
            });
        } catch (error) {
            return;
        }

        
    });
});




/**
 * MODAL HANDLERS
 */
const overlay = document.querySelector('.overlay');

function toggleModal(modal, wrapper) {
    wrapper.classList.toggle('active');
    modal.classList.toggle('active');
    overlay.classList.toggle('active');
}

const card_m_wrapper = document.querySelector('.modal-wrapper')
const card_modal = document.querySelector('#card-modal');
const more_info = document.querySelector('.more-info');
more_info.addEventListener('click', () => {
    toggleModal(card_modal, card_m_wrapper);
});
const close_card = document.querySelector('#close-card');
close_card.addEventListener('click', () => {
    toggleModal(card_modal, card_m_wrapper);
});

const fav_btn = document.querySelector('#favorite-btn');
fav_btn.addEventListener('click', () => {
    fav_btn.classList.toggle('active');
});

card_m_wrapper.addEventListener('click', (e) => {
    if (e.target != card_m_wrapper) return;
    toggleModal(card_modal, card_m_wrapper);
});
