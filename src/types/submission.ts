// src/types/submission.ts

export type SubmissionType = 'course' | 'coaching' | 'whale';
export type SubmissionStatus = 'submitted' | 'under_review' | 'approved' | 'rejected';
export type TierInterest = 'course' | 'll' | 'll+wa' | 'lhc';

export interface Submission {
  id: string;
  name: string;
  email: string;
  score: number;
  type: SubmissionType;
  tier: TierInterest;
  submittedAt: string;
  utmCampaign?: string;
  utmSource?: string;
  utmMedium?: string;
  status: SubmissionStatus;
  fullData: Record<string, any>;
}

export interface SubmissionListResponse {
  submissions: Submission[];
  pagination: {
    total: number;
    page: number;
    pageSize: number;
  };
}

export interface AirtableRecord {
  id: string;
  createdTime: string;
  fields: Record<string, any>;
}
