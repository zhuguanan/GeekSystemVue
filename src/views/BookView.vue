<template>
  <div>
    <div style="margin-bottom: 15px;">
      <el-input v-model="params.name" style="width: 200px;" placeholder="请输入图书名称"></el-input>
      <el-input v-model="params.author" style="width: 200px; margin-left: 5px;" placeholder="请输入图书作者"></el-input>
      <el-button type="primary" style="margin-left: 10px;" @click="findBySerach()">查询</el-button>
      <el-button type="primary" style="margin-left: 10px;" @click="reset()">清空</el-button>
      <el-button type="primary" style="margin-left: 10px;" @click="add()">新增</el-button>
    </div>
    <div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="图书封面">
          <template v-slot="scope">
            <el-image style="width: 70px; height: 70px;border-radius: 50%;"
              :src="'http://localhost:8090/api/files/' + scope.row.img"
              :preview-src-list="['http://localhost:8090/api/files/' + scope.row.img]">
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="图书名称"></el-table-column>
        <el-table-column prop="author" label="图书作者"></el-table-column>
        <el-table-column prop="price" label="图书价格"></el-table-column>
        <el-table-column prop="press" label="图书出版社"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
            <el-button type="primary" @click="dowm(scope.row.img)">下载</el-button>
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
          <el-form-item label="图书名称" label-width="20%">
            <el-input v-model="form.name" autocomplete="off" style="width: 90%;"></el-input>
          </el-form-item>
          <el-form-item label="图书作者" label-width="20%">
            <el-input v-model="form.author" autocomplete="off" style="width: 90%;"></el-input>
          </el-form-item>
          <el-form-item label="图书价格" label-width="20%">
            <el-input v-model="form.price" autocomplete="off" style="width: 90%;"></el-input>
          </el-form-item>
          <el-form-item label="图书出版社" label-width="20%">
            <el-input v-model="form.press" autocomplete="off" style="width: 90%;"></el-input>
          </el-form-item>
          <el-form-item label="图书封面" label-width="20%">
            <el-upload ref="upload" action="http://localhost:8090/api/files/upload" :on-success="successUpload">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
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
  name: 'BookView',
  data() {
    return {
      params: {
        name: '',
        author: '',
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
      request.get("/book/findBookBySearch", { params: this.params }).then(res => {
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
        author: '',
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
      request.post("/book/saveBook", this.form).then(res => {
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
        this.doClear();
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
      request.delete("/book/deleteBook/" + id).then(res => {
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
    //文件上传成功后，要处理的事情
    successUpload(res){
      this.form.img = res.data;
    },
    //文件下载
    dowm(flag){
      location.href = 'http://localhost:8090/api/files/' + flag;
    },
    //文件上传完清空
    doClear () {
        this.$refs.upload.clearFiles()
    }

  }
}
</script>
