<template>
    <div class="container">
        <div class="top-tip">
            <img src="../assets/images/head-logo.png" alt="">
            <span>编程导航</span>
        </div>
        <div class="middle-tip">做您编程路上的导航员</div>
        <div class="qrPicture">
            <el-image :src="qrUrl" fit="fit">
                <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                </div>
            </el-image>
        </div>
        <div class="wx-tip">
            <div v-show="!isShowScanSuccess">
                <p>使用微信扫一扫登录</p>
                <p>“编程导航”</p>
            </div>
            <div class="scan-success" v-show="isShowScanSuccess">
                <img src="../assets/images/success.png" alt="">
                <span>扫码成功~，点击“登录”继续登录</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Login",
    data() {
        return {
            websocket: null,
            qrUrl: "",
            qrCode: 0,
            isShowScanSuccess: false
        }
    },
    mounted() {
        this.$http.getLoginQrCode().then((res) => {
            if (res.code === 200) {
                this.qrUrl = res.data.qrUrl
                this.qrCode = res.data.qrCode
                this.initWebSocket(res.data.qrCode)
            }
        }).catch((err) => {
            this.$message.error("接口错误")
        })
    },
    destroyed() {
        this.websocket.close() //离开路由之后断开websocket连接
    },
    methods: {
        wxLogin() {

        },
        initWebSocket(qrCode) {
            const websocketUrl = `ws://127.0.0.1:8081/websocket/${qrCode}`;
            this.websocket = new WebSocket(websocketUrl);
            this.websocket.onmessage = this.webSocketOnMessage;
            this.websocket.onopen = this.webSocketOnOpen;
            this.websocket.onerror = this.webSocketOnError;
            this.websocket.onclose = this.webSocketClose;
        },
        webSocketOnOpen() { //连接建立之后执行send方法发送数据
            console.log('websocket建立链接');

        },
        webSocketOnError() {//连接建立失败重连
            this.initWebSocket(this.qrCode);
        },
        webSocketOnMessage(e) { //数据接收
            let dataJson = JSON.parse(e.data)
            switch (dataJson.type) {
                case 1:
                    console.log("收到扫码成功的消息")
                    this.isShowScanSuccess = true
                    break;
                case 2:
                    console.log("收到登录成功的消息")
                    this.$router.replace("/home")
                    break;
            }
        },
        webSocketSend(Data) {//数据发送
            this.websocket.send(Data);
        },
        webSocketClose(e) {  //关闭
            console.log('websocket断开连接', e);
        },
    },
}
</script>

<style scoped lang="less">
.container {
    width: 100%;
    height: 100%;
    background-image: url(https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png);

    .top-tip {
        padding-top: 80px;
        display: flex;
        align-items: center;
        margin: auto;
        width: 200px;

        img {
            width: 44px;
            height: 44px;
        }

        span {
            font-size: 33px;
            font-weight: 600;
            margin-left: 20px;
            color: rgb(24, 144, 255);
        }
    }

    .middle-tip {
        text-align: center;
        margin-top: 12px;
        margin-bottom: 10px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 14px;
    }

    .qrPicture {
        width: 280px;
        margin: auto;
    }

    .wx-tip {
        width: 260px;
        text-align: center;
        padding: 10px 15px;
        color: rgb(55, 55, 55);
        line-height: 1.6;
        margin: 20px auto;

        .scan-success {
            display: flex;
            align-items: center;
            justify-content: space-evenly;

            img {
                width: 25px;
                height: 25px;
            }
        }
    }
}

/deep/ .el-image {
    width: 100%;
    margin-top: 15px;
    border: 1px solid #e2e2e2;
}
</style>