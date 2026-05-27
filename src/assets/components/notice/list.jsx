import React, { useState, useEffect } from 'react';

function NoticeList() {
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8080/notice/list")
            .then(response => {
                if (!response.ok) {
                    throw new Error("네트워크 응답이 올바르지 않습니다.");
                }
                return response.json();
            })
            .then(data => {
                setNotices(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Fetch error:", err);
                setError(err.message);
                setLoading(false);
            });
    }, []);

    // Styles for modern, premium look
    const containerStyle = {
        maxWidth: '1000px',
        margin: '40px auto',
        padding: '24px',
        fontFamily: "'Inter', 'Noto Sans KR', sans-serif",
        background: '#ffffff',
        borderRadius: '16px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
    };

    const headerStyle = {
        fontSize: '28px',
        fontWeight: '700',
        color: '#1a1d20',
        marginBottom: '24px',
        borderBottom: '2px solid #f1f3f5',
        paddingBottom: '12px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    };

    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
        textAlign: 'left',
        fontSize: '15px',
    };

    const thStyle = {
        padding: '16px 12px',
        fontWeight: '600',
        color: '#495057',
        borderBottom: '2px solid #dee2e6',
        background: '#f8f9fa',
    };

    const tdStyle = {
        padding: '16px 12px',
        color: '#495057',
        borderBottom: '1px solid #dee2e6',
    };

    const rowHoverStyle = {
        transition: 'background-color 0.2s ease',
        cursor: 'pointer',
    };

    const loadingStyle = {
        textAlign: 'center',
        padding: '40px',
        fontSize: '18px',
        color: '#868e96',
    };

    const errorStyle = {
        textAlign: 'center',
        padding: '40px',
        fontSize: '18px',
        color: '#fa5252',
    };

    const emptyStyle = {
        textAlign: 'center',
        padding: '40px',
        fontSize: '16px',
        color: '#868e96',
    };

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (e) {
            return dateString;
        }
    };

    if (loading) return <div style={loadingStyle}>데이터를 불러오는 중입니다...</div>;
    if (error) return <div style={errorStyle}>오류 발생: {error}</div>;

    return (
        <div style={containerStyle}>
            <div style={headerStyle}>
                <span>공지사항</span>
                <span style={{ fontSize: '14px', fontWeight: 'normal', color: '#868e96' }}>
                    전체 {notices.length}건
                </span>
            </div>
            
            {notices.length === 0 ? (
                <div style={emptyStyle}>등록된 공지사항이 없습니다.</div>
            ) : (
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={{ ...thStyle, width: '80px', textAlign: 'center' }}>번호</th>
                            <th style={thStyle}>제목</th>
                            <th style={{ ...thStyle, width: '120px' }}>작성자</th>
                            <th style={{ ...thStyle, width: '180px' }}>작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notices.map((notice, index) => (
                            <tr 
                                key={notice.id || index} 
                                style={rowHoverStyle}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f3f5'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                                <td style={{ ...tdStyle, textAlign: 'center', fontWeight: '500', color: '#868e96' }}>
                                    {notice.id}
                                </td>
                                <td style={{ ...tdStyle, fontWeight: '500', color: '#212529' }}>
                                    {notice.title}
                                </td>
                                <td style={tdStyle}>{notice.author}</td>
                                <td style={{ ...tdStyle, color: '#868e96' }}>
                                    {formatDate(notice.createdAt)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default NoticeList;