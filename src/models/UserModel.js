export class Member{
    id;
    name;
    accessToken;

    constructer(data){
        this.id=data.id;
        this.name=data.name;
        this.accessToken=data.accessToken;
    }
}