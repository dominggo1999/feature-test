const Top = ({
  scale, updateScale, toImage, center, resetScale,
}) => {
  return (
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
        onClick={() => resetScale(300)}
      >Reset
      </button>
    </div>
  );
};

export default Top;
