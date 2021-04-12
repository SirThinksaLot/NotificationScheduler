const csv = require('csv-parser') ;
const fs = require('fs') ;
module.exports = {

    /* CSV FORMAT 
        Name , Phone , Email
        Abc , 8520106824 ,abc@gmail.com
        Def, 7654321098 , def@gmail.com
    */

    getDataFromCsv : function(){
        let users = [] ;
        fs.createReadStream('users.csv')
          .pipe(csv())
          .on('data', (data) => users.push(data))
          .on('end', () => {
            return Promise.resolve(results) ;
            // [
            //   { Name: 'Abc', Phone: '8520106824','abc@gmail.com' },
            //   { Name: 'Def', Phone: '7654321098','def@gmail.com' }
            // ]
          })

    }
}