---              
layout: blog
title: Backbone-like JavaScript Router
category: blog
---
For my own personal use, tonight I created this quick little script to handle routing in JavaScript much like a stripped down version of the Backbone router. It doesn't deal with the HTML5 History API, but only checks the url to see if it matches any of the keys passed in to the router method and runs the correlating method contained within the object that the router method is being run from.

{% highlight javascript %}
var MyRouter = {
 
  init: function () {
    this.router({
      '/': 'homePage',
      '/products/:name': 'productPage',
      '/collections/:name/:id': 'collectionPage'
    });
  },
 
  router: function (obj) {
    var location = window.location.pathname;
    // remove trailing slash from location
    if (location.substr(location.length - 1) == "/" && location.length != 1) {
      location = location.slice(0, -1);
    }
    location = location.split('/');
    // loop through routes object    
    for (var key in obj) {
      // create array of the target url    
      var route = key.split('/'),
      test = [],
      wildcards = '',
      hasWildcard = false;
      // loop through target url array
      $(route).each( function(i) {
        if (location[i] == this || this.charAt(0) == ':') {
          test.push(true);
          if (this.charAt(0) == ':') {
            hasWildcard = true;
            wildcards += ', ' + location[i];
          }
        }
        else {
          test.push(false);
        }
      });
      // if route is an exact match      
      if (!(test.indexOf(false) > -1) && location.length == route.length) {
        // if route has any /:wildcard declarations
        if (hasWildcard) {
          var wildcardsArray = wildcards.split(', ');
          wildcardsArray.shift();
          // pass wildcards in to function as arguments          
          this[obj[key]].apply(this, wildcardsArray);
        }
        else {
          // run routes targeted function
          this[obj[key]]();
        }
      }
    }
  },
 
  homePage: function () {
    console.log("HOME");
  },
 
  productPage: function(name) {
    console.log("productPage");
    console.log(name);
  },
 
  collectionPage: function(name, id) {
    console.log("collectionPage");
    console.log(name);
    console.log(id);
  }
};
 
MyRouter.init();
{% endhighlight %}

If I get the time, I may end up building a jQuery plugin using this as a base.

> **Edit:** I used the above js as a base logic for a [small routing library](http://travmckinney.com/RouterJS/).
