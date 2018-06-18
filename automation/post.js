const fs = require('fs');
const request = require('request');
 process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var formData = {
  custom_file: {
    value:  fs.createReadStream('./files/customers_all.csv'),
    options: {
      filename: 'customers_all.csv',
      contentType: 'text/comma-separated-values'
    }
  }
};
request.post({url:'https://abhay.aisplestore.com/import', formData: formData}, function optionalCallback(err, httpResponse, body) {
  if (err) {
    return console.error('upload failed:', err);
  }
  console.log('Upload successful!  Server responded with:', body);
});