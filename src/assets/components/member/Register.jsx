import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, UserPlus, CheckCircle2 } from 'lucide-react';
import Button from '../common/Button';

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
    <div className="container fade-in" style={{ padding: '60px 24px', display: 'flex', justifyContent: 'center' }}>
      <div 
        className="register-card"
        style={{
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          padding: '40px',
          maxWidth: '500px',
          width: '100%',
          boxShadow: 'var(--shadow-md)',
          border: '1px solid rgba(60, 42, 33, 0.08)',
          transition: 'var(--transition-normal)'
        }}
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

              <div className="register-btn-group" style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <Button variant="outline" style={{ flex: 1 }} onClick={() => setStep(1)}>이전 단계</Button>
                <Button variant="primary" style={{ flex: 1 }} onClick={handleRegisterComplete} icon={<UserPlus size={16} />}>회원가입 완료</Button>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div style={{ textAlign: 'center', padding: '10px 0' }}>
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

      <style>{`
        @media (max-width: 480px) {
          .register-card {
            padding: 24px 20px !important;
          }
          .register-btn-group {
            flex-direction: column !important;
            gap: 12px !important;
          }
          .register-btn-group button {
            width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
}

export default Register;
