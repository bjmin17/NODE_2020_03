// 지금부터 이 문서는 React의 컴포넌트다
import React, { Component } from "react";
import RCC_SUB from "./RCC_SUB";
import "./RCC.css";

/*
ES6의 class 문법으로 컴포넌트 생성
보통 jsx(js) 파일의 형식으로 저장
가급적 파일의 첫글자, 클래스의 첫글자는 대문자로
파일 이름과 클래스 이름을 일치하는게 좋다
모든 따옴표는 큰따옴표로 통일하자
클래스는 1개의 파일에 1개만 작성할 수 있다.
*/
class RCC extends Component {
  render() {
    return (
      <div>
        <div className="myDiv">나는 첫번째 RCC 컴포넌트</div>
        <RCC_SUB name="홍길동" />
      </div>
    );
  }
}

// 이 컴포넌트를 외부에서 사용할 수 있도록 선언
// export default는 한 파일에 한개만 있을 수 있다.
export default RCC;
