
const URI = 'https://douban.uieee.com/v2/movie'
// const URI = 'https://api.douban.com/v2/movie'
const fetch = require('./fetch')

/**
 * 抓取豆瓣电影特定类型的API
 * https://developers.douban.com/wiki/?title=movie_v2
 * @param  {String} type   类型，例如：'coming_soon'
 * @param  {Objece} params 参数
 * @return {Promise}       包含抓取任务的Promise
 */
function fetchApi(type, params) {
  return fetch(URI, type, params)
}

/**
 * 获取列表类型的数据
 * @param  {String} type   类型，例如：'coming_soon'
 * @param  {Number} page   页码
 * @param  {Number} count  页条数
 * @return {Promise}       包含抓取任务的Promise
 */
function find(type, page = 1, count = 5, curCity) {
  const params = { start: page, count: count, city: curCity || getApp().data.currentCity }
  return fetchApi(type, params)
    .then(res => res.data)
}

/**
 * 获取单条类型的数据
 * @param  {Number} id     电影ID
 * @return {Promise}       包含抓取任务的Promise
 */
function findOne(id) {
  return fetchApi('subject/' + id)
    .then(res => res.data)
}

/**
 * 搜索电影，不分类型
 * @param {String} type      电影类型，例如：'coming_soon','top250'
 * @param {String} keyword   关键词
 * @param {String} start     起始页码
 * @param {String} count     请求数据条数
 * @return {Promise}         包含抓取任务的Promise
 */
function search(keyword, start, count) {
  var params = { start: start, count: count, q: keyword }
  return fetchApi('search', params)
    .then(res => res.data)
}

module.exports = { find, findOne, search }