import React, { useState } from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import { LogIn, UserPlus, Shield, Star, Award, AwardIcon, Compass, Sparkles, ClipboardList, CheckCircle2, Lock, Mail, ArrowRight, User } from 'lucide-react';
import Button from '../common/Button';

// Global state simulation for user authentication
let SIMULATED_USER = {
  isLoggedIn: false,
  name: '',
  email: '',
  level: '실버 멤버',
  points: 1200,
  joinedAt: '2026-05-28'
};

function MemberManager() {
  const [currentUser, setCurrentUser] = useState(SIMULATED_USER);

  const handleLogin = (name, email) => {
    const newUser = {
      isLoggedIn: true,
      name,
      email,
      level: '골든 르뱅 (VIP)',
      points: 5400,
      joinedAt: '2026-01-15'
    };
    SIMULATED_USER = newUser;
    setCurrentUser(newUser);
  };

  const handleLogout = () => {
    const defaultUser = {
      isLoggedIn: false,
      name: '',
      email: '',
      level: '실버 멤버',
      points: 0,
      joinedAt: ''
    };
    SIMULATED_USER = defaultUser;
    setCurrentUser(defaultUser);
  };

  return (
    <Routes>
      <Route path="/" element={currentUser.isLoggedIn ? <MyPage user={currentUser} onLogout={handleLogout} /> : <Login onLogin={handleLogin} />} />
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="/register" element={<Register onLogin={handleLogin} />} />
      <Route path="/mypage" element={<MyPage user={currentUser} onLogout={handleLogout} />} />
    </Routes>
  );
}

// 1. LOGIN COMPONENT
function Login({ onLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!email.trim()) newErrors.email = '이메일 주소를 입력해 주세요.';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = '올바른 이메일 형식이 아닙니다.';
    if (!password.trim()) newErrors.password = '비밀번호를 입력해 주세요.';
    else if (password.length < 4) newErrors.password = '비밀번호는 4자 이상이어야 합니다.';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    // Simulate login server delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate name extraction from email
    const name = email.split('@')[0];
    onLogin(name, email);
    setLoading(false);
    alert(`${name}님, 밀아틀리에에 오신 것을 환영합니다!`);
    navigate('/member/mypage');
  };

  return (
    <div className="container" style={{ padding: '60px 24px', display: 'flex', justifyContent: 'center' }}>
      <div 
        style={{
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          padding: '40px',
          maxWidth: '450px',
          width: '100%',
          boxShadow: 'var(--shadow-md)',
          border: '1px solid rgba(60, 42, 33, 0.08)'
        }}
        className="fade-in"
      >
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span style={{ fontSize: '32px' }}>🍞</span>
          <h3 className="text-gradient" style={{ fontSize: '24px', fontWeight: '800', marginTop: '8px', marginBottom: '6px' }}>밀아틀리에 로그인</h3>
          <p style={{ fontSize: '13px', color: 'var(--gray-600)' }}>더 많은 혜택과 예약을 위해 로그인해 주세요.</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--bg-coffee)' }}>이메일 계정</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)' }} />
              <input
                type="email"
                placeholder="example@mail.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if(errors.email) setErrors(prev=>({...prev, email: null})); }}
                style={{ width: '100%', padding: '12px 16px 12px 36px', borderRadius: 'var(--radius-md)', border: errors.email ? '1.5px solid var(--accent-rust)' : '1px solid var(--gray-300)', outline: 'none' }}
              />
            </div>
            {errors.email && <span style={{ color: 'var(--accent-rust)', fontSize: '12px' }}>{errors.email}</span>}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--bg-coffee)' }}>비밀번호</label>
              <a href="#" style={{ fontSize: '11px', color: 'var(--primary-gold)', fontWeight: '700' }}>비밀번호 분실?</a>
            </div>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)' }} />
              <input
                type="password"
                placeholder="비밀번호를 입력하세요 (4자 이상)"
                value={password}
                onChange={(e) => { setPassword(e.target.value); if(errors.password) setErrors(prev=>({...prev, password: null})); }}
                style={{ width: '100%', padding: '12px 16px 12px 36px', borderRadius: 'var(--radius-md)', border: errors.password ? '1.5px solid var(--accent-rust)' : '1px solid var(--gray-300)', outline: 'none' }}
              />
            </div>
            {errors.password && <span style={{ color: 'var(--accent-rust)', fontSize: '12px' }}>{errors.password}</span>}
          </div>

          <Button variant="primary" type="submit" fullWidth loading={loading} icon={<LogIn size={16} />}>
            로그인하기
          </Button>

          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              fontSize: '13px',
              color: 'var(--gray-600)',
              borderTop: '1px solid var(--gray-100)',
              paddingTop: '20px',
              marginTop: '8px'
            }}
          >
            아직 아틀리에 회원이 아니신가요?
            <Link to="/member/register" style={{ color: 'var(--secondary-brown)', fontWeight: '700', textDecoration: 'underline' }}>
              회원가입
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

