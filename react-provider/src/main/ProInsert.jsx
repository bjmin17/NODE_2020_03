import React, { Component } from "react";
import MPro from "../provider/MessageProvider";
import ProFunction from "./ProFunction";

class ProInsert extends Component {
  state = {
    message: "나는 Insert 컴포넌트 "
  };

  static contextType = MPro;

  // 키보드에서 입력을 하면 입력받은 문자열을
  // this.state.message에 저장해달라

  // handleChange에서 this.state.message를 변경하면
  // 현재 컴포넌트 어디에 this.state.message가 있던 상관없이
  // 동시에 변경된 값이 표현된다.
  handleChange = ev => {
    this.setState({
      message: ev.target.value
    });
  };

  // Main -> Sub2 -> 나에게 전달된 changeMessage 메서드를
  // 호출하여 지금부터 내가 보내는 문자열을 전체 컴포넌트가
  // 공유하는 message 변수에 적용하라
  messageSend = () => {
    // this.props.changeMessage("무언가");
    this.context.changeMessage(this.state.message);
  };

  render() {
    const { props } = this;
    const { message } = this.state;
    return (
      <div>
        <h5>입력박스</h5>
        <p>{this.props.message}</p>
        <label>문자열을 입력하세요</label>
        {/* 
        react에서 input box를 사용하려면
        1. 먼저 value에 포함시킬 state 변수를 선언하고
        2. value={this.state.변수} 라고 작성을 하고
        3. onChange 이벤트를 캡처하여 키보드에서 입력된 문자열을
            this.state.변수에 this.setState()(반영을) 시킨다.
        */}
        <input value={this.state.message} onChange={this.handleChange} />
        <button onClick={this.messageSend}>전달</button>
        <p>{message}</p>
        <h4>함수방식 컴포넌트 가져오기</h4>
        <ProFunction />
      </div>
    );
  }
}

export default ProInsert;
