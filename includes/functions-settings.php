<?php
/**
 * Functions for the Settings API
 * 
 * @since 0.0.1
 * @package gblx
 */
namespace gblx;

// Register settings
add_action( 'init', 'gblx\register_settings' );

/**
 * Register settings.
 * 
 * @action init
 * 
 * @since 0.0.1
 * @return void
 */
function register_settings() {
  /**
   * General settings
   */
  register_setting( 'gblx', Options::DEVELOPER_MODE, array(
    'type' => 'boolean',
    'sanitize_callback' => function ( $value ) {
      if ( the_bool_of_truth( $value ) && file_exists( plugin_dir( 'dist/development' ) ) ) {
        return true;
      } else {
        add_settings_error( 'gutenblocks', 'invalid_bundle', __( 'No development bundle found. Try running "yarn start"', 'gblx' ) );
      }
      return false;
    }
  ) );
}