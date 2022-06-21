// import React, { Fragment,useState,useCallback,useEffect} from "react";
// // import ReactFlow, { addEdge, Background,Controls,MiniMap,useEdgesState,useNodesState, StepEdge,Handle,Position } from "react-flow-renderer";
// import {API,Auth, graphqlOperation,Storage, label} from "aws-amplify";
// import { withAuthenticator, Button, Heading } from '@aws-amplify/ui-react';
// import '@aws-amplify/ui-react/styles.css';
// // import DocViewer from "react-doc-viewer";
// import * as queries from './graphql/queries';
// import * as mutations from './graphql/mutations'
// import Pdf from "./Pdf";
// import { configure } from "@testing-library/react";
// const App=()=>{

// 	const[fileName,setfileName]=useState("");
// 	const[filePath,setfilePath]=useState("");
// 	const [filelist,setfilelist]=useState([])
// 	useEffect(()=>{
// 		 fetchName()
// 		// fetchdata()
// 	},[])
	
// async function fetchName(){
// 	try {
// 		const name=await API.graphql(graphqlOperation(queries.listTodos))
	
	
// 	const files=name.data.listTodos.items
// 	setfilelist(files)
// 	console.log(files)
	
	
// 	} catch (error) {
// 		console.log('error')
// 	}}
// async function fetchdata(filedata){
// 	try {
// 		const fileAccessURL = await Storage.get('sample.pdf');
// 		 console.log('access url', fileAccessURL);
// 	} catch (error) {
// 		console.log('error')
// 	}
// }
	

// return(
// 	<div>
  
//   <div>
//   {filelist.map((item) => (
// 	<div key={()=>item.id} onClick={()=>fetchdata(item)}>
// 		<h1>{item.length==0?"np data":item.fileName}</h1>
// 		<p>{item.length==0?"np data":item.filePath}</p>
// 	</div>
// 	))
//    }
// </div>
//   <div>
// 	{/* <Pdf></Pdf> */}
// 	</div> 
//   </div>

// )
// }


// export default withAuthenticator(App);

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
const useViewStyles = makeStyles({
  root: {}
});

const useItemStyles = makeStyles(theme => ({
  root: {
    "& > .MuiTreeItem-content > .MuiTreeItem-label": {
      display: "flex",
      alignItems: "center",
      padding: "4px 0",
      background: "transparent !important",
      pointerEvents: "none"
    },
    "& > .MuiTreeItem-content  > .MuiTreeItem-label::before": {
      content: "''",
      display: "inline-block",
      width: 12,
      height: 12,
      marginRight: 8,
      border: "1px solid #ccc",
      background: "white"
    }
  },
  iconContainer: {
    marginRight: 12,
    "& > svg": {
      padding: 8,
      "&:hover": {
        opacity: 0.6
      }
    }
  },
  label: {
    padding: 0
  },
  selected: {
    "& > .MuiTreeItem-content  > .MuiTreeItem-label::before": {
      background: theme.palette.primary.main,
      border: "1px solid transparent"
    }
  }
}));

export default function ControlledTreeView() {
  const classesView = useViewStyles();
  const classesItem = useItemStyles();

  const [expanded, setExpanded] = React.useState([]);
  const [selected, setSelected] = React.useState([]);

  const handleToggle = (event, nodeIds) => {
    if (event.target.nodeName !== "svg") {
      return;
    }
    setExpanded(nodeIds);
  };

  const handleSelect = (event, nodeIds) => {
    if (event.target.nodeName === "svg") {
      return;
    }
    const first = nodeIds[0];
    if (selected.includes(first)) {
      setSelected(selected.filter(id => id !== first));
    } else {
      setSelected([first, ...selected]);
    }
  };
  const handleExpandClick = () => {
	    setExpanded((oldExpanded) =>
	      oldExpanded.length === 0 ? ["1", "5", "6", "7", "10", "11"] : []
	    );
	  };
	
	  const handleSelectClick = () => {
	    setSelected((oldSelected) =>
	      oldSelected.length === 0
	        ? ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
	        : []
	    );
	  };

  return (
  <Box sx={{ height: 570, flexGrow: 1, maxWidth: 800, overflowY: "auto" }}>
       <Box sx={{ mb: 1 }}>
         <Button onClick={handleExpandClick}>
           {expanded.length === 0 ? "Expand all" : "Collapse all"}
         </Button>
         <Button onClick={handleSelectClick}>
           {selected.length === 0 ? "Select all" : "Unselect all"}
         </Button>
      </Box>
	  
    <TreeView
      classes={classesView}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      expanded={expanded}
      selected={selected}
      onNodeToggle={handleToggle}
      onNodeSelect={handleSelect}
      multiSelect
    >
      <TreeItem classes={classesItem} nodeId="1" label="Applications">
        <TreeItem classes={classesItem} nodeId="2" label="Calendar" />
        <TreeItem classes={classesItem} nodeId="3" label="Chrome" />
        <TreeItem classes={classesItem} nodeId="4" label="Webstorm" />
      </TreeItem>
      <TreeItem classes={classesItem} nodeId="5" label="Documents">
        <TreeItem classes={classesItem} nodeId="6" label="Material-UI">
          <TreeItem classes={classesItem} nodeId="7" label="src">
            <TreeItem classes={classesItem} nodeId="8" label="index.js" />
            <TreeItem classes={classesItem} nodeId="9" label="tree-view.js" />
          </TreeItem>
        </TreeItem>
      </TreeItem>
    </TreeView>
	</Box>
  );
  
}
