const yen = new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY", maximumFractionDigits: 0 });
const colors = ["#c68731", "#126a73", "#bd4b5b", "#2f8066", "#7a5bc0", "#d36b32"];

const tripDays = [
  {
    id: "day1",
    label: "Day 1",
    date: "6/23",
    weekday: "二",
    title: "羽田凌晨抵達 -> 池袋 -> 澀谷 -> 新宿",
    mapQuery: "Ikebukuro Station Tokyo",
    routeUrl: "https://www.google.com/maps/dir/Haneda+Airport+Terminal+3/Ikebukuro+Station/Shibuya+Sky/Shinjuku+Station",
    metrics: ["羽田深夜巴士 / 首班鐵路", "池袋動漫購物", "SHIBUYA SKY 黃昏夜景"],
    stops: [
      ["01:20-02:45", "羽田 T3", "落機、入境、取行李。", "預計 02:00-02:45 完成。", "Haneda Airport Terminal 3"],
      ["02:20", "羽田 -> 池袋", "如已完成入境，可坐深夜巴士往池袋。", "T3 1樓3番；¥2,800。", "Ikebukuro Station"],
      ["06:15-07:00", "池袋 / 酒店", "寄存行李；如未能寄存，用池袋站置物櫃。", "先整理和充電。", "Ikebukuro Station"],
      ["10:00-15:30", "池袋", "Otome Road、K-BOOKS、animate、Sunshine City、GiGO。", "動漫購物主段。", "Sunshine City Ikebukuro"],
      ["16:30-18:30", "SHIBUYA SKY", "黃昏至夜景。", "建議預約 17:00-18:00。", "Shibuya Sky"],
      ["20:00-22:00", "新宿", "歌舞伎町、Omoide Yokocho、Donki。", "太累可直接回池袋。", "Shinjuku Station"],
    ],
    places: ["Haneda Airport Terminal 3", "Ikebukuro Station", "Sunshine City Ikebukuro", "Shibuya Sky", "Shinjuku Station"],
  },
  {
    id: "day2",
    label: "Day 2",
    date: "6/24",
    weekday: "三",
    title: "東京迪士尼全日",
    mapQuery: "Tokyo Disneyland",
    routeUrl: "https://www.google.com/maps/dir/Ikebukuro+Station/Tokyo+Disneyland",
    metrics: ["池袋 -> 舞濱 55-70 分鐘", "IC 約 ¥406/人", "回程預留 70-90 分鐘"],
    stops: [
      ["06:30-07:40", "池袋 -> 舞濱", "JR 到東京站，轉京葉線到舞濱。", "早出門避開入園人潮。", "Maihama Station"],
      ["07:40-08:45", "迪士尼入口", "安檢、排隊、確認 App。", "票券和信用卡先準備。", "Tokyo Disneyland Entrance"],
      ["09:00-21:00", "東京迪士尼", "入園後抽 Entry Request、買 DPA、搶 Standby Pass。", "午餐避開 12:00-13:30。", "Tokyo Disneyland"],
      ["21:00-22:30", "舞濱 -> 池袋", "京葉線回東京站，再轉 JR 回池袋。", "Day 3 上午不排太早。", "Ikebukuro Station"],
    ],
    places: ["Ikebukuro Station", "Maihama Station", "Tokyo Disneyland", "Ikspiari"],
  },
  {
    id: "day3",
    label: "Day 3",
    date: "6/25",
    weekday: "四",
    title: "品川水族館 -> Pixar / Mundo Pixar 展 -> 梵高展",
    mapQuery: "Maxell Aqua Park Shinagawa",
    routeUrl: "https://www.google.com/maps/dir/Ikebukuro+Station/Maxell+Aqua+Park+Shinagawa/Ueno+Royal+Museum",
    metrics: ["池袋 -> 品川 35-45 分鐘", "Pixar 展場以票券頁為準", "晚上上野大ゴッホ展"],
    stops: [
      ["09:30-10:05", "池袋 -> 品川", "JR 山手線到品川，高輪口步行到 Aqua Park。", "IC 約 ¥230/人。", "Shinagawa Station"],
      ["10:10-12:00", "Maxell Aqua Park Shinagawa", "水族館、海豚表演和拍照。", "門票約 ¥2,500；表演時間看官方。", "Maxell Aqua Park Shinagawa"],
      ["12:00-13:15", "品川午餐", "品川站、Prince Hotel、Atre 品川一帶。", "不要排太久。", "Atre Shinagawa"],
      ["13:15-14:00", "品川 -> Pixar 展場", "前往 Pixar / Mundo Pixar 展。", "會場以票券頁面為準。", "Roppongi Hills"],
      ["14:00-16:00", "Pixar / Mundo Pixar 展", "下午看展。", "2026 東京場需再確認。", "Roppongi Hills"],
      ["17:00-18:30", "上野之森美術館", "晚上看大ゴッホ展。", "建議預約 17:00 後時段。", "Ueno Royal Museum"],
      ["18:30-20:15", "上野晚餐", "上野 / 阿美橫町附近。", "看完展後就近食。", "Ameyoko Shopping District"],
    ],
    places: ["Maxell Aqua Park Shinagawa", "Atre Shinagawa", "Roppongi Hills", "Ueno Royal Museum", "Ameyoko Shopping District"],
  },
  {
    id: "day4",
    label: "Day 4",
    date: "6/26",
    weekday: "五",
    title: "川越全日 -> 池袋夜晚",
    mapQuery: "Kawagoe Hikawa Shrine",
    routeUrl: "https://www.google.com/maps/dir/Ikebukuro+Station/Kawagoe+Hikawa+Shrine/Kurazukuri+Street",
    metrics: ["池袋 -> 川越 30-45 分鐘", "小江戶散步", "晚上回池袋補 shopping"],
    stops: [
      ["08:45-09:30", "池袋 -> 川越", "東武東上線前往川越。", "約 30-45 分鐘。", "Kawagoe Station"],
      ["09:30-10:45", "川越冰川神社", "祈緣、拍照。", "風鈴季可多留時間。", "Kawagoe Hikawa Shrine"],
      ["12:00-13:00", "藏造老街", "午餐：鰻魚飯或甘薯料理。", "熱門店需排隊。", "Kurazukuri Street"],
      ["13:30-16:30", "川越主街", "時之鐘、菓子屋橫丁、大正浪漫夢通。", "主拍照和購物段。", "Toki no Kane"],
      ["18:30-21:00", "池袋", "晚餐 / shopping。", "不宜太晚。", "Ikebukuro Station"],
    ],
    places: ["Kawagoe Station", "Kawagoe Hikawa Shrine", "Kurazukuri Street", "Toki no Kane", "Ikebukuro Station"],
  },
  {
    id: "day5",
    label: "Day 5",
    date: "6/27",
    weekday: "六",
    title: "鎌倉 JK 制服拍照 -> 橫濱夜景",
    mapQuery: "Kamakura Station",
    routeUrl: "https://www.google.com/maps/dir/Ikebukuro+Station/Kamakura+Station/Kamakura+High+School+Front+Station/Yokohama+Red+Brick+Warehouse",
    metrics: ["池袋 -> 鎌倉 65-75 分鐘", "制服街拍 + 海邊", "雨天改秋葉原 Plan B"],
    stops: [
      ["08:15-09:30", "池袋 -> 鎌倉", "湘南新宿線直達鎌倉。", "約 65-75 分鐘。", "Kamakura Station"],
      ["09:45-10:30", "鎌倉半夏", "租 JK 制服 / 水手服。", "準時到店。", "Kamakura Hanka"],
      ["10:30-12:00", "小町通 + 鶴岡八幡宮", "街拍、神社、小食。", "制服拍照主段。", "Tsurugaoka Hachimangu"],
      ["13:00-15:30", "江之電路線", "長谷寺、鎌倉高校前、七里ヶ浜。", "海邊大風。", "Kamakura High School Front Station"],
      ["18:30-21:00", "橫濱夜景", "紅磚倉庫、汽車道、摩天輪、Minato Mirai。", "晚餐在紅磚或橫濱站。", "Yokohama Red Brick Warehouse"],
    ],
    places: ["Kamakura Station", "Tsurugaoka Hachimangu", "Kamakura High School Front Station", "Yokohama Red Brick Warehouse", "Minatomirai"],
  },
  {
    id: "day6",
    label: "Day 6",
    date: "6/28",
    weekday: "日",
    title: "淺草 -> 秋葉原 -> 羽田機場",
    mapQuery: "Akihabara Station",
    routeUrl: "https://www.google.com/maps/dir/Ikebukuro+Station/Akihabara+Station/Senso-ji/Akihabara+Station/Haneda+Airport+Terminal+3",
    metrics: ["行李先放秋葉原站", "秋葉原 -> 羽田 45-60 分鐘", "大行李櫃 ¥700-900"],
    stops: [
      ["08:45-09:20", "池袋 -> 秋葉原", "退房後帶行李到秋葉原站置物櫃。", "大行李櫃數量有限。", "Akihabara Station"],
      ["09:20-09:40", "秋葉原 -> 淺草", "放好行李後前往淺草。", "約 ¥210-230/人。", "Asakusa Station"],
      ["10:00-12:30", "淺草", "雷門、仲見世通、淺草寺、午餐。", "戒指工坊已刪除。", "Senso-ji"],
      ["13:00-18:30", "秋葉原", "TRIO、Radio Kaikan、animate、AmiAmi、GiGO。", "最後 shopping。", "Akihabara Radio Kaikan"],
      ["20:00-20:30", "秋葉原站", "取回行李、整理、充電。", "不要拖太晚。", "Akihabara Station"],
      ["21:45-22:45", "秋葉原 -> 羽田 T3", "JR 到濱松町，轉東京 Monorail。", "IC 約 ¥690/人。", "Haneda Airport Terminal 3"],
    ],
    places: ["Akihabara Station", "Senso-ji", "Akihabara Radio Kaikan", "Haneda Airport Terminal 3"],
  },
];

