import { Participant } from "./participant.model";

export interface Meeting {
    id?: number;
    dateTime: Date;
    subject: string;
    participants: Participant[];
    notes: string;
}