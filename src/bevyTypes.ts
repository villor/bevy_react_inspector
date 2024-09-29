export const bevyTypes = {
  // core
  Name: 'bevy_core::name::Name',

  // bevy_hierarchy
  Children: 'bevy_hierarchy::components::children::Children',
  Parent: 'bevy_hierarchy::components::parent::Parent',

  // bevy_pbr
  DirectionalLight: 'bevy_pbr::light::directional_light::DirectionalLight',
  PointLight: 'bevy_pbr::light::point_light::PointLight',
  SpotLight: 'bevy_pbr::light::spot_light::SpotLight',

  // bevy_render
  Camera: 'bevy_render::camera::camera::Camera',
  HandleMesh: 'bevy_asset::handle::Handle<bevy_render::mesh::mesh::Mesh>',

  // bevy_ui
  Node: 'bevy_ui::ui_node::Node',

  // bevy_window
  Window: 'bevy_window::window::Window',

  // bevy_text
  Text: 'bevy_text::text::Text',

  // bevy_transform
  Transform: 'bevy_transform::components::transform::Transform',

  // bevy_sprite
  Sprite: 'bevy_sprite::sprite::Sprite',
};
