import { Rnd } from 'react-rnd';
import { useRef, useState, useEffect } from 'react';
import tw, { styled } from 'twin.macro';
import DomToImage from '@yzfe/dom-to-image';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import useClickOutside from './hooks/useClickOutside';
import Top from './components/Top';

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
  const bigWrapperRef = useRef();
  const textRef = useRef();
  const bigRef = useRef();
  const transformComponentRef = useRef(null);
  const [scale, setScale] = useState(0.3);
  const [disablePanning, setDisablePanning] = useState(false);
  const [viewableDimension, setViewableDimension] = useState({
    width: 0,
    height: 0,
  });
  const [canvasOverflow, setCanvasOverflow] = useState(false);
  const [viewableIndicator, setViewableIndicator] = useState({
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  });

  const resetScale = (time) => {
    const { setTransform } = transformComponentRef.current;

    const x = (bigRef.current.clientWidth - 1080 * 0.3) / 2;
    const y = (bigRef.current.clientHeight - 1920 * 0.3) / 2;

    setTransform(x, y, 0.3, time);
    setScale(0.3);
  };

  const updateViewableDimension = () => {
    const view = bigRef.current;
    setViewableDimension({
      ...viewableDimension,
      width: view.clientWidth,
      height: view.clientHeight,
    });
  };

  useEffect(() => {
    const whenResize = (e) => {
      resetScale();
      updateViewableDimension();
    };

    updateViewableDimension();

    window.addEventListener('resize', whenResize);
    return () => {
      window.removeEventListener('resize', whenResize);
    };
  }, []);

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

  // Draggable Indicator
  const onIndicatorDragStop = (e, d) => {
    setViewableIndicator({
      ...viewableIndicator,
      x: d.x,
      y: d.y,
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

  const updateScale = (e) => {
    const newScale = parseFloat(e.target.value);
    const ratio = Math.log(newScale / scale);
    const { zoomIn, zoomOut } = transformComponentRef.current;

    if(newScale > scale) {
      zoomIn(ratio, 0);
    }else{
      zoomOut(-ratio, 0);
    }

    setScale(scale * Math.exp(1 * ratio));
  };

  const handleWrapperInit = (e) => {
  };

  const handleZoomStop = (e) => {
    const a = transformComponentRef.current;
    const cw = 1080 * e.state.scale;
    const ch = 1920 * e.state.scale;

    const { width, height } = viewableDimension;
    const vw = width;
    const vh = height;

    const iw = 1080 / 5;
    const ih = 1920 / 5;

    const totalOverflowLength = ch - (-e.state.positionY) - vh;
    const{
      x, y, bottom, left,
    } = a.instance.contentComponent.getBoundingClientRect();

    // console.log(y, (-e.state.positionY), bottom - vh, ch - (-e.state.positionY) - vh);

    const sisaAtas = -e.state.positionY;
    const sisaBawah = ch - (-e.state.positionY) - vh;

    console.log(sisaBawah);

    if(ch > vh && cw < vw) {
      // Kalau sumbu y yang overflow , sumbu x full width
      setViewableIndicator({
        ...viewableIndicator,
        width: iw,
        height: (vh / ch) * ih,
        y: -e.state.positionY / 5,
      });
    }else if (ch < vh && cw > vh) {
      // Kalau sumbu x yang overflow , sumbu y full width

    }else if (ch > vh && cw > vw) {
      // Kalau 2 2 nya overflow
    }else{
      setViewableIndicator({
        width: 0,
        height: 0,
        x: 0,
        y: 0,
      });
    }
  };

  return (
    <div className="w-full h-screen bg-red-400 relative overflow-hidden">
      {/* Brilliant */}
      <div className="absolute bottom-0  w-full z-50 pointer-events-none">
        <div className="bottom-bar h-10 w-full  relative flex justify-end px-60">
          <div className="relative">
            <button className="bg-pink-500 p-3">View</button>
            <div
              style={{
                width: 1080 / 5,
                height: 1920 / 5,
                bottom: '150%',
              }}
              className="absolute bg-gray-900"
            >
              <Rnd
                size={{
                  width: viewableIndicator.width,
                  height: viewableIndicator.height,
                }}
                position={{ x: viewableIndicator.x, y: viewableIndicator.y }}
                onDragStop={onIndicatorDragStop}
                enableResizing={false}
                bounds="parent"
              >
                <div className="w-full h-full bg-green-900"></div>
              </Rnd>
            </div>
          </div>
        </div>
      </div>
      <Top
        scale={scale}
        updateScale={updateScale}
        toImage={toImage}
        center={center}
        resetScale={resetScale}
      />
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
            // activationKeys: ['z'],
          }}
          panning={{
            // activationKeys: ['x'],
            disabled: true,
            velocityDisabled: true,

          }}
          zoomAnimation={{ disabled: true }}
          centerOnInit
          onZoom={(e) => {
            setScale(e.state.scale);
          }}
          alignmentAnimation={{
            velocityAlignmentTime: 0,
          }}
          onInit={handleWrapperInit}
          onZoom={handleZoomStop}
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
