export default interface UserModuleTypes {
  id: number,
  token: string,
  email: string,
  nicename: string,
  display_name: string,
  roles: Array<string>
}
