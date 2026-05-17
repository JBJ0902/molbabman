
    const riceFrames = Array.from({length: 8}, (_, i) => `assets/rice/molbab_${i + 1}.png`);
    const kimchiFrames = Array.from({length: 10}, (_, i) => `assets/kimchi/molkimchi_2_${i + 1}.png`);
    const defaultImage = "assets/player/molbab_default_image.png";
    const endingImages = {
      perfect: "assets/endings/perfect.png",
      clear: "assets/endings/clear.png",
      kimchiKing: "assets/endings/kimchiKing.png",
      rocket: "assets/endings/rocket.png",
      intern: "assets/endings/intern.png"
    };

    const stageBackgrounds = Array.from({length: 10}, (_, i) => `assets/bg/stage_${i + 1}.png`);
    const agendaImages = Array.from({length: 10}, (_, i) => `assets/agenda/agenda_${i + 1}.png`);
    const portraitKeys = ["leader","blue","black","white","cat","green","purple","cat2"];
    const portraitExpressions = ["normal","talk","surprised","angry"];
    const portraitPaths = Object.fromEntries(portraitKeys.map(k => [k, Object.fromEntries(portraitExpressions.map(e => [e, `assets/portraits/${k}_${e}.png`]))]));
    const popupCardPaths = { leader: "assets/popup_cards/leader.png", blue: "assets/popup_cards/blue.png", black: "assets/popup_cards/black.png", white: "assets/popup_cards/white.png", cat: "assets/popup_cards/cat.png", green: "assets/popup_cards/green.png", purple: "assets/popup_cards/purple.png", cat2: "assets/popup_cards/cat2.png", player: "assets/popup_cards/player.png" };

    const voiceClips = {
      leaderMeeting: [
        "assets/voice/leader_meeting_1.mp3",
        "assets/voice/leader_meeting_2.mp3",
        "assets/voice/leader_meeting_3.mp3",
        "assets/voice/leader_meeting_4.mp3"
      ],
      memberMeeting: [
        "assets/voice/member_meeting_1.mp3",
        "assets/voice/member_meeting_2.mp3",
        "assets/voice/member_meeting_3.mp3",
        "assets/voice/member_meeting_4.mp3",
        "assets/voice/member_meeting_5.mp3",
        "assets/voice/member_meeting_6.mp3"
      ],
      leaderReply: [
        "assets/voice/leader_reply_1.mp3",
        "assets/voice/leader_reply_2.mp3",
        "assets/voice/leader_reply_3.mp3"
      ],
      warning: [
        "assets/voice/warning_1.mp3",
        "assets/voice/warning_2.mp3"
      ],
      caught: [
        "assets/voice/caught_1.mp3",
        "assets/voice/caught_2.mp3"
      ],
      demote: [
        "assets/voice/demote_1.mp3",
        "assets/voice/demote_2.mp3",
        "assets/voice/demote_3.mp3"
      ],
      rocket: [
        "assets/voice/rocket_1.mp3"
      ],
      stageIntro: [
        "assets/voice/stage_intro_1.mp3",
        "assets/voice/stage_intro_2.mp3",
        "assets/voice/stage_intro_3.mp3"
      ],
      endings: {
        perfect: ["assets/voice/ending_perfect_1.mp3"],
        clear: ["assets/voice/ending_clear_1.mp3"],
        kimchiKing: ["assets/voice/ending_kimchiKing_1.mp3"],
        rocket: ["assets/voice/ending_rocket_1.mp3"],
        intern: ["assets/voice/ending_intern_1.mp3"]
      }
    };

    const sounds = {
      rice: "assets/sfx/rice.mp3",
      kimchi: "assets/sfx/kimchi.mp3",
      warning: "assets/sfx/warning.mp3",
      caught: "assets/sfx/caught.mp3",
      clear: "assets/sfx/clear.mp3",
      rocket: "assets/sfx/rocket.mp3",
      combo: "assets/sfx/combo.mp3",
      bgm_early: "assets/sfx/bgm_early.mp3",
      bgm_mid: "assets/sfx/bgm_mid.mp3",
      bgm_late: "assets/sfx/bgm_late.mp3"
    };

    const SETTINGS_KEY = "molbab_v9_settings";
    const RECORDS_KEY = "molbab_v9_records";

    const defaultSettings = {
      bgmVolume: 0.55,
      sfxVolume: 0.70,
      voiceVolume: 1.00,
      bgmEnabled: true,
      sfxEnabled: true,
      voiceEnabled: true
    };

    // HYBRID AUDIO MODE
    // 일반 회의 대화는 자막/말풍선만 사용하고, 실제 이벤트만 음성으로 재생합니다.
    // 이렇게 해야 수장님 시선 타이머와 긴 TTS 음성이 서로 충돌하지 않습니다.
    const HYBRID_AUDIO_EVENT_ONLY = true;
    const MEETING_DIALOGUE_USES_VOICE = !HYBRID_AUDIO_EVENT_ONLY;
    const WATCH_DIALOGUE_USES_VOICE = false;
    const WATCH_DIALOGUE_USES_TEXT = true;


    const defaultRecords = {
      highScore: 0,
      bestCombo: 0,
      endings: {
        perfect: false,
        clear: false,
        kimchiKing: false,
        rocket: false,
        intern: false
      }
    };

    function clone(obj) { return JSON.parse(JSON.stringify(obj)); }
    function loadJson(key, fallback) {
      try {
        const data = JSON.parse(localStorage.getItem(key));
        return data ? { ...clone(fallback), ...data, endings: { ...(fallback.endings||{}), ...((data&&data.endings)||{}) } } : clone(fallback);
      } catch {
        return clone(fallback);
      }
    }

    let settings = loadJson(SETTINGS_KEY, defaultSettings);
    let records = loadJson(RECORDS_KEY, defaultRecords);

    function saveSettings() { localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); }
    function saveRecords() { localStorage.setItem(RECORDS_KEY, JSON.stringify(records)); }

    const bubblePeople = [
      { id: "leader", name: "수장님", x: 49.6, y: 18.8, px: 40.6, py: 30.2, role: "leader", cls: "speaker-leader", pitch: 0.82, rate: 1.0 },
      { id: "blue", name: "슈니", x: 10.4, y: 35.2, px: 10.4, py: 45.0, role: "member", cls: "speaker-blue", pitch: 1.25, rate: 1.1 },
      { id: "black", name: "쩜냥이", x: 20.2, y: 32.0, px: 20.2, py: 42.0, role: "member", cls: "speaker-black", pitch: 0.95, rate: 1.02 },
      { id: "white", name: "루루시", x: 29.0, y: 31.0, px: 29.0, py: 41.4, role: "member", cls: "speaker-white", pitch: 1.16, rate: 1.02 },
      { id: "cat", name: "다시바", x: 71.9, y: 29.0, px: 71.9, py: 39.4, role: "member", cls: "speaker-cat", pitch: 1.3, rate: 1.12 },
      { id: "green", name: "초금비", x: 80.0, y: 34.6, px: 80.0, py: 44.8, role: "member", cls: "speaker-green", pitch: 1.1, rate: 1.06 },
      { id: "purple", name: "ㅎㄱㅅ", x: 88.6, y: 38.2, px: 88.6, py: 48.2, role: "member", cls: "speaker-purple", pitch: 0.98, rate: 0.98 },
      { id: "cat2", name: "큐티섹시", x: 94.5, y: 50.0, px: 94.5, py: 60.0, role: "member", cls: "speaker-cat2", pitch: 1.22, rate: 1.06 }
    ];

    const playerSpeaker = {
      id: "player",
      name: "공태연",
      x: 17.0,
      y: 66.0,
      px: 10.8,
      py: 72.8,
      role: "player",
      cls: "speaker-player",
      pitch: 1.24,
      rate: 1.08
    };

    function getBubblePersonByTarget(targetKey) {
      const map = { team1: "blue", team2: "black", team3: "white", team4: "cat", team5: "green", team6: "purple", team7: "cat2" };
      if (targetKey === "player") return playerSpeaker;
      const id = map[targetKey];
      return bubblePeople.find(p => p.id === id) || null;
    }


    const stageDialogue = {
      early: {
        leaderAsk: [
          "오늘 개인방송 스타트는 몇 시로 잡을까요?",
          "썸네일은 누가 가장 낚시 제목으로 뽑았어요?",
          "어제 별풍선 정산표, 솔직하게 보고 부탁드립니다.",
          "합방 스케줄 다시 맞춰야 하는데 가능한 시간 있나요?",
          "클립 채널 제목은 자극적으로 가도 괜찮겠죠?",
          "오늘 컨텐츠는 게임입니까, 토크입니까, 아니면 둘 다입니까?",
          "팬카페 공지는 올렸죠? 또 까먹은 사람 없죠?",
          "수금... 아니 후원 리액션 연습은 다 했습니까?"
        ],
        memberReply: [
          "오늘은 방송 켜자마자 사과부터 하고 시작할 예정입니다.",
          "별풍선은 많이 받았는데 멘트가 부족해서 지금 외우는 중입니다.",
          "합방은 가능합니다. 다만 제 멘탈은 아직 참가 여부를 보류했습니다.",
          "썸네일은 준비됐습니다. 클릭하면 후회하게 만드는 느낌입니다.",
          "토크 주제는 열 개 적어뒀는데 다 잡담으로 변질될 예정입니다.",
          "클립은 이미 따였고, 창피한 장면만 알고리즘을 타고 있습니다.",
          "팬분들이 오늘도 채팅으로 저를 교정해 주실 예정입니다.",
          "공지 올렸습니다. 그런데 읽은 분보다 안 읽은 분이 더 많습니다."
        ],
        leaderReply: [
          "좋아요. 방송각은 살리고 사고만 줄이면 됩니다.",
          "그 텐션이면 괜찮네요. 다만 선 넘기는 금지입니다.",
          "아주 좋습니다. 문제는 늘 실전에서 터집니다.",
          "보고는 훌륭한데, 결과도 그만큼 따라와야 합니다.",
          "역시 우리 크루답네요. 정상은 아닌데 재밌습니다.",
          "좋습니다. 오늘도 웃기기만 하고 정산은 많이 갑시다."
        ],
        center: [
          "오늘 회의 핵심은 방송 시간표랑 합방 라인업 정리입니다.",
          "클립감, 썸네일, 별풍선 리액션 이 세 개는 무조건 챙깁시다.",
          "오늘도 시청자들이 좋아할 만한 대환장 포인트를 미리 준비합시다.",
          "개인방송, 합방, 휴방 공지까지 오늘 안에 다 정리합니다."
        ],
        window: [
          "왼쪽 창가 쪽 야경 괜찮네요. 저기 앉으면 방송각 좀 살겠어요.",
          "창가 쪽 분위기 좋네요. 저기서 토크하면 감성은 챙기겠습니다.",
          "저 창가 자리, 별풍선 잘 터질 때 표정 연습하기에 좋아 보이네요.",
          "창가를 보니까 감성 멘트 하고 싶은데, 우리한텐 그보다 개그가 맞죠."
        ],
        watchLeader: [
          "야! 공태연, 방금 뭐 씹는 소리 난 것 같은데요?",
          "야! 공태연, 회의 중에 입이 너무 바쁜데 설명 가능합니까?",
          "야! 공태연, 지금 표정이 너무 수상한데 무슨 일입니까?",
          "야! 공태연, 입가가 이상하게 행복해 보이는데요?"
        ],
        playerReply: [
          "저는 회의의 공기를 천천히 음미하고 있었습니다.",
          "김치는 아니고요, 몰입형 ASMR 테스트 중이었습니다.",
          "입이 움직인 건 다음 멘트를 미리 시뮬레이션한 겁니다.",
          "저는 아무것도 안 먹었습니다. 볼살이 자체 반응한 겁니다.",
          "지금요? 방송용 리액션 표정 연습이었습니다, 수장님."
        ]
      },
      mid: {
        leaderAsk: [
          "어제 별풍선은 얼마나 받았어요?",
          "클립 조회수 잘 나온 사람은 비결 공유 좀 해보세요.",
          "오늘 합방에서 누가 제일 먼저 사고 칠 것 같습니까?",
          "채팅 반응 좋았던 멘트는 오늘도 재활용 가능합니까?",
          "휴방 공지 올릴 사람은 미리 솔직하게 자수하세요.",
          "오늘 썸네일 문구, 선 세게 넘는 사람 없었죠?",
          "팬덤 결집용 멘트 준비한 분 계십니까?",
          "이번 달 목표는 웃음과 별풍선 둘 다 챙기는 겁니다."
        ],
        memberReply: [
          "님보다는 많이 받았어요. 그래서 오늘은 표정 관리 중입니다.",
          "조회수는 잘 나왔는데 댓글창에서 제 멘탈이 먼저 찢겼습니다.",
          "사고 칠 사람은 모르겠지만, 편집자는 이미 울 준비가 끝났습니다.",
          "좋았던 멘트는 있습니다. 다만 제 발음이 다시 망칠 수 있습니다.",
          "휴방은 없습니다. 대신 방송 켜고 휴식 같은 진행을 하겠습니다.",
          "썸네일은 세게 갔지만 규정선은 간신히 넘지 않았습니다.",
          "팬덤 결집 멘트는 준비됐습니다. 문제는 제가 웃음을 참지 못합니다.",
          "별풍선 목표치는 높게 잡았고, 양심은 낮게 잡았습니다."
        ],
        leaderReply: [
          "좋아요. 자신감은 합격인데 결과도 그렇게 나오길 바랍니다.",
          "그 멘트 좋네요. 단, 잘못 쓰면 바로 밈 됩니다.",
          "역시 우리 크루는 보고만 들어도 방송이네요.",
          "좋습니다. 오늘도 민심과 정산 둘 다 챙겨봅시다.",
          "훌륭합니다. 그 텐션 유지하고 선만 넘지 마세요.",
          "좋아요. 그렇게 말한 사람일수록 오늘 가장 먼저 당황합니다."
        ],
        center: [
          "중앙 안건 다시 보죠. 오늘은 합방 순서와 별풍선 목표치가 핵심입니다.",
          "오늘 공통 목표는 채팅창 폭발, 클립 양산, 멘탈 최소 손상입니다.",
          "스케줄표 다시 보겠습니다. 개인방송 겹치는 구간은 정리합시다.",
          "오늘 회의 결론은 간단합니다. 웃기고, 버티고, 잘 받으면 됩니다."
        ],
        window: [
          "창가 쪽 보니까 감성방송 하고 싶지만, 결국 또 소리지르겠죠.",
          "저 창가에서 멍 때리면 휴방 욕구가 올라오니까 다들 조심하세요.",
          "창가 자리 분위기는 좋은데, 우리 크루가 앉으면 바로 개그 방송 됩니다.",
          "저기서 방송하면 조명은 좋은데 민낯 텐션도 같이 드러나겠네요."
        ],
        watchLeader: [
          "야! 공태연, 방금 바삭한 사운드가 회의보다 더 선명했어요.",
          "야! 공태연, 지금 그 미묘한 표정... 먹방 시그널 아닙니까?",
          "야! 공태연, 혹시 회의 중에 도시락 방송 테스트 중인가요?",
          "야! 공태연, 제가 못 본 척하기엔 너무 행복해 보이는데요?"
        ],
        playerReply: [
          "수장님, 그건 제 위장이 낸 방송 효과음이었습니다.",
          "먹방은 아니고요, 긴장 완화용 무음 퍼포먼스였습니다.",
          "도시락이 아니라 집중력 충전이라고 봐주시면 안 될까요?",
          "방송 테스트는 맞는데, 식감 테스트까지는 아니었습니다.",
          "제가 조금 행복해 보였다면 그건 회의가 즐거워서입니다... 아마도요."
        ]
      },
      late: {
        leaderAsk: [
          "조만간 나갈 준비하세요! 라고 하면 누가 제일 먼저 부정합니까?",
          "오늘은 누가 방송으로 민심 역주행을 만들 자신 있습니까?",
          "큰손 팬 대응 멘트는 다들 준비되어 있죠?",
          "이번 주 클립왕은 누구라고 생각합니까?",
          "잠깐만요, 오늘 텐션 왜 이렇게 다들 위험하게 높죠?",
          "채팅창 수습 담당은 정했습니까? 저번엔 너무 대환장이었어요.",
          "오늘 목표 별풍선이 높던데, 다들 양심도 같이 올렸습니까?",
          "방송 끝나고 반성회는 하되, 너무 반성하진 맙시다."
        ],
        memberReply: [
          "저는 영원히 안 나갑니다. 계약보다 집착이 더 깁니다.",
          "민심 역주행 자신 있습니다. 내려갈 민심이 이미 없습니다.",
          "큰손 팬 대응 멘트는 준비됐는데, 막상 오면 목소리가 올라갑니다.",
          "클립왕은 저 아닙니다. 제 흑역사가 또 우승할 것 같습니다.",
          "텐션이 높은 이유는 다들 오늘 후원 알림을 기대해서 그렇습니다.",
          "채팅창 수습은 불가능합니다. 대신 더 웃기게 포장하겠습니다.",
          "목표치는 높고 양심은 조금 흔들리지만, 열정만큼은 진짜입니다.",
          "반성회는 가능하지만 다음 방송에 똑같이 반복될 확률이 높습니다."
        ],
        leaderReply: [
          "좋습니다. 저 그 뻔뻔함 아주 높게 평가합니다.",
          "이 정도면 방송 재능이 아니라 생존 재능입니다.",
          "좋아요. 오늘도 사고는 적당히, 재미는 과하게 갑시다.",
          "훌륭합니다. 듣기만 해도 편집자가 힘들어집니다.",
          "역시 우리 크루답습니다. 제정신은 아니지만 합은 좋네요.",
          "좋아요. 오늘도 레전드 만들고 정산도 레전드로 갑시다."
        ],
        center: [
          "마지막 안건입니다. 오늘 방송은 무조건 클립감 위주로 몰아갑니다.",
          "후반부 회의답게 결론 내죠. 오늘은 텐션, 합방, 후원 반응 다 챙깁니다.",
          "오늘 최종 목표는 레전드 장면 생산과 수장님 위신 회복입니다.",
          "이제 결론만 남았습니다. 다들 웃기고, 안 나가고, 많이 받으세요."
        ],
        window: [
          "창가 쪽 야경 좋네요. 감성 멘트 하나 하려다가 참겠습니다.",
          "창가 야경 보니까 휴방 공지 쓰고 싶어지는데, 참아봅시다.",
          "창가 쪽은 분위기 있는데 우리 대화가 이미 분위기를 다 깨고 있습니다.",
          "저기서 방송하면 감성은 되는데, 결국 소리부터 지를 것 같습니다."
        ],
        watchLeader: [
          "야! 공태연, 지금 회의보다 도시락에 더 진심인 것 같은데요?",
          "야! 공태연, 제 귀가 틀리지 않았다면 방금 김치 소리였습니다.",
          "야! 공태연, 입꼬리가 너무 솔직한데요? 뭘 숨기고 있죠?",
          "야! 공태연, 회의 집중도보다 식사 집중도가 더 높은 것 같습니다."
        ],
        playerReply: [
          "저는 끝까지 안 들키는 컨텐츠를 연구 중이었습니다.",
          "수장님, 김치 소리는 아니고 제 의지가 부서진 소리였습니다.",
          "숨긴 건 없습니다. 다만 제가 오늘 한끼도 못먹어서 꼬르륵 소리가 났습니다.",
          " 집중도가 높아 보였다면 그건 생존 본능 때문입니다.",
          "저는 회의에도 진심입니다. 다만 밥알씹는게 조금 더 적극적이었습니다."
        ]
      }
    };

    const gazeTextMap = {
      team1: "슈니",
      team2: "쩜냥이",
      team3: "루루시",
      team4: "다시바",
      team5: "초금비",
      team6: "ㅎㄱㅅ",
      team7: "큐티섹시",
      center: "중앙 모니터",
      window: "창가",
      playerWarn: "공태연 캐릭터 쪽으로 이동 중",
      player: "공태연 캐릭터 확인 중!"
    };
    const targets = {
      team1: {x: 13, y: 46},
      team2: {x: 23, y: 41},
      team3: {x: 31, y: 40},
      team4: {x: 72, y: 37},
      team5: {x: 80, y: 42},
      team6: {x: 88, y: 46},
      team7: {x: 95, y: 57},
      center: {x: 50, y: 61},
      window: {x: 5.5, y: 24},
      playerWarn: {x: 10, y: 55},
      player: {x: 10, y: 55}
    };

    const chewTexts = {
      rice: ["냠!", "우물!", "꿀꺽!", "냠냠!"],
      kimchi: ["아삭!", "오독!", "우걱!", "촵!"]
    };

    const gameWrap = document.getElementById("gameWrap");
    const meetingBg = document.getElementById("meetingBg");
    const resultBanner = document.getElementById("resultBanner");
    const stageText = document.getElementById("stageText");
    const stageWatermarkText = document.getElementById("stageWatermarkText");
    const lifeText = document.getElementById("lifeText");
    const rankText = document.getElementById("rankText");
    const comboText = document.getElementById("comboText");
    const multiplierText = document.getElementById("multiplierText");
    const scoreText = document.getElementById("scoreText");
    const targetText = document.getElementById("targetText");
    const bestScoreText = document.getElementById("bestScoreText");
    const suspicionText = document.getElementById("suspicionText");
    const suspicionBar = document.getElementById("suspicionBar");
    const lookTimerPanel = document.getElementById("lookTimerPanel");
    const lookTimerText = document.getElementById("lookTimerText");
    const lookTimerBar = document.getElementById("lookTimerBar");
    const bgmStageText = document.getElementById("bgmStageText");
    const scoreBar = document.getElementById("scoreBar");
    const statusText = document.getElementById("statusText");

    const portraitLayer = document.getElementById("portraitLayer");
    const agendaBoard = document.getElementById("agendaBoard");
    const agendaImage = document.getElementById("agendaImage");
    const molbabActor = document.getElementById("molbabActor");
    const molbabFrame = document.getElementById("molbabFrame");
    const eventBubble = document.getElementById("eventBubble");
    const warningOverlay = document.getElementById("warningOverlay");
    const screenFlash = document.getElementById("screenFlash");
    const chewFxLayer = document.getElementById("chewFxLayer");
    const comboFxLayer = document.getElementById("comboFxLayer");
    const dialogueLayer = document.getElementById("dialogueLayer");
    const stageMoodOverlay = document.getElementById("stageMoodOverlay");
    const resultFxLayer = document.getElementById("resultFxLayer");
    const gazeSpotlight = document.getElementById("gazeSpotlight");
    const gazeBeam = document.getElementById("gazeBeam");
    const gazeBeamRight = document.getElementById("gazeBeamRight");
    const gazeIndicator = document.getElementById("gazeIndicator");
    const gazeText = document.getElementById("gazeText");
    const leaderHead = document.getElementById("leaderHead");
    const leaderPupils = document.getElementById("leaderPupils");
    const rocketOverlay = document.getElementById("rocketOverlay");
    const rocketWindowImg = document.getElementById("rocketWindowImg");

    const startOverlay = document.getElementById("startOverlay");
    const optionsOverlay = document.getElementById("optionsOverlay");
    const endOverlay = document.getElementById("endOverlay");
    const endingIllustrationOverlay = document.getElementById("endingIllustrationOverlay");
    const endTitle = document.getElementById("endTitle");
    const endDesc = document.getElementById("endDesc");
    const startRecords = document.getElementById("startRecords");
    const endRecords = document.getElementById("endRecords");
    const endingBadges = document.getElementById("endingBadges");
    const endingArtTitle = document.getElementById("endingArtTitle");
    const endingMetaTitle = document.getElementById("endingMetaTitle");
    const endingMetaDesc = document.getElementById("endingMetaDesc");
    const endingMetaStats = document.getElementById("endingMetaStats");
    const endingArtImage = document.getElementById("endingArtImage");
    const endingMiniPanel = document.getElementById("endingMiniPanel");
    const endingBonusPanel = document.getElementById("endingBonusPanel");
    const endingGalleryOverlay = document.getElementById("endingGalleryOverlay");
    const endingGalleryGrid = document.getElementById("endingGalleryGrid");
    const endingGalleryProgressText = document.getElementById("endingGalleryProgressText");
    const endingGalleryProgressFill = document.getElementById("endingGalleryProgressFill");

    const bgmVolume = document.getElementById("bgmVolume");
    const sfxVolume = document.getElementById("sfxVolume");
    const voiceVolume = document.getElementById("voiceVolume");
    const bgmVolumeText = document.getElementById("bgmVolumeText");
    const sfxVolumeText = document.getElementById("sfxVolumeText");
    const voiceVolumeText = document.getElementById("voiceVolumeText");
    const toggleBgmBtn = document.getElementById("toggleBgmBtn");
    const toggleSfxBtn = document.getElementById("toggleSfxBtn");
    const toggleVoiceBtn = document.getElementById("toggleVoiceBtn");

    const RANKS = ["정직원", "인턴", "인인턴", "인인인턴", "인인인인턴", "방출"];
    const ENDING_LABELS = {
      perfect: "레전드 정직원 엔딩",
      clear: "생존 성공 엔딩",
      kimchiKing: "김치왕 엔딩",
      rocket: "로켓 방출 엔딩",
      intern: "인턴 생존 엔딩"
    };

    const ENDING_DETAILS = {
      perfect: {
        title: "레전드 정직원 엔딩",
        shortName: "정직원",
        condition: "10스테이지 클리어 + 목숨 5개 유지 + 최종 계급 정직원",
        hint: "초반부터 소음을 낮게 유지하고, 김치는 안전 구간에서만 먹으면 노릴 수 있습니다.",
        galleryDesc: "수장님의 감시를 완벽하게 피하고 회의실 몰밥을 끝까지 성공한 전설의 엔딩입니다."
      },
      clear: {
        title: "생존 성공 엔딩",
        shortName: "생존",
        condition: "10스테이지를 끝까지 클리어",
        hint: "점수보다 생존을 우선하면 가장 안정적으로 볼 수 있습니다.",
        galleryDesc: "긴 회의와 수장님의 시선을 버티고 끝까지 살아남은 기본 클리어 엔딩입니다."
      },
      kimchiKing: {
        title: "김치왕 엔딩",
        shortName: "김치왕",
        condition: "최대 콤보 20 이상 달성",
        hint: "김치 타이밍을 몰아서 쓰되, WARNING 직전에는 반드시 손을 떼야 합니다.",
        galleryDesc: "위험한 김치 몰밥을 끝까지 밀어붙여 아삭한 전설이 된 엔딩입니다."
      },
      rocket: {
        title: "로켓 방출 엔딩",
        shortName: "방출",
        condition: "목숨 0개가 되어 방출",
        hint: "일부러 걸리면 빠르게 볼 수 있지만, 기록에는 아픈 엔딩입니다.",
        galleryDesc: "몰밥을 들켜 회의실에서 로켓처럼 방출되는 개그 엔딩입니다."
      },
      intern: {
        title: "인턴 생존 엔딩",
        shortName: "인턴",
        condition: "강등을 겪은 상태로 10스테이지 클리어",
        hint: "한두 번 걸려도 포기하지 말고 끝까지 버티면 볼 수 있습니다.",
        galleryDesc: "강등의 위기를 겪었지만 결국 크루에 남아 살아남은 엔딩입니다."
      }
    };


    const audioState = {
      bgms: {
        early: new Audio(sounds.bgm_early),
        mid: new Audio(sounds.bgm_mid),
        late: new Audio(sounds.bgm_late)
      },
      currentBgmKey: null,
      active: [],
      voiceCurrent: null
    };
    Object.values(audioState.bgms).forEach(a => a.loop = true);

    const speechState = {
      supported: "speechSynthesis" in window,
      locked: false
    };

    function stopSpeaking() {
      if (speechState.supported) speechSynthesis.cancel();
      if (audioState.voiceCurrent) {
        try {
          audioState.voiceCurrent.pause();
          audioState.voiceCurrent.currentTime = 0;
        } catch {}
        audioState.voiceCurrent = null;
      }
    }

    function speak(text, speaker = {pitch:1, rate:1}) {
      if (!speechState.supported || !settings.voiceEnabled || !text) return;
      try {
        speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(text.replace(/[!]/g, "").trim());
        utter.lang = "ko-KR";
        utter.volume = settings.voiceVolume;
        utter.pitch = speaker.pitch ?? 1;
        utter.rate = speaker.rate ?? 1;
        speechSynthesis.speak(utter);
      } catch {}
    }

    function delay(ms) {
      return new Promise(resolve => setTimeout(resolve, Math.max(0, ms || 0)));
    }

    function estimateSpeechMs(text = "") {
      const len = String(text || "").replace(/\s+/g, "").length;
      return Math.max(1300, Math.min(7200, 650 + len * 115));
    }

    function normalizeVoiceSources(source) {
      if (Array.isArray(source)) return source.filter(Boolean);
      if (typeof source === "string" && source) return [source];
      if (source && typeof source === "object" && source.source) return [source.source];
      return [];
    }

    function playVoiceClip(source, fallbackText = "", speaker = {pitch:1, rate:1}, options = {}) {
      const estimated = estimateSpeechMs(fallbackText);
      const silentDelay = options.silentDelay ?? false;
      if (!settings.voiceEnabled) return silentDelay ? delay(estimated) : Promise.resolve();

      let files = normalizeVoiceSources(source);
      return new Promise(resolve => {
        let done = false;
        let safetyTimer = null;
        const finish = () => {
          if (done) return;
          done = true;
          if (safetyTimer) clearTimeout(safetyTimer);
          resolve();
        };

        if (files.length) {
          if (options.interrupt !== false) stopSpeaking();
          const file = pick(files);
          const a = new Audio(file);
          a.volume = Math.max(0, Math.min(1, settings.voiceVolume));
          audioState.voiceCurrent = a;

          a.addEventListener("ended", () => {
            if (audioState.voiceCurrent === a) audioState.voiceCurrent = null;
            finish();
          }, { once: true });
          a.addEventListener("error", () => {
            if (audioState.voiceCurrent === a) audioState.voiceCurrent = null;
            speak(fallbackText, speaker);
            setTimeout(finish, estimated);
          }, { once: true });

          // 일부 브라우저에서 ended 이벤트가 누락되어 대화 큐가 멈추는 것을 방지합니다.
          safetyTimer = setTimeout(finish, Math.max(estimated + 2500, 9000));
          a.play().catch(() => {
            if (audioState.voiceCurrent === a) audioState.voiceCurrent = null;
            speak(fallbackText, speaker);
            setTimeout(finish, estimated);
          });
          return;
        }

        speak(fallbackText, speaker);
        setTimeout(finish, estimated);
      });
    }

    const dialogueState = {
      busy: false,
      token: 0,
      protectedSequence: false,
      watchPending: false,
      watchPendingAt: 0,
      lastWatchDialogueAt: -1
    };

    // 수장님 시선/판정은 기존 타이머대로 즉시 진행하되,
    // 음성 대화는 절대 중간에 끊지 않고 큐에 넣어 순서대로 재생합니다.
    const WATCH_DIALOGUE_PENDING_MAX_MS = 2400;
    const WATCH_DIALOGUE_COOLDOWN_MS = 5200;

    function nextDialogueToken() {
      dialogueState.token += 1;
      return dialogueState.token;
    }

    function isDialogueTokenActive(token) {
      return game.running && dialogueState.token === token;
    }

    function cancelDialogue(stopVoice = true, clearQueued = true) {
      nextDialogueToken();
      dialogueState.busy = false;
      dialogueState.protectedSequence = false;
      if (clearQueued) {
        dialogueState.watchPending = false;
        dialogueState.watchPendingAt = 0;
      }
      dialogueLayer.innerHTML = "";
      if (stopVoice) stopSpeaking();
    }

    function applyAudioSettings() {
      Object.values(audioState.bgms).forEach(a => a.volume = settings.bgmEnabled ? settings.bgmVolume : 0);
      bgmVolume.value = Math.round(settings.bgmVolume * 100);
      sfxVolume.value = Math.round(settings.sfxVolume * 100);
      voiceVolume.value = Math.round(settings.voiceVolume * 100);
      bgmVolumeText.textContent = Math.round(settings.bgmVolume * 100) + "%";
      sfxVolumeText.textContent = Math.round(settings.sfxVolume * 100) + "%";
      voiceVolumeText.textContent = Math.round(settings.voiceVolume * 100) + "%";
      toggleBgmBtn.textContent = settings.bgmEnabled ? "ON" : "OFF";
      toggleSfxBtn.textContent = settings.sfxEnabled ? "ON" : "OFF";
      toggleVoiceBtn.textContent = settings.voiceEnabled ? "ON" : "OFF";
    }

    function stopAllBgm() {
      Object.values(audioState.bgms).forEach(a => { a.pause(); a.currentTime = 0; });
      audioState.currentBgmKey = null;
      if (audioState.voiceCurrent) {
        try { audioState.voiceCurrent.pause(); audioState.voiceCurrent.currentTime = 0; } catch {}
        audioState.voiceCurrent = null;
      }
    }

    function stageBgmKey(stage) {
      if (stage <= 3) return "early";
      if (stage <= 6) return "mid";
      return "late";
    }

    function ensureStageBgm() {
      const key = stageBgmKey(game.stage);
      bgmStageText.textContent = key.toUpperCase();
      if (!settings.bgmEnabled) return;
      if (audioState.currentBgmKey === key) return;
      stopAllBgm();
      const a = audioState.bgms[key];
      audioState.currentBgmKey = key;
      a.volume = settings.bgmVolume;
      a.play().catch(() => {});
    }

    function playSfx(name, volume = 1.0) {
      if (!settings.sfxEnabled) return;
      const a = new Audio(sounds[name]);
      a.volume = Math.max(0, Math.min(1, settings.sfxVolume * volume));
      a.play().catch(() => {});
      audioState.active.push(a);
      a.addEventListener("ended", () => {
        audioState.active = audioState.active.filter(x => x !== a);
      });
    }


    function updateStageBackground() {
      const idx = Math.max(1, Math.min(10, game.stage)) - 1;
      meetingBg.src = stageBackgrounds[idx];
    }

    function setStageMood() {
      stageMoodOverlay.classList.remove("early", "mid", "late");
      if (game.stage <= 3) stageMoodOverlay.classList.add("early");
      else if (game.stage <= 6) stageMoodOverlay.classList.add("mid");
      else stageMoodOverlay.classList.add("late");
      updateStageBackground();
      updateAgendaBoard();
    }

    function pulseWrap(kind = "clear") {
      gameWrap.classList.remove("shakeHeavy", "clearPulse");
      void gameWrap.offsetWidth;
      gameWrap.classList.add(kind === "danger" ? "shakeHeavy" : "clearPulse");
    }

    function showResultBanner(text, cls = "stage", duration = 1150) {
      resultBanner.textContent = text;
      resultBanner.className = "";
      resultBanner.id = "resultBanner";
      resultBanner.classList.add(cls, "show");
      setTimeout(() => resultBanner.classList.remove("show"), duration);
    }

    function spawnFireworkRings(count = 4) {
      for (let i = 0; i < count; i++) {
        const ring = document.createElement("div");
        ring.className = "fireworkRing";
        ring.style.left = `${20 + Math.random() * 60}%`;
        ring.style.top = `${18 + Math.random() * 42}%`;
        ring.style.setProperty("--hue", Math.floor(Math.random() * 360));
        resultFxLayer.appendChild(ring);
        setTimeout(() => ring.remove(), 900);
      }
    }

    function spawnResultParticles(type = "clear") {
      const smokeMode = type === "gameover";
      const count = type === "clear" ? 120 : (type === "stage" ? 88 : 64);
      for (let i = 0; i < count; i++) {
        const p = document.createElement("div");
        const smoke = smokeMode && Math.random() < 0.52;
        p.className = smoke ? "smokeParticle" : "resultParticle";
        const startX = smoke ? 15 + Math.random() * 18 : 10 + Math.random() * 80;
        const startY = smoke ? 72 + Math.random() * 12 : 22 + Math.random() * 56;
        p.style.left = startX + "%";
        p.style.top = startY + "%";
        p.style.setProperty("--dx", (Math.random() * 460 - 230) + "px");
        p.style.setProperty("--dy", (smoke ? (-150 - Math.random() * 180) : (Math.random() * 340 - 190)) + "px");
        p.style.setProperty("--hue", type === "clear" ? Math.floor(30 + Math.random() * 80) : (type === "stage" ? Math.floor(180 + Math.random() * 80) : Math.floor(Math.random() * 20)));
        resultFxLayer.appendChild(p);
        setTimeout(() => p.remove(), smoke ? 1800 : 1450);
      }
      if (type !== "gameover") spawnFireworkRings(type === "clear" ? 8 : 4);
    }

    function updateRecordPanels() {
      bestScoreText.textContent = Math.floor(records.highScore).toLocaleString();
      const total = getEndingKeys().length;
      const unlocked = getUnlockedEndingCount();
      startRecords.innerHTML = `
        최고점수: <b>${Math.floor(records.highScore).toLocaleString()}</b><br>
        최고콤보: <b>${records.bestCombo}</b><br>
        엔딩 컬렉션: <b>${unlocked}/${total}</b>
        <div class="endingMiniDots">${buildEndingDots()}</div>
      `;
      endRecords.innerHTML = `
        최고점수: <b>${Math.floor(records.highScore).toLocaleString()}</b> / 최고콤보: <b>${records.bestCombo}</b>
      `;
      endingBadges.innerHTML = "";
      Object.entries(ENDING_LABELS).forEach(([key, label]) => {
        const el = document.createElement("div");
        el.className = "endingBadge" + (records.endings[key] ? " on" : "");
        el.textContent = (records.endings[key] ? "✓ " : "？ ") + label;
        endingBadges.appendChild(el);
      });
      renderEndingMiniPanel();
      if (endingGalleryOverlay && !endingGalleryOverlay.classList.contains("hidden")) renderEndingGallery();
    }

    function openOptions() { optionsOverlay.classList.remove("hidden"); }
    function closeOptions() { optionsOverlay.classList.add("hidden"); }
    function closeEndingIllustration() { endingIllustrationOverlay.classList.add("hidden"); }


    function getEndingKeys() {
      return Object.keys(ENDING_LABELS);
    }

    function getUnlockedEndingCount() {
      return getEndingKeys().filter(key => records.endings[key]).length;
    }

    function getNextLockedEndingKey() {
      return getEndingKeys().find(key => !records.endings[key]) || null;
    }

    function buildEndingDots() {
      return getEndingKeys().map(key => {
        const detail = ENDING_DETAILS[key] || { shortName: ENDING_LABELS[key] };
        const on = records.endings[key];
        return `<span class="endingMiniDot${on ? " on" : ""}">${on ? "✓" : "잠김"} ${detail.shortName}</span>`;
      }).join("");
    }

    function buildEndingBonusHtml(key, galleryOnly = false) {
      const total = getEndingKeys().length;
      const unlocked = getUnlockedEndingCount();
      const percent = Math.round((unlocked / total) * 100);
      const detail = ENDING_DETAILS[key] || { condition: "조건 정보 없음", hint: "다른 엔딩도 수집해보세요.", shortName: ENDING_LABELS[key] || "엔딩" };
      const nextKey = getNextLockedEndingKey();
      const nextDetail = nextKey ? ENDING_DETAILS[nextKey] : null;
      const nextText = nextDetail ? `${nextDetail.title} - ${nextDetail.hint}` : "모든 엔딩을 해금했습니다. 컬렉션 완료!";
      return `
        <div class="bonusTitle">
          <span>🏆 엔딩 컬렉션</span>
          <span>${unlocked}/${total} · ${percent}%</span>
        </div>
        <div class="endingProgressBar"><div class="endingProgressFill" style="width:${percent}%"></div></div>
        <div class="bonusRow">
          <div class="bonusLabel">획득 조건</div>
          <div class="bonusText">${detail.condition}</div>
        </div>
        <div class="bonusRow">
          <div class="bonusLabel">다음 목표</div>
          <div class="bonusText">${nextText}</div>
        </div>
      `;
    }

    function renderEndingMiniPanel() {
      if (!endingMiniPanel) return;
      const total = getEndingKeys().length;
      const unlocked = getUnlockedEndingCount();
      const nextKey = getNextLockedEndingKey();
      const nextText = nextKey ? `다음 목표: ${ENDING_DETAILS[nextKey].title}` : "모든 엔딩 해금 완료!";
      endingMiniPanel.innerHTML = `
        <div class="miniTitle">엔딩 컬렉션 ${unlocked}/${total}</div>
        ${nextText}
        <div class="endingMiniDots">${buildEndingDots()}</div>
      `;
    }

    function renderEndingGallery() {
      const total = getEndingKeys().length;
      const unlocked = getUnlockedEndingCount();
      const percent = Math.round((unlocked / total) * 100);
      if (endingGalleryProgressText) endingGalleryProgressText.innerHTML = `<b>${unlocked}</b> / ${total} 해금`;
      if (endingGalleryProgressFill) endingGalleryProgressFill.style.width = `${percent}%`;
      if (!endingGalleryGrid) return;

      endingGalleryGrid.innerHTML = "";
      getEndingKeys().forEach(key => {
        const detail = ENDING_DETAILS[key] || { title: ENDING_LABELS[key], condition: "조건 정보 없음", galleryDesc: "" };
        const unlockedNow = !!records.endings[key];
        const card = document.createElement("div");
        card.className = `endingGalleryCard ${unlockedNow ? "unlocked" : "locked"}`;
        card.setAttribute("data-ending", key);
        card.innerHTML = `
          <div class="endingGalleryThumb">
            <img src="${endingImages[key] || defaultImage}" alt="${detail.title}">
            ${unlockedNow ? "" : `<div class="endingGalleryLock">?</div>`}
          </div>
          <div class="endingGalleryBody">
            <div class="endingGalleryName">${detail.title}</div>
            <div class="endingGalleryStatus${unlockedNow ? " on" : ""}">${unlockedNow ? "해금 완료" : "미해금"}</div>
            <div class="endingGalleryCondition">${unlockedNow ? detail.galleryDesc : "조건: " + detail.condition}</div>
          </div>
        `;
        if (unlockedNow) {
          card.addEventListener("click", () => openEndingFromGallery(key));
        }
        endingGalleryGrid.appendChild(card);
      });
    }

    function openEndingGallery() {
      // 엔딩 일러스트 화면에서 호출될 경우, 일러스트 오버레이가 갤러리 위를 막지 않도록 먼저 닫습니다.
      if (endingIllustrationOverlay) endingIllustrationOverlay.classList.add("hidden");

      renderEndingGallery();
      endingGalleryOverlay.classList.remove("hidden");

      // 안전하게 갤러리를 최상단으로 보이게 합니다.
      endingGalleryOverlay.style.zIndex = "260";
    }

    function closeEndingGallery() {
      endingGalleryOverlay.classList.add("hidden");
    }

    function openEndingFromGallery(key) {
      if (!records.endings[key]) return;
      const detail = ENDING_DETAILS[key] || { title: ENDING_LABELS[key], galleryDesc: "" };
      game.endingKey = key;
      game.endingInfo = {
        key,
        title: detail.title,
        desc: detail.galleryDesc,
        voice: "",
        galleryOnly: true
      };
      closeEndingGallery();
      showEndingIllustrationScreen();
    }


    function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

    function getDialoguePack() {
      if (game.stage <= 3) return stageDialogue.early;
      if (game.stage <= 6) return stageDialogue.mid;
      return stageDialogue.late;
    }

    function getDialogueStageKey() {
      if (game.stage <= 3) return "early";
      if (game.stage <= 6) return "mid";
      return "late";
    }

    const voiceKeyByPersonId = {
      leader: "sujang",
      player: "gongtaeyeon",
      blue: "schuni",
      black: "jjeomnyangi",
      white: "rurushi",
      cat: "dasiba",
      green: "chogeumbi",
      purple: "hgs",
      cat2: "cutiesexy"
    };

    const memberReplyIndexesByPersonId = {
      blue: [1, 8],
      black: [2],
      white: [3],
      cat: [4],
      green: [5],
      purple: [6],
      cat2: [7]
    };

    function padVoiceIndex(index) {
      return String(index).padStart(3, "0");
    }

    function makeVoiceLine(voiceKey, stageKey, category, index, text) {
      const file = `${voiceKey}_${stageKey}_${category}_${padVoiceIndex(index)}.mp3`;
      return {
        text,
        source: `assets/voice/${voiceKey}/${file}`,
        index,
        category,
        voiceKey
      };
    }

    function pickVoiceLine(voiceKey, stageKey, category, texts, indexes = null) {
      const sourceIndexes = (indexes && indexes.length)
        ? indexes.filter(i => texts[i - 1])
        : texts.map((_, i) => i + 1);
      const index = pick(sourceIndexes.length ? sourceIndexes : [1]);
      return makeVoiceLine(voiceKey, stageKey, category, index, texts[index - 1] || texts[0] || "");
    }

    function pickLeaderVoiceLine(category) {
      const pack = getDialoguePack();
      const stageKey = getDialogueStageKey();
      return pickVoiceLine("sujang", stageKey, category, pack[category] || []);
    }

    function pickMemberVoiceLine(member) {
      const pack = getDialoguePack();
      const stageKey = getDialogueStageKey();
      const voiceKey = voiceKeyByPersonId[member.id] || "schuni";
      const indexes = memberReplyIndexesByPersonId[member.id] || null;
      return pickVoiceLine(voiceKey, stageKey, "memberReply", pack.memberReply || [], indexes);
    }

    function pickPlayerReplyVoiceLine() {
      const pack = getDialoguePack();
      const stageKey = getDialogueStageKey();
      return pickVoiceLine("gongtaeyeon", stageKey, "playerReply", pack.playerReply || []);
    }


    function canRunDialogueQueue() {
      return game.running && !["caught", "stageClear", "stageRestart", "launching"].includes(game.phase);
    }

    function isWatchDialogueContextActive() {
      if (!game.running) return false;
      if (game.phase === "watch" && game.gazeMode === "player") return true;

      // 자막 전용 모드에서는 WATCH가 끝나 안전 구간으로 넘어가도,
      // 이미 시작한 공태연 답변 자막은 끝까지 보여줍니다.
      if (WATCH_DIALOGUE_USES_TEXT && !WATCH_DIALOGUE_USES_VOICE && game.phase === "safe") return true;

      return false;
    }

    function clearWatchDialogueQueue() {
      dialogueState.watchPending = false;
      dialogueState.watchPendingAt = 0;
    }

    function queueWatchDialogue() {
      dialogueState.watchPending = true;
      dialogueState.watchPendingAt = performance.now();
    }

    function requestWatchDialogueSequence() {
      // 일반 회의 음성은 HYBRID 모드로 제한하더라도,
      // 수장님이 공태연을 실제로 쳐다보는 WATCH 구간의 티키타카는 자막/음성을 재생합니다.
      if (!WATCH_DIALOGUE_USES_TEXT) return false;
      if (!isWatchDialogueContextActive()) return false;

      const now = performance.now();
      // 수장님이 공태연을 실제로 보고 있는 짧은 WATCH 구간에서만 경고/변명 대화를 허용합니다.
      // 이미 다른 대사가 재생 중이면 큐에 넣되, WATCH가 끝나면 자동 폐기해서 엉뚱한 대상에게 말하지 않게 합니다.
      if (dialogueState.lastWatchDialogueAt > 0 && now - dialogueState.lastWatchDialogueAt < WATCH_DIALOGUE_COOLDOWN_MS) {
        return false;
      }

      if (dialogueState.busy) {
        queueWatchDialogue();
        return true;
      }

      showWatchDialogueSequence();
      return true;
    }

    function runPendingWatchDialogue() {
      if (!dialogueState.watchPending || dialogueState.busy) return false;

      // WATCH 구간이 끝났거나 수장님이 더 이상 공태연을 보고 있지 않으면
      // 밀린 공태연 대사는 즉시 폐기합니다. 이게 싱크 깨짐의 핵심 원인이었습니다.
      if (!isWatchDialogueContextActive()) {
        clearWatchDialogueQueue();
        return false;
      }

      const age = performance.now() - (dialogueState.watchPendingAt || 0);
      clearWatchDialogueQueue();

      if (age > WATCH_DIALOGUE_PENDING_MAX_MS) return false;

      showWatchDialogueSequence();
      return true;
    }


    function createPortraits() {
      portraitLayer.innerHTML = "";
      [...bubblePeople, playerSpeaker].forEach(person => {
        const el = document.createElement("div");
        el.className = "portraitBadge";
        el.dataset.person = person.id;
        el.style.left = (person.px || person.x) + "%";
        el.style.top = (person.py || (person.y + 9)) + "%";
        const img = document.createElement("img");
        img.src = popupCardPaths[person.id] || popupCardPaths.leader;
        img.alt = person.name;
        el.appendChild(img);
        portraitLayer.appendChild(el);
        person.portraitEl = el;
        person.portraitImg = img;
      });
    }

    function spawnPortraitFx(person, danger = false) {
      if (!person) return;
      const fx = document.createElement("div");
      fx.className = `portraitFx${danger ? " danger" : ""}`;
      fx.style.left = (person.px || person.x) + "%";
      fx.style.top = ((person.py || (person.y + 9)) - 6.5) + "%";
      portraitLayer.appendChild(fx);
      setTimeout(() => fx.remove(), 760);
    }

    function setPortraitExpression(person, expression = "normal", active = false, duration = 1000) {
      if (!person || !person.portraitImg || !person.portraitEl) return;
      const isDanger = expression === "angry" || expression === "surprised";
      person.portraitImg.src = popupCardPaths[person.id] || popupCardPaths.leader;
      person.portraitEl.classList.toggle("active", active || expression !== "normal");
      person.portraitEl.classList.toggle("danger", isDanger);
      person.portraitEl.classList.add("speaking");
      spawnPortraitFx(person, isDanger);
      clearTimeout(person.portraitTimer);
      person.portraitTimer = setTimeout(() => {
        if (!person.portraitImg || !person.portraitEl) return;
        person.portraitImg.src = popupCardPaths[person.id] || popupCardPaths.leader;
        person.portraitEl.classList.remove("active", "danger", "speaking");
      }, duration);
    }

    function updateAgendaBoard() {
      agendaImage.src = agendaImages[Math.max(1, Math.min(10, game.stage)) - 1];
      agendaBoard.classList.add("active");
      setTimeout(() => agendaBoard.classList.remove("active"), 900);
    }

    function createBubble(person, text, voice = false, voiceSource = null, options = {}) {
      const el = document.createElement("div");
      el.className = `bubble ${person.cls}`;
      el.style.left = person.x + "%";
      el.style.top = person.y + "%";
      el.textContent = text;
      dialogueLayer.appendChild(el);
      requestAnimationFrame(() => el.classList.add("show"));

      const estimated = estimateSpeechMs(text);
      const cleanLen = String(text || "").replace(/\s+/g, "").length;
      const textOnlyVisibleMs = options.textOnlyVisibleMs ?? Math.max(1300, Math.min(2900, 720 + cleanLen * 48));
      const minVisibleMs = options.minVisibleMs ?? 900;
      const portraitDuration = voice ? estimated + 650 : textOnlyVisibleMs + 500;
      setPortraitExpression(person, "talk", true, portraitDuration);

      const voicePromise = voice
        ? playVoiceClip(voiceSource, text, person, options.voiceOptions || {})
        : delay(textOnlyVisibleMs);

      return Promise.all([voicePromise, delay(minVisibleMs)]).then(() => {
        if (el.isConnected) {
          el.classList.remove("show");
          setTimeout(() => el.remove(), 230);
        }
        return delay(options.afterGapMs ?? 180);
      });
    }

    async function showConversationTurn() {
      if (game.phase !== "safe" || dialogueState.busy) return;
      const targetKey = randomSafeGaze();
      const token = nextDialogueToken();
      dialogueState.busy = true;
      dialogueState.protectedSequence = false;
      dialogueLayer.innerHTML = "";
      setGaze(targetKey);

      const targetStillValid = () => {
        return isDialogueTokenActive(token)
          && game.phase === "safe"
          && game.gazeMode === targetKey;
      };

      try {
        if (targetKey === "center") {
          const line = pickLeaderVoiceLine("center");
          await createBubble(bubblePeople[0], line.text, MEETING_DIALOGUE_USES_VOICE, line.source, { token, textOnlyVisibleMs: 2100 });
          return;
        }
        if (targetKey === "window") {
          const line = pickLeaderVoiceLine("window");
          await createBubble(bubblePeople[0], line.text, MEETING_DIALOGUE_USES_VOICE, line.source, { token, textOnlyVisibleMs: 2100 });
          return;
        }

        const member = getBubblePersonByTarget(targetKey);
        if (!member) {
          const line = pickLeaderVoiceLine("center");
          await createBubble(bubblePeople[0], line.text, MEETING_DIALOGUE_USES_VOICE, line.source, { token, textOnlyVisibleMs: 2100 });
          return;
        }

        const askLine = pickLeaderVoiceLine("leaderAsk");
        await createBubble(bubblePeople[0], askLine.text, MEETING_DIALOGUE_USES_VOICE, askLine.source, { token, textOnlyVisibleMs: 2200 });
        if (!targetStillValid()) return;

        const memberLine = pickMemberVoiceLine(member);
        await createBubble(member, memberLine.text, MEETING_DIALOGUE_USES_VOICE, memberLine.source, { token, textOnlyVisibleMs: 2300 });
        if (!targetStillValid()) return;

        if (Math.random() < 0.5) {
          const replyLine = pickLeaderVoiceLine("leaderReply");
          await createBubble(bubblePeople[0], replyLine.text, MEETING_DIALOGUE_USES_VOICE, replyLine.source, { token, textOnlyVisibleMs: 2200 });
        }
      } finally {
        if (dialogueState.token === token) {
          dialogueState.busy = false;
          dialogueState.protectedSequence = false;
          if (!runPendingWatchDialogue() && game.running) {
            game.dialogueTimer = getStageConfig(game.stage).dialogueInterval;
          }
        }
      }
    }

    async function showWatchDialogueSequence() {
      if (!isWatchDialogueContextActive()) return;
      dialogueState.lastWatchDialogueAt = performance.now();
      const token = nextDialogueToken();
      dialogueState.busy = true;
      dialogueState.protectedSequence = true;
      try {
        const watchLine = pickLeaderVoiceLine("watchLeader");
        await createBubble(bubblePeople[0], watchLine.text, WATCH_DIALOGUE_USES_VOICE, watchLine.source, {
          token,
          afterGapMs: 140,
          textOnlyVisibleMs: 1300
        });
        if (!isDialogueTokenActive(token) || !isWatchDialogueContextActive()) return;

        const playerLine = pickPlayerReplyVoiceLine();
        await createBubble(playerSpeaker, playerLine.text, WATCH_DIALOGUE_USES_VOICE, playerLine.source, {
          token,
          afterGapMs: 180,
          textOnlyVisibleMs: 950
        });
      } finally {
        if (dialogueState.token === token) {
          dialogueState.busy = false;
          dialogueState.protectedSequence = false;
          if (!runPendingWatchDialogue() && game.running) {
            game.dialogueTimer = Math.max(game.dialogueTimer, getStageConfig(game.stage).dialogueInterval * 0.75);
          }
        }
      }
    }

    function spawnChewFx(kind="rice") {
      const fx = document.createElement("div");
      fx.className = "chewFx";
      fx.style.left = `${16 + Math.random() * 8}%`;
      fx.style.top = `${50 + Math.random() * 11}%`;
      fx.textContent = pick(chewTexts[kind]);
      chewFxLayer.appendChild(fx);
      setTimeout(() => fx.remove(), 760);
    }

    function spawnComboFx(text) {
      const fx = document.createElement("div");
      fx.className = "comboFx";
      fx.textContent = text;
      comboFxLayer.appendChild(fx);
      setTimeout(() => fx.remove(), 900);
    }

    function positionBeam(beamEl, origin, target) {
      if (!beamEl) return;
      const dx = target.x - origin.x;
      const dy = target.y - origin.y;
      const dist = Math.hypot(dx, dy);
      const angle = Math.atan2(dy, dx) * 180 / Math.PI;
      beamEl.style.left = origin.x + "%";
      beamEl.style.top = origin.y + "%";
      beamEl.style.width = dist + "%";
      beamEl.style.transform = `rotate(${angle}deg)`;
    }

    function styleBeamForMode(mode) {
      const isPlayerLock = mode === "player";
      const height = isPlayerLock ? "8px" : "6px";
      const opacity = isPlayerLock ? ".94" : ".66";
      const background = isPlayerLock
        ? "linear-gradient(90deg, rgba(255,244,244,.98) 0%, rgba(255,96,96,.96) 16%, rgba(255,48,48,.82) 42%, rgba(255,48,48,.44) 72%, rgba(255,48,48,.16) 88%, rgba(255,48,48,0) 100%)"
        : "linear-gradient(90deg, rgba(255,255,255,.82) 0%, rgba(214,244,255,.68) 16%, rgba(170,226,255,.42) 42%, rgba(170,226,255,.20) 68%, rgba(170,226,255,.08) 86%, rgba(170,226,255,0) 100%)";
      const shadow = isPlayerLock
        ? "0 0 26px rgba(255,42,42,.72)"
        : "0 0 14px rgba(170,220,255,.26)";
      [gazeBeam, gazeBeamRight].forEach(beamEl => {
        if (!beamEl) return;
        beamEl.style.height = height;
        beamEl.style.opacity = opacity;
        beamEl.style.background = background;
        beamEl.style.boxShadow = shadow;
        beamEl.classList.toggle("playerLock", isPlayerLock);
      });
    }

    function getAnimatedTarget(targetKey) {
      const base = targets[targetKey] || targets.center;
      if (targetKey !== "player") return base;
      const t = performance.now() / 1000;
      return {
        x: base.x + Math.sin(t * 23) * 0.28,
        y: base.y + Math.cos(t * 19) * 0.22
      };
    }

    function updateBeam(targetKey) {
      const leftOrigin = {x: 50.30, y: 21.10};
      const rightOrigin = {x: 52.00, y: 21.10};
      const target = getAnimatedTarget(targetKey);
      positionBeam(gazeBeam, leftOrigin, target);
      positionBeam(gazeBeamRight, rightOrigin, target);

      const dx = target.x - ((leftOrigin.x + rightOrigin.x) / 2);
      const dy = target.y - leftOrigin.y;
      const px = Math.max(-5, Math.min(5, dx * 0.16));
      const py = Math.max(-3, Math.min(5, dy * 0.09));
      leaderPupils.style.transform = `translate(${px}px, ${py}px)`;
    }

    let gazeBeamLoopHandle = null;
    function startGazeBeamLoop() {
      if (gazeBeamLoopHandle) cancelAnimationFrame(gazeBeamLoopHandle);
      const tick = () => {
        updateBeam(game.gazeMode || "center");
        gazeBeamLoopHandle = requestAnimationFrame(tick);
      };
      tick();
    }

        function setGaze(mode) {
      game.gazeMode = mode;
      gazeText.textContent = gazeTextMap[mode] || "대상 확인 중";
      gazeIndicator.classList.toggle("danger", mode === "playerWarn" || mode === "player");
      leaderHead.classList.toggle("danger", mode === "playerWarn" || mode === "player");
      styleBeamForMode(mode);
      updateBeam(mode);

      const target = targets[mode];
      if (target) {
        gazeSpotlight.classList.add("active");
        const glow = (mode === "playerWarn" || mode === "player")
          ? "rgba(255,90,90,.18)"
          : mode === "window"
            ? "rgba(125,195,255,.12)"
            : "rgba(255,255,255,.08)";
        const band = (mode === "playerWarn" || mode === "player")
          ? "rgba(255,70,70,.08)"
          : "rgba(0,0,0,0)";
        gazeSpotlight.style.background = `radial-gradient(circle at ${target.x}% ${target.y}%, ${glow}, rgba(0,0,0,0) 17%), linear-gradient(90deg, ${band}, rgba(0,0,0,0) 34%)`;
      } else {
        gazeSpotlight.classList.remove("active");
      }
    }

        function randomSafeGaze() {
      return pick(["team1", "team2", "team3", "team4", "team5", "team6", "team7", "center", "window"]);
    }

    const game = {
      running: false,
      stage: 1,
      score: 0,
      target: 900,
      life: 5,
      rankIndex: 0,
      combo: 0,
      maxCombo: 0,
      multiplier: 1,
      suspicion: 0,
      suspicionWarned: false,
      comboBuildTimer: 0,
      comboDecayTimer: 0,
      phase: "safe",
      phaseTimer: 0,
      lastEatReleaseTime: 0,
      watchGraceTime: 0.22,
      holdRice: false,
      holdKimchi: false,
      riceFrameIndex: 0,
      kimchiFrameIndex: 0,
      frameElapsed: 0,
      riceFrameSpeed: 0.10,
      kimchiFrameSpeed: 0.082,
      lastTime: 0,
      dialogueTimer: 0,
      fxTimer: 0,
      gazeMode: "right",
      lastComboShown: 0,
      eatCount: 0,
      lastEatType: null,
      objectiveFailCount: 0,
      stageFailTimer: null,
      endingKey: null,
      endingInfo: null,
      finishLocked: false,
      objectiveRocketLocked: false,
      rocketLaunchLocked: false
    };

    function getStageTarget(stage) { return 3200 + (stage - 1) * 1350; }
    function getStageConfig(stage) {
      return {
        // v7: 스테이지 길이를 늘리고, 안전 시간/경고 시간을 줄여 난이도를 올림
        safeTime: Math.max(1.75, 5.25 - stage * 0.28),
        warningTime: Math.max(0.95, 1.85 - stage * 0.075),
        watchTime: Math.min(2.45, 1.45 + stage * 0.09),
        riceScorePerSecond: 78 + stage * 6,
        kimchiScorePerSecond: 118 + stage * 10,
        riceSuspicionPerSecond: 8 + stage * 1.55,
        kimchiSuspicionPerSecond: 16 + stage * 2.25,
        suspicionDecayPerSecond: Math.max(6, 13 - stage * 0.45),
        dialogueInterval: Math.max(0.85, 2.05 - stage * 0.075)
      };
    }
    function updateMultiplier() { game.multiplier = Math.min(3.0, 1 + Math.floor(game.combo / 3) * 0.2); }

    function getLookTimerInfo() {
      const cfg = getStageConfig(game.stage);
      if (game.phase === "safe") {
        const total = Math.max(0.01, cfg.safeTime);
        return {
          label: `${Math.max(0, game.phaseTimer).toFixed(1)}초 후 경고`,
          ratio: Math.max(0, Math.min(1, game.phaseTimer / total)),
          mode: "safe"
        };
      }
      if (game.phase === "prewarning") {
        const total = Math.max(0.01, cfg.warningTime);
        return {
          label: `${Math.max(0, game.phaseTimer).toFixed(1)}초 후 시선`,
          ratio: Math.max(0, Math.min(1, game.phaseTimer / total)),
          mode: "warning"
        };
      }
      if (game.phase === "watch") {
        const total = Math.max(0.01, cfg.watchTime);
        return {
          label: `쳐다보는 중 ${Math.max(0, game.phaseTimer).toFixed(1)}초`,
          ratio: Math.max(0, Math.min(1, game.phaseTimer / total)),
          mode: "watch"
        };
      }
      if (game.phase === "caught") {
        return { label: "강등 처리 중", ratio: 0, mode: "watch" };
      }
      if (game.phase === "stageClear") {
        return { label: "스테이지 전환", ratio: 1, mode: "safe" };
      }
      return { label: "--", ratio: 0, mode: "safe" };
    }

    function updateLookTimerHUD() {
      const info = getLookTimerInfo();
      lookTimerText.textContent = info.label;
      lookTimerBar.style.width = `${Math.round(info.ratio * 100)}%`;
      lookTimerPanel.classList.toggle("warning", info.mode === "warning");
      lookTimerPanel.classList.toggle("watch", info.mode === "watch");
    }
    function updateHUD() {
      stageText.textContent = game.stage;
      if (stageWatermarkText) stageWatermarkText.textContent = game.stage;
      lifeText.textContent = game.life;
      rankText.textContent = RANKS[Math.min(game.rankIndex, RANKS.length - 1)];
      comboText.textContent = game.combo;
      multiplierText.textContent = "x" + game.multiplier.toFixed(1);
      scoreText.textContent = Math.floor(game.score).toLocaleString();
      targetText.textContent = game.target.toLocaleString();
      scoreBar.style.width = `${Math.min(100, (game.score / game.target) * 100)}%`;

      // BUGFIX v9.3:
      // v9.2에서 수장님 시선 게이지를 추가하는 과정에서
      // 소음 경계도 HUD 갱신 코드가 빠져 화면에는 계속 0%로 보였습니다.
      // 내부 수치는 올라가고 있었지만 표시만 갱신되지 않던 문제입니다.
      suspicionText.textContent = Math.round(game.suspicion);
      suspicionBar.style.width = `${Math.min(100, Math.max(0, game.suspicion))}%`;

      bgmStageText.textContent = stageBgmKey(game.stage).toUpperCase();
      updateLookTimerHUD();
    }

        function currentAction() {
      if (!(game.phase === "safe" || game.phase === "prewarning")) return "idle";
      if (game.holdKimchi) return "kimchi";
      if (game.holdRice) return "rice";
      return "idle";
    }

    function showEventBubble(text, danger=false, voice=false, speaker=bubblePeople[0], voiceSource = null) {
      eventBubble.textContent = text;
      eventBubble.classList.toggle("danger", danger);
      eventBubble.classList.add("show");
      if (voice) playVoiceClip(voiceSource, text, speaker);
    }
    function hideEventBubble() { eventBubble.classList.remove("show", "danger"); }
    function setDefaultImage() { molbabFrame.src = defaultImage; }

    function resetCombo(reason="") {
      game.combo = 0;
      game.comboBuildTimer = 0;
      game.comboDecayTimer = 0;
      updateMultiplier();
      updateHUD();
      if (reason) spawnComboFx(reason);
    }

    function addCombo(amount=1) {
      game.combo += amount;
      if (game.combo > game.maxCombo) game.maxCombo = game.combo;
      if (game.maxCombo > records.bestCombo) {
        records.bestCombo = game.maxCombo;
        saveRecords();
      }
      updateMultiplier();
      if (game.combo >= 3 && game.combo !== game.lastComboShown) {
        game.lastComboShown = game.combo;
        spawnComboFx(`${game.combo} COMBO!`);
        playSfx("combo", 0.72);
      }
      updateHUD();
    }

    function setSafePhase() {
      const cfg = getStageConfig(game.stage);
      clearWatchDialogueQueue();
      // 음성 모드에서는 WATCH 대화가 안전 구간까지 넘어오면 싱크가 꼬이므로 정리합니다.
      // 단, 자막 전용 모드에서는 공태연 답변 자막이 너무 빨리 사라지지 않도록 끝까지 보여줍니다.
      if (dialogueState.protectedSequence && WATCH_DIALOGUE_USES_VOICE) cancelDialogue(true, true);
      game.phase = "safe";
      game.phaseTimer = cfg.safeTime;
      game.dialogueTimer = 0.25;
      game.fxTimer = 0.18;
      warningOverlay.classList.remove("active");
      hideEventBubble();
      if (!dialogueState.busy) dialogueLayer.innerHTML = "";
      statusText.textContent = game.stage <= 3
        ? "소음 경계도와 수장님 시선 타이머는 별개입니다. 시선 타이머가 끝나면 WARNING이 뜹니다."
        : game.stage <= 6
          ? "중반부터는 소음 경계도도 빨리 오르고, 수장님 시선 주기도 짧아집니다."
          : "후반은 고난도입니다. 소음은 낮아도 수장님 시선 타이머를 반드시 보세요.";
      setStageMood();
      molbabActor.classList.remove("warningPulse");
      setGaze(randomSafeGaze());
      ensureStageBgm();
    }

        function setPrewarningPhase() {
      const cfg = getStageConfig(game.stage);
      // HYBRID: 일반 회의 말풍선은 WARNING 진입 시 정리합니다. 음성은 일반 회의에서 쓰지 않으므로 끊길 것이 없습니다.
      if (HYBRID_AUDIO_EVENT_ONLY && dialogueState.busy && !dialogueState.protectedSequence) cancelDialogue(false, true);
      // WARNING은 게임 판정용 경고이므로 화면 경고 + 효과음만 사용합니다.
      // 시선과 판정 타이머는 기존 속도 그대로 즉시 진행합니다.
      game.phase = "prewarning";
      game.phaseTimer = cfg.warningTime;
      warningOverlay.classList.add("active");
      const warningMain = warningOverlay.querySelector(".main");
      const warningSub = warningOverlay.querySelector(".sub");
      if (warningMain) warningMain.textContent = "WARNING";
      if (warningSub) warningSub.textContent = `곧 수장님이 쳐다봅니다! 약 ${cfg.warningTime.toFixed(1)}초 안에 손을 떼세요`;
      hideEventBubble();
      statusText.textContent = "WARNING! 곧 수장님이 공태연 캐릭터 쪽을 봅니다. 지금 손을 떼면 안전하고, 원하면 연타를 유지할 수도 있습니다.";
      setGaze("playerWarn");
      setPortraitExpression(bubblePeople[0], "surprised", true, 1500);
      molbabActor.classList.add("warningPulse");
      playSfx("warning", 0.9);
    }

        function setWatchPhase() {
      const cfg = getStageConfig(game.stage);
      // WATCH 진입 시 일반 회의 대사는 정리하고, 공태연 전용 티키타카 대사를 우선 재생합니다.
      if (HYBRID_AUDIO_EVENT_ONLY && dialogueState.busy && !dialogueState.protectedSequence) cancelDialogue(false, true);
      game.phase = "watch";
      game.phaseTimer = cfg.watchTime;
      warningOverlay.classList.remove("active");
      hideEventBubble();
      statusText.textContent = "위험! 수장님이 공태연 캐릭터를 보고 있습니다. 지금 먹으면 바로 들킵니다.";
      setGaze("player");
      setPortraitExpression(bubblePeople[0], "angry", true, 1500);
      molbabActor.classList.add("warningPulse");

      requestWatchDialogueSequence();

      const releaseElapsed = (performance.now() - game.lastEatReleaseTime) / 1000;
      const releasedJustBeforeWatch = releaseElapsed <= game.watchGraceTime;
      if ((game.holdRice || game.holdKimchi) && !releasedJustBeforeWatch) {
        caught();
      }
    }

    function launchRocketEnding() {
      if (game.rocketLaunchLocked || game.finishLocked) return;
      game.rocketLaunchLocked = true;
      game.phase = "launching";
      game.running = false;
      clearTimeout(game.stageFailTimer);
      clearTimeout(game._stageStartTimer);
      game.holdRice = false;
      game.holdKimchi = false;
      rocketWindowImg.src = molbabFrame.src || defaultImage;
      rocketOverlay.classList.add("show");
      stopSpeaking();
      playSfx("rocket", 1.0);
      pulseWrap("danger");
      showResultBanner("ROCKET LAUNCH", "danger", 1300);
      playVoiceClip(voiceClips.rocket, "방출입니다. 로켓으로 퇴장하세요.", bubblePeople[0]);
      setTimeout(() => {
        rocketOverlay.classList.remove("show");
        finish(false);
      }, 2250);
    }


    function getCaughtReason() {
      // 김치와 밥을 동시에 누른 경우에는 소음 리스크가 큰 김치를 우선합니다.
      if (game.holdKimchi) return "kimchi";
      if (game.holdRice) return "rice";

      // 소음 경계도 100% 적발 시점에 키 상태가 먼저 풀렸을 경우 대비.
      if (game.lastEatType === "kimchi") return "kimchi";
      if (game.lastEatType === "rice") return "rice";

      return "rice";
    }

    function getCaughtBannerText(reason) {
      return reason === "kimchi" ? "김치 소리 감지!" : "밥 먹다 걸림!";
    }

    function getCaughtStatusText(reason) {
      const rank = RANKS[Math.min(game.rankIndex, RANKS.length - 1)];
      return reason === "kimchi"
        ? `김치 씹는 소리가 들켰습니다. 현재 계급: ${rank}`
        : `밥 먹는 장면이 들켰습니다. 현재 계급: ${rank}`;
    }

    function playCaughtReasonSfx(reason) {
      // 밥 적발과 김치 적발의 느낌을 효과음으로 분리합니다.
      // 마지막에 caught 효과음을 짧게 겹쳐 적발감을 유지합니다.
      if (reason === "kimchi") {
        playSfx("kimchi", 0.78);
        setTimeout(() => playSfx("caught", 0.80), 85);
      } else {
        playSfx("rice", 0.78);
        setTimeout(() => playSfx("caught", 0.80), 85);
      }
    }



    function showRankChangeNotice(rankName) {
      const el = document.getElementById("rankChangeNotice");
      if (!el) return;

      const safeRankName = rankName || RANKS[Math.min(game.rankIndex, RANKS.length - 1)] || "인턴";

      el.innerHTML = `
        <div class="rankChangeKicker">⚠ 징계 처리</div>
        <div class="rankChangeTitle">계급 강등</div>
        <div class="rankChangeSub">현재 계급: <b>${safeRankName}</b></div>
      `;

      el.classList.remove("hidden", "show");
      void el.offsetWidth;
      el.classList.add("show");

      clearTimeout(el._timer);
      el._timer = setTimeout(() => {
        el.classList.remove("show");
        setTimeout(() => el.classList.add("hidden"), 220);
      }, 1550);
    }

    function hideRankChangeNotice() {
      const el = document.getElementById("rankChangeNotice");
      if (!el) return;
      clearTimeout(el._timer);
      el.classList.remove("show");
      el.classList.add("hidden");
    }


    function caught() {
      if (game.phase === "caught" || game.phase === "launching" || game.finishLocked) return;

      const caughtReason = typeof getCaughtReason === "function" ? getCaughtReason() : (game.holdKimchi ? "kimchi" : "rice");
      const caughtBannerText = typeof getCaughtBannerText === "function"
        ? getCaughtBannerText(caughtReason)
        : (caughtReason === "kimchi" ? "김치 소리 감지!" : "밥 먹다 걸림!");

      cancelDialogue(true);
      game.phase = "caught";
      game.phaseTimer = 1.45;
      game.holdRice = false;
      game.holdKimchi = false;
      molbabActor.classList.remove("eating");

      game.life -= 1;
      game.rankIndex = Math.min(game.rankIndex + 1, RANKS.length - 1);

      screenFlash.classList.remove("hit");
      void screenFlash.offsetWidth;
      screenFlash.classList.add("hit");
      pulseWrap("danger");

      // 1단계: 먼저 적발 사유만 크게 보여줍니다.
      // 기존에는 이 배너와 "인턴으로 강등!" 말풍선이 동시에 떠서 서로 가렸습니다.
      showResultBanner(game.life <= 0 ? "로켓 방출!" : caughtBannerText, "danger", 920);
      spawnResultParticles("gameover");
      warningOverlay.classList.remove("active");

      statusText.textContent = game.life <= 0
        ? (caughtReason === "kimchi"
          ? "김치 소리 때문에 최종 적발! 로켓에 실려 팀에서 방출됩니다."
          : "밥 먹는 장면이 최종 적발! 로켓에 실려 팀에서 방출됩니다.")
        : (typeof getCaughtStatusText === "function"
          ? getCaughtStatusText(caughtReason)
          : `${caughtBannerText} 현재 계급: ${RANKS[game.rankIndex]}`);

      setDefaultImage();

      if (typeof playCaughtReasonSfx === "function") {
        playCaughtReasonSfx(caughtReason);
      } else {
        playSfx("caught", 0.9);
      }

      resetCombo("콤보 끊김!");
      game.suspicion = Math.min(35, game.suspicion);
      game.suspicionWarned = false;
      updateHUD();

      if (game.life <= 0) {
        setTimeout(() => launchRocketEnding(), 720);
        return;
      }

      // 2단계: 적발 사유 배너가 보인 뒤 강등 말풍선을 별도로 띄웁니다.
      // 이렇게 해야 "밥 먹다 걸림!" / "김치 소리 감지!"가 먼저 확실히 보이고,
      // 그 다음 "인턴으로 강등!"이 자연스럽게 이어집니다.
      clearTimeout(game._caughtDemoteTimer);
      const demoteRankText = `${RANKS[game.rankIndex]}으로 강등!`;
      game._caughtDemoteTimer = setTimeout(() => {
        if (game.phase !== "caught" || game.finishLocked || game.life <= 0) return;
        showRankChangeNotice(RANKS[game.rankIndex]);
        if (!settings.muted) playVoice("demote", voiceClips.demote, { interrupt: true });
      }, 980);
    }


    function stageRequirementFail() {
      if (!game.running || game.finishLocked || game.phase === "stageFail" || game.phase === "stageClear" || game.phase === "launching") return;

      // 타이머 0초 상태에서 매 프레임 재진입하는 것을 가장 먼저 차단합니다.
      game.phase = "stageFail";
      game.phaseTimer = 1.45;
      game.holdRice = false;
      game.holdKimchi = false;

      const req = getStageRequirement(game.stage);
      cancelDialogue(true);
      molbabActor.classList.remove("eating", "warningPulse");
      warningOverlay.classList.remove("active");
      hideEventBubble();
      setDefaultImage();

      const nextFailCount = Math.min(5, Math.max(0, Number(game.objectiveFailCount) || 0) + 1);
      game.objectiveFailCount = nextFailCount;

      // 목표 미달 경고 1~4/5는 방출 카운트만 올립니다.
      // 계급을 방출까지 내리는 처리는 5/5 로켓 방출 확정 시점에만 합니다.

      pulseWrap("danger");
      showResultBanner(game.objectiveFailCount >= 5 ? "로켓 방출!" : "몰밥 미션 실패!", "danger", 1250);
      spawnResultParticles("gameover");
      playSfx(game.objectiveFailCount >= 5 ? "rocket" : "warning", game.objectiveFailCount >= 5 ? 0.85 : 0.62);

      const scoreNow = Math.floor(game.score || 0).toLocaleString();
      const failText = `${game.objectiveFailCount} / 5`;
      statusText.innerHTML = `몰밥 실적 부족! 목표 <b>${req.minScore.toLocaleString()}점</b> / <b>${req.minEatCount}회</b>를 채우지 못했습니다.<br>현재 ${scoreNow}점 · 몰밥 ${game.eatCount || 0}회 · 몰밥 실패 <b>${failText}</b>`;

      if (game.objectiveFailCount >= 5) {
        if (game.objectiveRocketLocked || game.finishLocked) return;

        game.objectiveRocketLocked = true;
        game.phase = "launching";
        game.phaseTimer = 999;
        game.running = false;
        game.rankIndex = RANKS.length - 1;
        game.holdRice = false;
        game.holdKimchi = false;

        clearTimeout(game.stageFailTimer);
        clearTimeout(game._stageStartTimer);
        cancelDialogue(true);
        stopSpeaking();

        game.finalTotalScore = Math.floor(getTotalScoreNow());
        statusText.innerHTML = `몰밥 실패 <b>5회</b> 누적! 몰밥 실적 부족으로 로켓 방출됩니다.`;
        updateHUD();

        setTimeout(() => {
          if (!game.finishLocked) finish(false);
        }, 900);
        return;
      }

      updateHUD();

      clearTimeout(game.stageFailTimer);
      game.stageFailTimer = setTimeout(() => {
        if (!game.running || game.phase !== "stageFail") return;

        resetStagePlayValues(true);
        initStageTimer(game.stage);
        game.dialogueTimer = 0.45;
        game.phaseTimer = 1.0;

        setStageMood();
        setGaze(randomSafeGaze());
        ensureStageBgm();
        showStageStartCard(game.stage);
        statusText.textContent = `스테이지 ${game.stage} 재도전. 몰밥 미션 실패 ${game.objectiveFailCount}/5회. 제한 시간 안에 목표 점수와 몰밥 횟수를 채우세요.`;
        updateHUD();

        clearTimeout(game._stageStartTimer);
        game._stageStartTimer = setTimeout(() => {
          if (game.running && game.phase === "stageFail") setSafePhase();
        }, 1100);
      }, 1350);
    }


    function stageClear() {
      cancelDialogue(true);
      game.phase = "stageClear";
      game.phaseTimer = 1.15;
      game.holdRice = false;
      game.holdKimchi = false;
      molbabActor.classList.remove("eating");
      molbabActor.classList.remove("warningPulse");
      warningOverlay.classList.remove("active");
      setDefaultImage();

      if (game.stage >= 10) {
        finish(true);
        return;
      }

      game.suspicion = 0;
      game.suspicionWarned = false;

      const bonus = Math.floor(game.combo * 25);
      if (bonus > 0) {
        game.score += bonus;
        spawnComboFx(`콤보 보너스 +${bonus}`);
      }

      game.stage += 1;
      game.target = getStageTarget(game.stage);
      showEventBubble(`STAGE ${game.stage} 시작! 장기전 모드`, false, true, bubblePeople[0], voiceClips.stageIntro);
      statusText.textContent = `스테이지 ${game.stage} 회의 시작. 수장님의 시선이 더 빨라집니다.`;
      setGaze(randomSafeGaze());
      ensureStageBgm();
      pulseWrap("clear");
      showResultBanner("STAGE CLEAR!", "clear", 1200);
      spawnResultParticles("clear");
      playSfx("clear", 0.8);
      updateHUD();
    }

    function unlockEnding(key) {
      records.endings[key] = true;
      saveRecords();
    }


    function getEndingDisplayRank(key, galleryOnly = false) {
      const detail = ENDING_DETAILS && ENDING_DETAILS[key];

      if (galleryOnly) {
        return detail && detail.shortName ? `${detail.shortName} 해금` : "해금 완료";
      }

      if (key === "rocket") return "방출";
      if (key === "perfect") return "정직원";
      if (key === "intern") return "인턴";
      if (key === "kimchiKing") return "김치왕";
      if (key === "clear") return RANKS[Math.min(game.rankIndex, RANKS.length - 1)] || "생존";

      return RANKS[Math.min(game.rankIndex, RANKS.length - 1)] || "생존";
    }

    function determineEnding(clear) {
      if (!clear) {
        unlockEnding("rocket");
        return {
          key: "rocket",
          title: game.stage >= 7 ? "장렬한 로켓 방출 엔딩" : "조기 방출 엔딩",
          desc: `로켓에 실려 크루에서 방출되었습니다.<br>최종 점수: <b>${Math.floor(game.score).toLocaleString()}</b><br>최종 계급: <b>방출</b><br>최대 콤보: <b>${game.maxCombo}</b>`,
          voice: "로켓 방출 엔딩입니다. 다음에는 더 조용히 드세요."
        };
      }
      if (game.life === 5 && game.rankIndex === 0) {
        unlockEnding("perfect");
        return {
          key: "perfect",
          title: "레전드 정직원 엔딩",
          desc: `한 번도 들키지 않고 식사를 무사히 마쳤습니다. 몰밥 장기전 10스테이지를 완벽히 돌파했습니다!<br>최종 점수: <b>${Math.floor(game.score).toLocaleString()}</b><br>최종 계급: <b>정직원</b><br>최대 콤보: <b>${game.maxCombo}</b>`,
          voice: "레전드 정직원 엔딩입니다. 완벽한 몰밥 실력입니다."
        };
      }
      if (game.maxCombo >= 20) {
        unlockEnding("kimchiKing");
        return {
          key: "kimchiKing",
          title: "김치왕 엔딩",
          desc: `김치 먹방의 전설이 되었습니다.<br>최종 점수: <b>${Math.floor(game.score).toLocaleString()}</b><br>최종 계급: <b>${RANKS[Math.min(game.rankIndex, RANKS.length - 1)]}</b><br>최대 콤보: <b>${game.maxCombo}</b>`,
          voice: "김치왕 엔딩입니다. 아삭한 승리입니다."
        };
      }
      if (game.rankIndex >= 1) {
        unlockEnding("intern");
        return {
          key: "intern",
          title: "인턴 생존 엔딩",
          desc: `강등을 겪었지만 끝내 살아남았습니다.<br>최종 점수: <b>${Math.floor(game.score).toLocaleString()}</b><br>최종 계급: <b>${RANKS[Math.min(game.rankIndex, RANKS.length - 1)]}</b><br>최대 콤보: <b>${game.maxCombo}</b>`,
          voice: "인턴 생존 엔딩입니다. 아슬아슬했지만 살아남았습니다."
        };
      }
      unlockEnding("clear");
      return {
        key: "clear",
        title: "생존 성공 엔딩",
        desc: `긴 회의 10스테이지 몰밥에 성공했습니다.<br>최종 점수: <b>${Math.floor(game.score).toLocaleString()}</b><br>최종 계급: <b>${RANKS[Math.min(game.rankIndex, RANKS.length - 1)]}</b><br>최대 콤보: <b>${game.maxCombo}</b>`,
        voice: "생존 성공 엔딩입니다. 회의실 몰밥에 성공했습니다."
      };
    }

    function finish(clear) {
      if (game.finishLocked) return;
      game.finishLocked = true;
      game.running = false;
      clearTimeout(game.stageFailTimer);
      clearTimeout(game._stageStartTimer);
      stopSpeaking();
      warningOverlay.classList.remove("active");
      molbabActor.classList.remove("warningPulse");
      endOverlay.classList.remove("hidden");
      cancelDialogue(true);
      stopAllBgm();
      pulseWrap(clear ? "clear" : "danger");
      showResultBanner(clear ? "MISSION COMPLETE" : "GAME OVER", clear ? "final" : "danger", 1450);
      spawnResultParticles(clear ? "clear" : "gameover");

      if (game.score > records.highScore) records.highScore = Math.floor(game.score);
      if (game.maxCombo > records.bestCombo) records.bestCombo = game.maxCombo;
      saveRecords();

      const ending = determineEnding(clear);
      game.endingInfo = ending;
      game.endingKey = ending.key;
      endTitle.textContent = ending.title;
      endDesc.innerHTML = ending.desc;
      updateRecordPanels();
      setTimeout(() => {
        if (game.finishLocked && game.endingKey === ending.key) {
          playVoiceClip((voiceClips.endings && voiceClips.endings[ending.key]) || [], ending.voice, bubblePeople[0]);
        }
      }, clear ? 120 : 420);
    }

    function showEndingIllustrationScreen() {
      if (!game.endingInfo) return;

      const key = game.endingInfo.key || game.endingKey || "clear";
      const detail = ENDING_DETAILS[key] || {
        title: game.endingInfo.title || "엔딩",
        shortName: "해금",
        galleryDesc: game.endingInfo.desc || "",
        condition: "조건 정보 없음",
        hint: ""
      };
      const galleryOnly = !!game.endingInfo.galleryOnly;

      const finalScore = Math.floor(
        galleryOnly
          ? (records.highScore || 0)
          : (game.finalTotalScore ?? getTotalScoreNow())
      );

      const comboValue = galleryOnly ? (records.bestCombo || 0) : (game.maxCombo || 0);
      const rankText = getEndingDisplayRank(key, galleryOnly);

      endingIllustrationOverlay.classList.remove("hidden");
      endingArtTitle.textContent = game.endingInfo.title || detail.title;
      endingMetaTitle.textContent = game.endingInfo.title || detail.title;
      endingMetaDesc.innerHTML = game.endingInfo.desc || detail.galleryDesc || "";
      endingArtImage.src = endingImages[key] || defaultImage;

      endingMetaStats.innerHTML = `
        ${galleryOnly ? "최고 점수" : "최종 점수"}: <b>${finalScore.toLocaleString()}</b><br>
        ${galleryOnly ? "컬렉션 상태" : "최종 계급"}: <b>${rankText}</b><br>
        최대 콤보: <b>${comboValue}</b>${galleryOnly ? "<br>해금 여부: <b>완료</b>" : ""}
      `;

      if (endingBonusPanel) {
        endingBonusPanel.innerHTML = buildEndingBonusHtml(key, galleryOnly);
      }
    }


    function resetCurrentStageByHotkey() {
      if (!game.running) return;
      if (game.phase === "launching" || game.phase === "finished") return;

      const stage = typeof clampStage === "function"
        ? clampStage(game.stage)
        : Math.max(1, Math.min(10, game.stage || 1));

      cancelDialogue(true);
      stopSpeaking();
      hideEventBubble();
      warningOverlay.classList.remove("active");
      screenFlash.classList.remove("hit");
      molbabActor.classList.remove("eating", "warningPulse");
      game.holdRice = false;
      game.holdKimchi = false;

      clearTimeout(game.stageFailTimer);
      game.stageFailTimer = null;
      clearTimeout(game._stageStartTimer);

      // 현재 스테이지 진행만 초기화합니다.
      // 이전 스테이지까지의 totalScore, 최고점수, 엔딩 해금 기록은 유지됩니다.
      resetStagePlayValues(true);
      initStageTimer(stage);
      game.stage = stage;
      game.dialogueTimer = 0.45;
      game.phase = "stageRestart";
      game.phaseTimer = 999;
      game.suspicionWarned = false;

      setStageMood();
      // R 재시작 직후에는 이전 WATCH/WARNING 시선이 남지 않도록 중앙 안전 시선으로 고정합니다.
      setGaze("center");
      ensureStageBgm();

      // R 키 재시작은 별도 자막을 띄우지 않고 START 카드 자체를 재시작 카드로 대체합니다.
      showStageRestartCard(stage);
      statusText.textContent = `R 키로 스테이지 ${stage}를 처음부터 다시 시작했습니다. 목표 점수와 몰밥 횟수를 다시 채우세요.`;

      updateHUD();

      clearTimeout(game._stageStartTimer);
      game._stageStartTimer = setTimeout(() => {
        if (game.running && game.stage === stage && game.phase === "stageRestart") {
          setSafePhase();
          // R 재시작 직후 공태연을 바로 쳐다보는 느낌을 줄이기 위해
          // 첫 WARNING까지 최소 4.5초의 안전 시간을 보장합니다.
          game.phaseTimer = Math.max(game.phaseTimer, 4.5);
          setGaze(randomSafeGaze());
          statusText.textContent = `스테이지 ${stage} 재시작 완료. 잠시 안전 시선 후 회의가 다시 진행됩니다.`;
          updateHUD();
        }
      }, 1550);
    }


    function resetGame() {
      game.running = true;
      game.stage = 1;
      game.score = 0;
      game.target = getStageTarget(1);
      game.life = 5;
      game.rankIndex = 0;
      game.combo = 0;
      game.maxCombo = 0;
      game.multiplier = 1;
      game.suspicion = 0;
      game.suspicionWarned = false;
      game.comboBuildTimer = 0;
      game.comboDecayTimer = 0;
      game.phase = "safe";
      game.phaseTimer = 7.0; // v9.16: 게임 시작 직후 첫 WARNING은 7초 후 발생
      game.lastEatReleaseTime = performance.now();
      game.watchGraceTime = 0.22;
      game.holdRice = false;
      game.holdKimchi = false;
      game.riceFrameIndex = 0;
      game.kimchiFrameIndex = 0;
      game.frameElapsed = 0;
      game.lastTime = performance.now();
      game.dialogueTimer = 0.25;
      game.fxTimer = 0.18;
      game.gazeMode = "right";
      game.lastComboShown = 0;
      game.eatCount = 0;
      game.lastEatType = null;
      game.objectiveFailCount = 0;
      clearTimeout(game.stageFailTimer);
      game.stageFailTimer = null;
      game.endingKey = null;
      game.endingInfo = null;
      game.finishLocked = false;
      game.objectiveRocketLocked = false;
      game.rocketLaunchLocked = false;

      cancelDialogue(true);
      setDefaultImage();
      molbabActor.classList.remove("eating", "warningPulse");
      startOverlay.classList.add("hidden");
      endOverlay.classList.add("hidden");
      endingIllustrationOverlay.classList.add("hidden");
      closeOptions();
      rocketOverlay.classList.remove("show");
      hideEventBubble();
      hideRankChangeNotice();
      dialogueLayer.innerHTML = "";
      chewFxLayer.innerHTML = "";
      comboFxLayer.innerHTML = "";
      resultFxLayer.innerHTML = "";
      resultBanner.classList.remove("show", "stage", "clear", "danger", "final");
      createPortraits();
      setStageMood();
      setGaze(randomSafeGaze());
      statusText.textContent = "첫 WARNING은 시작 후 약 7초 뒤에 발생합니다. 그 전까지 몰래 먹을 타이밍을 잡으세요.";
      updateMultiplier();
      updateHUD();
      updateRecordPanels();
      ensureStageBgm();
      requestAnimationFrame(loop);
    }

    function updateAnimation(dt) {
      const action = currentAction();
      if (action === "idle") {
        molbabActor.classList.remove("eating");
        setDefaultImage();
        game.frameElapsed = 0;
        return;
      }
      molbabActor.classList.add("eating");
      game.frameElapsed += dt;
      game.fxTimer -= dt;

      if (action === "rice") {
        if (game.frameElapsed >= game.riceFrameSpeed) {
          game.frameElapsed = 0;
          game.riceFrameIndex = (game.riceFrameIndex + 1) % riceFrames.length;
          molbabFrame.src = riceFrames[game.riceFrameIndex];
          playSfx("rice", 0.45);
        }
        if (game.fxTimer <= 0) {
          spawnChewFx("rice");
          game.fxTimer = 0.28;
        }
      } else if (action === "kimchi") {
        if (game.frameElapsed >= game.kimchiFrameSpeed) {
          game.frameElapsed = 0;
          game.kimchiFrameIndex = (game.kimchiFrameIndex + 1) % kimchiFrames.length;
          molbabFrame.src = kimchiFrames[game.kimchiFrameIndex];
          playSfx("kimchi", 0.52);
        }
        if (game.fxTimer <= 0) {
          spawnChewFx("kimchi");
          game.fxTimer = 0.18;
        }
      }
    }

    function updateCombo(dt) {
      const action = currentAction();
      if (action !== "idle") {
        game.comboBuildTimer += dt;
        game.comboDecayTimer = 0;
        if (game.comboBuildTimer >= 0.65) {
          game.comboBuildTimer = 0;
          game.eatCount = (game.eatCount || 0) + 1;
          addCombo(1);
        }
      } else {
        game.comboBuildTimer = 0;
        if (game.combo > 0 && game.phase === "safe") {
          game.comboDecayTimer += dt;
          if (game.comboDecayTimer >= 1.0) {
            game.comboDecayTimer = 0;
            game.combo = Math.max(0, game.combo - 1);
            updateMultiplier();
            updateHUD();
          }
        }
      }
    }


    function updateSuspicion(dt) {
      if (!(game.phase === "safe" || game.phase === "prewarning")) return;
      const cfg = getStageConfig(game.stage);
      const action = currentAction();

      if (action === "kimchi") {
        game.lastEatType = "kimchi";
        game.suspicion += cfg.kimchiSuspicionPerSecond * dt;
      } else if (action === "rice") {
        game.lastEatType = "rice";
        game.suspicion += cfg.riceSuspicionPerSecond * dt;
      } else {
        game.suspicion -= cfg.suspicionDecayPerSecond * dt;
      }

      game.suspicion = Math.max(0, Math.min(100, game.suspicion));

      if (game.suspicion >= 72 && !game.suspicionWarned) {
        game.suspicionWarned = true;
        spawnComboFx("소음 경계도 상승!");
        statusText.textContent = "소음 경계도가 높습니다. 잠깐 멈추지 않으면 소리 때문에 들킬 수 있습니다.";
      }
      if (game.suspicion < 45) game.suspicionWarned = false;

      if (game.suspicion >= 100 && action !== "idle") {
        game.lastEatType = action;
        const noiseText = action === "kimchi"
          ? "김치 씹는 소리가 너무 큽니다!"
          : "밥 먹는 소리가 너무 큽니다!";
        showEventBubble(noiseText, true, false, bubblePeople[0]);
        caught();
        return;
      }
    }

    function updateScore(dt) {
      const cfg = getStageConfig(game.stage);
      if (!(game.phase === "safe" || game.phase === "prewarning")) return;
      let gain = 0;
      if (game.holdKimchi) gain = cfg.kimchiScorePerSecond;
      else if (game.holdRice) gain = cfg.riceScorePerSecond;
      if (gain > 0) game.score += gain * game.multiplier * dt;
      if (Math.floor(game.score) > records.highScore) bestScoreText.textContent = Math.floor(game.score).toLocaleString();
      updateHUD();
      if (game.score >= game.target) stageClear();
    }

    function updateConversation(dt) {
      if (dialogueState.busy) return;

      // WARNING/WATCH 때문에 밀린 경고 대사가 있으면 현재 음성이 끝난 뒤 한 번만 재생합니다.
      // 이 처리는 시선 타이머를 멈추지 않습니다.
      if (runPendingWatchDialogue()) return;

      if (game.phase !== "safe") return;
      game.dialogueTimer -= dt;
      if (game.dialogueTimer <= 0) {
        showConversationTurn();
        // 실제 다음 대화 예약은 음성이 끝난 뒤 showConversationTurn()에서 다시 잡습니다.
        game.dialogueTimer = 0.1;
      }
    }

    function update(dt) {
      if (!game.running) return;
      game.phaseTimer -= dt;
      updateAnimation(dt);
      updateCombo(dt);
      updateSuspicion(dt);
      updateScore(dt);
      updateConversation(dt);
      updateLookTimerHUD();

      if (game.phase === "safe" && game.phaseTimer <= 0) setPrewarningPhase();
      else if (game.phase === "prewarning" && game.phaseTimer <= 0) setWatchPhase();
      else if (game.phase === "watch" && game.phaseTimer <= 0) setSafePhase();
      else if (game.phase === "caught" && game.phaseTimer <= 0 && game.life > 0) setSafePhase();
      else if (game.phase === "stageClear" && game.phaseTimer <= 0) setSafePhase();
    }

    function loop(now) {
      if (!game.running) return;
      const dt = Math.min(0.033, (now - game.lastTime) / 1000 || 0);
      game.lastTime = now;
      update(dt);
      requestAnimationFrame(loop);
    }

    function activateRice(active) {
      if (!game.running || !optionsOverlay.classList.contains("hidden")) return;
      if (game.phase === "watch" && active) { game.lastEatType = "rice"; caught(); return; }

      // keyup/touchend는 safe가 아니어도 반드시 반영해야 합니다.
      // 이전 버전은 prewarning 상태에서 keyup이 hold 상태를 정리하지 못해,
      // 경고 때 손을 떼도 watch 전환 시 들키는 문제가 생길 수 있었습니다.
      if (!active) {
        game.holdRice = false;
        game.lastEatReleaseTime = performance.now();
        if (!game.holdKimchi) {
          setDefaultImage();
          molbabActor.classList.remove("eating");
        }
        return;
      }

      // WARNING(prewarning) 중에도 새로 밥 먹기 입력을 허용합니다.
      // 단, 수장님이 실제로 쳐다보는 watch 상태에서 누르면 기존처럼 즉시 적발됩니다.
      if (game.phase === "safe" || game.phase === "prewarning") {
        game.holdRice = true;
        game.lastEatType = "rice";
      }
    }

    function activateKimchi(active) {
      if (!game.running || !optionsOverlay.classList.contains("hidden")) return;
      if (game.phase === "watch" && active) { game.lastEatType = "kimchi"; caught(); return; }

      // keyup/touchend는 safe가 아니어도 반드시 반영합니다.
      if (!active) {
        game.holdKimchi = false;
        game.lastEatReleaseTime = performance.now();
        if (!game.holdRice) {
          setDefaultImage();
          molbabActor.classList.remove("eating");
        }
        return;
      }

      // WARNING(prewarning) 중에도 새로 김치 먹기 입력을 허용합니다.
      // 단, 수장님이 실제로 쳐다보는 watch 상태에서 누르면 기존처럼 즉시 적발됩니다.
      if (game.phase === "safe" || game.phase === "prewarning") {
        game.holdKimchi = true;
        game.lastEatType = "kimchi";
      }
    }



    // v9.18.21 PATCH: 타이머 생존 방식 + HUD 분리 + 스테이지 시작 카드 개선
    const STAGE_SURVIVAL_BALANCE = [
      null,
      { timeLimit: 60,  safeTime: 5.8, warningTime: 2.1, watchTime: 1.25, riceScorePerSecond: 80,  kimchiScorePerSecond: 125, riceSuspicionPerSecond: 7.5,  kimchiSuspicionPerSecond: 15, suspicionDecayPerSecond: 15,   dialogueInterval: 2.3 },
      { timeLimit: 85,  safeTime: 5.4, warningTime: 2.0, watchTime: 1.35, riceScorePerSecond: 86,  kimchiScorePerSecond: 135, riceSuspicionPerSecond: 8.5,  kimchiSuspicionPerSecond: 17, suspicionDecayPerSecond: 14.5, dialogueInterval: 2.15 },
      { timeLimit: 110, safeTime: 5.0, warningTime: 1.9, watchTime: 1.45, riceScorePerSecond: 93,  kimchiScorePerSecond: 146, riceSuspicionPerSecond: 10,   kimchiSuspicionPerSecond: 19, suspicionDecayPerSecond: 14,   dialogueInterval: 2.0 },
      { timeLimit: 135, safeTime: 4.6, warningTime: 1.8, watchTime: 1.55, riceScorePerSecond: 101, kimchiScorePerSecond: 158, riceSuspicionPerSecond: 11.5, kimchiSuspicionPerSecond: 21, suspicionDecayPerSecond: 13.5, dialogueInterval: 1.85 },
      { timeLimit: 160, safeTime: 4.2, warningTime: 1.7, watchTime: 1.65, riceScorePerSecond: 110, kimchiScorePerSecond: 172, riceSuspicionPerSecond: 13,   kimchiSuspicionPerSecond: 24, suspicionDecayPerSecond: 13,   dialogueInterval: 1.7 },
      { timeLimit: 185, safeTime: 3.8, warningTime: 1.6, watchTime: 1.75, riceScorePerSecond: 120, kimchiScorePerSecond: 188, riceSuspicionPerSecond: 15,   kimchiSuspicionPerSecond: 27, suspicionDecayPerSecond: 12.5, dialogueInterval: 1.55 },
      { timeLimit: 215, safeTime: 3.5, warningTime: 1.5, watchTime: 1.85, riceScorePerSecond: 131, kimchiScorePerSecond: 205, riceSuspicionPerSecond: 17,   kimchiSuspicionPerSecond: 30, suspicionDecayPerSecond: 12,   dialogueInterval: 1.4 },
      { timeLimit: 245, safeTime: 3.2, warningTime: 1.4, watchTime: 1.95, riceScorePerSecond: 143, kimchiScorePerSecond: 223, riceSuspicionPerSecond: 19,   kimchiSuspicionPerSecond: 33, suspicionDecayPerSecond: 11.5, dialogueInterval: 1.25 },
      { timeLimit: 275, safeTime: 3.0, warningTime: 1.3, watchTime: 2.05, riceScorePerSecond: 156, kimchiScorePerSecond: 243, riceSuspicionPerSecond: 21,   kimchiSuspicionPerSecond: 36, suspicionDecayPerSecond: 11,   dialogueInterval: 1.15 },
      { timeLimit: 300, safeTime: 2.8, warningTime: 1.2, watchTime: 2.15, riceScorePerSecond: 170, kimchiScorePerSecond: 265, riceSuspicionPerSecond: 23,   kimchiSuspicionPerSecond: 40, suspicionDecayPerSecond: 10.5, dialogueInterval: 1.05 }
    ];

    function clampStage(stage) { return Math.max(1, Math.min(10, Number(stage) || 1)); }
    function getStageConfig(stage) { return STAGE_SURVIVAL_BALANCE[clampStage(stage)]; }

    const STAGE_REQUIREMENTS = [
      null,
      { minScore: 1500,  minEatCount: 8  },
      { minScore: 2500,  minEatCount: 12 },
      { minScore: 3700,  minEatCount: 16 },
      { minScore: 5000,  minEatCount: 20 },
      { minScore: 6500,  minEatCount: 25 },
      { minScore: 8300,  minEatCount: 30 },
      { minScore: 10300, minEatCount: 36 },
      { minScore: 12600, minEatCount: 42 },
      { minScore: 15200, minEatCount: 48 },
      { minScore: 18500, minEatCount: 55 }
    ];

    function getStageRequirement(stage) {
      return STAGE_REQUIREMENTS[clampStage(stage)] || STAGE_REQUIREMENTS[1];
    }

    function isStageObjectiveComplete() {
      const req = getStageRequirement(game.stage);
      return (game.score || 0) >= req.minScore && (game.eatCount || 0) >= req.minEatCount;
    }

    function getStageTarget(stage) { return getStageConfig(stage).timeLimit; }
    function formatClock(sec) {
      const s = Math.max(0, Math.ceil(sec || 0));
      const m = Math.floor(s / 60);
      const r = s % 60;
      return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
    }
    function getTotalScoreNow() { return Math.floor((game.totalScore || 0) + (game.score || 0)); }
    function getStageSoftScoreGoal() {
      const cfg = getStageConfig(game.stage);
      return Math.max(1200, cfg.timeLimit * (cfg.riceScorePerSecond * 0.42 + cfg.kimchiScorePerSecond * 0.12));
    }
    function initStageTimer(stage) {
      const cfg = getStageConfig(stage);
      game.stageTimeLimit = cfg.timeLimit;
      game.stageTimeLeft = cfg.timeLimit;
      game.target = cfg.timeLimit;
    }
    function resetStagePlayValues(resetScore = true) {
      if (resetScore) game.score = 0;
      game.suspicion = 0;
      game.suspicionWarned = false;
      game.combo = 0;
      game.multiplier = 1;
      game.comboBuildTimer = 0;
      game.comboDecayTimer = 0;
      game.holdRice = false;
      game.holdKimchi = false;
      game.riceFrameIndex = 0;
      game.kimchiFrameIndex = 0;
      game.frameElapsed = 0;
      game.lastComboShown = 0;
      game.eatCount = 0;
      game.lastEatType = null;
      updateMultiplier();
    }
    function showStageStartCard(stage) {
      const card = document.getElementById("stageStartCard");
      if (!card) return;

      card.classList.remove("restartMode");

      const kicker = card.querySelector(".stageStartKicker");
      const title = card.querySelector(".stageStartTitle");
      const info = card.querySelector(".stageStartInfo");
      const req = getStageRequirement(stage);

      if (kicker) kicker.textContent = "SURVIVAL MEETING";
      if (title) title.innerHTML = `STAGE <span id="stageStartNo">${stage}</span> START`;
      if (info) {
        info.innerHTML = `제한 시간 <b id="stageStartTime">${formatClock(getStageConfig(stage).timeLimit)}</b> · 목표 <b>${req.minScore.toLocaleString()}점</b> · 몰밥 <b>${req.minEatCount}회</b>`;
      }

      card.classList.remove("hidden");
      card.classList.remove("show");
      void card.offsetWidth;
      card.classList.add("show");

      clearTimeout(card._hideTimer);
      card._hideTimer = setTimeout(() => {
        card.classList.remove("show");
        setTimeout(() => card.classList.add("hidden"), 260);
      }, 1550);
    }

    function showStageRestartCard(stage) {
      const card = document.getElementById("stageStartCard");
      if (!card) return;

      card.classList.add("restartMode");

      const kicker = card.querySelector(".stageStartKicker");
      const title = card.querySelector(".stageStartTitle");
      const info = card.querySelector(".stageStartInfo");
      const req = getStageRequirement(stage);

      if (kicker) kicker.textContent = "RESTART MEETING";
      if (title) title.innerHTML = `STAGE ${stage} 재시작`;
      if (info) {
        info.innerHTML = `현재 스테이지를 처음부터 다시 시작합니다 · 목표 <b>${req.minScore.toLocaleString()}점</b> · 몰밥 <b>${req.minEatCount}회</b>`;
      }

      card.classList.remove("hidden");
      card.classList.remove("show");
      void card.offsetWidth;
      card.classList.add("show");

      clearTimeout(card._hideTimer);
      card._hideTimer = setTimeout(() => {
        card.classList.remove("show");
        setTimeout(() => {
          card.classList.add("hidden");
          card.classList.remove("restartMode");
        }, 260);
      }, 1550);
    }

    function updateStageTimerHUD() {
      const panel = document.getElementById("stageTimerPanel");
      const text = document.getElementById("stageTimerText");
      const sub = document.getElementById("stageTimerSub");
      const bar = document.getElementById("stageTimerBar");
      if (!panel || !text || !sub || !bar) return;
      const limit = Math.max(1, game.stageTimeLimit || getStageConfig(game.stage).timeLimit);
      const left = Math.max(0, game.stageTimeLeft ?? limit);
      const ratio = Math.max(0, Math.min(1, left / limit));
      text.textContent = formatClock(left);
      const req = getStageRequirement(game.stage);
      const scoreNow = Math.floor(game.score || 0);
      const eatNow = Math.floor(game.eatCount || 0);
      const scoreRatio = Math.max(0, Math.min(1, scoreNow / Math.max(1, req.minScore)));
      const eatRatio = Math.max(0, Math.min(1, eatNow / Math.max(1, req.minEatCount)));
      const scoreReady = scoreNow >= req.minScore;
      const eatReady = eatNow >= req.minEatCount;

      sub.textContent = `STAGE ${game.stage} / ${formatClock(limit)} 생존`;
      bar.style.width = `${Math.round(ratio * 100)}%`;
      panel.classList.toggle("lowTime", left <= 10 && game.running);
      panel.classList.toggle("objectivesReady", scoreReady && eatReady);

      const scoreTextEl = document.getElementById("stageGoalScoreText");
      const eatTextEl = document.getElementById("stageGoalEatText");
      const scoreBarEl = document.getElementById("stageGoalScoreBar");
      const eatBarEl = document.getElementById("stageGoalEatBar");
      const scoreCard = document.getElementById("scoreObjectiveCard");
      const eatCard = document.getElementById("eatObjectiveCard");

      if (scoreTextEl) scoreTextEl.textContent = `${scoreNow.toLocaleString()} / ${req.minScore.toLocaleString()}`;
      if (eatTextEl) eatTextEl.textContent = `${Math.min(eatNow, req.minEatCount)} / ${req.minEatCount}`;
      if (scoreBarEl) scoreBarEl.style.width = `${Math.round(scoreRatio * 100)}%`;
      if (eatBarEl) eatBarEl.style.width = `${Math.round(eatRatio * 100)}%`;
      if (scoreCard) scoreCard.classList.toggle("ready", scoreReady);
      if (eatCard) eatCard.classList.toggle("ready", eatReady);

      const failNow = Math.max(0, Math.min(5, game.objectiveFailCount || 0));
      const failText = document.getElementById("objectiveFailText");
      const failDots = document.getElementById("objectiveFailDots");
      const failCard = document.getElementById("objectiveFailCard");
      if (failText) failText.textContent = `${failNow} / 5`;
      if (failDots) {
        failDots.innerHTML = "";
        for (let i = 1; i <= 5; i++) {
          const dot = document.createElement("span");
          dot.className = "objectiveFailDot" + (i <= failNow ? " on" : "");
          failDots.appendChild(dot);
        }
      }
      if (failCard) failCard.classList.toggle("warning", failNow >= 4);
    }
    function updateHUD() {
      stageText.textContent = game.stage;
      if (stageWatermarkText) stageWatermarkText.textContent = game.stage;
      lifeText.textContent = game.life;
      rankText.textContent = RANKS[Math.min(game.rankIndex, RANKS.length - 1)];
      comboText.textContent = game.combo;
      multiplierText.textContent = "x" + game.multiplier.toFixed(1);
      scoreText.textContent = Math.floor(game.score).toLocaleString();
      targetText.textContent = getTotalScoreNow().toLocaleString();
      const softGoal = getStageSoftScoreGoal();
      scoreBar.style.width = `${Math.min(100, (game.score / softGoal) * 100)}%`;
      suspicionText.textContent = Math.round(game.suspicion);
      suspicionBar.style.width = `${Math.min(100, Math.max(0, game.suspicion))}%`;
      bgmStageText.textContent = stageBgmKey(game.stage).toUpperCase();
      updateLookTimerHUD();
      updateStageTimerHUD();
      bestScoreText.textContent = Math.floor(records.highScore).toLocaleString();
    }
    function updateScore(dt) {
      const cfg = getStageConfig(game.stage);
      if (!(game.phase === "safe" || game.phase === "prewarning")) return;
      let gain = 0;
      if (game.holdKimchi) gain = cfg.kimchiScorePerSecond;
      else if (game.holdRice) gain = cfg.riceScorePerSecond;
      if (gain > 0) game.score += gain * game.multiplier * dt;
      const totalNow = getTotalScoreNow();
      if (totalNow > records.highScore) bestScoreText.textContent = totalNow.toLocaleString();
      updateHUD();
    }
    function commitCurrentStageScore() {
      if (game.stageScoreCommitted) return;
      const bonus = Math.floor(game.combo * 25);
      if (bonus > 0) {
        game.score += bonus;
        spawnComboFx(`콤보 보너스 +${bonus}`);
      }
      game.totalScore = Math.floor((game.totalScore || 0) + (game.score || 0));
      game.stageScoreCommitted = true;
      if (game.totalScore > records.highScore) {
        records.highScore = Math.floor(game.totalScore);
        saveRecords();
      }
    }
    function stageClear() {
      if (!game.running || game.phase === "stageClear" || game.phase === "launching") return;
      cancelDialogue(true);
      commitCurrentStageScore();
      game.holdRice = false;
      game.holdKimchi = false;
      molbabActor.classList.remove("eating", "warningPulse");
      warningOverlay.classList.remove("active");
      hideEventBubble();
      setDefaultImage();
      pulseWrap("clear");
      showResultBanner("STAGE CLEAR!", "clear", 1000);
      spawnResultParticles("clear");
      playSfx("clear", 0.8);

      if (game.stage >= 10) {
        game.finalTotalScore = game.totalScore;
        finish(true);
        return;
      }

      game.stage += 1;
      game.stageScoreCommitted = false;
      resetStagePlayValues(true);
      initStageTimer(game.stage);
      game.phase = "stageClear";
      game.phaseTimer = 1.2;
      game.dialogueTimer = 0.65;
      setStageMood();
      setGaze(randomSafeGaze());
      ensureStageBgm();
      showStageStartCard(game.stage);
      statusText.textContent = `스테이지 ${game.stage} 회의 시작. 제한 시간 안에 목표 점수와 몰밥 횟수를 채우세요. 이전 스테이지까지 누적 점수: ${Math.floor(game.totalScore).toLocaleString()}점`;
      updateHUD();
      clearTimeout(game._stageStartTimer);
      game._stageStartTimer = setTimeout(() => {
        if (game.running && game.phase === "stageClear") setSafePhase();
      }, 1250);
    }
    function determineEnding(clear) {
      const finalScore = Math.floor(game.finalTotalScore ?? getTotalScoreNow());
      if (!clear) {
        unlockEnding("rocket");
        return { key: "rocket", title: game.stage >= 7 ? "장렬한 로켓 방출 엔딩" : "조기 방출 엔딩", desc: `로켓에 실려 크루에서 방출되었습니다.<br>최종 점수: <b>${finalScore.toLocaleString()}</b><br>최종 계급: <b>방출</b><br>최대 콤보: <b>${game.maxCombo}</b>`, voice: "로켓 방출 엔딩입니다. 다음에는 더 조용히 드세요." };
      }
      if (game.life === 5 && game.rankIndex === 0) {
        unlockEnding("perfect");
        return { key: "perfect", title: "레전드 정직원 엔딩", desc: `한 번도 들키지 않고 식사를 무사히 마쳤습니다. 몰밥 장기전 10스테이지를 완벽히 돌파했습니다!<br>최종 점수: <b>${finalScore.toLocaleString()}</b><br>최종 계급: <b>정직원</b><br>최대 콤보: <b>${game.maxCombo}</b>`, voice: "레전드 정직원 엔딩입니다. 완벽한 몰밥 실력입니다." };
      }
      if (game.maxCombo >= 20) {
        unlockEnding("kimchiKing");
        return { key: "kimchiKing", title: "김치왕 엔딩", desc: `김치 먹방의 전설이 되었습니다.<br>최종 점수: <b>${finalScore.toLocaleString()}</b><br>최종 계급: <b>${RANKS[Math.min(game.rankIndex, RANKS.length - 1)]}</b><br>최대 콤보: <b>${game.maxCombo}</b>`, voice: "김치왕 엔딩입니다. 아삭한 승리입니다." };
      }
      if (game.rankIndex >= 1) {
        unlockEnding("intern");
        return { key: "intern", title: "인턴 생존 엔딩", desc: `강등을 겪었지만 끝내 살아남았습니다.<br>최종 점수: <b>${finalScore.toLocaleString()}</b><br>최종 계급: <b>${RANKS[Math.min(game.rankIndex, RANKS.length - 1)]}</b><br>최대 콤보: <b>${game.maxCombo}</b>`, voice: "인턴 생존 엔딩입니다. 아슬아슬했지만 살아남았습니다." };
      }
      unlockEnding("clear");
      return { key: "clear", title: "생존 성공 엔딩", desc: `긴 회의 10스테이지 몰밥에 성공했습니다.<br>최종 점수: <b>${finalScore.toLocaleString()}</b><br>최종 계급: <b>${RANKS[Math.min(game.rankIndex, RANKS.length - 1)]}</b><br>최대 콤보: <b>${game.maxCombo}</b>`, voice: "생존 성공 엔딩입니다. 회의실 몰밥에 성공했습니다." };
    }
    function finish(clear) {
      if (game.finishLocked) return;
      game.finishLocked = true;
      game.running = false;
      warningOverlay.classList.remove("active");
      molbabActor.classList.remove("warningPulse");
      endOverlay.classList.remove("hidden");
      cancelDialogue(true);
      stopAllBgm();
      pulseWrap(clear ? "clear" : "danger");
      showResultBanner(clear ? "MISSION COMPLETE" : "GAME OVER", clear ? "final" : "danger", 1450);
      spawnResultParticles(clear ? "clear" : "gameover");
      if (game.finalTotalScore == null) game.finalTotalScore = Math.floor(getTotalScoreNow());
      if (game.finalTotalScore > records.highScore) records.highScore = Math.floor(game.finalTotalScore);
      if (game.maxCombo > records.bestCombo) records.bestCombo = game.maxCombo;
      saveRecords();
      const ending = determineEnding(clear);
      game.endingInfo = ending;
      game.endingKey = ending.key;
      endTitle.textContent = ending.title;
      endDesc.innerHTML = ending.desc;
      updateRecordPanels();
      playVoiceClip((voiceClips.endings && voiceClips.endings[ending.key]) || [], ending.voice, bubblePeople[0]);
    }
    function showEndingIllustrationScreen() {
      if (!game.endingInfo) return;

      const key = game.endingInfo.key || game.endingKey || "clear";
      const detail = ENDING_DETAILS[key] || {
        title: game.endingInfo.title || "엔딩",
        shortName: "해금",
        galleryDesc: game.endingInfo.desc || "",
        condition: "조건 정보 없음",
        hint: ""
      };
      const galleryOnly = !!game.endingInfo.galleryOnly;

      const finalScore = Math.floor(
        galleryOnly
          ? (records.highScore || 0)
          : (game.finalTotalScore ?? getTotalScoreNow())
      );

      const comboValue = galleryOnly ? (records.bestCombo || 0) : (game.maxCombo || 0);
      const rankText = getEndingDisplayRank(key, galleryOnly);

      endingIllustrationOverlay.classList.remove("hidden");
      endingArtTitle.textContent = game.endingInfo.title || detail.title;
      endingMetaTitle.textContent = game.endingInfo.title || detail.title;
      endingMetaDesc.innerHTML = game.endingInfo.desc || detail.galleryDesc || "";
      endingArtImage.src = endingImages[key] || defaultImage;

      endingMetaStats.innerHTML = `
        ${galleryOnly ? "최고 점수" : "최종 점수"}: <b>${finalScore.toLocaleString()}</b><br>
        ${galleryOnly ? "컬렉션 상태" : "최종 계급"}: <b>${rankText}</b><br>
        최대 콤보: <b>${comboValue}</b>${galleryOnly ? "<br>해금 여부: <b>완료</b>" : ""}
      `;

      if (endingBonusPanel) {
        endingBonusPanel.innerHTML = buildEndingBonusHtml(key, galleryOnly);
      }
    }
    function resetGame() {
      game.running = true;
      game.stage = 1;
      game.totalScore = 0;
      game.finalTotalScore = null;
      game.stageScoreCommitted = false;
      game.score = 0;
      game.target = getStageTarget(1);
      initStageTimer(1);
      game.life = 5;
      game.rankIndex = 0;
      game.combo = 0;
      game.maxCombo = 0;
      game.multiplier = 1;
      game.suspicion = 0;
      game.suspicionWarned = false;
      game.comboBuildTimer = 0;
      game.comboDecayTimer = 0;
      game.phase = "safe";
      game.phaseTimer = 7.0;
      game.lastEatReleaseTime = performance.now();
      game.watchGraceTime = 0.22;
      game.holdRice = false;
      game.holdKimchi = false;
      game.riceFrameIndex = 0;
      game.kimchiFrameIndex = 0;
      game.frameElapsed = 0;
      game.lastTime = performance.now();
      game.dialogueTimer = 0.25;
      game.fxTimer = 0.18;
      game.gazeMode = "right";
      game.lastComboShown = 0;
      game.endingKey = null;
      game.endingInfo = null;
      game.finishLocked = false;
      game.objectiveRocketLocked = false;
      game.rocketLaunchLocked = false;
      clearTimeout(game.stageFailTimer);
      clearTimeout(game._stageStartTimer);
      game.stageFailTimer = null;
      cancelDialogue(true);
      setDefaultImage();
      molbabActor.classList.remove("eating", "warningPulse");
      startOverlay.classList.add("hidden");
      endOverlay.classList.add("hidden");
      endingIllustrationOverlay.classList.add("hidden");
      closeOptions();
      rocketOverlay.classList.remove("show");
      hideEventBubble();
      hideRankChangeNotice();
      dialogueLayer.innerHTML = "";
      chewFxLayer.innerHTML = "";
      comboFxLayer.innerHTML = "";
      resultFxLayer.innerHTML = "";
      resultBanner.classList.remove("show", "stage", "clear", "danger", "final");
      createPortraits();
      setStageMood();
      setGaze(randomSafeGaze());
      showStageStartCard(1);
      statusText.textContent = `스테이지 1 회의 시작. ${formatClock(game.stageTimeLimit)} 동안 버티면서 점수를 쌓으세요.`;
      updateMultiplier();
      updateHUD();
      updateRecordPanels();
      ensureStageBgm();
      requestAnimationFrame(loop);
    }
    function update(dt) {
      if (!game.running) return;
      game.phaseTimer -= dt;
      if (!["stageClear", "stageFail", "stageRestart", "launching"].includes(game.phase)) {
        game.stageTimeLeft = Math.max(0, (game.stageTimeLeft ?? getStageConfig(game.stage).timeLimit) - dt);
      }
      updateAnimation(dt);
      updateCombo(dt);
      updateSuspicion(dt);
      updateScore(dt);
      updateConversation(dt);
      updateLookTimerHUD();
      updateStageTimerHUD();
      if (game.stageTimeLeft <= 0 && !["stageClear", "stageFail", "stageRestart", "launching"].includes(game.phase)) {
        if (isStageObjectiveComplete()) stageClear();
        else stageRequirementFail();
        return;
      }
      if (game.phase === "safe" && game.phaseTimer <= 0) setPrewarningPhase();
      else if (game.phase === "prewarning" && game.phaseTimer <= 0) setWatchPhase();
      else if (game.phase === "watch" && game.phaseTimer <= 0) setSafePhase();
      else if (game.phase === "caught" && game.phaseTimer <= 0 && game.life > 0) setSafePhase();
      else if (game.phase === "stageClear" && game.phaseTimer <= 0) setSafePhase();
    }

    window.addEventListener("keydown", e => {
      if (e.code === "KeyM") {
        e.preventDefault();
        settings.bgmEnabled = !settings.bgmEnabled;
        settings.sfxEnabled = !settings.sfxEnabled;
        settings.voiceEnabled = !settings.voiceEnabled;
        if (!settings.bgmEnabled) stopAllBgm(); else ensureStageBgm();
        applyAudioSettings(); saveSettings();
        return;
      }
      if (e.code === "KeyO" || e.code === "Escape") {
        e.preventDefault();
        if (optionsOverlay.classList.contains("hidden")) openOptions();
        else closeOptions();
        return;
      }
      if (!game.running || !optionsOverlay.classList.contains("hidden")) return;

      if (e.code === "KeyR") {
        e.preventDefault();
        resetCurrentStageByHotkey();
        return;
      }

      if (e.code === "Space") {
        e.preventDefault();
        activateRice(true);
      }
      if (e.code === "KeyK") {
        e.preventDefault();
        activateKimchi(true);
      }
    });

    window.addEventListener("keyup", e => {
      if (e.code === "Space") { e.preventDefault(); game.lastEatReleaseTime = performance.now(); activateRice(false); }
      if (e.code === "KeyK") { e.preventDefault(); game.lastEatReleaseTime = performance.now(); activateKimchi(false); }
    });

    function bindTouchHold(btn, onStart, onEnd) {
      const start = (e) => { e.preventDefault(); btn.classList.add("active"); onStart(); };
      const end = (e) => { e.preventDefault(); btn.classList.remove("active"); onEnd(); };
      ["pointerdown", "touchstart", "mousedown"].forEach(evt => btn.addEventListener(evt, start, { passive: false }));
      ["pointerup", "pointercancel", "touchend", "touchcancel", "mouseup", "mouseleave"].forEach(evt => btn.addEventListener(evt, end, { passive: false }));
    }

    bindTouchHold(document.getElementById("touchRiceBtn"), () => activateRice(true), () => activateRice(false));
    bindTouchHold(document.getElementById("touchKimchiBtn"), () => activateKimchi(true), () => activateKimchi(false));
    document.getElementById("touchOptionBtn").addEventListener("click", (e) => { e.preventDefault(); openOptions(); });

    document.getElementById("startBtn").addEventListener("click", resetGame);
    document.getElementById("restartBtn").addEventListener("click", resetGame);
    document.getElementById("restartFromEndingIllustrationBtn").addEventListener("click", resetGame);
    document.getElementById("restartFromEndingGalleryBtn").addEventListener("click", resetGame);
    document.getElementById("optionBtn").addEventListener("click", openOptions);
    document.getElementById("openOptionsFromStart").addEventListener("click", openOptions);
    document.getElementById("openEndingGalleryFromStart").addEventListener("click", openEndingGallery);
    document.getElementById("closeOptionsBtn").addEventListener("click", closeOptions);
    document.getElementById("showEndingIllustrationBtn").addEventListener("click", showEndingIllustrationScreen);
    document.getElementById("showEndingGalleryBtn").addEventListener("click", openEndingGallery);
    document.getElementById("openEndingGalleryFromIllustrationBtn").addEventListener("click", openEndingGallery);
    document.getElementById("closeEndingGalleryBtn").addEventListener("click", closeEndingGallery);
    document.getElementById("closeEndingIllustrationBtn").addEventListener("click", closeEndingIllustration);

    bgmVolume.addEventListener("input", () => {
      settings.bgmVolume = Number(bgmVolume.value) / 100;
      applyAudioSettings(); saveSettings();
      if (settings.bgmEnabled) ensureStageBgm();
    });
    sfxVolume.addEventListener("input", () => {
      settings.sfxVolume = Number(sfxVolume.value) / 100;
      applyAudioSettings(); saveSettings();
    });
    voiceVolume.addEventListener("input", () => {
      settings.voiceVolume = Number(voiceVolume.value) / 100;
      applyAudioSettings(); saveSettings();
    });

    toggleBgmBtn.addEventListener("click", () => {
      settings.bgmEnabled = !settings.bgmEnabled;
      if (!settings.bgmEnabled) stopAllBgm(); else ensureStageBgm();
      applyAudioSettings(); saveSettings();
    });
    toggleSfxBtn.addEventListener("click", () => {
      settings.sfxEnabled = !settings.sfxEnabled;
      applyAudioSettings(); saveSettings();
    });
    toggleVoiceBtn.addEventListener("click", () => {
      settings.voiceEnabled = !settings.voiceEnabled;
      if (!settings.voiceEnabled) stopSpeaking();
      applyAudioSettings(); saveSettings();
    });
    document.getElementById("resetRecordsBtn").addEventListener("click", () => {
      if (!confirm("최고점수와 엔딩 해금 기록을 초기화할까요?")) return;
      records = clone(defaultRecords);
      saveRecords();
      updateRecordPanels();
    });


    // PATCH v9.18.27: 엔딩 일러스트 화면의 엔딩 갤러리 버튼 강제 보정
    const openEndingGalleryFromIllustrationBtnPatch = document.getElementById("openEndingGalleryFromIllustrationBtn");
    if (openEndingGalleryFromIllustrationBtnPatch) {
      openEndingGalleryFromIllustrationBtnPatch.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        openEndingGallery();
      });
    }

    // preload
    [...riceFrames, ...kimchiFrames, defaultImage, ...stageBackgrounds, ...agendaImages, ...Object.values(endingImages), ...portraitKeys.flatMap(k => portraitExpressions.map(e => portraitPaths[k][e])), ...Object.values(popupCardPaths)].forEach(src => { const img = new Image(); img.src = src; });
    Object.values(sounds).forEach(src => { const a = new Audio(); a.preload = "auto"; a.src = src; });

    applyAudioSettings();
    updateRecordPanels();
    updateMultiplier();
    updateHUD();
    styleBeamForMode("center");
    startGazeBeamLoop();
  
    // PATCH: WARNING(prewarning) 상태에서도 밥/김치 입력 허용 완료
  