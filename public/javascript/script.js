console.log("hello this is from script.js");

const inputs = document.querySelectorAll("input");

inputs.forEach((input) => {
  input.addEventListener("input", () => {
    if (input.value) {
      input.classList.add("has-value");
    } else {
      input.classList.remove("has-value");
    }
  });
});

function validateForm() {
  var nameInput = document.getElementById("name");
  var emailInput = document.getElementById("input-email");

  if (nameInput.value.trim() === "" || emailInput.value.trim() === "") {
      alert("Full Name and Email are required fields.");
      return false; 
  }
  return true; 
}

function resetInput() {
  var form = document.getElementById("form");
  form.reset();
}
window.onpageshow = function(event) {
  var form = document.getElementById("form");
  form.reset();
};