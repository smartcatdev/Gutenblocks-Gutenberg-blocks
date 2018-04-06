<?php
/**
 * Functions for managing scripts.
 * 
 * @since 0.0.1
 * @package gblx
 */
namespace gblx;

// Register default scripts
add_action( 'init', 'gblx\register_default_scripts' );

// Enqueue block editor scripts
add_action( 'enqueue_block_editor_assets', 'gblx\enqueue_block_editor_scripts' );

/**
 * Register frontend and admin scripts for a block
 * 
 * @since 0.0.1
 * @return void
 */
function register_block_assets( $blockname ) {
  $editor_script = "dist/$blockname/editor.js";
  $site_script   = "dist/$blockname/public.js";

  /**
   * Stylesheets are extracted in production builds
   */
  if ( file_exists( plugin_dir( "dist/$blockname/editor.css" ) ) ) {
    $editor_styles = "dist/$blockname/editor.css";
  }

  if ( file_exists( plugin_dir( "dist/$blockname/public.css" ) ) ) {
    $site_styles = "dist/$blockname/public.css";
  }

  $editor_deps = array( 
    'wp-blocks', 
    'wp-i18n', 
    'wp-element',
    'wp-components',
    'gblx-vendor'
  );
  $site_deps = array(
    'jquery',
    'gblx-vendor'
  );
  $version = get_script_version( $editor_script );

  if ( is_admin() ) {
    if ( !empty( $editor_styles ) ) {
      wp_register_style( "gblx-$blockname-editor", plugins_url( $editor_styles, plugin_file() ), null, $version );
    }

    wp_register_script( "gblx-$blockname-editor", plugins_url( $editor_script , plugin_file() ), $editor_deps, $version );

  } else {
    if ( !empty( $site_styles ) ) {
      wp_register_style("gblx-$blockname", plugins_url( $site_styles, plugin_file() ), null, $version );
    }

    wp_register_script( "gblx-$blockname", plugins_url( $site_script, plugin_file() ), $site_deps, $version );
  }

}

/**
 * Register default scripts and styles
 * 
 * @action init
 * 
 * @since 1.0.0
 * @return void
 */
function register_default_scripts() {
  $version = get_script_version( plugin_dir( 'dist/vendor.js' ) );
  wp_register_script( 'gblx-vendor', plugins_url( 'dist/vendor.js', plugin_file() ), null, $version );
}

/**
 * Get the version number for a script
 * 
 * @since 1.0.0
 * @return void
 */
function get_script_version( $file ) {
  if ( in_dev_mode() ) {
    return @filemtime( plugin_dir( $file ) );
  }
  return VERSION;
}

/**
 * Enqueue scripts for the Gutenberg editor
 * 
 * @action enqueue_block_editor_assets
 * 
 * @since 1.0.1
 * @return void
 */
function enqueue_block_editor_scripts() {
  $version = get_script_version( plugin_dir( 'dist/block-editor.js' ) );
  wp_enqueue_script( 'gblx-block-editor', plugins_url( 'dist/block-editor.js', plugin_file() ), null, $version );
}