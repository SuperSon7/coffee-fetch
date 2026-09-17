# Coffee Fetch ☕

커피 한 잔과 함께 읽는 오늘의 기술 소식.

IT · DevOps · Cloud · AI · Observability와 Kubernetes · Grafana · Python 등 관심 기술의 새 소식을 적당한 양으로 읽고 저장하는 개인 브리핑 도구입니다.

**현재 상태: 아이디어 구체화와 제품 설계. 실제 서비스는 아직 구현하지 않았습니다.**

## 문서

- [매일 작업 시작·종료 기록](docs/work-log.md)
- [프로젝트 진행 안내](docs/project-management.md)
- [첫 버전 제품 정의](docs/product-definition.md) — 최근 논의를 반영한 기준 문서
- [초기 설계 보고서](docs/stack-brief-report.md) — Stack Brief라는 가칭으로 작성한 초기 제안; 현재 정의서와 다르면 현재 정의서 우선
- [참고 사이트 모음](docs/reference-sites.md)
- [행사 발표·로컬 LLM 추가 조사](docs/reference-sites-2026-09-17.md)
- [초기 UI 목업](mockup/index.html) — 내려받아 브라우저에서 열기; 이전 가칭과 가상 데이터 사용

## 첫 버전 방향

- 관심 분야와 도구를 고르면 새 소식을 짧은 카드로 제공
- 원문 링크, 명시적 읽음 표시, 나중에 보기
- 고민 등록은 필수가 아닌 후속 선택 기능
- 행사 발표도 후보로 수집하되 하루 노출량은 제한
- 수집은 일반 프로그램, 요약·정리는 로컬 LLM 가능성을 먼저 평가

## 작업 환경

개발은 WSL의 Linux 파일시스템에서 진행할 예정입니다.

```bash
mkdir -p ~/projects
cd ~/projects
git clone https://github.com/SuperSon7/coffee-fetch.git
cd coffee-fetch
```

아직 웹 배포, 자동 수집, 예약 알림은 설정하지 않았습니다. 목업의 저장 표시는 일시적이며 새로고침하면 초기화됩니다.
