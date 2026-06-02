import React, { createContext, useContext, useState, useEffect } from 'react';
// 1. import 오타 수정 및 fetchAPI 경로 확인 필요
import { fetchAPI } from '../utils/api'; 

const AuthContext = createContext(null);
 
export function AuthProvider({ children }) { // 2. fuction -> function 오타 수정
    // 3. 상태 변경 함수(setUser, setLoading) 이름 오타 일괄 수정
    const [user, setUser] = useState(null); 
    const [loading, setLoading] = useState(true);

    const checkMvc = async () => {
        const token = localStorage.getItem('token');
        // 토큰이 없으면 로그인 상태가 아니므로 로딩을 끝내고 리턴합니다.
        if (!token) { 
            setUser(null);
            setLoading(false);
            return;
        }

        try {
            const data = await fetchAPI('/auth/me');
            setUser(data); // sestUser -> setUser 수정
        } catch (error) {
            console.error('자동 로그인 확인 실패:', error.message);
            logout();
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkMvc();

        const handleUnauthorized = () => {
            setUser(null);
        };

        window.addEventListener('auth-unauthorized', handleUnauthorized);
        
        // 4. 이중 리턴 및 중괄호 위치가 꼬여있던 cleanup 함수 정리
        return () => {
            window.removeEventListener('auth-unauthorized', handleUnauthorized);
        };
    }, []); // 5. useEffect 닫는 괄호 위치 수정


    // 6. password 뒤 괄호 ) 누락 수정, 객체 구조 변경
    const login = async (email, password) => { 
        try {
            const data = await fetchAPI('/auth/login', {
                method: 'POST',
                body: { email, password },
            });

            localStorage.setItem('token', data.token);
            
            // 7. 객체 내부에 잘못 들어간 'AuthContext' 텍스트 제거
            setUser({
                email: data.email,
                nickname: data.nickname,
                role: data.role,
            });
            return data;
        } catch (error) {
            throw error; // 8. 불필요한 괄호 제거
        }
    };


    const signup = async (email, password, nickname) => {
        try {
            await fetchAPI('/auth/signup', {
                method: 'POST',
                body: { email, password, nickname },
            });
        } catch (error) {
            throw error;
        }
    };


    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const value = {
        user,
        loading,
        login,
        signup,
        logout,
        checkMvc,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
	
export function useAuth() {
    // 9. const const -> const context 변수명 오류 수정
    const context = useContext(AuthContext); 
    if (!context) {
        throw new Error('useAuth는 AuthProvider 내에서 사용해야 합니다.');
    }
    return context;
}