const restaurantData = {
  day1: [["むかん 池袋", "3.54", "不可/少量", "¥1,000-1,999"], ["麺創房 無敵家", "3.5", "不可", "¥1,000-1,999"], ["牛若丸 池袋本店", "3.4", "建議", "¥6,000-7,999"]],
  day2: [["築地玉寿司 舞濱", "3.4", "建議", "¥2,000-4,999"], ["レインフォレストカフェ", "3.3", "建議", "¥2,000-3,999"], ["ロティズ・ハウス", "3.4", "建議", "¥2,000-4,999"]],
  day3: [["つばめグリル 品川", "3.5", "建議", "¥1,500-2,999"], ["LUXE DINING HAPUNA", "3.5", "建議", "¥4,000-5,999"], ["上野 れんこん", "3.5", "建議", "¥4,000-5,999"]],
  day4: [["小川菊 川越", "3.6", "建議", "¥4,000-5,999"], ["いちのや 川越", "3.5", "建議", "¥4,000-5,999"], ["小江戸 オハナ", "3.4", "不需/排隊", "¥1,000-2,999"]],
  day5: [["キャラウェイ 鎌倉", "3.5", "不需/排隊", "¥1,000-1,999"], ["鎌倉 松原庵", "3.6", "建議", "¥2,000-4,999"], ["bills 横浜赤レンガ", "3.5", "建議", "¥2,000-4,999"]],
  day6: [["ヨシカミ 浅草", "3.5", "建議/排隊", "¥2,000-3,999"], ["並木藪蕎麦 浅草", "3.6", "不需/排隊", "¥1,500-2,999"], ["秋葉原魚金", "3.4", "建議", "¥3,000-4,999"]],
};

