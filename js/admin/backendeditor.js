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
(function(a){a(function(){a.ajaxSetup({cache:!1});a(".delete").click(function(){var c=this,b=a(this).children().attr("href");console.log(b);a.ajax({url:b,dataType:"json",cache:!1,success:function(b){b?a(c).parents("tr").hide():a(c).parents("tr").css("background-color","red")}});return!1})})})(jQuery);
