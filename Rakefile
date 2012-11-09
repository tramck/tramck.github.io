desc 'Make a new post'
task :post, [:name] do |t, args|
  if args.name
    template(args.name, "blog")
  else
    puts "Name required"
  end
end

desc 'Make a new project'
task :project, [:name] do |t, args|
  if args.name
    template(args.name, "work")
  else
    puts "Name required"
  end
end

desc "Builds and deploy"
task :deploy do
  #puts "*** Building the site ***"
  #system "jekyll --url http://travmckinney.com"
  #puts "*** Deploying the site ***"
  #system "rsync -avz --delete . #{ssh_user}:#{remote_root}/wp-content/themes/#{theme}/"
end

def template(name, type)
  t = Time.now
  contents = "" # otherwise using it below will be badly scoped
  File.open("_posts/#{type}/yyyy-mm-dd-template.md", "rb") do |f|
    contents = f.read
  end
  filename = "_posts/#{type}/" + t.strftime("%Y-%m-%d-") + name.downcase.gsub( /[^a-zA-Z0-9_\.]/, '-') + '.md'
  if File.exists? filename
    puts "Post already exists: #{filename}"
    return
  end
  File.open(filename, "wb") do |f|
    f.write contents
  end
  puts "created #{filename}"
end