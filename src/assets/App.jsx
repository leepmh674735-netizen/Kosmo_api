

import React from 'react';
import NoticeList from './NoticeList'; // 1. 방금 만든 NoticeList 컴포넌트를 임포트합니다.

function App() {
    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h1>Winter 웹 프로젝트 🚀</h1>
            </header>

            <main style={styles.main}>
                {/* 2. 화면에 공지사항 목록 컴포넌트를 조립해 줍니다. */}
                <NoticeList />
            </main>
        </div>
    );
}

// 간단한 스타일링 (선택사항, 필요 없으면 지우셔도 됩니다)
const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
    },
    header: {
        borderBottom: '2px solid #333',
        paddingBottom: '10px',
        marginBottom: '20px',
    },
    main: {
        backgroundColor: '#f9f9f9',
        padding: '20px',
        borderRadius: '8px',
    }
};

export default App; // 3. 최상위 컴포넌트로 내보냅니다.
export default Test;