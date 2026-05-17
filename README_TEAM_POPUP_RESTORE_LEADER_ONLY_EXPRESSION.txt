# 팀원 팝업 복구 / 수장님만 4표정 적용 패치

## 문제 원인

이전 수장님 4표정 패치에서 `getPortraitImagePath()`가 수장님뿐 아니라 팀원들에게도
`assets/portraits/캐릭터_normal.png` 같은 표정 이미지를 우선 적용하도록 되어 있었습니다.

그래서 팀원 팝업이 원래 사용하던 `assets/popup_cards/*.png`가 아니라
다른 포트레이트 이미지로 바뀌어 보였습니다.

## 수정 내용

1. 수장님만 4표정 전용 이미지 사용
   - `assets/portraits/leader_normal.png`
   - `assets/portraits/leader_talk.png`
   - `assets/portraits/leader_surprised.png`
   - `assets/portraits/leader_angry.png`

2. 팀원 팝업은 기존 이미지로 고정
   - `assets/popup_cards/blue.png`
   - `assets/popup_cards/black.png`
   - `assets/popup_cards/white.png`
   - `assets/popup_cards/cat.png`
   - `assets/popup_cards/green.png`
   - `assets/popup_cards/purple.png`
   - `assets/popup_cards/cat2.png`
   - `assets/popup_cards/player.png`

3. 비수장님 캐릭터는 말할 때/위험상태에도 이미지 자체는 바뀌지 않음
4. 불필요한 팀원 portrait preload 제거

## GitHub 적용 방법

이미 수장님 4표정 assets를 올린 상태라면 이번에는 `index.html`만 교체하면 됩니다.

1. 이 패치의 `index.html`을 GitHub 저장소에 덮어쓰기
2. Commit changes
3. Pages 재배포 완료 대기
4. 게임 페이지에서 Ctrl + F5

assets 폴더는 다시 올릴 필요 없습니다.
