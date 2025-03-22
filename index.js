// 每个商品类
class Good{
  constructor(d){
    this.good = {
      count: 0,
      detail: d
    }
  }

  // 获取当前商品个数
  getGoodCount(){
    return this.good.count
  }

  // 增加商品
  increase(){
    this.good.count++
  }
  // 减少商品
  decrease(){
    if(this.good.count === 0) return
    this.good.count--
  }
  // 计算此商品总价
  getTotalPrice(){
    return this.getGoodCount() * this.good.detail.price
  }

  // 判断当前商品是否添加
  isGoodAdded(){
    return this.getGoodCount() > 0
  }
}

// 购物车详情类
class Cart{
  constructor(diliveryThreshold = 0, diliveryPrice = 3){
    // 生成商品列表
    this.goods = []
    for (let index = 0; index < data.length; index++) {
      this.goods.push(new Good(data[index]))
    }
    // 购物车起送价格
    this.diliveryThreshold = diliveryThreshold
    // 配送费
    this.diliveryPrice = diliveryPrice
  }
  // 获取购物车商品总数
  getTotalCount(){
    // let sum = 0
    // for (let index = 0; index < this.goods.length; index++) {
    //   sum += this.goods[index].getGoodCount()
    // }
    return this.totalCount
  }
  get totalCount() {
    let sum = 0
    for (let index = 0; index < this.goods.length; index++) {
      sum += this.goods[index].getGoodCount()
    }
    return sum
  }
  // 获取购物车总价
  getTotalPrice(){
    let price = 0
    for (let index = 0; index < this.goods.length; index++) {
      price += this.goods[index].getTotalPrice()
    }
    return price
  }
  // 是否达到起送价格
  isSupassDeliveryThreshold(){
    return this.getTotalPrice() >= this.diliveryThreshold
  }
  // 添加指定商品到购物车中
  increas(index){
    this.goods[index].increase()
  }
  // 减少指定商品到购物车中
  decrease(index){
    this.goods[index].decrease()
  }
  getGoodCount(index){
    return this.goods[index].getGoodCount()
  }
  // 购物车中是否有商品
  isAddedGood(){
    return this.getTotalCount() > 0
  }
}


// 界面UI类
class UI{
  constructor(){
    let footer = document.querySelector('footer')
    this.doms = {
      container: document.querySelector('.good-container'),
      cartIcon: footer.querySelector('.cart-icon'),
      totalCount: footer.querySelector('.cart-icon span'),
      totalPrice: footer.querySelector('.price-value'),
      deliveryPrice: footer.querySelector('.delivery-price'),
      threshold: footer.querySelector('.delivery-threshold'),
      thresholdDistance: footer.querySelector('.delivery-not'),
    }
    this.createList()
    // this.doms.totalCount.innerHTML = cart.getTotalCount()
    this.doms.totalCount.innerHTML = cart.totalCount
    this.doms.deliveryPrice.innerHTML = `配送费￥${cart.diliveryPrice}`
    let distance = cart.diliveryThreshold - cart.getTotalPrice()
    this.doms.thresholdDistance.innerHTML = `还差￥${Math.round(distance).toFixed(1)}起送`
    this.createEventListner()
  }

  // 生成商品列表
  createList(){
    let html = ''
    for (let index = 0; index < cart.goods.length; index++) {
      let currentGood = cart.goods[index]
      html += `<div class="good-item">
          <div class="good-pic">
            <img src="${currentGood.good.detail.pic}"/>
          </div>
          <div class="good-detail">
            <h5>${currentGood.good.detail.name}</h5>
            <p>${currentGood.good.detail.desc}</p>
            <p>￥${currentGood.good.detail.price.toFixed(2)}</p>
            <div class="good-count ${currentGood.isGoodAdded() ? 'actived' : ''}">
              <i data-good-index="${index}" class="iconfont icon-jianshao"></i>
              <span>${currentGood.getGoodCount()}</span>
              <i data-good-index="${index}" class="iconfont icon-zengjia1"></i>
            </div>
          </div>
        </div>`
    }
    this.doms.container.innerHTML = html
  }

  // 绑定事件
  createEventListner(){
    this.doms.container.addEventListener('click', (e)=>{
      if(e.target.classList.contains('icon-jianshao')){
        let index = Number(e.target.dataset.goodIndex)
        this.decrease(index)
      } else if (e.target.classList.contains('icon-zengjia1')){
        let index = Number(e.target.dataset.goodIndex)
        this.increase(index)
      }
    })
    // 动画事件
    this.doms.cartIcon.addEventListener('animationend',(e)=>{
      this.doms.cartIcon.classList.remove('actived')
    })
  }

  // 添加商品
  increase(index) {
    cart.increas(index)
    this.updateItem(index)
  }
  // 减少商品
  decrease(index){
    cart.decrease(index)
    this.updateItem(index)
  }
  updateItem(index){
    // 更新对应商品UI
    let currentGood = this.doms.container.children[index]
    let currentGoodCount = currentGood.querySelector('.good-count span')
    currentGoodCount.innerHTML = cart.getGoodCount(index)
    // 更新总数和总价
    this.doms.totalCount.innerHTML = cart.getTotalCount()
    this.doms.totalPrice.innerHTML = `￥${cart.getTotalPrice().toFixed(2)}`
    if(cart.isAddedGood()){
      this.doms.cartIcon.classList.add('actived')
      this.doms.totalCount.classList.add('actived')
    } else {
      this.doms.cartIcon.classList.remove('actived')
      this.doms.totalCount.classList.remove('actived')
    }
    if(cart.isSupassDeliveryThreshold()) {
      this.doms.threshold.classList.add('actived')
    } else {
      this.doms.threshold.classList.remove('actived')
      let distance = cart.diliveryThreshold - cart.getTotalPrice()
      this.doms.thresholdDistance.innerHTML = `还差￥${Math.round(distance).toFixed(1)}起送`
    }
    let goodCount = currentGood.querySelector('.good-count')
    if(cart.goods[index].isGoodAdded()) {
      goodCount.classList.add('actived')
    } else {
      goodCount.classList.remove('actived')
    }
  }
}


const cart = new Cart(50)
const ui = new UI()
console.log(cart);
