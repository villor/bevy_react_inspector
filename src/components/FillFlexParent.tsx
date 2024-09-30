import type { ReactElement } from 'react';
import useResizeObserver from 'use-resize-observer';

interface Props {
  children: (dimens: { width: number; height: number }) => ReactElement;
}

export const FillFlexParent = forwardRef((
  props: Props,
  forwardRef,
) => {
  const { ref, width, height } = useResizeObserver();
  return (
    <div className="size-full min-h-0 min-w-0 flex-1" ref={mergeRefs(ref, forwardRef)}>
      {width && height ? props.children({ width, height }) : null}
    </div>
  );
});
