function tabs(tabsSelector, tabContentSelector, tabParentSelector, activeClass) {
	//tabs

	const tabs = document.querySelectorAll(tabsSelector),
		tabContent = document.querySelectorAll(tabContentSelector),
		tabParent = document.querySelector(tabParentSelector);

	function hideTabContent() {
		tabContent.forEach(e => {
			e.classList.add('hide');
			e.classList.remove('show', 'fade');
		});

		tabs.forEach(e => {
			e.classList.remove(activeClass);
		});
	}

	function showTabContent(i = 0) {
		tabContent[i].classList.add('show', 'fade');
		tabContent[i].classList.remove('hide');

		tabs[i].classList.add(activeClass);
	}

	hideTabContent();
	showTabContent();

	tabParent.addEventListener('click', e => {
		const target = e.target;

		if (target && target.classList.contains(tabsSelector.slice(1))) {
			tabs.forEach((item, i) => {
				if (target === item) {
					hideTabContent();
					showTabContent(i);
				}
			});
		}
	});
}

export default tabs;