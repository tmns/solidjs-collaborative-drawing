import {
  createClient,
  type LiveList,
  LiveMap,
  LiveObject,
} from "@liveblocks/client";
import { createRoomContext } from "solid-liveblocks";

const client = createClient({
  publicApiKey: 'pk_dev_VsbeXXRs_Y8eQ0TYjjaJP-XN538LlLKHynwLaZTmgFtU7cgg6cd47OjJRkiTyUrf',
  throttle: 16,
});

export type Point =
  | [x: number, y: number, pressure: number]
  | [x: number, y: number];

export type Stroke = LiveObject<{
  gradient: number;
  points: LiveList<Point>;
}>;

export type Storage = {
  strokes: LiveMap<string, Stroke>;
};

type Presence = {};
type UserMeta = {};
type RoomEvent = {};

export const { RoomProvider, useStorage, useMutation } = createRoomContext<Presence, Storage, UserMeta, RoomEvent>(client)
