# 구현 스택과 에이전트 도구

2026-11-20 결정. 개인용 Coffee Fetch의 개발 속도·호환성·데이터 보존을 기준으로 선택했습니다. 현재 단계는 개발 환경과 스킬 준비이며 앱 화면·API·테이블 구현은 아직 없습니다.

## 선택한 스택

| 영역 | 선택 | 이유 |
|---|---|---|
| 웹 | React 19 + TypeScript + Vite 8 | PC·휴대폰에서 같은 반응형 UI 사용. Python API와 독립적으로 화면 개발 |
| 화면 부품 | Tailwind CSS 4 + shadcn/ui (Base UI 기반) | 접근성 있는 부품의 소스를 직접 소유하고 Coffee Blend 색·타이포로 조정. 기본 대시보드 디자인을 복사하지 않음 |
| API 상태·경로 | TanStack Query 5 + React Router 8 | 요청·실패·재조회와 날짜·회차·필터 URL 관리 |
| 서버 | Python 3.13 + FastAPI + Pydantic 2 | 수집·요약 생태계, 입력 검증, OpenAPI 제공 |
| 저장 | SQLite + SQLAlchemy 2.1 + Alembic | 관계·집계·회차 보존에 적합. 별도 DB 서버 없이 스키마 변경 추적 |
| 수집 | HTTPX + feedparser | 공식 RSS/Atom·API부터 연결. HTML 추출기는 실제 소스 검증 후 추가 |
| 예약 | 별도 Python worker + APScheduler 3.11 | API와 긴 작업을 분리. 예약 계산과 실제 작업 상태는 구분 |
| API 계약 | FastAPI OpenAPI → openapi-typescript | 양쪽 DTO의 수동 중복 정의를 줄임 |
| 개발·검증 | npm workspaces, uv, Vitest·Testing Library, pytest·Ruff·mypy, Playwright | 프론트·Python 각각의 도구와 잠금 파일로 재현 |

Next.js도 가능하지만 현재 요구에는 검색 노출·SSR·Node 서버 기능이 필요하지 않고 서버는 Python으로 정했습니다. Vite SPA가 담당 범위를 명확하게 합니다. Vue/Svelte도 가능하지만 이번에는 React의 부품·공식 스킬 생태계를 활용합니다. FastAPI 공식 풀스택 템플릿도 React·TypeScript·Vite를 사용하지만, 로그인·PostgreSQL·배포 구조까지 가져오지는 않습니다.

SQLModel 대신 SQLAlchemy와 Pydantic을 분리합니다. DB 객체와 생성 당시 카드 스냅샷·API 응답이 같은 형태일 필요가 없기 때문입니다. SQLite는 로컬 디스크에 두며 네트워크 공유 폴더에서 직접 운영하지 않습니다. WAL·외래키·busy timeout, 짧은 쓰기 트랜잭션을 구현 시 설정합니다.

## 실행 구조

```text
PC / 휴대폰 브라우저
  └─ React 화면 → FastAPI API → SQLite
                       ↑
             Python worker (단일 실행)
             ├─ 수집 → 선별 → 회차 생성
             └─ LLM Gateway → 로컬 모델 / 외부 API
```

개발은 Vite 서버와 FastAPI를 각각 실행합니다. 개인 서버 배포는 정적 빌드와 API를 같은 origin으로 제공하는 구성을 우선하며, 실제 호스팅·모바일 외부 접근은 추후 결정합니다. 로그인 없는 개발 서버를 그대로 공개 인터넷에 노출하지 않습니다.

APScheduler를 설치했다고 중단 작업이 자동 복구되는 것은 아닙니다. 예약과 작업 실행 기록을 DB에 남기고, 멱등 키·실행 중 상태·재시도·놓친 예약 처리 정책을 구현해야 합니다. 네트워크 수집·요약 동안 DB 쓰기 트랜잭션을 유지하지 않습니다. DR은 SQLite의 일관된 백업과 별도 위치 보관·복원 시험으로 검증합니다. RPO/RTO와 저장 위치는 서버 선택 시 정합니다.

