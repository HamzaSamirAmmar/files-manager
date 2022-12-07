export class User {
  id;
  name;
  accessToken;
  email;

  constructor(data) {
    this.id = data.id;
    this.email = data.email;
    this.name = data.name;
    this.accessToken = data.token;
  }
}
