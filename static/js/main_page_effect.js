// Waves background effect for the homepage hero
var effect_canvas = document.getElementById("main_page_background");
if (!effect_canvas) {
  // Canvas not on this page
} else {
var ctx = effect_canvas.getContext("2d");
var waves = [];

var background_color = "#000000";

var frequency = 0;

var minAmplitude = 0;
var maxAmplitudeAdd = 0;
var maxAmplitude = 10;

var minSpeed = 0.005;
var maxSpeed = 0.1;

var current_drawing_session_id = 1;
var raf_id = 0;
var is_visible = true;
var is_page_visible = !document.hidden;

var cursor_x = 0;
var cursor_y = 0;

var waves_spacing = 0;
var step_x = 2; // draw every N pixels for less CPU

function create_wave(y) {
  waves.push({
    y: y,
    phase: Math.random() * 100,
    speed: minSpeed,
    amplitude: minAmplitude,
  });
}

function pythagore(a, b) {
  return Math.sqrt(a * a + b * b);
}

function draw(drawing_session) {
  if (current_drawing_session_id !== drawing_session) return;
  if (!is_visible || !is_page_visible) {
    raf_id = requestAnimationFrame(function () {
      draw(drawing_session);
    });
    return;
  }

  ctx.clearRect(0, 0, effect_canvas.width, effect_canvas.height);
  ctx.fillStyle = background_color;
  ctx.fillRect(0, 0, effect_canvas.width, effect_canvas.height);
  ctx.strokeStyle = "#ff6c6c45";

  var starting_x = 0;

  for (var i = 0; i < waves.length; i++) {
    var wave = waves[i];

    ctx.beginPath();
    ctx.moveTo(0, wave.y);

    var phase = wave.phase;

    for (var x = starting_x; x < effect_canvas.width; x += step_x) {
      var distance = pythagore(Math.abs(x - cursor_x), Math.abs(wave.y - cursor_y));
      var amplitude_amplfier = Math.min(waves_spacing / Math.max(distance, 1), 3);
      var amplitude = wave.amplitude + maxAmplitudeAdd * amplitude_amplfier;
      var y = amplitude * Math.sin(frequency * x + phase) + wave.y;
      ctx.lineTo(x, y);
    }

    var cursor_hover = Math.abs(cursor_y - wave.y) < waves_spacing / 2;

    if (cursor_hover) {
      wave.amplitude += 0.1;
      wave.speed -= 30 ** -3;
      wave.amplitude = Math.min(wave.amplitude, maxAmplitude);
      wave.speed = Math.max(wave.speed, -maxSpeed);
    } else if (wave.amplitude > minAmplitude) {
      wave.amplitude -= 0.1;
    } else if (wave.speed < minSpeed) {
      wave.speed += 30 ** -3;
    } else {
      wave.amplitude = minAmplitude;
      wave.speed = minSpeed;
    }

    ctx.stroke();
    ctx.closePath();

    starting_x -= 3;
    wave.phase -= wave.speed;
  }

  raf_id = requestAnimationFrame(function () {
    draw(drawing_session);
  });
}

function resize_canvas() {
  var dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  var css_w = window.innerWidth;
  var css_h = window.innerHeight;

  effect_canvas.style.width = css_w + "px";
  effect_canvas.style.height = css_h + "px";
  effect_canvas.width = Math.floor(css_w * dpr);
  effect_canvas.height = Math.floor(css_h * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  return { width: css_w, height: css_h };
}

function create_effect() {
  var size = resize_canvas();

  if (window.innerWidth < 600) {
    waves_spacing = 100;
    frequency = 0.05;
    minAmplitude = 5;
    maxAmplitudeAdd = 10;
    step_x = 3;
  } else {
    waves_spacing = 200;
    frequency = 0.03;
    minAmplitude = 7;
    maxAmplitudeAdd = 20;
    step_x = 2;
  }

  waves = [];
  for (var i = 30; i < size.height; i += waves_spacing) {
    create_wave(i);
  }

  cancelAnimationFrame(raf_id);
  current_drawing_session_id++;
  draw(current_drawing_session_id);
}

window.addEventListener("mousemove", function (e) {
  var rect = effect_canvas.getBoundingClientRect();
  cursor_x = e.clientX - rect.left;
  cursor_y = e.clientY - rect.top;
});

document.addEventListener("visibilitychange", function () {
  is_page_visible = !document.hidden;
});

if ("IntersectionObserver" in window) {
  var vis_observer = new IntersectionObserver(
    function (entries) {
      is_visible = entries[0] && entries[0].isIntersecting;
    },
    { threshold: 0 }
  );
  vis_observer.observe(effect_canvas);
}

create_effect();
window.addEventListener("resize", create_effect);
}
