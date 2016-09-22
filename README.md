# Wordpress Composer Framework

![Badge](https://img.shields.io/github/issues/asha23/wp-composer-base.svg)
![Badge](https://img.shields.io/github/forks/asha23/wp-composer-base.svg)

This assumes prior knowledge of how to set up WordPress themes. Feel free to make improvements to this - Or drop me a comment if you have any issues.

This framework is not considered to be production ready at the moment. But should be OK in most circumstances. It is essentially a less complex version of Bedrock and has been inspired by those methodologies - And as such, is an experimental framework for demonstration purposes only.

Take a look at Bedrock if you want a more robust/production ready method.

It can be considered Version 0.2 Alpha.

## Basic installation instructions

* Create a new repository for your project
* Download this as a zip file and unzip into the repository
* Browse to this folder and duplicate ```local-config-sample.php``` - rename it to local-config.php
* Look in ```web/wp-config.php``` and set your environment variables.
* Look in ```/xxx-config.php```and set your database information
* Open a terminal and browse to the folder you are using
* Install Composer
* Install Node
* Install Bower
* Once you have Composer installed, then you need to run ```$ composer install```. This will install all the base plugins and a seed theme into the correct directories.
* Send an initial commit to your repository
* Get started - Or have a beer.


Requirements
============

You should get a license for Advanced Custom Fields pro for this framework.
Migrate DB Pro is also recommended. Because these are paid plugins we have not included them by default.

Getting started
===============

This uses a version of Scotchbox for Vagrant:  
Run ```vagrant up``` from the root folder (Not currently tested) - Your website will then be available on

```
192.168.33.10
```

#### The following information should be used to connect to the database


MySql Host: 127.0.0.1  
Username: root  
Password: root

SSH Host: 192.168.33.10  
SSH User: vagrant  
SSH Password: vagrant  

Alternatively, just use MAMP.

# Theme Setup

First off, navigate to the themes folder. ```web/content/themes/wp-seed```. You should rename this to reflect the project name and change the information in styles.css

You will need node.js and npm installed on your computer before starting: https://nodejs.org/en/

You will also need to install Gulp globally if it's not already installed on your machine.

    $ npm install gulp -g

Install bower if it's not already installed on your machine

    $ npm install -g bower
	


## Notes about the seed theme

[You can view the seed theme repo here](https://github.com/asha23/wp-seed)



This is a customised version of WordPress. We have separated out the WordPress core from the content.

Below are some instructions to get started. This theme uses node.js building system and Bower for JavaScript dependency management. It is also based around SASS Bootstrap.

You should have been supplied with our front-end development guidelines. Please work to these as much as possible.

The main folder structure is as follows:

```
web/content
web/wp
```

The content folder contains all the themes, plugins and files for the front-end.

The wp folder is the base WordPress installation - You should not change anything in here.


Step by step:
------------------------------------------------

This base theme uses Gulp by default.

In your terminal, cd into your theme directory and execute

    $ bower install
    $ npm install

This will get everything set up, ready for you to start developing with this theme.


Gulp commands
------------

    $ gulp watch
    $ gulp images
    $ gulp

```
gulp watch
```

will start the watch task and

```
gulp images
```

will run an image optimisation on the images folder (useful before deployment) - Run

```
gulp
```

on it's own to do the tasks once.


wp-seed Folder Structure
================

Inside the theme, you will find the following structure. This assumes you know a bit about WordPress theming techniques. It's essentially a bare bones sensible structure.

/acf-json
--------

This is for use with Advanced Custom Fields. You will find some fields already set up here for dealing with global site options. Use as you wish.

/build
-----

This is the build folder for deployment. You will find the images and fonts folder in here. You shouldn't save anything else into this folder, as Gulp will compile everything for you

/includes
--------

This is all the core theme php. Files in here are included from the site's root functions.php file. Generally speaking you shouldn't need to edit anything in here apart from custom-post-types.php and menus.php - There is a helper-functions.php file which you can add any handy snippets to.

/library
-------

This is where you can edit your ```styles.scss``` file and also ```scripts.js``` - This is also where all the Bower components are added.

/views
-----

If you use WordPress Template parts correctly (or standard php includes if you'd prefer), you can separate site content into this views folder.

/bower
------

This will automatically be added as soon as you run ```bower install```.



Notes on the Gulpfile.js
========================

This file contains all the path structures for connecting up your Bower dependencies, it's relatively straightforward to create links to any new Bower components and dependencies you want to add to the compilation process.

We pull the scripts into the ```js/vendor-libs``` folder and then compile them into ```scripts.min.js``` in the build folder. You could, if you prefer, directly reference the ```/bower``` folder for the file paths and skip this step.

Generally speaking, these paths are the only things you should need to touch inside this file, but if you know a better way of doing some of the tasks inside here, then feel free to adjust it to suit your working methods (Please clearly comment any changes though) - This Gulpfile is a work in progress, so if you come across any better ways of doing things in here, then feel free to add them.



Notes on using Bower for dependency management
==============================================

Where possible, you should use Bower for any JavaScript or css modules you want to add to this theme. A lot of commonly used libraries and frameworks are now part of the Bower ecosystem. This will make sure that all your dependencies remain intact and that you are always using the most up-to-date version of the library.

If you haven't been to a project in a while it's worth running a bower update periodically.



General notes
==============================================

```/node_modules```, ```/library/bower``` ```wp-config``` and many other files are ignored. You shouldn't include these folders in the deployment as it will cause unnecessary bloat. It is preferable that you pull to staging or live from the repository, rather than uploading files via ftp.
