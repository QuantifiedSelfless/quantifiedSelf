var ws = new WebSocket("ws://iamadatapoint:8085/websocket");
 ws.onopen = function() {
        ws.send("Hello, world");
 };
ws.onmessage = function (evt) {
       alert(evt.data);
};
