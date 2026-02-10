export type applicationStatus = 'pending' | 'accepted' | 'rejected';
export interface application {
    id: number;
    userId: number;
    offerId: number;
    status: applicationStatus;
    createdAt: Date;
}