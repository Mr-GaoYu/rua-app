import { Entity, Event } from "src/api-v4/account";

export interface ExtendedEvent extends Event {
  _deleted?: string;
  _initial?: boolean;
}

export interface EntityEvent extends Omit<Event, 'entity'> {
    entity: Entity;
  }