const checklist = ["護照、機票、酒店確認、旅遊保險", "Suica / PASMO、信用卡、現金日圓", "迪士尼 App、門票、信用卡綁定", "SHIBUYA SKY、品川水族館、Pixar 展、梵高展預約", "行動電源、轉插、充電線、相機容量", "雨傘、輕便外套、防曬、舒適鞋", "Day 6 行李先放秋葉原站置物櫃"];

const storeKey = "tokyoMobilePlannerV3";
const syncEndpointKey = "tokyoTravelSheetSyncEndpoint";
const defaultSyncEndpoint = "https://script.google.com/macros/s/AKfycbzLBof57HJzRmfEkPy09-2eaLAFq7MP1TqL21xvBUD6sqBBLjFzkXCkI-k95qvsyf5CEA/exec";
const defaultState = {
  activeDay: "day1",
  activeView: "plan",
  travelers: ["Tim", "瑤瑤"],
  doneStops: {},
  doneChecks: {},
  expenses: [
    { id: crypto.randomUUID(), day: "day1", title: "羽田深夜巴士", amount: 5600, payer: "Tim", mode: "equal", category: "交通", participants: ["Tim", "瑤瑤"] },
    { id: crypto.randomUUID(), day: "day3", title: "品川午餐", amount: 5200, payer: "瑤瑤", mode: "equal", category: "餐飲", participants: ["Tim", "瑤瑤"] },
  ],
};

