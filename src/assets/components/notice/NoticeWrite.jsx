import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, X, AlertCircle } from 'lucide-react';
import './NotList.css';

function NoticeWrite({ user }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        category: '일반',
        author: user?.name || '관리자',
        isPinned: false,
        title: '',
        content: ''
    });
    const [errors, setErrors] = useState({ title: '', content: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.title.trim()) newErrors.title = '공지사항 제목을 입력해 주세요.';
        if (!formData.content.trim()) newErrors.content = '공지사항 내용을 입력해 주세요.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        setIsSubmitting(true);

        const params = new URLSearchParams(formData);

        try {
            const response = await fetch('http://localhost:8080/notice/create', {
                method: 'POST',
                body: params
            });
            if (Number(await response.text()) > 0) {
                alert('공지사항이 성공적으로 등록되었습니다.');
                navigate('/notice/list');
            } else {
                alert('등록에 실패했습니다.');
            }
        } catch (err) {
            console.error(err);
            alert('등록 중 오류가 발생했습니다.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="write-container fade-in">
            <button onClick={() => navigate('/notice/list')} className="back-btn">
                <ArrowLeft size={16} /> 목록으로 돌아가기
            </button>

            <div className="write-card">
                <div className="write-header">
                    <h2>📢 공지사항 작성</h2>
                    <span>새로운 소식을 고객들에게 공유하세요.</span>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>구분</label>
                            <select name="category" value={formData.category} onChange={handleChange}>
                                <option value="일반">일반 공지</option>
                                <option value="이벤트">이벤트 소식</option>
                                <option value="중요">중요 안내</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>작성자</label>
                            <input type="text" name="author" value={formData.author} disabled className="disabled-input" />
                        </div>
                    </div>

                    <div className="checkbox-wrapper">
                        <label>
                            <input type="checkbox" name="isPinned" checked={formData.isPinned} onChange={handleChange} />
                            게시판 상단에 고정하기 (중요 공지)
                        </label>
                    </div>

                    <div className="form-group">
                        <label>공지 제목</label>
                        <input type="text" name="title" placeholder="제목을 입력하세요" value={formData.title} onChange={handleChange} className={errors.title ? 'input-error' : ''} />
                        {errors.title && <span className="error-text"><AlertCircle size={14} /> {errors.title}</span>}
                    </div>

                    <div className="form-group">
                        <div className="label-space">
                            <label>공지 내용</label>
                            <span className="char-count">{formData.content.length} 자</span>
                        </div>
                        <textarea name="content" placeholder="내용을 입력해주세요." value={formData.content} onChange={handleChange} className={errors.content ? 'input-error' : ''} />
                        {errors.content && <span className="error-text"><AlertCircle size={14} /> {errors.content}</span>}
                    </div>

                    <div className="action-buttons">
                        <button type="button" onClick={() => navigate('/notice/list')} disabled={isSubmitting} className="btn-cancel"><X size={16} /> 취소</button>
                        <button type="submit" disabled={isSubmitting} className="btn-submit"><Save size={16} /> {isSubmitting ? '등록 중...' : '등록하기'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NoticeWrite;
export { NoticeWrite as NoticeWhite };