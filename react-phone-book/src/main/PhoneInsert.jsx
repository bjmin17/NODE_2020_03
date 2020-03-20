import React, { Component } from "react";

class PhoneInsert extends Component {
  state = {
    name: "",
    phone: ""
  };

  /*
  react에서 input box는 HTML에서와 달리 직접 값을 입력할 수 있는
  도구가 아니다.
  때문에 input box의 onChange 이벤트를 선언하여 입력된 문자열을 현재 클래스에 선언된 state 변수에 담는 코딩이 필요하다.

  */
  handleChange = e => {
    // 위의 state에 선언된 name 변수를 여기서 쓰겠다.
    // const { name } = this.state;
    // [e.target.name] 현재 태그의 name 값을 가져와서 객체 이름으로 만들어라
    this.setState({ [e.target.name]: e.target.value });
  };

  //   my_value_change = () => {
  //     const { name } = this.props;
  //     this.setState({ name: "대한민국" });
  //   };

  handleClick = e => {
    const { my_value_change } = this.props;
    my_value_change(this.state.name);
  };

  render() {
    const { my_value } = this.props;

    return (
      <form>
        <input
          value={this.state.name}
          onChange={this.handleChange}
          placeholder="이름을 입력.."
          name="name"
        />
        <input
          value={this.state.phone}
          onChange={this.handlePhoneChange}
          placeholder="전화번호.."
          name="phone"
        />
        <button type="button" onClick={this.handleClick}>
          저장
        </button>
        <p>insert에서 my_value : {my_value}</p>
        <p>{this.state.my_value}</p>
      </form>
    );
  }
}

export default PhoneInsert;
