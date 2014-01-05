---
layout: post
title: "AngularJS Mock Render"
date: 2014-01-05 11:30:00 -0500
categories: 
- Technology
tags:
- angularjs
- testing
- mocks
---

We test. A lot. We have quite a few directives. We're using this mock render
function to quickly test those directives. It takes the simple html name of the
directive, an object with any parent scope properties, an object with any DOM
attributes to set, and a string to use for transclusion: `render(directive,
data = {}, attributes = {}, transclude = "")`

<!-- more -->

```coffeescript render.coffee
toKeyVal = (attributes, separator = ' ')->
    ("#{key} = \"#{val}\"" for key, val of attributes)
        .join separator

if angular.mock
    window.render = angular.mock.render =
    (directive, data = {}, attributes = {}, transclude = "")->
        $element = null
        inject ($compile, $rootScope)->
            $scope = $rootScope.$new()
            $scope[key] = val for key, val of data
            attributes = toKeyVal attributes

            template = $compile(
                "<div #{directive} #{attributes}>#{transclude}</div>"
            )
            $element = template($scope)

            try $scope.$digest()
        $element
```

Its usage is pretty straight forward. Here, we are testing a directive that
emits some event when it has finished rendering data received from the
$httpBackend (configued elsewhere). We render the element, listen for the render
event when we'll run our test assertions, and flush the http backend to force
Angular to digest all the changes in the app. In this way, our test setup and
action phases are drastically simplified. Our test code shows the assertions our
business demands, not the setup our platform happens to use.

```coffeescript
should = chai.should()
describe 'Performance Overview', ->

    describe 'directive', ->

        beforeEach module 'nv-waves'

        it 'has some chart stuff.', -> inject ($rootScope, $httpBackend)->
            $element = render 'performance-summary'

            $rootScope.$on 'Wave Rendered', ->
                $element.find('svg').length.should.equal 2
                $element[0].querySelectorAll('.chart').length.should.equal 2
                $element[0].querySelectorAll('.grid').length.should.equal 2
                $element.scope().data.header.sortable.should.equal true

            $httpBackend.flush()
```
