<?php
/**
 * Plugin Name: Smartcat Gutenblox
 * Version: 0.0.1a
 * 
 * @since 0.0.1a
 * @package gblx
 */
namespace gblx;

add_action( 'enqueue_block_editor_assets', 'gblx\enqueue_assets' );

function enqueue_assets() {
  $file = 'build/blocks.bundle.js';
  $deps = array( 
    'wp-blocks', 
    'wp-i18n', 
    'wp-element' 
  );
  wp_enqueue_script( 'gblx', plugins_url( $file, __FILE__ ), $deps, filemtime( plugin_dir_path( __FILE__ ) . $file ) );

  $file = 'build/styles.css';
  $deps = array(
    'wp-edit-blocks'
  );
  // wp_enqueue_style( 'gblx', plugins_url( $file, __FILE__ ), null, filemtime( plugin_dir_path( __FILE__ ) . $file ) );
}