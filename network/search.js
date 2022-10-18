import Music from './index'

function searchHots() {
  return Music.GETdata('/search/hot')
}
function searchMusic(keywords) {
  return Music.GETdata('/cloudsearch',{
    keywords
  })
}
module.exports = {
  searchHots,
  searchMusic
}