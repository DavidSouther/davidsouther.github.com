function showStackoverflowFeed(data, user) {
  var timeline = document.getElementById('stackoverflow'),
      content = '', url, prettyDate;

  data.items.forEach(function(item){
    // prettyDate = stackOverflowPrettyDate(item.creation_date*1000);
    prettyDate = new Date(item.creation_date * 1000).toLocaleString();
    url = 'http://stackoverflow.com/a/' + item.answer_id + '/' + user
    content += '<li><p><span>' + prettyDate+'</span><a href="' + url + '">' + item.title + '</a></p></li>';
  });
  timeline.innerHTML = content;
}

function getStackOverflowFeed(user, count) {
  count = parseInt(count, 10);
  var url = 'http://api.stackexchange.com/2.0/users/' + user + '/answers?pagesize=' + count + '&order=desc&sort=votes&site=stackoverflow&filter=!9g(zI9ACQ&callback=?';
  $.getJSON(url)
  .then(
    function(data) { showStackoverflowFeed(data, user); },
    function (err) { $('#stack li.loading').addClass('error').text("Stack Overflow's busted"); }
  );
}
