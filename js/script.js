function clickmenu() {
  let menu = document.getElementById("menu-mobile");

  if (menu.style.display == "block") {
    menu.style.display = "none";
  } else {
    menu.style.transition = "300ms";
    menu.style.display = "block";
  }
}

/* function fecharMenu() {
  let menu = document.getElementById("menu-mobile");

  if (window.innerWidth >= 825) {
    menu.style.display = "block";
  } else {
    menu.style.display = "none";
  }
} */
