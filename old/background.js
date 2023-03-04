let connected = false;
while(!connected) {
    try {
    const ws = new WebSocket("ws://127.0.0.1:9797/watch");
    connected = true;

    ws.onopen = () => {
        console.log('Connected');
        ws.send("test");
    }
    
    ws.onmessage = (data) => {
        console.log(data);
    }

    } catch (e) {
        console.log(e);
    }    
}