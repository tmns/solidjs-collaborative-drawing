// @refresh reload
import { Suspense } from "solid-js";
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from "solid-start";
import "./root.css";
import { RoomProvider } from "~/liveblocks.config";
import { LiveMap } from "@liveblocks/client";

export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Title>Liveblocks</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <Suspense>
          <ErrorBoundary>
            <RoomProvider id="solid-drawing" initialPresence={{}} initialStorage={{ strokes: new LiveMap() }}>
              <Routes>
                <FileRoutes />
              </Routes>
            </RoomProvider>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
