"use strict";
const signInButton = document.querySelector(".sign-in-button");
const signIn = document.querySelector(".sign-in");
const signInOverlay = document.querySelector(".sign-in-layer");

const openSignIn = function () {
  signIn.classList.remove("hidden");
  signInOverlay.classList.remove("hidden");
};
const closeSignIn = function () {
  signIn.classList.add("hidden");
  signInOverlay.classList.add("hidden");
};

signInButton.addEventListener("click", openSignIn);

signInOverlay.addEventListener("click", closeSignIn);

document.addEventListener("keydown", function (e) {
  if (!signIn.classList.contains("hidden") && e.key === "Escape") {
    closeSignIn();
  }
});
