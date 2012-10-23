# Require any additional compass plugins here.
require 'bootstrap-sass'

# Set this to the root of your project when deployed:
http_path       = '/'
css_dir         = 'css'
sass_dir        = '_sass'
images_dir      = 'images'
javascripts_dir = 'js'

# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed
output_style = :nested

# To enable relative paths to assets via compass helper functions. Uncomment:
# relative_assets = true
relative_assets = false

# To disable debugging comments that display the original location of your selectors. Uncomment:
line_comments = false
#line_comments = true

# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass

# Possible to compile the Jekyll site after saving a stylesheet?
# It seems that there's a bug where sometimes Jekyll finishes compiling
# before Compass does, which means the stylesheet you get doesn't 
# always include your updates.

# on_stylesheet_saved do |filename|  
# end

# Write a YAML header on generated CSS so that Jekyll will process it
# on_stylesheet_saved do |filename|
#   content = File.read(filename).gsub("/* -- PLACEHOLDER FOR YAML INSERT -- */", "---\n---\n")
#   File.open(filename, "w") { |file| file.write(content) }
# end