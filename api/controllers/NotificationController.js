/**
 * NotificationController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
let fs = require('fs');
module.exports = {
  
    scheduleNotifications : function(req,res){
        let notificationMode = req.param('notificationMode') ;
       
        ScheduleCron.scheduleNotification(notificationMode)
        .then(functionResponse=>{
            return res.json({
                message : "Notifications sent successfully"
            })
        })
        .catch(err=>{
            sails.log.debug("Error while schduling notification" ,err) ;
            return res.status(400).json({
                message : "An error occurred , Please try again later"
            })
        })
    } ,

    sendNotificationsManually : function(req,res){
        let notificationMode = req.param('notificationMode') ;
        getNotificationService(notificationMode).sendNotifications()
            .then(response=>{
                return res.json({message : "Notifications sent"}) ;
            })
            .catch(err=>{
                sails.log.debug("Error in sending logs",err);
                return res.status(400).json({
                    message : "An error occurred , Please try again later"
                })
            }) ;
    },

    resendNotifications : function(req , res){
        let batchCode = req.param('batchCode') ;

        if(!batchCode)
        return res.status(400).json({
            message : "No batch code sent"
        });

        let notificationLogs = [];
        fs.createReadStream('notificationLogs.csv')
          .pipe(csv())
          .on('data', (data) => notificationLogs.push(data))
          .on('end', () => {
             let notificationBluePrint = notificationLogs.find(log=>log.batchCode == batchCode) ;
             getNotificationService(notificationBluePrint.notificationMode).sendNotifications()
               .then(response => {
                 return res.json({
                   message: "Notifications sent"
                 });
               })
               .catch(err => {
                 sails.log.debug("Error in sending logs", err);
                 return res.status(400).json({
                   message: "An error occurred , Please try again later"
                 })
               });
          })

    }
};

function getNotificationService(notificationMode) {

  if (notificationMode === 'Email') {
    return Email;
  } else if (notificationMode === 'Whatsapp') {
    return Whatsapp;
  } else {
    return SMS;
  }
}


