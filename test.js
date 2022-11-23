const mqtt = require('mqtt')
const client  = mqtt.connect('mqtt://test.mosquitto.org')

const childTopics = [
    'site/123/photovoltaic/skidControlUnits/01A/inverters/1/status',
    'site/123/photovoltaic/skidControlUnits/01A/inverters/2/status',
    'site/123/photovoltaic/skidControlUnits/01A/inverters/3/status',
    'site/123/photovoltaic/skidControlUnits/01A/inverters/4/status',
    'site/123/photovoltaic/skidControlUnits/01A/inverters/5/status',
    'site/123/photovoltaic/skidControlUnits/01A/inverters/6/status',
] 

const parentTopic = 'site/123/photovoltaic/skidControlUnits/01A/status'


client.on('connect', function () {  
    client.subscribe(parentTopic)
    client.publish('site/123/photovoltaic/skidControlUnits/01A/inverters/1/status', '0')
    client.publish('site/123/photovoltaic/skidControlUnits/01A/inverters/2/status', '0')
    client.publish('site/123/photovoltaic/skidControlUnits/01A/inverters/3/status', '0')

    client.publish('site/123/photovoltaic/skidControlUnits/01A/inverters/4/status', '1')
    client.publish('site/123/photovoltaic/skidControlUnits/01A/inverters/5/status', '1')
    client.publish('site/123/photovoltaic/skidControlUnits/01A/inverters/6/status', '1')

    client.publish('site/123/photovoltaic/skidControlUnits/01A/inverters/2/status', '1')
    client.publish('site/123/photovoltaic/skidControlUnits/01A/inverters/3/status', '1')

    client.publish('site/123/photovoltaic/skidControlUnits/01A/inverters/1/status', '1')
    // green
    client.publish('site/123/photovoltaic/skidControlUnits/01A/inverters/1/status', '0')
    // not green
    client.publish('site/123/photovoltaic/skidControlUnits/01A/inverters/1/status', '1')
    // green

    childTopics.forEach((childTopic) => {    
        client.publish(childTopic, '0')
    })
    
    childTopics.forEach((childTopic) => {    
        client.publish(childTopic, '1')
     })
})

client.on('message', function (topic, message) {
    // should receive 3 messages with 1
    if (message.toString() == 1){
        console.log('Test has received message from topic ', topic, ' with message: ', message.toString())
    }
})