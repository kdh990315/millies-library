export class slideAnimation {
	constructor(slideContainer, slideBtnContainers, slideWidth, options = {}) {
		this.containers = document.querySelectorAll(slideContainer);
		this.btnContainers = document.querySelectorAll(slideBtnContainers);
		this.width = slideWidth;

		this.margin = options.margin || 0;
		this.textHandler = options.textHandler || false;

		this.slideInit();
	}

	slideInit() {
		this.containers.forEach((container) => {
			const slides = container.querySelectorAll('.slide');
			container.style.width = `${(this.width + this.margin) * slides.length}px`;
		});

		this.slideEventListener();
	}

	slideEventListener() {
		this.btnContainers.forEach((btnContainer, btnIdx) => {
			btnContainer.addEventListener('click', (ev) => {
				const target = ev.target;

				if (!target.classList.contains('slide-btn')) return;

				if (target.classList.contains('active')) return;

				const btns = Array.from(btnContainer.querySelectorAll('.slide-btn'));
				const btnIndex = btns.indexOf(target);
				
				if(this.textHandler) {
					this.textContainerClassHandler(btnContainer, btnIndex);
				}

				btns.forEach(item => {
					item.classList.remove('active')
				})

				btns[btnIndex].classList.add('active');
				
				this.moveSlide(btnIdx, btnIndex);
			});
		});
	}

	textContainerClassHandler(btnContainer, btnIndex) {
		const textContent = Array.from(btnContainer.querySelectorAll('.left-text'));

		textContent.forEach((item) => {
			item.classList.remove('active')
		});

		textContent[btnIndex].classList.add('active');
	}

	moveSlide(containerIdx, btnIndex) {		
		this.containers[containerIdx].style.left = `${-this.width * btnIndex}px`;
	};
}