const schedule = require('node-schedule');

module.exports = {
    scheduleNotification : function(notificationMode){
        let notificationMedium  = getNotificationService(notificationMode) ;
        const rule = new schedule.RecurrenceRule();
        rule.dayOfWeek = [0, new schedule.Range(4, 6)];
        rule.hour = 17;
        rule.minute = 0;
        const job = schedule.scheduleJob(rule ,function(){
            notificationMedium.sendNotification() ;
        })

        return Promise.resolve({
            message : `Job scheduled`
        })
    }
} ;
 function getNotificationService(notificationMode) {

   if (notificationMode === 'Email') {
     return Email;
   } else if (notificationMode === 'Whatsapp') {
     return Whatsapp;
   } else {
     return Sms;
   }
 }