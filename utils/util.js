const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const formatStar=(num)=>{
  let res
  if(num>100000)//>10w
    res = (num/1000).toFixed(0)+"k"
  else if(num>10000)// >1w
    res = (num/1000).toFixed(1)+"k"
  else if(num>1000)
    res = (num/1000).toFixed(1)+"k"
  return res
}

module.exports = {
  formatTime: formatTime,
  formatStar:formatStar
}
