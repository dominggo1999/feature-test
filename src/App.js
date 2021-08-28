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
  }};
  transform-origin: center center;
`;

const FixedCanvas = styled.div`
  ${tw`
    bg-red-500
  `}
  width: 1080px;
  height: 1920px;
  transform: ${(props) => {
    return `scale(${props.scale})`;
  }}
`;

const App = () => {
  const ref = useRef();
  const textRef = useRef();
  const canvasRef = useRef();
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
          max="1.5"
          step="0.01"
          value={scale}
          onChange={updateScale}
          className="mx-10 w-60"
        />
        <button
          className=" bg-indigo-600"
          onClick={toImage}
        >Download
        </button>
      </div>
      <div
        style={{
          transform: `scale(${scale})`,
        }}
        className="w-full h-full flex items-center justify-center"
      >
        <div
          className="bg-blue-600"
          style={{
            width: 600,
            height: 600,
          }}
        >
        </div>
      </div>
    </div>
  );
};

export default App;
