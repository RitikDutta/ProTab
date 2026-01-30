const STORAGE_KEY = "atlas.newtab.state.v1";
const TIMER_KEY = "atlas.newtab.timer.v1";

const DEFAULT_LINKS = [
  { id: "mail", title: "Mail", url: "https://mail.google.com" },
  { id: "calendar", title: "Calendar", url: "https://calendar.google.com" },
  { id: "github", title: "GitHub", url: "https://github.com" },
  { id: "wiki", title: "Wiki", url: "https://wikipedia.org" }
];

const DEFAULT_STATE = {
  name: "Friend",
  use24h: false,
  theme: "ember",
  engine: "google",
  intent: "",
  intentDate: "",
  links: DEFAULT_LINKS.slice(),
  tasks: [],
  notes: "",
  zen: false
};

const UNIT_TABLES = {
  length: {
    label: "Length",
    units: [
      { id: "m", label: "Meters (m)", factor: 1 },
      { id: "km", label: "Kilometers (km)", factor: 1000 },
      { id: "cm", label: "Centimeters (cm)", factor: 0.01 },
      { id: "mm", label: "Millimeters (mm)", factor: 0.001 },
      { id: "in", label: "Inches (in)", factor: 0.0254 },
      { id: "ft", label: "Feet (ft)", factor: 0.3048 },
      { id: "yd", label: "Yards (yd)", factor: 0.9144 },
      { id: "mi", label: "Miles (mi)", factor: 1609.344 }
    ]
  },
  weight: {
    label: "Weight",
    units: [
      { id: "kg", label: "Kilograms (kg)", factor: 1 },
      { id: "g", label: "Grams (g)", factor: 0.001 },
      { id: "lb", label: "Pounds (lb)", factor: 0.45359237 },
      { id: "oz", label: "Ounces (oz)", factor: 0.028349523125 }
    ]
  },
  volume: {
    label: "Volume",
    units: [
      { id: "l", label: "Liters (L)", factor: 1 },
      { id: "ml", label: "Milliliters (mL)", factor: 0.001 },
      { id: "cup", label: "Cups (US)", factor: 0.2365882365 },
      { id: "pt", label: "Pints (US)", factor: 0.473176473 },
      { id: "qt", label: "Quarts (US)", factor: 0.946352946 },
      { id: "gal", label: "Gallons (US)", factor: 3.785411784 },
      { id: "floz", label: "Fluid oz (US)", factor: 0.0295735295625 }
    ]
  },
  temp: {
    label: "Temperature",
    units: [
      { id: "c", label: "Celsius (C)" },
      { id: "f", label: "Fahrenheit (F)" },
      { id: "k", label: "Kelvin (K)" }
    ]
  }
};

const CURRENCY_API = {
  list: "https://api.frankfurter.dev/v1/currencies",
  latest: "https://api.frankfurter.dev/v1/latest"
};

const CURRENCY_FALLBACK = {
  USD: "US Dollar",
  EUR: "Euro",
  INR: "Indian Rupee",
  GBP: "British Pound",
  JPY: "Japanese Yen",
  AUD: "Australian Dollar",
  CAD: "Canadian Dollar",
  CHF: "Swiss Franc",
  CNY: "Chinese Yuan",
  SGD: "Singapore Dollar",
  AED: "UAE Dirham",
  NZD: "New Zealand Dollar",
  SEK: "Swedish Krona",
  NOK: "Norwegian Krone",
  KRW: "South Korean Won",
  ZAR: "South African Rand",
  MXN: "Mexican Peso",
  BRL: "Brazilian Real",
  TRY: "Turkish Lira",
  HKD: "Hong Kong Dollar",
  IDR: "Indonesian Rupiah",
  THB: "Thai Baht",
  MYR: "Malaysian Ringgit",
  PHP: "Philippine Peso",
  PLN: "Polish Zloty",
  DKK: "Danish Krone",
  HUF: "Hungarian Forint",
  CZK: "Czech Koruna",
  ILS: "Israeli Shekel"
};

const SALARY_DEFAULTS = {
  ctc: 1200000,
  regime: "new",
  variablePct: 10,
  basicPct: 40,
  hraPct: 40,
  pfRatePct: 12,
  pfCapMonthly: 15000,
  pfRule: "capped",
  employerPfInCtc: true,
  gratuityInCtc: true,
  gratuityRatePct: 4.81,
  standardDeduction: 50000,
  rentMonthly: 0,
  metro: false,
  variableGuaranteed: true,
  variableMonthly: false,
  professionalTaxMonthly: 200,
  otherDeductMonthly: 0,
  benefitsAnnual: 0,
  oneTimeAnnual: 0,
  otherTaxDeductAnnual: 0
};

const SALARY_TAX_CONFIG = {
  cessRate: 0.04,
  slabs: {
    old: [
      { upto: 250000, rate: 0 },
      { upto: 500000, rate: 0.05 },
      { upto: 1000000, rate: 0.2 },
      { upto: null, rate: 0.3 }
    ],
    new: [
      { upto: 300000, rate: 0 },
      { upto: 600000, rate: 0.05 },
      { upto: 900000, rate: 0.1 },
      { upto: 1200000, rate: 0.15 },
      { upto: 1500000, rate: 0.2 },
      { upto: null, rate: 0.3 }
    ]
  }
};

const elements = {
  greeting: document.querySelector("#greeting"),
  nameDisplay: document.querySelector("#nameDisplay"),
  nameInput: document.querySelector("#nameInput"),
  clock: document.querySelector("#clock"),
  date: document.querySelector("#date"),
  searchForm: document.querySelector("#searchForm"),
  searchInput: document.querySelector("#searchInput"),
  engineSelect: document.querySelector("#engineSelect"),
  siteSearches: document.querySelectorAll(".site-search"),
  linksList: document.querySelector("#linksList"),
  linksEmpty: document.querySelector("#linksEmpty"),
  linkForm: document.querySelector("#linkForm"),
  linkTitle: document.querySelector("#linkTitle"),
  linkUrl: document.querySelector("#linkUrl"),
  linkIcon: document.querySelector("#linkIcon"),
  linkModal: document.querySelector("#linkModal"),
  linkEditForm: document.querySelector("#linkEditForm"),
  linkEditTitle: document.querySelector("#linkEditTitle"),
  linkEditUrl: document.querySelector("#linkEditUrl"),
  linkEditIcon: document.querySelector("#linkEditIcon"),
  taskList: document.querySelector("#taskList"),
  tasksEmpty: document.querySelector("#tasksEmpty"),
  taskForm: document.querySelector("#taskForm"),
  taskInput: document.querySelector("#taskInput"),
  notesInput: document.querySelector("#notesInput"),
  use24h: document.querySelector("#use24h"),
  themeRow: document.querySelector("#themeRow"),
  zenToggle: document.querySelector("#zenToggle"),
  resetBtn: document.querySelector("#resetBtn"),
  timerRing: document.querySelector("#timerRing"),
  timerDisplay: document.querySelector("#timerDisplay"),
  timerLabel: document.querySelector("#timerLabel"),
  timerControls: document.querySelector(".timer-controls"),
  timerPresets: document.querySelector(".timer-presets"),
  calcPad: document.querySelector("#calcPad"),
  calcExpression: document.querySelector("#calcExpression"),
  calcBigResult: document.querySelector("#calcBigResult"),
  currencyAmount: document.querySelector("#currencyAmount"),
  currencyFrom: document.querySelector("#currencyFrom"),
  currencyTo: document.querySelector("#currencyTo"),
  currencySwap: document.querySelector("#currencySwap"),
  currencyResult: document.querySelector("#currencyResult"),
  currencyStatus: document.querySelector("#currencyStatus"),
  unitCategory: document.querySelector("#unitCategory"),
  unitValue: document.querySelector("#unitValue"),
  unitFrom: document.querySelector("#unitFrom"),
  unitTo: document.querySelector("#unitTo"),
  unitSwap: document.querySelector("#unitSwap"),
  unitResult: document.querySelector("#unitResult"),
  percentValue: document.querySelector("#percentValue"),
  percentBase: document.querySelector("#percentBase"),
  percentCalc: document.querySelector("#percentCalc"),
  percentResult: document.querySelector("#percentResult"),
  changeOld: document.querySelector("#changeOld"),
  changeNew: document.querySelector("#changeNew"),
  changeCalc: document.querySelector("#changeCalc"),
  changeResult: document.querySelector("#changeResult"),
  splitTotal: document.querySelector("#splitTotal"),
  splitPeople: document.querySelector("#splitPeople"),
  splitTip: document.querySelector("#splitTip"),
  splitTax: document.querySelector("#splitTax"),
  splitCalc: document.querySelector("#splitCalc"),
  splitResult: document.querySelector("#splitResult"),
  salaryCtc: document.querySelector("#salaryCtc"),
  salaryRegime: document.querySelector("#salaryRegime"),
  salaryVariable: document.querySelector("#salaryVariable"),
  salaryVariableInput: document.querySelector("#salaryVariableInput"),
  salaryPfRule: document.querySelector("#salaryPfRule"),
  salaryEmployerPf: document.querySelector("#salaryEmployerPf"),
  salaryGratuity: document.querySelector("#salaryGratuity"),
  salaryVariableGuaranteed: document.querySelector("#salaryVariableGuaranteed"),
  salaryVariableMonthly: document.querySelector("#salaryVariableMonthly"),
  salaryPt: document.querySelector("#salaryPt"),
  salaryOtherDeduct: document.querySelector("#salaryOtherDeduct"),
  salaryInhandMonthly: document.querySelector("#salaryInhandMonthly"),
  salaryInhandAnnual: document.querySelector("#salaryInhandAnnual"),
  salaryInhandMonthlyBlock: document.querySelector("#salaryInhandMonthlyBlock"),
  salaryInhandAnnualBlock: document.querySelector("#salaryInhandAnnualBlock"),
  salaryFixedAnnual: document.querySelector("#salaryFixedAnnual"),
  salaryFixedMonthly: document.querySelector("#salaryFixedMonthly"),
  salaryDeductPf: document.querySelector("#salaryDeductPf"),
  salaryDeductPt: document.querySelector("#salaryDeductPt"),
  salaryDeductTds: document.querySelector("#salaryDeductTds"),
  salaryDeductOther: document.querySelector("#salaryDeductOther"),
  salaryCtcFixed: document.querySelector("#salaryCtcFixed"),
  salaryCtcVariable: document.querySelector("#salaryCtcVariable"),
  salaryCtcEmployerPf: document.querySelector("#salaryCtcEmployerPf"),
  salaryCtcGratuity: document.querySelector("#salaryCtcGratuity"),
  salaryCtcBenefits: document.querySelector("#salaryCtcBenefits"),
  salaryCtcOneTime: document.querySelector("#salaryCtcOneTime"),
  salaryEmployerPfLabel: document.querySelector("#salaryEmployerPfLabel"),
  salaryGratuityLabel: document.querySelector("#salaryGratuityLabel"),
  salaryBasicPct: document.querySelector("#salaryBasicPct"),
  salaryHraPct: document.querySelector("#salaryHraPct"),
  salaryStandardDeduction: document.querySelector("#salaryStandardDeduction"),
  salaryRent: document.querySelector("#salaryRent"),
  salaryMetro: document.querySelector("#salaryMetro"),
  salaryPfRate: document.querySelector("#salaryPfRate"),
  salaryPfCap: document.querySelector("#salaryPfCap"),
  salaryGratuityRate: document.querySelector("#salaryGratuityRate"),
  salaryBenefits: document.querySelector("#salaryBenefits"),
  salaryOneTime: document.querySelector("#salaryOneTime"),
  salaryOtherTaxDeduct: document.querySelector("#salaryOtherTaxDeduct"),
  salaryCalculate: document.querySelector("#salaryCalculate"),
  salaryCopy: document.querySelector("#salaryCopy"),
  salaryWhy: document.querySelector("#salaryWhy"),
  salaryWarnings: document.querySelector("#salaryWarnings"),
  salaryTargetInhand: document.querySelector("#salaryTargetInhand"),
  salaryTargetCalc: document.querySelector("#salaryTargetCalc"),
  salaryTargetCtc: document.querySelector("#salaryTargetCtc"),
  salaryCompareA: document.querySelector("#salaryCompareA"),
  salaryCompareB: document.querySelector("#salaryCompareB"),
  salaryCompareCalc: document.querySelector("#salaryCompareCalc"),
  salaryCompareResult: document.querySelector("#salaryCompareResult")
};

