<template>
    <div>
        <el-container>
            <el-header style="background-color: #4c535a;">
                <img src="@/assets/logo.png" alt="" style="width: 40px; position: relative; top: 10px;">
                <span style="font-size: 20px; margin-left: 15px; color: white;">极客的项目</span>
                <el-dropdown style="float: right; height: 60px; line-height: 60px;">
                    <span class="el-dropdown-link" style="color: white; font-size: 16px;">
                        {{ user.name }}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>
                            <div @click="logout()">退出登录</div>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>
        </el-container>

        <el-container>
            <el-aside style="overflow: hidden; min-height:100vh; background-color: #545c64; width: 250px;">
                <el-menu :default-active="$route.path" router background-color="#545c64" text-color="#fff"
                    active-text-color="#ffd04b">
                    <el-menu-item index="/home">
                        <i class="el-icon-s-home"></i>
                        <span slot="title">系统首页</span>
                    </el-menu-item>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-document"></i>
                            <span>用户管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/admin">管理员信息</el-menu-item>
                            <el-menu-item index="2-2">用户信息</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-setting"></i>
                            <span>信息管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="3-1">xxx信息</el-menu-item>
                            <el-menu-item index="3-2">sss信息</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view />
            </el-main>
        </el-container>
    </div>
</template>

<script>
export default {
    name: "LayoutView",
    data() {
        return {
            user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
        }
    },
    methods: {
        logout() {
            //清楚本地存储的登录数据
            localStorage.removeItem("user");
            //跳转到登录页面
            this.$router.push('/login');
        }
    }
}
</script>

<style>
.el-menu {
    border-right: none !important;
}
</style>