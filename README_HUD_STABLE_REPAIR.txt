# HUD 안정 복구 패치 v9.18.24

## 해결한 문제

기존 HUD는 24칸 CSS grid 방식이었는데,
최고점수 위치만 옮기려고 grid-column을 바꾸는 과정에서
박스 폭과 기존 미디어쿼리 설정이 충돌해 STAGE / 계급 / 콤보 텍스트가 세로로 줄바꿈되었습니다.

이번 패치는 상단 HUD만 flex 레이아웃으로 강제해서 안정적으로 복구합니다.

## 최종 배치

STAGE | 계급 | 콤보 | 소음 경계도 길게 | 점수/총점 작게 | 최고점수 | 옵션

## 적용 방법

1. 압축을 풉니다.
2. index.html을 기존 게임 폴더의 index.html에 덮어쓰기합니다.
3. assets 폴더는 그대로 유지합니다.

## 직접 조정할 때

index.html에서 아래 주석을 검색하세요.

PATCH v9.18.24 - HUD 안정 복구 패치

최고점수 칸 폭:
#bestPanel { flex: 0 0 160px; }

점수/총점 칸 폭:
#scorePanel { flex: 0 0 178px; }

소음 경계도 최소 폭:
#suspicionPanel { min-width: 340px; }

이 3개만 조정하면 됩니다.
