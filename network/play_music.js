import Music from './index'

function getMusicUrl(id) {
  return Music.GETdata('/song/url',{
    id
  })
}
function getMusicInfo(ids) {
  return Music.GETdata('/song/detail',{
    ids
  })
}

function getMusicGeci(id) {
  return Music.GETdata('/lyric',{
    id
  })
}

module.exports = {
  getMusicUrl,
  getMusicInfo,
  getMusicGeci
  
}