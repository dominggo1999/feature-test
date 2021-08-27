import * as React from 'react';
import Moveable from 'react-moveable';
import tw, { styled } from 'twin.macro';

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

export default function App() {
  const [target, setTarget] = React.useState();
  const [frame, setFrame] = React.useState({
    translate: [0, 0],
  });
  React.useEffect(() => {
    setTarget(document.querySelector('.target'));

    const moveable = new Moveable(document.body);

    window.addEventListener('resize', (e) => {
      moveable.updateRect();
    });
  }, []);

  return (
    <div className="container">
      <div className="target w-full">
        <h1 className="w-full">Targgewagewagaewgewagaewgeet</h1>
      </div>
      <Moveable
        target={target}
        draggable
        throttleDrag={0}
        startDragRotate={0}
        throttleDragRotate={0}
        zoom={1}
        origin={false}
        padding={{
          left: 0, top: 0, right: 0, bottom: 0,
        }}
        onDragStart={(e) => {
          e.set(frame.translate);
        }}
        onDrag={({ target, beforeTranslate }) => {
          target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;
        }}
        onDragEnd={({ lastEvent }) => {
          if (lastEvent) {
            frame.translate = lastEvent.beforeTranslate;
          }
        }}
        resizable
        keepRatio={false}
        throttleResize={0}
        renderDirections={['nw', 'n', 'ne', 'w', 'e', 'sw', 's', 'se']}
        onResizeStart={(e) => {
          e.setOrigin(['%', '%']);
          e.dragStart && e.dragStart.set(frame.translate);
          e.setMin([50, 50]);
        }}
        onResize={({
          target, width, height, drag,
        }) => {
          console.log(width, height);
          const beforeTranslate = drag.beforeTranslate;
          target.style.width = `${width}px`;
          target.style.height = `${height}px`;
          target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;
        }}
        onResizeEnd={({ lastEvent }) => {
          if (lastEvent) {
            frame.translate = lastEvent.drag.beforeTranslate;
          }
        }}
      />
    </div>
  );
}
