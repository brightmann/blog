module Jekyll
  class Site
    alias_method :orig_site_payload, :site_payload

    def site_payload
      result = orig_site_payload
      result["site"]["all_years"] = all_years
      result["site"]["categories"] = Hash[result["site"]["categories"].sort]
      result
    end

    private
    def all_years()
      years = Set[]
      for post in self.posts
        years << post.date.year
      end
      return Array(years).sort! {|x, y| y <=> x }
    end
  end

  module Filters
    def normalize_month(input)
      "%02d" % input.to_s
    end
  end

  class Post
    alias_method :orig_initialize, :initialize
    
    def initialize(site, source, dir, name)
      orig_initialize site, source, dir, name
      self.slug = data["slug"] if data["slug"]
    end
  end

end

