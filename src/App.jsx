import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  BatteryCharging,
  Boxes,
  ChevronDown,
  Factory,
  Film,
  Home,
  Languages,
  Maximize2,
  Route,
  Search,
  Sparkles,
  X,
} from "lucide-react";

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < breakpoint);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [breakpoint]);

  return isMobile;
}


const asset = (path) =>
  "/assets/" +
  path
    .split("/")
    .map((part) => encodeURIComponent(part).replace(/%2523/g, "%23"))
    .join("/");

const extraAsset = (name) => "/assets/extra/" + encodeURIComponent(name).replace(/%2523/g, "%23");


const YEAR = {
  2050: {
    title: "Urban Assembly of Sasang",
    ko: "사상 도시 조립체",
    filmTitle: "2050 Manual Film",
    youtubeId: "Mbr_Mxryjmo",
    youtubeKind: "shorts",
    theme: "light",
  },
  2075: {
    title: "Urban Rights System of Sasang",
    ko: "사상 도시 권리 시스템",
    filmTitle: "2075 Manual Film",
    youtubeId: "nhaL3zdHeBw",
    youtubeKind: "video",
    theme: "dark",
  },
};

const PURPOSES = [
  { id: "transfer", label: "Transfer / Move", ko: "환승 / 이동", icon: Route, sectors: ["transfer"] },
  { id: "produce", label: "Produce / Repair", ko: "생산 / 수리", icon: Factory, sectors: ["industrial"] },
  { id: "goods", label: "Send / Receive Goods", ko: "물품 발송 / 수령", icon: Boxes, sectors: ["industrial"] },
  { id: "living", label: "Use Living Services", ko: "생활 서비스 이용", icon: Home, sectors: ["residential"] },
  { id: "energy", label: "Charge / Store Energy", ko: "충전 / 에너지 저장", icon: BatteryCharging, sectors: ["energy"] },
  { id: "support", label: "Stay / Get Support", ko: "임시 체류 / 지원", icon: Sparkles, sectors: ["transfer", "residential"] },
];

const MAP_IMAGES = {
  2050: [
    "/assets/etc/map/sasang_collision_points_map.webp",
    "/assets/etc/map/map mode.webp",
    "/assets/collision-map.webp",
    "/assets/etc/map/2050map.webp",
    "/assets/map-2050.webp",
  ],
  2075: [
    "/assets/etc/map/sasang_collision_points_map.webp",
    "/assets/etc/map/map mode.webp",
    "/assets/collision-map.webp",
    "/assets/etc/map/map-2075.webp",
    "/assets/map-2075.webp",
  ],
};

const LAYER_DIAGRAMS = {
  transfer: "/assets/etc/diagram/layer-transfer.webp",
  industrial: "/assets/etc/diagram/layer-industrial.webp",
  residential: "/assets/etc/diagram/layer-residential.webp",
  energy: "/assets/etc/diagram/layer-energy.webp",
};

const COLLISION_BUTTONS = [
  { id: "industrial-number-top", sector: "industrial", no: "03", style: { left: "70.2%", top: "6.2%" } },
  { id: "residential-number-top", sector: "residential", no: "02", style: { left: "66.8%", top: "19.4%" } },
  { id: "energy-number", sector: "energy", no: "04", style: { left: "27.2%", top: "40.5%" } },
  { id: "transfer-number", sector: "transfer", no: "01", style: { left: "59.2%", top: "55.2%" } },
  { id: "industrial-number-mid", sector: "industrial", no: "03", style: { left: "62.0%", top: "73.4%" } },
  { id: "residential-number-bottom", sector: "residential", no: "02", style: { left: "83.0%", top: "82.1%" } },
  { id: "industrial-number-bottom", sector: "industrial", no: "03", style: { left: "81.0%", top: "94.8%" } },
];

const DRIVER_TO_SECTORS_MAP = {
  aging: ["transfer", "residential"],
  culture: ["transfer", "residential"],
  education: ["industrial"],
  energy: ["energy"],
  finance: ["transfer", "industrial", "residential", "energy"],
  migration: ["industrial", "transfer", "residential"],
  mobility: ["transfer", "industrial", "residential"],
  realestate: ["residential", "industrial"],
  trade: ["industrial", "energy"],
  urbanform: ["transfer", "industrial", "residential", "energy"],
  policy: ["transfer", "industrial", "residential", "energy"],
};

const METHOD_IMAGE = "/assets/etc/method/method_driver_to_sector_map.webp";

