const BASEURL = 'https://locally.uieee.com/'

/**
 * 封装的get方法
 */
const get = url => {
  return new Promise((resolve,reject) => {
    // 执行异步操作
    wx.request({
      url: `${BASEURL}${url}`,
      success: res => {
        resolve(res)
      },
      fail:err => {
        reject(err)
      }
    })
  })
}

/**
 * 封装的post方法
 */
const post = (url,data) => {
  return new Promise((resolve, reject) => {
    // 执行异步操作
    wx.request({
      url: `${BASEURL}${url}`,
      method:'POST',
      data,
      success: res => {
        resolve(res)
      },
      fail: err => {
        reject(err)
      }
    })
  })
}

export default {
  get,
  post
}