const state = loadState();
let timer = loadTimer();
let editingLinkId = null;
let calcExpression = "";
let currencyRequestId = 0;
let currencyUpdateTimer = null;
const currencyRatesCache = new Map();

init();

function init() {
  applyState();
  renderLinks();
  renderTasks();
  renderNotes();
  if (hasClockElements()) {
    updateClock();
    startClock();
  }
  initTimer();
  initTools();
  bindEvents();
}

function bindEvents() {
  if (elements.nameInput) {
    elements.nameInput.addEventListener("input", (event) => {
      state.name = event.target.value.trim() || "Friend";
      saveState();
      renderName();
    });
  }

  if (elements.use24h) {
    elements.use24h.addEventListener("change", (event) => {
      state.use24h = event.target.checked;
      saveState();
      updateClock();
    });
  }

  if (elements.engineSelect) {
    elements.engineSelect.addEventListener("change", (event) => {
      state.engine = event.target.value;
      saveState();
    });
  }

  if (elements.searchForm) {
    elements.searchForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const query = elements.searchInput.value.trim();
      if (!query) return;
      const target = looksLikeUrl(query) ? normalizeUrl(query) : searchUrl(query);
      window.location.href = target;
    });
  }

  bindSiteSearches();

  elements.linkForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = elements.linkTitle.value.trim();
    const url = normalizeUrl(elements.linkUrl.value);
    const icon = normalizeIconUrl(elements.linkIcon.value);
    if (!url) return;
    state.links.push({ id: uid(), title, url, icon });
    if (state.links.length > 16) {
      state.links.shift();
    }
    saveState();
    renderLinks();
    elements.linkForm.reset();
  });

  elements.linksList.addEventListener("click", (event) => {
    const edit = event.target.closest("[data-link-edit]");
    if (edit) {
      event.preventDefault();
      const item = edit.closest("li");
      const id = item ? item.dataset.id : null;
      if (!id) return;
      const link = state.links.find((entry) => entry.id === id);
      if (!link) return;
      openLinkModal(link);
      return;
    }
    const remove = event.target.closest("[data-link-remove]");
    if (!remove) return;
    const item = remove.closest("li");
    const id = item ? item.dataset.id : null;
    if (!id) return;
    state.links = state.links.filter((link) => link.id !== id);
    saveState();
    renderLinks();
  });

  elements.taskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = elements.taskInput.value.trim();
    if (!text) return;
    state.tasks.unshift({ id: uid(), text, done: false });
    state.tasks = state.tasks.slice(0, 20);
    saveState();
    renderTasks();
    elements.taskForm.reset();
  });

  elements.taskList.addEventListener("change", (event) => {
    if (!event.target.matches("input[type=\"checkbox\"]")) return;
    const item = event.target.closest("li");
    const id = item ? item.dataset.id : null;
    if (!id) return;
    state.tasks = state.tasks.map((task) =>
      task.id === id ? { ...task, done: event.target.checked } : task
    );
    saveState();
    renderTasks();
  });

  elements.taskList.addEventListener("click", (event) => {
    const remove = event.target.closest("[data-task-remove]");
    if (!remove) return;
    const item = event.target.closest("li");
    const id = item ? item.dataset.id : null;
    if (!id) return;
    state.tasks = state.tasks.filter((task) => task.id !== id);
    saveState();
    renderTasks();
  });

  elements.notesInput.addEventListener("input", (event) => {
    state.notes = event.target.value;
    saveState();
  });

  elements.linkEditForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!editingLinkId) return;
    const title = elements.linkEditTitle.value.trim();
    const url = normalizeUrl(elements.linkEditUrl.value);
    const icon = normalizeIconUrl(elements.linkEditIcon.value);
    if (!url) return;
    state.links = state.links.map((link) =>
      link.id === editingLinkId ? { ...link, title, url, icon } : link
    );
    saveState();
    renderLinks();
    closeLinkModal();
  });

  elements.linkModal.addEventListener("click", (event) => {
    if (event.target.closest("[data-modal-close]")) {
      closeLinkModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (isModalOpen()) closeLinkModal();
  });

  elements.themeRow.addEventListener("click", (event) => {
    const swatch = event.target.closest("[data-theme]");
    if (!swatch) return;
    state.theme = swatch.dataset.theme;
    saveState();
    applyTheme();
  });

  elements.zenToggle.addEventListener("click", () => {
    state.zen = !state.zen;
    saveState();
    applyZen();
  });

  elements.resetBtn.addEventListener("click", () => {
    const confirmed = window.confirm("Reset all settings and data?");
    if (!confirmed) return;
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(TIMER_KEY);
    window.location.reload();
  });

  elements.timerControls.addEventListener("click", (event) => {
    const action = event.target.dataset.timer;
    if (!action) return;
    if (action === "start") {
      startTimer();
    } else if (action === "pause") {
      pauseTimer();
    } else if (action === "reset") {
      resetTimer();
    }
  });

  elements.timerPresets.addEventListener("click", (event) => {
    const mins = Number.parseInt(event.target.dataset.mins, 10);
    if (!mins) return;
    setTimerPreset(mins, event.target.textContent);
  });

  if (elements.calcPad) {
    elements.calcPad.addEventListener("click", (event) => {
      const button = event.target.closest("button");
      if (!button) return;
      const action = button.dataset.action;
      const value = button.dataset.value;
      if (action) {
        handleCalcAction(action);
        return;
      }
      if (value) {
        appendCalcValue(value);
      }
    });
  }

  if (elements.currencyAmount) {
    elements.currencyAmount.addEventListener("input", () => {
      scheduleCurrencyUpdate();
    });
  }

  if (elements.currencyFrom) {
    elements.currencyFrom.addEventListener("change", () => {
      updateCurrencyResult();
    });
  }

  if (elements.currencyTo) {
    elements.currencyTo.addEventListener("change", () => {
      updateCurrencyResult();
    });
  }

  if (elements.currencySwap) {
    elements.currencySwap.addEventListener("click", () => {
      if (!elements.currencyFrom || !elements.currencyTo) return;
      const currentFrom = elements.currencyFrom.value;
      elements.currencyFrom.value = elements.currencyTo.value;
      elements.currencyTo.value = currentFrom;
      updateCurrencyResult();
    });
  }

  if (elements.unitCategory) {
    elements.unitCategory.addEventListener("change", () => {
      populateUnitSelects(elements.unitCategory.value);
      updateUnitResult();
    });
  }

  if (elements.unitValue) {
    elements.unitValue.addEventListener("input", updateUnitResult);
  }

  if (elements.unitFrom) {
    elements.unitFrom.addEventListener("change", updateUnitResult);
  }

  if (elements.unitTo) {
    elements.unitTo.addEventListener("change", updateUnitResult);
  }

  if (elements.unitSwap) {
    elements.unitSwap.addEventListener("click", () => {
      if (!elements.unitFrom || !elements.unitTo) return;
      const currentFrom = elements.unitFrom.value;
      elements.unitFrom.value = elements.unitTo.value;
      elements.unitTo.value = currentFrom;
      updateUnitResult();
    });
  }

  if (elements.percentCalc) {
    elements.percentCalc.addEventListener("click", updatePercentResult);
  }

  if (elements.percentValue) {
    elements.percentValue.addEventListener("input", updatePercentResult);
  }

  if (elements.percentBase) {
    elements.percentBase.addEventListener("input", updatePercentResult);
  }

  if (elements.changeCalc) {
    elements.changeCalc.addEventListener("click", updateChangeResult);
  }

  if (elements.changeOld) {
    elements.changeOld.addEventListener("input", updateChangeResult);
  }

  if (elements.changeNew) {
    elements.changeNew.addEventListener("input", updateChangeResult);
  }

  if (elements.splitCalc) {
    elements.splitCalc.addEventListener("click", updateSplitResult);
  }

  if (elements.splitTotal) {
    elements.splitTotal.addEventListener("input", updateSplitResult);
  }

  if (elements.splitPeople) {
    elements.splitPeople.addEventListener("input", updateSplitResult);
  }

  if (elements.splitTip) {
    elements.splitTip.addEventListener("input", updateSplitResult);
  }

  if (elements.splitTax) {
    elements.splitTax.addEventListener("input", updateSplitResult);
  }
}

