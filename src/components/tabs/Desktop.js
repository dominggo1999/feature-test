import { isMobile } from 'react-device-detect';
import { ReactComponent as Edit } from '../../assets/edit.svg';

const justAnArray = Array.from(Array(10), () => 0);

const Desktop = () => {
  if(isMobile) {
    return null;
  }

  return (
    <div className="sidebar">
      {/* Tab List */}
      <div className="h-full bg-black">
        <div className="h-full overflow-y-scroll custom-scrollbar text-white">
          { /* Tab item */ }
          {
            justAnArray.map((i, id) => {
              const a = id;

              return (
                <div
                  key={`list-${a}`}
                  className="w-[72px] h-[72px]  flex flex-col justify-center items-center cursor-pointer"
                >
                  <Edit className="fill-current w-6 h-6" />
                  <p className="text-sm font-semibold">Text</p>
                </div>
              );
            })
          }

        </div>
      </div>

      {/* Controller */}
    </div>
  );
};

export default Desktop;
