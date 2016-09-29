<?php
ini_set( 'display_errors', 0 );

$dev_url = "your.dev.url";
$staging_url = "your.staging.url";
$production_url = "your.live.url";

// ===================================================
// Load database info and environment paramaters
// ===================================================

switch($_SERVER['SERVER_NAME']) {

	// Local server settings
    case $dev_url:
		define( 'WP_LOCAL_DEV', true );
		include( dirname( __FILE__ ) . '/../local-config.php' );
    break;

	// Staging server settings
    case $staging_url:
		define( 'WP_LOCAL_DEV', false );
		include( dirname( __FILE__ ) . '/../staging-config.php' );
    break;

	// Live server settings
    case $live_url:
    	define( 'WP_LOCAL_DEV', false );
		include( dirname( __FILE__ ) . '/../production-config.php' );
    break;
}

// ========================
// Custom Content Directory
// ========================
define( 'WP_CONTENT_DIR', dirname( __FILE__ ) . '/content' );
define( 'WP_CONTENT_URL', 'http://' . $_SERVER['HTTP_HOST'] . '/content' );
define( 'DISALLOW_FILE_EDIT', true );

// ================================================
// You almost certainly do not want to change these
// ================================================
define( 'DB_CHARSET', 'utf8' );
define( 'DB_COLLATE', '' );

// ================================
// Language
// Leave blank for American English
// ================================
define( 'WPLANG', '' );

// ======================
// Hide errors by default
// ======================
define( 'WP_DEBUG_DISPLAY', false );
define( 'WP_DEBUG', false );

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
