import { Teammember } from './member.model';
import { TeamFromApi } from './teamFromApi.model';

export class Team {
    name: string;
    description: string;
    members: Teammember[] = [];
    limitReachedError: boolean = false;

    constructor(request: TeamFromApi) {
        this.name = request.name;
        this.description  = request.description;
        request.members.forEach(member => {
            this.members.push(new Teammember(member));
        });
    }
}