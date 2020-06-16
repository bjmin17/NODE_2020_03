import React, { Component } from "react";
import { database } from "../config/firebaseConfig";

class BBsList extends Component {
  state = {
    bbsList: [],
  };

  // db 읽어와서 List에 뿌려줄 LifeCycle method
  componentDidMount() {
    const bbsList = [];
    database
      .ref("bbs")
      .bbsList.on("value")
      .then((result) => {
        result.forEach((item) => {
          resultList.push(item.val());
        });
        console.log(resultList);
      });
    this.setState({ bbsList: { ...resultList } });
  }

  render() {
    const bbsMap = bbsList.map((bbs) => {
      return <p>{bbs.b_title}</p>;
    });

    return <div>{bbsMap}</div>;
  }
}

export default BBsList;
