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

module.exports = {
  getMusicUrl,
  getMusicInfo
}