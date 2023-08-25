import type { DiscordUser } from '$lib/server/types/database';

export interface FormResponses {
  SpareTime: string;
  Discovery: string;
  Questions: string[];
}

export interface FormAgreements {
  Staff: boolean;
  Info: boolean;
}

export enum ApplicationStatus {
  PENDING = 0,
  DENIED,
  ACCEPTED
}

export interface Application {
  _id: string;
  name: string;
  discord: DiscordUser;
  responses: FormResponses;
  agreements: FormAgreements;
  status: ApplicationStatus;
  createdAt: Date;
  updatedAt?: Date;
  Reviewer?: DiscordUser['User'];
}
