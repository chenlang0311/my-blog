<template>
  <div id="app">
    <el-row :gutter="0" >
      <el-col class="nav">
        <el-col class="nav-bar" :sx="22" :sm="22" :md="22" :lg="16">
          <div class="nav-bar-body">
            <div class="nav-bar-inner">
              <div id="logo">
                <img src="https://blog.77dress.cn/static/logo.png" alt="个人技术博客vue、react、node">
              </div>
            </div>
            <div>
              <div id="search">
                <el-input  placeholder="搜索" :on-icon-click="searchArticle"  v-model="search" @keyup.enter.native="keyupsearch($event)">
                  <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
              </div>
            </div>
          </div>
          <div class="navmenu">
            <template>
              <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane  v-for="item in taglists" :key=item :label='item' :name="item" data-ripple></el-tab-pane>
              </el-tabs>
            </template>
          </div>
        </el-col>
      </el-col>
      <el-col :xs="24" :sm="22" :md="22" :lg="16" class="container_article">
        <div class="main">
          <nuxt/>
        </div>
      </el-col>
    </el-row>
    <div class="footer">粤ICP备18149555号</div>
  </div>
</template>
<script>
  import axios from 'axios';
  import marked from 'marked';
  export default {
    name: 'app',
    data () {
      return {
        taglists: ['最新'],
        search: '',
        activeName: '',
      }
    },
    mounted(){
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?66af132474dd9a5c2ebd172d8d08e81b";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
      })();
      this.taglist();
      var winwinth=window.innerWidth
      if(this.$route.params.tag === undefined && this.$route.fullPath === '/'){
        this.activeName = '最新';
      }else {
        this.activeName = this.$route.params.tag;
      }
    },
    methods: {
      taglist() {
        axios.get('/api/getArticleLabel').then(
          respone => {
            const tagList = (respone.data.tagList || []).map(item => item.tagName);
            this.taglists = ['最新', ...tagList];
          });
      },
      keyupsearch(ev) {
        if(ev.keyCode === 13){
          this.searchArticle()
        }
      },
      handleClick(tab) {
        const {index} = tab;
        this.$router.push({path:`/${index == 0 ? '' : tab.name}`});
      },
      gimobile() {
        window.open('http://www.m.binlive.cn');
      },
      searchArticle() {
        const trimSearch = this.search.trim();
        if(!trimSearch){
          return this.$notify.info({
            title: '提示',
            message: '您还未输入搜索内容',
            offset: 100
          });
        }
        this.$router.push({ path: `/search/${this.search}`});
      },
      loginpage(){
        window.open("https://admin.77dress.cn");
      }
    }
  }
</script>
