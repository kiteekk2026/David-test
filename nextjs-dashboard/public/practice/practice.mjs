import { questions } from "./questions.mjs";

const heading = document.getElementById("exercise-title");
const form = document.getElementById("exercise");
const options = document.getElementById("options");
const progress = document.getElementById("progress");
const progressLabel = document.getElementById("progress-label");
const feedback = document.getElementById("feedback");
const check = document.getElementById("check");
const next = document.getElementById("next");
const restart = document.getElementById("restart");
const offline = document.getElementById("offline");

let index = 0;
let score = 0;

function renderQuestion() {
  const question = questions[index];
  heading.textContent = "Complete the dialogue";
  progressLabel.textContent = `Question ${index + 1} of ${questions.length}`;
  progress.max = questions.length;
  progress.value = index + 1;
  document.getElementById("prompt").textContent = question.prompt ?? "";
  document.getElementById("sentence").textContent = question.sentence;
  document.getElementById("context").textContent = question.context;
  options.replaceChildren(...question.options.map((option) => {
    const label = document.createElement("label");
    label.className = "option";
    label.lang = "fi";
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "answer";
    input.value = option;
    input.required = true;
    label.append(input, option);
    return label;
  }));
  form.hidden = false;
  check.hidden = false;
  next.hidden = true;
  restart.hidden = true;
  feedback.textContent = "";
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (check.hidden) return;
  const question = questions[index];
  const correct = new FormData(form).get("answer") === question.answer;
  score += Number(correct);
  feedback.textContent = `${correct ? "Correct." : `The answer is ${question.answer}.`} ${question.explanation}`;
  options.querySelectorAll("input").forEach((input) => { input.disabled = true; });
  check.hidden = true;
  next.hidden = false;
  next.textContent = index === questions.length - 1 ? "See results" : "Next question";
  next.focus();
});

next.addEventListener("click", () => {
  index += 1;
  if (index < questions.length) {
    renderQuestion();
  } else {
    heading.textContent = "Practice complete";
    progressLabel.textContent = "Lesson complete";
    form.hidden = true;
    next.hidden = true;
    restart.hidden = false;
    feedback.textContent = `You got ${score} out of ${questions.length} correct.`;
  }
  heading.focus();
});

restart.addEventListener("click", () => {
  index = 0;
  score = 0;
  renderQuestion();
  heading.focus();
});

renderQuestion();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js")
    .then(() => navigator.serviceWorker.ready)
    .then(() => { offline.textContent = "Ready for offline practice"; })
    .catch(() => { offline.textContent = "Offline practice is unavailable in this browser."; });
} else {
  offline.textContent = "Offline practice is unavailable in this browser.";
}
