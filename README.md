# TravMcKinney.com

This is the portfolio site and blog of Designer and Web Developer [Travis McKinney](travmckinney.com).


## Installing Dependencies

### Less 

`npm install -g less`

### ImageMagick

`sudo port install ImageMagick`

## Running The Dev Server

I am using Foreman so that the dev server can run while Compass watches for changes. To run jekyll on your dev server run `foreman start`.

## Using Rake

I am using Rake to add blog posts, add projects to my portfolio, and deploy this site.

### Adding blog posts

To add a blog post run `rake post[post-name]`

### Adding portfolio projects

To add a project to the portfolio run `rake project[project-name]`

### Deploying

I am using a rake command with rsync and ssh to deploy this site. To deploy, add a file in the root called "_deployvariables.rb" where you can set `@ssh_user`, `@remote_root`, `@production_url` and `@staging_url` variables.

You will then be able to deploy using rake commands `rake deploy:production` or `rake deploy:staging`.

## Comments with Disqus

I have added comments using [Disqus](www.discus.com) in _layouts/blog.html

## TODO

- logo animation on hover
- custom case color schemes
- tenayo
- ces 2013
- sailthru annual report
- move rake tasks to grunt tasks

