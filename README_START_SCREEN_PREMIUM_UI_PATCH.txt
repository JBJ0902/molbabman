# 초기 시작 화면 프리미엄 UI 리디자인 패치

## 수정 내용

초기 시작 화면만 보기 좋게 리디자인했습니다.

- 타이틀을 더 크고 화려하게 구성
- 버블란 크루 / 회의실 서바이벌 느낌의 키커 문구 추가
- 게임 핵심 조작 SPACE/K, 시선 회피, 10스테이지 목표 카드 추가
- 최고점수/엔딩 컬렉션 기록 영역을 카드형으로 정리
- 오늘의 작전 안내 카드 추가
- 온라인 순위전 버튼을 더 눈에 띄게 강조
- 버튼 배치를 그리드형으로 정리
- 배경 블러/광원/상단 라이트 효과 추가
- 모바일/작은 화면 대응 유지

## 유지한 것

게임 로직은 변경하지 않았습니다.

- startBtn
- openOnlineArenaFromStart
- openOptionsFromStart
- openEndingGalleryFromStart
- startRecords
- startOnlineStatusChip

기존 JS 이벤트 연결 ID를 그대로 유지했습니다.

## 적용 방법

1. index.html 전용 ZIP 압축 풀기
2. GitHub 저장소의 index.html 교체
3. Commit changes
4. Pages 재배포 완료 대기
5. 게임 페이지에서 Ctrl + F5
6. 첫 시작 화면 확인
