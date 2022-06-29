export const Bar = ({ animationDuration, progress }) => (
  <div
    className="bg-gradient-to-r from-[rgb(211,248,154)] via-[rgb(127,251,169)] to-[rgb(64,237,195)] h-1 w-full left-0 top-0 fixed z-50"
    style={{
      marginLeft: `${(-1 + progress) * 100}%`,
      transition: `margin-left ${animationDuration}ms linear`,
    }}
  ></div>
);
