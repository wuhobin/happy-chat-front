/**
 * 将WebSocket操作放入新的线程中操作，不干扰js主线程的操作
 * 在其它线程中会有一个全局函数postMessage，用于向主线程发送数据
 * 同时有一个全局对象self, self上的onmessage用于监听主线程发送来的数据
 */

/**
 * WebSocket实例
 * @type { WebSocket }
 */
let connection

/**
 * 心跳检测计时器的timer
 */
let heartTimer = null

/**
 * 是否在重连中
 */
let lockReconnect = false

/**
 * 重连的timer
 */
let timer = null

/**
 * 最大重连次数为100次
 */
const MAX_RECONNECT = 100

/**
 * 当前的重连次数
 */
let reconnectCount = 0

/**
 * 向socket发消息
 * @param {object} value
 */
function connectionSend(value) {
  connection?.send(JSON.stringify(value))
}

/**
 * 心跳检测
 */
function sendHeartPick() {
  // 每10s向服务端发送一次消息，检测连接是否正常
  heartTimer = setInterval(() => {
    // 这里要发什么消息用来检测与后端接收什么来判断是在心跳检测保持一致
    connectionSend({ type: 2 })
  }, 10000)
}

/**
 * 连接失败后就不再需要心跳检测，清除定时器
 */
function clearHeartPick() {
  if (heartTimer) {
    clearInterval(heartTimer)
    heartTimer = null
  }
}

/**
 * 收到服务端发来的json格式的消息
 * @param {MessageEvent} e
 */
function onConnectMsg(e) {
  // 发送消息给主线程，告知服务端发来消息了，主线程处理服务端发来的消息
  postMessage(JSON.stringify({ type: 'message', value: e.data }))
}

/**
 * 与服务端的连接成功后的回调函数
 */
function onConnectOpen() {
  // 连接成功了也告知一下
  postMessage(JSON.stringify({ type: 'open' }))
  // 连接成功后就要开始心跳检测，时刻判断socket连接是否断开
  sendHeartPick()
}

/**
 * 关闭连接或者连接失败时的处理函数
 */
function onCloseHandler() {
  // 首先关闭连接就不再需要心跳检测
  clearHeartPick()
  // 然后就是要开始重连
  if (lockReconnect) return
  // 标识重连中
  lockReconnect = true
  // 清除 timer，避免任务堆积。
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
  // 达到重连次数上限
  if (reconnectCount >= MAX_RECONNECT) {
    reconnectCount = 0
    return
  }
  // 断线重连，每2s重连一次
  timer = setTimeout(() => {
    initConnection()
    reconnectCount++
    // 标识已经开启重连任务
    lockReconnect = false
  }, 2000)
}

/**
 * 关闭连接的处理
 */
function onConnectClose() {
  onCloseHandler()
  postMessage(JSON.stringify({ type: 'close' }))
}

/**
 * 连接出错的处理
 */
function onConnectError() {
  onCloseHandler()
  postMessage(JSON.stringify({ type: 'error' }))
}

/**
 * 初始化socket连接
 */
function initConnection() {
  // 建立连接之前先清除一下事件监听，避免重复添加事件监听，导致一次事件处理多次
  connection?.removeEventListener('message', onConnectMsg)
  connection?.removeEventListener('open', onConnectOpen)
  connection?.removeEventListener('close', onConnectClose)
  connection?.removeEventListener('error', onConnectError)

  // 建立链接
  connection = new WebSocket('ws://127.0.0.1:8099')

  /**
   * 以下为监听服务端socket对客户端的操作
   */
  // 收到服务端的消息
  connection.addEventListener('message', onConnectMsg)
  // 服务端向客户端建立连接
  connection.addEventListener('open', onConnectOpen)
  // 服务端关闭了连接
  connection.addEventListener('close', onConnectClose)
  // 连接错误
  connection.addEventListener('error', onConnectError)
}

/**
 * 接收主线程发来的消息
 * @param {MessageEvent} e
 */
self.onmessage = (e) => {
  // 主线程发来的数据也得是json格式的数据，同样有type和value字段
  const { type, value } = JSON.parse(e.data)
  switch (type) {
    case 'initWS':
      // 如果是initWS就建立ws连接
      initConnection()
      console.log("初始化websocket连接",JSON.parse(e.data));
      break
    case 'message':
      /**
       * 如果是message表示主线程想通过socket发消息给服务端
       * 这里还要特殊判断，主线程通知建立socket连接了，但是连接还没建立好
       * 这个时候就不发消息
       */
      if (connection.readyState !== 1) return
      connectionSend(value)
      break
    default:
      break
  }
}
