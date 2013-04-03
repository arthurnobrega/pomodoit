// The model for the countdown timer
define(function() {
    var Timer = Backbone.Model.extend({
        defaults: {
            _interval: null,
            _secondsRemaining: 0,
            _status: 'stopped',
            alarmSound: 'alarm-clock.mp3',
            pomodoroMinutes: '25',
            breakMinutes: '5',
            longBreakMinutes: '15'
        },
        play: function(type) {
            switch (this.get('_status')) {
                case 'paused': this._countDown(null); return; break;
                case 'playing': return; break; // Do nothing
            }
            switch (type) {
                case 'break': this._countDown(this.get('breakMinutes')); break;
                case 'longbreak': this._countDown(this.get('longBreakMinutes')); break;
                default: this._countDown(this.get('pomodoroMinutes')); break;
            }
            this.set('_status', 'playing');
        },
        pause: function() {
            this.set('_status', 'paused');
            clearInterval(this.get('_interval'));
        },
        stop: function() {
            this.set('_status', 'stopped');
            this.set('_secondsRemaining', 0);
            this._updateClock();
            clearInterval(this.get('_interval'));
        },
        _playSound: function() {
            $("#dummy").html('<embed src="sounds/'+this.get('alarmSound')+'" hidden="true" autostart="true" loop="false" />');
        },
        _updateClock: function() {
            var el = $('#timer');
            var remaining = this.get('_secondsRemaining');
            var minutes = Math.floor( remaining / 60 );
            if (minutes < 10) minutes = "0" + minutes;
            var seconds = remaining % 60;
            if (seconds < 10) seconds = "0" + seconds;
            if (!$('#timer-backdrop').is(':visible')) {
                $('#timer-backdrop').fadeIn();
            }
            var text = minutes + ':' + seconds;
            el.html(text);
            // if the time is 0 then end the counter
            if(this.get('_secondsRemaining') == 0 && this.get('_status') != 'stopped') {
                this.set('_status', 'stopped');
                var el = $('#timer-message').html('O tempo acabou');
                $('#timer-backdrop').fadeOut();
                clearInterval(this.get('_interval'));
                this._playSound();
                return;
            }
            this.set('_secondsRemaining', remaining-1);
        },
        _countDown: function(minutes) {
            var model = this;
            clearInterval(this.get('_interval'));
            if (minutes != null) {
                this.set('_secondsRemaining', minutes * 60);
            }
            this._updateClock();
            this.set('_interval', setInterval(function() {
                model._updateClock();
            }, 1000));
        }
    });

    return Timer;
});