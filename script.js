const GITHUB_USERNAME = "nicolaezglatar-coder";
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;
const LOCAL_PROJECTS_URL = "projects.json";
const MIN_PROJECTS = 5;

let allProjects = [];

const projectsGrid = document.getElementById("projectsGrid");
const loadingElement = document.getElementById("loading");
const fallbackMessage = document.getElementById("fallbackMessage");
const errorMessage = document.getElementById("errorMessage");
const emptyMessage = document.getElementById("emptyMessage");
const projectCount = document.getElementById("projectCount");
const searchInput = document.getElementById("searchInput");
const languageFilter = document.getElementById("languageFilter");

document.addEventListener("DOMContentLoaded", () => {
  fetchProjects();
  searchInput.addEventListener("input", filterProjects);
  languageFilter.addEventListener("change", filterProjects);
});

async function fetchProjects() {
  showLoading();
  hideError();
  hideFallbackMessage();

  try {
    const response = await fetch(GITHUB_API_URL);

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos = await response.json();

    const githubProjects = repos
      .filter((repo) => repo.fork === false)
      .sort((firstRepo, secondRepo) => {
        return new Date(secondRepo.updated_at) - new Date(firstRepo.updated_at);
      });

    allProjects = [...githubProjects];

    if (githubProjects.length < MIN_PROJECTS) {
      const localProjects = await fetchLocalProjects();
      const neededProjects = MIN_PROJECTS - githubProjects.length;
      allProjects = [...githubProjects, ...localProjects.slice(0, neededProjects)];
      showFallbackMessage();
    }

    populateLanguageFilter(allProjects);
    renderProjects(allProjects);
  } catch (error) {
    showError("Nu am putut încărca proiectele din GitHub. Te rog încearcă din nou mai târziu.");
    projectCount.textContent = "Eroare la încărcare";
    console.error(error);
  } finally {
    hideLoading();
  }
}

async function fetchLocalProjects() {
  const response = await fetch(LOCAL_PROJECTS_URL);

  if (!response.ok) {
    throw new Error(`Local projects error: ${response.status}`);
  }

  const projects = await response.json();

  return projects.map((project) => {
    return {
      ...project,
      fork: false,
      isLocalDemo: true,
      description: project.description || "No description available",
      language: project.language || "Other",
      stargazers_count: project.stargazers_count || 0,
      forks_count: project.forks_count || 0,
      html_url: project.html_url || `https://github.com/${GITHUB_USERNAME}?tab=repositories`
    };
  });
}

function renderProjects(projects) {
  projectsGrid.innerHTML = "";
  emptyMessage.hidden = projects.length !== 0;

  if (projects.length === 0) {
    projectCount.textContent = "0 proiecte găsite";
    return;
  }

  projectCount.textContent = `${projects.length} proiecte găsite`;

  projects.forEach((repo) => {
    const card = document.createElement("article");
    card.className = "project-card";

    const cardHeader = document.createElement("div");
    cardHeader.className = "project-card-header";

    const title = document.createElement("h3");
    title.textContent = repo.name;

    cardHeader.appendChild(title);

    if (repo.isLocalDemo) {
      const badge = document.createElement("span");
      badge.className = "project-badge";
      badge.textContent = "Local demo";
      cardHeader.appendChild(badge);
    }

    const description = document.createElement("p");
    description.className = "project-description";
    description.textContent = repo.description || "No description available";

    const metaList = document.createElement("ul");
    metaList.className = "project-meta";

    const language = createMetaItem(`Language: ${repo.language || "Other"}`);
    const stars = createMetaItem(`Stars: ${repo.stargazers_count}`);
    const forks = createMetaItem(`Forks: ${repo.forks_count}`);

    metaList.append(language, stars, forks);

    const link = document.createElement("a");
    link.className = "repo-link";
    link.href = repo.html_url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "Vezi repository";

    card.append(cardHeader, description, metaList, link);
    projectsGrid.appendChild(card);
  });
}

function populateLanguageFilter(projects) {
  const languages = projects
    .map((repo) => repo.language || "Other")
    .filter((language, index, list) => list.indexOf(language) === index)
    .sort();

  languageFilter.innerHTML = '<option value="all">Toate limbajele</option>';

  languages.forEach((language) => {
    const option = document.createElement("option");
    option.value = language;
    option.textContent = language;
    languageFilter.appendChild(option);
  });
}

function filterProjects() {
  const searchText = searchInput.value.toLowerCase().trim();
  const selectedLanguage = languageFilter.value;

  const filteredProjects = allProjects.filter((repo) => {
    const name = repo.name.toLowerCase();
    const description = (repo.description || "No description available").toLowerCase();
    const language = repo.language || "Other";

    const matchesSearch = name.includes(searchText) || description.includes(searchText);
    const matchesLanguage = selectedLanguage === "all" || language === selectedLanguage;

    return matchesSearch && matchesLanguage;
  });

  renderProjects(filteredProjects);
}

function showLoading() {
  loadingElement.classList.remove("is-hidden");
  projectsGrid.innerHTML = "";
  emptyMessage.hidden = true;
  projectCount.textContent = "Se încarcă proiectele...";
}

function hideLoading() {
  loadingElement.classList.add("is-hidden");
}

function showFallbackMessage() {
  fallbackMessage.hidden = false;
}

function hideFallbackMessage() {
  fallbackMessage.hidden = true;
}

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.hidden = false;
}

function hideError() {
  errorMessage.textContent = "";
  errorMessage.hidden = true;
}

function createMetaItem(text) {
  const item = document.createElement("li");
  item.textContent = text;
  return item;
}
