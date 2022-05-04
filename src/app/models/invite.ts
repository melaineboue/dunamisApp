import { GR } from "./gr";

export interface Invite {
  id: number,
  nom: string,
  checked?: boolean,
  gr?: GR
}