function bindSiteSearches() {
  if (!elements.siteSearches || elements.siteSearches.length === 0) return;
  elements.siteSearches.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const input = form.querySelector("input");
      if (!input) return;
      const query = input.value.trim();
      if (!query) return;
      const template = form.dataset.template || "";
      if (!template) return;
      const target = template.replace("abc", encodeURIComponent(query));
      window.location.href = target;
    });
  });
}

function initTools() {
  if (elements.unitCategory) {
    populateUnitSelects(elements.unitCategory.value || "length");
    updateUnitResult();
  }
  initCalculator();
  initCurrencyTool();
  updatePercentResult();
  updateChangeResult();
  updateSplitResult();
  initSalaryTool();
}

function applyState() {
  const today = todayKey(new Date());
  if (state.intentDate !== today) {
    state.intent = "";
    state.intentDate = today;
  }

  if (!["google", "ddg", "youtube", "github"].includes(state.engine)) {
    state.engine = "google";
  }
  if (!["ember", "aegean", "citrus", "slate"].includes(state.theme)) {
    state.theme = "ember";
  }

  renderName();
  if (elements.nameInput) {
    elements.nameInput.value = state.name === "Friend" ? "" : state.name;
  }
  if (elements.use24h) {
    elements.use24h.checked = state.use24h;
  }
  if (elements.engineSelect) {
    elements.engineSelect.value = state.engine;
  }
  applyTheme();
  applyZen();
  saveState();
}

function applyTheme() {
  document.documentElement.dataset.theme = state.theme;
  document.querySelectorAll(".theme-swatch").forEach((swatch) => {
    swatch.classList.toggle("active", swatch.dataset.theme === state.theme);
  });
}

function applyZen() {
  document.body.classList.toggle("zen", state.zen);
}

function renderName() {
  if (!elements.nameDisplay) return;
  elements.nameDisplay.textContent = state.name || "Friend";
}

function renderLinks() {
  elements.linksList.innerHTML = "";
  if (!state.links.length) {
    elements.linksEmpty.style.display = "block";
    return;
  }
  elements.linksEmpty.style.display = "none";
  state.links.forEach((link) => {
    const li = document.createElement("li");
    li.className = "pill-item";
    li.dataset.id = link.id;

    const labelText = typeof link.title === "string" ? link.title.trim() : "";
    const fallbackLabel = domainFromUrl(link.url) || "Link";
    const ariaLabel = labelText || fallbackLabel;

    const circle = document.createElement("div");
    circle.className = "pill-circle";

    const anchor = document.createElement("a");
    anchor.href = link.url;
    anchor.className = "pill-link";
    anchor.setAttribute("aria-label", ariaLabel);
    anchor.title = labelText || link.url;
    anchor.rel = "noopener";

    const icon = document.createElement("img");
    icon.className = "pill-icon";
    icon.alt = "";
    icon.decoding = "async";
    icon.referrerPolicy = "no-referrer";
    setFavicon(icon, link.url, ariaLabel, link.icon);
    anchor.appendChild(icon);

    const edit = document.createElement("button");
    edit.type = "button";
    edit.className = "icon-btn edit-btn";
    edit.setAttribute("aria-label", "Edit link");
    edit.dataset.linkEdit = "true";
    edit.textContent = "e";

    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "icon-btn remove-btn";
    remove.setAttribute("aria-label", "Remove link");
    remove.dataset.linkRemove = "true";
    remove.textContent = "x";

    circle.append(anchor, edit, remove);
    li.append(circle);
    if (labelText) {
      const label = document.createElement("span");
      label.className = "pill-label";
      label.textContent = labelText;
      li.append(label);
    }
    elements.linksList.appendChild(li);
  });
}

function openLinkModal(link) {
  editingLinkId = link.id;
  elements.linkEditTitle.value = link.title || "";
  elements.linkEditUrl.value = link.url || "";
  elements.linkEditIcon.value = link.icon || "";
  elements.linkModal.classList.add("is-open");
  elements.linkModal.setAttribute("aria-hidden", "false");
  elements.linkEditTitle.focus();
}

function closeLinkModal() {
  editingLinkId = null;
  elements.linkEditForm.reset();
  elements.linkModal.classList.remove("is-open");
  elements.linkModal.setAttribute("aria-hidden", "true");
}

function isModalOpen() {
  return elements.linkModal.classList.contains("is-open");
}

function renderTasks() {
  elements.taskList.innerHTML = "";
  if (!state.tasks.length) {
    elements.tasksEmpty.style.display = "block";
    return;
  }
  elements.tasksEmpty.style.display = "none";
  state.tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = `task-item${task.done ? " done" : ""}`;
    li.dataset.id = task.id;

    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    const text = document.createElement("span");
    text.textContent = task.text;
    label.append(checkbox, text);

    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "icon-btn";
    remove.setAttribute("aria-label", "Remove task");
    remove.dataset.taskRemove = "true";
    remove.textContent = "x";

    li.append(label, remove);
    elements.taskList.appendChild(li);
  });
}

function renderNotes() {
  elements.notesInput.value = state.notes;
}

function initCalculator() {
  if (!elements.calcExpression || !elements.calcBigResult) return;
  calcExpression = "";
  updateCalcDisplay();
}

function appendCalcValue(value) {
  if (!elements.calcExpression || !elements.calcBigResult) return;
  if (calcExpression === "0" && /^[0-9]$/.test(value)) {
    calcExpression = value;
  } else {
    calcExpression += value;
  }
  updateCalcDisplay();
}

function handleCalcAction(action) {
  if (!elements.calcExpression || !elements.calcBigResult) return;
  if (action === "clear") {
    calcExpression = "";
    updateCalcDisplay();
    return;
  }
  if (action === "back") {
    calcExpression = calcExpression.slice(0, -1);
    updateCalcDisplay();
    return;
  }
  if (action === "equals") {
    const outcome = evaluateExpression(calcExpression);
    if (!outcome.error && outcome.value !== null) {
      calcExpression = String(outcome.value);
    }
    updateCalcDisplay();
  }
}

