import React, { Fragment,useState,useCallback,useEffect} from "react";
// import ReactFlow, { addEdge, Background,Controls,MiniMap,useEdgesState,useNodesState, StepEdge,Handle,Position } from "react-flow-renderer";
import {API,Auth, graphqlOperation,Storage, label} from "aws-amplify";
import { withAuthenticator, Button, Heading } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import * as queries from './graphql/queries';
import * as mutations from './graphql/mutations'

const App=()=>{
	const[fileName,setfileName]=useState("");
	const[filePath,setfilePath]=useState("");
	useEffect(()=>{
		// fetchName()
	},[])
async function fetchName(){
	const name=await API.graphql(graphqlOperation(queries.listTodos))
	const files=name.data.listTodos.items
	// console.log(files)
	const {fileAccessURL} = await Storage.get("sample.pdf");
	console.log('access url', fileAccessURL);
}
return(
  <button onClick={()=>fetchName()}>Get file</button>
)
}


export default App;
