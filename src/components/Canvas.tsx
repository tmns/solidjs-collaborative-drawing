import { useMutation, useStorage } from "~/liveblocks.config";
import { createSignal, For, Show } from "solid-js";
import styles from "./Canvas.module.css";
import { randomId } from "~/components/utils/randomId";
import { LiveList, LiveObject } from "@liveblocks/client";
import StrokePath from "~/components/StrokePath";
import DeleteButton from "~/components/DeleteButton";

export default function Canvas() {
  const [currentStroke, setCurrentStroke] = createSignal("");
  const strokeIds = useStorage(storage => storage.strokes.keys())

  const createStroke = useMutation(({ storage }, e: PointerEvent) => {
    const strokes = storage.get('strokes');
    const id = randomId();

    strokes.set(id,
      new LiveObject({
        gradient: 3,
        points: new LiveList([[e.pageX, e.pageY, e.pressure]]),
      }))

    setCurrentStroke(id);
  });

  const updateStroke = useMutation(({ storage }, e: PointerEvent) => {
    const strokes = storage.get('strokes');
    strokes.get(currentStroke())?.get("points")?.push([e.pageX, e.pageY, e.pressure])
  })

  const deleteStrokes = useMutation(({ storage }) => {
    const strokes = storage.get('strokes');
    const keys = strokes.keys()
    for (const key of keys) {
      strokes.delete(key);
    }
  })

  function handlePointerDown(e: PointerEvent) {
    (e.target as SVGElement).setPointerCapture(e.pointerId);

    createStroke(e);
  }

  function handlePointerMove(e: PointerEvent) {
    if (e.buttons !== 1) return;
    
    (e.target as SVGElement).setPointerCapture(e.pointerId);

    updateStroke(e);
  }

  function handleReset() {
    deleteStrokes()
  }

  return (
    <Show
      keyed={false}
      when={strokeIds()}
      fallback={<div>loading...</div>}
    >
      <svg
        class={styles.svg}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#A774FF" />
            <stop offset="100%" stop-color="#E28295" />
          </linearGradient>
        </defs>
        <For each={[...strokeIds()]}>
          {(id) => <StrokePath strokeId={id} />}
        </For>
      </svg>
      <DeleteButton onClick={handleReset} />
    </Show>
  );
}
