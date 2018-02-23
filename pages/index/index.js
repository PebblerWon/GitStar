//index.js
//获取应用实例
var util = require('../../utils/util.js')
const app = getApp()

Page({
  data: {
   text:'text',
   name:[
  { firstName: 'Hulk', lastName: 'Hu' },
   { firstName: 'Shang', lastName: 'You' },
     { firstName: 'Gideon', lastName: 'Lin' }]
  },
  //事件处理函数
  tapTest(e){
    console.log(e)
  },
  changeName(){
    this.setData({
      "name[0].firstName":'hulk'
    })
  },
  changeText(){
    this.setData({
      text:'changed text'
    })
    console.log(getApp().globalData.userInfo)
    console.log(util.formatTime(new Date()))
  },
  changeNum(){
    this.setData({
      num: this.data.num+1
    })
  },
  changeArray(){
    this.setData({
      'array[0].text': 'changed data'
    })
  },
  changeObject(){
    this.setData({
      'object.text':'changed object text'
    })
  },
  appendNewField(){
    this.setData({
      'newField.text':'add new text'
    })
  }
 
})
