const tabs = document.querySelectorAll(".tab");
const cards = document.querySelectorAll(".job-card");
const interviewCount = document.getElementById("interviewCount");
const rejectedCount = document.getElementById("rejectedCount");
const totalCount = document.getElementById("totalCount");
const jobTabCount = document.getElementById("jobTabCount");
const emptyState = document.querySelector(".empty-state");

let activeTab = "all";
// Update dashboard & tab counts
function updateCounts() {
  let total = document.querySelectorAll(".job-card").length;
  let interview = document.querySelectorAll('[data-status="interview"]').length;
  let rejected = document.querySelectorAll('[data-status="rejected"]').length;

  totalCount.textContent = total;
  interviewCount.textContent = interview;
  rejectedCount.textContent = rejected;

  if (activeTab === "all") jobTabCount.textContent = total + " jobs";
  if (activeTab === "interview") jobTabCount.textContent = interview + " jobs";
  if (activeTab === "rejected") jobTabCount.textContent = rejected + " jobs";
}

// Filter jobs according to tab
function filterJobs() {
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

// Tab click handler
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    activeTab = tab.dataset.tab;
    filterJobs();
    updateCounts();
  });
});

// Delegate click events for buttons & delete
document.addEventListener("click", function(e){
  const card = e.target.closest(".job-card");
  if(!card) return;

  // Interview button
  if(e.target.classList.contains("interview")){
    if(card.dataset.status === "interview") delete card.dataset.status;
    else card.dataset.status = "interview";
    updateStatusUI(card);
  }

  // Rejected button
  if(e.target.classList.contains("rejected")){
    if(card.dataset.status === "rejected") delete card.dataset.status;
    else card.dataset.status = "rejected";
    updateStatusUI(card);
  }

  // Delete button
  if(e.target.classList.contains("delete-icon")){
    card.remove();
  }

  updateCounts();
  filterJobs();
});

// Update card status UI
function updateStatusUI(card){
  const statusSpan = card.querySelector(".status");
  if(card.dataset.status === "interview"){
    statusSpan.textContent = "INTERVIEW";
    statusSpan.className = "status interview-status";
  } else if(card.dataset.status === "rejected"){
    statusSpan.textContent = "REJECTED";
    statusSpan.className = "status rejected-status";
  } else {
    statusSpan.textContent = "NOT APPLIED";
    statusSpan.className = "status not-applied";
  }
}

// Initial update
updateCounts();
filterJobs();


