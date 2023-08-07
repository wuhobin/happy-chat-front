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
}

export default new WS()
