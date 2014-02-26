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

  // Please run the command in shell first: put 'users', 'wwzyhao', 'info:gender', 'male'
  var tDelete = new HBaseTypes.TDelete({row: 'wwzyhao',
   columns: [new HBaseTypes.TColumn({family: 'info', qualifier: 'gender'})]});
  client.deleteSingle('users', tDelete, function (err) {
    if (err) {
      console.log(err);
      return;
    } else {
      console.log('delete success');
    }
    connection.end();
  });
});

connection.on('error', function(err){
  console.log('error', err);
});