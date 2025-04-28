import { UUIDTypes } from "uuid";

export interface Appeal {
    id: UUIDTypes;
    name: string;
    text: string;
    status: string;
    result: undefined | string;
    reason: undefined | string;
    created: Date;
    last_hit: Date;
}

export let appeals: Appeal[] = [];