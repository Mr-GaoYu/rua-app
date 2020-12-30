export type EventAction =
  | "account_update"
  | "account_settings_update"
  | "backups_enable"
  | "backups_cancel"
  | "backups_restore";

export type EventStatus =
  | "scheduled"
  | "started"
  | "finished"
  | "failed"
  | "notification";

export interface Entity {
  id: number;
  label: string;
  type: string;
  url: string;
}

export interface Event {
  id: number;
  action: EventAction; 
  created: string;
  duration: number | null;
  entity: Entity | null;
  message: string | null;
  percent_complete: number | null;
  rate: string | null;
  read: boolean;
  secondary_entity: Entity | null;
  seen: boolean;
  status: EventStatus;
  time_remaining: string | null;
  username: string;
}
