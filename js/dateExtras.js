// Extra methods for the Date object
//
// Written by Craig Miller
// May 2012
//
// Additional date methods:
//
// commonTime() --> produces a string displaying 12-hour time (e.g. '12:01')
//    Usage example:
//          myTime = Date.now();
//          myTime.commonTime()
//
// ampm() --> produces 'am' or 'pm' depending on the object's time
//    Usage example
//          myTime = Date.now();
//          myTime.ampm()
//

Date.prototype.commonTime = function()
{
  var timeString;

  timeString = "";

  if (this.getHours() > 12) {
    timeString += (this.getHours() - 12);
  }
  else if (this.getHours() === 0) {
    timeString += "12";
  }
  else {
    timeString += this.getHours();
  }

  timeString += ":";

  if (this.getMinutes() < 10) {
    timeString += "0";
  }

  timeString += this.getMinutes();
  return timeString;
};

Date.prototype.ampm = function()
{
  return this.getHours() < 12 ? "AM" : "PM";
};

// Source: http://tetlaw.id.au/view/blog/dateprototypeadjust/

Date.prototype.adjust = function(yr,mn,dy,hr,mi,se) {
  var m,t;
  this.setYear(this.getFullYear() + yr);
  m = this.getMonth() + mn;
  if(m !== 0) this.setYear(this.getFullYear() + Math.floor(m/12));
  if(m < 0) {
    this.setMonth(12 + (m%12));
  } else if (m > 0) {
    this.setMonth(m%12);
  }
  t = this.getTime();
  t += (dy * 86400000);
  t += (hr * 3600000);
  t += (mi * 60000);
  t += (se * 1000);
  this.setTime(t);
};