// MQTT broker settings
const broker = 'wss://broker.emqx.io:8084/mqtt';
const clientId = 'web_client_' + Math.random().toString(16).substr(2, 8);
const topicCurrentRainfall = 'curah_hujan/rainfall';
const topicYesterdayRainfall = 'curah_hujan/yesterday';

// Create an MQTT client
const client = mqtt.connect(broker, { clientId: clientId });

client.on('connect', () => {
    console.log('Connected to MQTT broker');
    client.subscribe(topicCurrentRainfall);
    client.subscribe(topicYesterdayRainfall);
});

client.on('message', (topic, message) => {
    const data = message.toString();
    if (topic === topicCurrentRainfall) {
        document.getElementById('currentRainfall').innerText = `Current Rainfall: ${data} mm`;
    } else if (topic === topicYesterdayRainfall) {
        document.getElementById('yesterdayRainfall').innerText = `Yesterday's Rainfall: ${data} mm`;
    }
});

client.on('error', (error) => {
    console.error('MQTT Connection Error: ', error);
});
