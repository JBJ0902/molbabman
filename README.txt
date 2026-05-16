몰밥 회의실 서바이벌 v9

실행 방법
1. 압축을 풉니다.
2. index.html을 크롬/엣지 브라우저로 엽니다.
3. 게임 시작 버튼을 누르고 플레이합니다.

조작
- SPACE : 밥 먹기
- K     : 김치 먹기
- O / ESC : 옵션 메뉴
- M     : 음성/오디오 빠른 토글
- 모바일 : 하단 밥/김치 버튼을 누르고 있는 동안 먹기

v9 추가 사항
1) 실제 한국어 성우 mp3 대사 스크립트 완전 분리
- assets/voice_scripts/voice_script_ko.json
- assets/voice_scripts/voice_script_ko.md
- 파일명 규칙에 맞춰 성우 녹음 mp3를 assets/voice 폴더에 교체하면 됩니다.
- 현재 포함된 mp3는 구조 확인용 임시 클립입니다.

2) 수장/팀원별 초상/표정 변화
- assets/portraits 폴더에 캐릭터별 normal/talk/surprised/angry 표정 이미지가 들어 있습니다.
- 대화/경고/적발 상황에 따라 초상 표정이 바뀝니다.

3) 스테이지별 회의 안건 화면
- assets/agenda/agenda_1.png ~ agenda_10.png
- 스테이지마다 중앙 회의 안건판이 바뀝니다.

4) 엔딩 전용 일러스트 고급 교체
- assets/endings 폴더의 전용 엔딩 이미지 사용
- 퍼펙트 / 생존 / 김치왕 / 로켓 / 인턴 엔딩 대응

기존 유지 기능
- 분리형 mp3 음성 클립 우선 재생
- 스테이지별 배경 변화
- 게임오버/클리어 연출 강화
- 장기전/고난도 밸런스
- 경계도 시스템
- 최고점수/최고콤보/엔딩 저장


v9.1 버그 수정
- WARNING 단계에서 키를 바로 뗐는데도 수장이 보는 순간 무조건 강등되던 문제를 수정했습니다.
- keyup/touchend 처리가 safe 단계가 아니어도 반드시 hold 상태를 해제하도록 변경했습니다.
- 수장 시선 전환 직전 손을 뗀 입력을 안전하게 인정하는 0.22초 유예 판정을 추가했습니다.


v9.2 UI/밸런스 설명 개선
- 기존 '경계도'를 '소음 경계도'로 명확히 변경했습니다.
- 수장 시선 WARNING은 소음 경계도와 별개로 동작하므로, 별도 '수장 시선' 카운트다운 게이지를 추가했습니다.
- 이제 소음 경계도 0% 상태에서도 수장 시선 타이머가 끝나면 WARNING이 뜨는 구조를 UI에서 바로 확인할 수 있습니다.
- 수장 시선 게이지는 안전 시간 / 경고 시간 / 쳐다보는 시간을 각각 다른 상태로 표시합니다.


v9.3 수정 사항
- 소음 경계도가 화면에서 계속 0%로 보이던 표시 버그를 수정했습니다.
  - 내부 수치는 올라가고 있었지만 v9.2에서 HUD 갱신 코드가 빠져 있었습니다.
- '소음 소음 경계도'로 중복 표시되던 문구를 '소음 경계도'로 수정했습니다.
- 수장 시선 카운트다운 게이지는 게임이 너무 쉬워지는 문제가 있어 화면에서 숨김 처리했습니다.
- WARNING은 다시 예측이 어려운 수장 시선 이벤트로 동작합니다.


v9.4 엔딩 화면 UI 개선
- 엔딩 전용 패널 폭을 넓히고 전체 레이아웃을 재배치했습니다.
- 엔딩 일러스트 영역을 크게 확장해 그림이 더 크게, 보기 좋게 표시됩니다.
- 엔딩 설명 / 최종 기록 / 버튼 배치를 정돈해 가독성을 높였습니다.
- 모바일/작은 화면에서는 세로 레이아웃으로 자연스럽게 전환됩니다.


v9.4.1 HUD 수정
- v9.4 HUD 스타일을 유지한 채 BGM 박스를 숨겼습니다.
- STAGE 박스가 겹치지 않도록 개별 HUD 박스 최소 너비를 조정했습니다.
- 박스 크기 조절 포인트:
  - #hud : 전체 정렬/줄바꿈/gap
  - .hudItem : 공통 패딩/높이/폰트
  - #stagePanel, #suspicionPanel, #scorePanel 등 : 각 박스 min-width
  - #scoreBarWrap, #suspicionBarWrap : 내부 게이지 높이/여백


