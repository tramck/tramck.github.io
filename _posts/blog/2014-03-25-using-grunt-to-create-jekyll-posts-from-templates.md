---              
layout: default
title: Using Grunt to Generate Jekyll Posts From Templates
category: blog
---
I have started using [Grunt](http://gruntjs.com/) more and more in my projects. Usually, I use it only to compile [LESS](http://lesscss.org/) to CSS, [coffeescript](http://coffeescript.org) (when I'm using it) to javascript, and concatenate and minify my javascript. I have really enjoyed using it way more than [Codekit](https://incident57.com/codekit/), which I had been using previously to do all this, because of its ease of customization and the number of plugins there are for it. You can find a Grunt plugin for nearly any need. 

Before I started using Grunt with this site, I had a [Rakefile](https://github.com/braznaavtrav/braznaavtrav.github.io/blob/941ae93d5dee7492dd956e990de40746c7270179/Rakefile) set up to handle creating new posts from templates and to run deploy tasks. I no longer need the deploy tasks since I am now hosting this on [Github](https://github.com/braznaavtrav/braznaavtrav.github.io) and I figured it would be easy enough to build a Grunt task similar to my Rake tasks to handle generating new posts, therefore only using one task runner system instead of two disjointed ones. 

So I did just that:

{% highlight javascript %}
grunt.task.registerTask('post', 'Create new jekyll posts from templates.', function() {
  var name = grunt.option('name'),
      category = grunt.option('cat'),
      date = new Date(),
      today = grunt.template.date(date, 'yyyy-mm-dd'),
      template,
      formatedName,
      data,
      content;

  if (name) {
    formatedName = name.replace(/[^a-z0-9]|\s+|\r?\n|\r/gmi, '-').toLowerCase();
    category = category ? category : 'blog';
    data = {
      name: name,
    };
    template = grunt.file.read('_post-template-' + category + '.md');
    content = grunt.template.process(template, {
      data: data
    });
    grunt.file.write('_posts/' + category + '/' + today + '-' + formatedName + '.md', content);
  }
  else {
    grunt.fail.warn('Name Required: `grunt post --name "My Post Name"`');
  }
});
{% endhighlight %}

With this, I can run `grunt post --name "My Post Title"` and a new markdown file with today's date and title will be created in my `_posts/blog` folder. If I want to create a post under the `_posts/work` folder, all I have to do is specify the category as work, like this: `--cat work`.

In doing this, I found it especially nice that Grunt has it's own built in file system class, so there was no need to use [fs](http://nodejs.org/api/fs.html). I will probably end up either refactoring this code, making it more flexible, and turning it into a Grunt plugin or making a pull request to [grunt-jekyll](https://github.com/dannygarcia/grunt-jekyll). I think it makes more sense to do the former, because the grunt-jekyll plugin really only deals with running the `jekyll` command.