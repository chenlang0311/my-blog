<template>
  <div class="articleList">
    <el-row :gutter="20" style="padding-bottom:12px">
      <el-col :xs="24" :sm="24" :md="24" :lg="12"  v-for="item in articleList" :key="item._id" class="artitem" >
        <div @click="articlesDetailsFn(item._id)">
          <div class="box-card articles-box" >
            <div class="post-time">
              <span class="post-timecon">{{new Date(item.date).format('yyyy-MM-dd hh:mm:ss')}}</span>
            </div>
            <div class="post-title" >
              <h1>{{item.title}}</h1>
            </div>
            <div class="post-abstract">
              {{item.introduce}}
            </div>
          </div>
          <div class="artitem_bottom">
            <div class="poster" v-for="list in item.user" :key="list.id">
              <img :src=posters[item.label[0]]||defaultPoster alt="">
            </div>
            <div class="post-label-box">
              <span class="post-label" v-for="list in item.label" :key="list.id">{{list}}</span>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {Loading} from 'element-ui';
  import {dateFormat} from '../utils/index';
  dateFormat();
  export default {
    name: 'ArticleList',
    props: {
      articleList: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        defaultPoster: 'https://blog.77dress.cn/static/js.png',
        posters: {
          javascript: 'https://blog.77dress.cn/static/js.png',
          node: 'https://blog.77dress.cn/static/node.png',
          CSS: 'https://blog.77dress.cn/static/css.png',
          HTML: 'https://blog.77dress.cn/static/html.png',
          jquery: 'https://blog.77dress.cn/static/logo.png',
          VUE: 'https://blog.77dress.cn/static/vue.png',
          git: 'https://blog.77dress.cn/static/git.png',
          React: 'https://blog.77dress.cn/static/react.png'
        }
      }
    },
    methods: {
      articlesDetailsFn: function(id){
        this.$router.push({ path: `/details/${id}`});
      }
    }
  }
</script>

<style>
  .poster {
    float: left;
    width: 30px;
    height: 30px;
    margin-top: 1px;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 3px 2px 4px rgba(36, 61, 107, .2);
  }
  .poster img {
    width: 100%;
    position: relative;
    top: -12%;
  }
</style>
