var username = {login:true, userid:"korea"}

// str에는 userid값이 담긴다.
// username 값이 있는지 찾고, 있으면 username.login을 찾고, 있으면 username.userid를 찾아서 변수에 담는다.
var str = username && username.login && username.userid

let n1 = 0
let n2 = 0
// n1이 1로 true가 되면서 뒤에 조건은 건너 뛰기 때문에 n1은 1, n2는 0
let sum = ++n1 >0 || ++n2 > 0? n1, n2