import * as React from "react"
const SettingsIcono = (props) => (  
  <svg
  xmlns="http://www.w3.org/2000/svg"
  width={20}
  height={20}
  fill="none"
  {...props}
>
  <g
    stroke={props.stroke}
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={1.2}
    clipPath="url(#a)"
  >
    <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
    <path d="M16.166 12.5a1.375 1.375 0 0 0 .275 1.517l.05.05a1.667 1.667 0 1 1-2.358 2.358l-.05-.05a1.375 1.375 0 0 0-1.517-.275 1.376 1.376 0 0 0-.833 1.258v.142a1.667 1.667 0 0 1-3.333 0v-.075a1.375 1.375 0 0 0-.9-1.258 1.375 1.375 0 0 0-1.517.275l-.05.05a1.666 1.666 0 0 1-2.72-1.818c.084-.202.207-.386.362-.54l.05-.05a1.375 1.375 0 0 0 .275-1.517 1.375 1.375 0 0 0-1.259-.834H2.5a1.667 1.667 0 1 1 0-3.333h.075a1.375 1.375 0 0 0 1.258-.9 1.375 1.375 0 0 0-.275-1.517l-.05-.05a1.667 1.667 0 1 1 2.358-2.358l.05.05a1.375 1.375 0 0 0 1.517.275H7.5a1.375 1.375 0 0 0 .833-1.258V2.5a1.667 1.667 0 1 1 3.333 0v.075a1.376 1.376 0 0 0 .834 1.258 1.375 1.375 0 0 0 1.516-.275l.05-.05a1.666 1.666 0 0 1 2.72 1.818 1.666 1.666 0 0 1-.361.54l-.05.05a1.375 1.375 0 0 0-.275 1.517V7.5a1.375 1.375 0 0 0 1.258.833h.142a1.667 1.667 0 0 1 0 3.334h-.075a1.375 1.375 0 0 0-1.259.833Z" />
  </g>
  <defs>
    <clipPath id="a">
      <path fill="#fff" d="M0 0h20v20H0z" />
    </clipPath>
  </defs>
</svg>
)
export default SettingsIcono;
