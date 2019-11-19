import { MemberFromApi } from './memberFromApi.model';

export interface TeamFromApi {
     id: number;
     name: string;
     description: string;
     members: MemberFromApi[];
}