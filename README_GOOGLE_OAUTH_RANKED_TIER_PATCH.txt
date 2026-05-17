# 몰밥 게임 Google OAuth 온라인 순위전 / 티어 / 엔딩 클라우드 저장 패치

## 반드시 먼저 할 일

Supabase SQL Editor에서 이 ZIP 안의 SQL 파일을 먼저 실행하세요.

- `SUPABASE_GOOGLE_RANKED_SCHEMA.sql`

이 SQL은 아래 테이블과 정책을 만듭니다.

- `profiles`
- `ending_unlocks`
- 기존 `scores` 테이블에 `user_id`, `tier`, `mode`, `best_score_after` 컬럼 추가
- RLS 정책 갱신

## 적용 기능

1. Google OAuth 로그인 기반 온라인 순위전
2. 닉네임 생성/변경
3. user_id 기준 개인 최고점수 저장
4. 10단계 회사/회의실 스토리형 티어 부여
5. 온라인 순위전 TOP 10 표시
6. 엔딩 해금 데이터를 Supabase `ending_unlocks`에 저장
7. 로그인 시 온라인 엔딩 해금 데이터를 로컬 갤러리에 반영
8. 현재 접속자 수 표시
9. 온라인 기록 저장 안내/면책 문구 표시
10. 일반 게임과 온라인 순위전 UI 분리

## 티어 10단계

1. 방출 후보
2. 수습 인턴
3. 인턴
4. 계약직
5. 정직원
6. 주임
7. 대리
8. 과장
9. 몰밥 마스터
10. 레전드 1검

## 티어 기준

- 0점: 방출 후보
- 10,000점: 수습 인턴
- 25,000점: 인턴
- 45,000점: 계약직
- 70,000점: 정직원
- 95,000점: 주임
- 125,000점: 대리
- 160,000점: 과장
- 200,000점: 몰밥 마스터
- 250,000점: 레전드 1검

## 개인정보 최소 저장

공개 테이블에는 아래 게임 데이터만 저장합니다.

- Supabase user_id
- 닉네임
- 최고점수
- 티어
- 플레이 횟수
- 최대 콤보
- 엔딩 해금 수
- 각 판 점수 기록
- 엔딩 해금 키

Google 이메일은 공개 랭킹에 표시하지 않습니다.

## 적용 순서

1. Supabase SQL Editor에서 `SUPABASE_GOOGLE_RANKED_SCHEMA.sql` 실행
2. GitHub 저장소의 `index.html` 교체
3. Commit changes
4. Pages 재배포 완료 대기
5. 게임 페이지에서 Ctrl + F5
6. 시작 화면 → 온라인 순위 경쟁전 → Google 로그인 테스트
7. 순위전 1판 종료 후 Supabase `profiles`, `scores`, `ending_unlocks` 확인

## 주의

- Google Provider가 Supabase Authentication에서 Enabled 상태여야 합니다.
- Supabase URL Configuration에 GitHub Pages 주소가 등록되어 있어야 합니다.
- Google Cloud OAuth Client의 Authorized redirect URI에는 Supabase callback URL이 들어가 있어야 합니다.
- Client Secret은 절대 GitHub/index.html에 넣지 마세요.
