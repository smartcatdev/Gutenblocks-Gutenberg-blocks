<?php
/**
 * Plugin Name: Gutenblocks
 * Description: A collection of useful Gutenberg blocks
 * Version: 0.0.1
 * 
 * @since 0.0.1a
 * @package gblx
 */
namespace gblx;

const VERSION = '1.0.0';

add_action( 'init', 'gblx\register_blocks' );

function register_blocks() {
  $block_types = array(
    'gblx/image-cta' => array(
      'init' => function () {
        register_block_assets( 'image-cta' );
      },
      'config' => array(
        'editor_script' => 'gblx-image-cta-editor',
        'editor_style'  => 'gblx-image-cta-editor',
        'script' => 'gblx-image-cta',
        'style'  => 'gblx-image-cta'
      )
    ),
    'gblx/colour-cta' => array(
      'init' => function () {
        register_block_assets( 'colour-cta' );
      },
      'config' => array(
        'editor_script' => 'gblx-colour-cta-editor',
        'editor_style'  => 'gblx-colour-cta-editor',
        'script' => 'gblx-colour-cta',
        'style'  => 'gblx-colour-cta'
      )
      ),
      'gblx/widget-columns' => array(
        'init' => function () {
          register_block_assets( 'widget-columns' );
        },
        'config' => array(
          'editor_script' => 'gblx-widget-columns-editor',
          'editor_style'  => 'gblx-widget-columns-editor',
          'script' => 'gblx-widget-columns',
          'style'  => 'gblx-widget-columns'
        )
      )
  );

  foreach( $block_types as $type => $block ) {
    call_user_func( $block['init'] );
    register_block_type( $type, $block['config'] );
  }
}

function wp_debug() {
  return defined( 'WP_DEBUG' ) && WP_DEBUG;
}

function register_block_assets( $blockname ) {
  if ( wp_debug() ) {
    $editor_script = "build/$blockname.editor.bundle.js";
    $site_script = "build/$blockname.site.bundle.js";
  } else {
    $editor_script = "build/$blockname.editor.production.min.js";
    $editor_styles = "build/$blockname.editor.css";
    $site_script = "build/$blockname.site.production.min.js";
    $site_styles = "build/$blockname.site.css";
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
    $version = filemtime( plugin_dir_path( __FILE__ ) . $editor_script );
  }

  if ( !is_admin() ) {
    wp_register_script( "gblx-$blockname", plugins_url( $site_script, __FILE__ ), $site_deps, $version );
  }

  wp_register_script( "gblx-$blockname-editor", plugins_url( $editor_script , __FILE__ ), $editor_deps, $version );

  if ( !empty( $editor_styles ) ) {
    wp_register_style("gblx-$blockname-editor", plugins_url( $editor_styles, __FILE__ ), null, $version );
  }
  
  if ( !is_admin() && !empty( $site_styles ) ) {
    wp_register_style("gblx-$blockname", plugins_url( $site_styles, __FILE__ ), null, $version );
  }
}
