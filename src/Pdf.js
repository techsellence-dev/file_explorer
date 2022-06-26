import React, { useCallback, memo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TreeView from "@mui/lab/TreeView";
import TreeItem, { treeItemClasses } from "@mui/lab/TreeItem";
import Typography from "@mui/material/Typography";
import MailIcon from "@mui/icons-material/Mail";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CommentIcon from "@mui/icons-material/Comment";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    "&.Mui-expanded": {
      fontWeight: theme.typography.fontWeightRegular,
    },
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
    "&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused": {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
      color: "var(--tree-view-color)",
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: "inherit",
      color: "inherit",
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 0,
    [`& .${treeItemClasses.content}`]: {
      paddingLeft: theme.spacing(2),
    },
  },
}));

function StyledTreeItem(props) {
  const {
    bgColor,
    color,
    labelIcon: LabelIcon,
    labelInfo,
    labelText,
    ...other
  } = props;

  return (
    <StyledTreeItemRoot
      label={
        <Box sx={{ display: "flex", alignItems: "center", p: 0.5, pr: 0 }}>
          <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
          <Typography
            variant="body2"
            sx={{ fontWeight: "inherit", flexGrow: 1 }}
          >
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </Box>
      }
      style={{
        "--tree-view-color": color,
        "--tree-view-bg-color": bgColor,
      }}
      {...other}
    />
  );
}

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.elementType.isRequired,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
};

// const data = [
//   { id: "1", name: "node1" },
//   { id: "2", name: "node2" },
//   { id: "3", name: "node3" },
// ];
function Pdf() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const data = [{ id: { id }, name: { name } }];
  const [dataArr, setData] = useState([]);
  const deleteItem = useCallback(
    (value) => {
      for (var i = 0; i < dataArr.length; i++) {
        if (value.id === dataArr[i].id) {
          dataArr.splice(i, 1);
          console.log(dataArr);
          setData([...dataArr]);
          console.log("data deleted");
        }
      }
    },
    [dataArr]
  );
  const create = () => {
    setData([...dataArr, { id: id, name: name }]);
  };
  useEffect(() => {
    setData(dataArr);
    console.log("use effect");
  }, [dataArr]);
  return (
    <>
      <div>
        <form>
          <input
            type="text"
            placeholder="enter node name"
            onChange={(name) => setName(name.target.value)}
          ></input>
          <br></br>
          <input
            type="text"
            placeholder="enter node id"
            onChange={(id) => setId(id.target.value)}
          ></input>
          <br /> <br /> <br />
        </form>
        <button onClick={create}>Submit</button>
        <br /> <br /> <br />
      </div>
      <TreeView
        aria-label="gmail"
        defaultExpanded={["3"]}
        defaultCollapseIcon={<ArrowDropDownIcon />}
        defaultExpandIcon={<ArrowRightIcon />}
        defaultEndIcon={<div style={{ width: 24 }} />}
        sx={{ height: 600, flexGrow: 1, maxWidth: 200 }}
      >
        <StyledTreeItem
          nodeId="1"
          labelText="File1"
          labelIcon={FileCopyIcon}
          onClick={() => alert("Hello")}
        />

        <StyledTreeItem nodeId="2" labelText="File2" labelIcon={FileCopyIcon}>
          <StyledTreeItem
            nodeId="5"
            labelText="File3-1"
            labelIcon={FileCopyIcon}
            //   labelInfo="90"
            color="#1a73e8"
            bgColor="#e8f0fe"
          />
          <StyledTreeItem
            nodeId="5"
            labelText="File3-1"
            labelIcon={FileCopyIcon}
            //   labelInfo="90"
            color="#1a73e8"
            bgColor="#e8f0fe"
          />
        </StyledTreeItem>
        <StyledTreeItem nodeId="3" labelText="File3" labelIcon={FileCopyIcon}>
          <List
            style={{ marginLeft: "30%" }}
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {dataArr.map((value) => (
              <ListItem
                key={value.id}
                disableGutters
                secondaryAction={
                  <IconButton aria-label="comment">
                    <DeleteIcon />
                  </IconButton>
                }
                onClick={() => deleteItem(value)}
              >
                <ListItemText primary={`Line item ${value.name}`} />
              </ListItem>
            ))}
          </List>
        </StyledTreeItem>
        <StyledTreeItem nodeId="4" labelText="File4" labelIcon={FileCopyIcon} />
      </TreeView>
    </>
  );
}
export default memo(Pdf);
