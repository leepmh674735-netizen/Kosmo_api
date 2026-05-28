import { BrowserRouter, Routes, Route } from "react-router-dom"; // 💡 라우터 컴포넌트 추가
import Header from "./layout/Header"; // 💡 상단 변수명과 일치하도록 조정
import Footer from "./layout/Footer"; // 💡 상단 변수명과 일치하도록 조정

// 💡 하단 주소(path)에서 사용할 실제 컴포넌트들도 import 해주어야 합니다.
import NoticeList from "./components/NoticeList"; 
import Login from "./components/Login"; 

function App() {
  return (
    // 1. 라우팅 기능을 활성화하기 위해 최상위를 BrowserRouter로 감싸줍니다.
    <BrowserRouter>
      {/* 2. 전체를 하나의 큰 부모 요소(<></> 또는 <div>)로 감싸줍니다. */}
      <>
        {/* 상단 레이아웃 (내용이 없으므로 깔끔하게 self-closing 적용) */}
        <Header />
        
        {/* 3. Routes 안에는 Route 컴포넌트만 올바르게 위치해야 합니다. */}
        <Routes>
          {/* element={} 내부에는 정상적인 컴포넌트 형태(<NoticeList />)로 작성합니다. */}
          <Route path="/notice/list" element={<NoticeList />} />
          <Route path="/member/login" element={<Login />} />
		  <Route path="/notice/detail" element={<NotDetail />} />
        </Routes>
        
        {/* 하단 레이아웃 */}
        <Footer />
      </>
    </BrowserRouter>
  );
}

export default App;