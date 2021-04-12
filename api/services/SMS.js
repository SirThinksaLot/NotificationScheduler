const rp = require('request-promise');

module.exports = {
    sendNotifications : function(){
        return Users.getDataFromCsv
        .then(userArray=>{
            let notificationArray = [] ;
            userArray.forEach(user=>{
                let txt = ` Hi ${user.name}. You have got a new shopping order.`;
                let msg = encodeURIComponent(txt);
                let requestBody = {
                    
                      uri: 'http://smsportal.com/api/SendSMS?APIKEY=ABBAND&MobileNo=' + mobileNum + '&Message=' + msg,
                      method: "POST",
                      json: true,
                      headers: {
                        "content-type": "application/json"
                      },
                      resolveWithFullResponse: true
                    
                }
                notificationArray.push(rp(requestBody)) ;
                  
            }) ;
            return Promise.allSettled(notificationArray)
                .then(portalResponseArray=>{
                    Notification.createPortalLogs(portalResponseArray,'sms')
                        .then(notificationLogs=>{
                            sails.log.debug("Notification logs created") ;
                        })
                        .catch(err=>{
                            sails.log.debug("Error in creating notification logs") ;
                        })
                     return Promise.resolve(portalResponseArray) ;
                })
        })
        .catch(err=>{
            return Promise.reject(err) ;           
        })
    }
}