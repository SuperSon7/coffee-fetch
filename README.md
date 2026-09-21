# Coffee Fetch ☕

커피 한 잔과 함께 읽는 오늘의 기술 소식.

관심 기술의 새 소식을 짧게 읽고 저장하는 개인 프로젝트입니다. 만들고 싶은 것을 만들면서 AI를 어떻게 활용할지 배웁니다.

**현재: 목적·기본 기능 정리됨. 초기 목업만 있으며 앱은 아직 구현하지 않았습니다.** 작업 파일은 WSL 저장소를 기준으로 관리합니다.

## 로드맵

단계는 결과물 기준입니다. 상세 작업 상태는 GitHub Project와 이슈에서 관리하고, 아래 상태는 단계의 결과물이 달라질 때 갱신합니다. 티켓 개수로 진척률을 계산하지 않습니다.

| 단계 | 도달할 상태 | 현재 상태와 결과물 | 관련 작업 |
|---|---|---|---|
| 1. 방향 정리 | 목적·첫 버전 범위 정리 | [현재 제품 정의](docs/product/definition.md) 있음. #1 완료 점검은 남음 | [#1](https://github.com/SuperSon7/coffee-fetch/issues/1), [#2](https://github.com/SuperSon7/coffee-fetch/issues/2) |
| 2. 읽기 경험 확인 | 실제 소식으로 읽기·저장 흐름 확인 | [초기 목업](docs/archive/mockup/index.html)만 있음. 실제 자료 검증 필요 | [#3](https://github.com/SuperSon7/coffee-fetch/issues/3), [#4](https://github.com/SuperSon7/coffee-fetch/issues/4) |
| 3. 수집·요약과 구조 결정 | 자료 수집·요약을 시험하고 저장·처리 구조 결정 | 미착수 | [#5](https://github.com/SuperSon7/coffee-fetch/issues/5), [#6](https://github.com/SuperSon7/coffee-fetch/issues/6) |
| 4. 작은 버전 연결 | 설정 → 수집 → 카드 → 읽음·저장 동작 | 미착수 | [#7](https://github.com/SuperSon7/coffee-fetch/issues/7), [#8](https://github.com/SuperSon7/coffee-fetch/issues/8), [#9](https://github.com/SuperSon7/coffee-fetch/issues/9) |
| 5. 직접 사용·개선 | 실제 사용과 개발 병목을 바탕으로 개선 | 미착수. 배포는 필요할 때 결정 | [#11](https://github.com/SuperSon7/coffee-fetch/issues/11), 배포 후보 [#10](https://github.com/SuperSon7/coffee-fetch/issues/10) |

## 작업 관리

- [GitHub Project](https://github.com/users/SuperSon7/projects/4): Todo → In Progress → Done
- [이슈 목록](https://github.com/SuperSon7/coffee-fetch/issues): 범위·완료 조건·결과물 링크
- [작업 기록](docs/logs/work-log.md): 시간, 진행 내용, 병목, 다음 행동
- [토큰 기록](docs/logs/token-usage.md): 날짜·처리한 일·토큰 사용량

## 자료 찾기

| 위치 | 역할 |
|---|---|
| [제품 정의](docs/product/definition.md) | 현재 목적·기능 범위·결정 |
| [참고 사이트](docs/references/sites.md) | 다시 사용할 조사 출처 |
| [행사 발표·로컬 LLM](docs/references/events-and-local-llm.md) | 추가 조사 자료 |
| [과거 초안](docs/archive/README.md) | 초기 설계·목업·논의 보관. 현재 사양 아님 |
| [토큰 기록 스킬](skills/token-usage-log/SKILL.md) | 재사용하는 스킬 원본 |

문서는 관련 폴더에 둡니다. 작업별 새 준비 문서보다 이슈를 우선 사용하고, 별도 설계 문서는 필요할 때 추가합니다. 단계 진척은 README, 상세 상태는 이슈, 실제 투입은 기록에서 확인합니다.

## 작업 환경

```bash
cd ~/projects/coffee-fetch
git pull --ff-only
```

개발 실행 방법은 구현 후 추가합니다. 과거 HTML 목업은 내려받아 브라우저에서 열 수 있지만 샘플 데이터와 일시적인 UI 동작만 포함합니다.
