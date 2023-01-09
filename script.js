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
        const img1 = card_img.children[0];
        const img2 = card_img.children[1];
        const more_btn = card.querySelector('.more-info');
        const card_title = card.querySelector('.card-title');
        const ep_count_btn = card.querySelector('#eps > i');
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
                }, 75);
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

        

        // ep_count_btn.addEventListener('click', () => {
        //     let txt_p = document.querySelector('#eps > p');
        //     let txt = txt_p.textContent.split('/');
        //     let current = parseInt(txt[0]);
        //     let total = txt[1];
        //     current++;
        //     if (current == parseInt(total)) {
        //         alert('Content completed!');
        //         current = 0;
        //     }
        //     txt_p.textContent = current + '/' + total;
        // });
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
