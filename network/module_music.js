import Music from './index'

function getBanner(typeNumber) {
    return Music.GETdata('/banner', {
      type: typeNumber
    })
}

function tuijianMusic(type) {
  return Music.GETdata('/personalized/newsong',{
    type
  })
}
function gedan(cat='华语',limit=6){
  return Music.GETdata('/top/playlist/highquality',{
    cat:cat,
    limit
  })
}

function getlist() {
  return Music.GETdata('/toplist',{})
}

function getMusicinfo(id){
  return Music.GETdata('/playlist/detail/',{
    id
  })
}
module.exports = {
  getBanner,
  tuijianMusic,
  gedan,
  getlist,
  getMusicinfo
}