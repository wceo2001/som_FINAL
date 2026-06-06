import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BatteryCharging,
  Boxes,
  ChevronDown,
  ClipboardList,
  Factory,
  Home,
  Info,
  Layers3,
  LockKeyhole,
  MapPinned,
  Menu,
  Route,
  Search,
  ShieldAlert,
  Sparkles,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";

const ASSETS = {
  maps: {
    2050: "/assets/map-2050.webp",
    2075: "/assets/map-2075.webp",
  },
  collisionMap: "/assets/collision-map.webp",
  method: "/assets/method.webp",
  sectors: {
    transfer: {
      layer: "/assets/layer-transfer.webp",
      hero: {
        2050: "/assets/transfer-2050.webp",
        2075: "/assets/transfer-2075.webp",
      },
      gallery: {
        2050: ["/assets/transfer2-2050.webp"],
        2075: ["/assets/transfer2-2075.webp"],
      },
    },
    industrial: {
      layer: "/assets/layer-industrial.webp",
      hero: {
        2050: "/assets/industrial-2050.webp",
        2075: "/assets/industrial-2075.webp",
      },
      subtypeImages: {
        2050: {
          learning: "/assets/industrial-learning-2050.webp",
          shared: "/assets/shared-production-2050.webp",
          logistics: "/assets/urban-logistics-2050.webp",
        },
        2075: {
          darkFactory: "/assets/dark-factory-2075.webp",
          controlHub: "/assets/urban-control-hub-2075.webp",
          civicFactory: "/assets/civic-factory-2075.webp",
        },
      },
    },
    residential: {
      layer: "/assets/layer-residential.webp",
      hero: {
        2050: "/assets/residential-2050.webp",
        2075: "/assets/residential-2075.webp",
      },
      subtypeImages: {
        2050: {
          porous: "/assets/porous-strip-2050.webp",
          market: "/assets/market-dwelling-block-2050.webp",
        },
        2075: {
          inverted: "/assets/inverted-ground-city-2075.webp",
          survival: "/assets/survival-ground-city-2075.webp",
        },
      },
    },
    energy: {
      layer: "/assets/layer-energy.webp",
      hero: {
        2050: "/assets/energy-2050.webp",
        2075: "/assets/energy-2075.webp",
      },
      gallery: {
        2050: [],
        2075: ["/assets/energy2-2075.webp"],
      },
    },
  },
};

const BGM_SRC = "/assets/bgm.mp3";

const PURPOSE_VIDEOS = {
  transfer: "/assets/transfer hero 2050.mp4",
  produce: "/assets/video-industrial.mp4",
  goods: "/assets/video-goods.mp4",
  living: "/assets/video-residential.mp4",
  energy: "/assets/video-energy.mp4",
  support: "/assets/video-support.mp4",
};

const yearModes = {
  2050: {
    label: "Urban Assembly of Sasang",
    ko: "사상 도시 조립체",
    thesis: "A city accessed through shared but purpose-based systems.",
    koThesis: "공유 인프라가 목적별 시스템으로 조립되는 도시.",
  },
  2075: {
    label: "Urban Rights System of Sasang",
    ko: "사상 도시 권리 시스템",
    thesis: "A city where access, energy, production, repair, and survival are distributed by rights.",
    koThesis: "접근, 에너지, 생산, 수리, 생존이 권리와 우선순위로 배분되는 도시.",
  },
};

