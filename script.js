const techContent = {
  api: {
    label: "Backend Engineering",
    title: "REST API Development",
    text: "I designed and built secure REST APIs using Java and Spring Boot, focusing on clean endpoint design, validation, clear request/response models, OpenAPI documentation, and production-ready service structure.",
    chips: ["Java", "Spring Boot", "REST", "OpenAPI", "Security"]
  },
  microservices: {
    label: "Architecture",
    title: "Microservices Design",
    text: "I worked on service-based systems where responsibilities are split into focused components. This improved maintainability, deployment flexibility, integration clarity, and long-term scalability across enterprise environments.",
    chips: ["Microservices", "Kafka", "Docker", "Scalability", "Integration"]
  },
  cloud: {
    label: "Cloud Exposure",
    title: "Cloud & Deployment Thinking",
    text: "I gained exposure to cloud-based delivery practices and built applications with deployment, monitoring, reliability, and operational support in mind rather than only local development.",
    chips: ["GCP", "AWS", "CI/CD", "Monitoring", "Runtime"]
  },
  database: {
    label: "Data Layer",
    title: "Database Engineering",
    text: "I worked with relational databases including PostgreSQL and SQL Server, supporting persistence layers, data queries, schema changes, integrations, reporting, and reliability-focused backend development.",
    chips: ["PostgreSQL", "SQL Server", "Hibernate", "Flyway", "Queries"]
  },
  code: {
    label: "Software Craft",
    title: "Clean Code & Delivery",
    text: "I focus on readable, maintainable code with practical structure, Git-based workflows, debugging, testing, documentation, and steady improvement across backend and frontend systems.",
    chips: ["Git", "Testing", "Debugging", "Clean Code", "Docs"]
  },
  systems: {
    label: "Enterprise Systems",
    title: "Reliable System Building",
    text: "I contributed to enterprise-grade systems where performance, security, integration reliability, observability, and maintainability were critical for real business operations.",
    chips: ["Security", "Performance", "Integrations", "Observability", "Reliability"]
  }
};

const modal = document.getElementById("techModal");
const closeBtn = document.getElementById("modalClose");
const modalLabel = document.getElementById("modalLabel");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const modalChips = document.getElementById("modalChips");
let lastFocusedElement = null;

function openTechModal(key) {
  const tech = techContent[key];
  if (!tech) return;
  lastFocusedElement = document.activeElement;
  modalLabel.textContent = tech.label;
  modalTitle.textContent = tech.title;
  modalText.textContent = tech.text;
  modalChips.innerHTML = tech.chips.map(chip => `<span>${chip}</span>`).join("");
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  closeBtn.focus();
}

function closeTechModal() {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  if (lastFocusedElement) lastFocusedElement.focus();
}

document.querySelectorAll(".tech-trigger").forEach(button => {
  button.addEventListener("click", () => openTechModal(button.dataset.tech));
});

closeBtn.addEventListener("click", closeTechModal);

modal.addEventListener("click", event => {
  if (event.target === modal) closeTechModal();
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && modal.classList.contains("show")) {
    closeTechModal();
  }
});