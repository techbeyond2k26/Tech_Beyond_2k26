document.addEventListener("DOMContentLoaded", () => {

  /* ================= COUNTDOWN TIMER ================= */
  const countdownEl = document.getElementById("countdown");
  if (countdownEl) {
    const eventDate = new Date("2026-02-28T23:59:59").getTime();
    setInterval(() => {
      const diff = eventDate - Date.now();
      if (diff <= 0) return countdownEl.textContent = "EVENT LIVE!";
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);
      countdownEl.textContent = `${d}d ${h}h ${m}m ${s}s`;
    }, 1000);
  }

  /* ================= REVEAL EFFECT ================= */
 window.addEventListener("load", () => {
document.querySelectorAll(
    ".reveal-logo, .reveal-title, .reveal-tagline, .reveal-countdown"
  ).forEach((el, i) => {
    setTimeout(() => {
      el.classList.add("visible");
    }, i * 250);
  });
}); 
  /* ================= HERO FADE-IN ================= */
  const title = document.querySelector(".fade-title");
  if (title) {
    title.getBoundingClientRect();
    setTimeout(() => title.classList.add("visible"), 1000);
  }
/* ================= UPSIDE DOWN SPORES ================= */
  const MAX_SPORES = 35;
let activeSpores = 0;

function createSpore() {
  if (activeSpores >= MAX_SPORES) return;

  activeSpores++;

  const spore = document.createElement("div");
  spore.className = "spore";
  spore.style.left = Math.random() * 100 + "vw";
  spore.style.animationDuration = 10 + Math.random() * 10 + "s";
  spore.style.opacity = 0.3 + Math.random() * 0.5;

  document.body.appendChild(spore);

  setTimeout(() => {
    spore.remove();
    activeSpores--;
  }, 22000);
}

let sporeInterval = setInterval(createSpore, 600);

  /* ================= NETFLIX STYLE ROW SCROLL ================= */
  

/* event scroll */
document.querySelectorAll(".event-cache").forEach(p => {
  new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add("visible");
    });
  }, { threshold: 0.4 }).observe(p);
});


// ================= UPSIDE DOWN SOUND + ANIMATION =================
const clockSound = new Audio("assets/vecna_s_clock.mp3");
clockSound.volume = 0.4;
clockSound.preload = "auto";

function enterUpsideDown() {

  // Mark that audio should continue
  localStorage.setItem("playClock", "true");

  // Play sound
  clockSound.currentTime = 0;
  clockSound.play().catch(() => {});

  // Animation
  document.body.classList.add("upside-down");

  // Redirect
  setTimeout(() => {
    window.location.href = "events.html";
  }, 1800);
}

window.addEventListener("load", () => {
  const shouldPlay = localStorage.getItem("playClock");

  if (shouldPlay === "true") {
    const clockSound = new Audio("assets/vecna_s_clock.mp3");
    clockSound.volume = 0.4;
    clockSound.loop = true;

    clockSound.play().catch(() => {
      // fallback if browser blocks it
    });

    // Clear flag so it doesn't replay forever
    localStorage.removeItem("playClock");
  }
});
clockSound.volume = 0;
clockSound.play();

let v = 0;
const fade = setInterval(() => {
  v += 0.05;
  clockSound.volume = Math.min(v, 0.4);
  if (v >= 0.4) clearInterval(fade);
}, 100)

  /* ================= EVENT LIMIT (3 EVENTS) ================= */
  const MAX_EVENTS = 3;
  const eventCheckboxes = document.querySelectorAll('input[name="events"]');
  const eventCountSpan = document.getElementById("eventCount");

  function updateEventCount() {
    const checked = document.querySelectorAll('input[name="events"]:checked').length;
    eventCountSpan.textContent = checked;

    if (checked >= MAX_EVENTS) {
      eventCheckboxes.forEach(cb => { if (!cb.checked) cb.disabled = true; });
    } else {
      eventCheckboxes.forEach(cb => cb.disabled = false);
    }
  }

  eventCheckboxes.forEach(cb =>
    cb.addEventListener("change", updateEventCount)
  );

  /* ================= TEAM EVENTS ================= */
  document.querySelectorAll('input[data-team="true"]').forEach(cb => {
const container = cb.closest(".event-option").nextElementSibling;
if (!container) return;
    const min = Number(cb.dataset.min);
    const max = Number(cb.dataset.max);

    cb.addEventListener("change", () => {
      updateEventCount();

      if (!cb.checked) {
        container.style.display = "none";
        container.innerHTML = "";
        return;
      }

      container.style.display = "block";
      container.innerHTML = `
  <input type="text" name="teamName" placeholder="Team Name" required>

  <select class="team-size" name="teamSize" required>
    <option value="" disabled selected>Select Team Size (${min}-${max})</option>
  </select>

  <h4 style="color:#ff1b1b;margin:8px 0;">Team Head Details</h4>
  <input type="text" name="teamHeadName" placeholder="Team Head Name" required>
  <input type="email" name="teamHeadEmail" placeholder="Email" required>
  <input type="tel" name="teamHeadMobile" placeholder="Mobile" required>

  <div class="team-members"></div>
`;

    /* ================================================================ */
      const sizeSelect = container.querySelector(".team-size");
      const membersDiv = container.querySelector(".team-members");

      for (let i = min; i <= max; i++) {
        sizeSelect.innerHTML += `<option value="${i}">${i}</option>`;
      }

      sizeSelect.addEventListener("change", () => {
        membersDiv.innerHTML = "";
        const total = Number(sizeSelect.value);

        for (let i = 2; i <= total; i++) {
          membersDiv.innerHTML += `
  <input type="text" name="member${i}Name" placeholder="Member ${i} Name" required>
  <input type="email" name="member${i}Email" placeholder="Member ${i} Email" required>
  <input type="tel" name="member${i}Mobile" placeholder="Member ${i} Mobile" required>
`;

        }
      });
    });
  });

  /* ================= PAYMENT LOGIC ================= */
  const surprise = document.getElementById("surpriseEvent");
  const amountSpan = document.getElementById("payAmount");
  const paymentProof = document.getElementById("paymentProof");
