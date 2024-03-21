import * as React from "react"
const NotificationIcono = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    viewBox=" 0 0 20 20"
    fill="none"
    {...props}
  >
    <path
      stroke={props.fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="M11.442 17.5a1.667 1.667 0 0 1-2.884 0M15 6.666a5 5 0 0 0-10 0c0 5.834-2.5 7.5-2.5 7.5h15S15 12.5 15 6.666Z"
    />
  </svg>
)
export default NotificationIcono;
