# vue2-shopping

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### 先找到尚硅谷的图标
通过网站地址 + favicon.ico
http://atguigu.com/favicon.ico 的形式来找到网站的标签图标

### 创建header组件和footer组件 因为在页面中经常发生变化的只会body部分 

### 下载less预处理器 更好的书写css  注意需要下载@7版本的 其他版本会报错
npm i less less-loader@7 -D  -D表示开发环境才会使用 -S 表示生产环境（线上）要使用

### 创建其他组件模块

### 处理编程式导航的问题
1.当使用编程式导航时 例如：我现在在/home路径的页面下 我使用编程式导航 this.$route.push('/search') 在第一次时是不会抱错的,但是当我们已经在search页面时，再去使用编程式导航this.$route.push('/search')去跳转时就会报错 
NavigationDuplicated: Avoided redundant navigation to current location: "/search".
（避免冗余导航到当前位置:"/search"。）
2.分析问题方法：
 （1）因为vue-router3时使用了promise语法来实现的 等于是this.$route.push（path,a,b）这个方法有三个参数,
      当方法中只有path时他会在跳转之前先自己判断跳转的路径是否相同，如果相同就会返回一个失败状态的promise，
      如果成功就会返回一个成功的promise，如果传了三个值那么该函数返回的就是undefined，那么我们可以指定成功或者失败的回调函数
       btnSearch() {
        // this.$router.push('/search')   // 编程式路由导航会出现重复点击报错的情况 需要注意一下
        this.$router.push('/search',
          () => { console.log('OK') },
          () => {
            console.log('出错了...')
          })  // 传了这两个参数了 返回值就是undefined 如果不传的话，返回值是promise
      }
 （2）因为是报错，而且返回的是一个promise对象所以我们可以使用Promise.catch方法当发生报错是就会进入.catch函数
      btnSearch() {
        // this.$router.push('/search')   // 编程式路由导航会出现重复点击报错的情况 需要注意一下
        // this.$router.push('/search',
        //   () => { console.log('OK') },
        //   () => {
        //     console.log('出错了...')
        //   })  // 传了这两个参数了 返回值就是undefined 如果不传的话，返回值是promise
        this.$router.push('/search').catch(()=>{ console.log(111);})
      }
 （3）我们会重写push函数
      先将挂载到VueRouter.prototype上的方法进行重写
      const originPush = VueRouter.prototype.push
      const originReplace = VueRouter.prototype.replace

### params 传参和 query传参
1.我们进行编程式导航时可以分为两种方式
this.$router.push('/path')
this.$router.push({
  name:'path',  //在路由规则routes 中 可以设置name属性来进行跳转 在params传参时只能通过name来进行跳转
  query:{} 或者是 params:{} 传递参数
})

2.路由元信息 this.$route.meta.xxx 来进行路由元信息的访问

### mock 模拟数据
1.在使用mock时 先下载插件 npm i mockjs
2.创建mockServer文件 创建mock服务器 例如：Mock.mock(/mock/banner,'get',{code: 200,Message:'OK',data: bannerData}) 这样的格式来进行
3.在api中创建访问以 /mock开头的请求的axios实列
4.将mockServer引入main文件中保证在项目已启动 mock服务器也会立即启动


