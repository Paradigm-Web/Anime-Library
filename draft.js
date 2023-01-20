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