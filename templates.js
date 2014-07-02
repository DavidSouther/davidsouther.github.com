angular.module('content.blog.list.template', [])
.run(function($templateCache){
    $templateCache.put('content/blog/list', '<div class="PostList"><h2>Posts List</h2><section ng-repeat="post in site.posts | orderBy:\'front.date\':true"><h3><a ui-sref="blog.post({blogPath: site.link(post.path)})">{{ post.front.title }}</a><time>{{ post.front.date | date:short }}</time></h3></section></div>');
});
angular.module('content.blog.post.template', [])
.run(function($templateCache){
    $templateCache.put('content/blog/post', '<article><header><h2>{{front.title}}</h2><p class="_publish-date"><time>{{ front.date | date:medium }}</time></p><p class="_author">{{ front.author }}</p><p>Categories:<span ng-repeat="cat in front.categories">&nbsp;{{ cat }}</span></p></header><div ng-bind-html="content"></div><footer><a ui-sref="blog.post({blogPath: site.link(previous.path)})" ng-show="previous" class="_previous">Previous</a><a ui-sref="blog.post({blogPath: site.link(next.path)})" ng-show="next" class="_next">Next</a></footer></article>');
});
angular.module('content.home.template', [])
.run(function($templateCache){
    $templateCache.put('content/home', '<h3>Post List</h3>');
});
angular.module('content.pages.template', [])
.run(function($templateCache){
    $templateCache.put('content/pages', '<article><header><h2>{{front.title}}</h2></header><div ng-bind-html="content"></div></article>');
});
angular.module('main.banner.template', [])
.run(function($templateCache){
    $templateCache.put('main/banner', '<hgroup class="Header"><h1><a ui-sref="home">{{ site.title }}</a></h1><h2 ng-show="site.subtitle">{{ site.subtitle }}</h2></hgroup>');
});
angular.module('main.footer.template', [])
.run(function($templateCache){
    $templateCache.put('main/footer', '<div class="Footer">&copy; {{ site.copyright }} {{ site.author }}</div>');
});
angular.module('main.navigation.template', [])
.run(function($templateCache){
    $templateCache.put('main/navigation', '<div class="Navigation"><ul><li><a ui-sref="blog.list">All Posts</a></li><li ng-repeat="path in site.index.pages"><a ui-sref="page({pagePath:site.link(path)})">{{ site.files[path].front.title }}</a></li></ul></div>');
});
angular.module('main.sidebar.template', [])
.run(function($templateCache){
    $templateCache.put('main/sidebar', '<div class="Sidebar"><section><h3>$state.$current</h3><dl><dt>name</dt><dd><pre>{{$state.$current.name}}</pre></dd><dt>url</dt><dd><pre>{{$state.$current.url.source}}</pre></dd></dl></section><section><h3>$stateParams</h3><pre>{{ $stateParams }}</pre></section></div>');
});