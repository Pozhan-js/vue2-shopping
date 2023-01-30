<template>
  <div class="pagination">
    <button @click="handlePageNum(pageNum-1)" :disabled="pageNum === 1">上一页</button>
    <button v-show="startAndEnd.start > 1" @click="handlePageNum(1)">1</button>
    <span v-show="startAndEnd.start > 2">...</span>
    <button 
    :class="{active:(index+startAndEnd.start === pageNum)}" 
    v-for="(_,index) in (startAndEnd.end-startAndEnd.start+1)" 
    :key="_"
    @click="handlePageNum(index+startAndEnd.start)"
    >{{index+startAndEnd.start}}</button>
    <button v-show="startAndEnd.end < totalPage-1">···</button>
    <button
      v-show="startAndEnd.end < totalPage"
      @click="handlePageNum(totalPage)">{{totalPage}}</button>
    <button @click="handlePageNum(pageNum+1)" :disabled="pageNum === totalPage">下一页</button>

    <span>共 {{totalPage}} 条</span>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props:['total','pageSize','continues','pageNum'],
  computed:{
    // 计算总共页数
    totalPage(){
      let {total,pageSize} =this
     return Math.ceil(total/pageSize)
    },
    //计算起始页和结束页
    startAndEnd(){
      let {totalPage,pageNum,continues} = this
      let start ,end
      if(continues>totalPage){
        // 那么起始页为1 ，结束页为totalPage
        start = 1,
        end = totalPage
      }else{
        // 当计算会得到小于1的情况
        start = pageNum-Math.trunc(continues/2)
        end = pageNum+Math.trunc(continues/2)
        if(start<1){
          start =1,
          end = continues
        }
        if(end>totalPage){
          end = totalPage,
          start = totalPage-continues+1
        }
      }
      return {start,end}
    }
  },
  methods:{
    handlePageNum(num){
      this.$emit('change-pageNum',num)
    }
  }
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #C81623;
      color: #fff;
    }
  }
  span{
    display: inline-block;
    line-height: 28px;
    font-size: 14px;
    color:gray;
    vertical-align: middle;
  }
}
</style>