const sectors = {
  transfer: {
    order: "01",
    title: "Transfer City",
    koTitle: "환승 도시",
    icon: Route,
    current: "Compressed Mobility Hub",
    koCurrent: "압축된 모빌리티 허브",
    systems: {
      2050: "Integrated Transfer Deck / Civic Concourse",
      2075: "Access-Class City / Service Access Market",
    },
    coreIdea:
      "Sasang Station’s scattered transport facilities become an urban platform where movement, waiting, services, and temporary life are organized together.",
    koCoreIdea:
      "흩어진 교통시설이 이동, 대기, 서비스, 임시 체류를 함께 조직하는 도시 플랫폼으로 바뀐다.",
    tension:
      "Can integrated transfer become a shared urban platform, or will it distribute speed, comfort, and services unequally?",
    koTension:
      "통합 환승은 공유 도시 플랫폼이 될 수 있는가, 아니면 속도와 편의, 서비스를 불평등하게 배분하는 시스템이 될 것인가?",
    yearlyNotes: {
      2050: {
        title: "Integrated Transfer Deck",
        description:
          "Metro lines, light rail, West Busan Terminal, buses, shuttles, taxis, and micromobility systems are connected within one transfer deck. The deck also absorbs temporary waiting, luggage storage, language support, labor counseling, and care mobility.",
        koDescription:
          "도시철도, 경전철, 서부산터미널, 버스, 셔틀, 택시, 마이크로 모빌리티가 하나의 환승 데크 안에서 연결된다. 이 데크는 임시 대기, 수하물 보관, 언어 지원, 노동 상담, 돌봄 이동도 흡수한다.",
        access:
          "Routes are assigned according to movement purpose, stay duration, physical condition, language environment, luggage status, and service needs.",
        koAccess:
          "경로는 이동 목적, 체류 시간, 신체 조건, 언어 환경, 수하물 상태, 서비스 필요에 따라 배정된다.",
      },
      2075: {
        title: "Access-Class City",
        description:
          "The transfer hub classifies users by access level. Movement speed, waiting location, sleeping access, charging, storage, medical booking, and shuttle priority are assigned according to access rights.",
        koDescription:
          "환승 허브는 이용자를 접근 등급에 따라 분류한다. 이동 속도, 대기 위치, 수면 접근, 충전, 보관, 의료 예약, 셔틀 우선권이 접근권에 따라 배정된다.",
        access:
          "A normal transport ticket is not enough. Users must check Urban Service Pass, priority gate status, and service rights before moving.",
        koAccess:
          "일반 교통 티켓만으로는 충분하지 않다. 이용자는 이동 전 Urban Service Pass, 우선 게이트 상태, 서비스 권리를 확인해야 한다.",
      },
    },
    effects: [
      "Mobility becomes service access",
      "Waiting becomes stratified",
      "Transfer creates new inequality",
      "The station becomes a temporary city",
    ],
  },
  industrial: {
    order: "02",
    title: "Industrial Urbanism",
    koTitle: "산업 도시성",
    icon: Factory,
    current: "Remaining Industrial Fabric",
    koCurrent: "잔존 산업 조직",
    systems: {
      2050: "Open Factory Commons",
      2075: "Industrial Sovereignty Zone",
    },
    coreIdea:
      "Sasang’s remaining factories, warehouses, repair shops, and industrial alleys become urban infrastructure rather than disappearing from the city.",
    koCoreIdea:
      "사상의 남아 있는 공장, 창고, 수리점, 산업 골목이 사라지는 대신 도시 인프라로 전환된다.",
    tension:
      "Can factories remain shared urban assets, or will they become powerful systems that compete with the city?",
    koTension:
      "공장은 공유 도시 자산으로 남을 수 있는가, 아니면 도시와 경쟁하는 강력한 시스템이 될 것인가?",
    subtypes: {
      2050: [
        {
          id: "learning",
          title: "Industrial Learning Commons",
          koTitle: "산업 학습 커먼즈",
          image: ASSETS.sectors.industrial.subtypeImages[2050].learning,
          description:
            "A technical education zone where first-time users learn machine use, production language, safety rules, and workshop circulation before accessing factory equipment.",
          koDescription:
            "처음 이용하는 사용자가 공장 장비에 접근하기 전 기계 사용법, 생산 언어, 안전 규칙, 작업장 동선을 배우는 기술 교육 구역이다.",
          access:
            "Access to equipment depends on training level. Basic users may observe demonstrations, while certified users may operate equipment in restricted practice zones.",
          koAccess:
            "장비 접근은 교육 수준에 따라 달라진다. 기본 교육 사용자는 시연을 볼 수 있고, 인증 사용자는 제한된 실습 구역에서 장비를 조작할 수 있다.",
          keywords: ["Training", "Machine literacy", "Certification", "Production language"],
        },
        {
          id: "shared",
          title: "Shared Production Commons",
          koTitle: "공유 생산 커먼즈",
          image: ASSETS.sectors.industrial.subtypeImages[2050].shared,
          description:
            "A production zone where machines, workshops, packing rooms, loading spaces, and storage slots are reserved only for the time and equipment each user needs.",
          koDescription:
            "기계, 작업장, 포장실, 적재 공간, 저장 슬롯을 사용자가 필요한 시간과 장비만큼 예약해 쓰는 생산 구역이다.",
          access:
            "Entry requires training records, equipment certification, a reserved time slot, and approved materials. Late arrival may cancel the slot.",
          koAccess:
            "입장에는 교육 기록, 장비 인증, 예약된 시간 슬롯, 승인된 재료가 필요하다. 지각하면 슬롯이 취소될 수 있다.",
          keywords: ["Time slot", "Machine slot", "Small batch", "Repair parts"],
        },
        {
          id: "logistics",
          title: "Urban Logistics Commons",
          koTitle: "도시 물류 커먼즈",
          image: ASSETS.sectors.industrial.subtypeImages[2050].logistics,
          description:
            "A logistics zone where factory edges, vacant warehouses, and loading spaces process storage, sorting, returns, delivery, and robot charging.",
          koDescription:
            "공장 가장자리, 빈 창고, 적재 공간이 보관, 분류, 반품, 배송, 로봇 충전을 처리하는 물류 구역으로 바뀐다.",
          access:
            "Users do not enter the logistics interior. They issue a Logistics Flow Ticket at an external reception port and use pickup ports only.",
          koAccess:
            "이용자는 물류 내부에 들어가지 않는다. 외부 접수 포트에서 Logistics Flow Ticket을 발급하고 픽업 포트만 이용한다.",
          keywords: ["Robot-only zone", "Reception port", "Pickup port", "Sorting"],
        },
      ],
      2075: [
        {
          id: "darkFactory",
          title: "Dark Factory",
          koTitle: "다크 팩토리",
          image: ASSETS.sectors.industrial.subtypeImages[2075].darkFactory,
          description:
            "An automated production interior where AI schedules, robotic assembly, quality inspection, unmanned storage, and packaging systems determine production time and logistics flows.",
          koDescription:
            "AI 생산 스케줄, 로봇 조립, 자동 품질 검사, 무인 저장, 자동 포장 시스템이 생산 시간과 물류 흐름을 결정하는 자동화 생산 내부이다.",
          access:
            "Ordinary users cannot access the interior. They only use order reception, authentication, and export ports while algorithms assign production slots.",
          koAccess:
            "일반 사용자는 내부에 접근할 수 없다. 주문 접수, 인증, 반출 포트만 이용하며 알고리즘이 생산 슬롯을 배정한다.",
          keywords: ["AI schedule", "Robot assembly", "Closed interior", "Production slot"],
        },
        {
          id: "controlHub",
          title: "Urban Control Hub",
          koTitle: "도시 통제 허브",
          image: ASSETS.sectors.industrial.subtypeImages[2075].controlHub,
          description:
            "An invisible control room that manages energy allocation, robot charging, logistics sorting, data records, access regulation, and risk detection across the city.",
          koDescription:
            "에너지 배분, 로봇 충전, 물류 분류, 데이터 기록, 접근 규제, 위험 감지를 도시 전체에서 관리하는 보이지 않는 통제실이다.",
          access:
            "Ordinary users cannot enter. They experience the results of priority decisions without fully seeing how priorities are assigned.",
          koAccess:
            "일반 이용자는 들어갈 수 없다. 우선순위 결정의 결과를 경험하지만, 그 기준을 완전히 볼 수 없다.",
          keywords: ["Energy control", "Data monitoring", "Access regulation", "Risk detection"],
        },
        {
          id: "civicFactory",
          title: "Civic Factory",
          koTitle: "시민 공장",
          image: ASSETS.sectors.industrial.subtypeImages[2075].civicFactory,
          description:
            "A remaining public industrial space for repair, assistive-device production, equipment calibration, and technical education for local life.",
          koDescription:
            "수리, 보조기기 제작, 장비 보정, 지역 생활을 위한 기술 교육을 담당하는 남아 있는 공공 산업 공간이다.",
          access:
            "The threshold is lower than the Dark Factory, but work range depends on repair rights, education records, parts access, and labor registration.",
          koAccess:
            "Dark Factory보다 문턱은 낮지만, 가능한 작업 범위는 수리권, 교육 기록, 부품 접근권, 노동 등록 상태에 따라 달라진다.",
          keywords: ["Right to repair", "Technical access", "Assistive devices", "Public industry"],
        },
      ],
    },
    effects: [
      "Factory as shared urban asset",
      "Re-entry of human labor",
      "Expansion of industrial power",
      "Conflict over urban resources",
      "From commons to sovereignty",
    ],
  },
  residential: {
    order: "03",
    title: "Residential Adaptation",
    koTitle: "주거 적응",
    icon: Home,
    current: "Exposed Low-Rise Living Fabric",
    koCurrent: "노출된 저층 주거 조직",
    systems: {
      2050: "Porous Strip / Market-Dwelling Block",
      2075: "Inverted Ground City / Survival Ground City",
    },
    coreIdea:
      "Low-rise housing adapts to industrial edges, market-wrapped blocks, logistics flows, and everyday service demands.",
    koCoreIdea:
      "저층 주거가 산업 경계, 시장에 둘러싸인 블록, 물류 흐름, 일상 서비스 수요에 적응한다.",
    tension:
      "Can housing remain a private living space, or will it become an adaptive interface for industry, markets, logistics, and services?",
    koTension:
      "주거는 사적인 생활 공간으로 남을 수 있는가, 아니면 산업, 시장, 물류, 서비스의 적응형 인터페이스가 될 것인가?",
    subtypes: {
      2050: [
        {
          id: "porous",
          title: "Porous Strip",
          koTitle: "다공성 경계 스트립",
          image: ASSETS.sectors.residential.subtypeImages[2050].porous,
          description:
            "A porous boundary between factories and housing that works as an environmental filter, utility alley, and shared service yard instead of a wall.",
          koDescription:
            "공장과 주거 사이의 경계를 벽이 아니라 환경 필터, 유틸리티 골목, 공유 서비스 마당으로 바꾸는 다공성 경계 장치이다.",
          access:
            "Residents may use services and buffer spaces, but some routes are restricted during factory logistics hours.",
          koAccess:
            "주민은 생활 서비스와 완충 공간을 이용할 수 있지만, 공장 물류 시간에는 일부 경로가 제한될 수 있다.",
          keywords: ["Environmental filter", "Utility alley", "Service yard", "Factory edge"],
        },
        {
          id: "market",
          title: "Market-Dwelling Block",
          koTitle: "시장-주거 블록",
          image: ASSETS.sectors.residential.subtypeImages[2050].market,
          description:
            "A housing type where vacant shops, storage rooms, back alleys, and ground-floor spaces become living-service alleys for meals, laundry, repair, medicine pickup, storage, and care check-ins.",
          koDescription:
            "빈 상점, 창고, 뒷골목, 저층부가 식사, 세탁, 수리, 의약품 픽업, 저장, 돌봄 체크인을 처리하는 생활 서비스 골목으로 바뀌는 주거 유형이다.",
          access:
            "Residents, market vendors, delivery robots, care workers, and service operators share the alley by time slot.",
          koAccess:
            "주민, 시장 상인, 배송 로봇, 돌봄 노동자, 서비스 운영자가 시간 슬롯에 따라 골목을 공유한다.",
          keywords: ["Living Service Alley", "Shared refrigerator", "Meal pickup", "Care check-in"],
        },
      ],
      2075: [
        {
          id: "inverted",
          title: "Inverted Ground City",
          koTitle: "역전된 지상 도시",
          image: ASSETS.sectors.residential.subtypeImages[2075].inverted,
          description:
            "A residential structure where ground-level alleys are occupied by robot delivery, waste collection, battery exchange, and maintenance systems while everyday life moves upward.",
          koDescription:
            "지상 골목이 로봇 배송, 폐기물 수거, 배터리 교환, 유지관리 시스템에 점유되고 일상생활이 위로 이동하는 주거 구조이다.",
          access:
            "Residents use rooftop commons, bridge decks, elevated walkways, and care platforms. Ground crossing is allowed only at designated points and time windows.",
          koAccess:
            "주민은 옥상 커먼즈, 브리지 데크, 고가 보행로, 돌봄 플랫폼을 이용한다. 지상 횡단은 지정 지점과 시간대에서만 가능하다.",
          keywords: ["Machine alley", "Service ground", "Rooftop commons", "Upward life"],
        },
        {
          id: "survival",
          title: "Survival Ground City",
          koTitle: "생존 지상 도시",
          image: ASSETS.sectors.residential.subtypeImages[2075].survival,
          description:
            "A market-attached residential ground where cooling, meals, medicine storage, care check-ins, charging, and emergency power become essential survival infrastructure.",
          koDescription:
            "시장 인접 주거의 지상층이 냉방, 식사, 의약품 보관, 돌봄 체크인, 충전, 비상 전력을 담당하는 생존 인프라가 된다.",
          access:
            "Elderly residents, single-person households, market vendors, temporary users, and people requiring care are assigned different time slots and service points.",
          koAccess:
            "고령자, 1인 가구, 시장 상인, 임시 이용자, 돌봄 필요자는 서로 다른 시간 슬롯과 서비스 지점으로 배정된다.",
          keywords: ["Cooling", "Medicine storage", "Emergency power", "Care priority"],
          gallery: ["/assets/survival-ground-city2-2075.webp"],
        },
      ],
    },
    effects: [
      "Housing becomes an urban service interface",
      "Factory edges become porous boundaries",
      "Markets absorb domestic functions",
      "Alleys become service corridors",
      "Everyday life shifts upward",
    ],
  },
  energy: {
    order: "04",
    title: "Energy Urbanism",
    koTitle: "에너지 도시성",
    icon: BatteryCharging,
    current: "Residual Infrastructure as Energy Surface",
    koCurrent: "에너지 표면으로서의 잔여 인프라",
    systems: {
      2050: "Energy Retrofit Belt / Elevated Energy Deck",
      2075: "River Energy Belt / Energy Rights Market",
    },
    coreIdea:
      "Sasang’s river edge, elevated roads, factory roofs, warehouses, and leftover infrastructure become systems for producing, storing, and distributing urban energy.",
    koCoreIdea:
      "강변, 고가도로, 공장 지붕, 창고, 잔여 인프라가 에너지를 생산, 저장, 배분하는 도시 시스템이 된다.",
    tension:
      "Can energy infrastructure remain a shared support system, or will energy access become a new urban hierarchy?",
    koTension:
      "에너지 인프라는 공유 지원 시스템으로 남을 수 있는가, 아니면 새로운 도시 위계가 될 것인가?",
    yearlyNotes: {
      2050: {
        title: "Energy Retrofit Belt",
        description:
          "Elevated roads, spaces under roads, river edges, roofs, and residual sites become surfaces for energy production, storage, charging, and distribution.",
        koDescription:
          "고가도로, 도로 하부, 강변, 지붕, 잔여 부지가 에너지 생산, 저장, 충전, 배분의 표면이 된다.",
        access:
          "People use designated charging waiting areas, micromobility return zones, and pedestrian connections, but storage and conversion areas remain restricted.",
        koAccess:
          "사람들은 지정 충전 대기 구역, 마이크로 모빌리티 반납 구역, 보행 연결부를 이용하지만 저장 및 변환 구역은 제한된다.",
      },
      2075: {
        title: "Energy Rights Market",
        description:
          "Energy is no longer used only as supply. Charging rights, refrigeration rights, factory power slots, cooling rights, and emergency power access are traded or assigned by time slot.",
        koDescription:
          "에너지는 더 이상 단순 공급이 아니다. 충전권, 냉장권, 공장 전력 슬롯, 냉방권, 비상 전력 접근권이 시간 슬롯으로 거래되거나 배정된다.",
        access:
          "Users do not enter the River Energy Belt directly. They secure usage rights through energy accounts and market access.",
        koAccess:
          "이용자는 River Energy Belt에 직접 들어가지 않는다. 에너지 계정과 시장 접근을 통해 사용권을 확보한다.",
      },
    },
    effects: [
      "Energy becomes an operating condition",
      "Charging and cooling become prioritized",
      "Factories compete with civic survival",
      "Energy rights create new inequality",
    ],
  },
};

const purposes = [
  { id: "transfer", title: "Transfer / Move", ko: "환승 / 이동", icon: Route, sectors: ["transfer"] },
  { id: "produce", title: "Produce / Repair", ko: "생산 / 수리", icon: Factory, sectors: ["industrial"] },
  { id: "goods", title: "Send / Receive Goods", ko: "물품 발송 / 수령", icon: Boxes, sectors: ["industrial", "energy"] },
  { id: "living", title: "Use Living Services", ko: "생활 서비스 이용", icon: Home, sectors: ["residential"] },
  { id: "energy", title: "Charge / Cool / Store Energy", ko: "충전 / 냉방 / 에너지 저장", icon: BatteryCharging, sectors: ["energy"] },
  { id: "support", title: "Stay Temporarily / Get Support", ko: "임시 체류 / 지원 받기", icon: ShieldAlert, sectors: ["transfer", "residential"] },
];

