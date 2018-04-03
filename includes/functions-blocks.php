<?php 
/**
 * Functions for managing Gutenberg block types
 * 
 * @since 0.0.1
 * @package gblx
 */
namespace gblx;

// Register block types
add_action( 'init', 'gblx\register_block_types' );

/**
 * Register available block types.
 * 
 * @action init
 * 
 * @since 0.0.1
 * @return void
 */
function register_block_types() {
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
