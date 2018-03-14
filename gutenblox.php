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
  $block_types = array(
    'gblx/cta' => array(
      'init'   => function () {
        $e = 'build/cta.editor.bundle.js';
        $deps = array( 
          'wp-blocks', 
          'wp-i18n', 
          'wp-element'
        );
        wp_register_script( 'gblx-cta-editor', plugins_url( $e, __FILE__ ), $deps, filemtime( plugin_dir_path( __FILE__ ) . $e ) );
        
        if ( !is_admin() ) {
          $s = 'build/cta.site.bundle.js';
          $deps = array(
            'jquery' 
          );
          wp_enqueue_script( 'gblx-cta', plugins_url( $s, __FILE__ ), $deps, filemtime( plugin_dir_path( __FILE__ ) . $s ) );
        }
      },
      'config' => array(
        'editor_script' => 'gblx-cta-editor'
      )
    )
  );

  foreach( $block_types as $type => $block ) {
    call_user_func( $block['init'] );
    register_block_type( $type, $block['config'] );
  }
}