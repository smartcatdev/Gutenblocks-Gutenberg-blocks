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
  register_setting( 'gblx', OPTIONS::DEVELOPER_MODE, array(
    'type' => 'boolean'
  ) );
}