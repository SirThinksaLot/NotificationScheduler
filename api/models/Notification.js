/**
 * Notification.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
let fs = require('fs');
let json2csv = require('json2csv');
module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },
   createPortalLogs : function(portalResponse,notificationMode){
    let newLine = '\r\n';
    let prunedDataOfPortalResponse = [] ;
    let fields = [BatchCode , ResponseCode , NotificationMode] ;
    portalResponse.forEach(log=>{
        let batchCode = generateRandomString(4) ;
        let prunedData = {
          BatchCode : batchCode,
          ResponseCode : log.statusCode ,
          NotificationMode : notificationMode
        } ;
        prunedDataOfPortalResponse.push(prunedData) ;     
    })
    let toCsv = {
      data: prunedDataOfPortalResponse,
      fields: fields,
      header: false,
    };
    fs.stat('notificationLogs.csv', function (err, stat) {
      if (err == null) {
        console.log('File exists');

        //write the actual data and end with newline
        let csv = json2csv(toCsv) + newLine;

        fs.appendFile('file.csv', csv, function (err) {
          if (err) throw err;
          console.log('The data was appended to file!');
          return Promise.resolve("Logs created") ;
        });
      } else {
        //write the headers and newline
        console.log('New file, just writing headers');
        fields = fields + newLine;

        fs.writeFile('file.csv', fields, function (err) {
          if (err) throw err;
          console.log('file saved');
          return Promise.resolve("Logs created") ;
        });
      }
    });
   }
};
function generateRandomString(length) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  //var date = new Date();
  return text + Math.floor((Math.random() * 999999), 100);
} 