// 2. REGISTER WIZARD COMPONENT
function Register({ onLogin }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // Step 1: Info, Step 2: Preferences, Step 3: Success
  const [formData, setFormData] = useState({ name: '', email: '', password: '', favoriteBread: '시그니처 우유 식빵', alertAllergy: false });
  const [errors, setErrors] = useState({});

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 1) {
      const newErrors = {};
      if (!formData.name.trim()) newErrors.name = '이름을 입력해주세요.';
      if (!formData.email.trim()) newErrors.email = '이메일 주소를 입력해주세요.';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = '이메일 형식이 바르지 않습니다.';
      if (!formData.password.trim()) newErrors.password = '비밀번호를 입력해주세요.';
      else if (formData.password.length < 4) newErrors.password = '비밀번호는 최소 4자 이상이어야 합니다.';

      setErrors(newErrors);
      if (Object.keys(newErrors).length > 0) return;
      setStep(2);
    }
  };

  const handleRegisterComplete = () => {
    onLogin(formData.name, formData.email);
    setStep(3);
  };

  return (
    <div className="container" style={{ padding: '60px 24px', display: 'flex', justifyContent: 'center' }}>
      <div 
        style={{
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          padding: '40px',
          maxWidth: '500px',
          width: '100%',
          boxShadow: 'var(--shadow-md)',
          border: '1px solid rgba(60, 42, 33, 0.08)'
        }}
        className="fade-in"
      >
        {/* Step Indicators */}
        {step < 3 && (
          <div style={{ display: 'flex', justify: 'center', gap: '8px', marginBottom: '32px' }}>
            <span style={{ width: '40px', height: '6px', borderRadius: '3px', backgroundColor: step >= 1 ? 'var(--primary-gold)' : 'var(--gray-200)' }}></span>
            <span style={{ width: '40px', height: '6px', borderRadius: '3px', backgroundColor: step >= 2 ? 'var(--primary-gold)' : 'var(--gray-200)' }}></span>
          </div>
        )}

        {step === 1 && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <h3 className="text-gradient" style={{ fontSize: '24px', fontWeight: '800' }}>아틀리에 회원가입</h3>
              <p style={{ fontSize: '13px', color: 'var(--gray-600)', marginTop: '4px' }}>기본 계정 정보를 등록해주세요.</p>
            </div>

            <form onSubmit={handleNextStep} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: '700' }}>이름</label>
                <input
                  type="text"
                  placeholder="홍길동"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: 'var(--radius-md)', border: errors.name ? '1.5px solid var(--accent-rust)' : '1px solid var(--gray-300)', outline: 'none' }}
                />
                {errors.name && <span style={{ color: 'var(--accent-rust)', fontSize: '12px' }}>{errors.name}</span>}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: '700' }}>이메일</label>
                <input
                  type="email"
                  placeholder="example@mail.com"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: 'var(--radius-md)', border: errors.email ? '1.5px solid var(--accent-rust)' : '1px solid var(--gray-300)', outline: 'none' }}
                />
                {errors.email && <span style={{ color: 'var(--accent-rust)', fontSize: '12px' }}>{errors.email}</span>}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: '700' }}>비밀번호</label>
                <input
                  type="password"
                  placeholder="비밀번호 설정 (4자 이상)"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: 'var(--radius-md)', border: errors.password ? '1.5px solid var(--accent-rust)' : '1px solid var(--gray-300)', outline: 'none' }}
                />
                {errors.password && <span style={{ color: 'var(--accent-rust)', fontSize: '12px' }}>{errors.password}</span>}
              </div>

              <Button variant="primary" type="submit" fullWidth icon={<ArrowRight size={16} />}>
                다음 단계로
              </Button>
            </form>
          </div>
        )}

        {step === 2 && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <h3 className="text-gradient" style={{ fontSize: '24px', fontWeight: '800' }}>취향 및 성분 맞춤 설정</h3>
              <p style={{ fontSize: '13px', color: 'var(--gray-600)', marginTop: '4px' }}>고객님께 딱 맞는 빵 추천을 제공하기 위한 맞춤 질문입니다.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '13px', fontWeight: '700' }}>가장 좋아하는 식빵 스타일</label>
                <select
                  value={formData.favoriteBread}
                  onChange={(e) => setFormData(prev => ({ ...prev, favoriteBread: e.target.value }))}
                  style={{ width: '100%', padding: '12px', border: '1px solid var(--gray-300)', borderRadius: 'var(--radius-md)', outline: 'none' }}
                >
                  <option value="시그니처 우유 식빵">깃털처럼 촉촉한 시그니처 생(生) 밀크 식빵</option>
                  <option value="고소한 트리플 치즈 식빵">짭조름하고 고소한 치즈 식빵</option>
                  <option value="소화 편한 통밀/천연발효종">속이 편하고 구수한 통밀 / 발효종 건강 식빵</option>
                  <option value="달콤한 초코/시나몬 식빵">오후의 간식으로 좋은 달콤 마블 식빵</option>
                </select>
              </div>

              <div style={{ padding: '14px', backgroundColor: 'rgba(210, 93, 56, 0.05)', border: '1px dashed var(--accent-rust)', borderRadius: 'var(--radius-md)' }}>
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '700', color: 'var(--bg-coffee)' }}>
                  <input
                    type="checkbox"
                    checked={formData.alertAllergy}
                    onChange={(e) => setFormData(prev => ({ ...prev, alertAllergy: e.target.checked }))}
                    style={{ width: '16px', height: '16px', accentColor: 'var(--accent-rust)', marginTop: '2px' }}
                  />
                  <div>
                    알레르기 경고 알림 설정하기
                    <span style={{ display: 'block', fontSize: '11px', color: 'var(--gray-600)', fontWeight: '500', marginTop: '4px' }}>
                      우유, 달걀, 밀, 호두 등 성분이 포함된 상품 상세 조회 시 알림 마크를 띄워 고객님의 안전한 브레드 쇼핑을 돕습니다.
                    </span>
                  </div>
                </label>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <Button variant="outline" style={{ flex: 1 }} onClick={() => setStep(1)}>이전 단계</Button>
                <Button variant="primary" style={{ flex: 1 }} onClick={handleRegisterComplete} icon={<UserPlus size={16} />}>회원가입 완료</Button>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div style={{ textAlign: 'center', padding: '10px 0' }} className="fade-in">
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--primary-gold-light)', color: 'var(--secondary-brown)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' }}>
              <CheckCircle2 size={36} />
            </div>
            <h3 className="text-gold-gradient" style={{ fontSize: '26px', fontWeight: '800', marginBottom: '8px' }}>가입을 축하합니다!</h3>
            <p style={{ fontSize: '14px', color: 'var(--gray-700)', lineHeight: '1.6', marginBottom: '28px' }}>
              <strong>{formData.name}</strong> 고객님, 밀아틀리에 정식 회원이 되셨습니다.<br />
              환영 적립금 <strong>1,200 포인트</strong>가 지금 지급되었습니다.
            </p>
            <Button variant="primary" style={{ padding: '12px 36px' }} onClick={() => navigate('/member/mypage')}>
              마이페이지로 이동
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

