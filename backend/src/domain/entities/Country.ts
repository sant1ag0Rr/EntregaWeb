// Domain entity: normalized country data used across the whole application.
export interface Country {
  name: string;
  capital: string;
  currency: string;
  flag: string;
  latlng: [number, number] | [];
  fifaWorldCups?: number;
  description?: string;
}
