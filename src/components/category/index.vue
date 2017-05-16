<template>
  <div class="box-1200">
    <div class="nav-box fn-clear">
      <div class="nav-title">所有分类：</div>
      <div class="nav fn-clear">
        <ul>
          <li v-if="$store.state.role==='admin'" class="nav-li nocategory">
            <el-popover ref="popover" placement="bottom" width="300" trigger="click" v-model="visibleForm">
              <el-form :inline="true" :show-message="false" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0">
                <el-form-item prop="name">
                  <el-input v-model="ruleForm.name" placeholder="请输入分类名称" class="input-name"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                </el-form-item>
              </el-form>
            </el-popover>
            <span v-popover:popover><img src="./addclass.png" alt="">添加分类</span>
          </li>
          <li v-if="categories.length===0" class="nav-li nocategory">暂无分类</li>
          <li v-if="categories.length>0" v-for="item in categories" @click.prevent="toggleCategoryId(item._id)" :class="['nav-li', {'nav-li-select': categoryId===item._id}]">
            <router-link to="/user/list">{{item.name}}</router-link>
            <i v-if="$store.state.role==='admin'" class="el-icon-close close-btn" @click="del(item)"></i>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
const ERR_OK = 0;

export default {
  computed: {
    categories() {
      return this.$store.state.categories;
    },
    categoryId() {
      return this.$store.state.categoryId;
    }
  },
  data() {
    return {
      visibleForm: false,
      ruleForm: {
        name: ''
      },
      rules: {
        name: [{
          required: true,
          message: '请输入类别名称',
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    toggleCategoryId(id) {
      this.$store.dispatch('toggleCategoryId', id);
      this.$store.dispatch('fetchMovies');
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post('/api/admin/category', JSON.stringify({
            'name': this.ruleForm.name,
            'directory': this.$store.state.directoryId
          })).then((res) => {
            res = res.body;
            if (res.errno === ERR_OK) {
              this.$refs[formName].resetFields();
              this.visibleForm = false;
              this.$store.dispatch('fetchCategories');
            } else {
              this.$message.error({
                message: '请先添加一级目录',
                duration: 1000
              });
            }
          })
        } else {
          return false;
        }
      });
    },
    del(obj) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.delete('/api/del/category', {
          params: {
            categoryId: obj._id
          }
        }).then((res) => {
          res = res.body;
          if (res.errno === ERR_OK) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.$store.dispatch('fetchCategories');
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      })
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav-box {
  width: 100%;
  height: 52px;
  line-height: 52px;
  background: #ffffff;
  border: 1px solid #dcdcdc;
  margin-top: 12px;
}

.nav-title {
  float: left;
  display: inline-block;
  width: 80px;
  text-align: right;
  font-size: 14px;
  color: #c9c9c9;
  margin-right: 7px;
}

.nav {
  width: auto;
}

.nav li {
  margin-top: 12px;
  margin-right: 8px;
  float: left;
  display: inline-block;
  height: 25px;
  line-height: 25px;
  position: relative;
  border: 1px solid #e9e9e9;
}

.nav-li-angle {
  width: 0;
  height: 0;
  position: absolute;
  top: 27px;
  left: 50%;
  margin-left: -5px;
  background: #fff;
  border: 10px solid #fff;
  border-radius: 10px;
  border-top-color: #fa4f94;
}

.nav li.nav-li {
  padding: 0px 10px;
  background: #e9e9e9;
  font-size: 14px;
  border-radius: 5px;
  color: #5d5d5d;
  cursor: pointer;
}

.close-btn {
  color: #bdbdbd;
  font-size: 12px;
}

.close-btn:focus,
.close-btn:hover {
  color: #fff;
}

.nav li.nav-li a {
  color: #5d5d5d;
}

.nav li.nav-li-select {
  background: #fa4f94;
  border: 1px solid #fa4f94;
}

.nav li.nav-li-select a {
  color: #fff;
}

.nav li.nav-li-select::after {
  background: url(./class-angle.png) no-repeat bottom center;
  content: '';
  width: 9px;
  height: 5px;
  position: absolute;
  top: 26px;
  left: 50%;
  margin-left: -5px;
}

.nav li.nocategory {
  background: #f5f4f4;
  border: 1px dashed #bfbfbf;
}

.nav li.nocategory img {
  vertical-align: middle;
  margin-right: 3px;
}

.el-form-item {
  margin-bottom: 0;
}

.el-form--inline .el-form-item:last-of-type {
  margin-right: 0;
}

.input-name {
  width: 198px;
}
</style>
