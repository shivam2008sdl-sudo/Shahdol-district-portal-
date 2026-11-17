
/* =========================================
   SHAHDOL DISTRICT PORTAL - COMPLETE APP.JS
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {

  // ---------- DATA ----------
  const sections = [
    {
      id: "administration",
      title: "प्रशासन",
      data: getData("administrationData", "administration")
    },
    {
      id: "education",
      title: "शिक्षा",
      data: getData("educationData", "education")
    },
    {
      id: "health",
      title: "स्वास्थ्य",
      data: getData("healthData", "health")
    },
    {
      id: "services",
      title: "जन सेवाएँ",
      data: getData("servicesData", "services")
    },
    {
      id: "tourism",
      title: "पर्यटन",
      data: getData("tourismData", "tourism")
    }
  ];

  function getData(primary, secondary) {
    try {
      if (typeof administrationData !== "undefined" && primary === "administrationData") return administrationData;
    } catch (e) {}

    try {
      if (typeof educationData !== "undefined" && primary === "educationData") return educationData;
    } catch (e) {}

    try {
      if (typeof healthData !== "undefined" && primary === "healthData") return healthData;
    } catch (e) {}

    try {
      if (typeof servicesData !== "undefined" && primary === "servicesData") return servicesData;
    } catch (e) {}

    try {
      if (typeof tourismData !== "undefined" && primary === "tourismData") return tourismData;
    } catch (e) {}

    try {
      if (typeof window[secondary] !== "undefined") return window[secondary];
    } catch (e) {}

    return [];
  }

  // ---------- CARD CONTAINER ----------
  function getContainer(section) {
    const area = document.getElementById(section.id);
    if (!area) return null;

    let container =
      area.querySelector(".card-container") ||
      area.querySelector(".cards-container") ||
      area.querySelector(".card-grid") ||
      area.querySelector(".cards") ||
      area.querySelector(".grid");

    if (!container) {
      container = document.createElement("div");
      container.className = "card-container";
      area.appendChild(container);
    }

    return container;
  }

  // ---------- CREATE CARDS ----------
  function renderCards() {
    sections.forEach(function (section) {
      const container = getContainer(section);
      if (!container || !Array.isArray(section.data)) return;

      if (container.dataset.portalRendered === "yes") return;

      section.data.forEach(function (item) {
        if (!item || typeof item !== "object") return;

        const title =
          item.title || item.name || item.heading || item.department || "जानकारी";

        const description =
          item.description || item.details || item.info || item.address || "अधिक जानकारी के लिए क्लिक करें।";

        const card = document.createElement("div");
        card.className = "card portal-data-card";
        card.tabIndex = 0;
        card.setAttribute("role", "button");

        const heading = document.createElement("h3");
        heading.textContent = title;

        const para = document.createElement("p");
        para.textContent = description;

        const more = document.createElement("span");
        more.className = "read-more";
        more.textContent = "पूरी जानकारी देखें →";

        card.appendChild(heading);
        card.appendChild(para);
        card.appendChild(more);

        card.addEventListener("click", function () {
          showDetails(item, title, description);
        });

        card.addEventListener("keydown", function (event) {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            showDetails(item, title, description);
          }
        });

        container.appendChild(card);
      });

      container.dataset.portalRendered = "yes";
    });
  }

  // ---------- POPUP ----------
  const popupStyle = document.createElement("style");
  popupStyle.textContent = `
    .portal-modal {
      display:none;
      position:fixed;
      inset:0;
      z-index:99999;
      background:rgba(0,0,0,.7);
      align-items:center;
      justify-content:center;
      padding:15px;
    }
    .portal-modal.show { display:flex; }
    .portal-modal-box {
      background:#fff;
      color:#222;
      width:100%;
      max-width:520px;
      max-height:85vh;
      overflow-y:auto;
      border-radius:12px;
      padding:22px;
      position:relative;
    }
    .portal-modal-box h2 {
      color:#176b3a;
      margin:0 35px 15px 0;
    }
    .portal-modal-box p {
      line-height:1.7;
      overflow-wrap:anywhere;
    }
    .portal-close {
      position:absolute;
      right:14px;
      top:10px;
      border:0;
      background:#eee;
      border-radius:50%;
      width:34px;
      height:34px;
      font-size:22px;
      cursor:pointer;
    }
    .portal-actions {
      display:flex;
      flex-wrap:wrap;
      gap:10px;
      margin-top:18px;
    }
    .portal-actions a {
      display:inline-block;
      background:#176b3a;
      color:white;
      padding:10px 15px;
      border-radius:7px;
      text-decoration:none;
    }
    .portal-data-card { cursor:pointer; }
    .portal-data-card:focus {
      outline:3px solid #176b3a;
    }
    .read-more {
      display:inline-block;
      margin-top:10px;
      color:#176b3a;
      font-weight:bold;
    }
  `;
  document.head.appendChild(popupStyle);

  const modal = document.createElement("div");
  modal.className = "portal-modal";
  modal.innerHTML = `
    <div class="portal-modal-box">
      <button class="portal-close" aria-label="बंद करें">&times;</button>
      <div class="portal-modal-content"></div>
    </div>
  `;
  document.body.appendChild(modal);

  const modalContent = modal.querySelector(".portal-modal-content");

  function showDetails(item, title, description) {
    modalContent.replaceChildren();

    const heading = document.createElement("h2");
    heading.textContent = title;
    modalContent.appendChild(heading);

    const fields = [
      ["विवरण", description],
      ["पता", item.address || item.location],
      ["फोन", item.phone || item.mobile || item.contact],
      ["ईमेल", item.email],
      ["समय", item.time || item.timing || item.hours],
      ["वेबसाइट", item.website || item.url]
    ];

    fields.forEach(function (field) {
      if (!field[1]) return;

      const p = document.createElement("p");
      const strong = document.createElement("strong");
      strong.textContent = field[0] + ": ";
      p.appendChild(strong);
      p.appendChild(document.createTextNode(String(field[1])));
      modalContent.appendChild(p);
    });

    const actions = document.createElement("div");
    actions.className = "portal-actions";

    const phone = item.phone || item.mobile || item.contact;
    if (phone) {
      const phoneLink = document.createElement("a");
      phoneLink.href = "tel:" + String(phone).replace(/[^\d+]/g, "");
      phoneLink.textContent = "फोन करें";
      actions.appendChild(phoneLink);
    }

    const address = item.address || item.location || title;
    const mapLink = document.createElement("a");
    mapLink.href = "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent(String(address) + ", Shahdol, Madhya Pradesh");
    mapLink.target = "_blank";
    mapLink.rel = "noopener";
    mapLink.textContent = "मैप देखें";
    actions.appendChild(mapLink);

    if (item.website || item.url) {
      const webLink = document.createElement("a");
      webLink.href = item.website || item.url;
      webLink.target = "_blank";
      webLink.rel = "noopener";
      webLink.textContent = "वेबसाइट खोलें";
      actions.appendChild(webLink);
    }

    modalContent.appendChild(actions);
    modal.classList.add("show");
  }

  function closePopup() {
    modal.classList.remove("show");
  }

  modal.querySelector(".portal-close").addEventListener("click", closePopup);

  modal.addEventListener("click", function (event) {
    if (event.target === modal) closePopup();
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closePopup();
  });

  // ---------- MOBILE MENU ----------
  const menuButton =
    document.querySelector(".menu-toggle") ||
    document.querySelector(".hamburger") ||
    document.querySelector("#menu-toggle");

  const navigation =
    document.querySelector(".nav-links") ||
    document.querySelector("nav ul") ||
    document.querySelector(".navbar ul");

  if (menuButton && navigation) {
    menuButton.addEventListener("click", function () {
      navigation.classList.toggle("active");
    });

    navigation.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navigation.classList.remove("active");
      });
    });
  }

  // ---------- START ----------
  renderCards();

});
