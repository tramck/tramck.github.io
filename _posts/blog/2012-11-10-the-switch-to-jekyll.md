---              
layout: blog
title: The Switch to Jekyll
category: blog
excerpt: Jekyll is a static site generator built in ruby and the liquid templating system. I recently switched from Wordpress to Jekyll.
image: jekyll.png
---
[Jekyll](http://jekyllrb.com/) is a static site generator built in ruby and the [liquid templating system](http://liquidmarkup.org/). I recently switched from Wordpress to Jekyll. I did this for a few reasons:

* All of the data in my site can now be versioned in git ([see github repo](https://github.com/braznaavtrav/travmckinney-jekyll))
* Since the site is now just static html files, it's virtually hack-proof
* I can write all of my posts in markdown (I know wordpress does this too)
* I just wanted to try something that wasn't Wordpress

My experience switching over to Jekyll was slightly difficult at first. The [documentation on Jekyll](https://github.com/mojombo/jekyll/wiki) isn't very extensive and trying to figure out exactly what each piece of the framework does took some experimenting. The real magic of Jekyll comes into play when using the YAML front matter. With the YAML front matter you can specify categories, SEO stuff, featured images, basically tack on any variable you want to a post and use that data in your templates. Jekyll also makes it super easy to add new features by just writing them in ruby and storing the file in the \_plugins folder. As I said, it took some trial and error and it still isn't perfect, but all-in-all I'm really glad I switched.

Since switching to Jekyll I also started using Rake a whole lot more. If you look at the my Github repo you'll see that I have added a Rakefile to automate some of the tasks that are performed a lot like adding new posts and projects, and deploying. This has become a vital part of my use of Jekyll and I think that, without Rake, Jekyll wouldn't be as fun as it is.