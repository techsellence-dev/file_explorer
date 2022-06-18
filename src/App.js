import React, { Fragment,useState,useCallback,useEffect} from "react";
// import ReactFlow, { addEdge, Background,Controls,MiniMap,useEdgesState,useNodesState, StepEdge,Handle,Position } from "react-flow-renderer";
import {API,Auth, graphqlOperation,Storage, label} from "aws-amplify";
import { withAuthenticator, Button, Heading } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
// import DocViewer from "react-doc-viewer";
import * as queries from './graphql/queries';
import * as mutations from './graphql/mutations'

const App=()=>{

	const[fileName,setfileName]=useState("");
	const[filePath,setfilePath]=useState("");
	const [filelist,setfilelist]=useState([])
	useEffect(()=>{
		 fetchName()
	},[])
	
async function fetchName(){
	try {
		const name=await API.graphql(graphqlOperation(queries.listTodos))
	
	
	const files=name.data.listTodos.items
	setfilelist(files)
	console.log(files)
	
	
	} catch (error) {
		console.log('error')
	}}
async function fetchdata(filedata){
	try {
		const fileAccessURL = await Storage.get(filedata.filePath);
		 console.log('access url', fileAccessURL);
	} catch (error) {
		console.log('error')
	}
}
	

return(
	<div>
  
  <div>
  {filelist.map((item) => (
	<div key={()=>item.id} onClick={()=>fetchdata(item)}>
		<h1>{item.length==0?"np data":item.fileName}</h1>
		<p>{item.length==0?"np data":item.filePath}</p>
	</div>
	))
   }
</div>
  <div></div> 
  </div>

)
}


export default withAuthenticator(App);
