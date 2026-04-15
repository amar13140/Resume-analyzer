function analyzeResume() {
  const text = document.getElementById("resumeInput").value.toLowerCase();
  const job = document.getElementById("jobRole").value.toLowerCase();

  let score = 0;
  let matchScore = 0;
  let type = "General Resume";
  let suggestions = [];

  // Skill categories
  const frontendSkills = ["html", "css", "javascript", "react"];
  const backendSkills = ["node", "python", "java", "database"];
  const professorSkills = [
    "teaching", "research", "curriculum", "students",
    "lecture", "education", "university", "academic"
  ];

  const commonSkills = [
    "communication", "leadership", "problem solving",
    "teamwork", "presentation"
  ];

  // Count matches
  const countMatches = (skills) =>
    skills.filter(skill => text.includes(skill)).length;

  let frontCount = countMatches(frontendSkills);
  let backCount = countMatches(backendSkills);
  let profCount = countMatches(professorSkills);
  let commonCount = countMatches(commonSkills);

  // Detect type
  if (profCount >= 3) {
    type = "Professor / Academic Resume 🎓";
  } else if (frontCount > backCount && frontCount >= 2) {
    type = "Frontend Developer 💻";
  } else if (backCount >= 2) {
    type = "Backend Developer ⚙️";
  }

  // SCORING (Balanced)
  score += (frontCount + backCount + profCount) * 6;
  score += commonCount * 4;

  if (text.includes("experience")) score += 10;
  if (text.includes("project") || text.includes("research")) score += 10;
  if (text.includes("education") || text.includes("degree")) score += 10;

  // Normalize score (important fix)
  if (score < 40 && text.length > 100) score = 60;
  if (score > 100) score = 100;

  // JOB MATCHING
  let requiredSkills = [];

  if (job.includes("frontend")) requiredSkills = frontendSkills;
  else if (job.includes("backend")) requiredSkills = backendSkills;
  else if (job.includes("professor") || job.includes("teacher"))
    requiredSkills = professorSkills;

  let matchCount = countMatches(requiredSkills);

  if (requiredSkills.length > 0) {
    matchScore = Math.round((matchCount / requiredSkills.length) * 100);
  }

  // Make matching forgiving
  if (matchScore < 40 && text.length > 100) matchScore = 65;

  // Verdict
  let verdict = "";
  if (matchScore < 40) verdict = "❌ Not suitable";
  else if (matchScore < 70) verdict = "⚠️ Moderate fit";
  else verdict = "✅ Good fit";

  // Suggestions
  if (matchScore < 70) {
    suggestions.push("Add more relevant skills for " + job);
  }

  if (!text.includes("experience") && !text.includes("research")) {
    suggestions.push("Add experience or research work");
  }

  if (commonCount < 2) {
    suggestions.push("Include soft skills like communication & leadership");
  }

  // Display
  document.getElementById("type").textContent =
    "Resume Type: " + type;

  document.getElementById("score").textContent =
    "Resume Score: " + score + "/100";

  document.getElementById("match").textContent =
    "Job Match: " + matchScore + "% (" + verdict + ")";

  document.getElementById("suggestions").textContent =
    "Suggestions: " + suggestions.join(" | ");
}
