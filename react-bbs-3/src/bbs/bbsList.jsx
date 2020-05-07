import React, { Component } from "react";
import BBsItem from "./bbsItem";

class bbsList extends Component {
  render() {
    const { bbsList } = this.props;

    const bbsMap = bbsList.map((bbsVO) => {
      return <BBsItem key={bbsVO.id} bbsVO={bbsVO} />;
    });

    return <div>{bbsMap}</div>;
  }
}

export default bbsList;
