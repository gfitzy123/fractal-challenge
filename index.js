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
const inverterStatus = {}
let inverterMaxGreenCount = 0

client.on('connect', function () {
    client.subscribe(childTopics)

    childTopics.forEach((childTopic) => {    
        inverterStatus[childTopic] = 1
        inverterMaxGreenCount++
   })
})

client.on('message', function (topic, message) {
    console.log('Received message from topic: ', topic, 'with message:', message.toString())
    const topicMessage = message.toString()

    if (topicMessage == 0){
        delete inverterStatus[topic]
    } else if (topicMessage == 1){
        inverterStatus[topic] = 1
    }

    const currentInvertersGreen = Object.keys(inverterStatus).length
    const allInvertersGreen = currentInvertersGreen === inverterMaxGreenCount

    if (allInvertersGreen){
        console.log('Inverters all green.')
        client.publish(parentTopic, '1')
    } else {
        console.log('Number of green inverters', Object.keys(inverterStatus).length)
        client.publish(parentTopic, '0')
    }
        
})
