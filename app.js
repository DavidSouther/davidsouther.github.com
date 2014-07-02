(function() {
  angular.module('flipflops.content.blog.list', ['ui.router', 'flipflops.content.blog.list.controller', 'content.blog.list.template']).config(function($stateProvider) {
    return $stateProvider.state('blog.list', {
      url: '/posts/',
      controller: 'BlogListCtrl',
      templateUrl: 'content/blog/list'
    });
  });

}).call(this);

(function() {
  angular.module('flipflops.content.blog', ['ui.router', 'flipflops.content.blog.list', 'flipflops.content.blog.post']).config(function($stateProvider) {
    return $stateProvider.state('blog', {
      template: "<div ui-view></div>"
    });
  });

}).call(this);

(function() {
  angular.module('flipflops.content.blog.post', ['ui.router', 'flipflops.content.blog.post.controller', 'content.blog.post.template']).config(function($stateProvider) {
    return $stateProvider.state('blog.post', {
      url: '/posts/*blogPath',
      controller: 'BlogPostCtrl',
      templateUrl: 'content/blog/post'
    });
  });

}).call(this);

(function() {
  angular.module('flipflops.content.home', ['ui.router', 'content.home.template']).config(function($stateProvider) {
    return $stateProvider.state('home', {
      url: '/',
      templateUrl: 'content/home'
    });
  });

}).call(this);

(function() {
  angular.module('flipflops.content', ['flipflops.content.home', 'flipflops.content.blog', 'flipflops.content.pages']);

}).call(this);

(function() {
  angular.module('flipflops.content.pages', ['ui.router', 'flipflops.content.pages.controller', 'content.pages.template']).config(function($stateProvider) {
    return $stateProvider.state({
      name: 'page',
      url: '/*pagePath',
      controller: 'PageCtrl',
      templateUrl: 'content/pages'
    });
  });

}).call(this);

(function() {
  angular.module('flipflops', ['ui.router', 'flipflops.site.controller', 'flipflops.banner.directive', 'flipflops.navigation.directive', 'flipflops.sidebar.directive', 'flipflops.footer.directive', 'flipflops.content']).config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    return $urlRouterProvider.otherwise('/');
  });

}).call(this);

(function() {
  angular.module('flipflops.renderer', []).provider('Renderer', function() {
    var Renderer, options;
    options = {
      renderer: marked.Renderer,
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false
    };
    this.updateOptions = function(opts) {
      return options = angular.extend(options, opts);
    };
    Renderer = function($q) {
      options.renderer = new options.renderer();
      marked.setOptions(options);
      return {
        render: function(src) {
          var content, defer;
          defer = $q.defer();
          content = marked(src);
          defer.resolve(content);
          return defer.promise;
        }
      };
    };
    Renderer.$inject = ['$q'];
    this.$get = Renderer;
  });

}).call(this);

(function() {
  var Site;

  Site = (function() {
    function Site(promise) {
      this.loaded = promise.then((function(_this) {
        return function(response) {
          angular.extend(_this, response.data.site);
          _this.files = angular.extend({}, response.data.files);
          _this.buildIndex();
          return _this;
        };
      })(this));
    }

    Site.prototype.buildIndex = function() {
      angular.forEach(this.files, function(file, path) {
        return file.path = path;
      });
      this.index = {
        files: Object.keys(this.files),
        posts: Object.keys(this.files).filter(function(_) {
          return _.indexOf('/posts/') === 0;
        }),
        pages: Object.keys(this.files).filter(function(_) {
          return _.indexOf('/pages/') === 0;
        })
      };
      this.posts = this.index.posts.reduce(((function(_this) {
        return function(a, f) {
          a.push(_this.files[f]);
          return a;
        };
      })(this)), []);
      return this.pages = this.index.pages.reduce(((function(_this) {
        return function(a, f) {
          a.push(_this.files[f]);
          return a;
        };
      })(this)), []);
    };

    Site.prototype.link = function(file) {
      return (file || '').replace('/pages/', '').replace('/posts/', '').replace('index.md', '').replace('index.markdown', '');
    };

    Site.prototype.findNoIndex = function(path) {
      return this.files["" + path + "index.md"] || this.files["" + path + "index.markdown"] || this.files["" + path + "/index.md"] || this.files["" + path + "/index.markdown"] || null;
    };

    Site.prototype.find = function(path) {
      if (path.indexOf('/posts/') !== 0) {
        path = "/pages/" + path;
      }
      return this.findNoIndex(path);
    };

    return Site;

  })();

  angular.module('flipflops.site', []).provider('Site', function() {
    var config, siteFactory;
    config = '/site.json';
    this.configPath = function(_) {
      return config = _;
    };
    siteFactory = function($http) {
      var promise;
      promise = $http.get(config);
      return new Site(promise);
    };
    siteFactory.$inject = ['$http'];
    this.$get = siteFactory;
  });

}).call(this);

