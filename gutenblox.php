<?php
/**
 * Plugin Name: Smartcat Gutenblocks
 * Version: 0.0.1a
 * 
 * @since 0.0.1a
 * @package gblx
 */
namespace gblx;

add_action( 'init', 'gblx\register_blocks' );

function register_blocks() {
  $blocks = array(
    'gblx/cta' => array(
      'init'   => function () {
        $file = 'build/cta.editor.bundle.js';
        $deps = array( 
          'wp-blocks', 
          'wp-i18n', 
          'wp-element' 
        );
        wp_enqueue_script( 'gblx-cta-editor', plugins_url( $file, __FILE__ ), $deps, filemtime( plugin_dir_path( __FILE__ ) . $file ) );
        
        $file = 'build/cta.site.bundle.js';
        $deps = array( 
          'jquery' 
        );
        wp_enqueue_script( 'gblx-cta', plugins_url( $file, __FILE__ ), $deps, filemtime( plugin_dir_path( __FILE__ ) . $file ) );
      },
      'config' => array(
        'editor-script' => 'gblx-cta-editor',
        'script'        => 'gblx-cta'
      )
    )
  );
  foreach( $blocks as $name => $block ) {
    call_user_func( $block['init'] );
    register_block_type( $name, $block['config'] );
  }
}