export type ApplicationStatus = 'pending' | 'interview' | 'accepted' | 'rejected';

export interface Application {
  id: number;
  userId: number;
  offerId: number;
  title: string;
  company: string;
  location: string;
  status: ApplicationStatus;
  appliedAt: Date;
  updatedAt: Date;
}

export const APPLICATION_STATUS_LABELS: Record<ApplicationStatus, string> = {
  pending: 'En attente',
  interview: 'Entretien',
  accepted: 'Accepté',
  rejected: 'Refusé'
};

export const APPLICATION_STATUS_COLORS: Record<ApplicationStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  interview: 'bg-blue-100 text-blue-800',
  accepted: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800'
};