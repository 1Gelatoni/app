<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <!-- {{ categoryList }} -->
    <div class="container">
      <!-- 时间委派 -->
      <div @mouseleave="leaveShow" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 过渡动画 -->
        <transition name="sort">
          <!-- 三级联动 -->
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <div class="item" v-for="(c1, index) in categoryList" :key="c1.categoryId"
                :class="{ cur: currentIndex == index }">
                <!--鼠标移入哪个index就给其添加一个类名cur-->
                <h3 @mouseenter="changeIndex(index)">
                  <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{ c1.categoryName }}</a>
                  <!-- 路由跳转：声明式导航 -->
                  <!-- <router-link to="/Search">{{ c1.categoryName }}</router-link> -->
                </h3>
                <!-- 二、三级分类 -->
                <div class="item-list clearfix" :style="{ display: currentIndex == index ? 'block' : 'none' }">
                  <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                    <dl class="fore">
                      <dt>
                        <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{ c2.categoryName
                        }}</a>
                        <!-- 路由跳转：声明式导航 -->
                        <!-- <router-link to="/Search">{{ c2.categoryName }}</router-link> -->
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{ c3.categoryName
                          }}</a>
                          <!-- 路由跳转：声明式导航 -->
                          <!-- <router-link to="/Search">{{ c3.categoryName }}</router-link> -->
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>

      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// 这种引入方法是把lodash全部的功能函数引入
// import _ from 'lodash'
// 按需引入
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      // 存储用户鼠标移上哪一个一级分类
      currentIndex: -1,
      show: true
    }
  },
  // 组件挂载完毕 向服务器发请求
  mounted() {
    // 通知vuex发请求，获取数据，存储于仓库中
    /* this.$store.dispatch('categoryList') */
    /* 使用命名空间 */
    // this.$store.dispatch('home/categoryList')
    // 当组件挂载完毕
    // 如果不是Home路由组件，将TypeNav隐藏
    if (this.$route.path != '/home') {
      this.show = false
    }
  },
  computed: {
    ...mapState({
      // 对象写法：value为一个函数，当使用这个计算属性时，右侧的函数执行 参数state为大仓库中的数据
      categoryList: state => state.home.categoryList
    })
    /* 使用命名空间 */
    // ...mapState('home',['categoryList'])
  },
  methods: {
    // 鼠标进去修改响应式数据currentIndex
    /* changeIndex(index) {
      this.currentIndex = index
      // 正常情况（用户慢慢操作）：鼠标进入 每一个一级分类都会触发鼠标移入事件
      // 非正常操作（用户操作很快）：本身每个一级分类都会触发鼠标移入事件 但经过测试 发现只有部分一级分类触发了事件
      // 由于用户操作过快，导致浏览器反应不过来，当回调函数中业务量大时，有可能出现卡顿现象
    }, */
    // 全部引入
    /* changeIndex:_.throttlr(function(index){
      this.currentIndex = index
    },50), */
    // 按需引入
    // throttle的回调函数不要写成箭头函数
    changeIndex: throttle(function (index) {
      this.currentIndex = index
    }, 50),
    // 路由跳转方法
    goSearch(event) {
      // this.$router.push('/search')
      // 最好利用编程式导航+事件委派
      // 利用事件委派存在的问题：1.如何知道点击的是a标签；2.如何获取到要传递的参数
      // 解决：1.给子节点中的a标签加上自定义属性：:data-categoryname
      let element = event.target;  //获取当前出发时间的节点标签
      // 节点的dataset属性 可以获取节点的自定义属性和属性值
      let { categoryname, category1id, category2id, category3id } = element.dataset  //解构
      if (categoryname) {
        // 整理路由跳转时的参数
        let location = { name: 'search' }
        let query = { categoryName: categoryname }
        // 一级分类、二级分类、三级分类的a标签
        if (category1id) {
          query.category1Id = category1id
        } else if (category2id) {
          query.category2Id = category2id
        } else {
          query.category3Id = category3id
        }
        // 判断 路由跳转时有无params参数
        if(this.$route.params){
          location.params = this.$route.params
        }
        // 整理参数
        location.query = query
        // 路由跳转
        this.$router.push(location)
      }
    },
    // 鼠标移入时商品分类展示
    enterShow() {
      this.show = true
    },
    // 鼠标离开时商品分类隐藏
    leaveShow() {
      // 一级分类鼠标移出事件
      this.currentIndex = -1
      if (this.$route.path != '/home') {
        this.show = false
      }
    }
  }
};
</script>

<style lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 27px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          /*&:hover {
            .item-list {
              display: block;
            }
          }*/
        }

        /*.item:hover{
          background-color: skyblue;
        }*/
        .cur {
          background-color: skyblue;
        }
      }
    }
    /*过渡动画的样式*/
    .sort-enter , .sort-leave-to{
      height: 0px;
      /*旋转*/
      /*transform: rotate(0deg);*/
      /*动画*/
      /*animation:linabell .5s reverse;*/
    }
    .sort-enter-to , .sort-leave{
      height: 461px;
      /*transform: rotate(360deg);*/
      /*动画*/
      /*animation:linabell .5s;*/
    }
    /*用过度*/
    .sort-enter-active , .sort-leave-active{
      transition:all .3s linear;
    }
    /*用动画*/
    /*@keyframes linabell {
      from{
        height: 0px;
      }
      to{
        height: 461px;
      }
    }*/
  }
}</style>