const form = document.querySelector(".register-box form");


  function updateAmount() {
    amountSpan.textContent = surprise && surprise.checked ? "₹250" : "₹200";
  }

  if (surprise) {
    surprise.addEventListener("change", updateAmount);
  }

  updateAmount();
form.addEventListener("submit", async (e) => {
  e.preventDefault();
document.getElementById("stLoader").classList.add("active");



  const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbzBA4i1khiDO-qihsmfATK-xG7uaIKtennAG3Va6DeQ2dxHPkj5wOf-GDQqfqqNvzvGdA/exec";

  const surprise = document.getElementById("surpriseEvent");
  surprise.value = surprise.checked ? "YES" : "NO";

  const fileInput = document.getElementById("paymentProof");
  if (!fileInput.files.length) {
    alert("Please upload payment screenshot");
    return;
  }

  const file = fileInput.files[0];

  // ❗ Limit size (important)
  if (file.size > 5 * 1024 * 1024) {
    alert("File must be under 5MB");
    return;
  }

  const reader = new FileReader();

  reader.onload = async () => {
    const base64Data = reader.result.split(",")[1];

    // Add hidden inputs
    addHidden("payment_base64", base64Data);
    addHidden("payment_filename", file.name);
    addHidden("payment_mime", file.type);

    /* ================= EVENTS ================= */
    const selectedEvents =
      document.querySelectorAll('input[name="events"]:checked');

    addHidden("eventCount", selectedEvents.length);

    selectedEvents.forEach((cb, i) => {
      const label = cb.closest("label");
      const block = label.nextElementSibling;

      addHidden(`event_name_${i}`, label.innerText.trim());
      addHidden(`event_teamSize_${i}`,
        block.querySelector(".team-size")?.value || "1"
      );

      const inputs = block.querySelectorAll("input");

      addHidden(`event_${i}_head_name`, inputs[1]?.value || "");
      addHidden(`event_${i}_head_email`, inputs[2]?.value || "");
      addHidden(`event_${i}_head_mobile`, inputs[3]?.value || "");

      let idx = 4;
      const teamSize =
        block.querySelector(".team-size")?.value || 1;

      for (let m = 2; m <= teamSize; m++) {
        addHidden(`event_${i}_m${m}_name`, inputs[idx++]?.value || "");
        addHidden(`event_${i}_m${m}_email`, inputs[idx++]?.value || "");
        addHidden(`event_${i}_m${m}_mobile`, inputs[idx++]?.value || "");
      }
    });
    if (!form.checkValidity()) {
  form.reportValidity();
  return;
}
const food = document.querySelector('input[name="foodPreference"]:checked');
addHidden("food_preference", food ? food.value : "");

   form.action = SCRIPT_URL;
form.method = "POST";
form.submit();

  };

  reader.readAsDataURL(file);

  function addHidden(name, value) {
    const i = document.createElement("input");
    i.type = "hidden";
    i.name = name;
    i.value = value;
    form.appendChild(i);
  }
});
function enterUpsideDown() {
  const main = document.querySelector("main");
  if (!main) return;

  main.classList.add("upside-down");

  // mobile-safe delay
  setTimeout(() => {
    window.location.href = "events.html";
  }, 900);
}
function triggerUpsideDown() {
  const world = document.getElementById("world");
  if (!world) return;

  world.classList.add("upside-down");

  // remove after animation ends
  setTimeout(() => {
    world.classList.remove("upside-down");
  }, 1700);
}
});




