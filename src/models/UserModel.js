export class User {
  id;
  name;
  token;
  email;

  constructor(data) {
    this.id = data.id;
    this.email = data.email;
    this.name = data.name;
    this.token = data.token;
  }
}
