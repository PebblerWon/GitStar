const util = require('../../utils/util.js')
const AppInstance = getApp()
const serverUrl = AppInstance.globalData.serverUrl
const descLength = 118 //description的长度超过118后截取
const defaultPage = 1 //默认页数为1
const defaultPerPage = 10 //默认每页显示10条
Page({
  data: {
    languages:[
      { name: 'All', value: '', count: 0 },
      { name: 'JavaScript', value: 'JavaScript', count: 0 },
      { name: 'Java', value: 'Java', count: 0 },
      { name: 'Python', value: 'Python', count: 0 },
      { name: 'Objective-C', value: 'Objective-C', count: 0 },
      { name: 'Go', value: 'Go', count: 0 },
      { name: 'Ruby', value: 'Ruby', count: 0 },
      { name: 'C++', value: 'C%2B%2B', count: 0 },
      { name: 'PHP', value: 'PHP', count: 0 },
      { name: 'C', value: 'C', count: 0 },
      { name: 'Swift', value: 'Swift', count: 0 },
    ],
    repos:[],
    loading:true,
    curLan:'',
    page:defaultPage,
    per_page:defaultPerPage
  },
  onReady(){
    const proData = this.proData
    let page = this.data.page
    let per_page = this.data.per_page
    const that = this
    wx.request({
      url: serverUrl+'/api/query'+`?page=${page}&per_page=${per_page}`,
      success:(data)=>{
        //console.log(data)
        let arr = []
        
        this.setData({
          repos:proData(arr,data),
        },()=>{
          that.hideLoading()
        })
      },
      fail:(err)=>{
        console.log('err')
        console.log(err)
      }
    })
  },
  moreItemTap(){
    const proData = this.proData
    let newPage = this.data.page+1
    let per_page = this.data.per_page
    let curLan = this.data.curLan
    this.setData({page:newPage,loading:true})
    let url
    if(curLan=='')
      url = serverUrl + '/api/query' + `?page=${newPage}&per_page=${per_page}`
    else
      url = serverUrl + '/api/advancedQuery' + `?language=${curLan}&page=${newPage}&per_page=${per_page}`
    wx.request({
      url: url,
      success: (data) => {
        let arr = this.data.repos
        
        this.hideLoading()
        this.setData({
          repos: proData(arr,data),
        })
      },
      fail: (err) => {
        console.log('err')
        console.log(err)
      }
    })
  },
  tabClick(event){
    const proData = this.proData
    let curTar = event.currentTarget
    //console.log(curTar)
    this.setData({
      loading:true,
      curLan:curTar.dataset.value,
      page:defaultPage,
      per_page:defaultPerPage
    })
    /*
     *因为setData是异步的
     *所以不从this.data取值 
     */
    let page = defaultPage
    let per_page = defaultPerPage
    let curLan = curTar.dataset.value
    let url
    if (curLan == '')
      url = serverUrl + '/api/query' + `?page=${page}&per_page=${per_page}`
    else
      url = serverUrl + '/api/advancedQuery' + `?language=${curLan}&page=${page}&per_page=${per_page}`
    //console.log(url)
    wx.request({
      url: url,
      success: (data) => {
        //console.log(data)
        let arr = []

        this.hideLoading()
        this.setData({
          repos: proData(arr, data),
        })
      },
      fail: (err) => {
        console.log('err')
        console.log(err)
      }
    })
  },
  itemClick(event){
    let curTar = event.currentTarget
    wx.navigateTo({
      url: `/pages/detail/detail?id=${curTar.dataset.value}`,
    })
    console.log(curTar.dataset)
  },
  hideLoading(){
    this.setData({loading:false})
  },
  showLoading(){
    this.setData({loading:true})
  },
  proData(arr,data){
    for (let item of data.data) {
      let descr
      if (item.description)
        descr = item.description.toString()
      else
        descr = ''
      arr.push({
        id: item.id,
        name: item.name,
        full_name: item.full_name,
        html_url: item.html_url,
        description: descr.length > descLength ? descr.substring(0, 118) + "..." : descr,
        language: item.language == null ? "" : item.language,
        stargazers_count: util.formatStar(item.stargazers_count)
      })
    }
    return arr
  }
})