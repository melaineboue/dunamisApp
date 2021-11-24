import { Invite } from "./invite";
import { PersonneSuivi } from "./personneSuivi";

export interface participantEmitObject {
    personnes: PersonneSuivi[],
    invites: Invite[]
}
