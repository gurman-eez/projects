function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
	// Slider

	const sliderParent = document.querySelector(container),
		prev = sliderParent.querySelector(prevArrow),
		next = sliderParent.querySelector(nextArrow),
		current = sliderParent.querySelector(currentCounter),
		total = sliderParent.querySelector(totalCounter),
		slides = sliderParent.querySelectorAll(slide),
		slideField = sliderParent.querySelector(field),
		slideWrapper = sliderParent.querySelector(wrapper),
		width = window.getComputedStyle(slideWrapper).width,
		dots = [];

	let slideIndex = 1,
		offset = 0;

	slideField.style.width = 100 * slides.length + '%';
	slideField.style.display = 'flex';
	slideField.style.transition = '0.5s all';
	slideWrapper.style.overflow = 'hidden';

	slides.forEach(slide => {
		slide.style.width = width;
	});

	if (slides.length < 10) {
		total.textContent = `0${slides.length}`;
		current.textContent = `0${slideIndex}`;
	} else {
		total.textContent = slides.length;
		current.textContent = slideIndex;
	}

	sliderParent.style.position = 'relative';

	const dotsWrapper = document.createElement('ol');
	dotsWrapper.classList.add('carousel-indicators');
	sliderParent.append(dotsWrapper);

	for (let i = 0; i < slides.length; i++) {
		const dot = document.createElement('li');
		dot.setAttribute('data-slide-to', i + 1);
		dot.classList.add('dot');
		dotsWrapper.append(dot);
		dots.push(dot);

		if (i == 0) {
			dot.style.opacity = 1;
		}
	}

	function deleteNotDigits(num) {
		return +num.replace(/\D/g, '');
	}

	function OpacityForDots(item) {
		item.forEach(dot => {
			dot.style.opacity = '0.5';
		});
		item[slideIndex - 1].style.opacity = 1;
	}

	function ConditionForCurrent() {
		if (slides.length < 10) {
			current.textContent = `0${slideIndex}`;
		} else {
			current.textContent = slideIndex;
		}
	}

	function transformForObject(object, number) {
		object.style.transform = `translateX(-${number}px)`;
	}

	next.addEventListener('click', () => {
		if (offset == deleteNotDigits(width) * (slides.length - 1)) {
			offset = 0;
		} else {
			offset += deleteNotDigits(width);
		}

		transformForObject(slideField, offset);

		if (slideIndex == slides.length) {
			slideIndex = 1;
		} else {
			slideIndex++;
		}

		ConditionForCurrent();

		OpacityForDots(dots);
	});

	prev.addEventListener('click', () => {
		if (offset == 0) {
			offset = deleteNotDigits(width) * (slides.length - 1);
		} else {
			offset -= deleteNotDigits(width);
		}

		transformForObject(slideField, offset);

		if (slideIndex == 1) {
			slideIndex = slides.length;
		} else {
			slideIndex--;
		}

		ConditionForCurrent();

		OpacityForDots(dots);
	});

	dots.forEach(dot => {
		dot.addEventListener('click', (e) => {
			const slideTo = e.target.getAttribute('data-slide-to');
			slideIndex = slideTo;
			offset = deleteNotDigits(width) * (slideTo - 1);

			transformForObject(slideField, offset);

			ConditionForCurrent();

			OpacityForDots(dots);
		});
	});
}

export default slider;