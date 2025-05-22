function updatePreview() {
  document.getElementById("previewName").innerText = document.getElementById("name").value;
  document.getElementById("previewEmail").innerText = document.getElementById("email").value;
  document.getElementById("previewPhone").innerText = document.getElementById("phone").value;
  document.getElementById("previewSummary").innerText = document.getElementById("summary").value;

  const education = document.querySelectorAll(".edu");
  let eduList = "";
  education.forEach(e => { if (e.value) eduList += `<li>${e.value}</li>`; });
  document.getElementById("previewEducation").innerHTML = eduList;

  const skills = document.getElementById("skills").value.split(",");
  document.getElementById("previewSkills").innerText = skills.map(s => s.trim()).join(", ");

  const experience = document.querySelectorAll(".exp");
  let expList = "";
  experience.forEach(e => { if (e.value) expList += `<li>${e.value}</li>`; });
  document.getElementById("previewExperience").innerHTML = expList;

  updateProgressBar();
}

function addEducation() {
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Education";
  input.className = "edu";
  input.oninput = updatePreview;
  document.getElementById("educationSection").insertBefore(input, document.querySelector("#educationSection button"));
}

function addExperience() {
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Experience";
  input.className = "exp";
  input.oninput = updatePreview;
  document.getElementById("experienceSection").insertBefore(input, document.querySelector("#experienceSection button"));
}

function clearForm() {
  document.getElementById("resumeForm").reset();

  // Remove additional education and experience inputs
  document.querySelectorAll(".edu, .exp").forEach((el, i) => {
    if (i > 0) el.remove(); // keep first, remove others
  });

  // Clear preview
  document.getElementById("previewName").innerText = "";
  document.getElementById("previewEmail").innerText = "";
  document.getElementById("previewPhone").innerText = "";
  document.getElementById("previewSummary").innerText = "";
  document.getElementById("previewEducation").innerHTML = "";
  document.getElementById("previewSkills").innerText = "";
  document.getElementById("previewExperience").innerHTML = "";

  // Reset progress bar
  document.getElementById("progressBar").style.width = "0%";
}

function downloadPDF() {
  const resume = document.getElementById("resumePreview");

  html2canvas(resume).then(canvas => {
    const imgData = canvas.toDataURL("image/png");
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = 210;
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("resume.pdf");
  });
}

function updateProgressBar() {
  const inputs = document.querySelectorAll("#resumeForm input, #resumeForm textarea");
  const filled = Array.from(inputs).filter(i => i.value.trim() !== "").length;
  const total = inputs.length;
  const percent = Math.round((filled / total) * 100);
  document.getElementById("progressBar").style.width = percent + "%";
}

// Auto-update preview on input
document.querySelectorAll("input, textarea").forEach(input => {
  input.addEventListener("input", updatePreview);
});