function updateCalcDisplay() {
  const display = calcExpression || "0";
  elements.calcExpression.textContent = display;

  const outcome = evaluateExpression(calcExpression);
  if (outcome.empty) {
    elements.calcBigResult.textContent = "= 0";
    return;
  }
  if (outcome.error || outcome.value === null) {
    elements.calcBigResult.textContent = "= Invalid";
    return;
  }
  const formatted = formatNumber(outcome.value, 8);
  elements.calcBigResult.textContent = `= ${formatted}`;
}

async function initCurrencyTool() {
  if (!elements.currencyFrom || !elements.currencyTo) return;
  const currencyMap = await fetchCurrencyList();
  const mapToUse = currencyMap && Object.keys(currencyMap).length ? currencyMap : CURRENCY_FALLBACK;
  populateCurrencyOptions(mapToUse);

  const available = new Set(Object.keys(mapToUse));
  const defaultFrom = available.has("INR") ? "INR" : elements.currencyFrom.value;
  const defaultTo = available.has("USD") ? "USD" : elements.currencyTo.value;
  elements.currencyFrom.value = defaultFrom || elements.currencyFrom.value;
  elements.currencyTo.value = defaultTo || elements.currencyTo.value;

  updateCurrencyResult();
}

function scheduleCurrencyUpdate(delay = 250) {
  if (currencyUpdateTimer) {
    clearTimeout(currencyUpdateTimer);
  }
  currencyUpdateTimer = setTimeout(() => {
    updateCurrencyResult();
  }, delay);
}

async function updateCurrencyResult() {
  if (!elements.currencyAmount || !elements.currencyFrom || !elements.currencyTo || !elements.currencyResult) {
    return;
  }
  const amount = parseNumber(elements.currencyAmount.value);
  const from = elements.currencyFrom.value;
  const to = elements.currencyTo.value;

  if (amount === null || !from || !to) {
    elements.currencyResult.textContent = "—";
    setCurrencyStatus("");
    return;
  }

  if (from === to) {
    elements.currencyResult.textContent = `${formatNumber(amount, 6)} ${to}`;
    setCurrencyStatus("Same currency");
    return;
  }

  const requestId = (currencyRequestId += 1);
  setCurrencyStatus("Fetching rate...");
  const rateData = await getCurrencyRate(from, to);
  if (requestId !== currencyRequestId) return;

  if (!rateData) {
    elements.currencyResult.textContent = "—";
    setCurrencyStatus("Rate unavailable");
    return;
  }

  const converted = amount * rateData.rate;
  elements.currencyResult.textContent = `${formatNumber(converted, 6)} ${to}`;
  setCurrencyStatus(rateData.date ? `Updated ${rateData.date}` : "Updated");
}

function setCurrencyStatus(message) {
  if (!elements.currencyStatus) return;
  elements.currencyStatus.textContent = message || "Live rates";
}

async function fetchCurrencyList() {
  try {
    const response = await fetch(CURRENCY_API.list);
    if (!response.ok) return null;
    const data = await response.json();
    if (!data || typeof data !== "object") return null;
    return data;
  } catch (error) {
    return null;
  }
}

function populateCurrencyOptions(currencyMap) {
  if (!elements.currencyFrom || !elements.currencyTo) return;
  const entries = Object.entries(currencyMap)
    .map(([code, name]) => ({ code, name }))
    .sort((a, b) => a.code.localeCompare(b.code));

  elements.currencyFrom.innerHTML = "";
  elements.currencyTo.innerHTML = "";

  entries.forEach((entry) => {
    const optionFrom = document.createElement("option");
    optionFrom.value = entry.code;
    optionFrom.textContent = `${entry.code} — ${entry.name}`;
    elements.currencyFrom.appendChild(optionFrom);

    const optionTo = document.createElement("option");
    optionTo.value = entry.code;
    optionTo.textContent = `${entry.code} — ${entry.name}`;
    elements.currencyTo.appendChild(optionTo);
  });

  if (entries.length >= 2) {
    elements.currencyFrom.value = entries[0].code;
    elements.currencyTo.value = entries[1].code;
  } else if (entries.length === 1) {
    elements.currencyFrom.value = entries[0].code;
    elements.currencyTo.value = entries[0].code;
  }
}

async function getCurrencyRate(base, symbol) {
  const cached = currencyRatesCache.get(base);
  if (cached && cached.rates && typeof cached.rates[symbol] === "number") {
    return { rate: cached.rates[symbol], date: cached.date };
  }

  try {
    const url = `${CURRENCY_API.latest}?base=${encodeURIComponent(base)}&symbols=${encodeURIComponent(
      symbol
    )}`;
    const response = await fetch(url);
    if (!response.ok) return null;
    const data = await response.json();
    if (!data || !data.rates || typeof data.rates[symbol] !== "number") return null;

    const mergedRates = { ...(cached?.rates || {}), ...data.rates };
    currencyRatesCache.set(base, {
      rates: mergedRates,
      date: data.date || "",
      timestamp: Date.now()
    });
    return { rate: data.rates[symbol], date: data.date || "" };
  } catch (error) {
    return null;
  }
}

function updateUnitResult() {
  if (!elements.unitValue || !elements.unitFrom || !elements.unitTo || !elements.unitResult) return;
  const value = parseNumber(elements.unitValue.value);
  if (value === null) {
    elements.unitResult.textContent = "—";
    return;
  }
  const category = elements.unitCategory ? elements.unitCategory.value : "length";
  const from = elements.unitFrom.value;
  const to = elements.unitTo.value;
  const result = convertUnits(value, from, to, category);
  if (result === null) {
    elements.unitResult.textContent = "—";
    return;
  }
  elements.unitResult.textContent = `${formatNumber(result, 6)} ${unitLabel(category, to)}`;
}

function updatePercentResult() {
  if (!elements.percentValue || !elements.percentBase || !elements.percentResult) return;
  const percent = parseNumber(elements.percentValue.value);
  const base = parseNumber(elements.percentBase.value);
  if (percent === null || base === null) {
    elements.percentResult.textContent = "—";
    return;
  }
  const value = (base * percent) / 100;
  elements.percentResult.textContent = `${formatNumber(percent, 2)}% of ${formatNumber(
    base,
    2
  )} = ${formatNumber(value, 6)}`;
}

function updateChangeResult() {
  if (!elements.changeOld || !elements.changeNew || !elements.changeResult) return;
  const oldValue = parseNumber(elements.changeOld.value);
  const newValue = parseNumber(elements.changeNew.value);
  if (oldValue === null || newValue === null || oldValue === 0) {
    elements.changeResult.textContent = "—";
    return;
  }
  const change = ((newValue - oldValue) / oldValue) * 100;
  elements.changeResult.textContent = `Change: ${formatNumber(change, 2)}%`;
}

function updateSplitResult() {
  if (!elements.splitTotal || !elements.splitPeople || !elements.splitResult) return;
  const total = parseNumber(elements.splitTotal.value);
  const people = parseInt(elements.splitPeople.value, 10);
  const tipPct = parseNumber(elements.splitTip ? elements.splitTip.value : "") || 0;
  const taxPct = parseNumber(elements.splitTax ? elements.splitTax.value : "") || 0;
  if (total === null || !Number.isFinite(people) || people <= 0) {
    elements.splitResult.textContent = "—";
    return;
  }
  const tipAmount = total * (tipPct / 100);
  const taxAmount = total * (taxPct / 100);
  const grandTotal = total + tipAmount + taxAmount;
  const perPerson = grandTotal / people;
  elements.splitResult.textContent = `Per person: ${formatFixedNumber(
    perPerson,
    2
  )} unit | Total: ${formatFixedNumber(grandTotal, 2)} unit`;
}

function initSalaryTool() {
  if (!elements.salaryCtc) return;
  applySalaryDefaults();
  bindSalaryEvents();
  updateSalaryResults();
}

function applySalaryDefaults() {
  if (elements.salaryCtc) elements.salaryCtc.value = SALARY_DEFAULTS.ctc;
  if (elements.salaryRegime) elements.salaryRegime.value = SALARY_DEFAULTS.regime;
  syncSalaryVariableInputs(SALARY_DEFAULTS.variablePct);
  if (elements.salaryPfRule) elements.salaryPfRule.value = SALARY_DEFAULTS.pfRule;
  if (elements.salaryEmployerPf) elements.salaryEmployerPf.checked = SALARY_DEFAULTS.employerPfInCtc;
  if (elements.salaryGratuity) elements.salaryGratuity.checked = SALARY_DEFAULTS.gratuityInCtc;
  if (elements.salaryVariableGuaranteed) elements.salaryVariableGuaranteed.checked = SALARY_DEFAULTS.variableGuaranteed;
  if (elements.salaryVariableMonthly) elements.salaryVariableMonthly.checked = SALARY_DEFAULTS.variableMonthly;
  if (elements.salaryPt) elements.salaryPt.value = SALARY_DEFAULTS.professionalTaxMonthly;
  if (elements.salaryOtherDeduct) elements.salaryOtherDeduct.value = SALARY_DEFAULTS.otherDeductMonthly;
  if (elements.salaryBasicPct) elements.salaryBasicPct.value = SALARY_DEFAULTS.basicPct;
  if (elements.salaryHraPct) elements.salaryHraPct.value = SALARY_DEFAULTS.hraPct;
  if (elements.salaryStandardDeduction) {
    elements.salaryStandardDeduction.value = SALARY_DEFAULTS.standardDeduction;
  }
  if (elements.salaryRent) elements.salaryRent.value = SALARY_DEFAULTS.rentMonthly;
  if (elements.salaryMetro) elements.salaryMetro.checked = SALARY_DEFAULTS.metro;
  if (elements.salaryPfRate) elements.salaryPfRate.value = SALARY_DEFAULTS.pfRatePct;
  if (elements.salaryPfCap) elements.salaryPfCap.value = SALARY_DEFAULTS.pfCapMonthly;
  if (elements.salaryGratuityRate) elements.salaryGratuityRate.value = SALARY_DEFAULTS.gratuityRatePct;
  if (elements.salaryBenefits) elements.salaryBenefits.value = SALARY_DEFAULTS.benefitsAnnual;
  if (elements.salaryOneTime) elements.salaryOneTime.value = SALARY_DEFAULTS.oneTimeAnnual;
  if (elements.salaryOtherTaxDeduct) {
    elements.salaryOtherTaxDeduct.value = SALARY_DEFAULTS.otherTaxDeductAnnual;
  }
}

