import { fetchBooksList } from '../api/bookApi.js';
import { slideAnimation } from '../utility/slideAnimation.js';

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

    //텝메뉴1 도서 목록
    const tabContainer1 = await bookApi.getBooks('주식', 7);
    displayBooksList(tabContainer1, 'tabContainer-t1');

    //텝메뉴2 도서 목록
    const tabContainer2 = await bookApi.getBooks('공무원', 7);
    displayBooksList(tabContainer2, 'tabContainer-t2');

    //텝메뉴3 도서 목록
    const tabContainer3 = await bookApi.getBooks('다이어트', 7);
    displayBooksList(tabContainer3, 'tabContainer-t3');

    //텝메뉴4 도서 목록
    const tabContainer4 = await bookApi.getBooks('인테리어', 7);
    displayBooksList(tabContainer4, 'tabContainer-t4');

    //텝메뉴5 도서 목록
    const tabContainer5 = await bookApi.getBooks('영어', 7);
    displayBooksList(tabContainer5, 'tabContainer-t5');
  } catch (error) {
    throw new Error(`에러가 발생하였습니다. 에러 내용: ${error}`);
  }
}

//책 정보를 HTML에 추가하는 함수
function displayBooksList(booksDatas, containerId) {
  const itemContainer = document.querySelector(`#${containerId} .slide-wrap`);

  booksDatas.forEach((bookData) => {
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

//탭 메뉴
function tabMenuHandler(section) {
  const tabMenu = document.querySelector(`.${section} .btn-wrap`);

  tabMenu.addEventListener('click', (ev) => {
    const target = ev.target;

    if (target.classList.contains('btn')) {
      if (target.classList.contains('active')) {
        return;
      }

      const tabId = target.dataset.tab;

      //모든 탭 버튼의 active를 제거
      document.querySelectorAll(`.${section} .btn-wrap .btn`).forEach((item) => {
        item.classList.remove('active');
      });

      //모든 탭 컨텐츠의 active 제거
      document.querySelectorAll(`.${section} .tap-contents`).forEach((item) => {
        item.classList.remove('active');
      });

      //해당 버튼에 active 추가
      target.classList.add('active');

      //클릭된 버튼과 연결된 컨텐츠 표시
      document.querySelector(`.${section} #tabContainer-${tabId}`).classList.add('active');
    }
  });
}

function videoHandler() {
  const playBtn = document.querySelector('.review-poster');
  const videoContainer = document.querySelector('.video-container');

  playBtn.addEventListener('click', () => {
    // iframe 동적 생성 및 설정
    const iframe = document.createElement('iframe');
    iframe.setAttribute(
      'src',
      'https://www.youtube.com/embed/c-XG8k_w1LM?controls=1&mute=1&rel=0&modestbranding=1&autoplay=1' // mute=1과 autoplay=1 추가
    );
    iframe.setAttribute('title', '내돈내산! 밀리 구독 후기');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allowfullscreen', 'true');
    iframe.setAttribute('allow', 'autoplay; encrypted-media');
    iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');

    // iframe을 videoContainer에 추가하고 표시
    videoContainer.appendChild(iframe);
    videoContainer.style.display = 'block';
  });
}

function toggleHandler() {
  const toggleContainer = document.querySelector('.toggle-container');

  toggleContainer.addEventListener('click', (ev) => {
    const target = ev.target.closest('.toggle');

    if (target) {
      target.classList.toggle('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.animation');

  const options = {
    root: null,
    rootMargin: '',
    threshold: 0.3,
  };

  function handleIntersection(entries) {
    entries.forEach((entry) => {
      const scrollMains = entry.target.querySelectorAll('.scroll-main');
      const scrollSub = entry.target.querySelector('.scroll-sub');

      scrollMains.forEach((el) => el.classList.toggle('active', entry.isIntersecting));
      if (scrollSub) scrollSub.classList.toggle('active', entry.isIntersecting);
    });
  }

  const observer = new IntersectionObserver(handleIntersection, options);

  sections.forEach((section) => {
    observer.observe(section);
  });
});

loadBooks();
tabMenuHandler('slide-section');
tabMenuHandler('book-tab-section');
new slideAnimation('.slide-container', '.left-main', 320, { textHandler: true });
videoHandler();
toggleHandler();
