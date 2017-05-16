<template>
  <div class="header">
    <div class="box-1200 fn-clear">
      <div class="logo"><img src="./logo.png" alt=""></div>
      <div class="menu fn-clear">
        <ul>
          <li v-if="$store.state.role==='admin'" class="addcatalog">
            <el-popover ref="popover" placement="bottom" width="300" trigger="click" v-model="visibleForm">
              <el-form :inline="true" :show-message="false" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0">
                <el-form-item prop="name">
                  <el-input v-model="ruleForm.name" placeholder="请输入目录名称" class="input-name"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                </el-form-item>
              </el-form>
            </el-popover>
            <a v-popover:popover href="javascript:void(0)"><img src="./addcatalog.png" alt="">添加目录</a>
          </li>
          <li v-if="directories.length===0" class="notAvailable"><a href="javascript:void(0)">暂无目录</a></li>
          <li v-if="directories.length>0" v-for="item in directories" :class="['menu_li', {menu_hover: directoryId===item._id}]">
            <i v-if="$store.state.role==='admin'" class="el-icon-close close-btn" @click="del(item)"></i>
            <router-link to="/user/list" @click.native="toggleDirectoryId(item._id)">{{item.name}}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
const ERR_OK = 0;

export default {
  props: {
    role: {
      type: String,
      default: 'user'
    }
  },
  computed: {
    directories() {
      return this.$store.state.directories;
    },
    directoryId() {
      return this.$store.state.directoryId;
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
          message: '请输入目录名称',
          trigger: 'blur'
        }]
      }
    };
  },
  methods: {
    toggleDirectoryId(id) {
      this.$store.dispatch('toggleDirectoryId', id);
      this.$store.dispatch('fetchCategories');
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post('/api/admin/directory', JSON.stringify(this.ruleForm)).then((res) => {
            res = res.body;
            if (res.errno === ERR_OK) {
              this.$refs[formName].resetFields();
              this.visibleForm = false;
              this.$store.dispatch('fetchDirectories');
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
        this.$http.delete('/api/del/directory', {
          params: {
            directoryId: obj._id
          }
        }).then((res) => {
          res = res.body;
          if (res.errno === ERR_OK) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.$store.dispatch('fetchDirectories');
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
.header {
  width: 100%;
  background: #3a3a3a;
  height: 65px;
  box-shadow: 0px 0px 2px 2px #d0d0d0;
}

.logo {
  width: 71px;
  height: 36px;
  float: left;
  display: inline-block;
  margin: 15px 0 0 5px;
}

.admin-center {
  width: 104px;
  height: 35px;
  float: right;
  margin: 19px 11px 0 0;
}

.btn-admin {
  display: inline-block;
  width: 104px;
  height: 35px;
  background: #f33d7d;
  border: none;
  border-radius: 5px;
  line-height: 35px;
  font-size: 16px;
  color: #fff;
  text-align: center;
  cursor: pointer;
}

.btn-admin:hover {
  background: #b43975;
}

.menu {
  float: left;
  width: auto;
  margin-left: 82px;
  margin-top: 13px;
}

.menu ul {
  width: auto;
}

.menu ul li {
  position: relative;
  float: left;
  display: inline-block;
  height: 50px;
  width: 100px;
  text-align: center;
  margin-right: 8px;
}

.menu_li:hover,
.menu_hover {
  border-bottom: 2px solid #f33d7d;
}

.menu_li a {
  display: block;
  float: left;
  width: 100%;
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  color: #c6c4c4;
  cursor: pointer;
}

.menu_li:hover a,
.menu_hover a,
.notAvailable:hover a,
.addcatalog a {
  color: #fa4f94;
}

.close-btn {
  position: absolute;
  top: 0;
  right: 0;
  color: #bdbdbd;
  cursor: pointer;
}

.close-btn:focus,
.close-btn:hover {
  color: #fff;
}

.addcatalog img {
  vertical-align: middle;
  margin-right: 3px;
}

.notAvailable a,
.addcatalog a {
  display: block;
  margin-top: 8px;
  width: 100%;
  color: #7d8287;
  background: #464646;
  height: 33px;
  line-height: 33px;
  border: 1px dashed #7d7d7d;
  border-radius: 5px;
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
