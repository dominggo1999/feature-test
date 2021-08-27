import { Rnd } from 'react-rnd';
import { useRef, useState } from 'react';
import tw, { styled } from 'twin.macro';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import DomToImage from '@yzfe/dom-to-image';
import useClickOutside from './hooks/useClickOutside';

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
  const textRef = useRef();
  const [scale, setScale] = useState(0.3);

  const [option, setOption] = useState({
    x: 0, y: 0, width: 800, height: 'auto',
  });
  const [borderOpacity, setBorderOpacity] = useState(0);
  const [enableResizing, setEnableResizing] = useState({
    top: false,
    right: false,
    left: false,
    bottom: false,
    topRight: false,
    bottomRight: false,
    bottomLeft: false,
    topLeft: false,
  });
  const [dragging, setDragging] = useState(true);

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

  const handleDragStart = (e) => {
    if(enableResizing.left && enableResizing.right) {
      setBorderOpacity(100);
    }
  };

  const handleDragStop = (e, d) => {
    if(enableResizing.left && enableResizing.right) {
      setOption({
        ...option,
        x: d.x,
        y: d.y,
      });
    }
  };

  const handleClick = (e) => {
    setDragging(false);
    setBorderOpacity(100);

    setEnableResizing({
      ...enableResizing,
      left: true,
      right: true,
    });
  };

  const toggleEditable = () => {
    setDragging(true);
    setEnableResizing({
      ...enableResizing,
      left: false,
      right: false,
    });
    setBorderOpacity(0);
  };

  useClickOutside(textRef, toggleEditable);

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
            <Rnd
              onClick={handleClick}
              bounds="parent"
              scale={scale}
              enableResizing={enableResizing}
              disableDragging={dragging}
              size={{ width: option.width, height: option.height }}
              position={{
                x: option.x,
                y: option.y,
              }}
              onDragStop={handleDragStop}
              onDragStart={handleDragStart}
              onResizeStop={(e, direction, ref, delta, position) => {
                setOption({
                  ...option,
                  width: ref.style.width,
                  height: ref.style.height, // auto
                  ...position,
                });
                setBorderOpacity(100);
              }}
            >
              <div
                ref={textRef}
                role="region"
                className={`relative flex w-full text-center text-white border-2 ${borderOpacity ? 'border-opacity-100' : 'border-opacity-0'} border-layer hover:border-opacity-100`}
                // onClick={handleClick}
                // onTouchStart={handleClick}
              >
                <div
                  className="w-full h-full break-words py-2 px-1 select-none pointer-events-none"
                  style={{
                    fontSize: '80px',
                    overflowWrap: 'break-word',
                  }}
                >Lorem ipsum dolor sit amet consectetur
                </div>
              </div>

            </Rnd>
          </FixedCanvas>
        </Canvas>
      </div>

    </div>
  );
};

export default App;
