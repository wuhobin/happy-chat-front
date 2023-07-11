<template>
    <el-menu default-active="1" class="el-menu-demo" mode="horizontal" @select="handleSelect" active-text-color="#1890ff" v-show="$route.meta.isShowNav">
        <div id="logo">
            <a><img src="../../assets/images/head-logo.png" alt="logo">
                <span>编程导航</span>
            </a>
        </div>
        <el-menu-item index="1" class="first-item">主页</el-menu-item>
        <el-menu-item index="2">学习</el-menu-item>
        <el-menu-item index="3">资源</el-menu-item>
        <el-menu-item index="4">问答</el-menu-item>
        <el-menu-item index="5">简历</el-menu-item>
        <el-menu-item index="6">面试题</el-menu-item>
        <el-menu-item index="7">会员</el-menu-item>
        <el-menu-item index="8">奖励</el-menu-item>
        <el-tooltip class="item" effect="dark"  content="登录想用更多功能" placement="bottom-start">
            <el-avatar size="small" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" @click.native="goToLogin"></el-avatar>
        </el-tooltip>
    </el-menu>
</template>

<script>
export default {
    name: 'HeaderNav',
    data() {
        return {
            
        }
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath)
        },
        goToLogin(){
            this.$router.push("/user/login")
        }
    }
}
</script>

<style scoped lang="less">
:deep.el-menu {
    width: 100%;

    box-shadow: 0 -1px 2px #000;
    position: relative;

    .first-item{
        margin-left: 200px;
    }
}

/deep/ .el-menu-item {
    color: rgba(0, 0, 0, .85);
    padding: 0;
    margin-left: 20px;
    margin-right: 20px;
}

/deep/ .el-avatar {
    position: absolute;
    right: 20px;
    top: 0;
    bottom: 0;
    margin: auto;
    cursor: pointer;
}


#logo {
    width: 150px;
    height: 100%;
    left: 20px;
    position: absolute;
    display: flex;
    align-items: center;

    a {
        line-height: 32px;
        display: flex;

        img {
            width: 32px;
            height: 32px;
        }

        span {
            font-size: 18px;
            margin-left: 12px;
        }
    }
}
</style>