let state = loadState();

const $ = (selector) => document.querySelector(selector);
const els = {
  dayRail: $("#dayRail"),
  todayBtn: $("#todayBtn"),
  heroPeople: $("#heroPeople"),
  dayKicker: $("#dayKicker"),
  dayTitle: $("#dayTitle"),
  routeLink: $("#routeLink"),
  nextStop: $("#nextStop"),
  markNextBtn: $("#markNextBtn"),
  routeMetrics: $("#routeMetrics"),
  planMap: $("#planMap"),
  progressText: $("#progressText"),
  timeline: $("#timeline"),
  restaurantScroller: $("#restaurantScroller"),
  mapDaySelect: $("#mapDaySelect"),
  bigMap: $("#bigMap"),
  placeList: $("#placeList"),
  expenseForm: $("#expenseForm"),
  expenseTitle: $("#expenseTitle"),
  expenseAmount: $("#expenseAmount"),
  expensePayer: $("#expensePayer"),
  expenseDay: $("#expenseDay"),
  expenseCategory: $("#expenseCategory"),
  splitMode: $("#splitMode"),
  participantPresets: $("#participantPresets"),
  participantList: $("#participantList"),
  totalSpent: $("#totalSpent"),
  perPerson: $("#perPerson"),
  netOwner: $("#netOwner"),
  netBalance: $("#netBalance"),
  balanceList: $("#balanceList"),
  settlementList: $("#settlementList"),
  expenseList: $("#expenseList"),
  syncStatus: $("#syncStatus"),
  syncPullBtn: $("#syncPullBtn"),
  syncPushBtn: $("#syncPushBtn"),
  resetBtn: $("#resetBtn"),
  addTravelerBtn: $("#addTravelerBtn"),
  travelerList: $("#travelerList"),
  checkList: $("#checkList"),
};

function loadState() {
  try {
    const loaded = { ...defaultState, ...JSON.parse(localStorage.getItem(storeKey)) };
    return normalizeState(loaded);
  } catch {
    return normalizeState(structuredClone(defaultState));
  }
}

function saveState() {
  localStorage.setItem(storeKey, JSON.stringify(state));
}

function syncEndpoint() {
  return localStorage.getItem(syncEndpointKey) || defaultSyncEndpoint;
}

function syncAvailable() {
  return Boolean(syncEndpoint());
}

function setSyncStatus(text, tone = "") {
  if (!els.syncStatus) return;
  els.syncStatus.textContent = text;
  els.syncStatus.dataset.tone = tone;
}

function serializeCloudState() {
  return {
    travelers: state.travelers,
    expenses: state.expenses.map((expense) => ({
      ...expense,
      amount: Number(expense.amount) || 0,
      participants: expense.participants || [],
    })),
    updatedAt: new Date().toISOString(),
  };
}

async function cloudRequest(action, payload = {}) {
  const endpoint = syncEndpoint();
  if (!endpoint) throw new Error("未設定 Google Sheet 同步網址");
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ action, ...payload }),
  });
  if (!response.ok) throw new Error(`同步失敗：HTTP ${response.status}`);
  const data = await response.json();
  if (!data.ok) throw new Error(data.error || "同步失敗");
  return data;
}

async function pullCloudState() {
  if (!syncAvailable()) {
    setSyncStatus("未連線", "warn");
    return;
  }
  setSyncStatus("拉取中...");
  try {
    const data = await cloudRequest("read");
    state.travelers = data.travelers?.length ? data.travelers : state.travelers;
    state.expenses = data.expenses?.length ? data.expenses : state.expenses;
    state = normalizeState(state);
    render();
    setSyncStatus(`已拉取 ${state.expenses.length} 筆`, "ok");
  } catch (error) {
    setSyncStatus(error.message, "error");
  }
}

async function pushCloudState() {
  if (!syncAvailable()) {
    setSyncStatus("未連線", "warn");
    return;
  }
  setSyncStatus("上傳中...");
  try {
    await cloudRequest("replace", { state: serializeCloudState() });
    setSyncStatus("已同步", "ok");
  } catch (error) {
    setSyncStatus(error.message, "error");
  }
}

function queueCloudPush() {
  if (!syncAvailable()) return;
  window.clearTimeout(queueCloudPush.timer);
  queueCloudPush.timer = window.setTimeout(() => {
    pushCloudState();
  }, 700);
}

