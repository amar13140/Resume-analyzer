function analyzeResume() {
  const text = document.getElementById("resumeInput").value.toLowerCase();
  const job = document.getElementById("jobRole").value.toLowerCase();

  // Skill categories
  const frontendSkills = ["html", "css", "javascript", "react", "ui", "frontend"];
  const backendSkills = ["node", "python", "java", "api", "database", "backend"];

  let score = 0;
  let matchScore = 0;
  let type = "General";
  let suggestions = [];

  // Detect resume type
  let frontCount = frontendSkills.filter(skill => text.includes(skill)).length;
  let backCount = backendSkills.filter(skill => text.includes(skill)).length;

  if (frontCount > backCount && frontCount > 2) {
    type = "Frontend Developer Resume 💻";
  } else if (backCount > frontCount && backCount > 2) {
    type = "Backend Developer Resume ⚙️";
  }

  // Base scoring
  score += frontCount * 5 + backCount * 5;

  if (text.includes("project")) score += 10;
  if (text.includes("experience")) score += 15;
  if (text.includes("internship")) score += 10;

  if (score > 100) score = 100;

  // Job matching logic
  let requiredSkills = [];

  if (job.includes("frontend")) {
    requiredSkills = frontendSkills;
  } else if (job.includes("backend")) {
    requiredSkills = backendSkills;
  }

  let matchCount = requiredSkills.filter(skill => text.includes(skill)).length;

  if (requiredSkills.length > 0) {
    matchScore = Math.round((matchCount / requiredSkills.length) * 100);
  }

  // Suggestions
  if (matchScore < 50) {
    suggestions.push("❌ Resume is not strong for this role");
    suggestions.push("👉 Add relevant skills for " + job);
  } else if (matchScore < 80) {
    suggestions.push("⚠️ Moderate match — improve skills");
  } else {
    suggestions.push("✅ Strong resume for this role!");
  }

  if (!text.includes("project")) {
    suggestions.push("Add projects to strengthen your resume");
  }

  if (!text.includes("experience")) {
    suggestions.push("Include experience or internships");
  }

  // Display
  document.getElementById("type").textContent = "Resume Type: " + type;
  document.getElementById("score").textContent = "Resume Score: " + score + "/100";
  document.getElementById("match").textContent = "Job Match: " + matchScore + "%";
  document.getElementById("suggestions").textContent = "Suggestions: " + suggestions.join(" | ");
}
