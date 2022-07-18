import React, {
  useCallback,
  memo,
  useState,
  useEffect,
  useContext,
} from "react";
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
import FileCopyTwoToneIcon from "@mui/icons-material/FileCopyTwoTone";
import * as queries from "./graphql/queries";
import * as mutations from "./graphql/mutations";
import FileViewer from "react-file-viewer";
import { API, Auth, graphqlOperation, Storage, label } from "aws-amplify";
import { HeightTwoTone, Public } from "@material-ui/icons";
import OnEvent from "react-onevent";
import { FaBeer } from "react-icons/fa";
const pdfviewim = require("./Assets/pdf.png");
const docviewim = require("./Assets/doc.png");
const jpgviewim = require("./Assets/jpg.png");
const xmlviewim = require("./Assets/xml.png");
const fileviewim = require("./Assets/file.png");
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

function Pdf() {
  const [fileName, setfileName] = useState("");
  const [filePath, setfilePath] = useState("");
  const [filelist, setfilelist] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const data = [{ id: { id }, name: { name } }];
  const [dataArr, setData] = useState([]);
  const [icon, seticon] = useState(true);
  const [a, setA] = useState([]);
  const deleteItem = async (value) => {
    for (var i = 0; i < filelist.length; i++) {
      if (value.orderID === filelist[i].orderID) {
        filelist.splice(i, 1);
        // console.log(filelist);

        console.log("data deleted");
        const del = await API.graphql({
          query: mutations.deleteOrder,
          variables: {
            input: { orderID: value.orderID },
          },
        });
        console.log(del);
        const fileAccessURL = await Storage.remove("first.pdf");
        console.log("access url", fileAccessURL);
        setfilelist([...filelist]);
      }
    }
  };
  const create = () => {
    setData([...dataArr, { id: id, name: name }]);
  };
  useEffect(() => {
    setData(dataArr);
    console.log("use effect");
  }, [dataArr]);

  useEffect(() => {
    fetchName();

    //  fetchdata()
  }, []);

  async function fetchName() {
    try {
      const name = await API.graphql(graphqlOperation(queries.listOrders));

      const files = name.data.listOrders.items;
      for (let i = 0; i < files.length; i++) {
        const exten = files[i].description;
        const fileExt = exten.split(".").pop();

        files[i] = { ...files[i], type: fileExt };
      }

      setfilelist(files);
      console.log(files);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchdata(filedata) {
    try {
      const result = await Storage.get(`sixth.pdf`);
      // , { download: true,level:Public }
      // level?: private
      console.log(result);
      //  const fileAccessURL = await Storage.get(filedata.orderID);
      //  setfilePath(fileAccessURL)
      //  console.log(fileAccessURL)
      // console.log(filedata)
      // console.log('access url', fileAccessURL);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {/* <iframe src="https://docs.google.com/document/d/e/2PACX-1vT54SwfF8oJ1qH1mnIsaY88CeDXH1JIrZOVwkzOnFFFKhbHgQe3elFIkqEGPl1Z5ZWDDDfAMKAuTvBs/pub?embedded=true"></iframe>
<iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vQngURS59TctWntZhZlm-VEPYvExsadEvGotffiwe4AmtEiV9CGi69UwX39jfb0VqwFaZy6NmJuIT6x/pubhtml?widget=true&amp;headers=false"></iframe> */}

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
            sx={{ width: "100%", maxWidth: 400, bgcolor: "background.paper" }}
          >
            {filelist.map((value) => (
              <>
                <Box style={{ display: "flex" }}>
                  <IconButton
                    sx={{ flexGrow: 1 }}
                    onClick={() => fetchName(value)}
                    primary={`${value.fileExt}`}
                  >
                  
                    {value.type == "pdf" ? (
                      <img src={pdfviewim} style={{ height: 20, width: 20 }} />
                    ) : value.type == "doc" ? (
                      <img src={docviewim} style={{ height: 20, width: 20 }} />
                    ) : value.type == "jpg" ? (
                      <img src={jpgviewim} style={{ height: 20, width: 20 }} />
                      ) : value.type == "xml" ? (
                        <img src={xmlviewim} style={{ height: 20, width: 20 }} />
                        ):<img src={fileviewim} style={{heigth:20,width:20}}/>
                         }
                  </IconButton>
                  <ListItem
                    key={value.orderID}
                    disableGutters
                    secondaryAction={
                      <IconButton aria-label="comment">
                        {icon ? (
                          <DeleteIcon onClick={() => deleteItem(value)} style={{ color: "#4169E1" ,fontSize:"large"}}/>
                        ) : null}

                        {/* <DeleteIcon  onClick={() => deleteItem(value)} /> */}
                      </IconButton>
                    }
                    // onClick={() => deleteItem(value)}
                  >
                    <ListItemText
                      onClick={() => fetchdata(value)}
                      primary={`${value.orderID}`}
                    />
                  </ListItem>
                </Box>
              </>
            ))}
          </List>
        </StyledTreeItem>
        <StyledTreeItem nodeId="4" labelText="File4" labelIcon={FileCopyIcon} />
      </TreeView>
    </>
  );
}
export default memo(Pdf);
