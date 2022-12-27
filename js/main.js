const API = "http://localhost:8000/users";
// selector signIn & logIn
const S_inpLogin = document.getElementsByClassName("S_input-login")[0];
const S_inpPass = document.getElementsByClassName("S_input-password")[0];

const L_inpLogin = document.getElementsByClassName("L_input-login")[0];
const L_inpPass = document.getElementsByClassName("L_input-password")[0];
const L_inpPassRep = document.getElementsByClassName("L_input-password-rep")[0];

const btnIn = document.getElementsByClassName("first__btn-in")[0];
const btnLogIn = document.getElementsByClassName("first__btn-logIn")[0];
const logIn = document.getElementsByClassName("log-in")[0];
const a = document.getElementsByTagName("a")[0];
let login = "munxw";
let password = "123";

// selector
const header = document.getElementsByClassName("hide")[0];

const modalka = document.getElementsByClassName("add-post")[0];

const addPublications = document.getElementsByClassName("add-publication")[0];

const container = document.getElementsByClassName("hide__sign")[0];
// ! first Page =======================================
const labels = document.querySelectorAll(".form-control label");

labels.forEach((label) => {
  label.innerHTML = label.innerText
    .split("")
    .map(
      (letter, idx) => `
      <span style="transition-delay:${idx * 50}ms">${letter}</span>
    `
    )
    .join("");
});
// ? first Page =================================

a.addEventListener("click", function (e) {
  container.style.display = "none";
  logIn.style.display = "block";
});

// ! creatUser ==================
// ! Log in =====
function LogIn() {
  if (
    !L_inpLogin.value.trim() ||
    !L_inpPass.value.trim() ||
    !L_inpPass.value.trim()
  ) {
    alert("Заполните поле");
    return;
  }
  if (L_inpPass.value !== L_inpPassRep.value) {
    alert("пароли не совподают");
  } else {
    logIn.style.display = "none";
    container.style.display = "block";
  }

  const newUser = {
    login: L_inpLogin.value,
    password: L_inpPass.value,
  };
  createUser(newUser);
  L_inpLogin.value = "";
  L_inpPass.value = "";
}
// ? Log in =====

async function createUser(newUser) {
  const options = {
    method: "POST",
    body: JSON.stringify(newUser),
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
  };
  await fetch(API, options);
}
// ? creatUser ==================

// ! getUser =================
async function getUser() {
  const response = await fetch(`${API}`);
  const result = await response.json();
  return result;
}

async function getUserById(id) {
  const response = await fetch(`${API}/${id}`);
  const result = await response.json();
  return result;
}
// ? getUser =================

// ! Sign IN ========================
async function signIn() {
  let users = await getUser();
  for (let i = 0; i < users.length; i++) {
    if (
      S_inpLogin.value == users[i].login &&
      S_inpPass.value == users[i].password
    ) {
      header.style.display = "block";
      container.style.display = "none";
      break;
    } else {
      alert("Неверные данные");
      break;
    }
  }
}
// ? Sign IN =================

// ! btn =====================
btnLogIn.addEventListener("click", function (e) {
  LogIn();
});

btnIn.addEventListener("click", function (e) {
  signIn();
});

// ? btn =====================

addPublications.addEventListener("click", function (e) {
  modalka.style.display = "block";
});
console.log(addPublications, "asd");
