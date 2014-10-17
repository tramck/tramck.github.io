---              
layout: blog
title: The Guts of a Progress Bar
category: blog
---
When creating a single-page web app rather than a traditional multi-page web app, there is an increased amount of importance on giving the user visual feedback of the state of non-visual processes, namely data transfer. Traditionally, this visual feedback was in the form of the browser reloading the entire page. In today's single-page web app world we have our choice between loading animations, spinning gifs, or progress bars. 

Recently, while developing a single-page app I ran into the need to build a progress bar. While I wasn't sure the best way to approach it (and still am not), I think that I devised a clever solution. Here is what I did:

### HTML

The markup is super basic, so let's just start there. We have a `div.progress` that contains a `div.progress-bar`. That's all there is to the markup.

{% highlight html %}
<div class="progress">
  <div class="progress-bar"></div>
</div>
{% endhighlight %}

### CSS

Next, let's take a look at the styling (In LESS flavored CSS, sorry for the weird syntax highlighting).

> **Side note:** I'm using [Preboot](http://getpreboot.com/), a collection of LESS mixins and boilerplate code by Mark Otto. 

{% highlight css %}
.progress {
  position: absolute;
  top: 0;
  left: 0;
  .size(100%, 0px);
  background: #ccc;
  .transition(height 0.2s ease-in-out);

  &-bar {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    background: @red;
  }

  &.loading {
    height: 4px;

    .progress-bar {
      .transition(width 0.2s ease-in-out);
    }

  }

}
{% endhighlight %}

Most of the styling code is unimportant to this post and is pertinent to the actual app I am building (the design intent was that the bar would run along the very top of the page), but the main things to note are this: `div.progress` by default is hidden because we set it's `height` to `0px`; when `div.progress` has a class of `.loading` it grows to `4px` tall; `div.progress-bar` is positioned absolutely within `div.progress`, but also hidden because it has no width; when `div.progress` has a class of `.loading`, `div.progress-bar`'s `width` gets CSS transition properties applied to it. That's about it in terms of styling.

### JavaScript

The main meat of my solution is in the JavaScript. Below is a modified version of my actual code, I have tried to strip out everything that is not pertinent to this post, but some of it remains.

> **Side note:** I'm using jQuery for DOM manipulation / AJAX and the wonderful [Page.js](http://visionmedia.github.io/page.js/) for routing requests through the `load(ctx, next)` function.

{% highlight javascript %}
var $progress = $('.progress'),
    $bar = $progress.find('.progress-bar'),
    $contentWrapper = $('#content-wrapper');

function load(ctx, next) {
  $progress.addClass('loading');

  var randomNum = Math.random() * 100;

  var moveBar = setInterval(function() {
    $bar.width(randomNum + '%');
    randomNum = (randomNum + 100) / 2;
  }, 100);

  $contentWrapper.load(ctx.path + ' #content', function() {
    clearInterval(moveBar);
    $bar.width('100%');
    
    setTimeout(function() {
      $progress.removeClass('loading');
      $bar.width(0);
    }, 300);
    
    next();
  }); 
}
{% endhighlight %}

The first thing I want to note here that I know looks weird and probably even dated to many JavaScript developers reading this is that I'm using jQuery's `$.load` method to get HTML instead of `$.ajax` to get JSON or XML. This is primarily because my application requires a heavier importance on SEO, so I'm actually serving up the full page in HTML on load and then, when the user navigates, replacing the HTML within `div#content-wrapper` with the HTML from the page to which the user is navigating. Long story short, this can be replaced with any sort of loading method you wish to use, be it `$.ajax` or anything else. 

The next thing I want to note here is that there is no way, that I know of, in client-side JavaScript to retrieve percentage done of a data transfer. If anyone reading this knows a way, I would love to know! So the percentage that the progress bar is set to at any moment is a completely arbitrary value and in no way is an actual representation of the percentage of completion.

The first statement in this code caches all of our jQuery objects into variables. Next is our `load(ctx, next)` function. This is invoked as a callback from [Page.js](http://visionmedia.github.io/page.js/) when the user navigates to a route that matches my page.js route configuration (also not necessary, but just worth noting). When `load()` is invoked we first add the `.loading` class to `div.progress` to set its height to 4px and make it visible. Next we set `randomNum` to a random value between 0 and 100. We then fire up a `setInterval` that sets `div.progress-bar`'s width to the percentage value of `randomNum` and immediately reset the value of `randomNum` to the midway point between it and 100. This `setInterval` is saved in the variable `moveBar` and it's callback gets invoked every 100ms until the page load completes. 

> **Side note:** The 100ms value in the `setInterval` may need to be tweaked depending on the speed of your server and the amount of data you are transferring, but I found that 100ms was convincing enough for my particular case.

Once the page load completes, we clear the `moveBar` interval and set `div.progress-bar`'s width to 100%. Then we wait 300ms hide `div.progress` by removing the `.loading` class, and set `div.progress-bar`'s width to 0. 

That is essentially it. While this progress bar isn't an actual representation of the data transfer's completion percentage, I have found this solution to be convincing enough to work as visual feedback, however I would love to know other people's thoughts on this.