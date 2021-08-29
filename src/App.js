import { useRef, useState } from 'react';
import tw, { styled } from 'twin.macro';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { Rnd } from 'react-rnd';

const Canvas = styled.div`
  ${tw`
    mx-auto
  `}
  width: 300px;
  height: 300px;
  transform: ${(props) => {
    return `scale(${props.scale})`;
  }}
`;

const FixedCanvas = styled.div`
${tw`
    bg-red-500 
  `}
  width: 300px;
  height: 300px;
  margin: 0 auto;
`;

const Container = styled.div`
  ${tw`
    w-full
    h-screen
    flex
    justify-center
    items-center
    bg-red-500
  `}
`;

const App = () => {
  const [scale, setScale] = useState(0.3);
  return (
    <div>
      <Container>
        <TransformWrapper
          doubleClick={{ disabled: true }}
          minScale={0.1}
          maxScale={2}
          initialScale={scale}
          limitToBounds={false}
          centerOnInit
          alignmentAnimation={{
            sizeX: 100,
            sizeY: 100,
          }}
          wheel={{
            activationKeys: ['z'],
          }}
          panning={{
            activationKeys: ['x'],
          }}
          onZoom={(e) => {
            setScale(e.state.scale);
          }}
        >
          <TransformComponent>
            <div className="w-screen h-screen flex justify-center items-center">
              <div
                style={{
                  width: '1000px',
                  height: '1000px',
                }}
                className="bg-blue-900"
              >
                <Rnd
                  default={{
                    x: 0,
                    y: 0,
                    width: 520,
                    height: 500,
                  }}
                  scale={scale}
                >
                  <h1 className="text-8xl">geawgewagew</h1>
                </Rnd>
              </div>
            </div>
          </TransformComponent>
        </TransformWrapper>
      </Container>
    </div>
  );
};

export default App;