const SECTORS = {
  transfer: {
    no: "01",
    title: "Transfer City",
    ko: "환승 도시",
    icon: Route,
    mapPoint: { left: "65%", top: "58%" },
    currentLabel: "Compressed Mobility Hub",
    systems: { 2050: "Integrated Transfer Deck / Civic Concourse", 2075: "Access-Class City / Service Access Market" },
    coreIdea: "Transfer City examines how Sasang Station’s scattered transport facilities can become an urban platform where movement, waiting, services, and temporary life are organized together.",
    coreTension: "Can integrated transfer become a shared urban platform, or will it become a system that distributes speed, comfort, and services unequally?",
    whySasang: [
      "Existing multimodal concentration: Sasang Station, West Busan Terminal, light rail, buses, taxis, and major roads are already concentrated.",
      "Transfer users are socially diverse: commuters, elderly residents, international students, migrant workers, platform workers, local residents, and long-distance travelers overlap.",
      "Mobility, industry, market, and housing are compressed, so transfer is connected not only to movement but also to waiting, services, markets, housing, and logistics.",
    ],
    urbanEffects: ["Mobility becomes service access", "Waiting becomes stratified", "Transfer creates new inequality", "The station becomes a temporary city"],
    currentStatus: "As of 2026, Sasang already functions as one of western Busan’s most compressed mobility nodes. The station, terminal, light rail, buses, taxis, roads, and pedestrian routes are physically close, but still operate as separate pieces of transport infrastructure.",
    yearText: {
      2050: "By 2050, the Integrated Transfer Deck connects Sasang Station, the Busan–Gimhae Light Rail, West Busan Terminal, bus stops, taxi stands, shuttles, and slow mobility into one multi-level circulation system. It is not just a bridge, but a platform where movement, waiting, information checking, luggage storage, short rest, and living services happen together.",
      2075: "By 2075, the transfer hub becomes an Access-Class City. Movement speed, waiting location, service access, charging, storage, sleeping, shower, shuttle priority, and medical or administrative booking are assigned through access rights rather than ordinary tickets alone.",
    },
    hero: {
      2050: { image: asset("2050s/01.Transfer City/hero/2050_Transfercity_Hero.webp"), video: asset("2050s/01.Transfer City/hero/transfer hero 2050.mp4") },
      2075: { image: asset("2075/01.Transfer City/hero/2075_Transfer_Hero.mp4"), video: "" },
    },
    current: {
      2050: [asset("2050s/01.Transfer City/current/transfer_2026_station.webp"), asset("2050s/01.Transfer City/current/transfer_2026_terminal.webp"), asset("2050s/01.Transfer City/current/transfer_2026_road_crossing.webp"), asset("2050s/01.Transfer City/satelite/transfer_2026_mobility_cluster_satellite.webp")],
      2075: [asset("2075/01.Transfer City/current/transfer_2026_station.webp"), asset("2075/01.Transfer City/current/transfer_2026_terminal.webp"), asset("2075/01.Transfer City/current/transfer_2026_road_crossing.webp")],
    },
    elements: {
      2050: [
        {
          title: "Integrated Transfer Deck",
          ko: "통합 환승 데크",
          text: "A multi-level transfer platform connects Sasang Station, Busan–Gimhae Light Rail, West Busan Terminal, bus stops, taxi stands, autonomous shuttles, and slow mobility into one circulation system. It is not a simple pedestrian bridge. It becomes a living platform where users wait, check information, store luggage, rest shortly, access services, and move to the next mode without wandering through separated terminal edges and road crossings.",
          policy: "Sasang Transfer-Living District Special Plan: a transfer center should include waiting, information, luggage, short rest, and living services rather than only transport links.",
          video: asset("2050s/01.Transfer City/integrated transfer deck/integrated_transfer_deck_loop.mp4"),
          image: asset("2050s/01.Transfer City/integrated transfer deck/transfer_2050_integrated_deck.webp"),
          illust: asset("2050s/01.Transfer City/illust/integrated transfer deck.webp"),
          diagrams: [
            { title: "Integrated Deck Diagram", src: asset("2050s/01.Transfer City/integrated transfer deck/diagram/transfer_integrated_deck_diagram.webp") },
            { title: "Mode Connection Board", src: asset("2050s/01.Transfer City/integrated transfer deck/diagram/transfer_mode_connection_board.webp") },
            { title: "Mode Network Diagram", src: asset("2050s/01.Transfer City/integrated transfer deck/diagram/transfer_mode_network_diagram.webp") },
          ],
        },
        {
          title: "Civic Concourse",
          ko: "시민 콘코스",
          text: "Civic Concourse is a public-service space inserted into the station and terminal. Unlike a conventional concourse organized around transport information and commerce, this space becomes a civic interior for administration, language support, welfare guidance, health checks, labor counseling, employment information, and temporary citizen-card services. It responds to the overlap of foreign residents, international students, migrant workers, elderly users, long-distance travelers, and local residents in the Sasang Station area.",
          policy: "Civic Concourse Public Service Floor-Area Requirement: transfer redevelopment must secure floor area for multilingual information, labor counseling, health checks, welfare guidance, kiosks, and temporary citizen-card services.",
          video: asset("2050s/01.Transfer City/civic concourse/civic_concourse_loop.mp4"),
          image: asset("2050s/01.Transfer City/civic concourse/transfer_civic_concourse.webp"),
          illust: asset("2050s/01.Transfer City/illust/civic concourse.webp"),
          diagrams: [{ title: "Temporary Citizen Card", src: asset("2050s/01.Transfer City/civic concourse/diagram/transfer_temporary_citizen_card.webp") }],
        },
      ],
      2075: [
        {
          title: "Priority Access Gate",
          ko: "우선 접근 게이트",
          text: "Not all users use the same entrances and routes. Premium subscribers, workers, elderly-care users, emergency medical users, logistics-priority users, and general users pass through different gates.",
          policy: "Mobility Access Tier System enables congestion management, emergency movement, logistics efficiency, and revenue generation, while also producing differentiated access.",
          video: "",
          image: asset("2075/01.Transfer City/access gate/2075_Transfer_Accessgate.webp"),
          illust: asset("2075/01.Transfer City/illust/access gate.webp"),
          diagrams: [],
        },
        {
          title: "Service Access Market",
          ko: "서비스 접근 시장",
          text: "Access rights to charging, storage, sleeping, shower, meals, shuttle priority, and medical or administrative bookings are sold or allocated by time slot inside the transfer hub.",
          policy: "Urban Service Pass Platform turns the transfer hub into a market for temporary stay, recovery, and work services.",
          video: "",
          image: asset("2075/01.Transfer City/service access market/2075_Transfer_Servicemarket.webp"),
          illust: asset("2075/01.Transfer City/illust/service access market.webp"),
          diagrams: [],
        },
      ],
    },
  },
  industrial: {
    no: "02",
    title: "Industrial Urbanism",
    ko: "산업 도시성",
    icon: Factory,
    mapPoint: { left: "56%", top: "73%" },
    currentLabel: "Remaining Industrial Fabric",
    systems: { 2050: "Open Factory Commons", 2075: "Industrial Sovereignty Zone" },
    coreIdea: "Industrial Urbanism examines how Sasang’s remaining factories, warehouses, repair shops, and industrial alleys can become urban infrastructure rather than disappearing from the city.",
    coreTension: "Can factories remain as shared urban assets, or will they become powerful systems that compete with the city?",
    whySasang: [
      "Industrial fabric still remains: factories, warehouses, repair shops, loading areas, and industrial alleys still exist.",
      "Industry and everyday life are already close: factories, housing, markets, alleys, and transfer facilities are compressed together.",
      "Sasang is both industrial and connected: industry is tied to Sasang Station, terminals, roads, logistics, and everyday movement.",
    ],
    urbanEffects: ["Factory as shared urban asset", "Re-entry of human labor", "Expansion of industrial power", "Conflict over urban resources", "From commons to sovereignty"],
    currentStatus: "Sasang’s factories today are a dense urban fabric of low-rise factory buildings, warehouses, loading yards, repair shops, and narrow industrial alleys embedded between housing, markets, roads, and transfer infrastructure. They are both a remaining industrial base and an unstable urban condition.",
    yearText: {
      2050: "By 2050, Open Factory Commons turns remaining factories into shared urban assets through learning, production, and logistics commons. Existing machines, tools, and industrial knowledge become accessible through training, certification, reservation, and controlled logistics.",
      2075: "By 2075, shared production is partially reabsorbed into closed automated systems. Dark Factories, Urban Control Hubs, and remaining Civic Factories divide production into automated power, invisible control, and public repair access.",
    },
    hero: {
      2050: { image: asset("2050s/02. Industrial Urbanism/hero/industrial_2050_open_factory_commons_hero.webp"), video: asset("2050s/02. Industrial Urbanism/hero/industrial_hero_2050_loop.mp4") },
      2075: { image: asset("2075/02. Industrial Urbanism/hero/2075_Industry_Hero.webp"), video: asset("2075/02. Industrial Urbanism/hero/industrial_hero_2075_loop.mp4") },
    },
    current: {
      2050: [asset("2050s/02. Industrial Urbanism/current/industrial_2026_factory.webp"), asset("2050s/02. Industrial Urbanism/current/industrial_2026_alley.webp"), asset("2050s/02. Industrial Urbanism/current/industrial_2026_warehouse.webp"), asset("2050s/02. Industrial Urbanism/satelite/industrial_2026_fabric_satellite.webp")],
      2075: [asset("2075/02. Industrial Urbanism/current/industrial_2026_factory.webp"), asset("2075/02. Industrial Urbanism/current/industrial_2026_alley.webp"), asset("2075/02. Industrial Urbanism/current/industrial_2026_warehouse.webp")],
    },
    elements: {
      2050: [
        {
          title: "Industrial Learning Commons",
          ko: "산업 학습 커먼즈",
          text: "Industrial Learning Commons transfers existing factory equipment, working methods, safety knowledge, machine literacy, and production language to new users. Retired technicians, migrant workers, international students, young makers, and local residents learn how to use old machines, tools, safety protocols, and basic fabrication processes. The focus is not simply repairing objects, but producing the qualification to enter industrial knowledge and use the factory as an urban learning resource.",
          policy: "Right-to-Repair and Technical Access Ordinance converts parts of existing factories into repair, reassembly, parts recovery, safety training, and certification spaces.",
          video: asset("2050s/02. Industrial Urbanism/Learning commons/learning_commons_loop.mp4"),
          image: asset("2050s/02. Industrial Urbanism/Learning commons/industrial_learning_commons..webp"),
          illust: asset("2050s/02. Industrial Urbanism/illust/learning commons.webp"),
          diagrams: [{ title: "Repair Education Policy", src: asset("2050s/02. Industrial Urbanism/Learning commons/diagram/industrial_repair_education_policy.webp") }],
        },
        {
          title: "Shared Production Commons",
          ko: "공유 생산 커먼즈",
          text: "Shared Production Commons is a reservation-based production system where machines, tools, workshops, packing rooms, loading areas, testing equipment, and storage slots are shared by multiple users. Instead of renting or owning an entire factory, small manufacturers, repair workers, trainees, and young entrepreneurs borrow only the equipment, workspace, and time they need. Aging industrial equipment is therefore transformed from a demolition target into a shared production asset for the city.",
          policy: "Public Production Slot Reservation System reserves machine slots, workshop slots, packing slots, loading slots, and storage slots with priority for small manufacturers, repair workers, trainees, and local entrepreneurs.",
          video: asset("2050s/02. Industrial Urbanism/shared production commons/shared_production_commons_loop.mp4"),
          image: asset("2050s/02. Industrial Urbanism/shared production commons/industrial_shared_production_commons.webp"),
          illust: asset("2050s/02. Industrial Urbanism/illust/shared production.webp"),
          diagrams: [],
        },
        {
          title: "Urban Logistics Commons",
          ko: "도시 물류 커먼즈",
          text: "Urban Logistics Commons is a human-free logistics city where vacant warehouses, factory edges, loading areas, and rear service roads are designated for robots, electric carts, automated sorting systems, return processing, parcel storage, robot charging, and last-mile delivery preparation. The factory edge no longer supports production only; it becomes an intermediate logistics device connecting markets, housing, transfer decks, repair workshops, and shared production spaces. Human access is restricted except for maintenance time slots and access permissions.",
          policy: "Automated Logistics-Only District Program restricts pedestrian access and allows only maintenance workers through designated time slots and access permissions.",
          video: asset("2050s/02. Industrial Urbanism/Urban logistics commons/urban_logistics_commons_loop.mp4"),
          image: asset("2050s/02. Industrial Urbanism/Urban logistics commons/industrial_urban_logistics_commons.webp"),
          illust: asset("2050s/02. Industrial Urbanism/illust/urban logistics commons.webp"),
          diagrams: [{ title: "Logistics Flow Ticket", src: asset("2050s/02. Industrial Urbanism/Urban logistics commons/diagram/industrial_logistics_flow_ticket.webp") }],
        },
      ],
      2075: [
        {
          title: "Dark Factory",
          ko: "다크 팩토리",
          text: "Dark Factory is the re-absorption of shared production into a closed automated system. AI schedules, robotic assembly, automated quality inspection, unmanned storage, automatic packaging, power slots, material supply, logistics allocation, and work data are determined by algorithms.",
          policy: "AI Automated Production District Policy enables automated production in the name of efficiency and productivity, rather than correcting inequality.",
          video: asset("2075/02. Industrial Urbanism/dark factory/dark_factory_loop.mp4"),
          image: asset("2075/02. Industrial Urbanism/dark factory/2075_Industry_Darkfactory.webp"),
          illust: asset("2075/02. Industrial Urbanism/illust/2075 dark factory.webp"),
          diagrams: [{ title: "Factory Power Slot Permit", src: extraAsset("2075_dark_factory_power_slot.webp") }],
        },
        {
          title: "Urban Control Hub",
          ko: "도시 통제 허브",
          text: "Urban Control Hub is an invisible backend operating space where battery storage, robot charging, logistics sorting, energy allocation, sensor data, access records, and risk detection systems are concentrated.",
          policy: "Integrated Urban Operations Concession delegates backend operation to a public-private consortium, improving efficiency while concentrating control.",
          video: asset("2075/02. Industrial Urbanism/urban control hub/urban_control_hub_loop.mp4"),
          image: asset("2075/02. Industrial Urbanism/urban control hub/2075_Industryy_UrbanControlHub.webp"),
          illust: asset("2075/02. Industrial Urbanism/illust/2075 urban contol hub.webp"),
          diagrams: [],
        },
        {
          title: "Civic Factory",
          ko: "시민 공장",
          text: "Civic Factory preserves public industrial spaces for repair, assistive devices, household appliances, small robots, housing systems, tools, battery modules, and mobility aids. It becomes a civic line of defense for repair and technical access.",
          policy: "Civic Repair Infrastructure Designation preserves public production nodes even after Dark Factories take over the center of production.",
          video: "",
          image: asset("2075/02. Industrial Urbanism/civic factory/2075_Industry_civic factory.webp"),
          illust: asset("2075/02. Industrial Urbanism/illust/2075 civic factory.webp"),
          diagrams: [{ title: "Civic Factory Diagram", src: extraAsset("2075_civic_factory_diagram.webp") }],
        },
      ],
    },
  },
  residential: {
    no: "03",
    title: "Residential Adaptation",
    ko: "주거 적응",
    icon: Home,
    mapPoint: { left: "53%", top: "22%" },
    currentLabel: "Exposed Low-Rise Living Fabric",
    systems: { 2050: "Porous Strip / Market-Dwelling Block", 2075: "Inverted Ground City / Survival Ground City" },
    coreIdea: "Adaptive Housing examines how Sasang’s low-rise housing adapts to industrial edges, market-wrapped blocks, logistics flows, and everyday service demands.",
    coreTension: "Can housing remain a private living space, or will it become an adaptive interface for industry, markets, logistics, and services?",
    whySasang: [
      "Housing is directly exposed to industry and markets, including factories, warehouses, repair shops, markets, and alleys.",
      "Low-rise housing can physically adapt through alleys, rooftops, yards, façades, and ground floors more flexibly than apartment blocks.",
      "Everyday life is pressured by delivery, repair, laundry, waste, charging, food, and care services entering residential areas.",
    ],
    urbanEffects: ["Housing becomes an urban service interface", "Factory edges become porous boundaries", "Markets absorb domestic functions", "Alleys become service corridors", "Everyday life shifts upward"],
    currentStatus: "Sasang’s low-rise housing is directly attached to factories, warehouses, markets, alleys, loading spaces, and everyday service flows. This condition is unstable, but also adaptable through ground floors, alleys, yards, rooftops, and façades.",
    yearText: {
      2050: "By 2050, Residential Adaptation produces two types: Porous Strip beside industry and Market-Dwelling Block wrapped by markets. Housing becomes a living interface that absorbs environmental filters, utility alleys, shared services, and care infrastructures.",
      2075: "By 2075, ground-level alleys become machine and survival service layers while everyday life shifts upward to rooftops, decks, bridges, and care platforms.",
    },
    hero: {
      2050: { image: asset("2050s/03. Residential Urbanism/hero/2050_Residential_HEro.webp"), video: asset("2050s/03. Residential Urbanism/hero/residential_hero_2050_loop.mp4") },
      2075: { image: asset("2075/03. Residential Urbanism/hero/2075_Residential_Hero.webp"), video: asset("2075/03. Residential Urbanism/hero/residential_hero_2075_loop.mp4") },
    },
    current: {
      2050: [asset("2050s/03. Residential Urbanism/current/residential_2026_alley.webp"), asset("2050s/03. Residential Urbanism/current/residential_2026_factory_edge.webp"), asset("2050s/03. Residential Urbanism/current/residential_2026_ground_floor.webp"), asset("2050s/03. Residential Urbanism/satelite/residential_2026_living_fabric_satellite.webp")],
      2075: [extraAsset("2075_residential_2026_ground_floor.webp"), asset("2075/03. Residential Urbanism/current/residential_2026_alley.webp"), asset("2075/03. Residential Urbanism/current/residential_2026_factory_edge.webp")],
    },
    elements: {
      2050: [
        {
          title: "Porous Strip",
          ko: "다공성 경계 스트립",
          text: "The Porous Strip is a porous boundary placed between industrial areas and residential neighborhoods. In Sasang, factories, warehouses, logistics routes, low-rise housing, alleys, and markets directly touch each other, so this boundary cannot simply be a wall or green buffer. It becomes a linear device that translates selected industrial functions into everyday living functions through environmental filters, utility alleys, repair reception, parcel pickup, shared laundry, charging, and shared service yards.",
          policy: "Industrial-Residential Interface District operates factory-housing edges as porous boundaries with repair reception, parcel pickup, shared laundry, charging, public monitoring, and resident committees.",
          video: asset("2050s/03. Residential Urbanism/porous strip/porous_strip_loop.mp4"),
          image: asset("2050s/03. Residential Urbanism/porous strip/residential_porous_strip_2050.webp"),
          illust: asset("2050s/03. Residential Urbanism/illust/porous-strip-2050.webp"),
          diagrams: [
            { title: "Porous Strip Diagram", src: asset("2050s/03. Residential Urbanism/porous strip/diagram/residential_porous_strip_diagram.webp") },
            { title: "Porous Strip Policy", src: asset("2050s/03. Residential Urbanism/porous strip/diagram/residential_porous_strip_policy.webp") },
          ],
        },
        {
          title: "Market-Dwelling Block",
          ko: "시장-주거 블록",
          text: "Market-Dwelling Block is a housing type where low-rise housing blocks surrounded by markets adapt by reusing vacant shops, storage rooms, back alleys, and ground-floor spaces as living-service alleys. As population decline and aging weaken neighborhood services, the market compresses meals, laundry, repair, storage, pickup, medicine, and care around housing. Between the outer market layer and the inner housing block, a living-service alley emerges as local domestic infrastructure.",
          policy: "Market-Dwelling Living Service Alley Program converts market-adjacent residual spaces into basic living-service infrastructure with vouchers, price caps, and cooperative operation.",
          video: asset("2050s/03. Residential Urbanism/market dwelling block/market_dwelling_block_loop.mp4"),
          image: asset("2050s/03. Residential Urbanism/market dwelling block/residential_market_dwelling_2050.webp"),
          illust: asset("2050s/03. Residential Urbanism/illust/market-dwelling-block-2050.webp"),
          diagrams: [
            { title: "Market Dwelling Diagram", src: asset("2050s/03. Residential Urbanism/market dwelling block/diagram/residential_market_dwelling_diagram.webp") },
            { title: "Service Receipt", src: asset("2050s/03. Residential Urbanism/market dwelling block/diagram/residential_market_dwelling_receipt.webp") },
          ],
        },
      ],
      2075: [
        {
          title: "Inverted Ground City",
          ko: "역전된 지상 도시",
          text: "Ground-level alleys are occupied by robot delivery, waste collection, battery exchange, and maintenance carts. The old alley no longer functions as slow pedestrian space; everyday life moves upward to rooftop commons, bridge decks, elevated walkways, and care platforms.",
          policy: "Service Ground Operation Permit allows machine and service flows to use ground-level alleys by time slot, while requiring pedestrian-priority zones, robot circulation permits, and public safety managers.",
          video: asset("2075/03. Residential Urbanism/inverted ground city/inverted_ground_loop.mp4"),
          image: asset("2075/03. Residential Urbanism/inverted ground city/2075_Residential_inverted ground city.webp"),
          illust: asset("2075/03. Residential Urbanism/illust/inverted ground.webp"),
          diagrams: [
            { title: "Inverted Ground Diagram 01", src: extraAsset("2075_inverted_ground_diagram_01.webp") },
            { title: "Inverted Ground Diagram 02", src: extraAsset("2075_inverted_ground_diagram_02.webp") },
          ],
        },
        {
          title: "Survival Ground City",
          ko: "생존 지상 도시",
          text: "Former ground-floor homes, vacant shops, storage rooms, and back alleys become Survival Ground: cooling, meals, medicine storage, care check-ins, charging, and emergency power for elderly residents, single-person households, temporary users, and market vendors.",
          policy: "Residual Ground Tolerance shows how policy absence can leave ground floors as mixed spaces of low-cost temporary labor, residual services, waste movement, and low-cost staying.",
          video: asset("2075/03. Residential Urbanism/survival ground city/service_ground_city_loop.mp4"),
          image: asset("2075/03. Residential Urbanism/survival ground city/2075_Residential_Survivalgroundcity.webp"),
          illust: asset("2075/03. Residential Urbanism/illust/survival ground.webp"),
          diagrams: [],
        },
      ],
    },
  },
  energy: {
    no: "04",
    title: "Energy Urbanism",
    ko: "에너지 도시성",
    icon: BatteryCharging,
    mapPoint: { left: "22%", top: "45%" },
    currentLabel: "Residual Infrastructure as Energy Surface",
    systems: { 2050: "Energy Retrofit Belt / Elevated Energy Deck", 2075: "Urban Energy Belt / Energy Rights Market" },
    coreIdea: "Energy Urbanism examines how Sasang’s river edge, elevated roads, factory roofs, warehouses, and leftover infrastructure can become systems for producing, storing, and distributing urban energy.",
    coreTension: "Can energy infrastructure remain a shared support system, or will energy access become a new urban hierarchy?",
    whySasang: [
      "Sasang has long linear infrastructure: the Nakdong River edge, levees, riverside roads, and elevated roads can become continuous energy belts.",
      "Underused surfaces can be reused: factory roofs, warehouse roofs, under-road spaces, leftover industrial sites, and riverfront gaps can hold solar panels, batteries, charging nodes, and decks.",
      "Energy demand is concentrated in factories, logistics, transfer hubs, markets, housing, cooling, charging, and care services.",
    ],
    urbanEffects: ["Energy becomes an operating condition", "Charging and cooling become prioritized", "Factories compete with civic survival", "Energy rights create new inequality"],
    currentStatus: "Energy Urbanism begins with underused infrastructure surfaces such as elevated roads, spaces under roads, river edges, levees, and residual spaces along the Nakdong River. These surfaces can be reinterpreted for energy production, storage, and distribution.",
    yearText: {
      2050: "By 2050, Elevated Energy Deck transforms elevated roads, under-road spaces, and leftover mobility infrastructure into solar canopies, battery exchange stations, electric-cart charging areas, logistics-robot charging nodes, and micromobility staging spaces.",
      2075: "By 2075, the Urban Energy Belt and Energy Rights Market transform energy into a rights system. Charging rights, refrigeration rights, factory power slots, residential cooling energy, and emergency power access are traded or allocated by time slot.",
    },
    hero: {
      2050: { image: asset("2050s/04. Energy Urbanism/hero/energy_2050_retrofit_belt_hero.webp"), video: asset("2050s/04. Energy Urbanism/hero/energy_hero_2050_loop.mp4") },
      2075: { image: asset("2075/04. Energy Urbanism/hero/2075_Energy_Hero.webp"), video: asset("2075/04. Energy Urbanism/hero/energy_hero_2075_loop.mp4") },
    },
    current: {
      2050: [asset("2050s/04. Energy Urbanism/current/energy_2026_elevated_road.webp"), asset("2050s/04. Energy Urbanism/current/energy_2026_river_edge.webp"), asset("2050s/04. Energy Urbanism/current/energy_2026_under_road.webp"), asset("2050s/04. Energy Urbanism/satelite/energy_2026_residual_surface_satellite.webp")],
      2075: [asset("2075/04. Energy Urbanism/current/energy_2026_elevated_road.webp"), asset("2075/04. Energy Urbanism/current/energy_2026_river_edge.webp"), asset("2075/04. Energy Urbanism/current/energy_2026_under_road.webp")],
    },
    elements: {
      2050: [
        {
          title: "Elevated Energy Deck",
          ko: "고가 에너지 데크",
          text: "Elevated Energy Deck transforms elevated roads, spaces under roads, and leftover mobility infrastructure into surfaces for energy production, charging, and storage. Existing elevated infrastructure once divided the city and created shadows, leftover spaces, service edges, and fragmented ground. By 2050 it becomes a linear energy deck combining solar canopies, battery exchange stations, electric-cart charging, logistics-robot charging nodes, and micromobility staging spaces where Sasang’s mobility flows and energy flows meet.",
          policy: "Elevated Energy Deck Conversion Program converts under-road and leftover mobility infrastructure into energy production, charging, storage, and staging spaces.",
          video: asset("2050s/04. Energy Urbanism/elevated energy deck/elevated_energy_deck_loop.mp4"),
          image: asset("2050s/04. Energy Urbanism/elevated energy deck/energy_2050_elevated_energy_deck.webp"),
          illust: asset("2050s/04. Energy Urbanism/illust/elevated energy deck.webp"),
          diagrams: [],
        },
      ],
      2075: [
        {
          title: "Urban Energy Belt",
          ko: "도시 에너지 벨트",
          text: "Residual infrastructures across the city—elevated roads, abandoned rail lines, vacant plots, and factory rooftops—are converted into systems for energy production and storage. They become technical grounds that store and allocate energy for factories, housing blocks, and services.",
          policy: "The Urban Energy Belt reorganizes obsolete infrastructure into a new apparatus for managing energy rights and resource distribution.",
          video: asset("2075/04. Energy Urbanism/energy belt/urban_energy_belt_loop.mp4"),
          image: asset("2075/04. Energy Urbanism/energy belt/2075_Energy_energybelt.webp"),
          illust: asset("2075/04. Energy Urbanism/illust/energy belt.webp"),
          diagrams: [],
        },
        {
          title: "Energy Rights Market",
          ko: "에너지 권리 시장",
          text: "Charging rights, refrigeration rights, factory power slots, residential cooling energy, and emergency power access are traded by time slot. What is traded is not electricity itself, but the right to use electricity.",
          policy: "Energy Access Trading Platform increases flexibility while also marketizing energy access rights and producing new inequality.",
          video: asset("2075/04. Energy Urbanism/energy market/river_energy_market_loop.mp4"),
          image: asset("2075/04. Energy Urbanism/energy market/2075_Energy_energymarket.webp"),
          illust: asset("2075/04. Energy Urbanism/illust/energy market.webp"),
          diagrams: [],
        },
      ],
    },
  },
};

