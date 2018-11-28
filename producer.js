var amqp = require('amqplib/callback_api');

exports.send = function(data,res){
    amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var ex = 'logs';
    var msg = JSON.stringify(data);
    
    ch.assertExchange(ex, 'fanout', {durable: false});
    ch.publish(ex, '', new Buffer.from(msg), res);
    
  });

  //setTimeout(function() { conn.close(); process.exit(0) }, 500);
});
}      
