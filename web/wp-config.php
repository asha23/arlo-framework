<?php
require_once(dirname(__DIR__) . '/vendor/autoload.php');

$root_dir = dirname(__DIR__);
$webroot_dir = $root_dir . '/web';

Env::init();
/**
 * Use Dotenv to set required environment variables and load .env file in root
 */
$dotenv = new Dotenv\Dotenv($root_dir);
if (file_exists($root_dir . '/.env')) {
    $dotenv->load();
    $dotenv->required([
			'DEV_DB_NAME',
			'DEV_DB_USER',
			'DEV_DB_PASSWORD',
			'DEV_DB_HOST',
			'STAGING_DB_NAME',
			'STAGING_DB_USER',
			'STAGING_DB_PASSWORD',
			'STAGING_DB_HOST',
			'PRODUCTION_DB_NAME',
			'PRODUCTION_DB_USER',
			'PRODUCTION_DB_PASSWORD',
			'PRODUCTION_DB_HOST',
			'WP_DEV',
			'WP_STAGING',
			'WP_PRODUCTION',
			'WP_PRODUCTION_FULL'
		]);

} else {
	print_r('initialisation failed');
}

$dev_url = env('WP_DEV');
$staging_url = env('WP_STAGING');
$production_url = env('WP_PRODUCTION');
$production_url_full = env('WP_PRODUCTION_FULL');

// ===================================================
// Load database info and environment paramaters
// ===================================================

switch($_SERVER['SERVER_NAME']) {

    case $dev_url:
		define( 'WP_LOCAL_DEV', true );
		define( 'DB_NAME', env('DEV_DB_NAME') );
		define( 'DB_USER', env('DEV_DB_USER') );
		define( 'DB_PASSWORD', env('DEV_DB_PASSWORD') );
		define( 'DB_HOST', env('DEV_DB_HOST') );
    break;

	// Staging server settings
    case $staging_url:
		define( 'WP_LOCAL_DEV', false );
		define( 'DB_NAME', env('STAGING_DB_NAME') );
		define( 'DB_USER', env('STAGING_DB_USER') );
		define( 'DB_PASSWORD', env('STAGING_DB_PASSWORD') );
		define( 'DB_HOST', env('STAGING_DB_HOST') );
    break;

	// Live server settings
    case $production_url:
		define( 'WP_LOCAL_DEV', false );
		define( 'DB_NAME', env('PRODUCTION_DB_NAME') );
		define( 'DB_USER', env('PRODUCTION_DB_USER') );
		define( 'DB_PASSWORD', env('PRODUCTION_DB_PASSWORD') );
		define( 'DB_HOST', env('PRODUCTION_DB_HOST') );
    break;

	// Live server settings
    case $production_url_full:
		define( 'WP_LOCAL_DEV', false );
		define( 'DB_NAME', env('PRODUCTION_DB_NAME') );
		define( 'DB_USER', env('PRODUCTION_DB_USER') );
		define( 'DB_PASSWORD', env('PRODUCTION_DB_PASSWORD') );
		define( 'DB_HOST', env('PRODUCTION_DB_HOST') );
    break;
}

// ========================
// Custom Content Directory
// ========================

if($_SERVER['SERVER_NAME'] == $dev_url):
	if (!defined('WP_HOME')):
		define('WP_HOME', 'http://' . $dev_url);
	endif;
elseif($_SERVER['SERVER_NAME'] == $staging_url) :
	if (!defined('WP_HOME')):
		define('WP_HOME', 'http://' . $staging_url);
	endif;
elseif($_SERVER['SERVER_NAME'] == $production_url) :
	if (!defined('WP_HOME')):
		define('WP_HOME', 'http://' . $production_url);
	endif;
elseif($_SERVER['SERVER_NAME'] == $production_url_full) :
	if (!defined('WP_HOME')):
		define('WP_HOME', 'http://' . $production_url_full);
	endif;
endif;


if (!defined('WP_SITEURL')) {
    define('WP_SITEURL', WP_HOME .'/wp');
}
if (!defined('WP_CONTENT_DIR')) {
    define('WP_CONTENT_DIR', dirname(__FILE__) . '/content');
}
if (!defined('WP_CONTENT_URL')) {
    define('WP_CONTENT_URL', WP_HOME.'/content');
}
define( 'DISALLOW_FILE_EDIT', true );

// ================================================
// You almost certainly do not want to change these
// ================================================
define( 'DB_CHARSET', 'utf8' );
define( 'DB_COLLATE', '' );

// ================================
// Language
// ================================
define( 'WPLANG', 'en_GB' );

// ================================
// Authentication Unique Keys and Salts.

// Change these to different unique phrases!
// You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
// You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
// REPLACE THESE

// ================================

define('AUTH_KEY',         ',7jxG`)ZYM/m1OB6G/&z)gL=oW={,B1-&xcGuySKE.vQh_-fI)j$y^222Hs8cR&W');
define('SECURE_AUTH_KEY',  '=3/+qt|eD2>(|nx@-p|vp&8T*n6;ZKZ1[91m`a^-PbV+wzbiK ,gyNe&iTpHI(+1');
define('LOGGED_IN_KEY',    'Wu5@R=lv&j!.~IMD_D;%gzG>NSYfNG-K B@6wd]cp2|jYCgHV;>dSe[. u|f@2V]');
define('NONCE_KEY',        '=d#!`FCws;6W-z%j%:Jh8@-~U|k[PoA8Lb+.r4yf_fi*1bJXMQm2bu{j@ObTNlSe');
define('AUTH_SALT',        '|~mjb|}FFR~b=jcF--;6.`KEO|wP>f&|+2s-#4]6QzY7o4#^y2&9mabHT..DR<O-');
define('SECURE_AUTH_SALT', '+YmVlzrBIw!kMkq(j3p&5+IU17>+ea[E9ZNdH-*k)(cCc74N^7CVd|ol(*^i]do!');
define('LOGGED_IN_SALT',   'rG9_QAj+~/q2UA*5Fk(Q](/NY&IG}[Z8&uf+Q{;YB/uA0Q.iFU:UW *OCN;|FUi1');
define('NONCE_SALT',       'uBW!%ut#F]]5Etl3MwAi|;9 82#qY9(x:])4BU*y{4BrSHk^hT&E6>m<`)zwsaIs');

// ======================
// Hide errors by default
// ======================
ini_set( 'display_errors', 0 );
define( 'WP_DEBUG_DISPLAY', 0 );
define( 'WP_DEBUG', 0 );

// =========================
// Disable automatic updates
// =========================
define( 'AUTOMATIC_UPDATER_DISABLED', false );
define('FS_METHOD', 'direct');

// =======================
// Load WordPress Settings
// =======================
$table_prefix  = 'wp_';

if ( ! defined( 'ABSPATH' ) ) {
    define( 'ABSPATH', dirname( __FILE__ ) . '/wp/' );
}
require_once( ABSPATH . 'wp-settings.php' );
