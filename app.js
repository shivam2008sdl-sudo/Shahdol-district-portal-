
/* =================================
   SHAHDOL DISTRICT WEBSITE APP
================================= */

// MOBILE MENU

const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");

if (menuBtn && navbar) {

  menuBtn.addEventListener("click", function () {
    navbar.classList.toggle("active");

    if (navbar.classList.contains("active")) {
      menuBtn.textContent = "✕";
    } else {
      menuBtn.textContent = "☰";
    }
  });

  // Menu link click hone par menu band
  navbar.querySelectorAll("a").forEach(function (link) {

    link.addEventListener("click", function () {
      navbar.classList.remove("active");
      menuBtn.textContent = "☰";
    });

  });
}

// SHOW DATA CARDS

function showCards(containerId, items) {

  const container = document.getElementById(containerId);

  if (!container || !items) {
    return;
  }

  container.innerHTML = "";

  items.forEach(function (item) {

    const card = document.createElement("div");
    card.className = "card";

    const heading = document.createElement("h3");
    heading.textContent = item.name;

    const paragraph = document.createElement("p");
    paragraph.textContent = item.description;

    card.appendChild(heading);
    card.appendChild(paragraph);

    container.appendChild(card);

  });

}

// LOAD WEBSITE DATA

document.addEventListener("DOMContentLoaded", function () {

  if (typeof districtData === "undefined") {
    console.error("data.js file load nahi hui.");
    return;
  }

  showCards(
    "administrationCards",
    districtData.administration
  );

  showCards(
    "educationCards",
    districtData.education
  );

  showCards(
    "healthCards",
    districtData.health
  );

  showCards(
    "servicesCards",
    districtData.services
  );

  showCards(
    "tourismCards",
    districtData.tourism
  );

  console.log("Shahdol District Portal Loaded!");

});
