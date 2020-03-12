// naver open-API 활용을 위한 기본 변수 선언
var naver = {

    client_id : "YOUR NAVER CLIENT ID",
    client_secret : "YOUR NAVER CLIENT SECRET",
    movie_url : "https://openapi.naver.com/v1/search/movie.json",
    book_url : "https://openapi.naver.com/v1/search/book.json"

}

// 다른 모듈에서 require를 수행하여
// 선언된 변수를 사용할 수 있도록 모듈로 생성하는 코드
module.exports = naver