<?php 
/**
 * General purpose functions and utilities
 * 
 * @since 0.0.1
 * @package gblx
 */
namespace gblx;

function wp_debug() {
  return defined( 'WP_DEBUG' ) && WP_DEBUG;
}
