<template>
    <div>
        我是登录页面
        <button @click="wxLogin">点我微信登录</button>
    </div>
</template>

<script>
export default {
    name: "Login",
    data() {
        return {
            websocket: null,
        }
    },
    created() {
        this.initWebSocket();
    },
    destroyed() {
        this.websocket.close() //离开路由之后断开websocket连接
    },
    methods: {
        wxLogin() {

        },
        initWebSocket() {
            const websocketUrl = "ws://127.0.0.1:8081/websocket";
            this.websocket = new WebSocket(websocketUrl);
            this.websocket.onmessage = this.webSocketOnMessage;
            this.websocket.onopen = this.webSocketOnOpen;
            this.websocket.onerror = this.webSocketOnError;
            this.websocket.onclose = this.webSocketClose;
        },
        webSocketOnOpen() { //连接建立之后执行send方法发送数据

        },
        webSocketOnError() {//连接建立失败重连
            this.initWebSocket();
        },
        webSocketOnMessage(e) { //数据接收

        },
        webSocketSend(Data) {//数据发送
            this.websocket.send(Data);
        },
        webSocketClose(e) {  //关闭
            console.log('断开连接', e);
        },
    },
}
</script>

<style>

</style>