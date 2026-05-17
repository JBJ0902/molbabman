# 수장님-공태연 WATCH 티키타카 자막 전용 패치

## 변경 이유

수장님과 공태연의 WATCH 티키타카 음성이 재생되는 동안,
수장님이 공태연을 계속 쳐다보고 있어서 플레이어가 밥/김치를 누르기 어려운 문제가 있었습니다.

## 수정 내용

1. WATCH 티키타카 자막은 유지
2. WATCH 티키타카 음성은 OFF
3. 티키타카 때문에 WATCH 상태를 오래 붙잡는 로직 제거
4. 수장님 시선 시간은 기존 게임 패턴대로만 진행
5. WATCH 티키타카 자막 표시 시간을 짧게 조정
6. WATCH 티키타카 쿨다운을 5.2초로 조정해 너무 자주 뜨지 않게 함

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
