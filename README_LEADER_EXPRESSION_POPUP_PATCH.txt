# 수장님 4표정 팝업 적용 패치

## 적용된 표정

- `assets/portraits/leader_normal.png` : 평상시 표정
- `assets/portraits/leader_talk.png` : 말할 때 표정
- `assets/portraits/leader_surprised.png` : 놀랄 때 표정
- `assets/portraits/leader_angry.png` : 화날 때 표정

## 적용 위치

1. 일반 상태 / 대화가 끝난 뒤
   - 평상시 표정

2. 수장님이 회의 대사를 말할 때
   - 말할 때 표정

3. WARNING / 곧 쳐다보기 직전
   - 놀랄 때 표정

4. WATCH / 공태연 감시 / 강등 음성
   - 화날 때 표정

## 주의

이번 패치는 `index.html`만으로는 완전히 적용되지 않습니다.
새 이미지 4개도 함께 업로드해야 합니다.

GitHub 적용 시 아래 파일을 같이 올리세요.

- `index.html`
- `assets/portraits/leader_normal.png`
- `assets/portraits/leader_talk.png`
- `assets/portraits/leader_surprised.png`
- `assets/portraits/leader_angry.png`