LLM은 서버의 Gateway 경계 뒤에 둡니다. LiteLLM SDK의 라우팅·fallback을 우선 검토 대상으로 정했지만, 로컬 모델 엔드포인트·외부 제공자·예산이 정해지기 전에는 설치·연결하지 않습니다. Redis·독립 Proxy·마이크로서비스는 현재 추가하지 않습니다. 비용 기반 전환은 모델별 비용 기록과 예산 정책을 함께 구현해야 합니다.

## 사람들이 사용하는 도구와 이번 선택

공식 배포 경로·스택 적합성·실행 가능한 도구를 우선했습니다. 아래 수치는 2026-11-20 조회한 관심·설치 지표이며 고유 사용자 수나 품질 보증은 아닙니다.

| 도구 | 사용 근거 | 이번 처리 |
|---|---|---|
| [Vercel React Best Practices](https://www.skills.sh/vercel-labs/agent-skills/vercel-react-best-practices) | skills.sh 약 91.66만 설치 표시, Vercel 공식 | 프로젝트 스킬 설치. React에 해당하는 규칙만 적용, Next.js 전용 규칙 제외 |
| [shadcn 공식 스킬](https://ui.shadcn.com/docs/skills) | [skills.sh](https://www.skills.sh/shadcn-ui/ui/shadcn) 약 15.44만 설치 표시 | 프로젝트 스킬과 CLI 설치. 공식 레지스트리·부품 API 조회 |
| [Playwright CLI + Skills](https://github.com/microsoft/playwright-cli) | Microsoft 공식, 저장소 약 1.53만 stars. README에서 코딩 에이전트용 CLI+스킬 방식 권장 | 프로젝트 스킬·CLI 설치, WSL Chromium 실행 확인 |
| [Context7](https://github.com/upstash/context7) | 공식 저장소 약 6.52만 stars, 버전별 문서 조회 | WSL Codex에 이미 등록돼 있어 재사용. 인증·실제 문서 도구 호출은 이 설치 작업에서 별도 검증하지 않음 |
| [OpenAI Security Best Practices](https://github.com/openai/skills/tree/main/skills/.curated/security-best-practices) | OpenAI 큐레이션, FastAPI·React 자료 포함 | 프로젝트 스킬 설치. 보안 검토를 요청할 때 적용 |
| [Superpowers](https://github.com/obra/superpowers) | 저장소 약 32.23만 stars, 설계·계획·TDD·서브에이전트까지 묶은 개발 방법론 | 미설치. 현재 작업 방식에 전체 방법론을 추가할 필요가 없다고 판단 |

일반 FastAPI 스킬 모음은 추가하지 않습니다. FastAPI·SQLAlchemy 공식 문서와 프로젝트 규칙으로 시작하고, 반복되는 실제 병목이 확인되면 좁은 범위의 스킬을 추가합니다. 기존 디자인 스킬도 계속 사용할 수 있습니다. GitHub·Playwright·Context7 MCP는 WSL에 이미 등록되어 있으며 전역 설정을 변경하거나 중복 연결하지 않았습니다.

## 설치 위치와 사용하는 방법

- 실제 저장소: `/home/vanillab/projects/coffee-fetch`.
- 네 개 스킬: 저장소 `.agents/skills/`. 원본 커밋은 `.agents/skills.lock.json`에 기록. 전역 스킬을 덮어쓰지 않음.
- [공식 Codex 문서](https://learn.chatgpt.com/docs/build-skills)에 따라 저장소에서 시작한 Codex가 프로젝트 스킬을 발견합니다. 다음 WSL 턴에서 사용하며 목록에 없으면 세션을 다시 엽니다.
- Windows 작업 창에는 실제 WSL 저장소와 `AGENTS.md`를 가리키는 안내 파일을 두었습니다. 런타임·설치는 WSL에만 둡니다.
- `AGENTS.md`가 제품·디자인·스택과 스킬 사용 시점을 연결합니다. 모든 스킬을 매번 읽지 않습니다.
- React·UI 변경 → 해당 스킬 → 구현 → 관련 검사 → Playwright 화면 확인 → 기존 로그 갱신.
- Context7은 불확실한 라이브러리 API를 확인할 때 사용. 조회가 안 되면 공식 문서로 진행.

```bash
cd ~/projects/coffee-fetch
npm ci
npm exec -- playwright install chromium
npm exec -- playwright-cli install-browser chromium
cd server
uv sync --locked
```

Node 24.16.0 / npm 12.0.2, Python 3.13.18 / uv 0.13.9로 확인했습니다. 시스템 Python 3.9는 바꾸지 않았습니다. npm 정확한 버전은 `package-lock.json`, Python은 `server/uv.lock`에 고정합니다. uv 자체는 WSL 사용자 영역에 설치했습니다.

```bash
# 저장소 루트에서, 격리된 headless Chromium 사용
npm exec -- playwright-cli -s=coffee-fetch open
npm exec -- playwright-cli -s=coffee-fetch snapshot
npm exec -- playwright-cli -s=coffee-fetch close

# 목업 회귀 검사: 캡처를 원본에 덮어쓰지 않음
mkdir -p .cache/mockup-check
cp docs/product/mockup/coffee-blend/index.html .cache/mockup-check/index.html
npm run capture:mockup -- .cache/mockup-check
```

shadcn의 `components.json`, 앱 엔트리, Vite·TypeScript 설정, build/typecheck/test 스크립트는 첫 구현에서 생성합니다. 현재 설치된 것은 의존성과 도구이며 `npm run dev`로 동작하는 앱은 아직 없습니다. shadcn 부품 추가는 그 초기화 이후 `web/`에서 수행합니다.

## 검증과 의존성 메모

- WSL 목업 회귀 검사 통과: 필터·회차·카드별 읽음·소식 집계·북마크·재생성·320/360/768/1100px 넘침.
- Playwright CLI의 브라우저 실행·스냅샷·종료 통과. 별도 Chrome 대신 `.playwright/cli.config.json`의 Chromium 사용.
- FastAPI·SQLAlchemy·SQLite 로딩 및 메모리 DB 쿼리 확인, `uv sync --locked` 재현 확인.
- `shadcn docs button` 조회 성공. 아직 앱 설정이 없다는 `shadcn info` 결과도 확인.
- npm audit 최종 0건. shadcn → ts-morph 경로의 minimatch를 `11.0.1`로 한정 override하여 [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249)를 해결. CLI 문서·프로젝트 조회 검증. 실제 부품 생성 시 추가 확인하고 상위 의존성 수정 후 override 제거.
- 회귀 검증용 Playwright는 안정판 1.65.1. Playwright CLI 0.1.25가 내부적으로 고정한 1.66 alpha 의존성은 별도로 존재하며 강제로 바꾸지 않음.
- 앱 기능·빌드·실제 LLM·백업 복원·실기기 모바일 테스트는 아직 실행할 대상이 없습니다.

## 다시 볼 공식 자료

- [FastAPI 풀스택 템플릿](https://fastapi.tiangolo.com/project-generation/), [Vite 시작](https://vite.dev/guide/)
- [Tailwind + Vite](https://tailwindcss.com/docs/installation/using-vite), [TanStack Query](https://tanstack.com/query/latest/docs/framework/react/overview)
- [SQLAlchemy SQLite](https://docs.sqlalchemy.org/en/21/dialects/sqlite.html), [APScheduler 3 사용자 가이드](https://apscheduler.readthedocs.io/en/3.x/userguide.html)
- [uv 설치](https://docs.astral.sh/uv/getting-started/installation/), [LiteLLM 라우팅](https://docs.litellm.ai/docs/routing)