import { Teammember } from './member.model';

export class Team {
    name: string;
    members: Teammember[];

    constructor(name: string){
        this.name = name;
        this.members = [];
    }

}