function normalizeState(nextState) {
  nextState.travelers = nextState.travelers?.length ? nextState.travelers : [...defaultState.travelers];
  nextState.expenses = (nextState.expenses || []).map((expense) => ({
    ...expense,
    amount: Number(expense.amount) || 0,
    category: expense.category || inferCategory(expense),
    participants: (expense.participants || nextState.travelers).filter((name) => nextState.travelers.includes(name)),
  }));
  nextState.expenses.forEach((expense) => {
    if (!expense.participants.length) expense.participants = [...nextState.travelers];
  });
  return nextState;
}

function dayById(id = state.activeDay) {
  return tripDays.find((day) => day.id === id) || tripDays[0];
}

function mapEmbed(query) {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}

function mapSearch(query) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function directionsUrl(origin, destination, waypoints = []) {
  const params = new URLSearchParams({
    api: "1",
    origin,
    destination,
    travelmode: "transit",
  });
  if (waypoints.length) params.set("waypoints", waypoints.join("|"));
  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

function dayRouteUrl(day) {
  const [origin, ...rest] = day.places;
  const destination = rest.pop() || origin;
  return directionsUrl(origin, destination, rest);
}

function routeFromPrevious(day, index) {
  const destination = day.stops[index][4];
  const origin = index > 0 ? day.stops[index - 1][4] : day.places[0];
  return directionsUrl(origin, destination);
}

function render() {
  renderShell();
  renderPlan();
  renderMap();
  renderMoney();
  renderPeople();
  saveState();
}

function renderShell() {
  els.heroPeople.textContent = `${state.travelers.length}人`;
  els.dayRail.innerHTML = tripDays
    .map((day) => `<button class="day-chip ${day.id === state.activeDay ? "active" : ""}" data-day="${day.id}" type="button"><strong>${day.label}</strong><span>${day.date} ${day.weekday}</span></button>`)
    .join("");
  document.querySelectorAll(".day-chip").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeDay = button.dataset.day;
      render();
    });
  });
  document.querySelectorAll(".bottom-tabs button").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === state.activeView);
    button.onclick = () => {
      state.activeView = button.dataset.view;
      document.querySelectorAll(".app-view").forEach((view) => view.classList.remove("active"));
      $(`#view-${state.activeView}`).classList.add("active");
      document.querySelectorAll(".bottom-tabs button").forEach((item) => item.classList.toggle("active", item.dataset.view === state.activeView));
    };
  });
  document.querySelectorAll(".app-view").forEach((view) => view.classList.remove("active"));
  $(`#view-${state.activeView}`)?.classList.add("active");
}

function renderPlan() {
  const day = dayById();
  const doneCount = day.stops.filter((_, index) => state.doneStops[`${day.id}-${index}`]).length;
  const nextIndex = day.stops.findIndex((_, index) => !state.doneStops[`${day.id}-${index}`]);
  const next = day.stops[nextIndex >= 0 ? nextIndex : day.stops.length - 1];
  els.dayKicker.textContent = `${day.label} · ${day.date}（${day.weekday}）`;
  els.dayTitle.textContent = day.title;
  els.routeLink.href = dayRouteUrl(day);
  els.routeLink.textContent = "Google交通";
  els.nextStop.textContent = next ? `${next[0]} · ${next[1]}` : "全日完成";
  els.progressText.textContent = `${doneCount}/${day.stops.length} 已完成`;
  els.routeMetrics.innerHTML = day.metrics.map((m) => `<article class="metric"><span>Route note</span><strong>${m}</strong></article>`).join("");
  els.planMap.src = mapEmbed(day.mapQuery);
  els.markNextBtn.onclick = () => {
    if (nextIndex >= 0) state.doneStops[`${day.id}-${nextIndex}`] = true;
    render();
  };

  els.timeline.innerHTML = day.stops
    .map((stop, index) => {
      const key = `${day.id}-${index}`;
      const transportLink =
        index === 0
          ? ""
          : `<a class="transport-link" href="${routeFromPrevious(day, index)}" target="_blank" rel="noreferrer">Google 推薦交通</a>`;
      return `<article class="stop-card ${state.doneStops[key] ? "done" : ""}">
        <div class="time-badge">${stop[0]}</div>
        <div class="stop-main">
          <h3>${stop[1]}</h3>
          <p>${stop[2]}</p>
          <span class="stop-note">${stop[3]}</span>
          ${transportLink}
        </div>
        <button class="tick-button ${state.doneStops[key] ? "active" : ""}" data-stop="${key}" type="button">✓</button>
      </article>`;
    })
    .join("");
  document.querySelectorAll("[data-stop]").forEach((button) => {
    button.addEventListener("click", () => {
      state.doneStops[button.dataset.stop] = !state.doneStops[button.dataset.stop];
      render();
    });
  });

  els.restaurantScroller.innerHTML = (restaurantData[day.id] || [])
    .map((r) => `<article class="restaurant-card"><strong>${r[0]}</strong><span>約 ${r[1]}</span><span>${r[2]}</span><span>${r[3]}</span><a class="restaurant-map-link" href="${mapSearch(r[0] + " Tokyo")}" target="_blank" rel="noreferrer">Google 地圖</a></article>`)
    .join("");
}

