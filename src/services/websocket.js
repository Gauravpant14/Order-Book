class WebSocketService {
    constructor() {
      this.ws = null;
      this.subscribers = [];
    }
  
    connect() {
      this.ws = new WebSocket('wss://api-pub.bitfinex.com/ws/2');
      this.ws.onopen = this.onOpen;
      this.ws.onmessage = this.onMessage.bind(this);
    }
  
    onOpen = () => {
      const msg = JSON.stringify({
        event: 'subscribe',
        channel: 'book',
        symbol: 'tBTCUSD'
      });
      this.ws.send(msg);
    };
  
    onMessage(event) {
      const data = JSON.parse(event.data);
      if (Array.isArray(data) && data[1] !== 'hb') {
        this.subscribers.forEach(callback => callback(data[1]));
      }
    }
  
    subscribe(callback) {
      this.subscribers.push(callback);
    }
  
    unsubscribe(callback) {
      this.subscribers = this.subscribers.filter(sub => sub !== callback);
    }
  
    close() {
      this.ws.close();
    }
  }
  
  const websocketService = new WebSocketService();
  export default websocketService;
  