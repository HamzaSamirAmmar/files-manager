 import {Member} from './MemberModel';
 
 export class FileLog{
    id;
    action;
    actor;
    created_at;
    //TODO sync data extraction (in this model and others) with response format
    constructor(data){
        this.id=data.id;
        this.action=data.action;
        this.actor= new Member(data.actor);
        this.created_at=data.created_at;
    }
}