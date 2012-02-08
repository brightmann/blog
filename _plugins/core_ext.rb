module Jekyll
  class Post
    alias_method :orig_initialize, :initialize
    
    def initialize(site, source, dir, name)
      orig_initialize site, source, dir, name
      self.slug = data["slug"] if data["slug"]
    end

  end
end