import { useRef, useState } from 'react';
import tw, { styled } from 'twin.macro';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

const Container = styled.div`
  ${tw`
    w-full
    h-screen
    flex
    justify-center
    items-center
    bg-red-500
    overflow-hidden
  `}
`;

const App = () => {
  return (
    <div>
      <Container>
        <TransformWrapper
          doubleClick={{ disabled: true }}
          minScale={0.1}
          maxScale={2}
          initialScale={0.3}
          limitToBounds={false}
          centerOnInit
          alignmentAnimation={{
            sizeX: 100,
            sizeY: 100,
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, impedit?
              </div>
            </div>
          </TransformComponent>
        </TransformWrapper>
      </Container>
    </div>
  );
};

export default App;
