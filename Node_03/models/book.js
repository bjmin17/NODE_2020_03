/*
js의 변수 선언자
var : 전역변수, 현재 모듈(*.js)어디에서나
    값을 읽고 쓸 수 있는 선언
const : 상수, 현재 모듈 어디에서나
    값을 읽을 수 있고
    최초 한번만 값을 할당할 수 있다.(java의 final)
let : 지역변수, 현재 함수내에서만
    값을 읽고 쓸 수 있으며, 함수를 벗어나면 변수가 해제된다.
*/

/*
BName : {
        // jQuery 타입으로 옵션을 추가할 수 있다.
        type:String,
        require:true, // not Null
        unique:true // UNIQUE
        trim:true // 문자열에 빈칸이 있으면 빈칸을 생략하는 옵션
        lowercase:true // 영 문자일 경우 모두 소문자로 추가하도록
    },
*/
var mong = require("mongoose")
var bookModel = mong.Schema({
    BName : {
        type:String,
        require:true,
        unique:true,
        trim:true
    },
    BComp : String,
    BWriter : String,
    BPrice : Number,
    BYear : {
        type:String,
        lowercase:true
    },

})

// mong에 있는 model을 호출해서 bookModel이라 설정된 부분을 book이라는 이름으로 테이블을 만들어라
/*
model()에 설정하는 document(book)이름을 반드시 단수로 지정한다.(하는 것이 좋다.)

실제 db에 저장될 때는 document 이름이 복수로 변경되어서 저장된다.
ex) mongo console에서 조회할 때는 다음과 같이 조회한다.
db.books.find({})
*/
module.exports = mong.model("book",bookModel)