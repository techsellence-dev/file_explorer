import React, { Fragment,useState,useCallback,useEffect} from "react";
 // import ReactFlow, { addEdge, Background,Controls,MiniMap,useEdgesState,useNodesState, StepEdge,Handle,Position } from "react-flow-renderer";
import {API,Auth, graphqlOperation,Storage, label} from "aws-amplify";
import { withAuthenticator, Button, Heading } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
// import DocViewer from "react-doc-viewer";
import * as queries from './graphql/queries';
import * as mutations from './graphql/mutations'
 import Pdf from "./Pdf";
 
// import { configure } from "@testing-library/react";
 const App=({ signOut, user })=>{

	const[fileName,setfileName]=useState("");
	const[filePath,setfilePath]=useState("");
	const [filelist,setfilelist]=useState([])
	useEffect(()=>{
		 fetchName()
		// fetchdata()
	},[])
	
async function fetchName(){
	try {
		const name=await API.graphql(graphqlOperation(queries.listOrders))
	
	console.log(name)
	const files=name.data.listOrders.items
	setfilelist(files)
	console.log(files)
	
	
	} catch (error) {
		console.log('error')
	}}
async function fetchdata(filedata){
	try {
		const fileAccessURL = await Storage.get('sample.pdf');
		 console.log('access url', fileAccessURL);
	} catch (error) {
		console.log('error')
	}
}
	

return(
    <>
	<div>
  
  <div>
  {filelist.map((item) => (
	<div key={()=>item.id} onClick={()=>fetchdata(item)}>
		<h1>{item.length==0?"np data": item.orderID}</h1>
		<p>{item.length==0?"np data":item.description}</p>
	</div>
	))
   }
</div>
  

<Heading level={1}>Hello {user.username}</Heading>
      <Button onClick={signOut}>Sign out</Button>
    <Pdf></Pdf> 
    </div>
	</> 
  

)
 }


  export default withAuthenticator(App);

