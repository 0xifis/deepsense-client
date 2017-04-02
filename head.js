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
                const red0 = eeg[0]*0xff;
                console.log("red: " + red0)

                const col0 = (red0 << 16) + 0x101040;
                console.log(col0)
                left_rear_ball.setAttribute('material', 'color', col0);
                const red1 = eeg[1]*0xff;
                const col1 = (red1 << 16) + 0x101040;
                left_front_ball.setAttribute('material', 'color', col1);
                const red2 = eeg[2]*0xff;
                const col2 = (red2 << 16) + 0x101040;
                right_front_ball.setAttribute('material', 'color', col2);
                const red3 = eeg[3]*0xff;
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
