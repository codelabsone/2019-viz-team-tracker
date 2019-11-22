import { MemberFromApi } from './memberFromApi.model';
import { Picture } from './picture.model';
import { PicsumService } from '../picsum.service';


export class Teammember {
    name: string;
    email: string;
    jobtitle: string;
    avatar: string;
    id: number;
    teamId: number;
    firstName: string;
    lastName: string;

    constructor(request: MemberFromApi) {
        this.name = request.firstName + ' ' + request.lastName;
        this.email = request.firstName + '.' + request.lastName + '@vizientinc.com';
        this.jobtitle = request.title;
        this.avatar = request.pathToPhoto;
        this.id = request.id;
        this.teamId = request.teamId;
        this.firstName = request.firstName;
        this.lastName = request.lastName;
    }

    createPictureFromUrl(): Picture {
        const pic = new Picture(null);
        pic.url = this.avatar;
        return pic;
    }
}