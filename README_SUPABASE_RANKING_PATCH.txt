# Supabase 온라인 랭킹 연결 패치

## 적용 기능

1. Supabase scores 테이블 연결
2. 게임 종료 시 온라인 기록 자동 저장
3. 첫 저장 시 닉네임 입력
4. 엔딩 화면에 온라인 랭킹 TOP 10 표시
5. 저장 실패해도 게임 진행에는 영향 없도록 안전 처리

## 사용한 Supabase 설정

Project URL:
https://enbypvyaepkklqppzrfz.supabase.co

Key:
anon public key 사용

주의:
service_role key는 절대 index.html이나 GitHub에 올리면 안 됩니다.

## GitHub 적용 방법

1. 이 패치의 index.html을 GitHub 저장소에 덮어쓰기
2. Commit changes
3. Pages 재배포 완료 대기
4. 게임 페이지에서 Ctrl + F5
5. 게임을 한 번 끝낸 뒤 Supabase Table Editor에서 scores 행이 추가되는지 확인
