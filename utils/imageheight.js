/**
 * 
 * @param { string } id 图片 css id 
 */
export default function countImage(id) {
  return new Promise((resolve,reject) => {
    const query = wx.createSelectorQuery()
    query.select(id).boundingClientRect()
    query.exec((res) => {
      resolve(res)
    })
  })
}