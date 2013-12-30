---
author: admin
comments: true
date: 2011-08-27 02:57:57+00:00
layout: post
slug: php-stack-trace
title: PHP Stack Trace
wordpress_id: 200
categories:
- Technology
tags:
- php
- stack trace
---

With the lack of an easy PHP debugger, it seems a lot of web developers think the best way to debug PHP is excessive print and log statements. I am one of those. I plod along with var_dumps and echos. I wanted a stack trace, and so I put this little guy together.

```php
/**
 * Print a quick stack trace.
 */
public static function trace() {
	ob_start();//Buffer output. Output buffers work on a stack, so this OB will be specific to our debug routine.
echo "\n";
	echo "<div class=debug>\n";
	echo "\t<div class=trace>\n";

	$trace = debug_backtrace();//Get a stack trace to this point. Includes the current frame so we know where Debug() was called.
	foreach($trace as $id => $frame)
	{	//Let's pull the data for each frame.
		if(isset($frame['file']) AND !empty($scope) AND !stristr($frame['file'], $scope))
		{	// Not enough data?
			continue;
		}

		$function = "{$frame['function']}()";
		if(isset($frame['class']))
		{	//Grab the class
			$function = "{$frame['class']}{$frame['type']}{$function}";
		}
		$at = " at unknown";
		if(isset($frame['file']))
		{	//The filename
			$at = " at {$frame['file']}";
		}

		if(isset($frame['line']))
		{	//And the line number
			$at .= "::{$frame['line']}";
		}

		echo "\t\t<div class=frame>#{$id}: {$function}{$at}</div>\n";
	}
	echo "\t</div>\n";//class=trace

	echo "</div>\n";//class=debug
	return ob_get_clean();
}	//trace
```

I have seen DBG and xdebug, but have been dissuaded by their seeming complexity. If anyone has a good reference, please share it!
