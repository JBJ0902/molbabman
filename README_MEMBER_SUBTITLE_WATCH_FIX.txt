# 팀원 대화 자막 WARNING/WATCH 겹침 수정 패치

## 문제

수장님이 팀원에게 말하고 팀원이 답변하려는 순간,
WARNING 또는 공태연 WATCH 감시 상태로 넘어가면 팀원 자막이 아예 안 나오거나 너무 빨리 사라졌습니다.

## 원인

`setPrewarningPhase()`와 `setWatchPhase()`에서 일반 회의 대사가 진행 중일 때
아래 코드가 실행되어 말풍선을 강제로 지우고 있었습니다.

```js
cancelDialogue(false, true);
```

또한 일반 회의 대화의 다음 자막 표시 조건이 `game.phase === "safe"`로 묶여 있어서,
WARNING/WATCH로 넘어가면 팀원 답변 단계가 중단됐습니다.

## 수정 내용

1. HYBRID 자막 전용 모드에서는 WARNING/WATCH 진입 시 일반 회의 자막을 강제로 지우지 않음
2. 안전구간에서 시작한 회의 대화 1턴은 WARNING/WATCH로 넘어가도 끝까지 표시
3. 팀원 답변 자막 표시 시간을 약 3.0초로 증가
4. 수장님 질문/답변 자막 표시 시간도 약간 증가
5. 수장님 감시 타이머와 패턴은 그대로 유지
6. 적발/로켓/스테이지 전환/재시작 때는 기존처럼 자막 정리

## GitHub 적용 방법

이미 GitHub Pages에 올린 상태라면:

1. 이 패치의 `index.html`만 기존 GitHub 저장소의 `index.html`에 덮어쓰기
2. Commit changes
3. Pages 재배포 완료 대기
4. 게임 페이지에서 Ctrl + F5

assets 폴더는 다시 올릴 필요 없습니다.
