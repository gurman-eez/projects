import {getResource} from '../services/services';

function cards() {
	// Classes

	class MenuCard {
		constructor(src, alt, subtitle, descr, price, parentSelector, ...classes) {
			this.src = src;
			this.alt = alt;
			this.subtitle = subtitle;
			this.descr = descr;
			this.price = price;
			this.parent = document.querySelector(parentSelector);
			this.classes = classes;
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
				<h3 class="menu__item-subtitle">${this.subtitle}</h3>
				<div class="menu__item-descr">${this.descr}</div>
				<div class="menu__item-divider"></div>
				<div class="menu__item-price">
					<div class="menu__item-cost">Цена:</div>
					<div class="menu__item-total"><span>${this.price}</span> грн/день</div>
				</div>
			`;

			this.parent.append(div);
		}
	}



	// getResource('http://localhost:3000/menu')
	// 	.then(data => {
	// 		data.forEach(({img, altimg, title, descr, price}) => {
	// 			new MenuCard(img, altimg, title, descr, price, '.menu . container').render();
	// 		});
	// 	});

	getResource('http://localhost:3000/menu')
		.then(data => createCard(data));

	function createCard(data) {
		data.forEach(({ img, altimg, title, descr, price }) => {
			const element = document.createElement('div');

			element.classList.add('menu__item');

			element.innerHTML = `
				<img src=${img} alt=${altimg}>
				<h3 class="menu__item-subtitle">${title}</h3>
				<div class="menu__item-descr">${descr}</div>
				<div class="menu__item-divider"></div>
				<div class="menu__item-price">
					<div class="menu__item-cost">Цена:</div>
					<div class="menu__item-total"><span>${price}</span> грн/день</div>
				</div>
			`;

			document.querySelector('.menu .container').append(element);
		});
	}
}

export default cards;