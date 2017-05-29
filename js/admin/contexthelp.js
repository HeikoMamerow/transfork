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
(function(a){a(".tp_help").live("click",function(b){b.preventDefault();window.scrollTo(0,0);a("#tab-link-"+jQuery(this).attr("rel")+" a").trigger("click");a("#contextual-help-link").hasClass("screen-meta-active")||a("#contextual-help-link").trigger("click")})})(jQuery);