function bindSalaryEvents() {
  const updateInputs = [
    elements.salaryCtc,
    elements.salaryRegime,
    elements.salaryPfRule,
    elements.salaryEmployerPf,
    elements.salaryGratuity,
    elements.salaryVariableGuaranteed,
    elements.salaryVariableMonthly,
    elements.salaryPt,
    elements.salaryOtherDeduct,
    elements.salaryBasicPct,
    elements.salaryHraPct,
    elements.salaryStandardDeduction,
    elements.salaryRent,
    elements.salaryMetro,
    elements.salaryPfRate,
    elements.salaryPfCap,
    elements.salaryGratuityRate,
    elements.salaryBenefits,
    elements.salaryOneTime,
    elements.salaryOtherTaxDeduct
  ];

  updateInputs.forEach((input) => {
    if (!input) return;
    input.addEventListener("input", updateSalaryResults);
    input.addEventListener("change", updateSalaryResults);
  });

  if (elements.salaryVariable) {
    elements.salaryVariable.addEventListener("input", () => {
      syncSalaryVariableInputs(elements.salaryVariable.value);
      updateSalaryResults();
    });
  }

  if (elements.salaryVariableInput) {
    elements.salaryVariableInput.addEventListener("input", () => {
      syncSalaryVariableInputs(elements.salaryVariableInput.value);
      updateSalaryResults();
    });
  }

  if (elements.salaryCalculate) {
    elements.salaryCalculate.addEventListener("click", updateSalaryResults);
  }

  if (elements.salaryCopy) {
    elements.salaryCopy.addEventListener("click", copySalaryBreakup);
  }

  if (elements.salaryTargetCalc) {
    elements.salaryTargetCalc.addEventListener("click", updateSalaryTarget);
  }

  if (elements.salaryCompareCalc) {
    elements.salaryCompareCalc.addEventListener("click", updateSalaryCompare);
  }

  if (elements.salaryTargetInhand) {
    elements.salaryTargetInhand.addEventListener("input", updateSalaryTarget);
  }

  if (elements.salaryCompareA) {
    elements.salaryCompareA.addEventListener("input", updateSalaryCompare);
  }

  if (elements.salaryCompareB) {
    elements.salaryCompareB.addEventListener("input", updateSalaryCompare);
  }
}

function syncSalaryVariableInputs(value) {
  const cleaned = clampNumber(numberOr(value, SALARY_DEFAULTS.variablePct), 0, 50);
  if (elements.salaryVariable) elements.salaryVariable.value = cleaned;
  if (elements.salaryVariableInput) elements.salaryVariableInput.value = cleaned;
}

function updateSalaryResults() {
  if (!elements.salaryCtc) return;
  const inputs = readSalaryInputs();
  const result = calculateSalary(inputs);
  renderSalaryResults(inputs, result);
  updateSalaryCompare();
  updateSalaryTarget();
}

function readSalaryInputs() {
  const ctc = Math.max(0, numberOr(elements.salaryCtc?.value, SALARY_DEFAULTS.ctc));
  const regime = elements.salaryRegime?.value === "old" ? "old" : "new";
  const variablePct = clampNumber(
    numberOr(elements.salaryVariableInput?.value, SALARY_DEFAULTS.variablePct),
    0,
    50
  );
  const basicPct = clampNumber(
    numberOr(elements.salaryBasicPct?.value, SALARY_DEFAULTS.basicPct),
    0,
    100
  );
  const hraPct = clampNumber(numberOr(elements.salaryHraPct?.value, SALARY_DEFAULTS.hraPct), 0, 100);
  const pfRatePct = clampNumber(
    numberOr(elements.salaryPfRate?.value, SALARY_DEFAULTS.pfRatePct),
    0,
    20
  );
  const pfCapMonthly = Math.max(
    0,
    numberOr(elements.salaryPfCap?.value, SALARY_DEFAULTS.pfCapMonthly)
  );
  const gratuityRatePct = clampNumber(
    numberOr(elements.salaryGratuityRate?.value, SALARY_DEFAULTS.gratuityRatePct),
    0,
    10
  );
  const pfRule = elements.salaryPfRule?.value === "full" ? "full" : "capped";
  const employerPfInCtc = Boolean(elements.salaryEmployerPf?.checked);
  const gratuityInCtc = Boolean(elements.salaryGratuity?.checked);
  const variableGuaranteed = Boolean(elements.salaryVariableGuaranteed?.checked);
  const variableMonthly = Boolean(elements.salaryVariableMonthly?.checked);
  const standardDeduction = Math.max(
    0,
    numberOr(elements.salaryStandardDeduction?.value, SALARY_DEFAULTS.standardDeduction)
  );
  const rentMonthly = Math.max(
    0,
    numberOr(elements.salaryRent?.value, SALARY_DEFAULTS.rentMonthly)
  );
  const metro = Boolean(elements.salaryMetro?.checked);
  const professionalTaxMonthly = Math.max(
    0,
    numberOr(elements.salaryPt?.value, SALARY_DEFAULTS.professionalTaxMonthly)
  );
  const otherDeductMonthly = Math.max(
    0,
    numberOr(elements.salaryOtherDeduct?.value, SALARY_DEFAULTS.otherDeductMonthly)
  );
  const benefitsAnnual = Math.max(
    0,
    numberOr(elements.salaryBenefits?.value, SALARY_DEFAULTS.benefitsAnnual)
  );
  const oneTimeAnnual = Math.max(
    0,
    numberOr(elements.salaryOneTime?.value, SALARY_DEFAULTS.oneTimeAnnual)
  );
  const otherTaxDeductAnnual = Math.max(
    0,
    numberOr(elements.salaryOtherTaxDeduct?.value, SALARY_DEFAULTS.otherTaxDeductAnnual)
  );

  return {
    ctc,
    regime,
    variablePct,
    basicPct,
    hraPct,
    pfRatePct,
    pfCapMonthly,
    pfRule,
    employerPfInCtc,
    gratuityInCtc,
    gratuityRatePct,
    standardDeduction,
    rentMonthly,
    metro,
    variableGuaranteed,
    variableMonthly,
    professionalTaxMonthly,
    otherDeductMonthly,
    benefitsAnnual,
    oneTimeAnnual,
    otherTaxDeductAnnual
  };
}

