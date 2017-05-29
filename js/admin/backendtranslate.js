/*
 * Transposh v0.9.9.1
 * http://transposh.org/
 *
 * Copyright 2016, Team Transposh
 * Licensed under the GPL Version 2 or higher.
 * http://transposh.org/license
 *
 * Date: Sun, 15 May 2016 11:33:49 +0300
 */
(function(f){function u(b,c){p+=1;f("#progress_bar").progressbar("value",p/q*100);f("#p").text("("+c+") "+b);p===q&&f("#tr_loading").data("done",!0)}function h(b,c,d,a){c=f("<div>"+f.trim(c)+"</div>").text();u(c,d);clearTimeout(r);g+=1;k.push(b);l.push(c);m.push(d);n.push(a);r=setTimeout(function(){var a={action:"tp_translation",items:g},e;for(e=0;e<g;e+=1)k[e]!==k[e-1]&&(a["tk"+e]=k[e]),m[e]!==m[e-1]&&(a["ln"+e]=m[e]),l[e]!==l[e-1]&&(a["tr"+e]=l[e]),n[e]!==n[e-1]&&(a["sr"+e]=n[e]);f.ajax({type:"POST",
url:t_jp.ajaxurl,data:a,success:function(){},error:function(){}});g=0;l=[];k=[];m=[];n=[]},200)}function v(b,c,d){var a=d;"zh"===a?a="zh-chs":"zh-tw"===a&&(a="zh-cht");t_jp.dbt(c,function(a){f(a).each(function(a){h(b[a],this.TranslatedText,d,2)})},a)}function w(b,c,d){t_jp.dat(c,function(a){200<=a.responseStatus&&300>a.responseStatus&&(void 0!==a.responseData.translatedText?h(b[0],a.responseData.translatedText):f(a.responseData).each(function(a){200===this.responseStatus&&h(b[a],this.responseData.translatedText,
d,3)}))},d)}function x(b,c,d){t_jp.dgpt(c,function(a){f(a.results).each(function(a){h(b[a],this,d,1)})},d)}function y(b,c,d){t_jp.dyt(c,function(a){f(a.results).each(function(a){h(b[a],this,d,4)})},d)}function z(b,c,d){t_jp.dut(c,function(a){f(a.results).each(function(a){h(b[a],this,d,4)})},d)}function s(b,c,d){t_jp.preferred.some(function(a){if(-1!==t_be[a+"_langs"].indexOf(d))return"a"===a&&w(b,c,d),"b"===a&&v(b,c,d),"g"===a&&x(b,c,d),"y"===a&&y(b,c,d),"u"===a&&z(b,c,d),!0})}function t(b){var c=
"",d=[],a=[],h,e,g,k=0,l=[],m=[],n;f("#tr_loading").data("done",!1);f.ajax({url:ajaxurl,dataType:"json",data:{action:"tp_post_phrases",post:b},cache:!1,success:function(b){f("#tr_translate_title").html("Translating post: "+b.posttitle);if(void 0===b.length)f("#tr_loading").html("Nothing left to translate"),f("#tr_loading").data("done",!0);else{p=q=0;for(e in b.p)q+=b.p[e].l.length;f("#tr_loading").html('<br/>Translation: <span id="p"></span><div id="progress_bar"/>');f("#progress_bar").progressbar({value:0});
for(var r in b.langs){c=b.langs[r];a=[];d=[];for(e in b.p)g=b.p[e],-1!==g.l.indexOf(c)&&(a.push(unescape(e)),d.push(unescape(e)),g.l.splice(g.l.indexOf(c),1),0===g.l.length&&(b.length-=1,delete b.p[e]));if(a.length){for(h in a)n=a[h],k+n.length>A&&(s(m,l,c),k=0,l=[],m=[]),k+=n.length,m.push(d[h]),l.push(n);s(m,l,c)}}}}})}var r,g=0,l=[],k=[],m=[],n=[],A=512,q=0,p=0;window.translate_post=t;f(function(){t_be.post&&t(t_be.post)})})(jQuery);
