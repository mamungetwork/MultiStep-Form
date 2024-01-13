const btnNext = document.querySelectorAll("[data-btnnext]");
const btnPrev = document.querySelectorAll("[data-btnprev]");
const allFormSteps = document.querySelectorAll(".form_step");
const allStepper = document.querySelectorAll(".step");
const btnSubmit = document.querySelector("[data-btnsubmit]");

let currentStep = 1;

const theForm = document.getElementById("multi_step_form");
const setHeight = document.querySelector(
  `[data-step="${currentStep}`
).offsetHeight;
theForm.style.height = `${setHeight + 10}px`;

allFormSteps.forEach((step, index) => {
  index = index + 1;
  if (index > currentStep) {
    step.style.transform = `translateX(100%)`;
  }
});

let formStep = document
  .querySelector(`[data-step="${currentStep}"]`)
  .querySelectorAll("input[required]");
let isvalid = false;

function inputValidator() {
  formStep = document
    .querySelector(`[data-step="${currentStep}"]`)
    .querySelectorAll("input[required]");

  formStep.forEach((step) => {
    if (step.getAttribute("type") === "email") {
      var mailformat =
        /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (step.value.match(mailformat)) {
        step.classList.remove("error");
        isvalid = true;
      } else {
        step.classList.add("error");
        step.setAttribute("placeholder", "Enter valid email");
        isvalid = false;
      }
    }
    if (step.getAttribute("type") === "text") {
      if (step.value !== "") {
        step.classList.remove("error");
        isvalid = true;
      } else {
        step.classList.add("error");
        isvalid = false;
        console.log(step);
      }
    }

    if (step.getAttribute("type") === "number") {
      if (step.value !== "") {
        step.classList.remove("error");
        isvalid = true;
      } else {
        step.classList.add("error");
        isvalid = false;
      }
    }
  });
}

btnNext.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    inputValidator();

    if (formStep.length != 0 && isvalid) {
      // After Validation *********
      if (currentStep < allFormSteps.length) {
        currentStep++;
      }
      changeActive();
      let completedStep = document.querySelector(
        `[data-stepper="${currentStep - 1}"]`
      );
      completedStep.classList.add("complete");
    } else if (formStep.length === 0 && !isvalid) {
      // When there is no require field *********
      if (currentStep < allFormSteps.length) {
        currentStep++;
      }
      changeActive();
      let completedStep = document.querySelector(
        `[data-stepper="${currentStep - 1}"]`
      );
      completedStep.classList.add("complete");
    }

    isvalid = false;
  });
});

btnPrev.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (currentStep > 1) {
      currentStep--;
    }
    changeActive();
    removeComplete();
    slideOut();
  });
});

btnSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  inputValidator();
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

  slideIn();
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

function slideIn() {
  allFormSteps.forEach((step, index) => {
    index = index + 1;
    if (index < currentStep) {
      step.style.transform = `translateX(-100%)`;
    }
    if (index === currentStep) {
      step.style.transform = `translateX(0%)`;
    }
  });
}

function slideOut() {
  allFormSteps.forEach((step, index) => {
    index = index + 1;
    if (index === currentStep) {
      step.style.transform = `translateX(0%)`;
    }
    if (index > currentStep) {
      step.style.transform = `translateX(100%)`;
    }
  });
}
