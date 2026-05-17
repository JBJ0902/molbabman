# 수장님-공태연 WATCH 티키타카 자막/음성 복구 패치

## 수정 내용

수장님이 공태연 캐릭터를 실제로 쳐다보는 WATCH 구간에서
수장님 대사와 공태연 답변 티키타카를 다시 활성화했습니다.

## 변경 사항

1. `WATCH_DIALOGUE_USES_VOICE = true`로 변경
2. HYBRID 음성 모드에서도 WATCH 전용 티키타카는 재생되도록 수정
3. 수장님 대사 → 공태연 답변 순서로 자막과 음성 재생
4. 티키타카 음성이 재생 중이면 WATCH 상태를 바로 풀지 않음
5. 대화가 끝나면 안전 구간으로 복귀
6. 일반 회의 음성은 기존 HYBRID 정책을 유지해서 과도한 음성 겹침을 방지

## GitHub 적용 방법

이미 GitHub Pages에 올린 상태라면:

1. 이 패치의 `index.html`만 기존 GitHub 저장소의 `index.html`에 덮어쓰기
2. Commit changes
3. Pages 재배포 완료 대기
4. 게임 페이지에서 Ctrl + F5

assets 폴더는 다시 올릴 필요 없습니다.
