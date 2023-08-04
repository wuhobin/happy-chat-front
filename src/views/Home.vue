<template>
    <main class="home">
        <div class="wrapper">

        </div>
        <footer class="footer">
            <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener">闽ICP备2023004110号</a>
        </footer>
    </main>
</template>

<script>
export default {
    name: "Home",
    data() {
        return {

        }
    }
}
</script>

<style scoped lang="less">
.home {
    width: 100%;
    height: 100%;

    .wrapper {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        width: 100vw;
        height: 100%;
        height: 100dvh;
        color: #fff;
        background-color: #272a37;
    }

    @media only screen and (min-width: 640px) {
        .wrapper {
            position: relative;
            flex-direction: row;
            width: 80vw;
            height: 80vh;
            margin: 0 auto;
            margin-top: 10vh;
            border-radius: 16px;
        }
    }

    .footer {
        margin-top: 7vh;
        font-size: 12px;
        color: #fff;
        text-align: center;
    }
}
</style>