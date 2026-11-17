
/* SHAHDOL PORTAL - CLICKABLE DETAILS */

const details = {
  "सरकारी अस्पताल": {
    name: "कुशाभाऊ ठाकरे जिला अस्पताल",
    address: "पांडव नगर, शहडोल, मध्य प्रदेश - 484001",
    phone: "07652245256",
    time: "अस्पताल की OPD समय-सारणी की पुष्टि आवश्यक है। आपातकालीन सेवा के लिए अस्पताल से संपर्क करें।",
    extra: "ईमेल: csurgeonshdmp@mp.nic.in"
  },

  "कलेक्टर कार्यालय": {
    name: "कलेक्ट्रेट कार्यालय, शहडोल",
    address: "शहडोल, मध्य प्रदेश",
    time: "कार्यालय का वर्तमान समय सत्यापित करना बाकी है।"
  },

  "शिक्षा विभाग": {
    name: "जिला शिक्षा अधिकारी कार्यालय",
    address: "शहडोल, मध्य प्रदेश",
    phone: "07652-245032",
    time: "कार्यालय का समय सत्यापित करना बाकी है।"
  },

  "कॉलेज": {
    name: "शहडोल के कॉलेज एवं महाविद्यालय",
    address: "शहडोल जिला, मध्य प्रदेश",
    extra: "सरकारी मेडिकल कॉलेज की वेबसाइट: https://gmcshahdol.org"
  },

  "मेडिकल कॉलेज": {
    name: "बिरसा मुंडा शासकीय मेडिकल कॉलेज",
    address: "शहडोल, मध्य प्रदेश",
    phone: "8319980380",
    time: "आपातकालीन सेवा 24 घंटे उपलब्ध बताई गई है।",
    extra: "वेबसाइट: https://gmcshahdol.org"
  },

  "सारसी आइलैंड रिसॉर्ट": {
    name: "The Sarsi Island Resort",
    address: "सारसी, शहडोल जिला, मध्य प्रदेश",
    time: "नाव सेवा का बताया गया समय शाम 5:30 बजे तक है। यात्रा से पहले पुष्टि करें।",
    extra: "पहुँचने के लिए पहले मार्कंडेय घाट और फिर नाव से यात्रा करनी होती है।"
  },

  "विराटेश्वर मंदिर": {
    name: "विराटेश्वर मंदिर",
    address: "सोहागपुर, शहडोल, मध्य प्रदेश",
    time: "दर्शन का समय स्थानीय प्रबंधन से सत्यापित करें।"
  },

  "हेल्पलाइन नंबर": {
    name: "महत्वपूर्ण हेल्पलाइन",
    phone: "पुलिस: 100 | एम्बुलेंस: 108 | महिला: 1091 | चाइल्ड: 1098 | CM हेल्पलाइन: 181",
    time: "आपातकालीन सहायता के लिए संबंधित नंबर पर संपर्क करें।"
  },

  "सरकारी स्कूल": {
    name: "शहडोल के सरकारी विद्यालय",
    address: "शहडोल जिला, मध्य प्रदेश",
    time: "हर विद्यालय की समय-सारणी अलग होती है। संबंधित विद्यालय से पुष्टि करें।"
  },

  "निजी स्कूल": {
    name: "शहडोल के निजी विद्यालय",
    address: "शहडोल जिला, मध्य प्रदेश",
    time: "विद्यालयवार समय-सारणी की पुष्टि आवश्यक है।"
  },

  "हॉस्टल एवं छात्रावास": {
    name: "शहडोल के छात्रावास",
    address: "शहडोल जिला, मध्य प्रदेश",
    time: "प्रवेश, उपलब्ध सीट और समय की जानकारी संबंधित छात्रावास से लें।"
  }
};

// Add popup styles automatically
const style = document.createElement("style");

