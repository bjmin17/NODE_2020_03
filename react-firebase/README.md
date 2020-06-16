# React 기반 firebase 연동 프로젝트

- Realtime Database와 hosting을 연동하여 Deploy하는 프로젝트 수행

## firebase 연동 프로젝트 수행

- npm install -g firebase-tools
- fireabse login 수행

## 현재 프로젝트에 firebase 설정

- firebase Console에 프로젝트를 생성하고, 앱을 등록한 후
- firebase Console에서 앱 설정과 관련된 스크립트 복사하여 src/config/firebaseConfig.js 파일에 복사 붙여넣기

- firebase init
- database, hosting 두개만 선택, 설정할 예정.

* yarn add firebase 설치

## firebase에 Deploy 하기

- yarn build 수행하여 프로젝트 빌드

* firebase deploy 수행하여 프로젝트 deploy

## deploy script 추가

- project root의 package.json 파일에 다음 스크립트 추가
  ,
  "deploy": "react-scripts build && firebase deploy"
  },

* npm run deploy 또는 yarn deploy

## firebase.json 수정

- hosting, public : "public" 을 public : "build"로 변경

## project에 bootstrap 설정

- yarn add bootstrap@4
- yarn add reactstrap
- yarn add react-addons-transition-group
- yarn add react-addons-css-transition-group

- src/index.js 파일에
- import "bootstrap/dist/css/bootstrap.css"; 설정

## react router 설치

- yarn add react-router
- yarn add react-router-dom

## js에서 사용하는 날짜관련 dependency 설치

- yarn add moment
- yarn add moment-timezone
- yarn add react-moment
