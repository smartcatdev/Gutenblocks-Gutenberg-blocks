<?php
/**
 * Plugin Name: Gutenblocks
 * Description: A collection of useful Gutenberg blocks
 * Version: 0.0.1
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
    $this->do_includes();
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