# wp-seed

WordPress seed theme using Bootstrap 3, Gulp and Bower

This is a simple Bootstrap seed theme with Bower and Gulp dependency and build management. I have removed all bloat and unnecessary code from this theme, so it doesn't have multilanguage support, widgets, sidebars or any other WordPress bloat. It should be considered a base theme for developing using Advanced Custom Fields and using WordPress as a pure CMS.

This utilises Yarn for dependency management - https://yarnpkg.com/

Once you have installed it, simply run:

	yarn   
	gulp

	gulp watch

And you should be good to go.

#### Javascript libraries I've included

* jQuery
* Bootstrap Sass
* Lightgallery
* Fontawesome
* Imagesloaded
* Slick Carousel
* Respond.js
* Enquire.js
* MatchHeight
* Cycle 2
* Isotope

Feel free to add your own via Bower. These may need to be connected up using the gulpfile. There is also a Babel workflow in the build pipeline.

#### Advanced Custom Fields

This theme probably requires Advanced Custom Fields Professional. Which if you don't have already, you should get.

Remove the contents of ```acf-json``` if you want to start from scratch. But this simply sets up some initial theme options.

#### General

The views folder is intended as a place to add content types for the theme.
