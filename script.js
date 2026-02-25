const tabs = document.querySelectorAll(".tab");
const interviewCount = document.getElementById("interviewCount");
const rejectedCount = document.getElementById("rejectedCount");
const totalCount = document.getElementById("totalCount");
const jobTabCount = document.getElementById("jobTabCount");
const emptyState = document.querySelector(".empty-state");

let activeTab = "all";

function updateCounts() {
  const cards = document.querySelectorAll(".job-card");

  let total = cards.length;
  let interview = document.querySelectorAll('[data-status="interview"]').length;
  let rejected = document.querySelectorAll('[data-status="rejected"]').length;

  totalCount.textContent = total;
  interviewCount.textContent = interview;
  rejectedCount.textContent = rejected;

  if (activeTab === "all") {
    jobTabCount.textContent = total + " jobs";
  } else if (activeTab === "interview") {
    jobTabCount.textContent = interview + " jobs";
  } else if (activeTab === "rejected") {
    jobTabCount.textContent = rejected + " jobs";
  }
}

function filterJobs() {
  const cards = document.querySelectorAll(".job-card");
  let visible = 0;

  cards.forEach(card => {
    const status = card.dataset.status;

    if (activeTab === "all" || status === activeTab) {
      card.style.display = "block";
      visible++;
    } else {
      card.style.display = "none";
    }
  });

  emptyState.style.display = visible === 0 ? "block" : "none";
}

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    activeTab = tab.dataset.tab;

    filterJobs();
    updateCounts();
  });
});

document.addEventListener("click", function (e) {
  const card = e.target.closest(".job-card");
  if (!card) return;

  if (e.target.classList.contains("interview")) {
    if (card.dataset.status === "interview") {
      delete card.dataset.status;
    } else {
      card.dataset.status = "interview";
    }
    updateStatusUI(card);
  }

  if (e.target.classList.contains("rejected")) {
    if (card.dataset.status === "rejected") {
      delete card.dataset.status;
    } else {
      card.dataset.status = "rejected";
    }
    updateStatusUI(card);
  }

  if (e.target.classList.contains("delete-icon")) {
    card.remove();
  }

  updateCounts();
  filterJobs();
});

function updateStatusUI(card) {
  const statusSpan = card.querySelector(".status");

  if (card.dataset.status === "interview") {
    statusSpan.textContent = "INTERVIEW";
    statusSpan.className = "status interview-status";
  } 
  else if (card.dataset.status === "rejected") {
    statusSpan.textContent = "REJECTED";
    statusSpan.className = "status rejected-status";
  } 
  else {
    statusSpan.textContent = "NOT APPLIED";
    statusSpan.className = "status not-applied";
  }
}

updateCounts();
filterJobs();