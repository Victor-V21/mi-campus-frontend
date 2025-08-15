export interface FeedbackDto {
  id: string;
  publicationId: string;
  userId: string;
  userName: string;
  comment?: string;
  rate?: number;       // si tu BE lo llama qualification/score, renómbralo aquí
  dateCreate?: string;
}