v9.6 2줄 방송형 HUD
- 상단 HUD를 2줄 구조로 재배치했습니다.
- 1줄: STAGE / 목숨 / 계급 / 콤보 / 최고점수 / 옵션
- 2줄: 소음 경계도 / 점수 진행 바
- BGM 칸과 수장 시선 시간칸은 표시하지 않습니다.
- 각 패널에 광택/상단 포인트 라인/그림자를 추가해 방송 UI 느낌으로 정리했습니다.

HUD 크기 조절 포인트
1) 전체 열 배치
   - #hud
   - grid-template-columns, gap, left/right/top 조정

2) 공통 박스 크기
   - .hudItem
   - padding, min-height, font-size 조정

3) 개별 박스 폭/위치
   - #stagePanel, #lifePanel, #rankPanel, #comboPanel, #bestPanel, #optionBtn
   - #suspicionPanel, #scorePanel
   - grid-column / grid-row 로 위치 변경 가능

4) 게이지 바
   - #suspicionBarWrap, #scoreBarWrap
   - height, margin-top 조정


v9.7 상단 HUD 높이 조정
- STAGE / 목숨 / 계급 / 콤보 / 최고점수 / 옵션 박스 높이를 줄였습니다.
- 소음 경계도 / 점수 박스는 게이지 바가 있으므로 기존 높이를 유지했습니다.

수정된 CSS 위치
1) 데스크톱 기본값
   #stagePanel, #lifePanel, #rankPanel, #comboPanel, #bestPanel, #optionBtn {
     min-height: 40px;
     padding: 6px 12px;
   }

   #suspicionPanel, #scorePanel {
     min-height: 62px;
     padding: 10px 14px;
   }

2) 1100px 이하
   상단 글자 HUD: min-height 40px
   게이지 HUD: min-height 58px

3) 760px 이하
   상단 글자 HUD: min-height 36px
   게이지 HUD: min-height 54px


v9.8 HUD 개별 크기 설정
- 모든 HUD 박스를 개별적으로 조정할 수 있게 CSS 변수를 적용했습니다.
- 공통 박스 스타일은 .hudItem에 있고, 각 박스별 크기는 아래 ID에서 따로 조정합니다.

개별 조정 위치
- #stagePanel
- #lifePanel
- #rankPanel
- #comboPanel
- #bestPanel
- #optionBtn
- #suspicionPanel
- #scorePanel

주요 조절값
1) 높이
   --hud-h: 40px;

2) 내부 여백
   --hud-pad: 6px 12px;

3) 고정 너비가 필요할 때
   --hud-w: 150px;
   기본값은 auto입니다.

4) 가로 위치와 폭
   grid-column: 1 / span 2;
   앞 숫자는 시작 위치, span 숫자는 차지하는 칸 수입니다.

예시
#stagePanel {
  grid-column: 1 / span 1;
  --hud-h: 34px;
  --hud-pad: 4px 10px;
  --hud-w: 120px;
}

#scorePanel {
  grid-column: 5 / span 8;
  --hud-h: 66px;
  --hud-pad: 10px 14px;
}


v9.9 HUD 글자 정렬 수정
- .hudItem의 기본 flex-direction: column 때문에 STAGE / 1 / 10이 세로로 쪼개져 보이던 문제를 수정했습니다.
- STAGE / 목숨 / 계급 / 콤보 / 최고점수 / 옵션 박스는 flex-direction: row로 변경했습니다.
- 소음 경계도 / 점수 박스는 게이지 바가 있으므로 flex-direction: column을 유지합니다.

수정 위치
#stagePanel,
#lifePanel,
#rankPanel,
#comboPanel,
#bestPanel,
#optionBtn {
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;
}

#suspicionPanel,
#scorePanel {
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
}


v9.10 게이지 HUD 글자 정렬 수정
- 소음 경계도 / 점수 박스의 텍스트가 flex anonymous item으로 분리되어 세로로 내려가 보이던 문제를 수정했습니다.
- 소음 경계도 텍스트와 점수 텍스트를 .hudLabel div로 감싸 한 줄 라벨로 고정했습니다.
- 게이지 바는 라벨 아래에 정렬되도록 margin을 재조정했습니다.

수정된 구조 예시
<div class="hudItem" id="suspicionPanel">
  <div class="hudLabel">소음 경계도 <span id="suspicionText">0</span>%</div>
  <div id="suspicionBarWrap"><div id="suspicionBar"></div></div>
