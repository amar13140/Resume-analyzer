let lastAnalysis = null; // helps compare different inputs

function analyzeResume() {
  const text = document.getElementById("resumeInput").value.toLowerCase().trim();
  const job = document.getElementById("jobRole").value.toLowerCase().trim();

  // RESET OUTPUT EVERY TIME
  document.getElementById("type").textContent = "";
  document.getElementById("score").textContent = "";
  document.getElementById("match").textContent = "";
  document.getElementById("suggestions").textContent = "";

  if (!text || text.length < 50) {
    alert("Please enter a proper resume (at least 50 characters)");
    return;
  }

  let score = 0;
  let matchScore = 0;
  let type = "General Resume";
  let suggestions = [];

  // Skill groups
  const frontend = ["html","css","javascript","react","frontend","ui"];
  const backend = ["node","python","java","api","database","backend"];
  const professor = ["teaching","research","curriculum","students","lecture","education","university"];
  const common = ["communication","leadership","teamwork","presentation","problem solving"];

  // Count helper
  const count = (arr) => arr.filter(word => text.includes(word)).length;

  let f = count(frontend);
  let b = count(backend);
  let p = count(professor);
  let c = count(common);

  // TYPE DETECTION (improved)
  if (p >= 3) type = "Professor / Academic 🎓";
  else if (f >= 3 && f > b) type = "Frontend Developer 💻";
  else if (b >= 3) type = "Backend Developer ⚙️";

  // -------- SCORING (MORE ACCURATE) --------

  // Skills (max 40)
  let skillScore = Math.min((f + b + p) * 5, 40);

  // Experience (max 20)
  let expScore = text.includes("experience") ? 15 : 0;
  if (text.includes("internship")) expScore += 5;

  // Projects / Research (max 15)
  let projectScore = 0;
  if (text.includes("project")) projectScore += 8;
  if (text.includes("research")) projectScore += 7;

  // Education (max 15)
  let eduScore = (text.includes("degree") || text.includes("btech") || text.includes("phd")) ? 15 : 5;

  // Soft skills (max 10)
  let softScore = Math.min(c * 3, 10);

  score = skillScore + expScore + projectScore + eduScore + softScore;

  if (score > 100) score = 100;

  // -------- JOB MATCHING (SMARTER) --------

  let required = [];

  if (job.includes("frontend")) required = frontend;
  else if (job.includes("backend")) required = backend;
  else if (job.includes("professor") || job.includes("teacher")) required = professor;

  let matchCount = count(required);
  matchScore = required.length > 0 ? Math.round((matchCount / required.length) * 100) : 50;

  // Adjust with experience weight
  if (text.includes("experience")) matchScore += 10;
  if (text.includes("project") || text.includes("research")) matchScore += 5;

  if (matchScore > 100) matchScore = 100;

  // -------- VERDICT --------
  let verdict = "";
  if (matchScore < 40) verdict = "❌ Not Suitable";
  else if (matchScore < 70) verdict = "⚠️ Moderate Fit";
  else verdict = "✅ Good Fit";

  // -------- SMART SUGGESTIONS --------
  if (!text.includes("experience")) {
    suggestions.push("Add experience or internships");
  }

  if (!text.includes("project") && !text.includes("research")) {
    suggestions.push("Include projects or research work");
  }

  if (c < 2) {
    suggestions.push("Add soft skills like communication, teamwork");
  }

  if (required.length > 0 && matchCount < required.length / 2) {
    suggestions.push("Add more relevant skills for " + job);
  }

  if (text.length < 200) {
    suggestions.push("Resume content is too short — add more details");
  }

  // -------- DISPLAY --------
  document.getElementById("type").textContent = "Resume Type: " + type;
  document.getElementById("score").textContent = "Resume Score: " + score + "/100";
  document.getElementById("match").textContent = "Job Match: " + matchScore + "% (" + verdict + ")";
  document.getElementById("suggestions").textContent = "Suggestions: " + suggestions.join(" | ");

  // Save last analysis (optional improvement)
  lastAnalysis = text;
}
