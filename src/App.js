// https://stackoverflow.com/questions/61642758/dynamically-load-font-from-file-based-on-userinput

import { useState, useRef } from 'react';

const App = () => {
  const ref = useRef();
  const [fontList, setFontList] = useState([]);
  const [activeFont, setActiveFont] = useState('sans-serif');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const file = ref.current.files[0];
    const data = await file.arrayBuffer();
    const fontFamily = file.name.split('.')[0];

    const font = new FontFace(fontFamily, data);
    await font.load();
    document.fonts.add(font);

    // Add font to list
    setFontList([
      ...fontList,
      fontFamily,
    ]);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          ref={ref}
        />
        <button
          className="bg-red-500 text-white p-3"
          type="submit"
        >Upload
        </button>
      </form>

      <ul className="mb-20">
        {
          fontList && fontList.map((font) => {
            return (
              <li
                onClick={() => setActiveFont(font)}
                key={`font-${font}`}
              >{font}
              </li>
            );
          })
        }
      </ul>
      <h1
        className="text-8xl"
        style={{
          fontFamily: activeFont,
        }}
      >A very big text
      </h1>
    </div>
  );
};

export default App;
