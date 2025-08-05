# Jamstack 챗봇

Next.js와 Supabase를 사용한 Jamstack 기반 챗봇 애플리케이션입니다.

## 기능

- 🔐 사용자 인증 (로그인/회원가입)
- 💬 실시간 채팅
- 📨 메시지 전송 및 수신
- 🔄 실시간 메시지 업데이트
- 📜 메시지 히스토리 로드
- 🎨 모던한 UI/UX
- 📱 반응형 디자인

## 시작하기

### 1. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 환경 변수를 설정하세요:

```bash
# Supabase 설정
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_supabase_anon_key
```

### 2. Supabase 프로젝트 설정

1. [Supabase](https://supabase.com)에서 새 프로젝트를 생성하세요
2. Authentication > Settings에서 이메일 인증을 활성화하세요
3. SQL Editor에서 `supabase/migrations/001_create_messages_table.sql` 파일의 내용을 실행하여 메시지 테이블을 생성하세요
4. 프로젝트 URL과 anon key를 환경 변수에 설정하세요

### 3. 개발 서버 실행

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 결과를 확인하세요.

## 프로젝트 구조

```
src/
├── app/                    # Next.js App Router
├── entities/              # 도메인 엔티티
├── features/              # 기능별 모듈
│   ├── auth/             # 인증 기능
│   └── send-message/     # 메시지 전송 기능
├── shared/               # 공유 컴포넌트 및 유틸리티
│   ├── contexts/         # React Context
│   ├── supabase/         # Supabase 클라이언트
│   ├── types/            # TypeScript 타입 정의
│   └── ui/               # 공유 UI 컴포넌트
├── views/                # 페이지 뷰
└── widgets/              # 위젯 컴포넌트
```

## 기술 스택

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase (Auth, Database)
- **State Management**: React Context
- **Code Quality**: ESLint, Prettier

## 배포

이 Next.js 앱을 배포하는 가장 쉬운 방법은 [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)을 사용하는 것입니다.

자세한 내용은 [Next.js 배포 문서](https://nextjs.org/docs/app/building-your-application/deploying)를 참조하세요.
