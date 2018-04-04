<?php 
/**
 * Functions for the admin settings page.
 * 
 * @since 0.0.1
 * @package gblx
 */
namespace gblx;

// Add the settings Page
add_action( 'admin_menu', 'gblx\add_settings_page' );

// Init settings page
add_action( 'admin_init', 'gblx\add_settings_sections' );
add_action( 'admin_init', 'gblx\add_settings_fields' );

/**
 * Register the settings page.
 * 
 * @since 0.0.1
 * @return void
 */
function add_settings_page() {
  $hook = add_submenu_page( 
    'options-general.php',
    __( 'Gutenblocks Settings', 'gblx' ), 
    __( 'Gutenblocks', 'gblx' ), 
    'manage_options', 
    'gutenblocks', 
    'gblx\settings_page_html' 
  );

  add_action( "load-$hook", 'gblx\enqueue_settings_scripts' );
}

/**
 * Add settings page sections
 * 
 * @since 0.0.1
 * @return void
 */
function add_settings_sections() {
  add_settings_section(
    'gblx_section_general',
    __( 'General', 'gblx' ),
    '',
    'gutenblocks'
  );
}

/**
 * Add settings page fields
 * 
 * @since 0.0.1
 * @return void
 */
function add_settings_fields() {
  add_settings_field(
    'gblx_field_developer_mode',
    __( 'Developer Mode', 'gblx' ),
    'gblx\settings_field_dev_mode_cb',
    'gutenblocks',
    'gblx_section_general',
    array( 'label_for' => Options::DEVELOPER_MODE )
  );
}

/**
 * Output the settings page
 * 
 * @since 0.0.1
 * @return void
 */
function settings_page_html() { ?>
  <form action="options.php" method="post">
    <div class="wrap">
      <?php 
        do_settings_sections( 'gutenblocks' );
        settings_fields( 'gblx' );
        submit_button(); 
      ?>
    </div>
  </form>
  <div>
    <?php echo get_plugin_docs(); ?>
  </div>
<?php }

/**
 * Output the developer mode checkbox
 * 
 * @since 0.0.1
 * @return void
 */
function settings_field_dev_mode_cb() { 
  $value = get_option( Options::DEVELOPER_MODE ); ?>
  <label> 
    <input 
      type="checkbox"
      name=<?php esc_attr_e( Options::DEVELOPER_MODE ); ?>
      <?php checked( true, !empty( $value ) ) ?>
      />
    <?php _e( 'Load development bundles (development build required)', 'gblx' ); ?>
  </label>
<?php }

/**
 * Get the plugin documentation
 * 
 * @since 0.0.1
 * @return void
 */
function get_plugin_docs() {
  if ( !class_exists( 'Parsedown' ) ) {
    include_once plugin_dir( '/includes/library/parsedown.php' );
  }
  $parser = new \Parsedown();
  return $parser->text( file_get_contents( plugin_dir( 'README.md' ) ) );
}