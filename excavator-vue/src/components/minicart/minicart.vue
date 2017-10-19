<template>
  <div class="cart-session mt13">
    <h2><i class="icon-gouwuche"></i>购物车</h2>
    <nav>
      <a :class="{'select':curIndex=== 0}"  @click='curIndex=0' href="JavaScript:;">叉车租售</a>
      <a :class="{'select':curIndex=== 1}" @click='curIndex=1' href="JavaScript:;">配件商城</a>
    </nav>
    <div class="cart-session-detail">
      <template v-if='curIndex=== 0'>
        <div class="cart-session-common sale-rental" v-if="rentData&&rentData.list.length">
          <h3>租赁（共<em>{{rentData.total}}</em>部叉车）<a class="to-cart" href="personal.html?tabIndex=3&index=1&name=叉车租赁&viewName=Cart">更多<i class="icon-fanye"></i></a></h3>
          <ul class="right-cart-title">
            <li class="name-title">名称</li>
            <li>型号</li>
            <li>月租价</li>
            <li>数量</li>
            <li>租赁月数</li>
            <li>金额</li>
          </ul>
          <div class="right-cart-table-wrap">
            <table border="0" cellpadding="0" cellspacing="0">
              <tr v-for="(item,index) in rentData.list" :key="index">
                <td class="product-name">{{item.name}}</td>
                <td>{{item.model}}</td>
                <td>{{item.discount}}</td>
                <td class="num">
                  <a href="javascript:;" class="icon-jian" @click='reduce({type:"number",item,data:rentData})'></a>
                  <input type="text" v-model='item.number'  disabled>
                  <a href="javascript:;" class="icon-jia" @click='add({type:"number",item,data:rentData})'></a>
                </td>
                <td class="num">
                  <a href="javascript:;" class="icon-jian" @click='reduce({type:"month",item,data:rentData})'></a>
                  <input type="text" v-model='item.month' disabled>
                  <a href="javascript:;" class="icon-jia" @click='add({type:"month",item,data:rentData})'></a>
                </td>
                <td class="fbtn-color">{{item.sum}}</td>
              </tr>
            </table>
          </div>
          <div class="right-cart-bottom">
            <span>总价：<i>¥{{rentData.sum}}</i></span>
            <button >去申请</button>
          </div>
        </div>
        <div class="cart-session-common purchase-cart" v-if="saleData&&saleData.list.length">
          <h3>购买（共<em>{{saleData.total}}</em>部叉车）<a class="to-cart" href="personal.html?tabIndex=3&index=2&name=叉车售卖&viewName=Cart">更多<i class="icon-fanye"></i></a></h3>
          <ul class="right-cart-title">
            <li>名称</li>
            <li>型号</li>
            <li>单价</li>
            <li>数量</li>
            <li>金额</li>
          </ul>
          <div class="right-cart-table-wrap">
            <table border="0" cellpadding="0" cellspacing="0">
              <tr v-for="(item,index) in saleData.list" :key="index">
                <td class="product-name">{{item.name}}</td>
                <td>{{item.model}}</td>
                <td>{{item.discount}}</td>
                <td class="num">
                  <a href="javascript:;" class="icon-jian" @click='reduce()'></a>
                  <input type="text" v-model='item.number'  disabled>
                  <a href="javascript:;" class="icon-jia" @click='add({type:"number",item,data:rentData})'></a>
                </td>
                <td class="fbtn-color">{{item.sum}}</td>
              </tr>
            </table>
          </div>
          <div class="right-cart-bottom">
            <span>总价：<i>¥{{saleData.sum}}</i></span>
            <button >去申请</button>
          </div>
        </div>
      </template>
      <template v-if='curIndex=== 1'>
        <div class="cart-session-common purchase-cart adapter-cart arrow-right" v-if="partsData&&partsData.list.length">
          <h3>配件（共<em>{{partsData.total}}</em>种配件）<a class="to-cart" href="personal.html?tabIndex=3&index=0&name=配件&viewName=Cart">更多<i class="icon-fanye"></i></a></h3>
          <ul class="right-cart-title">
            <li class="product-title">名称</li>
            <li class="adapter-title">适配叉车</li>
            <li>单价</li>
            <li class="num">数量</li>
            <li>金额</li>
          </ul>
          <div class="right-cart-table-wrap">
            <table border="0" cellpadding="0" cellspacing="0">
              <tr v-for="(item,index) in partsData.list" :key="index">
                <td class="product-name">{{item.name}}</td>
                <td class="adapter-name"><span v-for='(adapter,index) in item.adapterForkliftType' :key="index" track-by="$index">{{adapter}}&nbsp;</span></td>
                <td>{{item.discount}}</td>
                <td class="num">
                  <a href="javascript:;" class="icon-jian" @click='reduce({type:"number",item,data:partsData})'></a>
                  <input type="text" v-model='item.number'  disabled>
                  <a href="javascript:;" class="icon-jia" @click='add({type:"number",item,data:partsData})'></a>
                </td>
                <td class="fbtn-color">{{item.sum}}</td>
              </tr>
            </table>
          </div>
          <div class="right-cart-bottom">
            <span>总价：<i>¥{{partsData.sum}}</i></span>
            <button >去申请</button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
    import vm from './minicart.js'
    export default vm
</script>