const manual = {
  2050: {
    transfer: {
      primary: "Integrated Transfer Deck",
      required: ["Purpose selection", "Mobility route", "Luggage status", "Service need"],
      overview:
        "Sasang Station, West Busan Terminal, light rail, buses, taxis, shuttles, and micromobility connect through one integrated deck.",
      koOverview:
        "사상역, 서부산터미널, 경전철, 버스, 택시, 셔틀, 마이크로 모빌리티가 하나의 통합 데크로 연결된다.",
      first:
        "Enter the Integrated Transfer Deck first. At the central guidance zone, select why you are moving.",
      koFirst:
        "먼저 통합 환승 데크로 들어간다. 중앙 안내 구역에서 이동 목적을 선택한다.",
      access:
        "Routes change according to transfer type, stay duration, physical condition, language environment, luggage status, and service needs.",
      koAccess:
        "경로는 환승 유형, 체류 시간, 신체 조건, 언어 환경, 수하물 상태, 서비스 필요에 따라 달라진다.",
      notice:
        "Entering Sasang-gu means registering your purpose within the urban system, not simply arriving at a station.",
      koNotice:
        "사상구에 들어간다는 것은 단순히 역에 도착하는 것이 아니라 도시 시스템 안에 목적을 등록하는 것이다.",
    },
    produce: {
      primary: "Open Factory Commons",
      required: ["Training record", "Equipment certification", "Reserved slot", "Approved materials"],
      overview:
        "Factories operate through Industrial Learning Commons, Shared Production Commons, and Urban Logistics Commons.",
      koOverview:
        "공장은 Industrial Learning Commons, Shared Production Commons, Urban Logistics Commons라는 세 종류의 커먼즈로 운영된다.",
      first:
        "If this is your first use, register at the Industrial Learning Commons before entering workshops or operating machines.",
      koFirst:
        "처음 이용한다면 작업장이나 기계에 바로 들어가지 말고 Industrial Learning Commons에서 먼저 등록한다.",
      access:
        "Production access requires training level, certification, a reserved time slot, and approved materials.",
      koAccess:
        "생산 구역 접근에는 교육 수준, 자격 인증, 예약된 시간 슬롯, 승인된 재료가 필요하다.",
      notice:
        "The factory becomes closer to the public, but it also separates users through training, certification, reservations, and robot-only zones.",
      koNotice:
        "공장은 공공에 가까워지지만, 교육, 인증, 예약, 로봇 전용 구역을 통해 이용자를 다시 구분한다.",
    },
    goods: {
      primary: "Urban Logistics Commons",
      required: ["Logistics Flow Ticket", "Reception port", "Pickup port", "Robot sorting route"],
      overview:
        "Factory edges and vacant warehouses become logistics devices connecting markets, housing, transfer hubs, and repair workshops.",
      koOverview:
        "공장 가장자리와 빈 창고는 시장, 주거, 환승 허브, 수리 작업장을 연결하는 물류 장치가 된다.",
      first:
        "Do not enter the logistics interior. Issue a Logistics Flow Ticket at the external reception port.",
      koFirst:
        "물류 내부로 들어가지 않는다. 외부 접수 포트에서 Logistics Flow Ticket을 발급한다.",
      access:
        "Ordinary users access only reception ports, pickup ports, and exceptional maintenance zones.",
      koAccess:
        "일반 이용자는 접수 포트, 픽업 포트, 예외적 유지관리 구역만 이용할 수 있다.",
      notice:
        "The logistics commons is not an open factory for people; it is a robotic operating zone for internal urban logistics.",
      koNotice:
        "물류 커먼즈는 사람을 위한 열린 공장이 아니라 도시 내부 물류를 처리하는 로봇 운영 구역이다.",
    },
    living: {
      primary: "Porous Strip / Living Service Alley",
      required: ["Resident or visitor status", "Time slot", "Service point", "Shared facility access"],
      overview:
        "Low-rise housing adapts through the Porous Strip beside factories and Market-Dwelling Blocks around markets.",
      koOverview:
        "저층 주거는 공장 옆의 Porous Strip과 시장 주변의 Market-Dwelling Block을 통해 적응한다.",
      first:
        "Check whether you are in factory-adjacent housing or market-wrapped housing, then enter the correct service layer.",
      koFirst:
        "공장 인접 주거인지 시장에 둘러싸인 주거인지 확인한 뒤 알맞은 서비스 레이어로 들어간다.",
      access:
        "Alleys, service yards, shared refrigerators, laundry pickup, repair counters, parcel lockers, and care check-ins are shared by time slot.",
      koAccess:
        "골목, 서비스 마당, 공유 냉장고, 세탁 픽업, 수리 카운터, 택배 보관함, 돌봄 체크인은 시간 슬롯으로 공유된다.",
      notice:
        "Housing becomes more convenient, but it also becomes a living interface that absorbs more urban functions.",
      koNotice:
        "주거는 더 편리해지지만 더 많은 도시 기능을 흡수하는 생활 인터페이스가 된다.",
    },
    energy: {
      primary: "Energy Retrofit Belt",
      required: ["Charging type", "Facility purpose", "Energy availability", "Safety zone"],
      overview:
        "Elevated roads, under-road spaces, river edges, roofs, and residual sites become surfaces for production, storage, charging, and distribution.",
      koOverview:
        "고가도로, 도로 하부, 강변, 지붕, 잔여 부지가 에너지 생산, 저장, 충전, 배분의 표면이 된다.",
      first:
        "Check the nearest Elevated Energy Deck access point before charging or battery exchange.",
      koFirst:
        "충전이나 배터리 교환이 필요하면 가장 가까운 Elevated Energy Deck 접근 지점을 확인한다.",
      access:
        "Pedestrians may use only designated waiting areas, return zones, and connections. Storage and conversion devices are restricted.",
      koAccess:
        "보행자는 지정된 대기 구역, 반납 구역, 연결부만 이용할 수 있다. 저장 및 변환 장치는 제한 구역이다.",
      notice:
        "Energy is no longer simply a supply; it becomes an operating condition that maintains mobility, production, housing, and care.",
      koNotice:
        "에너지는 단순한 공급이 아니라 이동, 생산, 주거, 돌봄을 유지하는 운영 조건이 된다.",
    },
    support: {
      primary: "Civic Concourse / Living Service Alley",
      required: ["Temporary stay status", "Language support", "Care route", "Meal or rest access"],
      overview:
        "Public services are inserted into transfer and residential systems so users can receive language, welfare, health, labor, and care support.",
      koOverview:
        "언어, 복지, 건강, 노동, 돌봄 지원이 환승 및 주거 시스템 안에 삽입된다.",
      first:
        "If your stay becomes longer, convert from simple transfer status to temporary stay status.",
      koFirst:
        "체류 시간이 길어지면 단순 환승 상태에서 임시 체류 상태로 전환한다.",
      access:
        "Temporary status allows access to rest areas, charging spaces, luggage storage, meal support, and care mobility routes.",
      koAccess:
        "임시 체류 상태는 휴식 공간, 충전 공간, 수하물 보관, 식사 지원, 돌봄 이동 경로 접근을 허용한다.",
      notice:
        "The city supports more users, but support begins by identifying and sorting user needs.",
      koNotice:
        "도시는 더 많은 이용자를 지원하지만, 그 지원은 이용자의 필요를 식별하고 분류하는 것에서 시작된다.",
    },
  },
  2075: {
    transfer: {
      primary: "Access-Class City",
      required: ["Urban Service Pass", "Priority gate status", "Charging right", "Storage right"],
      overview:
        "The transfer hub classifies users by access level. Movement, waiting, sleeping, charging, storage, and shuttle priority are assigned separately.",
      koOverview:
        "환승 허브는 이용자를 접근 등급에 따라 분류한다. 이동, 대기, 수면, 충전, 보관, 셔틀 우선권이 따로 배정된다.",
      first:
        "Check your Urban Service Pass. A normal transport ticket is not enough to use all services.",
      koFirst:
        "Urban Service Pass를 확인한다. 일반 교통 티켓만으로는 모든 서비스를 이용할 수 없다.",
      access:
        "Entrances and routes differ according to mobility passes, worker passes, elderly-care passes, medical access, logistics priority, and premium rights.",
      koAccess:
        "입구와 경로는 이동권, 노동자 패스, 노인 돌봄 패스, 의료 접근권, 물류 우선권, 프리미엄 권리에 따라 달라진다.",
      notice:
        "Entering Sasang-gu no longer means simply entering the city. It means checking what level of access you have.",
      koNotice:
        "사상구에 들어간다는 것은 더 이상 단순한 진입이 아니다. 내가 어떤 접근 등급을 갖고 있는지 확인하는 것이다.",
    },
    produce: {
      primary: "Industrial Sovereignty Zone",
      required: ["Production slot", "Energy priority", "Order authentication", "Repair right"],
      overview:
        "Production shifts toward Dark Factories, while Civic Factories remain as public zones for repair, assistive devices, and technical education.",
      koOverview:
        "생산은 Dark Factory로 이동하고, Civic Factory는 수리, 보조기기 제작, 기술 교육을 위한 공공 구역으로 남는다.",
      first:
        "Check whether your request belongs to automated production or civic repair before entering the factory system.",
      koFirst:
        "공장 시스템에 들어가기 전에 요청이 자동화 생산인지 시민 수리인지 확인한다.",
      access:
        "The Dark Factory interior is inaccessible to ordinary users. Civic Factory access depends on repair rights, education records, parts access, and labor registration.",
      koAccess:
        "Dark Factory 내부는 일반 이용자가 접근할 수 없다. Civic Factory 접근은 수리권, 교육 기록, 부품 접근권, 노동 등록 상태에 따라 달라진다.",
      notice:
        "The factory becomes operational infrastructure that determines when and how the city functions.",
      koNotice:
        "공장은 도시가 언제 어떻게 작동하는지를 결정하는 운영 인프라가 된다.",
    },
    goods: {
      primary: "Dark Factory / Urban Control Hub",
      required: ["Order authentication", "Logistics priority", "Energy account", "Export port"],
      overview:
        "Goods are processed through automated production, unmanned storage, robotic sorting, and access-regulated export ports.",
      koOverview:
        "물품은 자동화 생산, 무인 저장, 로봇 분류, 접근 규제된 반출 포트를 통해 처리된다.",
      first:
        "Submit the order and wait for the system to convert it into production, packaging, and delivery slots.",
      koFirst:
        "주문을 제출하고 시스템이 이를 생산, 포장, 배송 슬롯으로 전환할 때까지 기다린다.",
      access:
        "Users experience the result of logistics decisions, but cannot fully see the criteria by which priorities are assigned.",
      koAccess:
        "이용자는 물류 결정의 결과를 경험하지만, 우선순위가 배정되는 기준을 완전히 볼 수 없다.",
      notice:
        "Logistics becomes more efficient, but also more invisible and less negotiable for ordinary users.",
      koNotice:
        "물류는 더 효율적이 되지만, 일반 이용자에게는 더 보이지 않고 협상하기 어려운 시스템이 된다.",
    },
    living: {
      primary: "Inverted / Survival Ground City",
      required: ["Resident registration", "Rooftop route", "Service time", "Care priority"],
      overview:
        "Ground-level alleys become machine and survival service layers, while everyday life shifts upward to rooftops, decks, bridges, and care platforms.",
      koOverview:
        "지상 골목은 기계 및 생존 서비스 레이어가 되고, 일상생활은 옥상, 데크, 브리지, 돌봄 플랫폼으로 올라간다.",
      first:
        "Do not use the ground-level alley as a normal pedestrian route. Check whether you should use rooftop commons or survival ground services.",
      koFirst:
        "지상 골목을 일반 보행로로 사용하지 않는다. 옥상 커먼즈를 이용해야 하는지, 생존 지상 서비스를 이용해야 하는지 확인한다.",
      access:
        "Machine alleys, rooftop commons, cooling points, meal pickup, medicine storage, charging, and emergency power are assigned by registration and priority.",
      koAccess:
        "기계 골목, 옥상 커먼즈, 냉방 지점, 식사 픽업, 의약품 보관, 충전, 비상 전력은 등록 상태와 우선순위에 따라 배정된다.",
      notice:
        "The home may appear safer, but that safety is maintained through deeper dependence on service systems.",
      koNotice:
        "집은 더 안전해 보일 수 있지만, 그 안전은 서비스 시스템에 대한 더 깊은 의존으로 유지된다.",
    },
    energy: {
      primary: "Energy Rights Market",
      required: ["Energy account", "Charging right", "Cooling right", "Emergency power access"],
      overview:
        "What is traded is not electricity itself, but the right to use electricity: charging rights, refrigeration rights, factory power slots, cooling rights, and emergency power access.",
      koOverview:
        "거래되는 것은 전기 자체가 아니라 충전권, 냉장권, 공장 전력 슬롯, 냉방권, 비상 전력 접근권 같은 전기 사용권이다.",
      first:
        "Check your energy account and available rights before requesting charging, cooling, refrigeration, production power, or emergency power.",
      koFirst:
        "충전, 냉방, 냉장, 생산 전력, 비상 전력을 요청하기 전에 에너지 계정과 사용 가능한 권리를 확인한다.",
      access:
        "Users cannot access the physical River Energy Belt directly. They secure necessary usage rights through the Energy Rights Market.",
      koAccess:
        "이용자는 물리적인 River Energy Belt에 직접 접근할 수 없다. 필요한 사용권은 Energy Rights Market을 통해 확보한다.",
      notice:
        "The energy problem is about who can use power first, which functions operate first, and whether production or survival receives priority.",
      koNotice:
        "에너지 문제는 누가 먼저 전기를 쓰는지, 어떤 기능이 먼저 작동하는지, 생산과 생존 중 무엇이 우선되는지의 문제다.",
    },
    support: {
      primary: "Service Access Market / Survival Ground",
      required: ["Urban Service Pass", "Medical booking", "Meal time slot", "Cooling access"],
      overview:
        "Staying, recovering, cooling, eating, charging, and receiving care are no longer background services; they are allocated by time slot and authorization.",
      koOverview:
        "체류, 회복, 냉방, 식사, 충전, 돌봄은 더 이상 배경 서비스가 아니라 시간 슬롯과 허가로 배정되는 기능이다.",
      first:
        "Check which temporary-service rights you have before entering waiting, sleeping, cooling, or care areas.",
      koFirst:
        "대기, 수면, 냉방, 돌봄 구역에 들어가기 전에 어떤 임시 서비스 권리를 갖고 있는지 확인한다.",
      access:
        "Elderly residents, single-person households, market vendors, temporary users, and people requiring care are guided to different service points and times.",
      koAccess:
        "고령자, 1인 가구, 시장 상인, 임시 이용자, 돌봄 필요자는 서로 다른 서비스 지점과 시간대로 안내된다.",
      notice:
        "The city still functions, but not every user can access that function in the same way.",
      koNotice:
        "도시는 여전히 작동하지만, 모든 이용자가 그 기능에 같은 방식으로 접근할 수 있는 것은 아니다.",
    },
  },
};

