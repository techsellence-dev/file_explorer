import React, { Fragment,useState,useCallback,useEffect, createContext} from "react";
 // import ReactFlow, { addEdge, Background,Controls,MiniMap,useEdgesState,useNodesState, StepEdge,Handle,Position } from "react-flow-renderer";
import {API,Auth, graphqlOperation,Storage, label} from "aws-amplify";
import { withAuthenticator, Button, Heading } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
// import DocViewer from "react-doc-viewer";
import FileViewer from "react-file-viewer";
import * as queries from './graphql/queries';
import * as mutations from './graphql/mutations'
 import Pdf from "./Pdf";
 
// import { configure } from "@testing-library/react";

// const file = "./logo192.png";
 const type = "pdf";

const onError = e => {
  console.log(e, "error in file-viewer");
};

const props = {
  allowFullScreen: true,
  src: "http://projects.itsasbreuk.nl/react-components/itsa-docviewer/example.pdf"
};

const App=({ signOut, user })=>{

return(
    <>
	 
		<Pdf></Pdf>  
	 <div className="App">
      <h1>React File Viewer Demo</h1>
      <h2>Displaying file with extension {type}</h2>
     
    </div>

    {/* <Pdf></Pdf>  */}
   
	</> 
  

)
 }
 
  export default withAuthenticator(App);

