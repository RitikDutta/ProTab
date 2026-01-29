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
  showTopSites: true,
  zen: false
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
  showTopSites: document.querySelector("#showTopSites"),
  topSitesList: document.querySelector("#topSitesList"),
  topSitesEmpty: document.querySelector("#topSitesEmpty"),
  themeRow: document.querySelector("#themeRow"),
  zenToggle: document.querySelector("#zenToggle"),
  resetBtn: document.querySelector("#resetBtn"),
  timerRing: document.querySelector("#timerRing"),
  timerDisplay: document.querySelector("#timerDisplay"),
  timerLabel: document.querySelector("#timerLabel"),
  timerControls: document.querySelector(".timer-controls"),
  timerPresets: document.querySelector(".timer-presets")
};

const state = loadState();
let timer = loadTimer();
let editingLinkId = null;

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
  renderTopSites();
  initTimer();
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

  elements.showTopSites.addEventListener("change", (event) => {
    state.showTopSites = event.target.checked;
    saveState();
    applyTopSitesVisibility();
    renderTopSites();
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
  if (elements.showTopSites) {
    elements.showTopSites.checked = state.showTopSites;
  }
  applyTheme();
  applyZen();
  applyTopSitesVisibility();
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

function applyTopSitesVisibility() {
  document.body.classList.toggle("hide-top-sites", !state.showTopSites);
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

function renderTopSites() {
  elements.topSitesList.innerHTML = "";
  elements.topSitesEmpty.style.display = "block";
  elements.topSitesEmpty.textContent = "Loading top sites...";

  if (!state.showTopSites) {
    elements.topSitesEmpty.textContent = "Top sites hidden.";
    return;
  }

  if (!window.chrome || !chrome.topSites || !chrome.topSites.get) {
    elements.topSitesEmpty.textContent = "Top sites unavailable.";
    return;
  }

  chrome.topSites.get((sites) => {
    elements.topSitesList.innerHTML = "";
    if (!sites || sites.length === 0) {
      elements.topSitesEmpty.textContent = "No top sites yet.";
      return;
    }
    elements.topSitesEmpty.textContent = "";
    elements.topSitesEmpty.style.display = "none";
    sites.slice(0, 8).forEach((site) => {
      const li = document.createElement("li");

      const anchor = document.createElement("a");
      anchor.href = site.url;
      anchor.className = "card-link";

      const title = document.createElement("span");
      title.className = "card-title";
      title.textContent = site.title || domainFromUrl(site.url);

      const url = document.createElement("span");
      url.className = "card-url";
      url.textContent = domainFromUrl(site.url);

      anchor.append(title, url);
      li.appendChild(anchor);
      elements.topSitesList.appendChild(li);
    });
  });
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
