var thrift = require('thrift');
var HBase = require('./gen-nodejs/THBaseService');
var HBaseTypes = require('./gen-nodejs/hbase_types');

var connection = thrift.createConnection('localhost', 9090, {
  transport: thrift.TFramedTransport,
  protocol: thrift.TBinaryProtocol
});

connection.on('connect', function () {
  console.log('connected');
  var client = thrift.createClient(HBase, connection);

  var objScanner = new HBaseTypes.TScan({startRow: 'TheRealMT',
    columns: [new HBaseTypes.TColumn({family: 'info'})]});
  client.openScanner('users', objScanner, function (err, scannerId) {
    if (err) {
      console.log(err);
      return;
    }
    console.log('scannerid : ' + scannerId);
    client.getScannerRows(scannerId, 10, function (serr, data) {
      if (serr) {
        console.log(serr);
        return;
      }
      console.log(data);
    });
    client.closeScanner(scannerId, function (err) {
      if (err) {
        console.log(err);
      }
    });
    connection.end();
  });
});

connection.on('error', function(err){
  console.log('error', err);
});