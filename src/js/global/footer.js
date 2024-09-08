export function footerBtn() {
	const btn = document.querySelector('.footer_wrap_btn');
	const contents = document.querySelector('.footer_wrap_QT');

	btn.addEventListener('click', () => {
		let btnStatus = btn.classList.contains('active');

		if(btnStatus) {
			btn.innerHTML = '사업자 정보 보기';
		} else {
			btn.innerHTML = '사업자 정보 접기';
		}
		btn.classList.toggle('active');
		contents.classList.toggle('active');
	});
}