(function() {
  angular.module('flipflops.content.blog.list.controller', ['ui.router', 'flipflops.site']).controller('BlogListCtrl', function($scope, Site, $stateParams) {});

}).call(this);

(function() {
  angular.module('flipflops.content.blog.post.controller', ['ui.router', 'flipflops.site', 'flipflops.renderer']).controller('BlogPostCtrl', function($scope, Site, $stateParams, Renderer, $sce) {
    var link, path;
    $scope.content = '';
    path = "/posts/" + $stateParams.blogPath;
    Site.loaded.then(function() {
      var file;
      file = Site.find(path);
      $scope.front = file.front;
      file.front.date = new Date(file.front.date);
      link(file);
      return Renderer.render(file.body).then(function(content) {
        return $scope.content = $sce.trustAsHtml(content);
      });
    });
    return link = function(file) {
      var index;
      index = Site.index.posts.indexOf(file.path);
      if (index > 0) {
        $scope.previous = Site.files[Site.index.posts[index - 1]];
      }
      if (index < Site.index.posts.length - 1) {
        return $scope.next = Site.files[Site.index.posts[index + 1]];
      }
    };
  });

}).call(this);

(function() {
  angular.module('flipflops.content.pages.controller', ['ui.router', 'flipflops.site', 'flipflops.renderer']).controller('PageCtrl', function($scope, Site, $stateParams, Renderer, $sce) {
    return Site.loaded.then(function() {
      var file;
      file = Site.find($stateParams.pagePath);
      $scope.front = file.front;
      file.front.date = new Date(file.front.date);
      return Renderer.render(file.body).then(function(content) {
        return $scope.content = $sce.trustAsHtml(content);
      });
    });
  });

}).call(this);

(function() {
  angular.module('flipflops.site.controller', ['flipflops.site']).controller('Site', function($scope, Site) {
    return $scope.site = Site;
  });

}).call(this);

(function() {
  angular.module('flipflops.banner.directive', ['main.banner.template']).directive('ffHeader', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'main/banner'
    };
  });

}).call(this);

(function() {
  angular.module('flipflops.footer.directive', ['main.footer.template']).directive('ffFooter', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'main/footer'
    };
  });

}).call(this);

(function() {
  angular.module('flipflops.navigation.directive', ['main.navigation.template']).directive('ffNavigation', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'main/navigation',
      controller: function($scope) {
        return $scope.isPost = function(_) {
          console.log(arguments);
          return _.indexOf('/posts/') === 0;
        };
      }
    };
  });

}).call(this);

(function() {
  angular.module('flipflops.sidebar.directive', ['main.sidebar.template']).directive('ffSidebar', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'main/sidebar',
      controller: function($scope, $state, $stateParams) {
        $scope.$state = $state;
        return $scope.$stateParams = $stateParams;
      }
    };
  });

}).call(this);