function calculateSalary(inputs) {
  const variableRate = inputs.variablePct / 100;
  const basicRate = inputs.basicPct / 100;
  const hraRate = inputs.hraPct / 100;
  const pfRate = inputs.pfRatePct / 100;
  const gratuityRate = inputs.gratuityRatePct / 100;

  const fixedAnnual = Math.max(0, inputs.ctc * (1 - variableRate));
  const variableAnnual = Math.max(0, inputs.ctc * variableRate);
  const basicAnnual = Math.max(0, fixedAnnual * basicRate);
  const hraAnnual = Math.max(0, basicAnnual * hraRate);
  const specialAnnual = Math.max(0, fixedAnnual - basicAnnual - hraAnnual);

  const pfWageMonthly =
    inputs.pfRule === "full" ? basicAnnual / 12 : Math.min(basicAnnual / 12, inputs.pfCapMonthly);
  const epfEmployeeAnnual = Math.max(0, pfWageMonthly * pfRate * 12);
  const epfEmployerAnnual = epfEmployeeAnnual;
  const gratuityAnnual = Math.max(0, basicAnnual * gratuityRate);

  const employerPfCtc = inputs.employerPfInCtc ? epfEmployerAnnual : 0;
  const gratuityCtc = inputs.gratuityInCtc ? gratuityAnnual : 0;
  const cashFixedAnnualRaw =
    fixedAnnual - employerPfCtc - gratuityCtc - inputs.benefitsAnnual - inputs.oneTimeAnnual;
  const cashFixedAnnual = Math.max(0, cashFixedAnnualRaw);
  const cashFixedMonthly = cashFixedAnnual / 12;

  const variablePaidAnnual = inputs.variableGuaranteed ? variableAnnual : 0;
  const variablePaidMonthly = inputs.variableMonthly ? variablePaidAnnual / 12 : 0;
  const grossMonthly = Math.max(0, cashFixedMonthly + variablePaidMonthly);
  const grossAnnualCash = Math.max(0, cashFixedAnnual + variablePaidAnnual);

  const hraExemptAnnual =
    inputs.regime === "old"
      ? calculateHraExemption(hraAnnual, basicAnnual, inputs.rentMonthly * 12, inputs.metro)
      : 0;
  const additionalDeductions = inputs.regime === "old" ? inputs.otherTaxDeductAnnual : 0;
  const taxableIncome = Math.max(
    0,
    grossAnnualCash - inputs.standardDeduction - hraExemptAnnual - additionalDeductions
  );
  const slabTax = computeSlabTax(taxableIncome, inputs.regime);
  const taxTotal = slabTax * (1 + SALARY_TAX_CONFIG.cessRate);
  const tdsMonthly = taxTotal / 12;

  const epfEmployeeMonthly = epfEmployeeAnnual / 12;
  const inhandMonthly =
    grossMonthly - epfEmployeeMonthly - inputs.professionalTaxMonthly - tdsMonthly - inputs.otherDeductMonthly;
  const inhandAnnual = inhandMonthly * 12;

  return {
    fixedAnnual,
    cashFixedAnnual,
    cashFixedMonthly,
    variableAnnual,
    variablePaidAnnual,
    basicAnnual,
    hraAnnual,
    specialAnnual,
    epfEmployeeAnnual,
    epfEmployerAnnual,
    gratuityAnnual,
    employerPfCtc,
    gratuityCtc,
    benefitsAnnual: inputs.benefitsAnnual,
    oneTimeAnnual: inputs.oneTimeAnnual,
    grossMonthly,
    taxableIncome,
    hraExemptAnnual,
    taxTotal,
    tdsMonthly,
    inhandMonthly,
    inhandAnnual,
    cashFixedAnnualRaw
  };
}

function calculateHraExemption(hraAnnual, basicAnnual, rentAnnual, metro) {
  const rentOverTen = rentAnnual - 0.1 * basicAnnual;
  const metroLimit = (metro ? 0.5 : 0.4) * basicAnnual;
  return Math.max(0, Math.min(hraAnnual, rentOverTen, metroLimit));
}

function computeSlabTax(income, regime) {
  const slabs = SALARY_TAX_CONFIG.slabs[regime] || SALARY_TAX_CONFIG.slabs.new;
  let tax = 0;
  let lastLimit = 0;
  for (const slab of slabs) {
    if (slab.upto === null) {
      tax += Math.max(0, income - lastLimit) * slab.rate;
      break;
    }
    const slabAmount = Math.max(0, Math.min(income, slab.upto) - lastLimit);
    tax += slabAmount * slab.rate;
    lastLimit = slab.upto;
  }
  return tax;
}

function renderSalaryResults(inputs, result) {
  if (elements.salaryInhandMonthly) {
    elements.salaryInhandMonthly.textContent = formatInr(result.inhandMonthly);
  }
  if (elements.salaryInhandAnnual) {
    elements.salaryInhandAnnual.textContent = formatInr(result.inhandAnnual);
  }
  if (elements.salaryInhandMonthlyBlock) {
    elements.salaryInhandMonthlyBlock.textContent = formatInr(result.inhandMonthly);
  }
  if (elements.salaryInhandAnnualBlock) {
    elements.salaryInhandAnnualBlock.textContent = formatInr(result.inhandAnnual);
  }
  if (elements.salaryFixedAnnual) {
    elements.salaryFixedAnnual.textContent = formatInr(result.fixedAnnual);
  }
  if (elements.salaryFixedMonthly) {
    elements.salaryFixedMonthly.textContent = formatInr(result.cashFixedMonthly);
  }
  if (elements.salaryDeductPf) {
    elements.salaryDeductPf.textContent = formatInr(result.epfEmployeeAnnual / 12);
  }
  if (elements.salaryDeductPt) {
    elements.salaryDeductPt.textContent = formatInr(inputs.professionalTaxMonthly);
  }
  if (elements.salaryDeductTds) {
    elements.salaryDeductTds.textContent = formatInr(result.tdsMonthly);
  }
  if (elements.salaryDeductOther) {
    elements.salaryDeductOther.textContent = formatInr(inputs.otherDeductMonthly);
  }
  if (elements.salaryCtcFixed) {
    elements.salaryCtcFixed.textContent = formatInr(result.cashFixedAnnual);
  }
  if (elements.salaryCtcVariable) {
    elements.salaryCtcVariable.textContent = formatInr(result.variableAnnual);
  }
  if (elements.salaryCtcEmployerPf) {
    elements.salaryCtcEmployerPf.textContent = formatInr(result.epfEmployerAnnual);
  }
  if (elements.salaryCtcGratuity) {
    elements.salaryCtcGratuity.textContent = formatInr(result.gratuityAnnual);
  }
  if (elements.salaryCtcBenefits) {
    elements.salaryCtcBenefits.textContent = formatInr(result.benefitsAnnual);
  }
  if (elements.salaryCtcOneTime) {
    elements.salaryCtcOneTime.textContent = formatInr(result.oneTimeAnnual);
  }

  if (elements.salaryEmployerPfLabel) {
    elements.salaryEmployerPfLabel.textContent = inputs.employerPfInCtc
      ? "Employer PF"
      : "Employer PF (outside CTC)";
  }
  if (elements.salaryGratuityLabel) {
    elements.salaryGratuityLabel.textContent = inputs.gratuityInCtc
      ? "Gratuity"
      : "Gratuity (outside CTC)";
  }

  const why = buildSalaryWhy(inputs);
  if (elements.salaryWhy) {
    elements.salaryWhy.textContent = why;
  }

  renderSalaryWarnings(inputs, result);
}

function buildSalaryWhy(inputs) {
  const reasons = [];
  if (inputs.employerPfInCtc) {
    reasons.push("Employer PF is part of CTC.");
  }
  if (inputs.gratuityInCtc) {
    reasons.push("Gratuity is inside CTC.");
  }
  if (!inputs.variableMonthly) {
    reasons.push("Variable pay is not included in monthly cash.");
  }
  if (!inputs.variableGuaranteed) {
    reasons.push("Variable pay is treated as zero for in-hand and tax.");
  }
  if (inputs.regime === "new") {
    reasons.push("HRA exemption is ignored in the new regime.");
  }
  return reasons.length
    ? `Why this differs from CTC: ${reasons.join(" ")}`
    : "Why this differs from CTC: taxes and statutory deductions reduce monthly cash.";
}

function renderSalaryWarnings(inputs, result) {
  if (!elements.salaryWarnings) return;
  elements.salaryWarnings.innerHTML = "";
  const warnings = [];

  if (inputs.variablePct >= 30) {
    warnings.push("Variable pay is high; monthly in-hand can fluctuate.");
  }
  if (inputs.basicPct > 60) {
    warnings.push("Basic percentage is unusually high; check your breakup.");
  }
  if (inputs.hraPct > 60) {
    warnings.push("HRA percentage is high; confirm with your HR team.");
  }
  if (result.basicAnnual + result.hraAnnual > result.fixedAnnual) {
    warnings.push("Basic + HRA exceeds fixed pay; special allowance was set to zero.");
  }
  if (result.cashFixedAnnualRaw < 0) {
    warnings.push("Fixed cash turned negative; reduce benefits or employer components.");
  }
  if (inputs.regime === "old" && inputs.rentMonthly <= 0) {
    warnings.push("Old regime selected: enter rent for HRA exemption if applicable.");
  }
  if (inputs.regime === "new" && inputs.otherTaxDeductAnnual > 0) {
    warnings.push("Other tax deductions are ignored in the new regime.");
  }

  warnings.forEach((message) => {
    const item = document.createElement("div");
    item.className = "salary-warning";
    item.textContent = message;
    elements.salaryWarnings.appendChild(item);
  });
}

async function copySalaryBreakup() {
  if (!elements.salaryCopy) return;
  const inputs = readSalaryInputs();
  const result = calculateSalary(inputs);
  const text = buildSalaryCopyText(inputs, result);
  const original = elements.salaryCopy.textContent;

  try {
    await navigator.clipboard.writeText(text);
    elements.salaryCopy.textContent = "Copied";
  } catch (error) {
    fallbackCopyText(text);
    elements.salaryCopy.textContent = "Copied";
  }

  setTimeout(() => {
    elements.salaryCopy.textContent = original;
  }, 1400);
}

