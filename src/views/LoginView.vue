<template>
  <div>
    <div
      style="width: 400px; height: 350px; margin: 150px auto; background-color: rgb(107,149,224,0.5); border-radius: 10px;">
      <div style="width: 100%; height: 100px; font-size: 30px; line-height: 100px; text-align: center; color: #4a5ed0;">
        欢迎登录</div>
      <div style="margin-top: 25px; text-align: center; height: 320px;">
        <el-form :model="admin">
          <el-form-item>
            <el-input v-model="admin.name" prefix-icon="el-icon-user" style="width: 80%;"
              placeholder="请输入用户名"></el-input>
          </el-form-item>

          <el-form-item>
            <el-input v-model="admin.password" show-password prefix-icon="el-icon-lock" style="width: 80%;"
              placeholder="请输入密码"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button style="width: 80%; margin-top: 10px;" type="primary" @click="login()">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>

</template>

<script>
import request from '@/utils/request';

export default {
  name: 'LoginView',
  data() {
    return {
      admin: {}
    }
  },
  // 页面加载的时候，做一些事情，在created里面
  created() {

  },
  // 定义一些页面上控件触发的事件调用的方法
  methods: {
    login() {
      request.post("/admin/login", this.admin).then(res => {
        if (res.code === '0') {
          this.$message({
            message: '登录成功',
            type: 'success'
          });
          localStorage.setItem("user", JSON.stringify(res.data));
          //页面跳转（跳转到首页）
          this.$router.push("/home")
        } else {
          this.$message({
            message: res.msg,
            type: 'error'
          });
        }
      })
    }
  }
}
</script>
