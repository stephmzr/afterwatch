export const isDev = process.env.NODE_ENV === "development";

export function urlToList(url) {
  if (!url || url === '/') {
    return ['/'];
  }

  var urlList = url.split('/').filter(function (i) {
    return i;
  });
  return urlList.map(function (urlItem, index) {
    return "/".concat(urlList.slice(0, index + 1).join('/'));
  });
}