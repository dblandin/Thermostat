/*
Javascript Template
by Devon Blandin, May 2012
*/

var init = function() {

// code goes here
var thermostat = new Thermostat();
var state = "home";

var refreshScreen = function() {
	var date = thermostat.getDate().toDateString();
	var time = thermostat.getDate().commonTime() + thermostat.getDate().ampm();
	var timerStart = thermostat.getTimerStart().commonTime() + thermostat.getTimerStart().ampm();
	var timerStop = thermostat.getTimerStop().commonTime() + thermostat.getTimerStop().ampm();
	$('#timerStart span').text(timerStart);
	$('#timerStop span').text(timerStop);
	$('#timerTemp span').html(thermostat.getTimerTemp() + '<sup>&deg;F</sup>');
	$('#time').text(time);
	$('#temp span').html(thermostat.getTemp() + '<sup>&deg;F</sup>');
	$('#targetTemp span').html(thermostat.getTargetTemp() + '<sup>&deg;F</sup>');
	if (thermostat.isHeatOn() === true) { $('#heatOn').show(); } else { $('#heatOn').hide(); }
	if (thermostat.isCoolOn() === true) { $('#coolOn').show(); } else { $('#coolOn').hide(); }
	if (thermostat.isFanOn() === true) { $('#fanOn').show(); } else { $('#fanOn').hide(); }
	setTimeout(refreshScreen, 1000);
};
refreshScreen();


// setup event handlers

var checkState = function() {

};

$('#set').click(function() {
	console.log('click');
	window.blinkTime = null;
	switch (state) {
		case "home":
			state = "setTime";
			window.blinkTime = function() {
				$("#time").toggle();
				if (state === "setTime") {
					setTimeout(blinkTime, 500);
				} else {$('#time').hide();}
			};
			blinkTime();
			break;
		case "setTime":
			state = "setTimerStart";
			$('#temp, #targetTemp').hide();
			$('#timerStart, #timerStop, #timerTemp').show();
			window.blinkTime = function() {
				$("#timerStart span").toggle();
				if (state === "setTimerStart") {
					setTimeout(blinkTime, 500);
				} else {$('#timerStart span').show();}
			};
			blinkTime();
			break;
		case "setTimerStart":
			state = "setTimerStop";
			window.blinkTime = function() {
				$("#timerStop span").toggle();
				if (state === "setTimerStop") {
					setTimeout(blinkTime, 500);
				} else {$('#timerStop span').show();}
			};
			blinkTime();
			break;
		case "setTimerStop":
			state = "setTimerTemp";
			window.blinkTime = function() {
				$("#timerTemp span").toggle();
				if (state === "setTimerTemp") {
					setTimeout(blinkTime, 500);
				} else {$('#timerTemp span').show();}
			};
			blinkTime();
			break;
		case "setTimerTemp":
			state = "home";
			$('#temp, #targetTemp, #time').show();
			$('#timerStart, #timerStop, #timerTemp,').hide();
			break;
	}
});

$('#modeSelect').change(function() {
	thermostat.setMode($('#modeSelect input:checked').attr('id'));
});

$('#fanSelect').change(function() {
	thermostat.setFan($('#fanSelect input:checked').attr('id'));
});

var buttonUp = function() {
	switch (state) {
		case "home":
			var t = (thermostat.getTargetTemp());
			thermostat.setTemp(++t);
			break;
		case "setTime":
			var dt = thermostat.getDate();
			dt.adjust(0,0,0,0,1,0);
			thermostat.setDate(dt);
			break;
		case "setTimerStart":
			var timerStart = thermostat.getTimerStart();
			timerStart.adjust(0,0,0,0,1,0);
			thermostat.setTimerStart(timerStart);
			break;
		case "setTimerStop":
			var timerStop = thermostat.getDate();
			timerStop.adjust(0,0,0,0,1,0);
			thermostat.setTimerStop(timerStop);
			break;
		case "setTimerTemp":
			var timerTemp = (thermostat.getTimerTemp());
			thermostat.setTimerTemp(++timerTemp);
			break;
	}
	refreshScreen();
};
var buttonDown = function() {
	switch (state) {
		case "home":
			var t = (thermostat.getTargetTemp());
			thermostat.setTemp(--t);
			break;
		case "setTime":
			var dt = thermostat.getDate();
			dt.adjust(0,0,0,0,-1,0);
			thermostat.setDate(dt);
			break;
		case "setTimerStart":
			var timerStart = thermostat.getTimerStart();
			timerStart.adjust(0,0,0,0,-1,0);
			thermostat.setTimerStart(timerStart);
			break;
		case "setTimerStop":
			var timerStop = thermostat.getTimerStop();
			timerStop.adjust(0,0,0,0,-1,0);
			thermostat.setTimerStop(timerStop);
			break;
		case "setTimerTemp":
			var timerTemp = (thermostat.getTimerTemp());
			thermostat.setTimerTemp(--timerTemp);
			break;
	}
	refreshScreen();
};

$('#buttonUp').mousehold(buttonUp);

$('#buttonDown').mousehold(buttonDown);

// initial actions
$( "#fanSelect, #modeSelect" ).buttonset();
$( "#controlsRight span" ).button();
$('#coolOn, #heatOn, #fanOn, #timerStart, #timerStop, #timerTemp').hide();
thermostat.setFan($('#fanSelect input:checked').attr('id'));
thermostat.setMode($('#modeSelect input:checked').attr('id'));
console.log(thermostat.getMode());

};

$(init);