// a script for a nice waves effect for the front page of my portfolio
var effect_canvas = document.getElementById("main_page_background");
var ctx = effect_canvas.getContext("2d");
var waves = [];

var background_color = "#000000"

var frequency = 0;

var minAmplitude = 0;
var maxAmplitudeAdd = 0;
var maxAmplitude = 10;

var minSpeed = 0.005;
var maxSpeed = 0.1;

var current_drawing_session_id = 1;

var cursor_x = 0;
var cursor_y = 0;

var last_cursor_movement = 0;

var waves_spacing = 0;

function create_wave(y) {
    waves.push({
        y: y,
        phase: Math.random() * 100,
        speed: minSpeed,
        amplitude: minAmplitude
    });
}

function pythagore(a, b, hypoth) {
    let result;
    let ab = [a, b];
    if(hypoth === null) {
        return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
    } else if (a === null || b === null) {
        ab = ab[0] || ab[1];
        return Math.sqrt(Math.pow(hypoth, 2) - Math.pow(ab, 2));
    }
}

function get_time()
{
    return new Date().getTime();
}

function draw(drawing_session) {
    ctx.clearRect(0, 0, effect_canvas.width, effect_canvas.height);
    
    ctx.fillStyle = background_color;
    ctx.fillRect(0, 0, effect_canvas.width, effect_canvas.height);

    ctx.strokeStyle = "#ff6c6c45";

    let starting_x = 0;

    for (var i = 0; i < waves.length; i++) {
        var wave = waves[i];

        ctx.moveTo(0, 0);
        ctx.beginPath();

        let phase = wave.phase;

        for(var x = starting_x; x < effect_canvas.width; x++) {
            let distance = pythagore(Math.abs(x - cursor_x), Math.abs(wave.y - cursor_y), null);

            let amplitude_amplfier = Math.min(waves_spacing / distance, 3);
            let amplitude = (wave.amplitude + (maxAmplitudeAdd * amplitude_amplfier));
            
            let y = amplitude * Math.sin(frequency * x + phase);
            y += wave.y;
            ctx.lineTo(x, y);
        }

        let cursor_hover = Math.abs(cursor_y - wave.y) < waves_spacing / 2;
        
        if (cursor_hover)
        {
            wave.amplitude += 0.1;
            wave.speed -= 30 ** -3;

            wave.amplitude = Math.min(wave.amplitude, maxAmplitude);
            wave.speed = Math.max(wave.speed, -maxSpeed);
        }
        else if (wave.amplitude > minAmplitude)
        {
            wave.amplitude -= 0.1;
        }
        else if (wave.speed < minSpeed)
        {
            wave.speed += 30 ** -3;
        }
        else
        {
            wave.amplitude = minAmplitude;
            wave.speed = minSpeed;
        }

        ctx.stroke();
        ctx.closePath();

        starting_x -= 3;

        wave.phase -= wave.speed;
    }

    if(current_drawing_session_id == drawing_session)
    {
        setTimeout(function(){draw(drawing_session)}, 10)
    }
}

function create_effect()
{
    console.log("Creating effect at ", effect_canvas);

    effect_canvas.height = window.innerHeight;
    effect_canvas.width = window.innerWidth;

    if (window.innerWidth < 600)
    {
        waves_spacing = 100;
        frequency = 0.05;
        minAmplitude = 5;
        maxAmplitudeAdd = 10;
    }
    else
    {
        waves_spacing = 200;
        frequency = 0.03;
        minAmplitude = 7;
        maxAmplitudeAdd = 20;
    }

    waves = []

    for (var i = 30; i < effect_canvas.height; i += waves_spacing) {
        create_wave(i);
    }

    current_drawing_session_id++
    draw(current_drawing_session_id)
}

window.addEventListener("mousemove", function(e){
    // cursor relative to the canvas
    last_cursor_movement = get_time();

    cursor_x = e.clientX - effect_canvas.getBoundingClientRect().left;
    cursor_y = e.clientY - effect_canvas.getBoundingClientRect().top;
})

create_effect()
window.addEventListener("resize", create_effect)