const INTRO_BOOT_MESSAGES = [
  "INITIALIZING SASANG OS...",
  "CHECKING SPATIAL ACCESS...",
  "LOADING URBAN PROTOCOLS...",
  "PREPARING OPERATING MANUAL...",
];

const INTRO_COPY = {
  en: {
    languageTitle: "Select Language",
    languageSub: "Choose the language for the Sasang Operating Manual.",
    introKicker: "USER MANUAL",
    introTitle: "Sasang Operating Manual",
    introBody: [
      "Sasang Operating Manual is a future urban manual web application for users who plan to visit, live in, pass through, or work in Sasang-gu, Busan.",
      "This application guides users through Sasang in 2050 and 2075, focusing on mobility, industry, residential adaptation, and energy systems.",
      "Users can access each urban system and explore how Sasang is assembled, managed, and stratified over time.",
    ],
    continue: "Continue",
    yearKicker: "ACCESS POINT",
    yearTitle: "Which version of Sasang would you like to access?",
    yearSub: "Select a future system to enter the corresponding urban manual.",
    year2050: "2050 Urban Assembly",
    year2050Desc:
      "A city where mobility, industry, housing, and energy systems are newly assembled.",
    year2075: "2075 Urban Rights System",
    year2075Desc:
      "A city where access rights, energy rights, and industrial control shape urban experience.",
    entering2050: "ENTERING 2050 URBAN ASSEMBLY...",
    entering2075: "VERIFYING ACCESS RIGHTS...",
  },
  ko: {
    languageTitle: "언어를 선택하세요",
    languageSub: "Sasang Operating Manual의 사용 언어를 선택하세요.",
    introKicker: "사용자 안내",
    introTitle: "Sasang Operating Manual",
    introBody: [
      "Sasang Operating Manual은 부산 사상구를 방문하거나, 거주하거나, 통과하거나, 일할 계획이 있는 사용자를 위한 미래 도시 매뉴얼 웹앱입니다.",
      "이 앱은 2050년과 2075년의 사상구를 이동, 산업, 주거, 에너지 시스템을 중심으로 안내합니다.",
      "사용자는 각 시점의 도시 시스템에 접속하여 사상구가 어떻게 조립되고, 관리되고, 계층화되는지를 탐색할 수 있습니다.",
    ],
    continue: "계속하기",
    yearKicker: "접속 지점",
    yearTitle: "어느 시점의 사상구 시스템에 접속하시겠습니까?",
    yearSub: "접속할 미래 도시 시스템을 선택하세요.",
    year2050: "2050 Urban Assembly",
    year2050Desc: "이동, 산업, 주거, 에너지 시스템이 새롭게 조립되는 도시.",
    year2075: "2075 Urban Rights System",
    year2075Desc: "접근권, 에너지 권리, 산업 통제가 도시 경험을 결정하는 도시.",
    entering2050: "2050 URBAN ASSEMBLY에 접속 중...",
    entering2075: "접근 권한 확인 중...",
  },
};

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Badge({ children, dark }) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.18em]",
        dark
          ? "border-white/15 bg-white/5 text-white/60"
          : "border-black/10 bg-white/70 text-black/55"
      )}
    >
      {children}
    </span>
  );
}

function SystemToast({ notice, dark }) {
  if (!notice) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={notice.id}
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className={cx(
          "fixed bottom-5 right-5 z-[180] w-[min(92vw,360px)] rounded-[1.4rem] border p-4 shadow-2xl backdrop-blur-xl",
          dark ? "border-white/10 bg-black/80 text-white" : "border-black/10 bg-white/90 text-black"
        )}
      >
        <div className="flex items-center gap-3">
          <span
            className={cx(
              "h-2 w-2 rounded-full",
              dark ? "bg-white shadow-[0_0_18px_rgba(255,255,255,0.8)]" : "bg-black"
            )}
          />
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] opacity-55">
            System Notice
          </p>
        </div>
        <p className="mt-3 font-mono text-sm uppercase tracking-[0.12em]">{notice.title}</p>
        <p className={cx("mt-1 text-xs", dark ? "text-white/45" : "text-black/45")}>
          {notice.body}
        </p>
      </motion.div>
    </AnimatePresence>
  );
}

