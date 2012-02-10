module Jekyll
  class CodeBlock < Liquid::Block
    def initialize(tag_name, markup, tokens)
      super tag_name, markup, tokens
      if markup =~ /\s*(\w+)\s*/i
        @lang = $1
      end
      @lang = nil
      if markup =~ /\s*(\w+)\s*/i
        @lang = $1
      end
    end

    def render(context)
      output = super
      source= "<pre lang='#{@lang}'>"
      source += "#{output.lstrip.rstrip.gsub(/</,'&lt;')}</pre>"
      source
    end

  end
end

Liquid::Template.register_tag('code', Jekyll::CodeBlock)
