<?php

/*
  Plugin Name: Transposh Isocode List
  Plugin URI: https://github.com/HeikoMamerow/transposh-primer
  Description: List of isocodes from all active transposh languages
  Author: Heiko Mamerow
  Version: 1.1.0
  Author URI: https://heikomamerow.de
  License: GPL (http://www.gnu.org/licenses/gpl.txt)
 */

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

/*
 * Want to write your own widget? - visit the wiki page on widgets http://trac.transposh.org/wiki/WidgetWritingGuide
 */



class tpw_primer_isocodes extends transposh_base_widget {

	static function tp_widget_do($args) {

        	foreach ($args as $langrecord) {
        	
	        	if ($langrecord['isocode'] !== 'en') {

				echo "\"" . $langrecord['isocode'] . "\",";
			}
		}
	}
}

?>
