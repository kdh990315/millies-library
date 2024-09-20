export class fetchBooksList {
	constructor() {
		this.API_KEY = 'KakaoAK a42908852dfe1051e54312a6eb3c4a65';
		this.API_URL = 'https://dapi.kakao.com/v3/search/book';
	}

	async getBooks(query, size, target = 'title') {
		try {
			const response = await fetch(`${this.API_URL}?query=${query}&size=${size}&target=${target}`, {
				method: "GET",
				headers: {
          'Authorization': this.API_KEY,
        },
			});

			if(!response.ok) {
				const errorMessage = `도서 목록을 불러오는데 실패하였습니다. 상태 코드: ${response.status}, 메시지: ${response.statusText}`;
				throw new Error(errorMessage);
			}

			const responseData = await response.json();
			
			return responseData.documents;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
}