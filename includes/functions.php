<?php 
/**
 * General purpose functions and utilities
 * 
 * @since 0.0.1
 * @package gblx
 */
namespace gblx;

/**
 * Check to see if the plugin is in dev mode.
 * 
 * @since 0.0.1
 * @package gblx
 */
function in_dev_mode() {
  return the_bool_of_truth( get_option( Options::DEVELOPER_MODE ) );
}
