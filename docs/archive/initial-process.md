> 보관된 초기 초안입니다. 현재 기준은 [제품 정의](../product/definition.md)와 [로드맵](../../README.md)을 확인하세요.

# Coffee Fetch — 프로젝트 진행 방식

- [GitHub Project: 제품 개발과 학습](https://github.com/users/SuperSon7/projects/4)
- [저장소 이슈 목록](https://github.com/SuperSon7/coffee-fetch/issues)
- [매일 시작·종료 기록](../logs/work-log.md)

## 운영 규칙

상태는 Todo → In Progress → Done. 동시에 진행하는 주 작업은 하나를 기본으로 한다. 막혔다면 이슈에 원인과 해소 조건을 쓰고 다른 작업으로 전환한 시간을 기록한다. 완료 체크와 실제 검증 근거가 갖춰졌을 때 이슈를 닫는다. 날짜나 소요 시간을 미리 꾸며서 채우지 않는다.

처음에는 아래 티켓을 한 사이클의 계획으로 사용한다. 구현 티켓이 커지면 착수 전에 검증 가능한 작은 이슈로 나눈다. 티켓 수보다 실제 결과물과 학습이 중요하다.

## 첫 사이클 티켓

| 순서 | 티켓 | 선행 |
|---|---|---|
| 1 | [학습 목표와 MVP 완료 기준](https://github.com/SuperSon7/coffee-fetch/issues/1) | 없음 |
| 2 | [WSL 환경·기록 루틴](https://github.com/SuperSon7/coffee-fetch/issues/2) | #1 |
| 3 | [실제 자료와 카드 정보](https://github.com/SuperSon7/coffee-fetch/issues/3) | #1 |
| 4 | [목업·사용 흐름 검증](https://github.com/SuperSon7/coffee-fetch/issues/4) | #3 |
| 5 | [수집·로컬 LLM 기술 실험](https://github.com/SuperSon7/coffee-fetch/issues/5) | #2, #3 |
| 6 | [데이터·처리 구조 설계](https://github.com/SuperSon7/coffee-fetch/issues/6) | #4, #5 |
| 7 | [수집부터 카드까지 구현](https://github.com/SuperSon7/coffee-fetch/issues/7) | #6 |
| 8 | [읽음·저장·회차·주기 실행](https://github.com/SuperSon7/coffee-fetch/issues/8) | #7 |
| 9 | [통합 검증](https://github.com/SuperSon7/coffee-fetch/issues/9) | #8 |
| 10 | [배포·운영·복구](https://github.com/SuperSon7/coffee-fetch/issues/10) | #9 |
| 11 | [실사용 1주·프로세스 회고](https://github.com/SuperSon7/coffee-fetch/issues/11) | #10 |

첫 작업은 #1이다. 제품 범위는 최신 제품 정의서를 기준으로 검토하고, 학습 목표와 첫 개선 실험을 직접 선택한다.
