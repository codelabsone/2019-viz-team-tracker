export class Teammember {
    name: string;
    email: string;
    jobtitle: string;
    avatar: string;
    constructor(
        name: string,
        email: string,
        jobtitle: string,
        avatar: string){
            this.name = name;
            this.email = email;
            this.jobtitle = jobtitle;
            this.avatar = avatar;
        }
}