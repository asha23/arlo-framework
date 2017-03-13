# Arlo
### A Wordpress/Composer framework.

[![GitHub issues](https://img.shields.io/github/issues/asha23/arlo-framework.svg)](https://github.com/asha23/arlo-framework/issues) [![GitHub forks](https://img.shields.io/github/forks/asha23/arlo-framework.svg)](https://github.com/asha23/arlo-framework/network) [![GitHub stars](https://img.shields.io/github/stars/asha23/arlo-framework.svg)](https://github.com/asha23/arlo-framework/stargazers) [![Twitter](https://img.shields.io/twitter/url/https/github.com/asha23/arlo-framework.svg?style=social)](https://twitter.com/intent/tweet?text=Wow:&url=%5Bobject%20Object%5D)

This assumes prior knowledge of how to set up WordPress themes. Feel free to make improvements to this.

It's very (very) loosely based on Bedrock, but with a much more simplified method for differentiating between dev/staging/production databases. I found that for most of my working practice I simply didn't need a lot of what Bedrock offered and decided to use it's methodologies as a starting point, but keep it a hell of a lot simpler.

If you like Bedrock, then great! It's pretty awesome, so fill your boots. But if you find it a little overcomplicated and a tiny bit bloated like I do, then this framework/approach might be more up your alley.

You can get up and running with a complete WordPress environment in about a minute.

## Basic installation instructions

* Create a new repository for your project
* Download this as a zip file and unzip into the repository - https://bitbucket.org/this-is-pegasus-team/pegasus-wordpress-composer/get/master.zip
* Open a terminal and browse to the folder you are using
* Install Composer - https://getcomposer.org/
* Install Node - https://nodejs.org/en/
* Install Bower - https://bower.io/
* Install Yarn - https://yarnpkg.com/
* Rename .env-example to .env and fill out the relevant fields.
* Once you have Composer installed, then you need to run ```$ composer install```. This will install all the base plugins and a seed theme into the correct directories.
* Send an initial commit to your repository
* Get started.

You can alternatively create a fork of this framework. If you want the composer file to stay up to date.


Requirements
============

You should get a license for Advanced Custom Fields pro for this framework.

Getting started
===============

There is a Vagrant file in the folder which uses a version of Scotchbox for Vagrant:  
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

Alternatively, just use MAMP. Or something like https://www.themejuice.it, which provides an excellent and user-friendly environment for locally developing with WordPress. Or any other method you like for deploying locally.

Vagrant is the recommended method as it keeps everything self contained.


## .env-example file

There is a .env-example file in the root. You should fill out the relevant information in this file and then re-save it as .env. Once you have done this, you can then edit the web/wp-config.php file and add salts, or do other configurations.

There is information for 3 environments contained here, development, production and staging. Filling out this information correctly will make sites easier to deploy as it will auto-detect which database to use depending on your environment.

## Notes on the .gitignore.

This installation by default ignores everything but your theme. You will need to create a deployment of wordpress on your production environment and run composer install. 

If you can't do this simply upload the files as required. I decided to not include all the WordPress stuff in the repo because in the most part it's an uneccesary step really.

Feel free to edit the .gitignore file though if you want to change this.


## Notes about the seed theme

[You can view the seed theme repo here](https://github.com/asha23/wp-seed)

This theme uses Gulp for compilation and Bower for JavaScript dependency management. It is also based around SASS Bootstrap 3.

The main folder structure is as follows:

```
web/content
web/wp
```

The content folder contains all the themes, plugins and files for the front-end.

The wp folder is the base WordPress installation - You should not change anything in here.

# Theme Setup

First off, navigate to the themes folder. ```web/content/themes/wp-seed```. You should rename this to reflect the project name and change the information in styles.css

You will need node.js, npm and Yarn installed on your computer before starting:

https://nodejs.org/en/   
https://yarnpkg.com/

You should install Gulp globally if it's not already installed on your machine.

    $ yarn add gulp -g

Install bower if it's not already installed on your machine

    $ yarn add -g bower


Step by step:
------------------------------------------------

The seed theme uses Gulp and Yarn for dependency management. Yarn is a dependency manager created by Facebook and it seems to be way faster than using npm. It will pick up all your npm dependencies and use them, so it's very similar

In your terminal, cd into your theme directory and execute

    $ bower install
    $ yarn

This will get everything set up, ready for you to start developing with the theme.


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

This is for use with Advanced Custom Fields. You will find some fields already set up here for dealing with global site options. Use as you wish. You should make sure that you have Advanced Custom Fields Pro installed.

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

Generally speaking, these paths are the only things you should need to touch inside this file, but if you know a better way of doing some of the tasks inside here, then feel free to adjust it to suit your working methods - This Gulpfile is a work in progress.



Notes on using Bower for dependency management
==============================================

Where possible, you should use Bower for any JavaScript or css modules you want to add to this theme. A lot of commonly used libraries and frameworks are now part of the Bower ecosystem. This will make sure that all your dependencies remain intact and that you are always using the most up-to-date version of the library.

If you haven't been to a project in a while it's worth running a ```bower update``` periodically.



General notes
==============================================

```/node_modules```, ```/bower``` ```wp-config``` and many other files are ignored. You shouldn't include these folders in the deployment as it will cause unnecessary bloat. It is preferable that you pull to staging or live from the repository, rather than uploading files via ftp.

Arlo is the name of my 10 month old son.
