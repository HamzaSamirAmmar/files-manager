import { Member } from "./MemberModel";

export class File {
  id;
  name;
  status;
  reserver;
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.status = data.status;
    if (data.reserver != undefined) this.reserver = new Member(data.reserver);
  }
}