function renderMap() {
  const day = dayById(els.mapDaySelect.value || state.activeDay);
  els.mapDaySelect.innerHTML = tripDays.map((d) => `<option value="${d.id}">${d.label} · ${d.date}</option>`).join("");
  els.mapDaySelect.value = day.id;
  els.bigMap.src = mapEmbed(day.mapQuery);
  els.mapDaySelect.onchange = () => {
    state.activeDay = els.mapDaySelect.value;
    render();
  };
  const items = [...day.places, ...(restaurantData[day.id] || []).map((r) => r[0])];
  els.placeList.innerHTML = items
    .map((place, index) => {
      const origin = index > 0 ? items[index - 1] : day.places[0];
      const isFirstPlace = index === 0;
      return `<article class="place-card"><strong>${place}</strong><p>${isFirstPlace ? "打開 Google Maps 查看地點資料、營業時間和附近交通。" : "由上一站出發，直接顯示 Google Maps 推薦的大眾交通路線。"}</p><a href="${isFirstPlace ? mapSearch(place + " Tokyo") : directionsUrl(origin + " Tokyo", place + " Tokyo")}" target="_blank" rel="noreferrer">${isFirstPlace ? "查看地點" : "Google 推薦交通"}</a></article>`;
    })
    .join("");
}

function renderMoney() {
  const selectedPayer = els.expensePayer.value;
  const selectedDay = els.expenseDay.value || state.activeDay;
  const selectedCategory = els.expenseCategory.value || "餐飲";
  const checkedParticipants = [...document.querySelectorAll("[data-participant]:checked")].map((input) => input.value);
  const selectedMode = els.splitMode.value || "equal";
  els.expensePayer.innerHTML = state.travelers.map((name) => `<option>${name}</option>`).join("");
  els.expenseDay.innerHTML = tripDays.map((day) => `<option value="${day.id}">${day.label} · ${day.date}</option>`).join("");
  els.expensePayer.value = state.travelers.includes(selectedPayer) ? selectedPayer : state.travelers[0];
  els.expenseDay.value = tripDays.some((day) => day.id === selectedDay) ? selectedDay : state.activeDay;
  els.expenseCategory.value = selectedCategory;
  els.splitMode.value = selectedMode;
  const activeParticipants = checkedParticipants.length ? checkedParticipants.filter((name) => state.travelers.includes(name)) : [...state.travelers];
  const otherTravelers = state.travelers.filter((name) => name !== els.expensePayer.value);
  els.participantPresets.innerHTML = [
    `<button class="preset-chip" data-participant-preset="all" type="button">全部人分</button>`,
    `<button class="preset-chip" data-participant-preset="payer" type="button">自己付自己用</button>`,
    ...otherTravelers.map((name) => `<button class="preset-chip" data-participant-preset="${name}" type="button">幫 ${name} 付</button>`),
  ].join("");
  els.participantList.innerHTML = state.travelers
    .map((name) => `<label class="participant-chip"><input data-participant value="${name}" type="checkbox" ${activeParticipants.includes(name) ? "checked" : ""} />${name}</label>`)
    .join("");
  document.querySelectorAll("[data-participant-preset]").forEach((button) => {
    button.addEventListener("click", () => {
      const preset = button.dataset.participantPreset;
      const selected = preset === "all" ? state.travelers : preset === "payer" ? [els.expensePayer.value] : [preset];
      els.splitMode.value = "equal";
      document.querySelectorAll("[data-participant]").forEach((input) => {
        input.checked = selected.includes(input.value);
      });
    });
  });
  els.expensePayer.onchange = () => renderMoney();
  const total = state.expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  els.totalSpent.textContent = yen.format(total);
  els.perPerson.textContent = yen.format(state.travelers.length ? Math.round(total / state.travelers.length) : 0);
  setSyncStatus(syncAvailable() ? "已連線" : "未連線", syncAvailable() ? "ok" : "warn");

  const paid = Object.fromEntries(state.travelers.map((name) => [name, 0]));
  const owed = Object.fromEntries(state.travelers.map((name) => [name, 0]));
  state.expenses.forEach((e) => {
    const participants = (e.participants?.length ? e.participants : state.travelers).filter((name) => state.travelers.includes(name));
    paid[e.payer] = (paid[e.payer] || 0) + Number(e.amount);
    if (e.mode === "equal" && participants.length) {
      const share = Number(e.amount) / participants.length;
      participants.forEach((name) => (owed[name] = (owed[name] || 0) + share));
    }
  });

  const balances = state.travelers.map((name) => ({
    name,
    paid: paid[name] || 0,
    owed: owed[name] || 0,
    balance: Math.round((paid[name] || 0) - (owed[name] || 0)),
  }));
  const primaryTraveler = state.travelers[0];
  const primaryBalance = balances.find((person) => person.name === primaryTraveler)?.balance || 0;
  els.netOwner.textContent = `${primaryTraveler} 淨額`;
  els.netBalance.textContent = `${primaryBalance >= 0 ? "收" : "付"} ${yen.format(Math.abs(primaryBalance))}`;
  els.balanceList.innerHTML = state.travelers
    .map((name) => {
      const balance = balances.find((person) => person.name === name)?.balance || 0;
      return `<article class="balance-card ${balance >= 0 ? "positive" : "negative"}"><div class="balance-person"><span>${name.slice(0, 1)}</span><div><strong>${name}</strong><em>已付 ${yen.format(paid[name] || 0)} · 應付 ${yen.format(Math.round(owed[name] || 0))}</em></div></div><strong>${balance >= 0 ? "收回" : "補付"} ${yen.format(Math.abs(balance))}</strong></article>`;
    })
    .join("");
  els.settlementList.innerHTML = buildSettlements(balances)
    .map((item) => `<article class="settlement-row"><div><strong>${item.from}</strong><span>給 ${item.to}</span></div><em>${yen.format(item.amount)}</em><button class="settle-button" data-settle-from="${item.from}" data-settle-to="${item.to}" data-settle-amount="${item.amount}" type="button">已還</button></article>`)
    .join("") || `<article class="empty-row">目前不需要互相轉帳。</article>`;

  els.expenseList.innerHTML = [...state.expenses]
    .reverse()
    .map((e) => {
      const participants = (e.participants?.length ? e.participants : state.travelers).join("、");
      const splitText = e.mode === "equal" ? `${expenseSplitLabel(e)}：${participants}` : "只記付款，不分帳";
      return `<article class="expense-row"><div class="expense-icon">${categoryIcon(e.category)}</div><div><strong>${e.title}</strong><span>${dayById(e.day).label} · ${e.category || "其他"} · ${e.payer} 付款</span><small>${splitText}</small></div><strong>${yen.format(e.amount)}</strong><button class="delete-button" data-expense="${e.id}" type="button">×</button></article>`;
    })
    .join("");
  document.querySelectorAll("[data-settle-from]").forEach((button) => {
    button.addEventListener("click", () => {
      state.expenses.push({
        id: crypto.randomUUID(),
        title: `結算：${button.dataset.settleFrom} 給 ${button.dataset.settleTo}`,
        amount: Number(button.dataset.settleAmount),
        payer: button.dataset.settleFrom,
        day: state.activeDay,
        mode: "equal",
        category: "結算",
        participants: [button.dataset.settleTo],
      });
      render();
      queueCloudPush();
    });
  });
  document.querySelectorAll("[data-expense]").forEach((button) => {
    button.addEventListener("click", () => {
      state.expenses = state.expenses.filter((e) => e.id !== button.dataset.expense);
      render();
      queueCloudPush();
    });
  });
}

