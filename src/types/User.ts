interface User {
  id: number;
  username: string;
  nickname: string;
  description: string;
  roles: Array<string>;
  stores: Array<any>;
}
export default User
