export type UserStatus = 'prospect' | 'application_started' | 'applied' | 'customer';
export type LeadTemperature = 'cold' | 'warm' | 'hot';

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  leadScore: number;
  leadTemperature?: LeadTemperature;
  status: UserStatus;
}
