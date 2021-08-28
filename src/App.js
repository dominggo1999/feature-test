import {
  useRef, useState, useEffect, useCallback, useLayoutEffect,
} from 'react';
import tw, { styled } from 'twin.macro';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import QuickPinchZoom, { make3dTransformValue } from 'react-quick-pinch-zoom';
import panzoom from 'panzoom';

const ZoomControl = ({ props }) => {
  console.log(props);
  const { scale, setScale, options } = props;

  const [value, setValue] = useState(props.state.scale);

  useEffect(() => {
    setScale(value);
  }, [value]);

  return (
    <input
      type="range"
      min={0.1}
      max={2}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

const Container = styled.div`
  ${tw`
    w-full
    h-screen
    flex
    justify-center
    items-center
    bg-red-500
    overflow-auto
  `}
`;

const Canvas = styled.div`
  width: 1080px;
  height: 1920px;
  transform: ${(props) => {
    return `scale(${props.scale})`;
  }}
`;

const FixedCanvas = styled.div`
${tw`
    bg-red-500
  `}
  width: 1080px;
  height: 1920px;
`;

const App = () => {
  const viewRef = useRef();

  const elementRef = useRef(null);
  const panzoomRef = useRef(null);

  // Set up panzoom on mount, and dispose on unmount
  useLayoutEffect(() => {
    const instance = panzoom(elementRef.current, {
      initialZoom: 0.25,
      minZoom: 0.25,
      maxZoom: 4,
      onDoubleClick(e) {
        // `e` - is current double click event.

        return true; // tells the library to not preventDefault, and not stop propagation
      },
      beforeMouseDown(e) {
        // allow mouse-down panning only if altKey is down. Otherwise - ignore
        const shouldIgnore = !e.altKey;
        return shouldIgnore;
      },
      beforeWheel(e) {
        // allow wheel-zoom only if altKey is down. Otherwise - ignore
        const shouldIgnore = !e.altKey;
        return shouldIgnore;
      },
    });

    // instance.pause(); //  Pauses event handling

    panzoomRef.current = instance;

    panzoomRef.current.on('pan', () => console.log('Pan!'));
    panzoomRef.current.on('zoom', () => console.log('Zoom!'));

    return () => {
      panzoomRef.current.dispose();
    };
  }, []);

  return (
    <div>
      <Container>
        <div
          ref={elementRef}
          className="view"
          className="bg-red-500"
        >
          <div
            style={{
              width: '1000px',
              height: '1000px',
              background: '#1E1E1E',
            }}
          >
          </div>
        </div>
      </Container>
    </div>
  );
};

export default App;
