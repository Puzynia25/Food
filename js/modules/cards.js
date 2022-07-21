function cards() {
    
     // menu_item классы для карточек

     class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 29;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const div = document.createElement('div');

            if (this.classes.length === 0) {
                this.div = 'menu__item';
                div.classList.add(this.div);
            } else {
                this.classes.forEach(className => div.classList.add(className));
            }

            div.innerHTML = `
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span> ${this.price}</span> грн/день</div>
            </div>`;
            
            this.parent.append(div);
        }

    }

    const gerResource = async (url) => {
        const res = await fetch (url);

        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, status ${res.status}`);
        }

        return await res.json();
    };

    // 1 способ создания карточек:

    gerResource('http://localhost:3000/menu') 
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });

    // 2 способ создания карточек:

    // gerResource('http://localhost:3000/menu')
    //     .then(data => {
    //         createCard(data);
    //     });

    // function createCard(data) {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         const div = document.createElement('div');
    //         div.classList.add('menu__item');

    //         div.innerHTML = `
    //         <img src=${img} alt=${altimg}>
    //         <h3 class="menu__item-subtitle">${title}</h3>
    //         <div class="menu__item-descr">${descr}</div>
    //         <div class="menu__item-divider"></div>
    //         <div class="menu__item-price">
    //             <div class="menu__item-cost">Цена:</div>
    //             <div class="menu__item-total"><span> ${price}</span> грн/день</div>
    //         </div>`;
            
    //         document.querySelector('.menu .container').append(div);
    //     });
    // }

}

module.exports = cards;