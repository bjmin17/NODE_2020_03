import Moment from "react-moment";
import React, { Component } from "react";
import BucketContext from "../provider/BucketProvider";

class BucketItemView extends Component {
  static contextType = BucketContext;

  changeEdit = () => {
    this.props.onEditing();
  };

  handleChangeFlag = ev => {
    ev.stopPropagation();
    // this.props.changeFlag(this.props.bucketItem.b_id);

    /*
    전달받은 changeFlag와 bucketItem을 잘 살펴봐야 한다.
    bucketItem : 바로 위(BucketItem)에서 전달받은 state형 변수이고
    changeFlag : Main에서 여기까지 전달되어온 handler method

    분해를 할 때 주체가 누구인가를 명확히 구별해야 한다.
    bucketItem은 this.props로부터
    changeFlag는 this.context로부터 분리를 해야 한다.
    */

    const { bucketItem } = this.props;
    const { changeFlag } = this.context;
    changeFlag(bucketItem.b_id);
  };

  onComplete = ev => {
    ev.stopPropagation();
    const { bucket_complete } = this.context;
    const { b_id, b_end_date } = this.props.bucketItem;

    if (b_end_date === "") {
      if (!window.confirm("꿈을 이루었습니까?")) {
        return false;
      }
    } else {
      if (!window.confirm("버킷 리스트를 다시 시작할까요?")) {
        return false;
      }
    }
    // 해당 항목을 완료로 처리
    bucket_complete(b_id, b_end_date);
  };

  render() {
    const { bucketItem } = this.props;
    const td_style = {
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#FF00FF",
        textDecoration: "underline"
      }
    };

    return (
      <React.Fragment>
        <td style={td_style} onClick={this.handleChangeFlag}>
          {bucketItem.b_flag_text}
        </td>
        <td>
          {bucketItem.b_id} :
          <Moment format="YYYY-MM-DD">{bucketItem.b_start_date}</Moment>
        </td>
        <td style={td_style} onClick={this.changeEdit}>
          {bucketItem.b_title}
        </td>
        <td style={td_style} onClick={this.onComplete}>
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

export default BucketItemView;
