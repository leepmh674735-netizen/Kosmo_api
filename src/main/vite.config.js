import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // 1. 리액트 구동을 위한 핵심 플러그인 등록
  plugins: [react()],

  // 2. 개발 서버 상세 설정 및 백엔드 연동(Proxy) 세팅
  server: {
    port: 5173, // 리액트가 사용할 로컬 포트 번호 고정
    
    proxy: {
      // 브라우저에서 '/api'로 시작하는 요청을 보내면, 백엔드 스프링 서버로 주소를 몰래 바꿔서 토스합니다.
      '/api': {
        target: 'http://localhost:8080', // 실제 스프링 부트 서버 주소
        changeOrigin: true,             // 서버가 요구하는 호스트 헤더를 target 주소로 변환
        rewrite: (path) => path.replace(/^\/api/, '') // URL에서 '/api' 글자는 떼어내고 백엔드에 전달
      }
    }
  }
})