</div>

<div class="hudItem" id="scorePanel">
  <div class="hudLabel">점수 <span id="scoreText">0</span> / <span id="targetText">900</span></div>
  <div id="scoreBarWrap"><div id="scoreBar"></div></div>
</div>


v9.11 HUD 너비 적용 수정
- --hud-w가 CSS grid 안에서 더 확실히 적용되도록 .hudItem에 justify-self 변수를 추가했습니다.
- 상단 HUD 기본 너비를 각각 지정했습니다.
  - STAGE: 120px
  - 목숨: 115px
  - 계급: 140px
  - 콤보: 185px
  - 최고점수: 160px
  - 옵션: 140px
- 소음 경계도 / 점수 박스는 grid 칸을 꽉 채우도록 stretch 상태를 유지합니다.

너비 수정 방법
예시:
#stagePanel {
  grid-column: 1 / span 2;
  grid-row: 1;
  --hud-h: 40px;
  --hud-pad: 6px 12px;
  --hud-w: 120px;          /* 숫자만 쓰면 안 되고 px 필요 */
  --hud-justify: start;    /* start / center / end / stretch */
}

주의:
--hud-w: 120; 은 잘못된 값입니다.
반드시 --hud-w: 120px; 처럼 단위를 붙여야 합니다.


v9.12 HUD 빈공간 축소 / 한 줄형 배치
- HUD 박스 사이 gap을 10px에서 4px로 줄였습니다.
- 소음 경계도와 점수 박스도 데스크톱에서는 윗줄로 올렸습니다.
- 소음 경계도/점수는 세로형 게이지에서 가로형 미니 게이지로 변경했습니다.
- 데스크톱 기준 24칸 grid를 사용해 모든 HUD를 한 줄에 최대한 붙여 배치했습니다.

수정 포인트
1) 박스 사이 간격
#hud {
  gap: 4px;
}

2) 전체 가로 칸 수
#hud {
  grid-template-columns: repeat(24, minmax(0, 1fr));
}

3) 개별 박스 위치
#scorePanel {
  grid-column: 18 / span 5;
  grid-row: 1;
}

4) 소음/점수 게이지를 다시 크게 하고 싶다면
#suspicionPanel, #scorePanel {
  flex-direction: column;
}


v9.13 HUD 간격/문구 정리
- 데스크톱 HUD를 flex 한 줄 배치로 오버라이드해 박스 사이 빈 공간을 줄였습니다.
- gap을 2px로 줄였습니다.
- STAGE 박스 폭을 136px로 늘려 'STAGE 1 / 10'이 잘리지 않게 했습니다.
- '계급:' 문구를 '계급 :'으로 변경했습니다.

데스크톱 HUD 폭 조정 위치
@media (min-width: 1101px) 안에서 조정합니다.

예시:
#stagePanel {
  flex: 0 0 136px;
  --hud-w: 136px;
}

박스 사이 간격:
#hud {
  gap: 2px;
}


v9.14 STAGE/수장 시선 재배치
- 점수/옵션 HUD는 기존 위치를 유지했습니다.
- 우측 배경에 들어가 있던 큰 STAGE 표식이 옵션/점수/수장 시선과 겹치던 문제를 해결하기 위해 stage_1~stage_10 배경 이미지에서 STAGE 표식을 제거했습니다.
- 수장 시선 박스는 데스크톱 기준 우측 상단 HUD 아래 별도 라인으로 정렬했습니다.
- 조정 위치:
  @media (min-width: 1101px) {
    #gazeIndicator {
      top: 64px !important;
      right: 18px !important;
    }
  }


v9.15 STAGE 표식 재배치
- v9.14에서 제거했던 STAGE 배경 표식을 다시 표시했습니다.
- 기존처럼 배경 이미지에 박아 넣지 않고, #stageWatermark 오버레이로 분리했습니다.
- 옵션/점수/수장 시선과 겹치지 않도록 우측 중단(top: 124px, right: 28px)에 배치했습니다.
- 스테이지가 바뀌면 #stageWatermarkText도 함께 갱신됩니다.

위치 조정 방법
#stageWatermark {
  right: 28px;
  top: 124px;
  width: 190px;
  height: 118px;
}


