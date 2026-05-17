# 닉네임 입력 중 M/O/SPACE/R 전역 단축키 오작동 수정 패치

## 문제

온라인 순위전 닉네임 입력창에서 ADMIN 같은 닉네임을 입력할 때,
M/O/SPACE/R 키가 글자로 입력되지 않고 게임 전역 단축키로 먼저 처리되었습니다.

예:
- M → BGM/음성 토글
- O → 옵션
- SPACE → 밥 먹기
- R → 현재 스테이지 재시작

## 수정 내용

1. input/textarea/select/button/contenteditable 포커스 상태에서는 게임 전역 단축키 차단
2. 온라인 순위전 UI가 열려 있는 동안 게임 단축키 차단
3. 온라인 순위전 UI에서는 ESC로 닫기만 허용
4. 닉네임 입력창에서 M/O/SPACE/R 정상 입력 가능

## GitHub 적용 방법

이번 패치는 index.html만 교체하면 됩니다.

1. index.html 전용 ZIP 압축 풀기
2. GitHub 저장소의 index.html 교체
3. Commit changes
4. Pages 재배포 완료 대기
5. 게임 페이지에서 Ctrl + F5
6. 온라인 순위 경쟁전 → 닉네임 입력창에서 ADMIN / M O R SPACE 입력 테스트
