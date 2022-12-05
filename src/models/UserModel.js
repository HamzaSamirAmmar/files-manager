export class Member{
    id;
    name;
    accessToken;

    constructor(data){
        this.id=data.id;
        this.name=data.name;
        this.accessToken=data.accessToken;
    }
}