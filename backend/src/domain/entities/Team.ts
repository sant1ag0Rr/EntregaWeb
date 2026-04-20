// Domain entity: minimal football team shape returned to the frontend.
export interface Team {
  id: string;
  name: string;
  league: string;
  badge?: string;
}
