<template>
  <div>
    <div style="margin-bottom: 15px;">
      <el-input v-model="params.name" style="width: 200px;" placeholder="请输入姓名"></el-input>
      <el-input v-model="params.phone" style="width: 200px; margin-left: 5px;" placeholder="请输入电话"></el-input>
      <el-button type="primary" style="margin-left: 10px;" @click="findBySerach()">查询</el-button>
      <el-button type="primary" style="margin-left: 10px;" @click="reset()">清空</el-button>
      <el-button type="primary" style="margin-left: 10px;" @click="add()">新增</el-button>
    </div>
    <div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="编号"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="sex" label="性别"></el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
        <el-table-column prop="phone" label="手机号"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
            <el-button type="danger" @click="del(scope.row)">删除</el-button>
          </template>

        </el-table-column>
      </el-table>
    </div>
    <div style="margin-top: 10px;">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="params.pageNum" :page-sizes="[10, 20, 30, 40]" :page-size="params.pageSize"
        layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <div>
      <el-dialog title="请填写信息" :visible.sync="dialogFormVisible" width="30%">
        <el-form :model="form">
          <el-form-item label="姓名" label-width="15%">
            <el-input v-model="form.name" autocomplete="off" style="width: 90%;"></el-input>
          </el-form-item>
          <el-form-item label="性别" label-width="15%">
            <el-radio v-model="form.sex" label="男">男</el-radio>
            <el-radio v-model="form.sex" label="女">女</el-radio>
          </el-form-item>
          <el-form-item label="年龄" label-width="15%">
            <el-input v-model="form.age" autocomplete="off" style="width: 90%;"></el-input>
          </el-form-item>
          <el-form-item label="电话" label-width="15%">
            <el-input v-model="form.phone" autocomplete="off" style="width: 90%;"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submit()">确 定</el-button>
        </div>
      </el-dialog>
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
      total: 0,
      form: {},
      dialogFormVisible: false
    }
  },
  // 页面加载的时候，做一些事情，在created里面
  created() {
    this.findBySerach();
  },
  // 定义一些页面上控件触发的事件调用的方法
  methods: {
    //分页查询
    findBySerach() {
      request.get("/admin/findAdminBySearch", { params: this.params }).then(res => {
        if (res.code === '0') {
          this.tableData = res.data.list;
          this.total = res.data.total;
        } else {
          this.$message({
            message: res.msg,
            type: 'error'
          });
        }
      })
    },
    //重置输入框信息
    reset() {
      this.params = {
        name: '',
        phone: '',
        pageNum: 1,
        pageSize: 10
      }
      this.findBySerach()
    },
    //分页组件，每页条数查询
    handleSizeChange(pageSize) {
      this.params.pageSize = pageSize;
      this.findBySerach();
    },
    //分页组件，当前页查询
    handleCurrentChange(pageNum) {
      this.params.pageNum = pageNum;
      this.findBySerach();
    },
    //新增
    add() {
      this.form = {};
      this.dialogFormVisible = true;
    },
    //新增提交
    submit() {
      request.post("/admin/saveAdmin", this.form).then(res => {
        if (res.code === '0') {
          this.$message({
            message: '操作成功',
            type: 'success'
          });
          //提交成功后，模态框关闭
          this.dialogFormVisible = false;
          //分页查询
          this.findBySerach();
        } else {
          this.$message({
            message: res.msg,
            type: 'error'
          });
        }
      })
    },
    // 编辑
    edit(obj) {
      //将编辑选中那一行数据赋值给页面渲染出来
      this.form = obj;
      this.dialogFormVisible = true;
    },
    // 删除
    del() {

    }
  }
}
</script>