style.textContent = `
.detail-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.65);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
}

.detail-box {
  background: white;
  width: 100%;
  max-width: 520px;
  max-height: 85vh;
  overflow-y: auto;
  border-radius: 12px;
  padding: 24px;
  position: relative;
  color: #222;
}

.detail-box h2 {
  color: #075b36;
  margin-bottom: 15px;
}

.detail-box p {
  margin: 12px 0;
  overflow-wrap: anywhere;
}

.detail-close {
  position: absolute;
  right: 14px;
  top: 10px;
  border: 0;
  background: #075b36;
  color: white;
  padding: 7px 12px;
  border-radius: 5px;
  font-size: 18px;
}

.detail-link {
  display: inline-block;
  background: #075b36;
  color: white;
  padding: 10px 14px;
  margin: 7px 5px 0 0;
  border-radius: 5px;
  text-decoration: none;
}

.card {
  cursor: pointer;
}
`;

document.head.appendChild(style);

// Create popup
const overlay = document.createElement("div");
overlay.className = "detail-overlay";
overlay.style.display = "none";

overlay.innerHTML = `
  <div class="detail-box">
    <button class="detail-close" aria-label="बंद करें">✕</button>
    <div id="detailContent"></div>
  </div>
`;

document.body.appendChild(overlay);

const content = document.getElementById("detailContent");

function openDetails(title, description) {

  const info = details[title] || {};

  const name = info.name || title;
  const address = info.address || "सटीक पता अभी सत्यापित किया जाना बाकी है।";
  const phone = info.phone || "संपर्क नंबर अभी उपलब्ध नहीं है।";
  const time = info.time || "समय-सारणी की आधिकारिक पुष्टि अभी बाकी है।";
  const extra = info.extra || description ||
    "इस स्थान की विस्तृत जानकारी सत्यापित करके जोड़ी जाएगी।";

  const mapQuery = encodeURIComponent(
    name + " " + address
  );

  const phoneLink = info.phone &&
    /^\d+$/.test(info.phone.replace(/\D/g, ""))
    ? `<a class="detail-link" href="tel:${info.phone.replace(/\D/g, "")}">📞 कॉल करें</a>`
    : "";

  content.innerHTML = `
    <h2>${name}</h2>
    <p><strong>📍 पता:</strong> ${address}</p>
    <p><strong>📞 संपर्क:</strong> ${phone}</p>
    <p><strong>🕒 समय-सारणी:</strong> ${time}</p>
    <p><strong>ℹ️ अन्य जानकारी:</strong> ${extra}</p>
    ${phoneLink}
    <a class="detail-link"
       href="https://www.google.com/maps/search/?api=1&query=${mapQuery}"
       target="_blank" rel="noopener">
       🗺️ नक्शे में देखें
    </a>
  `;

  overlay.style.display = "flex";
}

// Make every card clickable
document.querySelectorAll(".card").forEach(function(card) {

  card.addEventListener("click", function() {

    const heading = card.querySelector("h3");
    const paragraph = card.querySelector("p");

    if (!heading) return;

    openDetails(
      heading.textContent.trim(),
      paragraph ? paragraph.textContent.trim() : ""
    );

  });

});

// Close popup
overlay.querySelector(".detail-close").addEventListener("click", function() {
  overlay.style.display = "none";
});

overlay.addEventListener("click", function(event) {
  if (event.target === overlay) {
    overlay.style.display = "none";
  }
});

document.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
    overlay.style.display = "none";
  }
});

// Mobile menu
const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");

if (menuBtn && navbar) {

  menuBtn.addEventListener("click", function() {
    navbar.classList.toggle("active");
    menuBtn.textContent =
      navbar.classList.contains("active") ? "✕" : "☰";
  });

  navbar.querySelectorAll("a").forEach(function(link) {
    link.addEventListener("click", function() {
      navbar.classList.remove("active");
      menuBtn.textContent = "☰";
    });
  });
}

console.log("Shahdol Portal Ready");
