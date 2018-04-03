<?php
/**
 * Functions for sanitizing data.
 * 
 * @since 0.0.1
 * @package gblx
 */
namespace gblx;

/**
 * Sanitize a truthy boolean value
 * 
 * @param mixed $val
 * 
 * @since 0.0.1
 * @return bool
 */
function the_bool_of_truth( $val ) {
  return filter_var( $val, FILTER_VALIDATE_BOOLEAN );
}