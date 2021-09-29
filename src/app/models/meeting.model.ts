import { DateTime } from "./date-time.model";
import { Participant } from "./participant.model";

export interface Meeting {
    id?: number;
    dateTime: DateTime;
    subject: string;
    participants: Participant[];
    notes: string;
}