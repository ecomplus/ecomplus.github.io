
/*
|--------------------------------------------------------------------------
| Core
|--------------------------------------------------------------------------
|
| The start point of the project. Include jQuery, Bootstrap and required
| plugins and define page object. This file is required.
|
*/
require('../../plugin/thedocs/js/loaders/core.js');


/*
|--------------------------------------------------------------------------
| Partials
|--------------------------------------------------------------------------
|
| Split the application code to several files. This file is required.
|
*/
require('../../plugin/thedocs/js/loaders/partials.js');


/*
|--------------------------------------------------------------------------
| Configure
|--------------------------------------------------------------------------
|
| Modify some variables to personalize your project. This file is required.
|
*/
require('./config.js');


/*
|--------------------------------------------------------------------------
| Custom script
|--------------------------------------------------------------------------
|
| Write your custom JavaScrip code. Feel free to split your code to several
| files and import the other files here or inside script.js.
|
*/
require('./script.js');
