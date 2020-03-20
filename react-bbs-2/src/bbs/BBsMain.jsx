import React, { Component } from "react";
// import PropTypes from "prop-types";
import BBsList from "./BBsList";
import BBsInsert from "./BBsInsert";

const BBS_MAIN_URL = "http://localhost:5000/bbs";
const BBS_INSERT_URL = "http://localhost:5000/bbs/insert";

class BBsMain extends Component {
  // 생성자를 생성하겠다는 신호
  // 1. 생성자 만들어서 사용하는 방법
  //   constructor(props) {
  //     super(props);
  //     this.timer = null;
  //     this.state = {
  //       isFetch: false,
  //       bbsList: []
  //     };
  //   }

  // 2. 생성자 없이 변수 선언해서 사용하는 방법
  timer = "";
  state = {
    isFetch: false,
    bbsList: []
  };
  componentDidMount() {
    this.fetchBBSList();
    // setInterval( callback, timer)
    // 이전에 callback 함수가 종료되고
    // timer 시간이 경과하면 다시 반복하여 실행하라
    this.timer = setInterval(() => this.fetchBBSList(), 5000);
  }

  // 혹시 화면에 그려지는 여러 컴포넌트들의 연결이 깨지면
  // 실행되는 method인데
  // timer가 계속 작동되면 react 실행이 deadlock에 빠질 수 있기 때문이다.
  // 반드시 WillUnMouse() method에서
  // timer를 멈추어주어야 한다.
  componentWillUnmount() {
    this.timer = null;
  }

  /*
  BBs 서버에서 리스트를 조회하여 오는 method
  */

  fetchBBSList = () => {
    this.setState({ ...this.state, isFetch: true });

    // ES6에 새로운 Ajax method가 있는데
    // 새로운 method를 사용해서 데이터를 조회해오기
    fetch(BBS_MAIN_URL)
      .then(response => {
        // (문자열형으로 리턴된) 가져온 데이터를
        // json type으로 변환하여 return
        // 다음의 then result 변수에 주입이 된다.
        return response.json();
      })
      .then(result => {
        this.setState({
          bbsList: result,
          isFetch: false
        });
      })
      // 에러가 나면 콘솔에 에러를 표시해라
      .catch(error => console.log(error));
  };

  //   shouldComponentUpdate(nextProps, nextState) {}

  render() {
    /*
    state에 선언된 변수를 사용하려면
    {this.state.bbsList} 와 같이 사용해야 하는데

    필드영역에 선언된 this.state를 분해하여
    그 중에 bbsList를 별도로 추출을 해 두면
    tag 코드에서 사용할 때 {bbsList} 형식으로 사용할 수 있다.
    */
    const { bbsList } = this.state;
    return (
      <div className="w3-container">
        <header className="w3-green w3-padding-32 w3-center">
          <h2>BBS 2020</h2>
          <p>BBS 2020 client with React</p>
        </header>
        <section className="w3-container">
          {/* <BBsList bbsList={this.state.bbsList} /> 는 위에서 bbsList를 선언하면서 아래처럼 바뀜*/}
          <p className="w3-container w3-gray">
            {this.state.isFetch ? "데이터 가져오는중..." : "완료..."}
          </p>
          <BBsInsert bbs_insert_url={BBS_MAIN_URL} />
          <BBsList bbsList={bbsList} bbs_main_url={BBS_MAIN_URL} />
        </section>
      </div>
    );
  }
}

// BBsMain.propTypes = {};

export default BBsMain;
