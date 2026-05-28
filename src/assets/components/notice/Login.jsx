import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, LogIn } from 'lucide-react';
import Button from '../common/Button';

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
    <div className="container fade-in" style={{ padding: '60px 24px', display: 'flex', justifyContent: 'center' }}>
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

export default Login;
