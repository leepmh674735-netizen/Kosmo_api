import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  // 1. 검사에서 제외할 폴더 설정 (예: 빌드된 결과물 폴더)
  { ignores: ['dist'] },
  
  // 2. 전체적인 코드 규칙 설정
  {
    files: ['**/*.{js,jsx}'], // 어떤 파일을 검사할 것인가? (js, jsx 파일)
    languageOptions: {
      ecmaVersion: 2020, // 최신 자바스크립트 문법 허용
      globals: globals.browser, // window, document 같은 브라우저 전역 변수 허용
    },
    // 3. 플러그인 (리액트 전용 검사기 부품들 장착)
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    // 4. 상세 규칙 설정 (Rules)
    rules: {
      ...js.configs.recommended.rules, // 자바스크립트 공식 추천 규칙 기본 적용
      ...reactHooks.configs.recommended.rules, // 리액트 훅 추천 규칙 기본 적용
      
      // 개별적으로 켜고 끄는 규칙들
      'no-unused-vars': 'warn', // 안 쓰는 변수가 있으면 빨간 줄 대신 '경고(주황 줄)'만 띄워라
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
];