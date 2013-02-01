# TravMcKinney.com

This is the portfolio site and blog of Designer and Web Developer [Travis McKinney](travmckinney.com).

## Dependencies

- Less
    npm install -g less

## Running The Dev Server

I am using Foreman so that the dev server can run while Compass watches for changes. To run jekyll on your dev server run `foreman start`.

## Using Rake

I am using Rake to add blog posts, add projects to my portfolio, and deploy this site.

### Adding blog posts

To add a blog post run `rake post[post-name]`

### Adding portfolio projects

To add a project to the portfolio run `rake project[project-name]`

### Deploying

I am using a rake command with rsync and ssh to deploy this site. To deploy, add a file in the root called "_deployvariables.rb" where you can set `ssh_user` and `remote_root` variables.

## Comments with Disqus

I have added comments using [Disqus](www.discus.com) in _layouts/blog.html