import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css' // 💡 전역 브라우저 스타일 초기화 파일 임포트

// HTML 파일(index.html)에 있는 <div id="root"> 태그를 찾아 리액트 엔진을 주입합니다.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 최상위 컴포넌트인 App을 실행합니다. */}
    <App />
	<Brower></Brower>
  </React.StrictMode>,
)