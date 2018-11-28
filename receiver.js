var amqp = require('amqplib/callback_api');
const mongoose = require('mongoose');
const UserModel = require('./user')


  amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var ex = 'logs';

    ch.assertExchange(ex, 'fanout', {durable: false});

    ch.assertQueue('', {exclusive: true}, function(err, q) {
      //console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
      ch.bindQueue(q.queue, ex, '');

      ch.consume(q.queue, function(msg, res) {
        if(msg.content) {
          console.log(" Received %s", msg.content);

          let userObj = new UserModel(JSON.parse(msg.content))
          
    
          userObj.save(userObj).then( user => { console.log(user)}).catch(err => {console.log(err)})
          
          
        }
      }, {noAck: true});
    });
  });
});
