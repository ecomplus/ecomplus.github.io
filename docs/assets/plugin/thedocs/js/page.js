
/*
|--------------------------------------------------------------------------
| Core
|--------------------------------------------------------------------------
|
| The start point of the project. Include jQuery, Bootstrap and required
| plugins and define page object. This file is required.
|
*/
require('./loaders/core.js');

/*
|--------------------------------------------------------------------------
| Vendors
|--------------------------------------------------------------------------
|
| Load some plugins and define initializer methods. If you don't need any
| of the following plugins, simply comment the line.
|
| The minified size of each module has stated for your reference. So you'd
| know how much KB you can save by removing a vendor.
|
*/
//require('./vendors/aos.js');            // 14 kb


/*
|--------------------------------------------------------------------------
| Partials
|--------------------------------------------------------------------------
|
| Split the application code to several files. This file is required.
|
*/
require('./loaders/partials.js');
