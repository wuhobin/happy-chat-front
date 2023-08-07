<template>
    <aside class="side-toolbar">
        <el-avatar :size="50" :src="avatarUrl" @click.native="showLoginBox"></el-avatar>


        <el-dialog title="快登录一起玩耍吧~" :visible.sync="dialogFormVisible" width="500px">
            <el-form :model="form">
                <el-form-item label="手机号" :label-width="formLabelWidth">
                    <el-input v-model="form.mobile" autocomplete="off" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item label="验证码" :label-width="formLabelWidth">
                    <el-input class="bottom-input" v-model="form.code" autocomplete="off" placeholder="请输入验证码"></el-input>
                    <el-button class="send-code" type="primary">获取</el-button>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handelSure">登录</el-button>
            </div>
        </el-dialog>


    </aside>
</template>

<script>
export default {
    name: 'ToolBar',
    data() {
        return {
            avatarUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
            dialogFormVisible: false,
            form: {
                mobile: '',
                code: '',
            },
            formLabelWidth: '60px'
        }
    },
    methods: {
        showLoginBox() {
            this.dialogFormVisible = true
        },
        handelCancel() {
            this.dialogFormVisible = false
        },
        handelSure() {

        }
    }
}
</script>

<style lang="less" scoped>
.side-toolbar {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80px;
    padding: 20px 0;
    color: #fff;
    user-select: none;

    /deep/ .el-avatar {
        cursor: pointer;
    }

    /deep/ .el-dialog {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        border-radius: 10px;

        .bottom-input{
            width: 220px;
        }

        .send-code{
            width: 100px;
            margin-left: 20px;
        }
    }

    /deep/ .el-form {
        width: 400px;
        padding: -20px 0;
    }


  
}
</style>


<style>
    .el-dialog__title{
        font-size: 16px;
    }

    .el-dialog__body{
        padding: 15px 20px 15px 0;
    }

</style>