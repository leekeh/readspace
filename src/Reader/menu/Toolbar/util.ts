import type { Controls, Grouping } from "../controls";

export function groupByGrouping(controls: Controls) {
  return controls.reduce(
    (acc, control) => {
      if (!acc[control.grouping]) {
        acc[control.grouping] = [];
      }
      acc[control.grouping].push(control);
      return acc;
    },
    {} as Record<Grouping, Controls>
  );
}