function fallbackCopyText(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

function buildSalaryCopyText(inputs, result) {
  const lines = [
    `CTC (annual): ${formatInr(inputs.ctc)}`,
    `Fixed annual: ${formatInr(result.fixedAnnual)}`,
    `Fixed monthly gross: ${formatInr(result.cashFixedMonthly)}`,
    `Variable pay: ${formatInr(result.variableAnnual)}${inputs.variableGuaranteed ? "" : " (not guaranteed)"}`,
    `Employee PF (monthly): ${formatInr(result.epfEmployeeAnnual / 12)}`,
    `Professional tax (monthly): ${formatInr(inputs.professionalTaxMonthly)}`,
    `TDS (monthly): ${formatInr(result.tdsMonthly)}`,
    `Other deductions (monthly): ${formatInr(inputs.otherDeductMonthly)}`,
    `In-hand monthly: ${formatInr(result.inhandMonthly)}`,
    `In-hand annual: ${formatInr(result.inhandAnnual)}`
  ];
  return lines.join("\n");
}

function updateSalaryTarget() {
  if (!elements.salaryTargetInhand || !elements.salaryTargetCtc) return;
  const target = numberOr(elements.salaryTargetInhand.value, null);
  if (target === null || target <= 0) {
    elements.salaryTargetCtc.textContent = "—";
    return;
  }
  const inputs = readSalaryInputs();
  const estimate = estimateCtcForTarget(target, inputs);
  elements.salaryTargetCtc.textContent = estimate ? `Est. CTC: ${formatInr(estimate)}` : "—";
}

function estimateCtcForTarget(targetMonthly, inputs) {
  let low = 0;
  let high = Math.max(targetMonthly * 12 * 3, inputs.ctc || 0, 100000);
  for (let i = 0; i < 8; i += 1) {
    const attempt = calculateSalary({ ...inputs, ctc: high });
    if (attempt.inhandMonthly >= targetMonthly) break;
    high *= 1.5;
  }
  let best = null;
  for (let i = 0; i < 40; i += 1) {
    const mid = (low + high) / 2;
    const attempt = calculateSalary({ ...inputs, ctc: mid });
    if (attempt.inhandMonthly >= targetMonthly) {
      best = mid;
      high = mid;
    } else {
      low = mid;
    }
  }
  return best;
}

function updateSalaryCompare() {
  if (!elements.salaryCompareA || !elements.salaryCompareB || !elements.salaryCompareResult) return;
  const ctcA = numberOr(elements.salaryCompareA.value, null);
  const ctcB = numberOr(elements.salaryCompareB.value, null);
  if (ctcA === null || ctcB === null) {
    elements.salaryCompareResult.textContent = "—";
    return;
  }
  const inputs = readSalaryInputs();
  const resultA = calculateSalary({ ...inputs, ctc: ctcA });
  const resultB = calculateSalary({ ...inputs, ctc: ctcB });
  const diff = resultB.inhandMonthly - resultA.inhandMonthly;
  elements.salaryCompareResult.textContent = `Offer A: ${formatInr(
    resultA.inhandMonthly
  )}/mo | Offer B: ${formatInr(resultB.inhandMonthly)}/mo | Diff: ${formatInr(diff)}/mo`;
}

function populateUnitSelects(category) {
  if (!elements.unitFrom || !elements.unitTo) return;
  const table = UNIT_TABLES[category];
  if (!table) return;
  const fromValue = elements.unitFrom.value;
  const toValue = elements.unitTo.value;

  elements.unitFrom.innerHTML = "";
  elements.unitTo.innerHTML = "";

  table.units.forEach((unit) => {
    const fromOption = document.createElement("option");
    fromOption.value = unit.id;
    fromOption.textContent = unit.label;
    elements.unitFrom.appendChild(fromOption);

    const toOption = document.createElement("option");
    toOption.value = unit.id;
    toOption.textContent = unit.label;
    elements.unitTo.appendChild(toOption);
  });

  const unitIds = table.units.map((unit) => unit.id);
  elements.unitFrom.value = unitIds.includes(fromValue) ? fromValue : unitIds[0];
  elements.unitTo.value = unitIds.includes(toValue) ? toValue : unitIds[1] || unitIds[0];
}

function unitLabel(category, unitId) {
  const table = UNIT_TABLES[category];
  if (!table) return unitId;
  const entry = table.units.find((unit) => unit.id === unitId);
  return entry ? entry.id : unitId;
}

function convertUnits(value, from, to, category) {
  const table = UNIT_TABLES[category];
  if (!table) return null;
  if (category === "temp") {
    return convertTemperature(value, from, to);
  }
  const fromUnit = table.units.find((unit) => unit.id === from);
  const toUnit = table.units.find((unit) => unit.id === to);
  if (!fromUnit || !toUnit) return null;
  return (value * fromUnit.factor) / toUnit.factor;
}

function convertTemperature(value, from, to) {
  if (from === to) return value;
  let celsius = value;
  if (from === "f") {
    celsius = (value - 32) * (5 / 9);
  } else if (from === "k") {
    celsius = value - 273.15;
  }

  if (to === "f") {
    return celsius * (9 / 5) + 32;
  }
  if (to === "k") {
    return celsius + 273.15;
  }
  return celsius;
}

function evaluateExpression(expression) {
  const cleaned = (expression || "").replace(/\s+/g, "");
  if (!cleaned) return { value: null, error: null, empty: true };
  const tokens = tokenizeExpression(cleaned);
  if (!tokens) return { value: null, error: "invalid", empty: false };
  const rpn = toRpn(tokens);
  if (!rpn) return { value: null, error: "invalid", empty: false };
  const result = evalRpn(rpn);
  if (!Number.isFinite(result)) {
    return { value: null, error: "invalid", empty: false };
  }
  return { value: result, error: null, empty: false };
}

function tokenizeExpression(expression) {
  const tokens = [];
  let index = 0;
  let prevType = null;

  while (index < expression.length) {
    const char = expression[index];
    if (/[0-9.]/.test(char)) {
      let numStr = "";
      let dotCount = 0;
      while (index < expression.length && /[0-9.]/.test(expression[index])) {
        if (expression[index] === ".") dotCount += 1;
        numStr += expression[index];
        index += 1;
      }
      if (dotCount > 1 || numStr === ".") return null;
      const value = Number.parseFloat(numStr);
      if (!Number.isFinite(value)) return null;
      tokens.push({ type: "number", value });
      prevType = "number";
      continue;
    }

    if (char === "(") {
      tokens.push({ type: "paren", value: "(" });
      prevType = "parenL";
      index += 1;
      continue;
    }

    if (char === ")") {
      tokens.push({ type: "paren", value: ")" });
      prevType = "parenR";
      index += 1;
      continue;
    }

    if (["+","-","*","/","%"].includes(char)) {
      let op = char;
      if (op === "+" || op === "-") {
        if (prevType === null || prevType === "op" || prevType === "parenL") {
          op = op === "+" ? "u+" : "u-";
        }
      }
      if (op === "%") {
        if (prevType !== "number" && prevType !== "parenR") return null;
        op = "pct";
      }
      tokens.push({ type: "op", op });
      prevType = op === "pct" ? "number" : "op";
      index += 1;
      continue;
    }

    return null;
  }

  return tokens;
}

function toRpn(tokens) {
  const output = [];
  const stack = [];
  let invalid = false;
  const ops = {
    "u+": { prec: 4, assoc: "right", arity: 1 },
    "u-": { prec: 4, assoc: "right", arity: 1 },
    pct: { prec: 4, assoc: "left", arity: 1 },
    "*": { prec: 3, assoc: "left", arity: 2 },
    "/": { prec: 3, assoc: "left", arity: 2 },
    "+": { prec: 2, assoc: "left", arity: 2 },
    "-": { prec: 2, assoc: "left", arity: 2 }
  };

  for (const token of tokens) {
    if (token.type === "number") {
      output.push(token);
      continue;
    }
    if (token.type === "op") {
      const current = ops[token.op];
      if (!current) {
        invalid = true;
        break;
      }
      while (stack.length) {
        const top = stack[stack.length - 1];
        if (top.type !== "op") break;
        const topOp = ops[top.op];
        if (!topOp) break;
        const shouldPop =
          (current.assoc === "left" && current.prec <= topOp.prec) ||
          (current.assoc === "right" && current.prec < topOp.prec);
        if (!shouldPop) break;
        output.push(stack.pop());
      }
      stack.push(token);
      continue;
    }
    if (token.type === "paren" && token.value === "(") {
      stack.push(token);
      continue;
    }
    if (token.type === "paren" && token.value === ")") {
      while (stack.length && stack[stack.length - 1].type !== "paren") {
        output.push(stack.pop());
      }
      if (!stack.length) {
        invalid = true;
        break;
      }
      stack.pop();
    }
  }

  if (invalid) return null;

  while (stack.length) {
    const token = stack.pop();
    if (token.type === "paren") return null;
    output.push(token);
  }

  return output;
}

function evalRpn(tokens) {
  const stack = [];
  tokens.forEach((token) => {
    if (token.type === "number") {
      stack.push(token.value);
      return;
    }
    const op = token.op;
    if (op === "u+" || op === "u-" || op === "pct") {
      if (stack.length < 1) {
        stack.length = 0;
        return;
      }
      const value = stack.pop();
      if (op === "u+") stack.push(value);
      if (op === "u-") stack.push(-value);
      if (op === "pct") stack.push(value / 100);
      return;
    }
    if (stack.length < 2) {
      stack.length = 0;
      return;
    }
    const right = stack.pop();
    const left = stack.pop();
    if (op === "+") stack.push(left + right);
    if (op === "-") stack.push(left - right);
    if (op === "*") stack.push(left * right);
    if (op === "/") stack.push(left / right);
  });

  return stack.length === 1 ? stack[0] : NaN;
}

function parseNumber(value) {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function numberOr(value, fallback) {
  const parsed = parseNumber(value);
  return parsed === null ? fallback : parsed;
}

function clampNumber(value, min, max) {
  if (!Number.isFinite(value)) return min;
  return Math.min(Math.max(value, min), max);
}

function formatNumber(value, digits = 6) {
  if (!Number.isFinite(value)) return "—";
  const abs = Math.abs(value);
  if (abs !== 0 && (abs < 1e-6 || abs >= 1e9)) {
    return value.toExponential(3);
  }
  return new Intl.NumberFormat([], { maximumFractionDigits: digits }).format(value);
}

function formatInr(value, digits = 0) {
  if (!Number.isFinite(value)) return "—";
  const formatted = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits
  }).format(value);
  return `INR ${formatted}`;
}

