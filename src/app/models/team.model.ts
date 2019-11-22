import { Teammember } from './member.model';
import { TeamFromApi } from './teamFromApi.model';

export class Team {
    name: string;
    description: string;
    members: Teammember[] = [];
    limitReachedError: boolean = false;
    id: number;

    constructor(request: TeamFromApi) {
        this.name = request.name;
        this.description  = request.description;
        this.id = request.id;
        request.members.forEach(member => {
            this.members.push(new Teammember(member));
        });
    }
}