// 3. MY PAGE COMPONENT (USER DASHBOARD)
function MyPage({ user, onLogout }) {
  const navigate = useNavigate();

  return (
    <div className="container fade-in" style={{ padding: '40px 24px', maxWidth: '900px' }}>
      <div className="section-header">
        <span className="font-serif" style={{ fontSize: '14px', color: 'var(--primary-gold)', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase' }}>MY ATELIER</span>
        <h2 className="text-gradient">마이 페이지</h2>
        <p>고객님의 예약 내역, 적립 등급, 쿠폰 등을 한눈에 확인하세요.</p>
        <div className="divider"></div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', alignItems: 'start' }}>
        
        {/* User Status Profile Card */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: 'var(--radius-lg)', padding: '30px', border: '1px solid rgba(60, 42, 33, 0.08)', boxShadow: 'var(--shadow-sm)', textAlign: 'center' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--primary-gold-light)', color: 'var(--secondary-brown)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
            <User size={40} />
          </div>
          <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--bg-coffee)' }}>{user.name} 님</h3>
          <p style={{ fontSize: '13px', color: 'var(--gray-600)', marginBottom: '16px' }}>{user.email}</p>
          
          {/* Member Level Badge */}
          <div 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '6px', 
              backgroundColor: 'var(--bg-coffee)', 
              color: 'var(--primary-gold)', 
              padding: '6px 16px', 
              borderRadius: 'var(--radius-full)', 
              fontSize: '12px', 
              fontWeight: '700',
              marginBottom: '24px'
            }}
          >
            <Award size={14} /> {user.level}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', borderTop: '1px solid var(--gray-100)', paddingTop: '20px', marginBottom: '24px' }}>
            <div>
              <span style={{ display: 'block', fontSize: '11px', color: 'var(--gray-500)', marginBottom: '4px' }}>누적 포인트</span>
              <strong style={{ fontSize: '18px', color: 'var(--secondary-brown)' }}>{user.points.toLocaleString()}P</strong>
            </div>
            <div>
              <span style={{ display: 'block', fontSize: '11px', color: 'var(--gray-500)', marginBottom: '4px' }}>가입 일자</span>
              <strong style={{ fontSize: '14px', color: 'var(--bg-coffee)', display: 'block', marginTop: '3px' }}>{user.joinedAt}</strong>
            </div>
          </div>

          <Button variant="outline" fullWidth onClick={onLogout} style={{ borderStyle: 'dashed' }}>
            로그아웃
          </Button>
        </div>

        {/* User Activities Dashboard */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', flex: 2 }}>
          
          {/* Loyalty Level Benefits */}
          <div style={{ backgroundColor: '#fcfaf7', border: '1px solid rgba(217, 160, 91, 0.2)', borderRadius: 'var(--radius-lg)', padding: '24px' }}>
            <h4 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--secondary-brown)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
              <Sparkles size={16} /> 특별 멤버십 혜택
            </h4>
            <p style={{ fontSize: '13px', color: 'var(--gray-700)', lineHeight: '1.6' }}>
              고객님은 현재 <strong style={{ color: 'var(--secondary-brown)' }}>{user.level}</strong> 단계입니다. 매 결제 시 <strong style={{ color: 'var(--primary-gold-hover)' }}>5% 추가 적립</strong> 및 당일 예약 선결제 우선권이 주어집니다. 3회 더 구매하시면 다음 등급으로 승격되어 웰컴 무료 식빵 쿠폰 1매가 발급됩니다.
            </p>
          </div>

          {/* Activity Logs (Mock Listings) */}
          <div style={{ backgroundColor: '#ffffff', border: '1px solid rgba(60, 42, 33, 0.06)', borderRadius: 'var(--radius-lg)', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
            <h4 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--bg-coffee)', marginBottom: '16px', borderBottom: '1px solid var(--gray-100)', paddingBottom: '10px' }}>
              최근 1:1 질문 내역
            </h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div 
                onClick={() => navigate('/qna/1')}
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  padding: '12px 16px', 
                  backgroundColor: 'var(--gray-50)', 
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  fontSize: '13px'
                }}
              >
                <span style={{ fontWeight: '600', color: 'var(--bg-coffee)' }}>단체 주문(식빵 100개) 배송 및 할인이 가능한가요?</span>
                <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--secondary-brown)' }}>답변완료</span>
              </div>

              <div 
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  padding: '12px 16px', 
                  backgroundColor: 'var(--gray-50)', 
                  borderRadius: 'var(--radius-md)',
                  fontSize: '13px',
                  opacity: 0.8
                }}
              >
                <span style={{ fontWeight: '600', color: 'var(--gray-600)' }}>온라인 예약 픽업 시간 변경 및 취소 수수료 안내</span>
                <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--gray-500)' }}>기간만료</span>
              </div>
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <Button variant="outline" style={{ flex: 1 }} onClick={() => navigate('/products')}>
              🍞 빵 예약하러 가기
            </Button>
            <Button variant="outline" style={{ flex: 1 }} onClick={() => navigate('/qna/write')}>
              ❓ 1:1 질문하기
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default MemberManager;
export { Login, Register, MyPage };
