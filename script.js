
    const navButtons = document.querySelectorAll('.nav button');
    const sections = document.querySelectorAll('.section');
    const headerSub = document.getElementById('header-sub');

    function showSection(id){
      sections.forEach(s => s.classList.toggle('active', s.id === id));
      navButtons.forEach(b => b.classList.toggle('active', b.dataset.target === id));

      headerSub.textContent =
        id === 'app-status'     ? 'Live status for Vinti and PlingifyPlug-Hub releases.' :
        id === 'website-status' ? 'Overview of Odoo and GitHub-hosted websites.' :
        id === 'server-status'  ? 'Core back-end systems and third-party services.' :
        'Live overview of PlingifyPlug apps, sites and core systems.';
    }

    navButtons.forEach(b => {
      b.addEventListener('click', () => showSection(b.dataset.target));
    });

    const jump = document.querySelector('.pill-link[data-jump]');
    if (jump){
      jump.addEventListener('click', () => {
        const target = jump.getAttribute('data-jump');
        showSection(target);
        window.scrollTo({top:0, behavior:'smooth'});
      });
    }

const refreshBtn = document.getElementById('refresh-btn');
const refreshStatus = document.getElementById('refresh-status');

const REMOTE_URL = "https://github.com/BackupPASS/Status-Centre/raw/refs/heads/main/index.html";

let timeLeft = 60;
let lastRefreshSeconds = 0;
let lastHash = null;

// simple hash function (fast + enough for change detection)
function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

function formatLastRefreshed(seconds) {
  if (seconds < 5) return "just now";
  if (seconds < 60) return `${seconds}s ago`;
  return `${Math.floor(seconds / 60)}m ago`;
}

async function checkForUpdate(source = "auto") {
  try {

    const res = await fetch(REMOTE_URL, { cache: "no-store" });
    const text = await res.text();

    const newHash = simpleHash(text);

    // first run setup
    if (lastHash === null) {
      lastHash = newHash;
    }

    // if changed → reload page
    if (newHash !== lastHash) {
      refreshStatus.textContent = "Update detected... reloading";
      setTimeout(() => location.reload(), 800);
      return;
    }

    lastHash = newHash;

  } catch (err) {
    console.warn("Update check failed:", err);
  }
}

function updateUI() {
  refreshStatus.textContent =
    `Auto refresh in ${timeLeft}s | Last refreshed: ${formatLastRefreshed(lastRefreshSeconds)}`;
}

// manual refresh button
refreshBtn.addEventListener('click', async () => {
  refreshBtn.disabled = true;
  refreshBtn.textContent = "Checking...";

  await checkForUpdate("manual");

  timeLeft = 60;
  lastRefreshSeconds = 0;

  refreshBtn.disabled = false;
  refreshBtn.textContent = "Refresh";

  updateUI();
});

// main loop
setInterval(() => {

  timeLeft--;
  lastRefreshSeconds++;

  if (timeLeft <= 0) {
    timeLeft = 60;
    lastRefreshSeconds = 0;
    checkForUpdate("auto");
  }

  updateUI();

}, 1000);

// initial run
updateUI();
checkForUpdate("initial");
