import "./style.css";
const app = document.getElementById("password-app");
const resultContainer = document.querySelector("#result");
const passwordText = document.querySelector("#result span");
const passwordCopyBtn = document.querySelector("#copy-btn");
const chooseLength = document.querySelector("#length");
const numOfRange = document.querySelector("#num-of-range");
const uppercase = document.querySelector("#uppercase");
const lowercase = document.querySelector("#lowercase");
const numbers = document.querySelector("#numbers");
const symbols = document.querySelector("#symboles");
const generateBtn = document.querySelector("#generate-btn");
const resultStringth = document.querySelector("#strength");
const resultProgress = document.querySelector("#progress div");

if (chooseLength) {
  chooseLength.addEventListener("input", () => {
    numOfRange.textContent = chooseLength.value;
  });
}

if (resultContainer) {
  resultContainer.addEventListener("click", (e) => {
    if (e.target.id === "copy-btn" || e.target.tagName === "SPAN") {
      navigator.clipboard.writeText(passwordText.textContent).then(() => {
        passwordCopyBtn.children[0].className = "fa-solid fa-check";
        passwordCopyBtn.children[0].style.color = "green";
        setTimeout(() => {
          passwordCopyBtn.children[0].className = "fa-regular fa-copy";
          passwordCopyBtn.children[0].style.color = "black";
        }, 2000);
      });
    }
  });
}

generateBtn.addEventListener("click", () => {
  let isValid = checkPasswordStrength();
  if (isValid) {
    let checkedBoxes = [uppercase, lowercase, numbers, symbols].filter(
      (checkbox) => checkbox.checked,
    );
    let passwordLength = chooseLength.value;
    let password = generatePassword(passwordLength, checkedBoxes);

    passwordText.textContent = password;

    updateStrengthUI(passwordLength, checkedBoxes.length);
  }
});

function checkPasswordStrength() {
  let allCheckBoxes = Array.from([uppercase, lowercase, numbers, symbols]);
  let isChecked = allCheckBoxes.some((checkbox) => checkbox.checked);
  if (!isChecked) {
    alert("Please select at least one character type.");
    return false;
  }
  return true;
}

function generatePassword(length, activeTypes) {
  let password = [];
  const charMap = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symboles: "!@#$%^&*()_+~`|}{[]:;?><,./-=",
  };

  activeTypes.forEach((type) => {
    const chars = charMap[type.id];
    password.push(chars[Math.floor(Math.random() * chars.length)]);
  });

  const allChars = activeTypes.map((type) => charMap[type.id]).join("");
  for (let i = password.length; i < length; i++) {
    password.push(allChars[Math.floor(Math.random() * allChars.length)]);
  }

  return password.sort(() => Math.random() - 0.5).join("");
}

function updateStrengthUI(len, typesCount) {
  let config = { label: "Medium", width: "50%", color: "orange" };

  if (len < 6 || typesCount === 1) {
    config = { label: "Weak", width: "25%", color: "#ff4d4d" };
  } else if (len <= 10 && typesCount >= 2) {
    config = { label: "Medium", width: "50%", color: "orangered" };
  } else if (len <= 15 && typesCount >= 3) {
    config = { label: "Strong", width: "75%", color: "#f1c40f" };
  } else if (len >= 16 && typesCount === 4) {
    config = { label: "Very Strong", width: "100%", color: "#2ecc71" };
  }

  resultStringth.textContent = config.label;
  resultProgress.style.width = config.width;
  resultProgress.style.backgroundColor = config.color;
}
