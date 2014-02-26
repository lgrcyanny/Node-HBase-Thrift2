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

  var tPut = new HBaseTypes.TPut({row: 'wwzyhao',
    columnValues: [
    new HBaseTypes.TColumnValue({family: 'info', qualifier: 'hobbies', value: 'music'}),
    new HBaseTypes.TColumnValue({family: 'info', qualifier: 'name', value: 'Thomas Zhang'})
    ]});
  client.put('users', tPut, function (err) {
    if (err) {
      console.log(err);
      return;
    }
    console.log('success');
    connection.end();
  });
});

connection.on('error', function(err){
  console.log('error', err);
});

