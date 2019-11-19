import { MemberFromApi } from './memberFromApi.model';


export class Teammember {
    name: string;
    email: string;
    jobtitle: string;
    avatar: string;

    constructor(request: MemberFromApi) {
        this.name = request.firstName + ' ' + request.lastName;
        this.email = request.firstName + '.' + request.lastName + '@vizientinc.com';
        this.jobtitle = request.title;
        this.avatar = request.pathToPhoto;
    }
}