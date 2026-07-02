# Vite Migration Checklist

이 문서는 `E:\intellij project\mymedi-admin` 저장소를 `Vue CLI + Webpack` 에서 `Vite` 로 옮긴 결과와 남은 후속 점검 포인트를 정리한 체크리스트다.

현재 상태

- Vue 3 마이그레이션은 완료됨
- 현재 번들러는 `Vite`
- 현재 `corepack yarn lint`, `corepack yarn build` 는 정상 통과
- 활성 설정 파일은 `vite.config.mjs`
- PWA 는 보류 상태이며, `manifest` 만 유지하고 service worker 는 제거함

## 1. 패키지 전환

- `devDependencies` 에 `vite` 와 `@vitejs/plugin-vue` 추가 완료
- PWA 는 당분간 활성화하지 않으므로 `vite-plugin-pwa` 는 미도입
- `@vue/cli-plugin-babel`, `@vue/cli-plugin-eslint`, `@vue/cli-plugin-pwa`, `@vue/cli-service` 제거 완료
- `register-service-worker` 제거 완료
- `babel-plugin-component`, `sass-loader` 도 함께 제거 완료
- `package-lock.json` 도 제거하고 Yarn 단일 lockfile 로 정리

영향 파일

- [package.json](E:/intellij%20project/mymedi-admin/package.json)

## 2. 스크립트 전환

- `serve` 를 `vite --open` 으로 전환 완료
- `build` 를 `vite build` 로 전환 완료
- `preview` 를 `vite preview` 로 추가 완료
- `dev` alias 도 `vite --open` 으로 정리 완료

영향 파일

- [package.json](E:/intellij%20project/mymedi-admin/package.json)

## 3. 설정 파일 전환

- `vue.config.js` 의 주요 alias 를 `vite.config.mjs` 로 이관 완료
- chunk 설정은 Vite 기준으로 조정했고 현재 build 통과 기준으로 안정화함
- Sass 옵션을 `css.preprocessorOptions.scss` 기준으로 재설정 완료
- PWA 설정은 아직 재작성하지 않았고 service worker 는 비활성 유지
- 기존 [vue.config.js](E:/intellij%20project/mymedi-admin/vue.config.js) 는 제거 완료

영향 파일

- [vite.config.mjs](E:/intellij%20project/mymedi-admin/vite.config.mjs)

## 4. HTML 엔트리 전환

- Vite 루트 엔트리용 `index.html` 생성 완료
- 현재 [public/index.html](E:/intellij%20project/mymedi-admin/public/index.html) 의 meta, analytics, GTM, font link 이관 완료
- `<script type="module" src="/src/main.js"></script>` 추가 완료
- `manifest` 는 루트 `index.html` 에 직접 연결

주의

- `public/index.html` 을 그대로 쓰지 않고, 루트 `index.html` 구조로 옮겨야 함
- `public/` 아래 정적 자산 접근 경로도 같이 점검 필요

## 5. 환경변수 체계 전환

- `process.env.*` 직접 참조는 `src/env.js` 를 통한 래퍼로 전환 완료
- `process.env.NODE_ENV` 는 `import.meta.env.PROD` 기반으로 전환 완료
- `process.env.BASE_URL` 은 `import.meta.env.BASE_URL` 기반으로 전환 완료
- 현재는 `VITE_APP_*` 를 기본으로 사용하고, 기존 `VUE_APP_*` 는 호환용으로만 함께 읽음
- 서버 URL 은 `.env.development`, `.env.production` 으로 profile별 분리했고, `.env` 는 공통값 용도로 유지

현재 확인된 영향 파일

