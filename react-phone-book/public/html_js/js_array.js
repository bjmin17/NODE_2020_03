// arr 배열의 각 요소 값을 개별 변수에 담아서 사용하고 싶을때
var arr = ["홍길동", "이몽룡", "성춘향", "라푼젤"];
// ES5 이하의 old version
// var hong = arr[0];
// var lee = arr[1];
// var seong = arr[2];
// var rha = arr[3];

const [hong, lee, seong, rha] = arr;
console.log("hong", hong);
console.log("lee", lee);
console.log("seong", seong);
console.log("rha", rha);

const names = { name: "홍기동", phone: "1234", addr: "서울특별시" };

// 과거엔
// var name = names.name 또는
// name = names["name"] 이 방법으로 하나하나 다 담아줬어야 한다.

// 객체의 분해
const { name, addr, phone } = names;

console.log(name);
console.log(phone);
console.log(addr);

// [name]이란 변수에 담겨있는 문자열로 객체 이름을 만들어라
const my = { [name]: "홍길동", 주소: "서울특별시" };
console.log(my.홍기동);
console.log(my.주소);
