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
  const [offsetLeft, setOffsetLeft] = useState(0);
  const [offsetTop, setOffsetTop] = useState(0);

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

  // Wrapper ref
  const wrapperRef = useRef(null);

  const updateScale = (e) => {
    const scale = parseFloat(e.target.value);
    setScale(scale);

    // Center scrollbar
    const wrapperWidth = 500;
    const initialChildWidth = 200;

    const currentChildWidth = scale * initialChildWidth;
    if(currentChildWidth > wrapperWidth) {
      const newOffset = (currentChildWidth - wrapperWidth) / (2 * scale);
      setOffsetLeft(newOffset);
      setOffsetTop(newOffset);
      wrapperRef.current.scrollTo(newOffset * scale, newOffset * scale);
    }else{
      setOffsetLeft(0);
      setOffsetTop(0);
    }
  };

  return (
    <div className="w-full h-screen bg-red-400 relative">
      <div className="w-full flex justify-center flex-col">
        <input
          type="range"
          min="0.1"
          max="4"
          step="0.01"
          value={scale}
          onChange={updateScale}
          className="mx-auto w-60 mt-5"
        />
        <div
          ref={wrapperRef}
          style={{
            width: '500px',
            height: '500px',
          }}
          className="mx-auto mt-4 bg-blue-600 flex justify-center items-center overflow-auto"
        >
          {/* Kotak di tengah */}
          {console.log(offsetLeft)}
          <div
            style={{
              width: '200px',
              height: '200px',
              transform: `scale(${scale}) translate(${offsetLeft}px,${offsetTop}px)`,
            }}
            className="bg-yellow-600"
          >
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur, quidem dolore amet voluptatum illo repellat totam aut magni nulla suscipit
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
