import { Rnd } from 'react-rnd';
import { useRef, useState } from 'react';
import tw, { styled } from 'twin.macro';
import DomToImage from '@yzfe/dom-to-image';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
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
  const bigRef = useRef();
  const transformComponentRef = useRef(null);
  const [scale, setScale] = useState(0.3);
  const [disablePanning, setDisablePanning] = useState(false);

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
    setDisablePanning(true);
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
    setDisablePanning(false);
  };

  useClickOutside(textRef, toggleEditable);

  const center = () => {
    const { centerView } = transformComponentRef.current;
    centerView();
  };

  const resetScale = () => {
    const { setTransform } = transformComponentRef.current;

    const x = (bigRef.current.clientWidth - 1080 * 0.3) / 2;
    const y = (bigRef.current.clientHeight - 1920 * 0.3) / 2;

    setTransform(x, y, 0.3);
    setScale(0.3);
  };

  const updateScale = (e) => {
    const newScale = parseFloat(e.target.value);
    const ratio = Math.log(newScale / scale);
    const { zoomIn, zoomOut } = transformComponentRef.current;

    console.log(scale * Math.exp(1 * ratio), newScale);

    if(newScale > scale) {
      zoomIn(ratio, 0);
    }else{
      zoomOut(-ratio, 0);
    }

    setScale(scale * Math.exp(1 * ratio));
  };

  return (
    <div className="w-full h-screen bg-red-400 relative">
      <div className="fixed z-50">
        <input
          type="range"
          min="0.1"
          max="1.5"
          step="0.01"
          value={scale}
          onChange={updateScale}
        />
        <button
          className=" bg-indigo-600 mx-3"
          onClick={toImage}
        >Download
        </button>
        <button
          className=" bg-indigo-600 mx-3"
          onClick={center}
        >Center
        </button>
        <button
          className=" bg-indigo-600 mx-3"
          onClick={resetScale}
        >Reset
        </button>
      </div>
      <div
        ref={bigRef}
        className="w-full h-full justify-center items-center"
      >
        <TransformWrapper
          ref={transformComponentRef}
          onZoomStop={(e) => {
            setScale(e.state.scale);
          }}
          initialScale={scale}
          minScale={0.1}
          maxScale={1.5}
          doubleClick={{
            disabled: true,
          }}
          wheel={{
            activationKeys: ['z'],
          }}
          panning={{
            activationKeys: ['x'],
            disabled: disablePanning,
          }}
          limitToBounds={false}
          zoomAnimation={{ disabled: true }}
          centerOnInit
          onZoom={(e) => {
            setScale(e.state.scale);
          }}
        >
          {({
            zoomIn, zoomOut, setTransform, ...rest
          }) => {
            return (
              <TransformComponent
                wrapperStyle={{
                  width: '100%',
                  height: '100%',
                }}
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
              </TransformComponent>
            );
          }}
        </TransformWrapper>
      </div>
    </div>
  );
};

export default App;
