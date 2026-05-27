import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  // 1. 검사에서 완전히 제외할 폴더 지정 (빌드 파일 및 설정 파일 제외)
  { ignores: ['dist', 'node_modules', 'vite.config.js'] },
  
  {
    // 검사할 대상 파일 확장자 지정
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser, // 브라우저 전역 변수(window, document 등) 인식
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    // 2. 사용할 리액트 관련 플러그인 등록
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    // 3. 세부 문법 검사 규칙 규칙(Rules) 설정
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      
      // 리액트 컴포넌트 만들 때 prop-types 검사창 끄기 (공부할 때 불필요한 빨간줄 방지)
      'react/prop-types': 'off',
      
      // 쓰지 않는 변수가 있으면 경고만 띄우기
      'no-unused-vars': 'warn',
      
      // Fast Refresh 규칙 설정 (컴포넌트 내보내기 규칙 강화)
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
    // 리액트 버전 자동 감지 설정
    settings: {
      react: { version: 'detect' }
    }
  },
]