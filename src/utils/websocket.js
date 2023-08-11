const worker = new Worker('/worker.js')

class WS {
  constructor() {
    worker.postMessage(JSON.stringify({ type: 'initWS' }))
  }

  on(callback) {
    worker.addEventListener('message', callback)
  }

  off(callback) {
    worker.removeEventListener('message', callback)
  }
   /**
   * 向服务端发送消息
   * @param {{ type: string, value: object }} data
   */
   send(data) {
    worker.postMessage(JSON.stringify({
      type: 'message',
      value: data
    }))
  }
}

export default new WS()
