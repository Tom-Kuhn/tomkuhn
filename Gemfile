source "https://rubygems.org"

# Jekyll 4 is required for Ruby 4.0 compatibility.
# The legacy github-pages gem pins Liquid to 4.0.3 which calls String#tainted?,
# a method removed in Ruby 3.2. Jekyll 4 pulls in Liquid 4.0.4+ which is patched.
# GitHub Pages deployment is handled via the Actions workflow in .github/workflows/.
gem "jekyll", "~> 4.4"

# Ruby 4.0 removed several gems from the standard library.
gem "csv"
gem "bigdecimal"
gem "base64"
gem "logger"
gem "ostruct"

group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.12"
end

platforms :mingw, :x64_mingw, :windows, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

gem "wdm", "~> 0.1", :platforms => [:mingw, :x64_mingw, :windows]
