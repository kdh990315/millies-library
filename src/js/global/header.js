export function mobilHeaderBtn() {
	const btn = document.querySelector('.header-mobil-btn');
	const headerContents = document.querySelector('.header_wrap_nav-box_nav');

	btn.addEventListener('click', () => {
		headerContents.classList.toggle('active');
	});
};

export function scrollHeader() {
	const logo = document.querySelector('#logo');
	const doc = document.documentElement;

	window.addEventListener('scroll', () => {
		doc.scrollTop > 50 ? logo.classList.add('active') : logo.classList.remove('active');

	});
}