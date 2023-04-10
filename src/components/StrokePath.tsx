import { Point, useStorage } from "~/liveblocks.config";
import { Show } from "solid-js";
import styles from "~/components/Canvas.module.css";
import { getSvgPathFromStroke } from "~/components/utils/getSvgPathFromStroke";
import getStroke from "perfect-freehand";

export default function StrokePath(props: { strokeId: string }) {
  const pathData = useStorage(storage => createPathData([...storage.strokes.get(props.strokeId).points]))

  return (
    <Show keyed={false} when={pathData()}>
      <path class={styles.path} d={pathData()} fill="white" />
    </Show>
  );
}

function createPathData(points: Point[]) {
  const strokeFromPoints = getStroke(points, {
    size: 18,
    thinning: 0.5,
    smoothing: 0.5,
    streamline: 0.5,
  });
  return getSvgPathFromStroke(strokeFromPoints);
}
