<template>
  <div class="box-1200">
    <div class="categoryList fn-clear">
      <ul>
        <li v-if="$store.state.role==='admin'">
          <div class="nophoto" @click="dialogFormVisible = true"><img src="./add.jpg" alt=""></div>
        </li>
        <li v-if="movies.length===0">
          <div class="nophoto"><img src="./zanwu.jpg" alt=""></div>
        </li>
        <li v-for="item in movies">
            <div class="category-img">
              <v-imageView :imgArr="item.url"></v-imageView>
            </div>
            <div class="category-msg">
              <div class="category-title">{{item.name}}</div>
              <div class="category-date">{{moment(item.createAt).format('YYYY-MM-DD')}}</div>
            </div>
        </li>
      </ul>
    </div>
    <el-dialog title="添加图片" :visible.sync="dialogFormVisible" :before-close="handleClose">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px">
        <el-form-item label="图片标题：" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="图片路径：" prop="url">
          <el-input v-model="ruleForm.url"></el-input>
        </el-form-item>
        <el-form-item label="所属一级目录：" prop="directory">
          <el-select v-model="ruleForm.directory" placeholder="请选择所属一级目录" disabled>
            <el-option v-for="item in $store.state.directories" :key="item._id" :label="item.name" :value="item._id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属二级目录：" prop="category">
          <el-select v-model="ruleForm.category" placeholder="请选择所属二级目录" disabled>
            <el-option v-for="item in $store.state.categories" :key="item._id" :label="item.name" :value="item._id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('ruleForm')">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import imageView from '@/components/imageView/';

const ERR_OK = 0;
export default {
  data() {
      return {
        dialogFormVisible: false,
        ruleForm: {
          name: '',
          url: '',
          directory: this.$store.state.directoryId,
          category: this.$store.state.categoryId
        },
        rules: {
          name: [{
            required: true,
            message: '请填写图片标题',
            trigger: 'blur'
          }],
          url: [{
            required: true,
            message: '请填写图片路径',
            trigger: 'blur'
          }],
          directory: [{
            required: true,
            message: '请选择一级目录',
            trigger: 'change'
          }],
          category: [{
            required: true,
            message: '请选择二级目录',
            trigger: 'change'
          }]
        }
      }
    },
    beforeUpdate() {
      this.ruleForm.directory = this.$store.state.directoryId;
      this.ruleForm.category = this.$store.state.categoryId;
    },
    computed: {
      movies() {
        return this.$store.state.movies;
      }
    },
    methods: {
      handleClose(done) {
        this.$refs['ruleForm'].resetFields();
        done();
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post('/api/admin/movie', JSON.stringify(this.ruleForm)).then((res) => {
              res = res.body;
              if (res.errno === ERR_OK) {
                this.$refs[formName].resetFields();
                this.dialogFormVisible = false;
                this.$store.dispatch('fetchMovies');
              }
            })
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.dialogFormVisible = false;
      }
    },
    components: {
      'v-imageView': imageView
    }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.categoryList {
  width: 100%;
  overflow: hidden;
}

.categoryList ul {
  width: 105%;
}

.categoryList ul li {
  float: left;
  display: inline-block;
  margin-top: 15px;
  margin-right: 21px;
  width: 282px;
  height: 211px;
  border: 1px solid #dddddd;
  position: relative;
  background: #fafafa;
}

.nophoto {
  width: 257px;
  height: 189px;
  border: 1px dashed #d2d2d2;
  margin: auto;
  margin-top: 10px;
  cursor: pointer;
}

.nophoto img {
  width: 257px;
  height: 189px;
}

.category-img img {
  width: 282px;
  height: 211px;
}

.category-msg {
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 1;
  width: 100%;
  height: 39px;
  line-height: 39px;
  background: #383838;
  opacity: 0.7;
}

.category-title {
  float: left;
  display: inline-block;
  width: 180px;
  color: #fff;
  padding-left: 9px;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.category-date {
  float: right;
  display: inline-block;
  font-size: 12px;
  color: #bdbdbd;
  text-align: right;
  margin-right: 7px;
  width: 75px;
}
</style>
