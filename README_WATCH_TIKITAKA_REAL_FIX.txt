# 수장님-공태연 WATCH 티키타카 실제 복구 패치

## 문제 원인

이전 패치에서 `WATCH_DIALOGUE_USES_VOICE`는 true로 바뀌었지만,
실제 티키타카 실행 스위치인 `WATCH_DIALOGUE_USES_TEXT`가 false로 남아 있었습니다.

문제 코드:

```js
const WATCH_DIALOGUE_USES_TEXT = false;
```

이 상태에서는 `requestWatchDialogueSequence()`가 아래 조건에서 바로 종료됩니다.

```js
if (!WATCH_DIALOGUE_USES_TEXT) return false;
```

그래서 수장님이 공태연을 쳐다봐도 말풍선, 자막, 음성이 전부 나오지 않았습니다.

## 수정 내용

1. `WATCH_DIALOGUE_USES_TEXT = true`
2. `WATCH_DIALOGUE_USES_VOICE = true`
3. 첫 WATCH 대사가 쿨다운에 막히지 않도록 수정
4. WATCH 티키타카 중에는 수장 시선이 공태연에게 유지되도록 보정

## GitHub 적용 방법

이미 GitHub Pages에 올린 상태라면:

1. 이 패치의 `index.html`만 기존 GitHub 저장소의 `index.html`에 덮어쓰기
2. Commit changes
3. Pages 재배포 완료 대기
4. 게임 페이지에서 Ctrl + F5

assets 폴더는 다시 올릴 필요 없습니다.