function ScanOverlay({ scan }) {
  if (!scan) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={scan.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
        className="pointer-events-none fixed inset-0 z-[170] flex items-center justify-center bg-black/30 px-6 backdrop-blur-[2px]"
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="w-[min(88vw,480px)] rounded-[1.6rem] border border-white/10 bg-black/80 p-5 text-white shadow-2xl"
        >
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 animate-pulse rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.9)]" />
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-white/55">
              {scan.title}
            </p>
          </div>
          <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/10">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="h-full w-1/2 rounded-full bg-white"
            />
          </div>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-white/45">
            {scan.body}
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function AccessGrantedSequence({ year, purpose, dark }) {
  const lines = [
    "ACCESS GRANTED",
    `YEAR SYSTEM LOCKED: ${year}`,
    `PURPOSE ROUTE GENERATED: ${purpose.title}`,
    "SERVICE RIGHTS CHECKED",
  ];

  return (
    <div
      className={cx(
        "mt-5 rounded-[1.35rem] border p-4 font-mono",
        dark ? "border-white/10 bg-white/[0.035]" : "border-black/10 bg-black/[0.025]"
      )}
    >
      <div className="mb-3 flex items-center gap-2">
        <span
          className={cx(
            "h-2 w-2 rounded-full",
            dark ? "bg-white shadow-[0_0_14px_rgba(255,255,255,0.8)]" : "bg-black"
          )}
        />
        <p className={cx("text-[10px] uppercase tracking-[0.22em]", dark ? "text-white/45" : "text-black/45")}>
          Access Protocol
        </p>
      </div>
      <div className="space-y-2">
        {lines.map((line, index) => (
          <motion.div
            key={`${year}-${purpose.id}-${line}`}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.16, duration: 0.28 }}
            className="flex items-center justify-between gap-4 text-[11px] uppercase tracking-[0.16em]"
          >
            <span className={dark ? "text-white/70" : "text-black/70"}>{line}</span>
            <span className={dark ? "text-white/30" : "text-black/30"}>OK</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function MapHotspotButton({ spot, index, onSelect }) {
  return (
    <button
      key={`${spot.sector}-${index}`}
      onClick={() => onSelect(spot.sector)}
      className="group absolute z-10 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black text-xs font-bold text-white shadow-lg transition hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/90"
      style={{ left: spot.left, top: spot.top }}
      aria-label={`${spot.label} / ${spot.name}`}
    >
      <span className="absolute inset-0 rounded-full border border-black/45 opacity-70 group-hover:animate-ping" />
      <span className="relative z-10">{spot.label}</span>
      <span className="pointer-events-none absolute left-1/2 top-[-2.4rem] z-20 hidden -translate-x-1/2 whitespace-nowrap rounded-full border border-white/20 bg-black/85 px-3 py-1 font-mono text-[10px] font-medium tracking-[0.12em] text-white shadow-xl group-hover:block">
        ACCESS POINT {spot.label} / {spot.name}
      </span>
    </button>
  );
}

function Dual({ en, ko, showKorean, dark, className = "" }) {
  return (
    <div className={className}>
      <p className={cx("leading-relaxed", dark ? "text-white/82" : "text-black/80")}>{en}</p>
      {showKorean && (
        <p className={cx("mt-2 text-sm leading-relaxed", dark ? "text-white/42" : "text-black/45")}>
          {ko}
        </p>
      )}
    </div>
  );
}

function ImageFrame({ src, title, caption, dark, aspect = "aspect-[16/10]", fit = "cover" }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={cx("overflow-hidden rounded-[1.8rem] border", dark ? "border-white/10 bg-white/[0.03]" : "border-black/10 bg-white")}>
      <div className={cx("relative", aspect)}>
        {!failed ? (
          <img
            src={src}
            alt={title}
            onError={() => setFailed(true)}
            className={cx("h-full w-full", fit === "contain" ? "object-contain p-4" : "object-cover")}
          />
        ) : (
          <div className={cx("flex h-full w-full items-center justify-center p-6 text-center", dark ? "bg-white/[0.03] text-white/35" : "bg-black/[0.03] text-black/35")}>
            <div>
              <Info className="mx-auto mb-3" size={24} />
              <p className="text-sm">Image placeholder</p>
              <p className="mt-1 text-xs">{src.replace("/assets/", "")}</p>
            </div>
          </div>
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent p-5">
          <p className="text-sm font-semibold text-white">{title}</p>
          {caption && <p className="mt-1 text-xs text-white/70">{caption}</p>}
        </div>
      </div>
    </div>
  );
}

function ImageCarousel({ images, title, caption, dark, aspect = "aspect-[16/9]" }) {
  const safeImages = images.filter(Boolean);
  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState(false);
  const current = safeImages[index] ?? safeImages[0];

  useEffect(() => {
    setIndex(0);
    setFailed(false);
  }, [safeImages.join("|")]);

  if (safeImages.length <= 1) {
    return <ImageFrame dark={dark} src={safeImages[0]} title={title} caption={caption} aspect={aspect} />;
  }

  const go = (direction) => {
    setFailed(false);
    setIndex((prev) => (prev + direction + safeImages.length) % safeImages.length);
  };

  return (
    <div className={cx("overflow-hidden rounded-[1.8rem] border", dark ? "border-white/10 bg-white/[0.03]" : "border-black/10 bg-white")}>
      <div className={cx("relative", aspect)}>
        {!failed ? (
          <img
            src={current}
            alt={`${title} ${index + 1}`}
            onError={() => setFailed(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className={cx("flex h-full w-full items-center justify-center p-6 text-center", dark ? "bg-white/[0.03] text-white/35" : "bg-black/[0.03] text-black/35")}>
            <div>
              <Info className="mx-auto mb-3" size={24} />
              <p className="text-sm">Image placeholder</p>
              <p className="mt-1 text-xs">{current?.replace("/assets/", "")}</p>
            </div>
          </div>
        )}

        <button
          onClick={() => go(-1)}
          className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/45 text-2xl text-white backdrop-blur transition hover:bg-black/70"
          aria-label="Previous image"
        >
          ‹
        </button>
        <button
          onClick={() => go(1)}
          className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/45 text-2xl text-white backdrop-blur transition hover:bg-black/70"
          aria-label="Next image"
        >
          ›
        </button>

        <div className="absolute left-1/2 top-4 flex -translate-x-1/2 gap-2 rounded-full border border-white/10 bg-black/35 px-3 py-2 backdrop-blur">
          {safeImages.map((_, dotIndex) => (
            <button
              key={dotIndex}
              onClick={() => {
                setFailed(false);
                setIndex(dotIndex);
              }}
              className={cx("h-2 rounded-full transition", dotIndex === index ? "w-6 bg-white" : "w-2 bg-white/40")}
              aria-label={`Go to image ${dotIndex + 1}`}
            />
          ))}
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-white">{title}</p>
              {caption && <p className="mt-1 text-xs text-white/70">{caption}</p>}
            </div>
            <p className="rounded-full bg-white/15 px-3 py-1 text-xs text-white backdrop-blur">
              {index + 1} / {safeImages.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TopNav({
  view,
  setView,
  year,
  setYear,
  showKorean,
  setShowKorean,
  setMenuOpen,
  dark,
  soundOn,
  toggleSound,
}) {
  const nav = [
    ["home", "Manual"],
    ["sectors", "Sectors"],
    ["method", "Method"],
  ];

  return (
    <header className={cx("sticky top-0 z-50 border-b backdrop-blur-xl", dark ? "border-white/10 bg-[#08090b]/85" : "border-black/10 bg-[#f4f2ea]/85")}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <button onClick={() => setView("home")} className="flex items-center gap-3">
          <div className={cx("flex h-10 w-10 items-center justify-center rounded-2xl border", dark ? "border-white/15 bg-white/5 text-white" : "border-black/10 bg-white text-black")}>
            <Sparkles size={18} />
          </div>
          <div className="text-left">
            <p className={cx("text-sm font-semibold tracking-[0.22em]", dark ? "text-white" : "text-black")}>
              SASANG OPERATING MANUAL
            </p>
            <p className={cx("text-xs", dark ? "text-white/40" : "text-black/45")}>
              2050 / 2075 Future Access Interface
            </p>
          </div>
        </button>

        <nav className="hidden items-center gap-2 lg:flex">
          {nav.map(([id, label]) => (
            <button
              key={id}
              onClick={() => setView(id)}
              className={cx(
                "rounded-full px-4 py-2 text-sm transition",
                view === id
                  ? dark
                    ? "bg-white text-black"
                    : "bg-black text-white"
                  : dark
                  ? "text-white/55 hover:bg-white/5 hover:text-white"
                  : "text-black/55 hover:bg-black/5 hover:text-black"
              )}
            >
              {label}
            </button>
          ))}

          <div className={cx("ml-2 flex rounded-full border p-1", dark ? "border-white/10 bg-white/5" : "border-black/10 bg-white")}>
            {[2050, 2075].map((item) => (
              <button
                key={item}
                onClick={() => setYear(item)}
                className={cx(
                  "rounded-full px-4 py-2 text-sm transition",
                  year === item
                    ? item === 2075
                      ? "bg-black text-white"
                      : "bg-white text-black shadow-sm"
                    : dark
                    ? "text-white/45"
                    : "text-black/45"
                )}
              >
                {item}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowKorean(!showKorean)}
            className={cx("rounded-full border px-4 py-2 text-sm", dark ? "border-white/10 text-white/60" : "border-black/10 bg-white text-black/60")}
          >
            {showKorean ? "Hide KR" : "Show KR"}
          </button>

          <button
            onClick={toggleSound}
            className={cx("inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm", dark ? "border-white/10 text-white/60" : "border-black/10 bg-white text-black/60")}
          >
            {soundOn ? <Volume2 size={15} /> : <VolumeX size={15} />}
            {soundOn ? "City Sound On" : "City Sound Off"}
          </button>
        </nav>

        <button
          onClick={() => setMenuOpen(true)}
          className={cx("rounded-xl border p-2 lg:hidden", dark ? "border-white/10 bg-white/5" : "border-black/10 bg-white")}
        >
          <Menu size={20} />
        </button>
      </div>
    </header>
  );
}

function MobileMenu({ open, setOpen, setView, year, setYear, showKorean, setShowKorean, soundOn, toggleSound }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/70 p-4 backdrop-blur lg:hidden">
      <div className="rounded-[2rem] bg-white p-5 text-black shadow-2xl">
        <div className="flex items-center justify-between">
          <p className="font-semibold">Navigation</p>
          <button onClick={() => setOpen(false)}>
            <X size={20} />
          </button>
        </div>
        <div className="mt-5 grid gap-2">
          {[
            ["home", "Enter Manual"],
            ["sectors", "Scenario Sectors"],
            ["method", "Method"],
          ].map(([id, label]) => (
            <button
              key={id}
              onClick={() => {
                setView(id);
                setOpen(false);
              }}
              className="rounded-2xl bg-black/5 px-4 py-3 text-left text-sm"
            >
              {label}
            </button>
          ))}

          <div className="grid grid-cols-2 gap-2">
            {[2050, 2075].map((item) => (
              <button
                key={item}
                onClick={() => setYear(item)}
                className={cx("rounded-2xl px-4 py-3 text-sm", year === item ? "bg-black text-white" : "bg-black/5")}
              >
                {item}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowKorean(!showKorean)}
            className="rounded-2xl bg-black px-4 py-3 text-sm text-white"
          >
            {showKorean ? "Hide Korean notes" : "Show Korean notes"}
          </button>

          <button
            onClick={toggleSound}
            className="flex items-center justify-center gap-2 rounded-2xl bg-black px-4 py-3 text-sm text-white"
          >
            {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
            {soundOn ? "City Sound On" : "City Sound Off"}
          </button>
        </div>
      </div>
    </div>
  );
}

function InteractiveCollisionMap({ dark, onSelect }) {
  const hotspots = [
    { sector: "transfer", label: "1", name: "Transfer City", left: "65%", top: "58%" },
    { sector: "residential", label: "2", name: "Residential Adaptation", left: "53%", top: "21%" },
    { sector: "residential", label: "2", name: "Residential Adaptation", left: "66%", top: "84%" },
    { sector: "industrial", label: "3", name: "Industrial Urbanism", left: "58%", top: "9%" },
    { sector: "industrial", label: "3", name: "Industrial Urbanism", left: "48%", top: "76%" },
    { sector: "industrial", label: "3", name: "Industrial Urbanism", left: "67%", top: "96%" },
    { sector: "energy", label: "4", name: "Energy Urbanism", left: "20%", top: "45%" },
  ];

  return (
    <div className="mt-7">
      <div className={cx("overflow-hidden rounded-[1.8rem] border", dark ? "border-white/10 bg-white/[0.03]" : "border-black/10 bg-white")}>
        <div className="relative">
          <img src={ASSETS.collisionMap} alt="Spatial collision map" className="block w-full" />
          {hotspots.map((spot, index) => (
            <MapHotspotButton key={`${spot.sector}-${index}`} spot={spot} index={index} onSelect={onSelect} />
          ))}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5">
            <p className="text-sm font-semibold text-white">Spatial Collision Map</p>
            <p className="mt-1 text-xs text-white/70">Tap the black numbered points to open each scenario sector.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function HomeView({
  year,
  setYear,
  selectedPurpose,
  setSelectedPurpose,
  setView,
  showKorean,
  dark,
  setVideoOverlay,
  setActiveSector,
}) {
  const data = manual[year][selectedPurpose];
  const purpose = purposes.find((p) => p.id === selectedPurpose);
  const primarySector = purpose.sectors[0];

  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-5 py-8 lg:grid-cols-[0.95fr_1.05fr]">
      <section className={cx("rounded-[2.2rem] border p-6 md:p-8", dark ? "border-white/10 bg-white/[0.03]" : "border-black/10 bg-white/75")}>
        <Badge dark={dark}>Enter Manual</Badge>
        <h1 className={cx("mt-6 max-w-2xl text-5xl font-semibold leading-[0.92] tracking-[-0.06em] md:text-7xl", dark ? "text-white" : "text-black")}>
          Sasang Operating Manual
        </h1>
        <Dual
          className="mt-6 max-w-xl"
          dark={dark}
          showKorean={showKorean}
          en="This is not a city you simply enter. Select your year, purpose, and access condition."
          ko="이 도시는 단순히 들어가는 도시가 아니다. 연도, 목적, 접근 조건을 선택해야 한다."
        />

        <InteractiveCollisionMap
          dark={dark}
          onSelect={(sectorId) => {
            setActiveSector(sectorId);
            setView("sectors");
          }}
        />

        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {[2050, 2075].map((item) => (
            <button
              key={item}
              onClick={() => setYear(item)}
              className={cx(
                "rounded-[1.5rem] border p-5 text-left transition",
                year === item
                  ? item === 2075
                    ? "border-black bg-black text-white"
                    : "border-black bg-white text-black shadow-lg"
                  : dark
                  ? "border-white/10 bg-white/[0.03] text-white/50 hover:text-white"
                  : "border-black/10 bg-black/[0.03] text-black/55 hover:text-black"
              )}
            >
              <p className="text-3xl font-semibold">{item}</p>
              <p className="mt-2 text-sm opacity-60">{yearModes[item].label}</p>
            </button>
          ))}
        </div>

        <div className="mt-8">
          <div className="mb-3 flex items-center gap-2">
            <Search size={17} />
            <p className={cx("text-sm font-semibold", dark ? "text-white/80" : "text-black/80")}>
              Why are you entering Sasang-gu?
            </p>
          </div>
          <div className="grid gap-2 md:grid-cols-2">
            {purposes.map((item) => {
              const PIcon = item.icon;
              const selected = item.id === selectedPurpose;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setSelectedPurpose(item.id);
                    setVideoOverlay(PURPOSE_VIDEOS[item.id]);
                  }}
                  className={cx(
                    "rounded-[1.25rem] border p-4 text-left transition",
                    selected
                      ? dark
                        ? "border-white/30 bg-white text-black"
                        : "border-black bg-black text-white"
                      : dark
                      ? "border-white/10 bg-white/[0.03] text-white/55 hover:bg-white/[0.06] hover:text-white"
                      : "border-black/10 bg-white text-black/60 hover:border-black/25 hover:text-black"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <PIcon size={18} />
                    <div>
                      <p className="text-sm font-medium">{item.title}</p>
                      {showKorean && <p className="mt-1 text-xs opacity-50">{item.ko}</p>}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <AccessCard year={year} purpose={purpose} data={data} dark={dark} showKorean={showKorean} />
        <ImageFrame
          dark={dark}
          src={ASSETS.sectors[primarySector].hero[year]}
          title={`${year} / ${sectors[primarySector].title}`}
          caption={sectors[primarySector].systems[year]}
        />
        <div className="grid gap-3 md:grid-cols-2">
          <button
            onClick={() => setView("sectors")}
            className={cx("rounded-[1.5rem] border p-5 text-left transition", dark ? "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]" : "border-black/10 bg-white hover:border-black/25")}
          >
            <Layers3 size={20} />
            <p className="mt-3 font-semibold">Explore Scenario Sectors</p>
            <p className={cx("mt-1 text-sm", dark ? "text-white/45" : "text-black/45")}>
              Transfer, Industry, Residential, Energy
            </p>
          </button>
          <button
            onClick={() => setView("method")}
            className={cx("rounded-[1.5rem] border p-5 text-left transition", dark ? "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]" : "border-black/10 bg-white hover:border-black/25")}
          >
            <MapPinned size={20} />
            <p className="mt-3 font-semibold">View Scenario Method</p>
            <p className={cx("mt-1 text-sm", dark ? "text-white/45" : "text-black/45")}>
              Drivers → sectors → manual
            </p>
          </button>
        </div>
      </section>
    </div>
  );
}

function AccessCard({ year, purpose, data, dark, showKorean }) {
  return (
    <div className={cx("overflow-hidden rounded-[2.2rem] border", dark ? "border-white/10 bg-[#0d0f12]" : "border-black/10 bg-white")}>
      <div className={cx("border-b p-6", dark ? "border-white/10" : "border-black/10")}>
        <div className="flex flex-wrap items-center gap-2">
          <Badge dark={dark}>Your access has been assigned</Badge>
          <Badge dark={dark}>{year}</Badge>
        </div>
        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <p className={cx("text-sm", dark ? "text-white/45" : "text-black/45")}>Purpose</p>
            <h2 className="mt-1 text-3xl font-semibold tracking-[-0.04em]">{purpose.title}</h2>
            {showKorean && <p className={cx("mt-1 text-sm", dark ? "text-white/40" : "text-black/45")}>{purpose.ko}</p>}
          </div>
          <div className={cx("rounded-2xl border p-3", dark ? "border-white/10 bg-white/5" : "border-black/10 bg-black/[0.03]")}>
            <LockKeyhole size={22} />
          </div>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <InfoBlock label="Primary System" value={data.primary} dark={dark} />
          <InfoBlock label="Year Mode" value={yearModes[year].label} dark={dark} />
        </div>
        <AccessGrantedSequence key={`${year}-${purpose.id}`} year={year} purpose={purpose} dark={dark} />
      </div>

      <div className="p-6">
        <p className={cx("text-xs font-semibold uppercase tracking-[0.2em]", dark ? "text-white/40" : "text-black/40")}>
          Required Access
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {data.required.map((item) => (
            <span
              key={item}
              className={cx("rounded-full border px-3 py-1 text-sm", dark ? "border-white/10 bg-white/5 text-white/70" : "border-black/10 bg-black/[0.03] text-black/65")}
            >
              {item}
            </span>
          ))}
        </div>
        <ManualAccordion data={data} dark={dark} showKorean={showKorean} />
      </div>
    </div>
  );
}

function InfoBlock({ label, value, dark }) {
  return (
    <div className={cx("rounded-2xl border p-4", dark ? "border-white/10 bg-white/[0.03]" : "border-black/10 bg-black/[0.02]")}>
      <p className={cx("text-xs uppercase tracking-[0.18em]", dark ? "text-white/35" : "text-black/35")}>{label}</p>
      <p className="mt-2 text-sm font-medium">{value}</p>
    </div>
  );
}

function ManualAccordion({ data, dark, showKorean }) {
  const blocks = [
    ["Overview", data.overview, data.koOverview],
    ["First Action", data.first, data.koFirst],
    ["Access Condition", data.access, data.koAccess],
    ["Notice", data.notice, data.koNotice],
  ];
  const [open, setOpen] = useState("Overview");

  return (
    <div className="mt-6 space-y-2">
      {blocks.map(([title, en, ko]) => {
        const active = open === title;
        return (
          <div key={title} className={cx("rounded-2xl border", dark ? "border-white/10 bg-white/[0.025]" : "border-black/10 bg-black/[0.02]")}>
            <button
              onClick={() => setOpen(active ? "" : title)}
              className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left"
            >
              <span className="text-sm font-semibold">{title}</span>
              <ChevronDown size={16} className={cx("transition", active && "rotate-180")} />
            </button>
            <AnimatePresence initial={false}>
              {active && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <Dual className="px-4 pb-4" dark={dark} showKorean={showKorean} en={en} ko={ko} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

function InteractiveScenarioMap({ year, dark, onSelect }) {
  const hotspotsByYear = {
    2050: [
      { sector: "transfer", label: "1", name: "Transfer City", left: "69%", top: "51%" },
      { sector: "residential", label: "2", name: "Residential Adaptation", left: "58%", top: "19%" },
      { sector: "residential", label: "2", name: "Residential Adaptation", left: "55%", top: "79%" },
      { sector: "industrial", label: "3", name: "Industrial Urbanism", left: "60%", top: "7%" },
      { sector: "industrial", label: "3", name: "Industrial Urbanism", left: "58%", top: "66%" },
      { sector: "energy", label: "4", name: "Energy Urbanism", left: "30%", top: "36%" },
      { sector: "energy", label: "4", name: "Energy Urbanism", left: "61%", top: "94%" },
    ],
    2075: [
      { sector: "transfer", label: "1", name: "Transfer City", left: "75%", top: "50%" },
      { sector: "residential", label: "2", name: "Residential Adaptation", left: "58%", top: "17%" },
      { sector: "residential", label: "2", name: "Residential Adaptation", left: "57%", top: "78%" },
      { sector: "industrial", label: "3", name: "Industrial Urbanism", left: "57%", top: "7%" },
      { sector: "industrial", label: "3", name: "Industrial Urbanism", left: "56%", top: "63%" },
      { sector: "industrial", label: "3", name: "Industrial Urbanism", left: "68%", top: "92%" },
      { sector: "energy", label: "4", name: "Energy Urbanism", left: "25%", top: "49%" },
    ],
  };
  const hotspots = hotspotsByYear[year] ?? hotspotsByYear[2050];

  return (
    <div className={cx("rounded-[2.2rem] border p-5 md:p-6", dark ? "border-white/10 bg-white/[0.03]" : "border-black/10 bg-white")}>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <Badge dark={dark}>Overall Map Navigation</Badge>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Tap a point to open a sector</h2>
          <div className={cx("mt-3 flex flex-wrap gap-2 text-xs", dark ? "text-white/60" : "text-black/60")}>
            <span className={cx("rounded-full border px-3 py-1", dark ? "border-white/10 bg-white/5" : "border-black/10 bg-black/[0.03]")}>1 Transfer City</span>
            <span className={cx("rounded-full border px-3 py-1", dark ? "border-white/10 bg-white/5" : "border-black/10 bg-black/[0.03]")}>2 Residential Adaptation</span>
            <span className={cx("rounded-full border px-3 py-1", dark ? "border-white/10 bg-white/5" : "border-black/10 bg-black/[0.03]")}>3 Industrial Urbanism</span>
            <span className={cx("rounded-full border px-3 py-1", dark ? "border-white/10 bg-white/5" : "border-black/10 bg-black/[0.03]")}>4 Energy Urbanism</span>
          </div>
        </div>
        <Badge dark={dark}>{year}</Badge>
      </div>

      <div className="relative overflow-hidden rounded-[1.8rem] border border-black/10 bg-white">
        <img src={ASSETS.maps[year]} alt={`${year} overall scenario map`} className="block w-full" />
        {hotspots.map((spot, index) => (
          <MapHotspotButton key={`${spot.sector}-${index}`} spot={spot} index={index} onSelect={onSelect} />
        ))}
      </div>
    </div>
  );
}

function SectorsView({ year, setYear, showKorean, dark, activeSector, setActiveSector }) {
  const active = activeSector ?? "transfer";
  const setActive = setActiveSector;
  const sector = sectors[active];
  const [subtypeId, setSubtypeId] = useState("");
  const subtypeOptions = sector.subtypes?.[year] ?? [];
  const selectedSubtype = subtypeOptions.find((item) => item.id === subtypeId) ?? subtypeOptions[0];
  const hasSubtypes = subtypeOptions.length > 0;
  const yearlyNote = sector.yearlyNotes?.[year];
  const mainImage = selectedSubtype?.image ?? ASSETS.sectors[active].hero[year];
  const mainTitle = selectedSubtype?.title ?? yearlyNote?.title ?? sector.systems[year];
  const mainDescription = selectedSubtype?.description ?? yearlyNote?.description ?? sector.coreIdea;
  const mainKoDescription = selectedSubtype?.koDescription ?? yearlyNote?.koDescription ?? sector.koCoreIdea;
  const mainAccess = selectedSubtype?.access ?? yearlyNote?.access ?? sector.tension;
  const mainKoAccess = selectedSubtype?.koAccess ?? yearlyNote?.koAccess ?? sector.koTension;
  const galleryImages = [
    ...(ASSETS.sectors[active].gallery?.[year] ?? []),
    ...(selectedSubtype?.gallery ?? []),
  ].filter(Boolean);
  const detailImages = [mainImage, ...galleryImages].filter(Boolean);
  const Icon = sector.icon;

  useEffect(() => {
    const next = sectors[active].subtypes?.[year]?.[0]?.id ?? "";
    setSubtypeId(next);
  }, [active, year]);

  const selectFromMap = (sectorId) => {
    setActive(sectorId);
    setTimeout(() => {
      document.getElementById("sector-detail")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  return (
    <div className="mx-auto max-w-7xl px-5 py-8">
      <InteractiveScenarioMap year={year} dark={dark} onSelect={selectFromMap} />

      <div id="sector-detail" className="mt-6 grid gap-6 lg:grid-cols-[340px_1fr]">
        <aside className="space-y-3">
          <Badge dark={dark}>Scenario Sectors</Badge>
          {Object.entries(sectors).map(([id, item]) => {
            const SIcon = item.icon;
            const selected = id === active;
            return (
              <button
                key={id}
                onClick={() => setActive(id)}
                className={cx(
                  "w-full rounded-[1.5rem] border p-4 text-left transition",
                  selected
                    ? dark
                      ? "border-white/25 bg-white text-black"
                      : "border-black bg-black text-white"
                    : dark
                    ? "border-white/10 bg-white/[0.03] text-white/55 hover:text-white"
                    : "border-black/10 bg-white text-black/60 hover:text-black"
                )}
              >
                <div className="flex items-center gap-3">
                  <SIcon size={18} />
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    {showKorean && <p className="mt-1 text-xs opacity-50">{item.koTitle}</p>}
                  </div>
                </div>
              </button>
            );
          })}
        </aside>

        <section className="space-y-6">
          <div className={cx("rounded-[2.2rem] border p-6 md:p-8", dark ? "border-white/10 bg-white/[0.03]" : "border-black/10 bg-white")}>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge dark={dark}>{sector.order}</Badge>
                <Badge dark={dark}>{sector.current}</Badge>
              </div>
              <div className={cx("flex rounded-full border p-1", dark ? "border-white/10 bg-white/5" : "border-black/10 bg-black/[0.03]")}>
                {[2050, 2075].map((item) => (
                  <button
                    key={item}
                    onClick={() => setYear(item)}
                    className={cx("rounded-full px-4 py-2 text-sm", year === item ? (dark ? "bg-white text-black" : "bg-black text-white") : dark ? "text-white/45" : "text-black/45")}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-7 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
              <div>
                <div className="flex items-center gap-3">
                  <div className={cx("rounded-2xl border p-3", dark ? "border-white/10 bg-white/5" : "border-black/10 bg-black/[0.03]")}>
                    <Icon size={24} />
                  </div>
                  <div>
                    <h2 className="text-4xl font-semibold tracking-[-0.05em]">{sector.title}</h2>
                    {showKorean && <p className={cx("mt-1 text-sm", dark ? "text-white/40" : "text-black/45")}>{sector.koTitle}</p>}
                  </div>
                </div>

                <div className="mt-7 space-y-5">
                  <InfoBlock label="2026 Condition" value={sector.current} dark={dark} />
                  <InfoBlock label={`${year} System`} value={sector.systems[year]} dark={dark} />
                  <Dual dark={dark} showKorean={showKorean} en={sector.coreIdea} ko={sector.koCoreIdea} />
                  <div className={cx("rounded-[1.5rem] border p-5", dark ? "border-white/10 bg-white/[0.03]" : "border-black/10 bg-black/[0.02]")}>
                    <div className="flex items-center gap-2">
                      <ShieldAlert size={18} />
                      <p className="font-semibold">Core Tension</p>
                    </div>
                    <Dual className="mt-3" dark={dark} showKorean={showKorean} en={sector.tension} ko={sector.koTension} />
                  </div>
                </div>
              </div>

              <ImageCarousel
                dark={dark}
                images={detailImages}
                title={`${year} / ${mainTitle}`}
                caption={hasSubtypes ? `${sector.title} subtype` : sector.title}
                aspect="aspect-[16/9]"
              />
            </div>
          </div>

          {hasSubtypes && (
            <SubtypeSelector
              options={subtypeOptions}
              selected={selectedSubtype?.id}
              setSelected={setSubtypeId}
              showKorean={showKorean}
              dark={dark}
            />
          )}

          <div className={cx("rounded-[2rem] border p-6", dark ? "border-white/10 bg-white/[0.03]" : "border-black/10 bg-white")}>
            <div className="flex flex-wrap items-center gap-2">
              <Badge dark={dark}>{hasSubtypes ? "Selected Subtype" : "Selected System"}</Badge>
              <Badge dark={dark}>{year}</Badge>
            </div>
            <h3 className="mt-5 text-3xl font-semibold tracking-[-0.04em]">{mainTitle}</h3>
            {showKorean && selectedSubtype?.koTitle && (
              <p className={cx("mt-1 text-sm", dark ? "text-white/40" : "text-black/45")}>{selectedSubtype.koTitle}</p>
            )}

            <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
              <div className="space-y-5">
                <Dual dark={dark} showKorean={showKorean} en={mainDescription} ko={mainKoDescription} />
                <div className={cx("rounded-[1.5rem] border p-5", dark ? "border-white/10 bg-white/[0.025]" : "border-black/10 bg-black/[0.02]")}>
                  <p className="text-sm font-semibold">Access / Operation Note</p>
                  <Dual className="mt-3" dark={dark} showKorean={showKorean} en={mainAccess} ko={mainKoAccess} />
                </div>
              </div>

              <div>
                <p className={cx("mb-3 text-xs font-semibold uppercase tracking-[0.2em]", dark ? "text-white/35" : "text-black/35")}>
                  Keywords
                </p>
                <div className="flex flex-wrap gap-2">
                  {(selectedSubtype?.keywords ?? sector.effects).map((item) => (
                    <span key={item} className={cx("rounded-full border px-3 py-1 text-sm", dark ? "border-white/10 bg-white/5 text-white/70" : "border-black/10 bg-black/[0.03] text-black/65")}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-1">
            <ImageFrame
              dark={dark}
              src={ASSETS.sectors[active].layer}
              title={`${sector.title} Layer Diagram`}
              caption="2026 → 2050 → 2075 spatial layering"
              aspect="aspect-[4/5]"
              fit="contain"
            />
          </div>

          <div className={cx("rounded-[2rem] border p-6", dark ? "border-white/10 bg-white/[0.03]" : "border-black/10 bg-white")}>
            <div className="flex items-center gap-2">
              <ClipboardList size={20} />
              <h3 className="font-semibold">Urban Effects</h3>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {sector.effects.map((effect, index) => (
                <div key={effect} className={cx("flex items-center gap-3 rounded-2xl border p-4", dark ? "border-white/10 bg-white/[0.025]" : "border-black/10 bg-black/[0.02]")}>
                  <span className={cx("flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs", dark ? "bg-white text-black" : "bg-black text-white")}>
                    {index + 1}
                  </span>
                  <p className="text-sm">{effect}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function SubtypeSelector({ options, selected, setSelected, showKorean, dark }) {
  return (
    <div className={cx("rounded-[2rem] border p-5", dark ? "border-white/10 bg-white/[0.03]" : "border-black/10 bg-white")}>
      <div className="mb-4 flex items-center gap-2">
        <Layers3 size={18} />
        <p className="font-semibold">Select Subtype</p>
      </div>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {options.map((item) => {
          const isSelected = item.id === selected;
          return (
            <button
              key={item.id}
              onClick={() => setSelected(item.id)}
              className={cx(
                "rounded-[1.4rem] border p-4 text-left transition",
                isSelected
                  ? dark
                    ? "border-white/30 bg-white text-black"
                    : "border-black bg-black text-white"
                  : dark
                  ? "border-white/10 bg-white/[0.025] text-white/60 hover:text-white"
                  : "border-black/10 bg-black/[0.02] text-black/60 hover:text-black"
              )}
            >
              <p className="font-semibold">{item.title}</p>
              {showKorean && <p className="mt-1 text-xs opacity-55">{item.koTitle}</p>}
              <p className="mt-3 line-clamp-2 text-xs opacity-55">{item.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function VideoOverlay({ video, onClose }) {
  if (!video) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl"
    >
      <div className="relative w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-black shadow-2xl">
        <video src={video} autoPlay muted playsInline className="max-h-[86vh] w-full object-contain" onEnded={onClose} onError={onClose} />
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full border border-white/15 bg-black/55 px-4 py-2 text-sm text-white backdrop-blur"
        >
          Skip
        </button>
      </div>
    </motion.div>
  );
}

function SoundController({ audioRef }) {
  return <audio ref={audioRef} src={BGM_SRC} loop preload="auto" aria-label="City background sound" />;
}

function TypewriterText({ text, speed = 34, className = "" }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    setDisplayed("");
    let index = 0;

    const timer = setInterval(() => {
      index += 1;
      setDisplayed(text.slice(0, index));
      if (index >= text.length) clearInterval(timer);
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <p className={cx("whitespace-pre-line font-mono tracking-[0.08em]", className)}>
      {displayed}
      <span className="ml-1 animate-pulse">_</span>
    </p>
  );
}

function IntroOverlay({ onDone }) {
  const [step, setStep] = useState("boot");
  const [bootIndex, setBootIndex] = useState(0);
  const [language, setLanguage] = useState("en");
  const [enteringYear, setEnteringYear] = useState(null);

  const copy = INTRO_COPY[language];

  useEffect(() => {
    if (step !== "boot") return undefined;

    if (bootIndex < INTRO_BOOT_MESSAGES.length - 1) {
      const timer = setTimeout(() => {
        setBootIndex((prev) => prev + 1);
      }, 680);

      return () => clearTimeout(timer);
    }

    const finishTimer = setTimeout(() => {
      setStep("language");
    }, 900);

    return () => clearTimeout(finishTimer);
  }, [step, bootIndex]);

  const selectLanguage = (nextLanguage) => {
    setLanguage(nextLanguage);
    setStep("intro");
  };

  const selectYear = (nextYear) => {
    setEnteringYear(nextYear);
    setStep("entering");

    window.setTimeout(
      () => {
        onDone(nextYear, language);
      },
      nextYear === 2075 ? 1350 : 1050
    );
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[300] flex items-center justify-center overflow-hidden bg-black px-5 text-white"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:48px_48px]" />
      <div className="pointer-events-none absolute left-1/2 top-[-280px] h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-260px] right-[-160px] h-[520px] w-[520px] rounded-full bg-white/5 blur-3xl" />

      <div className="absolute left-6 right-6 top-6 flex justify-between font-mono text-[10px] uppercase tracking-[0.24em] text-white/45 md:left-10 md:right-10">
        <span>SASANG OS</span>
        <span>OPERATING MANUAL</span>
      </div>

      <AnimatePresence mode="wait">
        {step === "boot" && (
          <motion.section
            key="boot"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.45 }}
            className="relative w-[min(92vw,680px)] rounded-[2rem] border border-white/10 bg-black/70 p-6 shadow-2xl backdrop-blur-xl md:p-8"
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="h-2 w-2 animate-pulse rounded-full bg-white shadow-[0_0_22px_rgba(255,255,255,0.95)]" />
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/50">SYSTEM BOOT</p>
            </div>

            <div className="min-h-[138px] space-y-3 font-mono text-sm text-white/78">
              {INTRO_BOOT_MESSAGES.slice(0, bootIndex + 1).map((message, index) => (
                <div key={message} className="flex items-center gap-3">
                  <span className="w-5 text-white/35">{index === bootIndex ? ">" : "✓"}</span>
                  <span>{message}</span>
                  {index === bootIndex && <span className="animate-pulse">_</span>}
                </div>
              ))}
            </div>

            <div className="mt-8 h-px overflow-hidden rounded-full bg-white/15">
              <motion.div
                className="h-full bg-white"
                animate={{
                  width: `${((bootIndex + 1) / INTRO_BOOT_MESSAGES.length) * 100}%`,
                }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              />
            </div>
          </motion.section>
        )}

        {step === "language" && (
          <motion.section
            key="language"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.45 }}
            className="relative w-[min(92vw,680px)] rounded-[2rem] border border-white/10 bg-black/70 p-6 text-center shadow-2xl backdrop-blur-xl md:p-9"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/45">LANGUAGE SETTING</p>

            <h1 className="mt-6 text-4xl font-semibold tracking-[-0.06em] md:text-6xl">{copy.languageTitle}</h1>

            <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-white/55">{copy.languageSub}</p>

            <div className="mt-8 flex justify-center gap-3">
              <button
                onClick={() => selectLanguage("en")}
                className="rounded-full border border-white/15 bg-white px-8 py-3 font-mono text-xs uppercase tracking-[0.18em] text-black transition hover:scale-[1.03]"
              >
                ENG
              </button>
              <button
                onClick={() => selectLanguage("ko")}
                className="rounded-full border border-white/15 bg-white/5 px-8 py-3 font-mono text-xs uppercase tracking-[0.18em] text-white transition hover:scale-[1.03] hover:bg-white/10"
              >
                KOR
              </button>
            </div>
          </motion.section>
        )}

        {step === "intro" && (
          <motion.section
            key="intro"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.45 }}
            className="relative w-[min(94vw,900px)] rounded-[2rem] border border-white/10 bg-black/70 p-6 shadow-2xl backdrop-blur-xl md:p-9"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/45">{copy.introKicker}</p>

            <h1 className="mt-5 text-4xl font-semibold tracking-[-0.06em] md:text-6xl">{copy.introTitle}</h1>

            <div className="mt-7 max-w-3xl space-y-4 text-sm leading-relaxed text-white/70 md:text-[15px]">
              {copy.introBody.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 grid gap-px overflow-hidden rounded-[1.4rem] border border-white/10 bg-white/10 md:grid-cols-3">
              <div className="bg-black/75 p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">System Range</p>
                <p className="mt-2 text-sm text-white/80">2050 / 2075</p>
              </div>
              <div className="bg-black/75 p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">Urban Systems</p>
                <p className="mt-2 text-sm text-white/80">Mobility · Industry · Housing · Energy</p>
              </div>
              <div className="bg-black/75 p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">Location</p>
                <p className="mt-2 text-sm text-white/80">Sasang-gu, Busan</p>
              </div>
            </div>

            <button
              onClick={() => setStep("year")}
              className="mt-8 rounded-full border border-white/15 bg-white px-6 py-3 font-mono text-xs uppercase tracking-[0.16em] text-black transition hover:scale-[1.02]"
            >
              {copy.continue}
            </button>
          </motion.section>
        )}

        {step === "year" && (
          <motion.section
            key="year"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.45 }}
            className="relative w-[min(94vw,940px)] rounded-[2rem] border border-white/10 bg-black/70 p-6 shadow-2xl backdrop-blur-xl md:p-9"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/45">{copy.yearKicker}</p>

            <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[0.98] tracking-[-0.06em] md:text-6xl">
              {copy.yearTitle}
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/55">{copy.yearSub}</p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <button
                onClick={() => selectYear(2050)}
                className="group min-h-[220px] rounded-[1.8rem] border border-white/15 bg-white p-6 text-left text-black transition hover:-translate-y-1 hover:shadow-2xl"
              >
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-black/45">2050</p>
                <h2 className="mt-12 text-3xl font-semibold tracking-[-0.05em]">{copy.year2050}</h2>
                <p className="mt-4 text-sm leading-relaxed text-black/55">{copy.year2050Desc}</p>
              </button>

              <button
                onClick={() => selectYear(2075)}
                className="group min-h-[220px] rounded-[1.8rem] border border-white/15 bg-white/[0.055] p-6 text-left text-white transition hover:-translate-y-1 hover:bg-white/10 hover:shadow-2xl"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="font-mono text-xs uppercase tracking-[0.22em] text-white/45">2075</p>
                  <span className="rounded-full border border-white/15 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">
                    Rights Required
                  </span>
                </div>
                <h2 className="mt-12 text-3xl font-semibold tracking-[-0.05em]">{copy.year2075}</h2>
                <p className="mt-4 text-sm leading-relaxed text-white/55">{copy.year2075Desc}</p>
              </button>
            </div>
          </motion.section>
        )}

        {step === "entering" && (
          <motion.section
            key="entering"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.45 }}
            className="relative w-[min(92vw,680px)] rounded-[2rem] border border-white/10 bg-black/70 p-6 text-center shadow-2xl backdrop-blur-xl md:p-9"
          >
            <div className="mx-auto mb-7 h-2 w-2 animate-pulse rounded-full bg-white shadow-[0_0_24px_rgba(255,255,255,0.85)]" />

            <TypewriterText
              text={enteringYear === 2075 ? copy.entering2075 : copy.entering2050}
              speed={30}
              className="text-sm leading-7 text-white/85 md:text-base"
            />

            <div className="mt-8 h-px overflow-hidden rounded-full bg-white/15">
              <motion.div
                className="h-full w-1/2 bg-white"
                initial={{ x: "-100%" }}
                animate={{ x: "220%" }}
                transition={{ duration: 0.9, ease: "easeInOut", repeat: Infinity }}
              />
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function MethodView({ showKorean, dark }) {
  const steps = [
    ["10 Drivers", "Aging, culture, education, energy, finance, migration, mobility, real estate, trade/industry, urban form"],
    ["Weighted Matrix", "Stats, theory, spatial analysis, and policy are converted into weighted relationships"],
    ["Directional Matrix", "Driver relationships are translated into influence and dependence"],
    ["Causal Machines", "Strong pressures become six causal urban mechanisms"],
    ["Spatial Collisions", "Mechanisms are located in Sasang’s specific spatial conditions"],
    ["Scenario Sectors", "Four sectors become the basis for the 2050 / 2075 manual"],
  ];

  return (
    <div className="mx-auto max-w-7xl px-5 py-8">
      <div className={cx("rounded-[2.2rem] border p-6 md:p-8", dark ? "border-white/10 bg-white/[0.03]" : "border-black/10 bg-white")}>
        <Badge dark={dark}>Method</Badge>
        <h1 className="mt-6 text-5xl font-semibold tracking-[-0.06em]">From Drivers to Manual</h1>
        <Dual
          className="mt-5 max-w-3xl"
          dark={dark}
          showKorean={showKorean}
          en="The web app compresses the project method into an explorable interface: drivers become causal machines, causal machines become spatial collisions, and spatial collisions become scenario sectors."
          ko="이 웹앱은 프로젝트 방법론을 탐색 가능한 인터페이스로 압축한다. 드라이버는 인과 기계가 되고, 인과 기계는 공간 충돌이 되며, 공간 충돌은 시나리오 섹터가 된다."
        />

        <div className="mt-8 grid gap-6 xl:grid-cols-[0.75fr_1.25fr]">
          <div className="space-y-3">
            {steps.map(([title, body], index) => (
              <div key={title} className={cx("rounded-[1.5rem] border p-4", dark ? "border-white/10 bg-white/[0.03]" : "border-black/10 bg-black/[0.02]")}>
                <div className="flex items-start gap-3">
                  <span className={cx("flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs", dark ? "bg-white text-black" : "bg-black text-white")}>
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-semibold">{title}</p>
                    <p className={cx("mt-1 text-sm leading-relaxed", dark ? "text-white/45" : "text-black/45")}>{body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <ImageFrame
            dark={dark}
            src={ASSETS.method}
            title="Method Diagram"
            caption="Drivers → causal machines → spatial collisions → scenario sectors"
            aspect="aspect-[16/10]"
          />
        </div>
      </div>
    </div>
  );
}

export default function FutureSasangOS() {
  const [view, setView] = useState("home");
  const [year, setYear] = useState(2050);
  const [selectedPurpose, setSelectedPurpose] = useState("transfer");
  const [activeSector, setActiveSector] = useState("transfer");
  const [showKorean, setShowKorean] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [videoOverlay, setVideoOverlay] = useState(null);
  const [soundOn, setSoundOn] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [systemNotice, setSystemNotice] = useState(null);
  const [scanNotice, setScanNotice] = useState(null);
  const audioRef = useRef(null);
  const dark = year === 2075;

  useEffect(() => {
    setShowIntro(true);
  }, []);

  const pushSystemNotice = (title, body) => {
    const id = Date.now();
    setSystemNotice({ id, title, body });
    window.setTimeout(() => {
      setSystemNotice((current) => (current?.id === id ? null : current));
    }, 2400);
  };

  const pushScanNotice = (title, body) => {
    const id = Date.now();
    setScanNotice({ id, title, body });
    window.setTimeout(() => {
      setScanNotice((current) => (current?.id === id ? null : current));
    }, 850);
  };

  const handleYearChange = (nextYear) => {
    if (nextYear === year) return;
    setYear(nextYear);
    pushSystemNotice(`SYSTEM YEAR UPDATED: ${nextYear}`, "ACCESS RULES RECALIBRATED");
  };

  const handleViewChange = (nextView) => {
    if (nextView === view) return;
    const labels = {
      home: "LOADING MANUAL INTERFACE...",
      sectors: "SYNCING SCENARIO SECTOR DATA...",
      method: "LOADING METHOD MATRIX...",
    };
    pushScanNotice(labels[nextView] ?? "LOADING SYSTEM DATA...", "ROUTE, RIGHTS, AND MAP LAYERS ARE BEING VERIFIED");
    window.setTimeout(() => setView(nextView), 180);
  };

  const toggleSound = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.25;

    if (soundOn) {
      audio.pause();
      setSoundOn(false);
      return;
    }

    try {
      await audio.play();
      setSoundOn(true);
    } catch (error) {
      setSoundOn(false);
      console.warn("Background sound could not be played before user interaction.", error);
    }
  };

  const backgroundClass = dark ? "min-h-screen bg-[#08090b] text-white" : "min-h-screen bg-[#f4f2ea] text-black";

  if (showIntro) {
    return (
      <IntroOverlay
        onDone={(selectedYear, selectedLanguage) => {
          setYear(selectedYear);
          setShowKorean(selectedLanguage === "ko");
          setShowIntro(false);
        }}
      />
    );
  }

  return (
    <main className={backgroundClass}>
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className={cx("absolute left-1/2 top-[-260px] h-[520px] w-[520px] -translate-x-1/2 rounded-full blur-3xl", dark ? "bg-white/5" : "bg-white/70")} />
        <div className={cx("absolute inset-0 bg-[size:42px_42px]", dark ? "bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)]" : "bg-[linear-gradient(rgba(0,0,0,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.045)_1px,transparent_1px)]")} />
      </div>

      <div className="relative z-10">
        <TopNav
          view={view}
          setView={handleViewChange}
          year={year}
          setYear={handleYearChange}
          showKorean={showKorean}
          setShowKorean={setShowKorean}
          setMenuOpen={setMenuOpen}
          dark={dark}
          soundOn={soundOn}
          toggleSound={toggleSound}
        />

        <SoundController audioRef={audioRef} />
        <ScanOverlay scan={scanNotice} />
        <SystemToast notice={systemNotice} dark={dark} />

        <MobileMenu
          open={menuOpen}
          setOpen={setMenuOpen}
          setView={handleViewChange}
          year={year}
          setYear={handleYearChange}
          showKorean={showKorean}
          setShowKorean={setShowKorean}
          soundOn={soundOn}
          toggleSound={toggleSound}
        />

        <AnimatePresence>
          <VideoOverlay video={videoOverlay} onClose={() => setVideoOverlay(null)} />
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${view}-${year}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
          >
            {view === "home" && (
              <HomeView
                year={year}
                setYear={handleYearChange}
                selectedPurpose={selectedPurpose}
                setSelectedPurpose={setSelectedPurpose}
                setView={handleViewChange}
                showKorean={showKorean}
                dark={dark}
                setVideoOverlay={setVideoOverlay}
                setActiveSector={setActiveSector}
              />
            )}

            {view === "sectors" && (
              <SectorsView
                year={year}
                setYear={handleYearChange}
                showKorean={showKorean}
                dark={dark}
                activeSector={activeSector}
                setActiveSector={setActiveSector}
              />
            )}

            {view === "method" && <MethodView showKorean={showKorean} dark={dark} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
