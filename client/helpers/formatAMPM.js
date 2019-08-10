const formatAMPM = date => {
  var hours = date[0] + date[1];
  var minutes = date[3] + date[4];
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
};

export default formatAMPM;
