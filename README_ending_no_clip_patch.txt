# 엔딩 일러스트/엔딩창 안 짤림 패치

## 수정 내용

- 엔딩 팝업창이 게임 화면 밖으로 튀어나가지 않도록 높이를 제한했습니다.
- 왼쪽 엔딩 이미지는 `object-fit: contain`을 강제로 적용해서 위/아래/좌우가 잘리지 않게 했습니다.
- 오른쪽 결과 텍스트 영역은 길어질 경우 오른쪽 박스 안에서만 스크롤되게 했습니다.
- 제목 글자 크기와 패널 여백을 줄여 전체 엔딩창이 한 화면 안에 들어오도록 조정했습니다.
- 업로드한 로켓 엔딩 이미지를 `assets/endings/rocket.png` 경로에 함께 넣었습니다.

## 적용 방법

1. 압축을 풉니다.
2. `index.html`을 기존 게임 폴더의 `index.html`에 덮어쓰기합니다.
3. ZIP 안의 `assets/endings/rocket.png`도 기존 게임 폴더의 `assets/endings/rocket.png`에 덮어쓰기합니다.
4. 기존 `assets/voice`, `assets/sfx` 폴더는 그대로 둡니다.
5. 게임 실행 후 로켓 방출 엔딩 화면을 확인합니다.

## 조정한 핵심 CSS

- `#endingIllustrationOverlay .panel`
- `#endingArtTitle`
- `.endingLayout`
- `.endingArt`
- `.endingArt img`
- `.endingMeta`