function categoryIcon(category = "其他") {
  return {
    餐飲: "食",
    交通: "交",
    門票: "票",
    購物: "買",
    住宿: "住",
    結算: "還",
    其他: "記",
  }[category] || "記";
}

function inferCategory(expense) {
  const text = `${expense.title || ""} ${dayById(expense.day).title || ""}`;
  if (/結算|還/.test(text)) return "結算";
  if (/巴士|交通|JR|電車|鐵路|機場|羽田|池袋|舞濱|秋葉原|淺草/.test(text)) return "交通";
  if (/午餐|晚餐|餐|食|拉麵|壽司|咖啡/.test(text)) return "餐飲";
  if (/迪士尼|展|水族館|SKY|美術館|門票/.test(text)) return "門票";
  if (/酒店|住宿/.test(text)) return "住宿";
  if (/shopping|購物|Donki|animate|K-BOOKS|TRIO|AmiAmi/.test(text)) return "購物";
  return "其他";
}

function expenseSplitLabel(expense) {
  const participants = expense.participants || [];
  if (participants.length === 1 && participants[0] !== expense.payer) return `幫 ${participants[0]} 付`;
  if (participants.length === 1 && participants[0] === expense.payer) return "自己付自己用";
  return "平均分";
}

function buildSettlements(balances) {
  const debtors = balances
    .filter((person) => person.balance < 0)
    .map((person) => ({ name: person.name, amount: Math.abs(person.balance) }))
    .sort((a, b) => b.amount - a.amount);
  const creditors = balances
    .filter((person) => person.balance > 0)
    .map((person) => ({ name: person.name, amount: person.balance }))
    .sort((a, b) => b.amount - a.amount);
  const settlements = [];
  let debtorIndex = 0;
  let creditorIndex = 0;
  while (debtorIndex < debtors.length && creditorIndex < creditors.length) {
    const amount = Math.min(debtors[debtorIndex].amount, creditors[creditorIndex].amount);
    if (amount > 0) settlements.push({ from: debtors[debtorIndex].name, to: creditors[creditorIndex].name, amount });
    debtors[debtorIndex].amount -= amount;
    creditors[creditorIndex].amount -= amount;
    if (debtors[debtorIndex].amount <= 0) debtorIndex += 1;
    if (creditors[creditorIndex].amount <= 0) creditorIndex += 1;
  }
  return settlements;
}

