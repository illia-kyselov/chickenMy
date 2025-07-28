import * as React from "react"
import Svg, { Path } from "react-native-svg"
const CalendarIconSVG = () => (
  <Svg
    width={30}
    height={30}
    fill="none"
  >
    <Path
      stroke="#5E2D1D"
      strokeWidth={1.875}
      d="M2.5 15c0-4.714 0-7.071 1.465-8.535C5.43 5.001 7.786 5 12.5 5h5c4.714 0 7.071 0 8.535 1.465C27.499 7.93 27.5 10.286 27.5 15v2.5c0 4.714 0 7.071-1.465 8.535C24.57 27.499 22.214 27.5 17.5 27.5h-5c-4.714 0-7.071 0-8.535-1.465C2.501 24.57 2.5 22.214 2.5 17.5V15Z"
    />
    <Path
      stroke="#5E2D1D"
      strokeLinecap="round"
      strokeWidth={1.875}
      d="M8.75 5V3.125M21.25 5V3.125M3.125 11.25h23.75"
    />
    <Path
      fill="#5E2D1D"
      d="M22.5 21.25a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0Zm0-5a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0Zm-6.25 5a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0Zm0-5a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0Zm-6.25 5a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0Zm0-5a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0Z"
    />
  </Svg>
)
export default CalendarIconSVG
