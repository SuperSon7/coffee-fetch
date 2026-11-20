# Coffee Fetch 작업 기준

- 먼저 `docs/product/definition.md`, 작업 관련 부분의 `docs/engineering/stack.md`를 읽는다. 디자인은 `docs/product/mockup/coffee-blend/index.html`과 `docs/product/design.md`의 Coffee Blend 기준이다. 초록색 이전안으로 되돌리지 않는다.
- 실제 저장소는 WSL `/home/vanillab/projects/coffee-fetch`. Node·Python·설치·검증은 WSL에서 실행한다. Windows에 별도 앱 소스나 node_modules를 만들지 않는다.
- 스택: React + Vite + TypeScript, Tailwind + shadcn/ui, TanStack Query, Python FastAPI, SQLAlchemy + Alembic + SQLite. npm과 uv 잠금 파일을 유지한다. 현재는 의존성·도구 준비 단계이며 앱 소스는 아직 없다.
- UI 작업에는 `.agents/skills/shadcn/SKILL.md`, React 변경에는 `.agents/skills/vercel-react-best-practices/SKILL.md`의 필요한 규칙만 읽는다. Next.js 전용 규칙·RSC·Server Actions는 적용하지 않는다. 디자인은 설치 스킬의 기본 예시보다 제품 기준이 우선한다.
- 화면 확인에는 `.agents/skills/playwright-cli/SKILL.md`를 사용한다. 명령은 저장소 루트의 `npm exec -- playwright-cli ...`. `.playwright/cli.config.json`의 격리된 headless Chromium을 사용한다. 기존 사용자 브라우저 프로필에 붙지 않는다.
- 보안 검토를 요청받으면 `.agents/skills/security-best-practices/SKILL.md`에서 FastAPI·React 관련 자료를 읽는다. 일반 변경마다 별도 보안 보고서를 만들지 않는다.
- 라이브러리 API가 불확실하면 WSL에 등록된 Context7 MCP 또는 공식 문서로 확인한다. Context7이 안 되면 공식 문서로 진행한다. 동일 용도의 플러그인·MCP를 추가하지 않는다.
- API 스키마는 FastAPI OpenAPI가 기준. 프론트 타입은 openapi-typescript로 생성한다. DB 모델과 공개 응답 모델은 분리한다. 브라우저에서 DB·LLM 제공자에 직접 접속하지 않는다.
- URL 기준 소식, 회차별 불변 카드, 카드별 읽음·북마크를 지킨다. 수집·LLM 요청 중 DB 쓰기 트랜잭션을 열어두지 않는다. 예약 처리는 API 프로세스 안에서 중복 실행하지 않는다.
- 기능마다 작은 단위로 구현하고 관련 검증만 실행한다. UI는 실제 렌더와 모바일, 데이터 변경은 회차 보존·상태 독립·실패 경로를 확인한다. 코드가 없는 단계에서 테스트를 통과했다고 쓰지 않는다.
- 준비된 확인 명령: `npm ci`, `npm audit`, `npm run capture:mockup -- <HTML이 있는 출력 폴더>`, `cd server && uv sync --locked`. 앱 build/typecheck/test 명령은 소스 생성 시 추가한다.
- 완료 시 기존 작업·토큰 기록을 갱신한다. 시간은 사용자가 기록하며 추정하지 않는다. 새 준비 문서·독자적인 GitHub API 래퍼·대규모 워크플로 패키지를 임의로 만들지 않는다.