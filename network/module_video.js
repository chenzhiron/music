import Music from './index'
function TopMv(offset,limit = 11) {
  return Music.GETdata('/top/mv',{
    offset:offset,
    limit:limit
  })
}
function TopMvDetail(mvid){
  return Music.GETdata('/mv/detail',{
    mvid
  })
}
function TopMvVideo(id,r=1080) {
  return Music.GETdata('/mv/url',{
    id,
    r
  })
}
function topMvtuijian(id){
  return Music.GETdata('/related/allvide',{
    id
  })
}
module.exports = {
    TopMv,
    TopMvDetail,
    TopMvVideo,
    topMvtuijian
}