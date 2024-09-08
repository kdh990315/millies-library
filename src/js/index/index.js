import { fetchBooksList } from '../api/bookApi.js';

const bookApi = new fetchBooksList();

//book api호출 및 로드하는 함수
async function loadBooks() {
	try {
		//베스트셀러 도서 목록
		const bestsellers = await bookApi.getBooks('추천', 7);
		displayBooksList(bestsellers, 'bestseller');

		//코딩 추천 도서 목록
		const codings = await bookApi.getBooks('자바', 7);
		displayBooksList(codings, 'coding');

		//추리 소설 도서 목록
		const detective_novels = await bookApi.getBooks('히가시노', 7);
		displayBooksList(detective_novels, 'detective-novel');
	} catch (error) {
		console.error('에러가발생했습니다', error);
	}
}

//책 정보를 HTML에 추가하는 함수
function displayBooksList(booksDatas, containerId) {
	const itemContainer = document.querySelector(`#${containerId} .slide-wrap`);

	booksDatas.forEach(bookData => {
		const bookItem = document.createElement('li');
		bookItem.classList.add('book');

		const bookImg = document.createElement('img');
		bookImg.classList.add('book-thumbnail');
		bookImg.src = bookData.thumbnail;
		bookImg.alt = `${bookData.title}`;

		const bookTitle = document.createElement('p');
		bookTitle.classList.add('book-title');
		bookTitle.textContent = bookData.title;

		const bookAuthors = document.createElement('p');
		bookAuthors.classList.add('book-authors');
		bookAuthors.textContent = bookData.authors;

		const bookPublisher = document.createElement('span');
		bookPublisher.classList.add('book-publisher');	
		bookPublisher.textContent = `출판사: ${bookData.publisher}`;

		bookItem.appendChild(bookImg);
		bookItem.appendChild(bookTitle);
		bookItem.appendChild(bookAuthors);
		bookItem.appendChild(bookPublisher);
		itemContainer.appendChild(bookItem);
	});
}


loadBooks();
