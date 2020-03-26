import React, { Component } from "react";
import BucketItem from "./BucketItem";
import BucketInsert from "./BucketInsert";

class BucketList extends Component {
  render() {
    const { bucketList } = this.props;
    const list = bucketList.map(bucket => (
      <BucketItem
        key={bucket.b_id}
        bucket_update={this.props.bucket_update}
        bucketItem={bucket}
        changeFlag={this.props.changeFlag}
      />
    ));

    // const list1 = bucketList.map(bucket => {
    //   return <BucketItem key={bucket.id} bucketItem={bucket} />;
    // });

    // ES6 방식의 함수 만드는 코드
    // 기본 함수 코드
    const f1 = function(arg1, arg2) {
      return arg1 + arg2;
    };

    // 화살표 이용한 일반적인 함수, 화살표 함수 1
    const f2 = (arg, arg2) => {
      return arg + arg2;
    };

    // 화살표 이용해서 최대로 축약, 화살표 함수 2
    const f3 = (arg1, arg2) => arg1 + arg2;

    /* 
    bucket => (
      <BucketItem key={bucket.id} bucketItem={bucket} />
      callback 함수를 사용한 것.

    원칙은 
    const list1 = bucketList.map(bucket => {
        return <BucketItem key={bucket.id} bucketItem={bucket}
    })
    */
    return (
      <section className="w3-container-fluid">
        <table className="w3-table w3-table-all">
          <tr>
            <th>FLAG</th>
            <th>추가일자</th>
            <th>BUCKET</th>
            <th>완료</th>
            <th>비고</th>
            <th>취소</th>
          </tr>
          {list}
        </table>
      </section>
    );
  }
}

export default BucketList;
