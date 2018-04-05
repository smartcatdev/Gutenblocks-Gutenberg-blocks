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
    'wp-components'
  );
  $site_deps = array(
    'jquery'
  );
  $version = VERSION;

  if ( in_dev_mode() ) {
    $version = @filemtime( plugin_dir_path( __FILE__ ) . $editor_script );
  }

  if ( is_admin() ) {
    if ( !empty( $editor_styles ) ) {
      wp_register_style("gblx-$blockname-editor", plugins_url( $editor_styles, plugin_file() ), null, $version );
    }

    wp_register_script( "gblx-$blockname-editor", plugins_url( $editor_script , plugin_file() ), $editor_deps, $version );

  } else {
    if ( !empty( $site_styles ) ) {
      wp_register_style("gblx-$blockname", plugins_url( $site_styles, plugin_file() ), null, $version );
    }

    wp_register_script( "gblx-$blockname", plugins_url( $site_script, plugin_file() ), $site_deps, $version );
  }

}
