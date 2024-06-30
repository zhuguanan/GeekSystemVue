<template>
  <div>
    <div style="margin-bottom: 15px;">
      <el-input v-model="params.name" style="width: 200px;" placeholder="请输分类名称"></el-input>
      <el-input v-model="params.description" style="width: 200px; margin-left: 5px;" placeholder="请输入分类描述"></el-input>
      <el-button type="primary" style="margin-left: 10px;" @click="findBySerach()">查询</el-button>
      <el-button type="primary" style="margin-left: 10px;" @click="reset()">清空</el-button>
      <el-button type="primary" style="margin-left: 10px;" @click="add()">新增</el-button>
      <el-popconfirm title="确定删除这些数据吗？" @confirm="delBatch()">
        <el-button slot="reference" style="margin-left: 5px" type="danger">批量删除</el-button>
      </el-popconfirm>
    </div>
    <div>
      <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="编号"></el-table-column>
        <el-table-column prop="name" label="分类名称"></el-table-column>
        <el-table-column prop="description" label="分类描述"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
            <el-popconfirm title="确定删除吗？" @confirm="del(scope.row.id)">
              <el-button slot="reference" style="margin-left: 5px" type="danger">删除</el-button>
            </el-popconfirm>
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
          <el-form-item label="分类名称" label-width="20%">
            <el-input v-model="form.name" autocomplete="off" style="width: 90%;"></el-input>
          </el-form-item>
          <el-form-item label="分类描述" label-width="20%">
            <el-input v-model="form.description" autocomplete="off" style="width: 90%;"></el-input>
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
  name: 'TypeView',
  data() {
    return {
      params: {
        name: '',
        description: '',
        pageNum: 1,
        pageSize: 10
      },
      tableData: [],
      total: 0,
      form: {},
      dialogFormVisible: false,
      multipleSelection: []
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
      request.get("/type/findTypeBySearch", { params: this.params }).then(res => {
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
        description: '',
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
      request.post("/type/saveType", this.form).then(res => {
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
    del(id) {
      request.delete("/type/deleteType/" + id).then(res => {
        if (res.code === '0') {
          this.$message({
            message: '删除成功',
            type: 'success'
          });
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
    //批量删除
    delBatch() {
      if (this.multipleSelection.length === 0) {
        this.$message.warning("请选择你要删除的数据！");
        return;
      }
      //调用后台接口
      request.put("/type/delBatch", this.multipleSelection).then(res => {
        if (res.code === '0') {
          this.$message.success('批量删除成功');
          this.findBySerach();
        } else {
          this.$message.error(res.msg);
        }
      })
    },
    //多选发生改变的时候触发
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
}
</script>
