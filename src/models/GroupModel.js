import File from './FileModel';
import Member from './MemberModel';

export class Group {
    id;
    name;
    files = new Array();
    members = new Array();

    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        if (data.files != undefined) {
            data.files.map((file) => {
                this.files.push(new File(file))
            });
        }
        if (data.members != undefined) {
            data.members.map((member) => {
                this.files.push(new Member(member))
            });
        }
    }
}