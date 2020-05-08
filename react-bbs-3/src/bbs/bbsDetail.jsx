import React, { Component } from "react";
import "../App.css";

class bbsDetail extends Component {
  state = {
    bbsDate: "",
    bbsAuth: "",
    bbsTitle: "",
    bbsText: "",
  };

  state = {
    bbsVO: {},
  };

  // 서버에게 bbsid값을 전달하고
  // bbs detail 정보를 가져와서
  // 나에게 보여달라
  bbsDetailFetch = () => {
    const bbsid = this.props.match.params.bbsid;
    fetch("http://localhost:8080/bbs/api/detail?bbsid=" + bbsid)
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        this.setState({
          bbsDate: result.bbsDate,
          bbsAuth: result.bbsAuth,
          bbsTitle: result.bbsTitle,
          bbsText: result.bbsText,

          bbsVO: result,
        });
      });
  };

  handleUpdate = (e, data) => {
    // 아이디 추출하고
    const bbsid = this.props.match.params.bbsid;

    // 누구한테 보낼것인가
    this.props.history.push("/bbsWrite/" + bbsid);
    //alert(data);
  };

  handleDelete = () => {
    const bbsid = this.props.match.params.bbsid;
    if (window.confirm("삭제하시겠습니까?")) {
      alert(bbsid);
      // fetch("http://localhost:8080/bbs/api/delete?bbsid=" + bbsid);
      fetch("http://localhost:8080/bbs/api/delete/" + bbsid)
        .then(this.props.history.push("/"))
        .catch((error) => alert(error));
    }
  };

  componentDidMount() {
    this.bbsDetailFetch();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  render() {
    const bbsid = this.props.match.params.bbsid;
    const { bbsVO } = this.state;
    const { bbsDate, bbsAuth, bbsTitle, bbsText } = this.state.bbsVO;
    return (
      <div className="detail_div">
        <h3>제목 : {bbsVO.bbsTitle}</h3>
        <h3>제목 : {bbsTitle}</h3>

        <h3>제목 : {this.state.bbsTitle}</h3>
        <div className="text-right">
          <span>작성일자 : {this.state.bbsDate} </span>
          <span>작성자 : {this.state.bbsAuth}</span>
        </div>
        <hr />
        <div style={{ height: "400px" }}>
          <p>내용 : {this.state.bbsText}</p>
        </div>
        <hr />
        <span
          className="toList w3-button w3-blue w3-margin"
          style={{ cursor: "pointer" }}
          onClick={this.handleUpdate}
        >
          수정
        </span>
        <span
          className="toList w3-button w3-red w3-margin"
          style={{ cursor: "pointer" }}
          onClick={this.handleDelete}
        >
          삭제
        </span>
        <span
          className="toList w3-button w3-green w3-margin"
          style={{ cursor: "pointer" }}
          onClick={(e) => this.props.history.push("/")}
        >
          목록으로 돌아가기
        </span>
      </div>
    );
  }
}

export default bbsDetail;
