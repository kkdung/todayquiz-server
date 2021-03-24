/*
moment 설정
*/
const moment = require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");
module.exports = moment;