function Intro({ onEnter }) {
  const BOOT_MESSAGES = [
    "INITIALIZING SASANG OS...",
    "CHECKING SPATIAL ACCESS...",
    "LOADING URBAN PROTOCOLS...",
    "PREPARING OPERATING MANUAL...",
  ];

  const COPY = {
    en: {
      languageTitle: "Select Language",
      languageSub: "Choose the language for the Sasang Operating Manual.",
      introKicker: "USER MANUAL",
      introTitle: "Sasang Operating Manual",
      introBody: [
        "Sasang Operating Manual is a future urban manual web application for users who plan to visit, live in, pass through, or work in Sasang-gu, Busan.",
        "This application guides users through Sasang in 2050 and 2075, focusing on mobility, industry, residential adaptation, and energy systems.",
        "Users can access each urban system through map, article, and film modes.",
      ],
      continue: "Continue",
      accessKicker: "ACCESS POINT",
      accessTitle: "How would you like to enter Sasang?",
      accessSub: "Choose a year and a medium. Map explores the operating system, Article reads the scenario, and Film plays the manual video.",
      back: "Back",
      entering: {
        map2050: "ENTERING 2050 MAP MODE...",
        article2050: "LOADING 2050 ARTICLE MODE...",
        film2050: "OPENING 2050 MANUAL FILM...",
        map2075: "VERIFYING 2075 MAP ACCESS...",
        article2075: "LOADING 2075 ARTICLE MODE...",
        film2075: "OPENING 2075 MANUAL FILM...",
      },
      modes: [
        { year: 2050, view: "map", mode: "Map Mode", cta: "Enter", desc: "Explore scenario sectors through the operating map." },
        { year: 2050, view: "article", mode: "Article Mode", cta: "Read", desc: "Read the 2050 scenario as a structured visual article." },
        { year: 2050, view: "film", mode: "Manual Film", cta: "Play", desc: "Watch the 2050 manual film inside this site." },
        { year: 2075, view: "map", mode: "Map Mode", cta: "Enter", desc: "Explore the 2075 rights-based urban system." },
        { year: 2075, view: "article", mode: "Article Mode", cta: "Read", desc: "Read the 2075 scenario as a structured visual article." },
        { year: 2075, view: "film", mode: "Manual Film", cta: "Play", desc: "Watch the 2075 manual film inside this site." },
      ],
    },
    ko: {
      languageTitle: "언어를 선택하세요",
      languageSub: "Sasang Operating Manual의 사용 언어를 선택하세요.",
      introKicker: "사용자 안내",
      introTitle: "Sasang Operating Manual",
      introBody: [
        "Sasang Operating Manual은 부산 사상구를 방문하거나, 거주하거나, 통과하거나, 일할 계획이 있는 사용자를 위한 미래 도시 매뉴얼 웹앱입니다.",
        "이 앱은 2050년과 2075년의 사상구를 이동, 산업, 주거, 에너지 시스템을 중심으로 안내합니다.",
        "사용자는 지도, 기사, 영상 모드를 통해 각 시점의 도시 시스템에 접속할 수 있습니다.",
      ],
      continue: "계속하기",
      accessKicker: "접속 지점",
      accessTitle: "어떤 방식으로 사상구에 접속하시겠습니까?",
      accessSub: "연도와 매체를 선택하세요. Map은 운영 시스템을 탐색하고, Article은 시나리오를 읽고, Film은 매뉴얼 영상을 재생합니다.",
      back: "뒤로",
      entering: {
        map2050: "2050 MAP MODE에 접속 중...",
        article2050: "2050 ARTICLE MODE 로딩 중...",
        film2050: "2050 MANUAL FILM 실행 중...",
        map2075: "2075 MAP 접근 권한 확인 중...",
        article2075: "2075 ARTICLE MODE 로딩 중...",
        film2075: "2075 MANUAL FILM 실행 중...",
      },
      modes: [
        { year: 2050, view: "map", mode: "Map Mode", cta: "Enter", desc: "운영 맵을 통해 시나리오 섹터를 탐색합니다." },
        { year: 2050, view: "article", mode: "Article Mode", cta: "Read", desc: "2050 시나리오를 구조화된 기사형 화면으로 읽습니다." },
        { year: 2050, view: "film", mode: "Manual Film", cta: "Play", desc: "웹앱 안에서 2050 매뉴얼 영상을 봅니다." },
        { year: 2075, view: "map", mode: "Map Mode", cta: "Enter", desc: "2075 권리 기반 도시 시스템을 탐색합니다." },
        { year: 2075, view: "article", mode: "Article Mode", cta: "Read", desc: "2075 시나리오를 구조화된 기사형 화면으로 읽습니다." },
        { year: 2075, view: "film", mode: "Manual Film", cta: "Play", desc: "웹앱 안에서 2075 매뉴얼 영상을 봅니다." },
      ],
    },
  };

  const [step, setStep] = useState("boot");
  const [bootIndex, setBootIndex] = useState(0);
  const [lang, setLang] = useState("en");
  const [entering, setEntering] = useState(null);
  const copy = COPY[lang];

  React.useEffect(() => {
    if (step !== "boot") return undefined;
    if (bootIndex < BOOT_MESSAGES.length - 1) {
      const timer = window.setTimeout(() => setBootIndex((prev) => prev + 1), 680);
      return () => window.clearTimeout(timer);
    }
    const timer = window.setTimeout(() => setStep("language"), 900);
    return () => window.clearTimeout(timer);
  }, [step, bootIndex]);

  const enterMode = (item) => {
    const key = `${item.view}${item.year}`;
    setEntering({ ...item, text: copy.entering[key] });
    setStep("entering");
    window.setTimeout(() => onEnter(item.year, item.view, lang), 980);
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
              {BOOT_MESSAGES.slice(0, bootIndex + 1).map((message, index) => (
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
                animate={{ width: `${((bootIndex + 1) / BOOT_MESSAGES.length) * 100}%` }}
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
                onClick={() => {
                  setLang("en");
                  setStep("intro");
                }}
                className="rounded-full border border-white/15 bg-white px-8 py-3 font-mono text-xs uppercase tracking-[0.18em] text-black transition hover:scale-[1.03]"
              >
                ENG
              </button>
              <button
                onClick={() => {
                  setLang("ko");
                  setStep("intro");
                }}
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
              {copy.introBody.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <div className="mt-8 grid gap-px overflow-hidden rounded-[1.4rem] border border-white/10 bg-white/10 md:grid-cols-3">
              <div className="bg-black/75 p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">System Range</p>
                <p className="mt-2 text-sm text-white/80">2050 / 2075</p>
              </div>
              <div className="bg-black/75 p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">Entry Modes</p>
                <p className="mt-2 text-sm text-white/80">Map · Article · Film</p>
              </div>
              <div className="bg-black/75 p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">Location</p>
                <p className="mt-2 text-sm text-white/80">Sasang-gu, Busan</p>
              </div>
            </div>
            <button
              onClick={() => setStep("access")}
              className="mt-8 rounded-full border border-white/15 bg-white px-6 py-3 font-mono text-xs uppercase tracking-[0.16em] text-black transition hover:scale-[1.02]"
            >
              {copy.continue}
            </button>
          </motion.section>
        )}

        {step === "access" && (
          <motion.section
            key="access"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.45 }}
            className="relative w-[min(96vw,1080px)] rounded-[2rem] border border-white/10 bg-black/70 p-6 shadow-2xl backdrop-blur-xl md:p-9"
          >
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/45">{copy.accessKicker}</p>
                <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[0.98] tracking-[-0.06em] md:text-6xl">
                  {copy.accessTitle}
                </h1>
                <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/55">{copy.accessSub}</p>
              </div>
              <button
                onClick={() => setStep("intro")}
                className="w-fit rounded-full border border-white/15 px-4 py-2 text-xs text-white/55 transition hover:border-white/35 hover:text-white"
              >
                {copy.back}
              </button>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {copy.modes.map((item) => {
                const isLight = item.year === 2050;
                return (
                  <button
                    key={`${item.year}-${item.view}`}
                    onClick={() => enterMode(item)}
                    className={cx(
                      "group min-h-[205px] rounded-[1.8rem] border p-6 text-left transition hover:-translate-y-1 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white/70",
                      isLight
                        ? "border-white/15 bg-white text-black"
                        : "border-white/15 bg-white/[0.055] text-white hover:bg-white/10"
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className={cx("font-mono text-xs uppercase tracking-[0.22em]", isLight ? "text-black/45" : "text-white/45")}>{item.year}</p>
                      <ArrowUpRight size={18} className={cx("transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5", isLight ? "text-black/45" : "text-white/45")} />
                    </div>
                    <h2 className="mt-10 text-3xl font-semibold tracking-[-0.05em]">{item.mode}</h2>
                    <p className={cx("mt-4 text-sm leading-relaxed", isLight ? "text-black/55" : "text-white/55")}>{item.desc}</p>
                    <div className={cx("mt-6 inline-flex rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.16em]", isLight ? "border-black/10 bg-black/5 text-black/65" : "border-white/15 bg-white/[0.05] text-white/65")}>
                      {item.cta}
                    </div>
                  </button>
                );
              })}
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
            <p className="whitespace-pre-line font-mono text-sm leading-7 tracking-[0.08em] text-white/85 md:text-base">
              {entering?.text ?? "LOADING..."}
              <span className="ml-1 animate-pulse">_</span>
            </p>
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





const DRIVER_METHOD = [
  {
    id: "aging",
    label: "Aging / Pension",
    role: "Pressure Source",
    score: "I/D 18/9 · Net +9",
    sectors: ["transfer", "residential"],
    machines: ["Access Deficit", "Support Gap"],
    text: "Aging is the strongest social pressure source. It increases mobility vulnerability, welfare demand, care-service burdens, and the need for neighborhood-level support.",
  },
  {
    id: "culture",
    label: "Culture",
    role: "Peripheral / Support Variable",
    score: "I/D 10/11",
    sectors: ["transfer", "residential"],
    machines: ["Support Gap"],
    text: "Culture is not the strongest driver, but it shapes how public interfaces, waiting areas, language support, and everyday services must respond to diverse users.",
  },
  {
    id: "education",
    label: "Education",
    role: "Support Variable",
    score: "I/D 12/13",
    sectors: ["industrial"],
    machines: ["Precarious Settlement", "Support Gap"],
    text: "Education links international students, migrant users, technical training, and certification. It becomes the basis for Industrial Learning Commons and technical access.",
  },
  {
    id: "energy",
    label: "Energy / Environment",
    role: "Specialized Structural Factor",
    score: "I/D 9/11",
    sectors: ["industrial", "energy"],
    machines: ["Energy Burden"],
    text: "Industrial and logistics activities generate energy demand and environmental burden. Energy regulation and distributed power reshape factories and infrastructure surfaces.",
  },
  {
    id: "finance",
    label: "Finance / Governance",
    role: "Coordinator",
    score: "I/D 18/14 · Net +4",
    sectors: ["transfer", "industrial", "residential", "energy"],
    machines: ["Access Deficit", "Support Gap", "Energy Burden"],
    text: "Finance and governance coordinate transport, housing, welfare, industrial policy, and energy systems. They do not create a sector alone, but determine how each sector can operate.",
  },
  {
    id: "migration",
    label: "Migration",
    role: "Bridge Variable",
    score: "I/D 15/14 · Net +1",
    sectors: ["industrial", "transfer", "residential"],
    machines: ["Precarious Settlement"],
    text: "Migration is tied to foreign labor, multicultural families, students, and language support. It connects industrial labor, education, housing pressure, and transfer services.",
  },
  {
    id: "mobility",
    label: "Mobility",
    role: "Structural Core",
    score: "I/D 17/19",
    sectors: ["transfer", "industrial", "residential"],
    machines: ["Hub Pressure", "Connectivity Gap", "Access Deficit"],
    text: "Mobility is a structural core. Sasang Station, terminal, roads, rail, logistics, and walking routes organize the city while fragmented urban form constrains accessibility.",
  },
  {
    id: "realestate",
    label: "Real Estate",
    role: "Receiver",
    score: "I/D 13/19 · Net -6",
    sectors: ["transfer", "residential", "industrial"],
    machines: ["Hub Pressure", "Precarious Settlement"],
    text: "Real estate receives pressure from mobility, migration, industry, and urban form. It translates system pressure into rent, redevelopment, displacement, and land-value change.",
  },
  {
    id: "trade",
    label: "Trade / Industry",
    role: "Structural Core",
    score: "I/D 18/17",
    sectors: ["industrial", "energy", "transfer"],
    machines: ["Energy Burden", "Precarious Settlement"],
    text: "Trade, logistics, and industry are central to Sasang. They sustain production and logistics, but also produce energy demand, robot zones, industrial sovereignty, and control hubs.",
  },
  {
    id: "urbanform",
    label: "Urban Form",
    role: "Structural Core",
    score: "I/D 17/18",
    sectors: ["transfer", "residential", "energy", "industrial"],
    machines: ["Connectivity Gap", "Hub Pressure"],
    text: "Urban form is both cause and outcome. Fragmented roads, rail lines, low-rise fabric, industrial alleys, river edges, and elevated roads define where collisions become spatial scenarios.",
  },
  {
    id: "policy",
    label: "Policy / Planning",
    role: "Implementation Lens",
    score: "Policy layer",
    sectors: ["transfer", "industrial", "residential", "energy"],
    machines: ["Public Correction", "Rights Allocation"],
    text: "Policy is added as an implementation lens: it turns scenario devices into operating programs, permissions, concessions, public obligations, or corrective rights systems.",
  },
];

const DRIVER_SECTOR_PATHS = {
  transfer: "Mobility + Urban Form + Real Estate → Fragmented Transfer Concentration → Transfer City",
  industrial: "Trade / Industry + Energy + Finance + Migration → Residual Industrial Fabric → Industrial Urbanism",
  residential: "Aging + Migration + Real Estate + Urban Form → Mixed Low-Rise Living Fabric → Residential Adaptation",
  energy: "Trade / Industry + Energy + Finance + Urban Form → Underused Infrastructure Surfaces → Energy Urbanism",
};

const DRIVER_CONNECTIONS = {
  aging: ["Finance / Governance", "Mobility", "Education", "Urban Form"],
  culture: ["Migration", "Education", "Residential Adaptation", "Transfer Services"],
  education: ["Migration", "Finance / Governance", "Industrial Learning Commons"],
  energy: ["Trade / Industry", "Finance / Governance", "Urban Form", "Energy Urbanism"],
  finance: ["Aging / Pension", "Mobility", "Real Estate", "Urban Form", "Energy / Environment"],
  migration: ["Education", "Trade / Industry", "Real Estate", "Residential Adaptation"],
  mobility: ["Real Estate", "Trade / Industry", "Urban Form", "Finance / Governance"],
  realestate: ["Mobility", "Migration", "Urban Form", "Industrial Urbanism"],
  trade: ["Energy / Environment", "Migration", "Mobility", "Urban Form"],
  urbanform: ["Mobility", "Real Estate", "Finance / Governance", "Energy / Environment"],
  policy: ["Finance / Governance", "Public Correction", "Access Rights", "Operating Programs"],
};

const METHOD_STAGES = [
  {
    no: "01",
    title: "Filtered Pressure",
    text: "Weighted relationships are filtered by statistics, theory, spatial evidence, and policy evidence.",
  },
  {
    no: "02",
    title: "System Roles",
    text: "Each driver receives a role based on influence, dependence, net effect, and centrality.",
  },
  {
    no: "03",
    title: "Causal Machines",
    text: "Strong relations are reorganized into machines such as Access Deficit, Hub Pressure, Energy Burden, and Connectivity Gap.",
  },
  {
    no: "04",
    title: "Spatial Collisions",
    text: "Causal machines collide with Sasang's transfer hub, industrial fabric, low-rise housing, and residual infrastructure.",
  },
  {
    no: "05",
    title: "Scenario Sectors",
    text: "Spatial collisions are translated into Transfer City, Industrial Urbanism, Residential Adaptation, and Energy Urbanism.",
  },
];




const DRIVER_MATRIX = {
  aging: { no: 1, influence: 18, dependence: 9, net: 9, centrality: 27, rank: "Pressure Source", matrix: "High effect on mobility, finance, urban form, and care demand." },
  culture: { no: 2, influence: 10, dependence: 11, net: -1, centrality: 21, rank: "Peripheral / Support", matrix: "Moderates language, services, and cultural access but does not dominate the system." },
  education: { no: 3, influence: 12, dependence: 13, net: -1, centrality: 25, rank: "Support Variable", matrix: "Connects migration, finance, and industrial training." },
  energy: { no: 4, influence: 9, dependence: 11, net: -2, centrality: 20, rank: "Specialized Structural Factor", matrix: "Concentrates around industrial demand, charging, waste heat, and environmental burden." },
  finance: { no: 5, influence: 16, dependence: 16, net: 0, centrality: 32, rank: "Coordinator", matrix: "Translates pressures into implementable policy, budgets, rights, and concessions." },
  migration: { no: 6, influence: 14, dependence: 15, net: -1, centrality: 29, rank: "Bridge Variable", matrix: "Links labor, education, housing, and service access." },
  mobility: { no: 7, influence: 17, dependence: 19, net: -2, centrality: 36, rank: "Structural Core", matrix: "Links transfer concentration, real estate, industry, and urban form." },
  realestate: { no: 8, influence: 11, dependence: 17, net: -6, centrality: 28, rank: "Receiver", matrix: "Receives pressure from mobility, migration, industry, and urban form." },
  trade: { no: 9, influence: 18, dependence: 17, net: 1, centrality: 35, rank: "Structural Core", matrix: "Industrial systems strongly interact with migration, energy, mobility, and urban form." },
  urbanform: { no: 10, influence: 19, dependence: 18, net: 1, centrality: 37, rank: "Structural Core", matrix: "Spatially organizes all other drivers through roads, rails, low-rise fabric, and residual infrastructure." },
  policy: { no: 11, influence: 16, dependence: 14, net: 2, centrality: 30, rank: "Implementation Lens", matrix: "Governs permissions, public corrections, access rights, and operational rules." },
};

const DRIVER_RELATIONS = {
  aging: ["Mobility → access vulnerability", "Finance → welfare burden", "Urban Form → care proximity"],
  culture: ["Migration → language interface", "Transfer → civic services", "Housing → everyday adaptation"],
  education: ["Migration → training demand", "Industry → certification", "Finance → support program"],
  energy: ["Trade/Industry → power demand", "Urban Form → residual surfaces", "Finance → concession control"],
  finance: ["Aging → welfare budget", "Mobility → transfer investment", "Energy → rights market"],
  migration: ["Education → language/training", "Trade/Industry → labor", "Residential → settlement"],
  mobility: ["Real Estate → hub premium", "Trade/Industry → logistics", "Urban Form → fragmentation"],
  realestate: ["Mobility → value concentration", "Migration → rental demand", "Urban Form → redevelopment"],
  trade: ["Energy → industrial load", "Migration → labor supply", "Mobility → logistics spine"],
  urbanform: ["Mobility → divided access", "Real Estate → pressure", "Energy → retrofit surfaces"],
  policy: ["Finance → execution", "Access Rights → allocation", "Public Correction → limits"],
};

const DRIVER_IMPORTANCE = {
  aging: { filtered: 92, role: 88, machine: 76, collision: 72, sector: 70, total: 84 },
  culture: { filtered: 46, role: 42, machine: 38, collision: 48, sector: 52, total: 45 },
  education: { filtered: 58, role: 54, machine: 62, collision: 56, sector: 64, total: 59 },
  energy: { filtered: 74, role: 66, machine: 86, collision: 80, sector: 88, total: 79 },
  finance: { filtered: 82, role: 90, machine: 78, collision: 84, sector: 86, total: 84 },
  migration: { filtered: 68, role: 72, machine: 70, collision: 74, sector: 76, total: 72 },
  mobility: { filtered: 94, role: 96, machine: 88, collision: 92, sector: 90, total: 92 },
  realestate: { filtered: 70, role: 62, machine: 66, collision: 78, sector: 72, total: 70 },
  trade: { filtered: 86, role: 88, machine: 84, collision: 82, sector: 86, total: 85 },
  urbanform: { filtered: 90, role: 92, machine: 82, collision: 96, sector: 94, total: 91 },
  policy: { filtered: 76, role: 82, machine: 80, collision: 84, sector: 88, total: 82 },
};

const DRIVER_STEP_DETAILS = {
  aging: {
    filtered: "High pressure from demographic aging is filtered as a social demand for care, mobility support, and welfare spending.",
    role: "Pressure Source: Aging has high influence but relatively low dependence, so it pushes other systems rather than only receiving pressure.",
    machine: "Access Deficit + Support Gap: aging turns fragmented mobility and weak neighborhood services into a direct everyday problem.",
    collision: "Mixed low-rise living fabric and fragmented transfer concentration, where elderly movement, waiting, and support needs overlap.",
    sector: "Transfer City and Residential Adaptation: transfer spaces become civic support interiors, while housing edges absorb care and living services.",
  },
  culture: {
    filtered: "Cultural diversity appears as a softer but persistent pressure on public interfaces, language systems, and shared urban services.",
    role: "Supporting Variable: culture does not dominate the matrix, but modifies how other drivers are experienced by users.",
    machine: "Support Gap: different users need different languages, information formats, and service access points.",
    collision: "Transfer nodes and market-housing areas where diverse users overlap in the same everyday infrastructure.",
    sector: "Transfer City and Residential Adaptation: civic concourses, living-service alleys, and market interfaces become cultural translation spaces.",
  },
  education: {
    filtered: "Education is filtered through migration, international students, technical training, and the decline/reorganization of local institutions.",
    role: "Supporting Variable: education connects social change to technical access rather than acting alone.",
    machine: "Precarious Settlement + Support Gap: learning, certification, and language support determine who can enter industrial systems.",
    collision: "Residual industrial fabric where old machines, skills, and migrant labor meet new training demands.",
    sector: "Industrial Urbanism: Industrial Learning Commons turns remaining factory knowledge into technical literacy infrastructure.",
  },
  energy: {
    filtered: "Energy pressure emerges from industrial demand, logistics, cooling, charging, environmental burden, and distributed-energy policy.",
    role: "Specialized Structural Factor: energy is not everywhere visually dominant, but it controls whether other systems can operate.",
    machine: "Energy Burden: factories, logistics, transfer hubs, housing, and care facilities compete for local power and cooling.",
    collision: "Underused infrastructure surfaces: river edges, elevated roads, factory roofs, and residual land become energy surfaces.",
    sector: "Energy Urbanism: residual infrastructure is retrofitted into energy decks, belts, storage surfaces, and later energy rights markets.",
  },
  finance: {
    filtered: "Finance/governance is filtered as the ability to coordinate transport, welfare, housing, industrial policy, and energy programs.",
    role: "Coordinator: finance has high influence and mediates implementation across multiple systems.",
    machine: "Access Deficit + Energy Burden + Support Gap: governance decides whether pressure becomes public infrastructure or privatized access.",
    collision: "All four spatial collision types, because policy tools shape transfer, industry, housing, and energy simultaneously.",
    sector: "All sectors: finance/governance converts scenario devices into plans, concessions, permits, public obligations, or rights systems.",
  },
  migration: {
    filtered: "Migration is filtered through foreign labor, multicultural households, international students, language support, and housing demand.",
    role: "Bridge Variable: migration links labor, education, housing, and service access.",
    machine: "Precarious Settlement: movement of people is directly tied to industrial maintenance and everyday support infrastructure.",
    collision: "Residual industrial fabric and mixed low-rise living fabric where labor, housing, and services are compressed.",
    sector: "Industrial Urbanism, Transfer City, and Residential Adaptation: migration produces technical education, civic support, and adaptive living services.",
  },
  mobility: {
    filtered: "Mobility is filtered through rail, terminal, roads, buses, taxis, logistics, walking routes, and station-area concentration.",
    role: "Structural Core: mobility has high centrality and reorganizes land value, industry, urban form, and accessibility.",
    machine: "Hub Pressure + Connectivity Gap + Access Deficit: the hub concentrates movement while fragmented fabric blocks equal access.",
    collision: "Fragmented transfer concentration around Sasang Station and surrounding terminal/road systems.",
    sector: "Transfer City first, then Industrial Urbanism and Residential Adaptation through logistics and service flows.",
  },
  realestate: {
    filtered: "Real estate is filtered as land value pressure, redevelopment pressure, rent, displacement, and market-housing transformation.",
    role: "Receiver: it receives strong pressure from mobility, migration, industry, and urban form.",
    machine: "Hub Pressure + Precarious Settlement: accessibility and redevelopment pressure reshape who can stay near services and work.",
    collision: "Mixed low-rise living fabric and remaining industrial fabric where property pressure meets everyday survival and production.",
    sector: "Residential Adaptation and Industrial Urbanism: housing and factories mutate under rent, vacancy, and redevelopment pressure.",
  },
  trade: {
    filtered: "Trade/industry is filtered through factories, warehouses, repair shops, logistics, loading spaces, and industrial decline/regeneration.",
    role: "Structural Core: industry remains one of Sasang's strongest operating systems.",
    machine: "Energy Burden + Precarious Settlement: production and logistics demand energy, labor, access control, and service infrastructure.",
    collision: "Residual industrial fabric embedded between housing, markets, roads, and transfer nodes.",
    sector: "Industrial Urbanism and Energy Urbanism: factories become commons, control hubs, dark factories, and energy-demand actors.",
  },
  urbanform: {
    filtered: "Urban form is filtered through rail lines, arterial roads, low-rise fabric, industrial alleys, river edges, and elevated roads.",
    role: "Structural Core: urban form is both a cause and an outcome of the system.",
    machine: "Connectivity Gap + Hub Pressure: fragmentation shapes mobility, land value, housing exposure, and infrastructure reuse.",
    collision: "All spatial collisions: transfer concentration, industrial fabric, low-rise living fabric, and underused surfaces.",
    sector: "All sectors: urban form decides where future systems attach, stack, invert, or become rights-based.",
  },
  policy: {
    filtered: "Policy/planning is filtered as the layer that turns scenario devices into permissions, programs, obligations, and corrective rights.",
    role: "Implementation Lens: policy is not a normal driver in the original matrix, but it determines how futures become operational.",
    machine: "Public Correction + Rights Allocation: policy can either enable unequal systems or correct their impacts.",
    collision: "Every collision point, because implementation determines who can access the infrastructure.",
    sector: "All sectors: transfer rights, industrial concessions, service-ground permits, and energy-access platforms are policy devices.",
  },
};



function GlobalStyle() {
  return (
    <style>{`
      @import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css");
      html, body, #root {
        font-family: "Pretendard", -apple-system, BlinkMacSystemFont, system-ui, "Segoe UI", sans-serif;
      }
      .font-mono {
        font-family: "SF Mono", "SFMono-Regular", ui-monospace, Menlo, Monaco, Consolas, monospace;
      }
    `}</style>
  );
}

function FallbackImage({ sources, alt, className = "" }) {
  const safeSources = Array.isArray(sources) ? sources.filter(Boolean) : [sources].filter(Boolean);
  const [index, setIndex] = useState(0);
  const src = safeSources[index];

  if (!src) {
    return (
      <div className={cx("flex min-h-[420px] items-center justify-center bg-black text-white/55", className)}>
        <div className="max-w-md p-6 text-center">
          <p className="text-sm font-medium">Map image not found</p>
          <p className="mt-2 text-xs leading-5 text-white/35">No map source was provided.</p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => {
        if (index < safeSources.length - 1) setIndex(index + 1);
      }}
    />
  );
}


function ThemePanel({ children, dark, className = "" }) {
  return (
    <div
      className={cx(
        "rounded-[32px] border shadow-[0_20px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl",
        dark ? "border-white/10 bg-white/[0.075] text-white shadow-black/30" : "border-white/80 bg-white/74 text-black",
        className
      )}
    >
      {children}
    </div>
  );
}

function TopNav({ view, setView, year, setYear, showKo, setShowKo }) {
  const dark = Number(year) === 2075;
  const navItems = [
    ["map", "Map"],
    ["article", "Article"],
    ["film", "Film"],
    ["method", "Method"],
  ];

  return (
    <header
      className="sticky top-0 z-[300] border-b backdrop-blur-xl"
      style={{
        backgroundColor: dark ? "rgba(5,5,6,.88)" : "rgba(245,245,247,.86)",
        borderColor: dark ? "rgba(255,255,255,.10)" : "rgba(0,0,0,.08)",
        color: dark ? "#fff" : "#000",
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <button onClick={() => setView("map")} className="flex items-center gap-2 text-sm font-semibold">
          <Sparkles size={18} />
          <span className="hidden sm:inline">Sasang OS</span>
        </button>

        <nav className="flex items-center gap-1 rounded-full p-1" style={{ backgroundColor: dark ? "rgba(255,255,255,.08)" : "rgba(0,0,0,.045)" }}>
          {navItems.map(([id, label]) => (
            <button
              key={id}
              onClick={() => setView(id)}
              className="rounded-full px-3 py-2 text-sm font-medium transition"
              style={{
                backgroundColor: view === id ? (dark ? "#fff" : "#000") : "transparent",
                color: view === id ? (dark ? "#000" : "#fff") : (dark ? "rgba(255,255,255,.78)" : "rgba(0,0,0,.72)"),
              }}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <YearSwitch year={year} dark={dark} setYear={(next) => setYear(Number(next))} compact />
          <button
            onClick={() => setShowKo((v) => !v)}
            className="hidden rounded-full px-3 py-2 text-sm font-medium sm:block"
            style={{ backgroundColor: dark ? "rgba(255,255,255,.09)" : "rgba(0,0,0,.045)", color: dark ? "#fff" : "#000" }}
          >
            {showKo ? "EN" : "KR"}
          </button>
        </div>
      </div>
    </header>
  );
}


function YearSwitch({ year, setYear, dark }) {
  return (
    <div className={cx("inline-flex rounded-full border p-1", dark ? "border-white/10 bg-white/10" : "border-black/5 bg-black/[0.035]")}>
      {[2050, 2075].map((item) => (
        <button
          key={item}
          onClick={() => setYear(item)}
          className={cx(
            "rounded-full px-4 py-2 text-sm transition",
            Number(year) === item ? (item === 2075 ? "bg-black text-white shadow-lg" : "bg-white text-black shadow-lg") : dark ? "text-white/45 hover:text-white" : "text-black/45 hover:text-black"
          )}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

function Media({ src, fallback, title, className = "", fit = "cover", isHero = false, dark = false }) {
  const [failed, setFailed] = useState(false);
  const isVideo = src && src.toLowerCase().endsWith(".mp4") && !failed;
  return (
    <div className={cx("relative overflow-hidden rounded-[28px] bg-black", className)}>
      {isVideo ? (
        <video
          src={src}
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          onError={() => setFailed(true)}
          className={cx("h-full w-full", fit === "contain" ? "object-contain" : "object-cover")}
        />
      ) : fallback ? (
        <img src={fallback} alt={title} className={cx("h-full w-full", fit === "contain" ? "object-contain" : "object-cover")} />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-white/45">
          <div className="text-center">
            <Film className="mx-auto mb-3" size={28} />
            <p className="text-sm">{title}</p>
          </div>
        </div>
      )}
      {isHero && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/76 via-black/25 to-transparent p-6 text-white md:p-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">Autoplay Loop / Hero</p>
          <h2 className="mt-2 text-4xl font-semibold tracking-[-0.055em] md:text-6xl">{title}</h2>
        </div>
      )}
    </div>
  );
}

function MapMode({ year, setYear, showKo }) {
  const dark = Number(year) === 2075;
  const [selectedPurpose, setSelectedPurpose] = useState("transfer");
  const [activeSector, setActiveSector] = useState(null);
  const highlighted = new Set(PURPOSES.find((p) => p.id === selectedPurpose)?.sectors ?? []);

  return (
    <main
      className="mx-auto max-w-7xl px-5 py-7"
      style={{ backgroundColor: dark ? "#050506" : "#f5f5f7", color: dark ? "#fff" : "#000" }}
    >
      <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
        <ThemePanel dark={dark} className="overflow-hidden p-3">
          <div className="relative overflow-hidden rounded-[28px] bg-black">
            <FallbackImage sources={MAP_IMAGES[year]} alt="Sasang satellite collision map" className="block w-full" />

            {COLLISION_BUTTONS.map((point) => {
              const isActive = activeSector === point.sector;
              const isPurpose = highlighted.has(point.sector);
              const sector = SECTORS[point.sector];
              return (
                <button
                  key={point.id}
                  onClick={() => setActiveSector(point.sector)}
                  style={{
                    position: "absolute",
                    transform: "translate(-50%, -50%)",
                    zIndex: isActive ? 9 : 7,
                    ...point.style,
                    minWidth: 54,
                    height: 36,
                    borderRadius: 9,
                    padding: "0 12px",
                    border: "1.5px solid rgba(255,255,255,.98)",
                    background: isActive ? "#000" : isPurpose ? "#fff" : "rgba(255,255,255,.96)",
                    color: isActive ? "#fff" : "#000",
                    boxShadow: "0 8px 20px rgba(0,0,0,.28)",
                    fontSize: 18,
                    lineHeight: 1,
                    fontWeight: 900,
                  }}
                  title={`Open ${sector.title}`}
                >
                  {point.no}
                </button>
              );
            })}

            <div className="pointer-events-none absolute left-5 top-5 rounded-full border border-white/20 bg-black/35 px-4 py-2 text-xs text-white/80 backdrop-blur-xl">
              Sasang Satellite Map / {year}
            </div>
          </div>
        </ThemePanel>

        <div className="space-y-5">
          <ThemePanel dark={dark} className="p-5">
            <p className={cx("font-mono text-[10px] uppercase tracking-[0.22em]", dark ? "text-white/45" : "text-black/35")}>Urban System</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-[-0.055em]">{YEAR[year].title}</h1>
            {showKo && <p className={cx("mt-1 text-sm", dark ? "text-white/55" : "text-black/45")}>{YEAR[year].ko}</p>}
            <div className="mt-5">
              <YearSwitch year={year} dark={dark} setYear={(next) => { setYear(Number(next)); setActiveSector(null); }} />
            </div>
          </ThemePanel>

          <ThemePanel dark={dark} className="p-5">
            <div className="mb-4 flex items-center gap-2">
              <Search size={16} />
              <p className="text-sm font-semibold">Purpose UI</p>
            </div>
            <div className="grid gap-2">
              {PURPOSES.map((purpose) => {
                const Icon = purpose.icon;
                const selected = selectedPurpose === purpose.id;
                return (
                  <button
                    key={purpose.id}
                    onClick={() => {
                      setSelectedPurpose(purpose.id);
                      setActiveSector(purpose.sectors[0]);
                    }}
                    className={cx(
                      "flex items-center gap-3 rounded-[20px] px-4 py-3 text-left transition",
                      selected ? (dark ? "bg-white text-black shadow-lg" : "bg-black text-white shadow-lg") : dark ? "bg-white/[0.12] text-white/75 hover:bg-white/[0.18] hover:text-white" : "bg-black/[0.035] text-black/60 hover:bg-black/[0.06] hover:text-black"
                    )}
                  >
                    <Icon size={17} />
                    <div>
                      <p className="text-sm font-medium">{purpose.label}</p>
                      {showKo && <p className="mt-0.5 text-xs opacity-55">{purpose.ko}</p>}
                    </div>
                  </button>
                );
              })}
            </div>
          </ThemePanel>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeSector && (
          <motion.div
            key={`${year}-${activeSector}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="mt-14"
          >
            <SectorDetail sectorId={activeSector} year={year} showKo={showKo} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}


function SectorDetail({ sectorId, year, showKo }) {
  const dark = Number(year) === 2075;
  const [diagramModal, setDiagramModal] = useState(null);
  const [selectedElementIndex, setSelectedElementIndex] = useState(0);
  const sector = SECTORS[sectorId];
  const hero = sector.hero[year];
  const elements = sector.elements[year] ?? [];
  const selectedElement = elements[selectedElementIndex] ?? elements[0];
  const Icon = sector.icon;

  useEffect(() => {
    setSelectedElementIndex(0);
  }, [sectorId, year]);

  return (
    <section style={{ display: "flex", flexDirection: "column", gap: 96 }}>
      <Media
        src={hero.video}
        fallback={hero.image}
        title={`${sector.title} / ${year}`}
        className="aspect-[16/11] min-h-[560px] rounded-none"
        isHero
        dark={dark}
      />

      <ThemePanel dark={dark} className="p-6 md:p-8">
        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <div>
            <div className="flex items-start gap-4">
              <div className={cx("flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] shadow-lg", dark ? "bg-white text-black" : "bg-black text-white")}>
                <Icon size={22} />
              </div>
              <div>
                <p className={cx("font-mono text-xs uppercase tracking-[0.2em]", dark ? "text-white/45" : "text-black/35")}>{sector.no} / {year}</p>
                <h2 className="mt-2 text-5xl font-semibold tracking-[-0.065em]">{sector.title}</h2>
                {showKo && <p className={cx("mt-2 text-sm", dark ? "text-white/55" : "text-black/45")}>{sector.ko}</p>}
              </div>
            </div>
            <p className={cx("mt-7 max-w-3xl text-base leading-7", dark ? "text-white/74" : "text-black/60")}>{sector.coreIdea}</p>
            <div className={cx("mt-5 rounded-[28px] p-5", dark ? "bg-white/[0.10]" : "bg-black/[0.035]")}>
              <p className={cx("font-mono text-[10px] uppercase tracking-[0.2em]", dark ? "text-white/45" : "text-black/35")}>Core Tension</p>
              <p className={cx("mt-3 text-sm leading-6", dark ? "text-white/72" : "text-black/58")}>{sector.coreTension}</p>
            </div>
          </div>

          <div className="space-y-5">
            <InfoGroup title="2026 Condition" items={[sector.currentStatus]} dark={dark} />
            <InfoGroup title="Urban Effects" items={sector.urbanEffects} dark={dark} ordered />
          </div>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <InfoGroup title="Why Sasang?" items={sector.whySasang} dark={dark} />
          <InfoGroup title={`${year} System`} items={[sector.systems[year], sector.yearText[year]]} dark={dark} />
        </div>
      </ThemePanel>

      <ThemePanel dark={dark} className="p-5 md:p-7">
        <div className="mb-5">
          <p className={cx("font-mono text-[10px] uppercase tracking-[0.22em]", dark ? "text-white/45" : "text-black/35")}>Layer / Elements</p>
          <h3 className="mt-2 text-3xl font-semibold tracking-[-0.055em]">{sector.title} Layers</h3>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: elements.length <= 2 ? "minmax(170px, 0.36fr) minmax(0, 0.64fr)" : "minmax(170px, 0.30fr) minmax(0, 0.70fr)",
            gap: 22,
            alignItems: "stretch",
          }}
        >
          <button
            onClick={() => setDiagramModal({ title: `${sector.title} Layers`, src: LAYER_DIAGRAMS[sectorId] })}
            className="block overflow-hidden rounded-[28px] bg-white p-3 text-black shadow-sm"
            title="Open layer diagram"
            style={{ cursor: "zoom-in", minHeight: 280, maxHeight: 430 }}
          >
            <img
              src={LAYER_DIAGRAMS[sectorId]}
              alt={`${sector.title} layer diagram`}
              style={{ display: "block", width: "100%", height: "100%", maxHeight: 400, objectFit: "contain" }}
            />
          </button>

          {elements.length > 0 && (
            <div style={{ display: "grid", gridTemplateColumns: elements.length <= 2 ? "repeat(2, minmax(0, 1fr))" : "repeat(3, minmax(0, 1fr))", gap: 16 }}>
              {elements.map((element, index) => {
                const active = selectedElementIndex === index;
                return (
                  <button
                    key={element.title}
                    onClick={() => setSelectedElementIndex(index)}
                    className={cx(
                      "group relative overflow-hidden border text-left shadow-[0_12px_32px_rgba(15,23,42,0.12)] transition hover:-translate-y-1",
                      active
                        ? dark
                          ? "border-white bg-white text-black"
                          : "border-black bg-black text-white"
                        : dark
                        ? "border-white/14 bg-white/[0.10] text-white"
                        : "border-white/80 bg-white text-black"
                    )}
                    style={{ minHeight: elements.length <= 2 ? 260 : 210, borderRadius: 26 }}
                  >
                    <img
                      src={element.illust || element.image}
                      alt={element.title}
                      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transform: "scale(1.08)", opacity: active ? 0.66 : dark ? 0.58 : 0.54 }}
                    />
                    <div style={{ position: "absolute", inset: 0, background: active ? "rgba(0,0,0,.44)" : dark ? "rgba(0,0,0,.42)" : "rgba(255,255,255,.20)" }} />
                    <div className="relative z-10 flex h-full flex-col justify-between p-4">
                      <p className={cx("font-mono text-[9px] uppercase tracking-[0.18em]", active ? "text-white/72" : dark ? "text-white/60" : "text-black/45")}>
                        Element {String(index + 1).padStart(2, "0")}
                      </p>
                      <div>
                        <h3 className={cx("text-xl font-semibold leading-[1.02] tracking-[-0.055em]", active || dark ? "text-white" : "text-black")}>{element.title}</h3>
                        {showKo && <p className={cx("mt-1 text-xs", active || dark ? "text-white/60" : "text-black/45")}>{element.ko}</p>}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </ThemePanel>

      {selectedElement && (
        <ElementFrame
          element={selectedElement}
          currentImages={sector.current[year] ?? []}
          showKo={showKo}
          dark={dark}
          onOpenDiagram={setDiagramModal}
        />
      )}

      <AnimatePresence>
        {diagramModal && <DiagramModal item={diagramModal} onClose={() => setDiagramModal(null)} />}
      </AnimatePresence>
    </section>
  );
}


function InfoGroup({ title, items, dark, ordered = false }) {
  return (
    <div className={cx("rounded-[24px] p-5", dark ? "bg-white/[0.075]" : "bg-black/[0.032]")}>
      <p className={cx("font-mono text-[10px] uppercase tracking-[0.2em]", dark ? "text-white/35" : "text-black/35")}>{title}</p>
      <div className="mt-4 space-y-3">
        {items.map((item, index) => (
          <div key={`${title}-${index}`} className="flex gap-3">
            {ordered && <span className={cx("flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs", dark ? "bg-white text-black" : "bg-black text-white")}>{index + 1}</span>}
            <p className={cx("text-sm leading-6", dark ? "text-white/66" : "text-black/58")}>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ElementFrame({ element, currentImages, showKo, dark, onOpenDiagram }) {
  const tabs = useMemo(() => {
    const base = [];
    if (element.image) base.push({ id: "image", label: "Image", src: element.image, fit: "cover" });
    if (element.illust) base.push({ id: "illust", label: "Illust", src: element.illust, fit: "cover" });
    if (currentImages.length) base.push({ id: "current", label: "Current", src: currentImages[0], fit: "cover" });
    return base;
  }, [element, currentImages]);
  const [tab, setTab] = useState(tabs[0]?.id ?? "image");
  const active = tabs.find((item) => item.id === tab) ?? tabs[0];

  useEffect(() => {
    setTab(tabs[0]?.id ?? "image");
  }, [element.title]);

  return (
    <ThemePanel dark={dark} className="overflow-hidden p-5 md:p-6">
      <div className="mb-5">
        <p className={cx("font-mono text-[10px] uppercase tracking-[0.22em]", dark ? "text-white/35" : "text-black/35")}>Selected Element</p>
        <h2 className="mt-2 text-5xl font-semibold tracking-[-0.07em]">{element.title}</h2>
        {showKo && <p className={cx("mt-2 text-sm", dark ? "text-white/45" : "text-black/45")}>{element.ko}</p>}
      </div>

      <div className="grid gap-7 lg:grid-cols-[1.02fr_0.98fr]">
        <div className="min-w-0">
          <div className="mb-4 flex items-center justify-between gap-4">
            <p className={cx("font-mono text-[10px] uppercase tracking-[0.2em]", dark ? "text-white/35" : "text-black/35")}>Image Frame</p>
            <div className={cx("flex rounded-full p-1", dark ? "bg-white/10" : "bg-black/[0.04]")}>
              {tabs.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setTab(item.id)}
                  className={cx("rounded-full px-3 py-1.5 text-xs transition", active?.id === item.id ? (dark ? "bg-white text-black shadow-sm" : "bg-white text-black shadow-sm") : dark ? "text-white/42 hover:text-white" : "text-black/42 hover:text-black")}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className={cx("overflow-hidden rounded-[30px]", dark ? "bg-white/[0.06]" : "bg-black/[0.035]")}>
            {active?.src && <img src={active.src} alt={`${element.title} ${active.label}`} className="h-full max-h-[500px] w-full object-cover" />}
          </div>
        </div>

        <div className={cx("rounded-[30px] p-6", dark ? "bg-white/[0.075]" : "bg-black/[0.032]")}>
          <p className={cx("font-mono text-[10px] uppercase tracking-[0.22em]", dark ? "text-white/35" : "text-black/35")}>Description</p>
          <p className={cx("mt-4 text-base leading-8", dark ? "text-white/66" : "text-black/60")}>{element.text}</p>
          <p className={cx("mt-5 border-t pt-5 text-sm leading-7", dark ? "border-white/10 text-white/48" : "border-black/10 text-black/48")}>{element.policy}</p>

          {element.diagrams?.length > 0 && (
            <div className="mt-6">
              <p className={cx("mb-3 font-mono text-[10px] uppercase tracking-[0.2em]", dark ? "text-white/35" : "text-black/35")}>Diagram / Evidence</p>
              <div className="flex flex-wrap gap-2.5">
                {element.diagrams.map((item) => (
                  <button
                    key={item.src}
                    onClick={() => onOpenDiagram(item)}
                    className="group w-[88px] rounded-[16px] border border-black/5 bg-white p-1.5 text-left text-black shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <div className="aspect-[4/3] overflow-hidden rounded-[11px] bg-white">
                      <img src={item.src} alt={item.title} className="h-full w-full object-contain" />
                    </div>
                    <p className="mt-1.5 line-clamp-2 text-[9px] font-medium leading-3 text-black/58">{item.title}</p>
                    <p className="mt-1 inline-flex items-center gap-1 text-[8px] uppercase tracking-[0.10em] text-black/35">
                      <Maximize2 size={8} />
                      Enlarge
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </ThemePanel>
  );
}


function DiagramModal({ item, onClose }) {
  return (
    <motion.div
      className="fixed inset-0 z-[140] flex items-center justify-center bg-black/72 p-5 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative overflow-hidden rounded-[34px] bg-white p-4 text-black shadow-2xl"
        style={{ width: "min(88vw, 980px)", maxHeight: "84vh" }}
        initial={{ scale: 0.96, y: 18 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.96, y: 18 }}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close expanded image"
          className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-black text-white shadow-xl"
        >
          <X size={20} />
        </button>
        <div className="overflow-auto rounded-[26px] bg-black/[0.035] p-5" style={{ maxHeight: "72vh" }}>
          <img src={item.src} alt={item.title} style={{ display: "block", margin: "0 auto", maxWidth: "100%", maxHeight: "66vh", objectFit: "contain" }} />
        </div>
        <p className="mt-3 px-1 pr-14 text-sm font-medium text-black/60">{item.title}</p>
      </motion.div>
    </motion.div>
  );
}


function FilmMode({ year, setView }) {
  const dark = Number(year) === 2075;
  const current = YEAR[year];
  const isShorts = current.youtubeKind === "shorts";
  const [embedHost, setEmbedHost] = useState("nocookie");

  const embedUrl =
    embedHost === "nocookie"
      ? `https://www.youtube-nocookie.com/embed/${current.youtubeId}?rel=0&modestbranding=1&playsinline=1&autoplay=0`
      : `https://www.youtube.com/embed/${current.youtubeId}?rel=0&modestbranding=1&playsinline=1&autoplay=0`;

  return (
    <main
      className="relative z-0 min-h-screen px-4 pb-14 pt-6 md:px-8"
      style={{ backgroundColor: dark ? "#050506" : "#f5f5f7", color: dark ? "#fff" : "#000" }}
    >
      <div className="mx-auto flex max-w-[1800px] flex-col gap-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className={cx("font-mono text-xs uppercase tracking-[0.26em]", dark ? "text-white/45" : "text-black/35")}>Film / {year}</p>
            <h1 className="mt-2 text-4xl font-semibold tracking-[-0.065em] md:text-6xl">{current.filmTitle}</h1>
          </div>
          <button
            onClick={() => setView("map")}
            className={cx("rounded-full px-5 py-3 text-sm font-semibold shadow-lg", dark ? "bg-white text-black" : "bg-black text-white")}
          >
            Back to Map
          </button>
        </div>

        <div
          className={cx("overflow-hidden rounded-[34px] shadow-2xl", dark ? "bg-black ring-1 ring-white/12" : "bg-black")}
          style={{
            width: "100%",
            minHeight: isShorts ? "min(90vh, 1120px)" : "min(86vh, 1040px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: isShorts ? 20 : 0,
          }}
        >
          <iframe
            key={`${year}-${embedHost}`}
            title={current.filmTitle}
            src={embedUrl}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            style={{
              display: "block",
              width: isShorts ? "min(96vw, 620px)" : "100%",
              height: isShorts ? "min(88vh, 1120px)" : "min(86vh, 1040px)",
              aspectRatio: isShorts ? "9 / 16" : "16 / 9",
              border: 0,
              background: "#000",
            }}
          />
        </div>

        <div className={cx("flex flex-wrap gap-3 text-sm", dark ? "text-white/75" : "text-black/70")}>
          <button
            onClick={() => setEmbedHost("youtube")}
            className={cx("rounded-full px-4 py-2", embedHost === "youtube" ? (dark ? "bg-white text-black" : "bg-black text-white") : dark ? "bg-white/10 text-white" : "bg-black/5 text-black")}
          >
            youtube.com embed
          </button>
          <button
            onClick={() => setEmbedHost("nocookie")}
            className={cx("rounded-full px-4 py-2", embedHost === "nocookie" ? (dark ? "bg-white text-black" : "bg-black text-white") : dark ? "bg-white/10 text-white" : "bg-black/5 text-black")}
          >
            youtube-nocookie embed
          </button>
          <a
            href={`https://www.youtube.com/watch?v=${current.youtubeId}`}
            target="_blank"
            rel="noreferrer"
            className={cx("rounded-full px-4 py-2", dark ? "bg-white/10 text-white" : "bg-black/5 text-black")}
          >
            Open YouTube
          </a>
        </div>
      </div>
    </main>
  );
}


function ArticleMode({ year }) {
  const dark = Number(year) === 2075;
  const isMobile = useIsMobile(760);
  const list = Object.entries(SECTORS);

  return (
    <main
      className="mx-auto min-h-screen px-4 py-8 md:px-5 md:py-12"
      style={{
        maxWidth: isMobile ? 560 : 1280,
        backgroundColor: dark ? "#050506" : "#f5f5f7",
        color: dark ? "#ffffff" : "#000000",
      }}
    >
      <motion.article
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        style={{ display: "flex", flexDirection: "column", gap: isMobile ? 84 : 116, position: "relative", zIndex: 0 }}
      >
        <header
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "minmax(0,1fr) minmax(0,1fr)",
            gap: isMobile ? 18 : 56,
            alignItems: "end",
            paddingTop: isMobile ? 18 : 40,
          }}
        >
          <div>
            <p className={cx("font-mono text-xs uppercase tracking-[0.26em]", dark ? "text-white/35" : "text-black/35")}>Article / {year}</p>
            <h1 className={cx("mt-5 font-semibold leading-[0.98] tracking-[-0.075em]", isMobile ? "text-5xl" : "text-7xl")}>{YEAR[year].title}</h1>
          </div>
          <p className={cx("leading-8", isMobile ? "text-base" : "text-lg", dark ? "text-white/62" : "text-black/58")}>
            Desktop keeps the article split in half. Mobile uses text first, then compact visual references so images do not bury the reading flow.
          </p>
        </header>

        <ArticleMethodSection dark={dark} isMobile={isMobile} />

        {list.map(([id, sector], index) => (
          <ArticleSector key={id} id={id} sector={sector} year={year} dark={dark} index={index} isMobile={isMobile} />
        ))}
      </motion.article>
    </main>
  );
}


function ArticleMethodSection({ dark, isMobile = false }) {
  const [activeId, setActiveId] = useState("mobility");
  const [activeStage, setActiveStage] = useState(0);
  const active = DRIVER_METHOD.find((driver) => driver.id === activeId) ?? DRIVER_METHOD[0];
  const matrix = DRIVER_MATRIX[active.id] ?? DRIVER_MATRIX.mobility;
  const step = DRIVER_STEP_DETAILS[active.id] ?? DRIVER_STEP_DETAILS.mobility;
  const importance = DRIVER_IMPORTANCE[active.id] ?? DRIVER_IMPORTANCE.mobility;
  const relations = DRIVER_RELATIONS[active.id] ?? [];

  const stageCards = [
    { no: "01", key: "filtered", title: "Pressure", text: step.filtered },
    { no: "02", key: "role", title: "Role", text: step.role },
    { no: "03", key: "machine", title: "Machine", text: step.machine },
    { no: "04", key: "collision", title: "Collision", text: step.collision },
    { no: "05", key: "sector", title: "Sector", text: step.sector },
  ];

  const mechanismNodes = [
    {
      no: "01",
      title: "Driver Values",
      main: `${matrix.no}. ${active.label}`,
      sub: `I ${matrix.influence} / D ${matrix.dependence} / Net ${matrix.net} / C ${matrix.centrality}`,
    },
    {
      no: "02",
      title: "Causal Machine",
      main: active.machines?.[0] ?? "Composite Machine",
      sub: step.machine.split(":")[0],
    },
    {
      no: "03",
      title: "Spatial Collision",
      main: relations[0] ?? "Spatial conflict",
      sub: relations.slice(1, 3).join(" · "),
    },
    {
      no: "04",
      title: "Scenario Sectors",
      main: "Four-sector output",
      sub: (DRIVER_TO_SECTORS_MAP[active.id] ?? []).map((key) => SECTORS[key]?.title).filter(Boolean).join(" · "),
    },
  ];

  return (
    <section
      style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "minmax(0,0.42fr) minmax(0,0.58fr)",
        gap: isMobile ? 28 : 48,
        alignItems: "start",
        paddingTop: isMobile ? 28 : 36,
        borderTop: `1px solid ${dark ? "rgba(255,255,255,.12)" : "rgba(0,0,0,.10)"}`,
      }}
    >
      <aside style={{ position: isMobile ? "static" : "sticky", top: 118, alignSelf: "start", zIndex: 1 }}>
        <div style={{ borderRadius: 30, padding: 16, background: dark ? "rgba(255,255,255,.075)" : "rgba(0,0,0,.035)" }}>
          <p className={cx("font-mono text-[10px] uppercase tracking-[0.22em]", dark ? "text-white/45" : "text-black/35")}>Driver Matrix Index</p>
          <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: isMobile ? "repeat(2, minmax(0,1fr))" : "1fr", gap: 8 }}>
            {DRIVER_METHOD.map((driver) => {
              const selected = driver.id === active.id;
              const m = DRIVER_MATRIX[driver.id] ?? DRIVER_MATRIX.mobility;
              return (
                <button
                  key={driver.id}
                  onClick={() => {
                    setActiveId(driver.id);
                    setActiveStage(0);
                  }}
                  style={{
                    borderRadius: 16,
                    padding: 10,
                    textAlign: "left",
                    background: selected ? (dark ? "#fff" : "#000") : dark ? "rgba(255,255,255,.08)" : "#fff",
                    color: selected ? (dark ? "#000" : "#fff") : "inherit",
                    transition: "all .18s ease",
                  }}
                >
                  <div style={{ display: "grid", gridTemplateColumns: "32px minmax(0,1fr) 44px", alignItems: "center", gap: 8 }}>
                    <p className="font-mono text-sm font-semibold">{m.no}</p>
                    <p className="text-xs font-semibold leading-4">{driver.label}</p>
                    <p className="text-right font-mono text-[10px] opacity-55">C {m.centrality}</p>
                  </div>
                  <div style={{ marginTop: 8, height: 6, borderRadius: 999, overflow: "hidden", background: selected ? (dark ? "rgba(0,0,0,.14)" : "rgba(255,255,255,.20)") : dark ? "rgba(255,255,255,.12)" : "rgba(0,0,0,.08)" }}>
                    <motion.div
                      key={`${driver.id}-${selected}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, Math.round((m.centrality / 38) * 100))}%` }}
                      transition={{ duration: 0.45 }}
                      style={{ height: "100%", borderRadius: 999, background: selected ? (dark ? "#000" : "#fff") : dark ? "rgba(255,255,255,.50)" : "rgba(0,0,0,.40)" }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </aside>

      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <div>
          <p className={cx("font-mono text-xs uppercase tracking-[0.24em]", dark ? "text-white/45" : "text-black/35")}>Method / Driver Reading</p>
          <h2 className={cx("mt-4 font-semibold tracking-[-0.07em]", isMobile ? "text-4xl" : "text-5xl")}>From Matrix to Scenario Logic</h2>
          <p className={cx("mt-5 text-base leading-8", dark ? "text-white/68" : "text-black/60")}>
            Select a driver to read its system position: influence, dependence, net effect, centrality, relations, and scenario translation.
          </p>
        </div>

        <div style={{ borderRadius: 34, padding: 24, background: dark ? "rgba(255,255,255,.075)" : "rgba(0,0,0,.035)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
            <div>
              <p className={cx("font-mono text-[10px] uppercase tracking-[0.22em]", dark ? "text-white/45" : "text-black/35")}>Selected Driver</p>
              <h3 className={cx("mt-2 font-semibold tracking-[-0.06em]", isMobile ? "text-3xl" : "text-4xl")}>
                {matrix.no}. {active.label}
              </h3>
              <p className={cx("mt-2 text-sm leading-6", dark ? "text-white/58" : "text-black/52")}>{matrix.rank}</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 74px)", gap: 8 }}>
              {[
                ["I", matrix.influence],
                ["D", matrix.dependence],
                ["Net", matrix.net],
                ["C", matrix.centrality],
              ].map(([label, value]) => (
                <div key={label} style={{ borderRadius: 18, padding: 12, background: dark ? "rgba(255,255,255,.09)" : "#fff", textAlign: "center" }}>
                  <p className="font-mono text-[10px] opacity-45">{label}</p>
                  <p className="mt-1 text-2xl font-semibold tracking-[-0.05em]">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <p className={cx("mt-6 text-base leading-8", dark ? "text-white/66" : "text-black/60")}>{matrix.matrix}</p>

          <div style={{ marginTop: 22, display: "grid", gap: 12 }}>
            {[
              ["Influence", matrix.influence, 20],
              ["Dependence", matrix.dependence, 20],
              ["Centrality", matrix.centrality, 38],
            ].map(([label, value, max]) => (
              <div key={label}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 6, opacity: 0.62 }}>
                  <span>{label}</span>
                  <span>
                    {value}/{max}
                  </span>
                </div>
                <div style={{ height: 9, borderRadius: 999, overflow: "hidden", background: dark ? "rgba(255,255,255,.12)" : "rgba(0,0,0,.08)" }}>
                  <motion.div
                    key={`${active.id}-${label}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, Math.round((value / max) * 100))}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    style={{ height: "100%", borderRadius: 999, background: dark ? "#fff" : "#000" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "0.9fr 1.1fr", gap: 18 }}>
          <div style={{ borderRadius: 30, padding: 20, background: dark ? "rgba(255,255,255,.075)" : "rgba(0,0,0,.035)" }}>
            <p className={cx("font-mono text-[10px] uppercase tracking-[0.22em]", dark ? "text-white/45" : "text-black/35")}>Relations in Diagram</p>
            <div className="mt-4 space-y-3">
              {relations.map((rel) => (
                <p key={rel} className={cx("rounded-[18px] px-4 py-3 text-sm leading-6", dark ? "bg-white/[0.08] text-white/66" : "bg-white text-black/58")}>
                  {rel}
                </p>
              ))}
            </div>
          </div>

          <div style={{ borderRadius: 30, padding: 20, background: dark ? "rgba(255,255,255,.075)" : "rgba(0,0,0,.035)" }}>
            <p className={cx("font-mono text-[10px] uppercase tracking-[0.22em]", dark ? "text-white/45" : "text-black/35")}>Scenario Translation</p>
            <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, minmax(0,1fr))", gap: 10 }}>
              {stageCards.map((stage, idx) => {
                const selected = idx === activeStage;
                const value = importance[stage.key];
                return (
                  <button
                    key={stage.key}
                    onClick={() => setActiveStage(idx)}
                    style={{
                      minHeight: 108,
                      borderRadius: 20,
                      padding: 14,
                      textAlign: "left",
                      background: selected ? (dark ? "#fff" : "#000") : dark ? "rgba(255,255,255,.08)" : "#fff",
                      color: selected ? (dark ? "#000" : "#fff") : "inherit",
                    }}
                  >
                    <p className="font-mono text-[9px] opacity-45">{stage.no}</p>
                    <p className="mt-1 text-[13px] font-semibold leading-5">{stage.title}</p>
                    <div style={{ marginTop: 10, height: 7, borderRadius: 999, overflow: "hidden", background: selected ? (dark ? "rgba(0,0,0,.14)" : "rgba(255,255,255,.22)") : dark ? "rgba(255,255,255,.12)" : "rgba(0,0,0,.08)" }}>
                      <motion.div
                        key={`${active.id}-${stage.key}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${value}%` }}
                        transition={{ duration: 0.5 }}
                        style={{ height: "100%", background: selected ? (dark ? "#000" : "#fff") : dark ? "rgba(255,255,255,.5)" : "rgba(0,0,0,.42)" }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
            <p className={cx("mt-5 text-sm leading-7", dark ? "text-white/62" : "text-black/58")}>{stageCards[activeStage].text}</p>
          </div>
        </div>

        <div style={{ borderRadius: 34, padding: isMobile ? 18 : 24, background: dark ? "rgba(255,255,255,.075)" : "rgba(0,0,0,.035)" }}>
          <p className={cx("font-mono text-[10px] uppercase tracking-[0.22em]", dark ? "text-white/45" : "text-black/35")}>Mechanism Builder</p>
          <h3 className={cx("mt-3 font-semibold tracking-[-0.06em]", isMobile ? "text-3xl" : "text-4xl")}>How the Four Sectors Are Derived</h3>
          <p className={cx("mt-4 text-sm leading-7", dark ? "text-white/62" : "text-black/58")}>
            Instead of stacked cards, this mechanism works as a horizontal translation line: driver value → causal machine → spatial collision → sector output.
          </p>

          <div style={{ marginTop: 24, overflowX: "auto", paddingBottom: 12 }}>
            <div style={{ minWidth: isMobile ? 980 : 1160 }}>
              <div style={{ position: "relative", height: 120 }}>
                <div style={{ position: "absolute", left: 42, right: 42, top: 56, height: 2, background: dark ? "rgba(255,255,255,.28)" : "rgba(0,0,0,.20)" }} />
                {mechanismNodes.map((node, index) => (
                  <div
                    key={node.no}
                    style={{
                      position: "absolute",
                      left: `${7 + index * 28}%`,
                      top: 0,
                      transform: "translateX(-50%)",
                      width: 230,
                      textAlign: "center",
                    }}
                  >
                    <div style={{ margin: "0 auto", width: 54, height: 54, borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center", background: dark ? "#fff" : "#000", color: dark ? "#000" : "#fff", fontWeight: 900, boxShadow: "0 14px 32px rgba(0,0,0,.18)" }}>
                      {node.no}
                    </div>
                    <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.18em] opacity-45">{node.title}</p>
                    <p className="mt-1 text-sm font-semibold leading-5">{node.main}</p>
                    <p className={cx("mt-1 text-xs leading-5", dark ? "text-white/50" : "text-black/48")}>{node.sub}</p>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "0.9fr 1.1fr 1fr 1.1fr", gap: 12 }}>
                <div style={{ borderRadius: 20, padding: 14, background: dark ? "rgba(255,255,255,.06)" : "#fff" }}>
                  <p className="font-mono text-[9px] opacity-45">VALUE</p>
                  <p className={cx("mt-2 text-sm leading-6", dark ? "text-white/62" : "text-black/58")}>{matrix.matrix}</p>
                </div>
                <div style={{ borderRadius: 20, padding: 14, background: dark ? "rgba(255,255,255,.06)" : "#fff" }}>
                  <p className="font-mono text-[9px] opacity-45">MACHINE</p>
                  <p className={cx("mt-2 text-sm leading-6", dark ? "text-white/62" : "text-black/58")}>{step.machine}</p>
                </div>
                <div style={{ borderRadius: 20, padding: 14, background: dark ? "rgba(255,255,255,.06)" : "#fff" }}>
                  <p className="font-mono text-[9px] opacity-45">COLLISION</p>
                  <p className={cx("mt-2 text-sm leading-6", dark ? "text-white/62" : "text-black/58")}>{step.collision}</p>
                </div>
                <div style={{ borderRadius: 20, padding: 14, background: dark ? "rgba(255,255,255,.06)" : "#fff" }}>
                  <p className="font-mono text-[9px] opacity-45">SECTOR OUTPUT</p>
                  <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {Object.entries(SECTORS).map(([key, sector]) => {
                      const activeSector = DRIVER_TO_SECTORS_MAP[active.id]?.includes(key);
                      return (
                        <span
                          key={key}
                          style={{
                            borderRadius: 999,
                            padding: "7px 10px",
                            background: activeSector ? (dark ? "#fff" : "#000") : dark ? "rgba(255,255,255,.08)" : "rgba(0,0,0,.05)",
                            color: activeSector ? (dark ? "#000" : "#fff") : "inherit",
                            fontSize: 11,
                            fontWeight: 700,
                          }}
                        >
                          {sector.no} {sector.title}
                        </span>
                      );
                    })}
                  </div>
                  <p className={cx("mt-3 text-sm leading-6", dark ? "text-white/62" : "text-black/58")}>{step.sector}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


function MechanismArrow({ dark }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 86 }}>
      <div style={{ position: "relative", width: "100%", height: 2, background: dark ? "rgba(255,255,255,.22)" : "rgba(0,0,0,.18)" }}>
        <div
          style={{
            position: "absolute",
            right: -2,
            top: "50%",
            width: 10,
            height: 10,
            borderTop: `2px solid ${dark ? "rgba(255,255,255,.62)" : "rgba(0,0,0,.50)"}`,
            borderRight: `2px solid ${dark ? "rgba(255,255,255,.62)" : "rgba(0,0,0,.50)"}`,
            transform: "translateY(-50%) rotate(45deg)",
          }}
        />
      </div>
    </div>
  );
}


function ArticleSector({ id, sector, year, dark, index, isMobile = false }) {
  const hero = sector.hero[year];
  const elements = sector.elements[year] ?? [];
  const current = sector.current[year]?.[0];
  const [modalItem, setModalItem] = useState(null);

  const visualRail = (
    <aside
      style={{
        position: isMobile ? "static" : "sticky",
        top: 118,
        alignSelf: "start",
        zIndex: 1,
        display: "flex",
        flexDirection: "column",
        gap: isMobile ? 14 : 20,
      }}
    >
      <ArticleFigure src={hero.image} title={`${sector.title} hero`} caption={`${year} scenario image`} dark={dark} size={isMobile ? "mobileHero" : "large"} onOpen={setModalItem} />
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "1fr", gap: isMobile ? 10 : 20 }}>
        <ArticleFigure src={LAYER_DIAGRAMS[id]} title={`${sector.title} layer diagram`} caption="Layer diagram" dark={dark} size={isMobile ? "mobileSmall" : "medium"} contain onOpen={setModalItem} />
        {current && <ArticleFigure src={current} title={`${sector.title} current condition`} caption="Current / 2026 evidence image" dark={dark} size={isMobile ? "mobileSmall" : "medium"} onOpen={setModalItem} />}
      </div>
    </aside>
  );

  const textColumn = (
    <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 30 : 40 }}>
      <header>
        <p className={cx("font-mono text-xs uppercase tracking-[0.24em]", dark ? "text-white/35" : "text-black/35")}>{sector.no} / Scenario Sector</p>
        <h2 className={cx("mt-4 font-semibold tracking-[-0.07em]", isMobile ? "text-4xl" : "text-6xl")}>{sector.title}</h2>
        <p className={cx("mt-5 leading-8", isMobile ? "text-base" : "text-lg", dark ? "text-white/64" : "text-black/62")}>{sector.coreIdea}</p>
      </header>

      <LongTextBlock title="2026 Status" text={sector.currentStatus} dark={dark} />
      <LongTextBlock title="Core Tension" text={sector.coreTension} dark={dark} />
      <LongList title="Urban Effects" items={sector.urbanEffects} dark={dark} ordered />
      <LongList title="Why Sasang?" items={sector.whySasang} dark={dark} />
      <LongTextBlock title={`${year} System`} text={sector.yearText[year]} dark={dark} />
    </div>
  );

  return (
    <motion.section
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      style={{
        borderTop: `1px solid ${dark ? "rgba(255,255,255,.12)" : "rgba(0,0,0,.10)"}`,
        paddingTop: isMobile ? 52 : 72,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "minmax(0,1fr) minmax(0,1fr)",
          gap: isMobile ? 26 : 56,
        }}
      >
        {isMobile ? (
          <>
            {textColumn}
            {visualRail}
          </>
        ) : (
          <>
            {visualRail}
            {textColumn}
          </>
        )}
      </div>

      <div
        style={{
          marginTop: isMobile ? 46 : 70,
          display: "flex",
          flexDirection: "column",
          gap: isMobile ? 48 : 70,
          borderTop: `1px solid ${dark ? "rgba(255,255,255,.12)" : "rgba(0,0,0,.10)"}`,
          paddingTop: isMobile ? 38 : 52,
        }}
      >
        {elements.map((el) => {
          const elementVisual = (
            <div>
              <ArticleFigure src={el.image} title={el.title} caption="Scenario image" dark={dark} size={isMobile ? "mobileElement" : "element"} onOpen={setModalItem} />
              {el.diagrams?.length > 0 && (
                <div className="mt-4">
                  <p className={cx("mb-3 font-mono text-[10px] uppercase tracking-[0.22em]", dark ? "text-white/35" : "text-black/35")}>Diagram / Evidence</p>
                  <div className="flex flex-wrap gap-3">
                    {el.diagrams.map((d) => (
                      <button
                        key={d.src}
                        onClick={() => setModalItem(d)}
                        style={{
                          width: isMobile ? 92 : 104,
                          minHeight: isMobile ? 112 : 120,
                          borderRadius: 16,
                          background: "#fff",
                          padding: 6,
                          color: "#000",
                          boxShadow: "0 8px 24px rgba(15,23,42,.10)",
                          textAlign: "left",
                        }}
                        title={`Open ${d.title}`}
                      >
                        <div style={{ height: isMobile ? 60 : 66, overflow: "hidden", borderRadius: 10, background: "#fff" }}>
                          <img src={d.src} alt={d.title} style={{ width: "100%", height: "100%", objectFit: "cover", transform: "scale(1.12)" }} />
                        </div>
                        <p style={{ marginTop: 6, fontSize: 10.5, lineHeight: "13px", color: "rgba(0,0,0,.62)", wordBreak: "break-word", overflowWrap: "anywhere" }}>{d.title}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );

          const elementText = (
            <div>
              <h3 className={cx("font-semibold tracking-[-0.06em]", isMobile ? "text-3xl" : "text-4xl")}>{el.title}</h3>
              <p className={cx("mt-5 leading-8", isMobile ? "text-sm" : "text-base", dark ? "text-white/62" : "text-black/60")}>{el.text}</p>
              <p className={cx("mt-5 rounded-[28px] p-5 text-sm leading-7", dark ? "bg-white/[0.075] text-white/48" : "bg-black/[0.035] text-black/48")}>{el.policy}</p>
            </div>
          );

          return (
            <motion.section
              key={el.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-90px" }}
              transition={{ duration: 0.5 }}
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "minmax(0,1fr) minmax(0,1fr)",
                gap: isMobile ? 20 : 32,
              }}
            >
              {isMobile ? (
                <>
                  {elementText}
                  {elementVisual}
                </>
              ) : (
                <>
                  {elementVisual}
                  {elementText}
                </>
              )}
            </motion.section>
          );
        })}
      </div>

      <AnimatePresence>{modalItem && <DiagramModal item={modalItem} onClose={() => setModalItem(null)} />}</AnimatePresence>
    </motion.section>
  );
}


function ArticleFigure({ src, title, caption, dark, size = "element", contain = false, onOpen }) {
  const metrics =
    size === "large"
      ? { height: 300 }
      : size === "medium"
      ? { height: 220 }
      : size === "mobileHero"
      ? { height: 178, maxWidth: "78vw" }
      : size === "mobileSmall"
      ? { height: 116, maxWidth: "100%" }
      : size === "mobileElement"
      ? { height: 146, maxWidth: "76vw" }
      : { height: 185 };

  const fit = contain ? "contain" : "cover";
  const scale = contain ? "scale(1.03)" : "scale(1.14)";

  return (
    <figure style={{ width: "100%", maxWidth: metrics.maxWidth ?? "100%", marginLeft: metrics.maxWidth ? "auto" : 0, marginRight: metrics.maxWidth ? "auto" : 0 }}>
      <button
        type="button"
        onClick={() => onOpen?.({ src, title })}
        style={{
          display: "block",
          width: "100%",
          overflow: "hidden",
          borderRadius: 24,
          background: "#fff",
          padding: 6,
          position: "relative",
          zIndex: 0,
          color: "#000",
          boxShadow: "0 8px 28px rgba(15,23,42,.08)",
          cursor: onOpen ? "zoom-in" : "default",
        }}
        title={onOpen ? `Open ${title}` : title}
      >
        <div style={{ height: metrics.height, overflow: "hidden", borderRadius: 18, background: "#fff" }}>
          <img
            src={src}
            alt={title}
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              objectFit: fit,
              transform: scale,
              margin: "0 auto",
            }}
          />
        </div>
      </button>
      <figcaption className={cx("mt-2 text-xs", dark ? "text-white/35" : "text-black/35")}>{caption}</figcaption>
    </figure>
  );
}


function LongTextBlock({ title, text, dark }) {
  return (
    <section>
      <p className={cx("font-mono text-[10px] uppercase tracking-[0.22em]", dark ? "text-white/35" : "text-black/35")}>{title}</p>
      <p className={cx("mt-3 text-base leading-8", dark ? "text-white/62" : "text-black/60")}>{text}</p>
    </section>
  );
}

function LongList({ title, items, dark, ordered = false }) {
  return (
    <section>
      <p className={cx("font-mono text-[10px] uppercase tracking-[0.22em]", dark ? "text-white/35" : "text-black/35")}>{title}</p>
      <div className="mt-4 space-y-3">
        {items.map((item, i) => (
          <div key={item} className="flex gap-3">
            {ordered && <span className={cx("flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs", dark ? "bg-white text-black" : "bg-black text-white")}>{i + 1}</span>}
            <p className={cx("text-base leading-7", dark ? "text-white/58" : "text-black/58")}>{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function MethodMode({ year }) {
  const dark = Number(year) === 2075;
  const isMobile = useIsMobile(760);
  return (
    <main
      className="mx-auto min-h-screen px-4 py-8 md:px-5 md:py-12"
      style={{ maxWidth: isMobile ? 560 : 1280, backgroundColor: dark ? "#050506" : "#f5f5f7", color: dark ? "#ffffff" : "#000000" }}
    >
      <ArticleMethodSection dark={dark} isMobile={isMobile} />
    </main>
  );
}



function SiteCredit({ dark }) {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[250] pointer-events-none"
      style={{
        color: dark ? "rgba(255,255,255,.52)" : "rgba(0,0,0,.48)",
      }}
    >
      <div
        className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-2 text-[10px] leading-4 backdrop-blur-xl"
        style={{
          background: dark ? "rgba(5,5,6,.64)" : "rgba(245,245,247,.70)",
          borderTop: dark ? "1px solid rgba(255,255,255,.08)" : "1px solid rgba(0,0,0,.06)",
        }}
      >
        <span>OMA X HONGIK LAB: The empty city © JUWON LEE</span>
        <span>wceo2001@gmail.com</span>
      </div>
    </div>
  );
}

export default function FutureSasangOS() {
  const [showIntro, setShowIntro] = useState(true);
  const [year, setYear] = useState(2050);
  const [view, setView] = useState("map");
  const [showKo, setShowKo] = useState(false);
  const dark = Number(year) === 2075;

  if (showIntro) {
    return (
      <Intro
        onEnter={(selectedYear, selectedView, lang) => {
          setYear(Number(selectedYear));
          setView(selectedView);
          setShowKo(lang === "ko");
          setShowIntro(false);
        }}
      />
    );
  }

  return (
    <div className={cx("min-h-screen pb-10 transition-colors duration-500", dark ? "bg-[#050506] text-white" : "bg-[#f5f5f7] text-black")}>
      <GlobalStyle />
      <div className={cx("pointer-events-none fixed inset-0", dark ? "bg-[radial-gradient(circle_at_50%_-10%,rgba(255,255,255,0.14),transparent_34%)]" : "bg-[radial-gradient(circle_at_50%_-10%,rgba(255,255,255,0.95),transparent_32%)]")} />
      <div className="relative z-10">
        <TopNav view={view} setView={setView} year={year} setYear={setYear} showKo={showKo} setShowKo={setShowKo} />
        <AnimatePresence mode="wait">
          <motion.div key={`${view}-${year}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
            {view === "map" && <MapMode year={year} setYear={setYear} showKo={showKo} />}
            {view === "article" && <ArticleMode year={year} />}
            {view === "film" && <FilmMode year={year} setView={setView} />}
            {view === "method" && <MethodMode year={year} />}
          </motion.div>
        </AnimatePresence>
      </div>
      <SiteCredit dark={dark} />
    </div>
  );
}
