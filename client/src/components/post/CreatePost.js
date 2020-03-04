//React Import
import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
//material ui import
import {
  Dialog,
  TextField,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  DialogContentText
} from "@material-ui/core";

//Styled import
import styled from "styled-components";

//Import other components and actions
import Alert from "../layout/Alert";
import { createPost } from "../../actions/post";

//Styled components
const FormWrap = styled.div`
  display: flex;
  flex-direction: column;
`;
const TitleWrap = styled(TextField)`
width:45% !important
margin-bottom:5px;
`;
const DescriptionWrap = styled(TextField)`
  .MuiInputBase-root {
    height: 80px !important;
  }
`;

const CreatePost = ({ createPost, history }) => {
  //use state hooks
  const [open, setOpen] = useState(false);
  const [postData, setPostData] = useState({
    description: "",
    title: "",
    address: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitAllows, setSubmitAllows] = useState(false);

  //All the handle functions
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleData = (event, field) => {
    // so it will not keep rerendring
    if (event.target.value.length > 3) {
      let newPostData = postData;
      newPostData[field] = event.target.value;
      setPostData(newPostData);
    }
    if (
      postData.title.length > 3 &&
      postData.description.length > 3 &&
      postData.address.length > 3 &&
      !submitting
    ) {
      setSubmitAllows(true);
    }
  };

  const handleSubmit = () => {
    console.log(postData);
    setSubmitting(true);
    setSubmitAllows(false);
    createPost(postData, history);
    setTimeout(() => setSubmitting(false), 2000);
    //to do:
    //check the state if no error, close the dialog
  };

  const DisplayForm = () => {
    return (
      <FormWrap>
        <Alert />
        <TitleWrap
          autoFocus
          margin="dense"
          id="title"
          label="Title"
          onChange={event => handleData(event, "title")}
        />
        <DescriptionWrap
          autoFocus
          margin="dense"
          id="description"
          label="Description"
          fullWidth
          multiline
          variant="outlined"
          onChange={event => handleData(event, "description")}
        />
        <TextField
          autoFocus
          margin="dense"
          id="address"
          label="address"
          fullWidth
          onChange={event => handleData(event, "address")}
        />
      </FormWrap>
    );
  };
  return (
    <div>
      <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">Create posts</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Create a training post, enter the title, description and address
          </DialogContentText>
          {DisplayForm()}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            disabled={!submitAllows}
            color="secondary"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
const mapStateToProps = state => ({
  post: state.post
});
export default connect(mapStateToProps, { createPost })(withRouter(CreatePost));
