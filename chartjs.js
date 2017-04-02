var ctx = document.getElementById("radarChart").getContext("2d");
var cty = document.getElementById("linearChart").getContext("2d");

Chart.defaults.global.tooltips.enabled = false;
Chart.defaults.global.legend.display = false;
Chart.defaults.global.elements.point.radius = 0;

var data = {
    labels: ["Happy", "Sad", "Angry", "Stressed"],
    datasets: [{
        backgroundColor: "rgba(179,181,198,0.2)",
        borderColor: "rgba(179,181,198,1)",
        data: [alpha, beta, gamma, theta],
    }, ]
};

var linearGraph = new Chart(cty, {
    type: "line",
    data: data,
    options: {
        backgroundColor: '#fff',
        animation: {
            duration: 500
        },
        scales: {
            yAxes: [{
                display: false,
            }],
            gridlines: {
              display: false,
            }
        },
        maintainAspectRatio: true,
        responsive: true,
    }
});

var radarChart = new Chart(ctx, {
    type: "radar",
    data: data,
    options: {
        backgroundColor: '#fff',
        animation: {
            duration: 500
        },
        maintainAspectRatio: true,
        responsive: true,
    }
});

$(function() {
    setInterval(function() {
        $.ajax({
                url: "http://deepsense.herokuapp.com/realtime",
                cache: false
            })
            .done(function(raw) {
                linearGraph.data.datasets[0].data = [raw.happy, raw.sad, raw.anger, raw.stress];
                linearGraph.update();
            });
    }, 1000)
});

$(function() {
    setInterval(function() {
        $.ajax({
                url: "http://deepsense.herokuapp.com/realtime",
                cache: false
            })
            .done(function(raw) {
                radarChart.data.datasets[0].data = [raw.happy, raw.sad, raw.anger, raw.stress];
                radarChart.update();
            });
    }, 1000)
});

ctx.width = parent.offsetWidth;
ctx.height = parent.offsetHeight;
cty.width = parent.offsetWidth;
cty.height = parent.offsetHeight;

var alpha = 0;
var beta = 0;
var gamma = 0;
var theta = 0;

//code for the head
var left_eye = document.querySelector('#left-eye');
var right_eye = document.querySelector('#right-eye');
var left_front_ball = document.querySelector('#left-front-ball');
var right_front_ball = document.querySelector('#right-front-ball');
var left_rear_ball = document.querySelector('#left-rear-ball');
var right_rear_ball = document.querySelector('#right-rear-ball');

//color change
$(function() {
    setInterval(function() {
        $.ajax({
                url: "http://deepsense.herokuapp.com/realtime",
                cache: false
            })
            .done(function(raw) {
                const eeg = raw.eeg;

                const red0 = eeg[0]/1682.815;
                const col0 = (red0 << 16) + 0x101040;
                left_rear_ball.setAttribute('material', 'color', col0);

                const red1 = eeg[1]/1682.815;
                const col1 = (red1 << 16) + 0x101040;
                left_front_ball.setAttribute('material', 'color', col1);

                const red2 = eeg[2]/1682.815;
                const col2 = (red2 << 16) + 0x101040;
                right_front_ball.setAttribute('material', 'color', col2);

                const red3 = eeg[3]/1682.815;
                const col3 = (red3 << 16) + 0x101040;
                right_rear_ball.setAttribute('material', 'color', col3);
            });
    }, 500)
});

//blink
$(function() {
    setInterval(function() {
        $.ajax({
                url: "http://deepsense.herokuapp.com/realtime",
                cache: false
            })
            .done(function(raw) {
                const opacity = raw.clench ? 0 : 1;
                left_eye.setAttribute('material', 'opacity', opacity);
                right_eye.setAttribute('material', 'opacity', opacity);
            });
    }, 200)
});
