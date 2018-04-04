<?php
/**
 * Plugin Name: Gutenblocks
 * Description: A collection of useful Gutenberg blocks
 * Version: 1.0.0
 * 
 * @since 0.0.1
 * @package gblx
 */
namespace gblx;

// Include constants
include_once dirname( __FILE__ ) . '/constants.php';
include_once dirname( __FILE__ ) . '/includes/trait-singleton.php';

// Boot the plugin
add_action( 'plugins_loaded', 'gblx\gutenblocks' );

/**
 * 
 * @since 0.0.1
 * @scope Singleton
 */
class Gutenblocks {
  
  use Singleton;

  /**
   * Initialize the plugin.
   * 
   * @since 0.0.1
   * @return void
   */
  protected function init() {
    if ( $this->check_for_gutenberg() ) {
      $this->do_includes();
    } else {
      make_admin_notice( sprintf( '<p>%s</p>', __( 'Gutenblocks requires Gutenberg to be active', 'gblx' ) ) );
    }
  }

  /**
   * Include dependencies
   * 
   * @since 0.0.1
   * @return void
   */
  private function do_includes() {
    include_once dirname( __FILE__ ) . '/includes/functions.php';
    include_once dirname( __FILE__ ) . '/includes/functions-scripts.php';
    include_once dirname( __FILE__ ) . '/includes/functions-blocks.php';
    include_once dirname( __FILE__ ) . '/includes/functions-settings.php';
    include_once dirname( __FILE__ ) . '/includes/functions-sanitize.php';

    /**
     * Admin includes
     */
    if ( is_admin() ) {
      include_once dirname( __FILE__ ) . '/includes/admin/functions-scripts.php';
      include_once dirname( __FILE__ ) . '/includes/admin/functions-settings.php';
    }
  }

  /**
   * Check to see if Gutenber is active.
   * 
   * @since 0.0.1
   * @return bool
   */
  private function check_for_gutenberg() {
    return function_exists( 'register_block_type' );
  }

}

/**
 * Get the plugin instance
 * 
 * @action plugins_loaded
 * 
 * @since 0.0.1
 * @return Gutenblocks
 */
function gutenblocks() {
  return Gutenblocks::instance();
}

/**
 * Get the plugin root file.
 * 
 * @since 0.0.1
 * @return string
 */
function plugin_file() {
  return __FILE__;
}

/**
 * Get the plugin directory path.
 * 
 * @since 0.0.1
 * @return string
 */
function plugin_dir( $path = '' ) {
  return plugin_dir_path( __FILE__ ) . ltrim( $path, '/' );
}

/**
 * Make a notice in the WordPress admin.
 * 
 * @since 0.0.1
 * @return bool
 */
function make_admin_notice( $message, $type = 'error', $dismissible = true ) {
  return add_action( 'admin_notices', function () use ( $message, $type, $dismissible ) {
    printf( '<div class="notice notice-%1$s %2$s">%3$s</div>', esc_attr( $type ), $dismissible ? 'is-dismissible' : '', $message );
  } );
}