function formatCurrency(value) {
  if (!Number.isFinite(value)) return "—";
  try {
    return new Intl.NumberFormat([], {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  } catch (error) {
    return `$${value.toFixed(2)}`;
  }
}

function formatFixedNumber(value, digits = 2) {
  if (!Number.isFinite(value)) return "—";
  return new Intl.NumberFormat([], {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits
  }).format(value);
}

function hasClockElements() {
  return Boolean(elements.clock || elements.date || elements.greeting);
}

function startClock() {
  setInterval(updateClock, 1000);
}

function updateClock() {
  if (!hasClockElements()) return;
  const now = new Date();
  if (elements.clock) {
    elements.clock.textContent = formatTime(now);
  }
  if (elements.date) {
    elements.date.textContent = new Intl.DateTimeFormat([], {
      weekday: "long",
      month: "short",
      day: "numeric"
    }).format(now);
  }
  if (elements.greeting) {
    elements.greeting.textContent = greetingForHour(now.getHours());
  }
}

function formatTime(date) {
  return new Intl.DateTimeFormat([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: !state.use24h
  }).format(date);
}

function greetingForHour(hour) {
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

function looksLikeUrl(text) {
  if (text.startsWith("http://") || text.startsWith("https://")) return true;
  return /^[^\s]+\.[^\s]+$/.test(text);
}

function normalizeUrl(value) {
  if (!value) return "";
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  return `https://${value}`;
}

function normalizeIconUrl(value) {
  const trimmed = (value || "").trim();
  if (!trimmed) return "";
  if (/^(data:|chrome:\/\/|https?:\/\/)/i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

function searchUrl(query) {
  const encoded = encodeURIComponent(query);
  const engine = state.engine;
  if (engine === "ddg") return `https://duckduckgo.com/?q=${encoded}`;
  if (engine === "youtube") return `https://www.youtube.com/results?search_query=${encoded}`;
  if (engine === "github") return `https://github.com/search?q=${encoded}`;
  return `https://www.google.com/search?q=${encoded}`;
}

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function todayKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function domainFromUrl(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch (error) {
    return url;
  }
}

function setFavicon(img, url, title, customIcon) {
  const safeUrl = url || "";
  const custom = normalizeIconUrl(customIcon || "");
  const originIcon = originFaviconUrl(safeUrl);
  const chromeIcon = chromeFaviconUrl(safeUrl);
  const googleIcon = googleFaviconUrl(safeUrl);
  const final = fallbackIcon(title || domainFromUrl(safeUrl) || "?");
  const steps = [custom, originIcon, chromeIcon, googleIcon, final].filter(Boolean);
  let index = 0;

  img.onerror = () => {
    index += 1;
    if (index >= steps.length) {
      img.onerror = null;
      return;
    }
    img.src = steps[index];
  };

  img.src = steps[index];
}

function originFaviconUrl(url) {
  try {
    const parsed = new URL(url);
    return `${parsed.origin}/favicon.ico`;
  } catch (error) {
    return "";
  }
}

function chromeFaviconUrl(url) {
  return `chrome://favicon2/?size=64&scale_factor=2x&page_url=${encodeURIComponent(
    url
  )}`;
}

function googleFaviconUrl(url) {
  return `https://www.google.com/s2/favicons?sz=64&domain_url=${encodeURIComponent(
    url
  )}`;
}

function fallbackIcon(text) {
  const initial = (text || "?").trim().charAt(0).toUpperCase() || "?";
  const color = pickColor(text || "");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><rect width="64" height="64" rx="12" fill="${color}"/><text x="32" y="34" text-anchor="middle" font-family="Trebuchet MS, sans-serif" font-size="28" fill="#ffffff">${initial}</text></svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function pickColor(text) {
  const palette = ["#2a9d8f", "#e76f51", "#264653", "#f4a261", "#457b9d", "#8ab17d"];
  let hash = 0;
  for (let i = 0; i < text.length; i += 1) {
    hash = (hash << 5) - hash + text.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % palette.length;
  return palette[index];
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return { ...DEFAULT_STATE, links: DEFAULT_LINKS.slice() };
  try {
    const parsed = JSON.parse(raw);
    const parsedLinks = Array.isArray(parsed.links)
      ? parsed.links
          .map((link) => ({
            id: link.id || uid(),
            title: typeof link.title === "string" ? link.title.trim() : "",
            url: normalizeUrl(link.url || ""),
            icon: normalizeIconUrl(link.icon || "")
          }))
          .filter((link) => link.url)
      : DEFAULT_LINKS.slice();
    const parsedTasks = Array.isArray(parsed.tasks)
      ? parsed.tasks
          .map((task) => ({
            id: task.id || uid(),
            text: task.text || "",
            done: Boolean(task.done)
          }))
          .filter((task) => task.text)
      : [];
    return {
      ...DEFAULT_STATE,
      ...parsed,
      links: parsedLinks,
      tasks: parsedTasks
    };
  } catch (error) {
    return { ...DEFAULT_STATE, links: DEFAULT_LINKS.slice() };
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadTimer() {
  const base = {
    duration: 25 * 60,
    remaining: 25 * 60,
    running: false,
    end: null,
    label: "Pomodoro"
  };
  const raw = localStorage.getItem(TIMER_KEY);
  if (!raw) return base;
  try {
    const parsed = JSON.parse(raw);
    return { ...base, ...parsed };
  } catch (error) {
    return base;
  }
}

function saveTimer() {
  localStorage.setItem(TIMER_KEY, JSON.stringify(timer));
}

function initTimer() {
  if (timer.running && timer.end) {
    const diff = Math.round((timer.end - Date.now()) / 1000);
    timer.remaining = Math.max(0, diff);
    if (timer.remaining === 0) {
      timer.running = false;
      timer.end = null;
    }
  } else {
    timer.remaining = Math.min(timer.remaining, timer.duration);
  }
  updateTimerDisplay();
  setInterval(tickTimer, 1000);
}

function tickTimer() {
  if (timer.running && timer.end) {
    const diff = Math.round((timer.end - Date.now()) / 1000);
    timer.remaining = Math.max(0, diff);
    if (timer.remaining === 0) {
      timer.running = false;
      timer.end = null;
    }
  }
  updateTimerDisplay();
}

function updateTimerDisplay() {
  const minutes = Math.floor(timer.remaining / 60);
  const seconds = timer.remaining % 60;
  elements.timerDisplay.textContent = `${minutes}:${String(seconds).padStart(2, "0")}`;
  elements.timerLabel.textContent = timer.remaining === 0 ? "Done" : timer.label;
  const progress = timer.duration ? timer.remaining / timer.duration : 0;
  elements.timerRing.style.setProperty("--progress", progress);
  saveTimer();
}

function startTimer() {
  if (timer.running) return;
  if (timer.remaining <= 0) {
    timer.remaining = timer.duration;
  }
  timer.running = true;
  timer.end = Date.now() + timer.remaining * 1000;
  saveTimer();
}

function pauseTimer() {
  if (!timer.running) return;
  timer.remaining = Math.max(0, Math.round((timer.end - Date.now()) / 1000));
  timer.running = false;
  timer.end = null;
  saveTimer();
}

function resetTimer() {
  timer.running = false;
  timer.remaining = timer.duration;
  timer.end = null;
  updateTimerDisplay();
}

function setTimerPreset(minutes, label) {
  timer.duration = minutes * 60;
  timer.remaining = minutes * 60;
  timer.running = false;
  timer.end = null;
  timer.label = label || "Timer";
  updateTimerDisplay();
}
