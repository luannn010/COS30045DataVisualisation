window.onload = function() {
  const image = document.getElementById("pets-image");
  
  
  image.width = 750;
  image.style.height = "auto";

  const button1 = document.getElementById("button1");
  const button2 = document.getElementById("button2");
  const button3 = document.getElementById("button3");

  button1.addEventListener("click", function() {
      image.src = "pets2019.jpeg";
  });

  button2.addEventListener("click", function() {
      image.src = "pets2021.jpeg";
  });

  button3.addEventListener("click", function() {
      image.src = "pet2019vs2021.jpeg";
  });
};

