<?php

/*
|--------------------------------------------------------------------------
| ERROR DISPLAY
|--------------------------------------------------------------------------
*/

// In development, we want to show as many errors as possible to help
// make sure they don't make it to production. And save us hours of
// painful debugging.
error_reporting(-1);
ini_set('display_errors', 1);

/*
|--------------------------------------------------------------------------
| DEBUG BACKTRACES
|--------------------------------------------------------------------------
| If true, this constant will tell the error screens to display debug
| backtraces along with the other error information. If you would
| prefer to not see this, set this value to false.
*/
define('SHOW_DEBUG_BACKTRACE', true);

/*
|--------------------------------------------------------------------------
| KINT
|--------------------------------------------------------------------------
| If true, will enable the Kint PHP Debugging tool and make it available
| globally throughout your application to use while making sure things
| work the way you intend them to.
*/
$useKint = true;

/*
|--------------------------------------------------------------------------
| DEBUG MODE
|--------------------------------------------------------------------------
| Debug mode is an experimental flag that can allow changes throughout
| the system. It's not widely used currently, and may not survive
| release of the framework.
*/

define('CI_DEBUG', 1);
