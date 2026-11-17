
// ===== मोबाइल मेन्यू =====

const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");

if (menuBtn && navbar) {
  menuBtn.addEventListener("click", function () {
    navbar.classList.toggle("active");
  });
}

// ===== डेटा को वेबसाइट पर दिखाना =====

function showCards(containerId, items) {
  const container = document.getElementById(containerId);

  if (!container || !items) return;

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

// ===== पेज लोड होने पर =====

document.addEventListener("DOMContentLoaded", function () {
  if (typeof districtData === "undefined") return;

  showCards("administrationCards", districtData.administration);
  showCards("educationCards", districtData.education);
  showCards("healthCards", districtData.health);
  showCards("servicesCards", districtData.services);
  showCards("tourismCards", districtData.tourism);

  console.log("शहडोल जिला वेबसाइट तैयार है।");
});
