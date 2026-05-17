# 옵션 메뉴 일시정지 / 딴짓 경고 5포인트 누적 재시작 / 카운트다운 GUI 패치

## 수정 내용

1. 옵션 메뉴가 열려 있으면 게임 진행이 완전히 멈춥니다.
   - 남은 시간
   - 수장님 시선 타이머
   - 소음 경계도
   - 20초 무입력 타이머
   - 대화/경고 진행

2. 20초 무입력 경고 방식 변경
   - 이전: 20초 무입력 1회 발생 시 현재 스테이지 즉시 재시작
   - 변경: 20초 무입력 1회마다 딴짓 경고 1포인트 누적
   - 딴짓 경고 5포인트 누적 시 현재 스테이지 재시작
   - 스테이지 재시작 시 딴짓 경고 포인트는 0/5로 초기화

3. 딴짓 경고 카운트다운 GUI 추가
   - 20초 기준, 마지막 10초부터 우측 하단에 경고 예정 카드 표시
   - 진행 바와 남은 초 표시
   - 상태창과 겹치지 않게 우측 하단 상태창 위쪽에 배치

4. 목표 점수/몰밥 횟수 미달과 딴짓 경고 분리
   - 목표 미달은 방송 실적 부족 알림
   - 딴짓 경고는 무입력 기준으로만 누적

## 캐릭터 팝업 사진 높이 조절 방법

index.html의 CSS에서 아래 부분을 찾으세요.

```css
.portraitBadge {
```

또는 수장님만 조절하려면 아래 부분을 찾으세요.

```css
.portraitBadge[data-person="leader"] {
```

팝업을 아래로 내리고 싶으면 `top`, `bottom`, 또는 `transform` 값을 조절하면 됩니다.

예시:

```css
.portraitBadge {
  transform: translateY(28px);
}
```

수장님만 아래로 내리려면:

```css
.portraitBadge[data-person="leader"] {
  transform: translateY(32px);
}
```

이미 기존 transform이 있다면 값을 합쳐야 합니다.

예:

```css
transform: translateY(32px) scale(1);
```

## GitHub 적용 방법

이번 패치는 index.html만 교체하면 됩니다.

1. index.html 전용 ZIP 압축 풀기
2. GitHub 저장소의 index.html 교체
3. Commit changes
4. Pages 재배포 완료 대기
5. 게임 페이지에서 Ctrl + F5
6. 옵션 메뉴 열고 남은 시간/시선 타이머 정지 확인
7. SPACE/K를 20초 이상 누르지 않아 경고 포인트 누적 확인
