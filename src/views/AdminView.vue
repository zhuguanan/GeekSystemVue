<template>
  <div>
    <div style="margin-bottom: 15px;">
      <el-input v-model="params.name" style="width: 200px;" placeholder="请输入姓名"></el-input>
      <el-input v-model="params.phone" style="width: 200px; margin-left: 5px;" placeholder="请输入电话"></el-input>
      <el-button type="primary" style="margin-left: 10px;" @click="findBySerach()">查询</el-button>
      <el-button type="primary" style="margin-left: 10px;" @click="reset()">清空</el-button>
      <el-button type="primary" style="margin-left: 10px;">新增</el-button>
    </div>
    <div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="编号"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="sex" label="性别"></el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
        <el-table-column prop="phone" label="手机号"></el-table-column>
        <el-table-column label="操作">
          <el-button type="primary">编辑</el-button>
          <el-button type="danger">删除</el-button>
        </el-table-column>
      </el-table>
    </div>
    <div style="margin-top: 10px;">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="params.pageNum" :page-sizes="[10, 20, 30, 40]" :page-size="params.pageSize"
        layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>

</template>

<script>
import request from '@/utils/request';

export default {
  data() {
    return {
      params: {
        name: '',
        phone: '',
        pageNum: 1,
        pageSize: 10
      },
      tableData: [],
      total: 0
    }
  },
  // 页面加载的时候，做一些事情，在created里面
  created() {
    this.load();
  },
  // 定义一些页面上控件触发的事件调用的方法
  methods: {
    load() {
      request.get("/admin/getAdminList").then(res => {
        if (res.code === '0') {
          this.tableData = res.data;
        } else {

        }
      })
    },
    findBySerach() {
      request.get("/admin/findAdminBySearch", { params: this.params }).then(res => {
        if (res.code === '0') {
          this.tableData = res.data;
        } else {

        }
      })
    },
    reset() {
      this.params = {
        name: '',
        phone: ''
      }
      this.findBySerach()
    },
    handleSizeChange() {

    },
    handleCurrentChange() {

    }
  }
}
</script>