v9.16 STAGE/WARNING 연출 개선
- STAGE 표식 박스를 더 깔끔한 카드형 디자인으로 변경했습니다.
- STAGE / 숫자 / 회의 국면 글자가 박스 안에서 겹치지 않도록 폰트 크기와 grid 배치를 조정했습니다.
- STAGE 숫자 폰트 크기를 줄였습니다.
- WARNING 경고를 전체 화면 빨간 깜빡임에서 작은 경고 박스 방식으로 변경했습니다.
- 화면 깜빡임(hitFlash)을 더 약하고 짧게 줄였습니다.
- 게임 시작 직후 첫 WARNING이 바로 뜨던 문제를 수정하고, 첫 WARNING은 시작 후 7초 뒤에 뜨도록 변경했습니다.

수정 위치
1) 첫 WARNING 시간:
function resetGame() 안의
game.phaseTimer = 7.0;

2) STAGE 표식:
#stageWatermark
.stageWatermarkLabel
.stageWatermarkNo
.stageWatermarkSub

3) WARNING 박스:
#warningOverlay
#warningOverlay.active
@keyframes warningBoxPulse


v9.17 먹기 키 입력시에만 캐릭터 창 표시
- 핑크색 캐릭터의 밥/김치 먹기 사진창(#molbabActor)을 기본 숨김 상태로 변경했습니다.
- SPACE(밥먹기) 또는 K(김치먹기)를 누르고 있는 동안 currentAction()이 rice/kimchi일 때만 .eating 클래스가 붙어 화면에 표시됩니다.
- 키를 떼면 기존 로직대로 setDefaultImage() + .eating 제거가 실행되어 즉시 숨겨집니다.
- warningPulse만으로는 사진창이 보이지 않도록 했습니다.

관련 CSS
#molbabActor {
  opacity: 0;
  visibility: hidden;
}
#molbabActor.eating {
  opacity: 1;
  visibility: visible;
}


v9.18.2 수정 사항
- v9.18.1에서 게임 시작이 안 되던 JS 구문 오류를 수정했습니다.
- 첫 화면의 패치 내역 문구를 게임 설명 문구로 교체했습니다.
- WARNING 경고창이 기존 자막과 겹치지 않도록 정리했습니다.
- 경고 단계에서도 밥/김치 자동연타가 끊기지 않도록 유지했습니다.
- 수장 시선 대상: 팀원 1~7 / 중앙 / 우측 창가 / 핑크 캐릭터.
- SOOP 방송, 합방, 별풍선, 클립, 휴방 관련 코믹 대사를 추가했습니다.


v9.18.3 HUD / 방송 회의 안건 수정
- 후반부 계급 글자와 최고점수 글자가 HUD 박스와 겹치지 않도록 박스 폭을 늘렸습니다.
  - #rankPanel: 158px
  - #bestPanel: 178px
- 점수 박스는 소폭 줄였습니다.
  - #scorePanel: flex 0.85 1 270px / min-width 245px
- 수장 시선의 창가 대상이 사무실 벽 쪽으로 향하던 문제를 수정했습니다.
  - window target을 좌측 창가 좌표로 변경
  - 표시 문구도 좌측 창가로 변경
- 중앙 STAGE 안건 이미지를 방송 크루 회의 내용에 맞게 전면 교체했습니다.
  - 방송 킥오프, 썸네일, 합방, 별풍선, 클립, 휴방 방지, 민심 회복, 레전드 클립, 별풍선 목표, 최종 생존 회의


v9.18.4 창가 표시문구 수정
- 수장 시선 표시 문구를 '좌측 창가'에서 '창가'로 변경했습니다.
- 시선 좌표는 기존처럼 실제 창가 쪽을 바라보도록 유지했습니다.

v9.18.13 음성/자막 동기화 수정
- Typecast로 생성한 117개 캐릭터별 MP3를 게임 대화 시스템에 직접 연결했습니다.
- 수장님/공태연/슈니/쩜냥이/루루시/다시바/초금비/ㅎㄱㅅ/큐티섹시의 대사 자막과 재생 파일명이 1:1로 맞도록 수정했습니다.
- 기존 랜덤 공용 음성 대신 assets/voice/{캐릭터}/ 파일을 직접 호출합니다.
- 멤버 대사는 생성 당시의 파일명 규칙에 맞춰 캐릭터별 대사 번호를 고정했습니다.
- 긴 한국어 대사가 끝나기 전에 말풍선이 사라지지 않도록 자막 표시 시간을 대사 길이에 따라 자동 조정합니다.
- WARNING/수장 시선 단계 진입 시 이전 대화 음성을 정리하여 게임 진행 상황과 음성이 어긋나지 않도록 보정했습니다.
