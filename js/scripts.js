/*!
 * Start Bootstrap - Grayscale v7.0.2 (https://startbootstrap.com/theme/grayscale)
 * Copyright 2013-2021 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-grayscale/blob/master/LICENSE)
 */
//
// Scripts
//
function postData(url, data) {
  // Default options are marked with *
  return fetch(url, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, same-origin, *omit
    headers: {
      "user-agent": "Example",
      "content-type": "application/json",
    },
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer", // *client, no-referrer
  }).then((response) => response.json()); // 輸出成 json
}

function predictType(result) {
  if (result[27] == 0) {
    console.log(result[27]);
    return "有" + (result.slice(9, 15) * 100).toFixed(2) + "%的機率是假新聞";
  } else {
    console.log(result[27]);
    return "有" + (result.slice(9, 15) * 100).toFixed(2) + "%的機率是真新聞";
  }
}

function resetText(){
  const resultText = document.getElementById("resultText").innerHTML;
  if(resultText!=""){
    document.getElementById("resultText").innerHTML = "";
  }
} 

function onSubmit() {
  const content = document.getElementById("content").value;
  if (content == "") {
    document.getElementById("resultText").innerHTML = "請輸入新聞";
  } else {
    resetText();
    
    const data = {
      content,
    };

    postData("http://3396f2100e3d.ngrok.io/predict", data).then((result) => {
      console.log(result);
      document.getElementById("resultText").innerHTML = predictType(result);
    });
  }
}


window.addEventListener("DOMContentLoaded", (event) => {
  // Navbar shrink function
  var navbarShrink = function () {
    const navbarCollapsible = document.body.querySelector("#mainNav");
    if (!navbarCollapsible) {
      return;
    }
    if (window.scrollY === 0) {
      navbarCollapsible.classList.remove("navbar-shrink");
    } else {
      navbarCollapsible.classList.add("navbar-shrink");
    }
  };

  // Shrink the navbar
  navbarShrink();

  // Shrink the navbar when page is scrolled
  document.addEventListener("scroll", navbarShrink);

  // Activate Bootstrap scrollspy on the main nav element
  const mainNav = document.body.querySelector("#mainNav");
  if (mainNav) {
    new bootstrap.ScrollSpy(document.body, {
      target: "#mainNav",
      offset: 74,
    });
  }

  // Collapse responsive navbar when toggler is visible
  const navbarToggler = document.body.querySelector(".navbar-toggler");
  const responsiveNavItems = [].slice.call(
    document.querySelectorAll("#navbarResponsive .nav-link")
  );
  responsiveNavItems.map(function (responsiveNavItem) {
    responsiveNavItem.addEventListener("click", () => {
      if (window.getComputedStyle(navbarToggler).display !== "none") {
        navbarToggler.click();
      }
    });
  });
});
