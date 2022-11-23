const mqtt = require('mqtt')
const client  = mqtt.connect('mqtt://test.mosquitto.org')
const topics = require('./child_topics');

const childTopics = [
    'site/123/photovoltaic/skidControlUnits/01A/inverters/1/status',
  
    'site/123/photovoltaic/skidControlUnits/01A/inverters/2/status',
  
    'site/123/photovoltaic/skidControlUnits/01A/inverters/3/status',
  
    'site/123/photovoltaic/skidControlUnits/01A/inverters/4/status',
  
    'site/123/photovoltaic/skidControlUnits/01A/inverters/5/status',
  
    'site/123/photovoltaic/skidControlUnits/01A/inverters/6/status',
] 

client.on('connect', function () {
  client.subscribe('presence', function (err) {
    if (!err) {
        console.log('topics', topics)
      client.publish('presence', 'Hello mqtt')
    }
  })
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  client.end()
})