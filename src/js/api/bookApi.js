/* eslint-disable no-console */
// const API_KEY = 'KakaoAK a42908852dfe1051e54312a6eb3c4a65'; //API KEY

export class fetchBooksList {
	constructor() {
		this.API_KEY = 'KakaoAK a42908852dfe1051e54312a6eb3c4a65';
		this.API_URL = 'https://dapi.kakao.com/v3/search/book';
	};

	async getBooks(query, size, target = 'title') {
		try {
			const response = await fetch(`${this.API_URL}?query=${query}&size=${size}&target=${target}`, {
				method: "GET",
				headers: {
          'Authorization': this.API_KEY,
        },
			});

			if(!response.ok) {
				throw new Error('도서 목록을 불러오는데 실패하였습니다. 잠시 후 다시 시도해주세요.' + response.statusText);
			}

			const responseData = await response.json();
			
			return responseData.documents;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
}