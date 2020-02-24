const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.admin.token,
  avatar: state => state.admin.avatar,
  name: state => state.admin.name,
  state: state => state.admin.state,
  institute: state => state.admin.institute,
  major: state => state.admin.major,
  classes: state => state.admin.classes
}
export default getters