function renderPeople() {
  els.travelerList.innerHTML = state.travelers
    .map((name, i) => `<article class="member-card"><div class="member-name"><i class="member-dot" style="background:${colors[i % colors.length]}"></i><div><strong>${name}</strong><span>同行成員</span></div></div><button class="delete-button" data-person="${name}" type="button">×</button></article>`)
    .join("");
  document.querySelectorAll("[data-person]").forEach((button) => {
    button.addEventListener("click", () => {
      if (state.travelers.length <= 1) return;
      state.travelers = state.travelers.filter((name) => name !== button.dataset.person);
      state.expenses = state.expenses.filter((e) => e.payer !== button.dataset.person);
      render();
    });
  });

  els.checkList.innerHTML = checklist
    .map((item, index) => `<article class="check-row ${state.doneChecks[index] ? "done" : ""}"><button data-check="${index}" type="button">✓</button><span>${item}</span></article>`)
    .join("");
  document.querySelectorAll("[data-check]").forEach((button) => {
    button.addEventListener("click", () => {
      state.doneChecks[button.dataset.check] = !state.doneChecks[button.dataset.check];
      render();
    });
  });
}

els.expenseForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const participants = [...document.querySelectorAll("[data-participant]:checked")].map((input) => input.value);
  state.expenses.push({
    id: crypto.randomUUID(),
    title: els.expenseTitle.value.trim(),
    amount: Number(els.expenseAmount.value),
    payer: els.expensePayer.value,
    day: els.expenseDay.value,
    mode: els.splitMode.value,
    category: els.expenseCategory.value,
    participants: participants.length ? participants : [els.expensePayer.value],
  });
  els.expenseTitle.value = "";
  els.expenseAmount.value = "";
  render();
  queueCloudPush();
});

els.addTravelerBtn.addEventListener("click", () => {
  const name = prompt("同行人名稱");
  if (name?.trim() && !state.travelers.includes(name.trim())) {
    state.travelers.push(name.trim());
    render();
    queueCloudPush();
  }
});

els.resetBtn.addEventListener("click", () => {
  if (confirm("重設記帳、成員和完成狀態？")) {
    state = structuredClone(defaultState);
    render();
    queueCloudPush();
  }
});

els.syncPullBtn.addEventListener("click", pullCloudState);
els.syncPushBtn.addEventListener("click", pushCloudState);

els.todayBtn.addEventListener("click", () => {
  state.activeView = "plan";
  state.activeDay = "day1";
  render();
});

render();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {});
  });
}
