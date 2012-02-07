(function () {
    function merge(a, b) {
        var result = a;
        for (var property in b) {
            if (b.hasOwnProperty(property)) {
                result[property] = b[property];
            }
        }
        return result;
    }

    // Module Map
    var modules =
    {
        "jquery": "http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min",
        "audio.js": "http://kolber.github.com/audiojs/audiojs/audio",
        "twitter-widgets": "http://platform.twitter.com/widgets",
        "twitterjs": "http://twitterjs.googlecode.com/svn/trunk/src/twitter.min",
        "sharethis": "http://w.sharethis.com/button/buttons",
    };

    // Configuration
    require({
        baseUrl: "/scripts",
        paths: modules,
        waitSeconds: 15,
        deps: ["jquery"]
    });
})();

// Sharethis button

function Initialize() {
  window.switchTo5x = true;
  
  // Sharethis button
  require(["sharethis"], function() {
    stLight.options({publisher: "bf8855c0-9a27-4acf-b8f4-b366c2085e79", onhover: false});
  });
}

function Startup(username) {
  // disqus comments
  (function() {
    disqus_shortname = username;
    
    var LoadScript = function(url) {
      require([url]);
    };

    // Post comments
    $("#comments").each(function() {
      disqus_identifier = $(this).attr("identifier");
      $(this).append($("<div>", {id: "disqus_thread"}));
      
      LoadScript('http://' + username + '.disqus.com/embed.js');
    });

    $("#recent_comments").each(function() {
      $(this).addClass("dsq-widget");
      LoadScript('http://' + username + '.disqus.com/recent_comments_widget.js'
            + '?num_items=10'
            + '&hide_avatars=1&avatar_size=24&excerpt_length=50;');
    });

    // Comment count
    LoadScript('http://' + username + '.disqus.com/count.js');
  })();

  // Twitter
  require(["twitter-widgets", "twitterjs"], function() {
    getTwitters('tweets', { 
      id: username, 
      count: 5, 
      enableLinks: true, 
      ignoreReplies: true, 
      clearContents: true,
      template: '%text% - %time%'
    });
  });
}