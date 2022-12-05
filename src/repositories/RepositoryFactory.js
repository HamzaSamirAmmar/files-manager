import UserRepository from './UserRepository';
import FileRepository from './FileRepository';
import GroupRepository from './GroupRepository';
import MemberRepository from './MemberRepository';
import FileLogRepository from './FileLogRepository';


const repositories = {
    'users': UserRepository,
    'files':FileRepository,
    'groups':GroupRepository,
    'members':MemberRepository,
    'filelogs':FileLogRepository
}
export default {
    get: name => repositories[name]
};