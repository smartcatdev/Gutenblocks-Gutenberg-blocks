<?php
/**
 * Functions for managing scripts.
 * 
 * @since 0.0.1
 * @package gblx
 */
namespace gblx;

/**
 * Register frontend and admin scripts for a block
 * 
 * @since 0.0.1
 * @return void
 */
function register_block_assets( $blockname ) {
  if ( wp_debug() ) {
    $editor_script = "dist/development/$blockname.editor.bundle.js";
    $site_script   = "dist/development/$blockname.site.bundle.js";
  } else {
    $editor_script = "dist/production/$blockname.editor.min.js";
    $editor_styles = "dist/production/$blockname.editor.css";
    $site_script   = "dist/production/$blockname.site.min.js";
    $site_styles   = "dist/production/$blockname.site.css";
  }

  $editor_deps = array( 
    'wp-blocks', 
    'wp-i18n', 
    'wp-element',
    'wp-components'
  );
  $site_deps = array(
    'jquery'
  );
  $version = VERSION;

  if ( wp_debug() ) {
    $version = @filemtime( plugin_dir_path( __FILE__ ) . $editor_script );
  }

  if ( !is_admin() ) {
    wp_register_script( "gblx-$blockname", plugins_url( $site_script, plugin_file() ), $site_deps, $version );
  }
  if ( !is_admin() && !empty( $site_styles ) ) {
    wp_register_style("gblx-$blockname", plugins_url( $site_styles, plugin_file() ), null, $version );
  }
  
  if ( !empty( $editor_styles ) ) {
    wp_register_style("gblx-$blockname-editor", plugins_url( $editor_styles, plugin_file() ), null, $version );
  }
  wp_register_script( "gblx-$blockname-editor", plugins_url( $editor_script , plugin_file() ), $editor_deps, $version );
}
