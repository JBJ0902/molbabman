# 목표 미달 5회 로켓 방출 무한 반복 수정 패치 v9.18.28

## 증상

타이머가 00:00이 된 뒤 목표 점수/몰밥 횟수를 채우지 못하면
`로켓 방출!` 배너가 계속 뜨고, `몰밥 실패 1784/5`처럼 실패 횟수가 무한히 증가하는 문제가 있었습니다.

## 원인

1. `stageRequirementFail()`이 시작하자마자 phase를 잠그지 않아서 타이머 0초 상태에서 매 프레임 재호출됨
2. 파일 안의 중복 `resetGame()` 중 일부가 `objectiveRocketLocked`, `finishLocked`를 초기화하지 않음
3. `finish(false)`가 중복 호출될 가능성이 있어 엔딩 전환이 꼬일 수 있음

## 수정 내용

1. `stageRequirementFail()` 진입 즉시 `game.phase = "stageFail"`로 잠금
2. 목표 실패 횟수를 최대 5로 제한
3. 5/5가 되면 즉시 `launching` 상태로 잠그고 `game.running = false`
4. 모든 `resetGame()`에서 `finishLocked`, `objectiveRocketLocked`, `rocketLaunchLocked` 초기화
5. 모든 `finish()` 함수에 중복 실행 방지 로직 추가
6. 5/5 이후 약 0.9초 뒤 로켓 방출 엔딩으로 정상 전환

## 적용 방법

1. 압축을 풉니다.
2. `index.html`을 기존 게임 폴더의 `index.html`에 덮어쓰기합니다.
3. `assets` 폴더는 그대로 유지합니다.
4. 브라우저에서 Ctrl + F5로 강제 새로고침합니다.
