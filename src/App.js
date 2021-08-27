import { useRef } from 'react';

const App = () => {
  const ref = useRef();

  const createFontFace = (e) => {
    e.preventDefault();
    const file = ref.current.files[0];
    const filename = file.name;
    const fontFamily = filename.split('.')[0];

    const myFont = new Font(fontFamily);

    // Use filereader to read the file
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onload = () => {
      // Pass the buffer, and the original filename
      myFont.fromDataBuffer(reader.result, file.name);
      myFont.onload = (e) => {
        // ...
      };
    };
  };

  return (
    <div>
      <h1>Upload your font</h1>
      <form onSubmit={createFontFace}>
        <input
          ref={ref}
          type="file"
        />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default App;
