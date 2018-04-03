<?php 
/**
 * Trait for Singleton scoped objects.
 * 
 * @since 0.0.1
 * @package gblx
 */
namespace gblx;

/**
 * 
 * @since 0.0.1
 */
trait Singleton {
  
  /**
   * @var Singletion 
   */
  private static $instance;

  /**
   * 
   * @since 0.0.1
   */
  protected function __construct() {
    // Private 
  }

  /**
   * Get the singleton instance
   * 
   * @since 0.0.1
   * @return mixed
   */
  public static function instance( $_ = '' ) {
    if ( is_null( self::$instance ) ) {
      self::$instance = new self( $_ );
      self::$instance->init();
    }
    return self::$instance;
  }

  /**
   * Initialize the object.
   * 
   * @since 0.0.1
   * @return void
   */
  abstract protected function init(); 
}