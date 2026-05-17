# 공태연 WATCH 답변 자막 표시 시간 보정 패치

## 문제 원인

공태연 답변 자막이 너무 빨리 사라진 이유는 두 가지였습니다.

1. 자막 전용 패치에서 공태연 답변 표시 시간이 약 0.95초로 짧았음
2. WATCH 시간이 끝나면서 `setSafePhase()`가 실행되고, 보호 대화 시퀀스가 정리되어 공태연 답변이 바로 사라짐

## 수정 내용

1. 수장님 WATCH 대사는 자막 1.3초 표시
2. 공태연 답변 자막은 2.2초 표시
3. 음성은 계속 OFF 유지
4. WATCH 시간이 끝나도 자막 전용 모드에서는 이미 시작한 공태연 답변 자막을 끝까지 표시
5. 수장님 시선은 오래 붙잡지 않고 기존 WATCH 시간대로 안전 구간으로 넘어감

## 핵심 설정

```js
const WATCH_DIALOGUE_USES_TEXT = true;
const WATCH_DIALOGUE_USES_VOICE = false;
```

## GitHub 적용 방법

이미 GitHub Pages에 올린 상태라면:

1. 이 패치의 `index.html`만 기존 GitHub 저장소의 `index.html`에 덮어쓰기
2. Commit changes
3. Pages 재배포 완료 대기
4. 게임 페이지에서 Ctrl + F5

assets 폴더는 다시 올릴 필요 없습니다.
