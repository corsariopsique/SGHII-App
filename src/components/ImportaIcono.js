import * as React from "react"
import SVG from 'react-inlinesvg';

function ImportaIcono (props) {

  return (
    
      <SVG
        src={props.src}
        width={128}
        height="auto"
        title="React"
        viewBox="0 0 30 30"   
      />    
  );
}

export default ImportaIcono;