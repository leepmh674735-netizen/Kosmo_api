import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { fetchAPI } from './api';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-black text-blue-600 tracking-tight">toss stock</Link>
        <nav className="flex items-center space-x-6 text-sm font-semibold text-slate-600">
          <Link to="/board" className="hover:text-slate-900 transition-colors">게시판</Link>
          <Link to="/notice" className="hover:text-slate-900 transition-colors">공지사항</Link>
          {user ? (
            <div className="flex items-center gap-4 border-l border-slate-100 pl-6">
              <span className="text-slate-800 font-bold">{user.nickname}님</span>
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-all duration-150"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3 border-l border-slate-100 pl-6">
              <Link
                to="/login"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-all duration-150 shadow-sm"
              >
                로그인
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

const Home = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('volume'); // 'volume' or 'undervalued'
  const [volumeStocks, setVolumeStocks] = useState([]);
  const [undervaluedStocks, setUndervaluedStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadData = async () => {
    setLoading(true);
    setError(false);
    try {
      if (activeTab === 'volume') {
        const res = await fetchAPI('/api/kis/volume-rank');
        if (res && res.rt_cd === '0' && Array.isArray(res.output)) {
          setVolumeStocks(res.output);
        } else {
          setError(true);
        }
      } else {
        const res = await fetchAPI('/api/kis/undervalued');
        if (Array.isArray(res)) {
          setUndervaluedStocks(res);
        } else {
          setError(true);
        }
      }
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [activeTab]);

  return (
    <div className="space-y-6 max-w-lg mx-auto">
      {/* Welcome Banner */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm text-center">
        <h1 className="text-3xl font-black text-blue-600 tracking-tight mb-2">Toss Stock Vibe</h1>
        <p className="text-xs text-slate-400 font-semibold mb-4">실시간 한국투자증권 오픈 API 연동 주가 보드</p>
        
        {user ? (
          <div className="p-3 bg-blue-50/50 rounded-2xl text-xs text-blue-800 border border-blue-100/50 font-bold">
            <span className="text-blue-600">{user.nickname}</span>님, 오늘도 성공적인 투자를 기원합니다!
          </div>
        ) : (
          <div className="p-3 bg-slate-50 rounded-2xl text-xs text-slate-500 font-medium">
            로그인하시면 게시판 및 공지사항을 확인할 수 있습니다.
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex bg-slate-100 p-1 rounded-2xl">
        <button
          onClick={() => setActiveTab('volume')}
          className={`w-1/2 py-2.5 text-xs font-bold rounded-xl transition-all ${activeTab === 'volume' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
        >
          실시간 거래량 상위 10
        </button>
        <button
          onClick={() => setActiveTab('undervalued')}
          className={`w-1/2 py-2.5 text-xs font-bold rounded-xl transition-all ${activeTab === 'undervalued' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
        >
          기본적 분석 저평가 10
        </button>
      </div>

      {/* Content */}
      <div className="space-y-3">
        {loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm animate-pulse flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100" />
                  <div className="space-y-2">
                    <div className="h-4 w-24 bg-slate-100 rounded" />
                    <div className="h-3 w-16 bg-slate-100 rounded" />
                  </div>
                </div>
                <div className="h-6 w-16 bg-slate-100 rounded" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="bg-white rounded-3xl p-8 border border-red-100 shadow-sm text-center space-y-3">
            <div className="text-3xl">⚠️</div>
            <h3 className="font-bold text-slate-800 text-sm">데이터 조회 실패</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              한국투자증권 API 키 및 서버 연결 상태를 확인해 주세요.<br />
              (실패 시 기본 더미 종목 및 비상장 대안 데이터는 표시되지 않습니다.)
            </p>
            <button
              onClick={loadData}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all"
            >
              다시 시도
            </button>
          </div>
        ) : activeTab === 'volume' ? (
          <div className="space-y-3">
            {volumeStocks.map((stock, idx) => {
              const isUp = stock.prdy_vrss_sign === '1' || stock.prdy_vrss_sign === '2';
              const isDown = stock.prdy_vrss_sign === '4' || stock.prdy_vrss_sign === '5';
              const changeColor = isUp ? 'text-red-500' : isDown ? 'text-blue-500' : 'text-slate-500';
              const changeBg = isUp ? 'bg-red-50' : isDown ? 'bg-blue-50' : 'bg-slate-50';
              const sign = isUp ? '+' : '';

              return (
                <div key={stock.mksc_shrn_iscd} className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm transition-all flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-600">
                      {idx + 1}
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-slate-800 text-sm">{stock.hts_kor_isnm}</div>
                      <div className="text-[10px] text-slate-400 font-semibold">{stock.mksc_shrn_iscd}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-extrabold text-slate-900 text-sm">
                      {Number(stock.stck_prpr).toLocaleString()}원
                    </div>
                    <div className={`inline-flex items-center gap-0.5 text-[9px] font-bold px-1.5 py-0.5 rounded-md mt-0.5 ${changeBg} ${changeColor}`}>
                      {isUp ? '▲' : isDown ? '▼' : ''} {Number(stock.prdy_vrss).toLocaleString()} ({sign}{stock.prdy_ctrt}%)
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-3">
            {undervaluedStocks.map((stock, idx) => (
              <div key={stock.code} className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm transition-all text-left space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center font-bold text-xs text-blue-600">
                      {idx + 1}
                    </div>
                    <div>
                      <div className="font-bold text-slate-800 text-sm">{stock.name}</div>
                      <div className="text-[10px] text-slate-400 font-semibold">{stock.code}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-extrabold text-slate-900 text-sm">
                      {Number(stock.price).toLocaleString()}원
                    </div>
                    <div className="text-[9px] font-bold text-slate-400 mt-0.5">
                      가치점수: <span className="text-blue-600 font-black">{stock.score.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                {/* Financial Indicators Grid */}
                <div className="grid grid-cols-4 gap-2 pt-2 border-t border-slate-50 text-[10px] font-semibold text-slate-500">
                  <div className="bg-slate-50 p-2 rounded-xl text-center">
                    <div className="text-slate-400 text-[9px]">PER</div>
                    <div className="text-slate-800 font-bold mt-0.5">{stock.per.toFixed(2)}배</div>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-xl text-center">
                    <div className="text-slate-400 text-[9px]">PBR</div>
                    <div className="text-slate-800 font-bold mt-0.5">{stock.pbr.toFixed(2)}배</div>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-xl text-center">
                    <div className="text-slate-400 text-[9px]">EPS</div>
                    <div className="text-slate-800 font-bold mt-0.5">{Math.round(stock.eps).toLocaleString()}원</div>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-xl text-center">
                    <div className="text-slate-400 text-[9px]">BPS</div>
                    <div className="text-slate-800 font-bold mt-0.5">{Math.round(stock.bps).toLocaleString()}원</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Menu */}
      <div className="flex gap-3">
        <Link to="/board" className="w-1/2 py-3.5 bg-blue-600 text-white rounded-2xl font-bold text-xs text-center hover:bg-blue-700 transition-colors shadow-md shadow-blue-50 active:scale-[0.98]">
          자유게시판 가기
        </Link>
        <Link to="/notice" className="w-1/2 py-3.5 bg-slate-100 text-slate-700 rounded-2xl font-bold text-xs text-center hover:bg-slate-200 transition-colors active:scale-[0.98]">
          공지사항 가기
        </Link>
      </div>


    </div>
  );
};

const Board = () => (
  <div className="p-8 max-w-md mx-auto bg-white rounded-3xl shadow-sm mt-10 border border-slate-50 text-center">
    <h2 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">자유게시판</h2>
    <p className="text-slate-500 text-sm mb-6">아직 작성된 글이 없습니다.</p>
    <Link to="/" className="text-blue-600 font-bold text-sm hover:underline">홈으로 돌아가기</Link>
  </div>
);

const Notice = () => {
  const { user } = useAuth();
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [writing, setWriting] = useState(false);

  const [expandedNoticeId, setExpandedNoticeId] = useState(null);

  const loadNotices = async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAPI('/notice/list');
      setNotices(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || '공지사항을 가져오는 데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotices();
  }, [user]);

  const handleWriteSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    setWriting(true);
    try {
      await fetchAPI('/notice/create', {
        method: 'POST',
        body: { title, content }
      });
      setTitle('');
      setContent('');
      setShowWriteModal(false);
      loadNotices();
    } catch (err) {
      alert(err.message || '등록에 실패했습니다.');
    } finally {
      setWriting(false);
    }
  };

  if (!user) {
    return (
      <div className="p-8 max-w-md mx-auto bg-white rounded-3xl shadow-sm mt-10 text-center border border-slate-50">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 text-2xl font-bold mb-3">
          🔒
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2 tracking-tight">로그인이 필요합니다</h2>
        <p className="text-slate-500 text-xs font-semibold mb-6 leading-relaxed">
          공지사항 게시판을 이용하시려면 로그인이 필요합니다.
        </p>
        <Link to="/login" className="inline-block py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-xs transition-all duration-150 active:scale-[0.98]">
          로그인하러 가기
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mt-4 text-center">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
        <div className="text-left">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight font-sans">공지사항</h2>
          <p className="text-[11px] text-slate-400 font-bold mt-1">시스템 공지사항 및 최근 소식</p>
        </div>
        <button
          onClick={() => setShowWriteModal(true)}
          className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all duration-150 active:scale-[0.98]"
        >
          공지 등록
        </button>
      </div>

      {loading ? (
        <div className="text-center py-10">
          <div className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <p className="text-slate-400 text-xs font-bold mt-2">로딩 중...</p>
        </div>
      ) : error ? (
        <div className="text-center py-10 space-y-3">
          <p className="text-red-500 text-sm font-semibold">{error}</p>
          <button onClick={loadNotices} className="px-3.5 py-1.5 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-200">다시 시도</button>
        </div>
      ) : notices.length === 0 ? (
        <div className="text-center py-12 text-slate-400 text-sm font-semibold">
          등록된 공지사항이 없습니다.
        </div>
      ) : (
        <div className="space-y-3">
          {notices.map((notice) => {
            const isExpanded = expandedNoticeId === notice.id;
            return (
              <div 
                key={notice.id} 
                className="border border-slate-100 rounded-2xl overflow-hidden transition-all duration-200 hover:border-slate-200"
              >
                <div 
                  onClick={() => setExpandedNoticeId(isExpanded ? null : notice.id)}
                  className="p-4 bg-slate-50/20 hover:bg-slate-50/50 cursor-pointer flex items-center justify-between transition-colors duration-150"
                >
                  <div className="text-left">
                    <h3 className="font-bold text-slate-800 text-sm">{notice.title}</h3>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1.5 font-bold">
                      <span>작성자: {notice.author}</span>
                      <span>•</span>
                      <span>{notice.createAt ? new Date(notice.createAt).toLocaleDateString() : '-'}</span>
                    </div>
                  </div>
                  <span className={`text-[10px] text-slate-400 font-bold transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </div>

                {isExpanded && (
                  <div className="p-4 border-t border-slate-100 bg-white text-left text-xs text-slate-600 leading-relaxed whitespace-pre-wrap">
                    {notice.content}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {showWriteModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md border border-slate-100 shadow-xl space-y-4">
            <h3 className="text-base font-black text-slate-900 text-left">새 공지사항 등록</h3>
            
            <form onSubmit={handleWriteSubmit} className="space-y-4">
              <div className="space-y-1 text-left">
                <label className="text-[10px] font-bold text-slate-400 uppercase">제목</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="공지 제목을 입력하세요"
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 transition-all text-xs"
                />
              </div>

              <div className="space-y-1 text-left">
                <label className="text-[10px] font-bold text-slate-400 uppercase">내용</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="공지 내용을 입력하세요"
                  required
                  rows="5"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 transition-all text-xs resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowWriteModal(false)}
                  className="w-1/2 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-bold text-xs transition-all"
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={writing}
                  className="w-1/2 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-2xl font-bold text-xs transition-all shadow-md shadow-blue-50"
                >
                  {writing ? '등록 중...' : '등록'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const MainLayout = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="animate-spin inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-blue-600 rounded-full" role="status" aria-label="loading">
            <span className="sr-only">Loading...</span>
          </div>
          <p className="text-slate-500 text-xs font-semibold">정보를 가져오는 중입니다...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Header />
      <main className="max-w-4xl mx-auto px-6 py-10 w-full flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/board" element={<Board />} />
          <Route path="/notice" element={<Notice />} />
        </Routes>
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/*" element={<MainLayout />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;