- [src/components/isDemo.js](E:/intellij%20project/mymedi-admin/src/components/isDemo.js)
- [src/head/app-head.js](E:/intellij%20project/mymedi-admin/src/head/app-head.js)
- [src/pages/Dashboard/Password/Reset.vue](E:/intellij%20project/mymedi-admin/src/pages/Dashboard/Password/Reset.vue)
- [src/store/services/auth-service.js](E:/intellij%20project/mymedi-admin/src/store/services/auth-service.js)
- [src/store/services/profile-service.js](E:/intellij%20project/mymedi-admin/src/store/services/profile-service.js)
- [src/store/modules/reset.js](E:/intellij%20project/mymedi-admin/src/store/modules/reset.js)
- [src/pages/Dashboard/Maps/API_KEY.js](E:/intellij%20project/mymedi-admin/src/pages/Dashboard/Maps/API_KEY.js)

## 6. Alias 및 import 점검

- `@`, `src`, `assets` alias 를 Vite 에 재정의
- 현재 `src/...`, `assets/...`, `@/...` 혼용 import 는 대부분 유지 가능
- Node 내장 경로나 Webpack 전용 resolve 동작에 기대는 코드가 없는지 재점검

## 7. Webpack 전용 힌트/주석 정리

- `/* webpackChunkName: "..." */` 주석 제거 또는 정리
- 성능 경고용 `performance` 설정 제거
- Webpack 전용 chunk 이름 전략은 `manualChunks` 로 대체

현재 확인된 대표 영향 파일

- [src/routes/routes.js](E:/intellij%20project/mymedi-admin/src/routes/routes.js)
- [src/pages/Dashboard/Dashboard/Dashboard.vue](E:/intellij%20project/mymedi-admin/src/pages/Dashboard/Dashboard/Dashboard.vue)
- [src/pages/Dashboard/Dashboard/DashboardHeader.vue](E:/intellij%20project/mymedi-admin/src/pages/Dashboard/Dashboard/DashboardHeader.vue)
- [src/components/WorldMap/AsyncWorldMap.vue](E:/intellij%20project/mymedi-admin/src/components/WorldMap/AsyncWorldMap.vue)
- [src/pages/Dashboard/Layout/DashboardLayout.vue](E:/intellij%20project/mymedi-admin/src/pages/Dashboard/Layout/DashboardLayout.vue)

## 8. PWA / 서비스워커 전환

- 가장 안전한 방향으로 `manifest` 만 유지
- service worker 등록 코드는 제거했고, 현재는 manifest-only 상태
- 추후 실제 PWA 필요 시 Vite 기준으로 새로 설계
- [public/manifest.json](E:/intellij%20project/mymedi-admin/public/manifest.json) 은 루트 경로 기준으로 유지

## 9. ESLint / Babel 전략 정리

- Vite 자체는 Babel 의존이 필수는 아님
- 현재 앱 빌드/실행 경로에서 Babel 설정은 제거
- ESLint 는 `eslint.config.cjs` 기반의 ESLint 9 flat config 로 전환 완료
- parser 는 `@babel/eslint-parser` 와 `vue-eslint-parser` 조합으로 정리 완료

영향 파일

- [eslint.config.cjs](E:/intellij%20project/mymedi-admin/eslint.config.cjs)

## 10. 검증 순서

1. `vite` dev 서버 기동
2. `/`, `/dashboard`, `/register`, `/components/notifications`, `/maps/google` 스모크 확인
3. env 의존 화면 확인
4. `vite build` 확인
5. `manifest` 유지 여부 확인
6. service worker 는 의도적으로 비활성인지 확인

## 권장 진행 순서

1. 패키지/스크립트 추가
2. 루트 `index.html` 과 `vite.config.mjs` 활성화
3. env 전환
4. 서비스워커/PWA 처리
5. chunk 전략 튜닝
6. QA

## 현재 판단

- 전환 난이도: 중간 이상
- 가장 큰 작업: env 체계, HTML 엔트리, chunk 전략 재구성
- 현재 PWA 판단: 관리자 화면 특성상 `manifest-only` 가 가장 안전
- 현재 결론: Vite 전환은 완료됐고, 남은 일은 선택적인 성능/운영 최적화 성격이 큼
