Thermostat = function() {

// declare variables
var temp, dateTime, timers, targetTemp, state, mode, fan, heatOn, CoolOn, fanOn, t, timerStart, timerStop, timerTemp;



// set default values
temp = targetTemp = 68.00;
dateTime = new Date();
fan = "auto";
state = mode = "off";
heatOn = coolOn = fanOn = false;
status = "Program Running";

timerStart = new Date();
timerStop = new Date();
timerTemp = 68.00;

var determineState = function() {
	console.log("Determine State");
	heatOn = coolOn = fanOn = false;
	switch(mode) {
		case "heat":
			console.log("Determine State: Heat Mode Detected");
			if (dateTime > timerStart && dateTime < timerStop) {
				if (timerTemp > temp) { state = "heat"; } else { state = "off"; }
			} else if (targetTemp > temp) { state = "heat"; } else { state = "off"; }
			break;
		case "cool":
			console.log("Determine State: Cool Mode Detected");
			if (dateTime > timerStart && dateTime < timerStop) {
				if (timerTemp < temp) { state = "cool"; } else { state = "off"; }
			} else if (targetTemp < temp) { state = "cool"; } else { state = "off"; }
			break;
		default:
			state = "off";
	}
	if (fan === "on") {
		fanOn = true;
	}
	determineAction();
};

var determineAction = function dAction() {
	switch(state) {
		case "heat":
			if (targetTemp > temp) { temp += 0.01; heatOn = true; }
			else { 
				state = "off"; 
				heatOn = false;
				if (fan !== "auto") {
					fanOn = false;
				}
			}
			console.log(temp);
			break;
		case "cool":
			if (targetTemp < temp) { temp -= 0.01; coolOn = true;}
			else { 
				state = "off"; 
				coolOn = false;
				if (fan !== "auto") {
					fanOn = false;
				}
			}
			break;
	}
	if (state !== "off" && fan === "auto") {
		fanOn = true;
	}
	setTimeout(dAction, 1000);
};
// accessors
Thermostat.prototype.getTemp = function () { return Math.floor(temp); };
Thermostat.prototype.getTargetTemp = function () { return Math.floor(targetTemp); };
Thermostat.prototype.getTime = function () { return dateTime; };
Thermostat.prototype.getDate = function () { return dateTime; };
Thermostat.prototype.getTimerStart = function () { return timerStart; };
Thermostat.prototype.getTimerStop = function () { return timerStop; };
Thermostat.prototype.getTimerTemp = function () { return timerTemp; };
Thermostat.prototype.getMode = function () { return mode; };
Thermostat.prototype.isHeatOn = function () { return heatOn; };
Thermostat.prototype.isCoolOn = function () { return coolOn; };
Thermostat.prototype.isFanOn = function () { return fanOn; };

// setters
Thermostat.prototype.setTemp = function (n) { 
	targetTemp = +n;
	determineState();
};
Thermostat.prototype.setTimerTemp = function (n) { 
	timerTemp = +n;
};
Thermostat.prototype.setDate = function (d) { dateTime = d; };
Thermostat.prototype.setTimerStart = function (d) { timerStart = d; };
Thermostat.prototype.setTimerStop = function (d) { timerStop = d; };
Thermostat.prototype.addTimer = function (t) {  };
Thermostat.prototype.setMode = function (m) { 
	mode = m;
	determineState();
};
Thermostat.prototype.setFan = function (f) { 
	fan = f;
	determineState();
};

};