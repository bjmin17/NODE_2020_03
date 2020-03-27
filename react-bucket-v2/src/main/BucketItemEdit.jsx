import React, { Component } from "react";
import Moment from "react-moment";
import BucketContext from "../provider/BucketProvider";

class BucketItemEdit extends Component {
  state = {
    bucket_title: ""
  };

  static contextType = BucketContext;

  /*
  view 모드에서 edit모드로 변경될 때
  input box에 view 모드에서 보았던 문자열(title)을
  state 변수에 담아 주는 부분이 필요하다.
  */
  componentDidMount() {
    const { bucketItem } = this.props;
    this.setState({
      bucket_title: bucketItem.b_title
    });
  }

  onChange = ev => {
    this.setState({
      bucket_title: ev.target.value
    });
  };

  onKeyPress = ev => {
    const { bucket_update } = this.context;
    const { bucketItem, onEditing } = this.props;
    const { bucket_title } = this.state;

    if (ev.key === "Enter") {
      // alert(this.state.bucket_title);
      // 현재 리스트의 id값과 새로 입력한 버킷 문자열을
      // Main으로 전송하여 update를 수행하도록 실시

      bucket_update(bucketItem.b_id, bucket_title);
      onEditing();
    }
  };

  noClick = ev => {
    ev.stopPropagation();
  };

  render() {
    const { bucketItem } = this.props;
    return (
      <React.Fragment>
        <td>{bucketItem.b_flag_text}</td>
        <td>
          <Moment format="YYYY-MM-DD">{bucketItem.b_start_date}</Moment>
        </td>
        <td onClick={this.changeEdit}>
          {/*
          input box에서 기존 b_title 값을 변경하도록 할텐데
          그럴려면 value 옵션에 state 형 변수를 포함해야 한다.
          그래야만 onChange 이벤트에서 키보드로 입력한 내용을 정상적으로 input에 보여주도록 할 수 있기 때문에

          그러나, state.bucket_title은 초기 값이 ""인 비어있는 값이다.
          그럼 props로 전달받은 b_title을 state.bucket_title에 주입하여 보여주고 수정할 수 있도록 해야 하는데
          props로 받은 값을 state형 변수에 주입하기 위해서는 LifeCycle method 중에서 componentDidUpdate() 에서 처리를 해 주어야 한다.
          */}
          <input
            onKeyPress={this.onKeyPress}
            onChange={this.onChange}
            value={this.state.bucket_title}
            onClick={this.noClick}
          />
        </td>
        <td>
          {/*
          
          // react에서 조건별로 tag를 표시하고자 할 때
          { 검사값 ? ( true 일때) : (false 일때)}
  
          */}
          {bucketItem.b_end_date !== "" ? (
            <Moment format="YYYY-MM-DD">{bucketItem.b_end_date}</Moment>
          ) : (
            "◎"
          )}
        </td>
        <td>
          <input type="checkbox" value={bucketItem.b_cancel} />
        </td>
        <td></td>
      </React.Fragment>
    );
  }
}

export default BucketItemEdit;
