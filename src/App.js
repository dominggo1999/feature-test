import { Rnd } from 'react-rnd';
import { useRef, useState } from 'react';
import tw, { styled } from 'twin.macro';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import DomToImage from '@yzfe/dom-to-image';

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
  const ref = useRef();
  const [scale, setScale] = useState(0.3);

  const updateScale = (e) => {
    setScale(parseFloat(e.target.value));
  };

  const toImage = async () => {
    const node = ref.current;

    await DomToImage.toPng(node).then((dataUrl) => {
      // const imageURL = canvas.toDataURL('image/png');
      // const a = document.createElement('a');
      const link = document.createElement('a');
      link.download = 'my-beautiful-quote.png';
      link.href = dataUrl;
      link.click();
    });
  };

  return (
    <div className="w-full h-screen bg-red-400 relative">
      <div className="fixed z-50">
        <input
          type="range"
          min="0.1"
          max="2"
          step="0.01"
          value={scale}
          onChange={updateScale}
        />
        <button
          className=" bg-indigo-600"
          onClick={toImage}
        >Download
        </button>
      </div>
      <div className="w-full h-full flex justify-center items-center">
        <Canvas
          scale={scale}
        >
          <FixedCanvas ref={ref}>
            <img
              src="https://images.pexels.com/photos/3754600/pexels-photo-3754600.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt="Cool"
              className="h-full"
            />
            <Rnd
              bounds="parent"
              scale={scale}
              default={{
                x: 0,
                y: 0,
                width: 1000,
                height: 1000,
              }}
            >
              <h1
                className="text-white"
                style={{
                  fontSize: '80px',
                }}
              >Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam at accusamus incidunt quos animi voluptates beatae, laboriosam nostrum unde voluptatibus?
              </h1>
            </Rnd>
          </FixedCanvas>
        </Canvas>
      </div>

    </div>
  );
};

export default App;
