# 수장님 팝업 레이어 상단 표시 패치

## 문제

수장님 4표정 팝업은 정상 적용되었지만,
WARNING 경고창이 뜰 때 수장님 팝업이 경고창 뒤로 가려지는 문제가 있었습니다.

## 수정 내용

1. `#portraitLayer` z-index를 WARNING보다 위로 조정
2. 수장님 팝업 `.portraitBadge[data-person="leader"]`를 더 높은 레이어로 고정
3. WARNING 박스는 계속 보이되 수장님 팝업을 가리지 않도록 아래 레이어로 조정
4. 엔딩/옵션/갤러리 같은 전체 화면 메뉴는 기존처럼 최상단 유지

## 레이어 구조

- 전체 화면 메뉴: z-index 300
- 수장님 팝업: z-index 196
- 팀원/캐릭터 팝업: z-index 189
- WARNING 경고창: z-index 150
- 수장님 시선/빔/스테이지 워터마크: z-index 120

## GitHub 적용 방법

이미 수장님 4표정 assets를 올린 상태라면 이번에는 `index.html`만 교체하면 됩니다.

1. 이 패치의 `index.html`을 GitHub 저장소에 덮어쓰기
2. Commit changes
3. Pages 재배포 완료 대기
4. 게임 페이지에서 Ctrl + F5

assets 폴더는 다시 올릴 필요 없습니다.
