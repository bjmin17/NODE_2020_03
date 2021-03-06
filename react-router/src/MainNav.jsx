import React from "react";
import { Link } from "react-router-dom";
/*
react-router-dom의 Link 컴포넌트
anchar tag와 같은 일을 수행하는 tag 컴포넌트인데
a tag와 차이점은 클릭을 했을 때 router 부분만 갱신을 하고
화면 전체는 새로고침을 하지 않는다.
*/

const MainNav = () => {
  return (
    <div>
      <ul className="nav">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/bbs" className="nav-link">
            BBs
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/bbs/list" className="nav-link">
            BBs LIST
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default MainNav;
