const btnNext = document.querySelectorAll("[data-btnnext]");
const btnPrev = document.querySelectorAll("[data-btnprev]");
const allFormSteps = document.querySelectorAll(".form_step");
const allStepper = document.querySelectorAll(".step");
const btnSubmit = document.querySelector("[data-btnsubmit]");

let currentStep = 1;

let setHeight = function () {
  const theForm = document.getElementById("multi_step_form");
  const getHeight = document.querySelector(
    `[data-step="${currentStep}"`
  ).clientHeight;
  theForm.style.height = `${getHeight + 10}px`;
};

setHeight();

allFormSteps.forEach((step, index) => {
  index = index + 1;
  if (index > currentStep) {
    step.style.transform = `translateX(100%)`;
  }
});

let formStep = document
  .querySelector(`[data-step="${currentStep}"]`)
  .querySelectorAll("input[required]");
let isvalid = true;

function showError(element) {
  let parentEl = element.parentElement;
  let getLabel = parentEl.querySelector("label").textContent;
  let newError = document.createElement("p");
  if (!parentEl.querySelector(".iserror")) {
    element.classList.add("error");
    newError.setAttribute("class", "iserror");
    newError.textContent = `Please enter your ${getLabel.toLowerCase()}`;
    parentEl.appendChild(newError);
  }
}

function hideError(element) {
  let parentEl = element.parentElement;
  let getErrorEl = parentEl.querySelector(".iserror");
  if (parentEl.querySelector(".iserror")) {
    element.classList.remove("error");
    getErrorEl.remove(getErrorEl);
  }
}

function inputValidator() {
  formStep = document
    .querySelector(`[data-step="${currentStep}"]`)
    .querySelectorAll("input[required]");
  allFormStepWithEmail = document
    .querySelector(`[data-step="${currentStep}"]`)
    .querySelectorAll("input");

  allFormStepWithEmail.forEach((email) => {
    var mailformat =
      /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (
      email.getAttribute("type") === "email" &&
      email.hasAttribute("required")
    ) {
      if (email.value === "") {
        showError(email);
        isvalid = false;
      } else {
        if (email.value.match(mailformat)) {
          hideError(email);
          isvalid = true;
        } else {
          showError(email);
          let errorItem = email.parentElement.querySelector(".iserror");
          errorItem.textContent = `Your email is missing "@"." symbol`;
          isvalid = false;
        }
      }
    } else if (
      email.getAttribute("type") === "email" &&
      !email.hasAttribute("required")
    ) {
      if (email.value !== "" && !email.value.match(mailformat)) {
        showError(email);
        let errorItem = email.parentElement.querySelector(".iserror");
        errorItem.textContent = `Your email is missing "@"." symbol`;
        isvalid = false;
      } else {
        hideError(email);
        isvalid = true;
      }
    }
  });
  formStep.forEach((step) => {
    if (step.getAttribute("type") === "text") {
      if (step.value !== "") {
        hideError(step);
        isvalid = true;
      } else {
        showError(step);
        isvalid = false;
      }
    }

    if (step.getAttribute("type") === "number") {
      if (step.value !== "") {
        hideError(step);
        isvalid = true;
      } else {
        showError(step);
        isvalid = false;
      }
    }
  });
}

btnNext.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    inputValidator();

    if (formStep.length !== 0 && !isvalid) {
      // After Validation *********
      setHeight();
      return;
    } else if (isvalid) {
      // When there is no require field *********
      if (currentStep < allFormSteps.length) {
        currentStep++;
      }
      changeActive();
      let completedStep = document.querySelector(
        `[data-stepper="${currentStep - 1}"]`
      );
      addCompletedStep(completedStep);
    }
    setHeight();
  });
});

btnPrev.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (currentStep > 1) {
      currentStep--;
    }
    setHeight();
    changeActive();
    removeComplete();
    slideOut();
    formStep.forEach((step) => {
      hideError(step);
    });
  });
});

btnSubmit.addEventListener("click", (ele) => {
  ele.preventDefault();
  inputValidator();
  setHeight();

  const allInputField = document.querySelectorAll("#multi_step_form input");

  if (isvalid) {
    allStepper.forEach((step) => {
      step.classList.add("complete");
    });

    let successEle = document.createElement("div");
    successEle.classList.add("success");
    successEle.innerHTML = `<h5>Form submission successful!</h5><p><a href="">Click Here</a> to refresh the page</p>`;

    let formContainer = document.querySelector(".form_container");
    let showValueEle = document.createElement("div");
    showValueEle.classList.add("thevalue");

    allFormSteps.forEach((step, index) => {
      setTimeout(() => {
        if (step.dataset.step === `${currentStep}`) {
          step.prepend(successEle);
        }
        setHeight();
      }, 350);
    });
    allInputField.forEach((input) => {
      let theText = `<p>${input.id.toUpperCase()} = ${input.value}</p>`;

      showValueEle.innerHTML += theText;
    });
    setTimeout(() => {
      formContainer.appendChild(showValueEle);
    }, 350);
  } else {
  }
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

function addCompletedStep(ele) {
  allStepper.forEach((el, index) => {
    index = index + 1;
    if (index < currentStep) {
      el.classList.add("complete");
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
