const btnNext = document.querySelectorAll("[data-btnnext]");
const btnPrev = document.querySelectorAll("[data-btnprev]");
const allFormSteps = document.querySelectorAll(".form_step");
const allStepper = document.querySelectorAll(".step");

let currentStep = 1;

btnNext.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (currentStep < allFormSteps.length) {
      currentStep++;
    }
    changeActive();

    let completedStep = document.querySelector(
      `[data-stepper="${currentStep - 1}"]`
    );
    completedStep.classList.add("complete");
  });
});

btnPrev.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (currentStep > 1) {
      currentStep--;
    }
    changeActive();
    removeComplete();
  });
});

function changeActive() {
  allFormSteps.forEach((step) => {
    step.classList.remove("active");
  });

  let selectedStep = document.querySelector(`[data-step="${currentStep}"]`);
  selectedStep.classList.add("active");

  let selectedSteper = document.querySelector(
    `[data-stepper="${currentStep}"]`
  );
  selectedSteper.classList.add("active");
}

function removeComplete() {
  allStepper.forEach((step, index) => {
    index = index + 1;
    if (index > currentStep) {
      step.classList.remove("active");
    }

    if (index === currentStep) {
      step.classList.remove("complete");
    }
  });
}
