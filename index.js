const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 200;
canvas.height = 600;

var rect = canvas.getBoundingClientRect();

var savedImageData;

var eventbrush = true;

var painting = false;
var eventrectangle = false;
var eventcircle = false;
var eventellipse = false;
var eventerase = false;

function brush() {
  canvas.style.cursor = "url('.img/brush.png'),crosshair";
  eventbrush = true;
  eventrectangle = false;
  eventcircle = false;
  eventellipse = false;
  eventerase = false;
}

function rectangle() {
  canvas.style.cursor = "url('.img/rectangle.png'),crosshair";

  eventrectangle = true;
  eventcircle = false;
  eventellipse = false;
  eventerase = false;
  eventbrush = false;
}

function circle() {
  canvas.style.cursor = "url('.img/circle.png'),crosshair";

  eventcircle = true;
  eventellipse = false;
  eventrectangle = false;
  eventerase = false;
  eventbrush = false;
}

function ellipses() {
  canvas.style.cursor = "url('.img/oval.png'),crosshair";

  eventellipse = true;
  eventrectangle = false;
  eventcircle = false;
  eventerase = false;
  eventbrush = false;
}
const erase = () => {
  canvas.style.cursor = "url('.img/eraser.png'),crosshair";

  eventerase = true;
  eventellipse = false;
  eventrectangle = false;
  eventcircle = false;
  eventbrush = false;
};

var mouse = {
  x: undefined,
  y: undefined,
};

var mouseup = {
  x: undefined,
  y: undefined,
};

var mousedown = {
  x: undefined,
  y: undefined,
};

var imagedetails = {
  x: undefined,
  y: undefined,
  width: undefined,
  height: undefined,
};

function paint() {
  ctx.beginPath();
  ctx.lineWidth = document.getElementById("number").value;
  ctx.lineCap = "round";
  ctx.strokeStyle = document.getElementById("color").value;
  if (eventrectangle == true) {
    ctx.strokeRect(
      imagedetails.x,
      imagedetails.y,
      imagedetails.width,
      imagedetails.height
    );
  } else if (eventcircle == true) {
    let radius = imagedetails.width;
    ctx.beginPath();
    ctx.arc(mousedown.x, mousedown.y, radius, 0, Math.PI * 2);
    ctx.stroke();
  } else if (eventellipse == true) {
    let radiusX = imagedetails.width / 2;
    let radiusY = imagedetails.height / 2;
    ctx.beginPath();
    ctx.ellipse(
      mousedown.x,
      mousedown.y,
      radiusX,
      radiusY,
      Math.PI / 4,
      0,
      Math.PI * 2
    );
    ctx.stroke();
  }
}

function draw(e) {
  if (painting == true && eventbrush == true) {
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    ctx.lineWidth = document.getElementById("number").value;
    ctx.lineCap = "round";
    ctx.lineTo(x, y);
    ctx.strokeStyle = document.getElementById("color").value;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
    console.log("eventbrush");
  }
}

canvas.addEventListener("mousedown", (e) => {
  if (eventbrush == false) {
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;

    savecanvasimage();

    mousedown.x = e.clientX - rect.left;
    mousedown.y = e.clientY - rect.top;

    if (eventerase == true) {
      remove();
    }
  } else {
    draw(e);
  }

  painting = true;
});

canvas.addEventListener("mousemove", (e) => {
  if (eventbrush == false) {
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    if (painting == true) {
      imagedetails.width = Math.abs(mouse.x - mousedown.x);
      imagedetails.height = Math.abs(mouse.y - mousedown.y);

      if (mouse.x > mousedown.x) {
        imagedetails.x = mousedown.x;
      } else {
        imagedetails.x = mouse.x;
      }

      if (mouse.y > mousedown.y) {
        imagedetails.y = mousedown.y;
      } else {
        imagedetails.y = mouse.y;
      }
      if (eventerase == false) {
        redrawcanvasimage();
        paint();
      } else {
        remove();
      }
    }
  } else {
    draw(e);
  }
});

canvas.addEventListener("mouseup", (e) => {
  if (eventbrush == false) {
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    if (eventerase == false) {
      redrawcanvasimage();
    }

    mouseup.x = e.clientX - rect.left;
    mouseup.y = e.clientY - rect.top;

    imagedetails.width = Math.abs(mouse.x - mousedown.x);
    imagedetails.height = Math.abs(mouse.y - mousedown.y);

    if (mouse.x > mousedown.x) {
      imagedetails.x = mousedown.x;
    } else {
      imagedetails.x = mouse.x;
    }

    if (mouse.y > mousedown.y) {
      imagedetails.y = mousedown.y;
    } else {
      imagedetails.y = mouse.y;
    }

    paint();
  } else {
    ctx.beginPath();
  }
  painting = false;
});

window.addEventListener("resize", () => {
  location.reload();
});

const remove = () => {
  if (eventerase == true) {
    ctx.clearRect(mouse.x - 20, mouse.y - 20, 40, 40);
  }
};

function savecanvasimage() {
  savedImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

function redrawcanvasimage() {
  ctx.putImageData(savedImageData, 0, 0);
}

const clearcanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

savecanvasimage();

canvas.style.cursor = "url('./img/brush.png'),crosshair";
