export interface FeedbackCreateModel {
  publicationId: string;
  comment?: string;
  rate?: number; // 1..5
}
