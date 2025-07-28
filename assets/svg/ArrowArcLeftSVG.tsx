import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const ArrowArcLeftSVG = ({ width = 45, height = 45 }) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 45 45"
    fill="none"
  >
    <Path
      fill="#5E2D1D"
      d="M7.5 18.75L6.836 19.414L6.174 18.75L6.836 18.086L7.5 18.75ZM38.438 33.75C38.938 33.75 39.375 33.313 39.375 32.813H37.5C37.5 33.313 37.938 33.75 38.438 33.75ZM16.21 28.79L6.836 19.414L8.164 18.086L17.539 27.461L16.21 28.79ZM6.836 18.086L16.211 8.711L17.539 10.039L8.164 19.414L6.836 18.086ZM7.5 17.813H26.25V19.688H7.5V17.813ZM38.438 30V33.75H36.563V30H38.438ZM26.25 17.813C32.812 17.813 38.438 23.438 38.438 30H36.563C36.563 24.469 31.781 19.688 26.25 19.688V17.813Z"
    />
  </Svg>
);

export default ArrowArcLeftSVG;
