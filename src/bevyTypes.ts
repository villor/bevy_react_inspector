export const bevyTypes = {
  // core
  Name: 'bevy_core::name::Name',

  // bevy_ecs
  SystemIdMarker: 'bevy_ecs::system::system_registry::SystemIdMarker',
  Observer: 'bevy_ecs::observer::runner::Observer',

  // bevy_hierarchy
  Children: 'bevy_hierarchy::components::children::Children',
  Parent: 'bevy_hierarchy::components::parent::Parent',

  // bevy_pbr
  DirectionalLight: 'bevy_pbr::light::directional_light::DirectionalLight',
  PointLight: 'bevy_pbr::light::point_light::PointLight',
  SpotLight: 'bevy_pbr::light::spot_light::SpotLight',

  // bevy_render
  Camera: 'bevy_render::camera::camera::Camera',
  Mesh2d: 'bevy_render::mesh::components::Mesh2d',
  Mesh3d: 'bevy_render::mesh::components::Mesh3d',

  // bevy_ui
  Node: 'bevy_ui::ui_node::Node',
  Button: 'bevy_ui::widget::button::Button',
  UiImage: 'bevy_ui::ui_node::UiImage',
  Label: 'bevy_ui::widget::label::Label',
  Text: 'bevy_ui::widget::text::Text',

  // bevy_window
  Window: 'bevy_window::window::Window',
  PrimaryWindow: 'bevy_window::window::PrimaryWindow',
  Monitor: 'bevy_window::monitor::Monitor',
  PrimaryMonitor: 'bevy_window::monitor::PrimaryMonitor',

  // bevy_text
  // Text2d: 'bevy_text::Text2d',

  // bevy_transform
  Transform: 'bevy_transform::components::transform::Transform',

  // bevy_sprite
  Sprite: 'bevy_sprite::sprite::Sprite',

  // bevy_picking
  PointerId: 'bevy_picking::pointer::PointerId',
};
