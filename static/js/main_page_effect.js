// Notebook-ruled hero background for the homepage
var effect_canvas = document.getElementById("main_page_background");
if (!effect_canvas) {
  // Canvas not on this page
} else {
var ctx = effect_canvas.getContext("2d");

var background_color = "#000000";
var rule_color = "rgba(224, 224, 224, 0.12)";
var rule_active_color = "rgba(255, 108, 108, 0.35)";
var margin_color = "rgba(255, 108, 108, 0.55)";
var hole_fill = "rgba(224, 224, 224, 0.08)";
var hole_ring = "rgba(224, 224, 224, 0.18)";

var current_drawing_session_id = 1;
var raf_id = 0;
var is_visible = true;
var is_page_visible = !document.hidden;

var cursor_x = -9999;
var cursor_y = -9999;
var css_width = 0;
var css_height = 0;

var line_spacing = 36;
var margin_x = 72;
var hole_radius = 7;
var max_bend = 10;
var influence_radius = 140;

function draw_binding_holes() {
  var start_y = line_spacing * 1.2;
  for (var y = start_y; y < css_height; y += line_spacing * 2.5) {
    var hx = margin_x * 0.38;
    ctx.beginPath();
    ctx.arc(hx, y, hole_radius, 0, Math.PI * 2);
    ctx.fillStyle = hole_fill;
    ctx.fill();
    ctx.strokeStyle = hole_ring;
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}

function draw_margin() {
  ctx.beginPath();
  ctx.moveTo(margin_x, 0);
  ctx.lineTo(margin_x, css_height);
  ctx.strokeStyle = margin_color;
  ctx.lineWidth = 1.5;
  ctx.stroke();
}

function draw_rules() {
  var top = line_spacing;
  for (var y = top; y < css_height; y += line_spacing) {
    var dist = Math.abs(y - cursor_y);
    var influence = Math.max(0, 1 - dist / influence_radius);
    var bend = max_bend * influence * influence;

    ctx.beginPath();
    ctx.moveTo(0, y);

    // Sample the ruled line; near the cursor it bows like soft paper
    var step = 8;
    for (var x = 0; x <= css_width; x += step) {
      var dx = x - cursor_x;
      var local = Math.exp(-(dx * dx) / (2 * (influence_radius * 0.55) * (influence_radius * 0.55)));
      var yy = y + bend * local * (cursor_y < y ? 1 : -1) * 0.35 + bend * local;
      ctx.lineTo(x, yy);
    }

    ctx.strokeStyle = influence > 0.08 ? rule_active_color : rule_color;
    ctx.lineWidth = influence > 0.2 ? 1.25 : 1;
    ctx.stroke();
  }
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
  ctx.fillRect(0, 0, css_width, css_height);

  draw_rules();
  draw_margin();
  draw_binding_holes();

  raf_id = requestAnimationFrame(function () {
    draw(drawing_session);
  });
}

function resize_canvas() {
  var dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  css_width = window.innerWidth;
  css_height = window.innerHeight;

  effect_canvas.style.width = css_width + "px";
  effect_canvas.style.height = css_height + "px";
  effect_canvas.width = Math.floor(css_width * dpr);
  effect_canvas.height = Math.floor(css_height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function create_effect() {
  resize_canvas();

  if (window.innerWidth < 600) {
    line_spacing = 30;
    margin_x = 48;
    hole_radius = 5;
    max_bend = 7;
    influence_radius = 100;
  } else {
    line_spacing = 36;
    margin_x = 72;
    hole_radius = 7;
    max_bend = 10;
    influence_radius = 140;
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

window.addEventListener("mouseleave", function () {
  cursor_x = -9999;
  cursor_y = -9999;
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
