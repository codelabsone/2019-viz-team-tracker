import { Team } from '../models/team.model';
import { Teammember } from '../models/member.model';

export interface AddMemberDialogData {
    team: Team;
    allTeams: Team[];
    member: Teammember;
    method: string;
}
