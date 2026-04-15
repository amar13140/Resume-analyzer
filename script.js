function analyzeResume() {
  const text = document.getElementById("resumeInput").value.toLowerCase();

  let score = 0;
  let strengths = [];
  let weaknesses = [];
  let suggestions = [];

  // Keywords
  const skills = ["html", "css", "javascript", "python", "java", "react"];
  const experienceWords = ["project", "internship", "experience"];
  const educationWords = ["btech", "degree", "university"];

  // Check skills
  let skillCount = skills.filter(skill => text.includes(skill)).length;
  score += skillCount * 5;

  if (skillCount >= 3) {
    strengths.push("Good technical skills");
  } else {
    weaknesses.push("Lack of technical skills");
    suggestions.push("Add more relevant skills like JavaScript, React, etc.");
  }

  // Check experience
  let expCount = experienceWords.filter(word => text.includes(word)).length;
  score += expCount * 10;

  if (expCount > 0) {
    strengths.push("Has experience/projects");
  } else {
    weaknesses.push("No experience mentioned");
    suggestions.push("Add projects or internship experience");
  }

  // Check education
  let eduCount = educationWords.filter(word => text.includes(word)).length;
  score += eduCount * 5;

  if (eduCount > 0) {
    strengths.push("Education details present");
  } else {
    weaknesses.push("Missing education details");
    suggestions.push("Include your degree and university");
  }

  // Final score limit
  if (score > 100) score = 100;

  // Display results
  document.getElementById("score").textContent = "Score: " + score + "/100";
  document.getElementById("strengths").textContent = "Strengths: " + strengths.join(", ");
  document.getElementById("weakness").textContent = "Weaknesses: " + weaknesses.join(", ");
  document.getElementById("suggestions").textContent = "Suggestions: " + suggestions.join(", ");
}
