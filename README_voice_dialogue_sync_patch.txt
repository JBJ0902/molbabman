동꼽즈/몰밥 회의 게임 음성-자막 동기화 패치

수정 내용:
1. 수장/크루/공태연 대사가 MP3 재생 종료 후 다음 대사로 넘어가도록 변경했습니다.
2. 기존 0.52초/1.08초 고정 setTimeout 방식 때문에 음성이 겹치던 문제를 제거했습니다.
3. 자막 말풍선 표시시간을 음성 길이에 맞게 유지하도록 변경했습니다.
4. 수장 시선 타이머, WARNING, WATCH 속도와 패턴은 기존 값을 유지했습니다.
5. 일반 대화 중에도 WARNING/WATCH가 오면 대화를 즉시 중단하고 공태연 쪽을 보도록 유지했습니다.
6. WATCH 상황에서는 수장 경고 음성이 끝난 뒤 공태연 변명 음성이 재생됩니다.
7. Typecast로 생성한 assets/voice/캐릭터명/*.mp3 파일명 구조와 자막을 1:1로 연결했습니다.
8. ㅎㄱㅅ는 assets/voice/hgs 폴더 기준으로 연결했습니다.

적용 방법:
- 전체 ZIP을 쓰는 경우: 압축을 풀고 index.html을 실행하면 됩니다.
- 패치 ZIP만 쓰는 경우: 기존 게임 폴더의 index.html만 덮어쓰면 됩니다.

확인 사항:
- assets/voice/sujang
- assets/voice/gongtaeyeon
- assets/voice/schuni
- assets/voice/jjeomnyangi
- assets/voice/rurushi
- assets/voice/dasiba
- assets/voice/chogeumbi
- assets/voice/hgs
- assets/voice/cutiesexy
위 폴더가 있어야 음성이 정상 재생됩니다.
