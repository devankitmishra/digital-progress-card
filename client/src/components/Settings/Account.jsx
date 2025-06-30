import React, { useState, useRef } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import Settings from "./Settings";
import { NavLink } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LockResetIcon from "@mui/icons-material/LockReset";

const Account = () => {
  const initialEmail = "username@gmail.com";
  const initialProfileImage = "../../media/images/user-profile.png";

  const [email, setEmail] = useState(initialEmail);
  const [newEmail, setNewEmail] = useState("");
  const [emailOtp, setEmailOtp] = useState("");
  const [editEmailDialogOpen, setEditEmailDialogOpen] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);

  const [profileImage, setProfileImage] = useState(initialProfileImage);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
      setSelectedFile(file);
    }
  };

  const handleSaveImage = () => {
    if (selectedFile) {
      console.log("Image saved:", selectedFile);
      setSelectedFile(null);
    } else {
      console.error("No file selected to save.");
    }
  };

  const handleSaveEmail = () => {};

  const handleClose = () => {
    onClose();
  };

  const handleChangeEmail = () => {
    if (emailOtp === "123456") {
      setEmail(newEmail);
      setNewEmail("");
      setEmailOtp("");
      setEditEmailDialogOpen(false);
    }
  };

  const handleSavePassword = () => {
    console.log("Old Password:", oldPassword);
    console.log("New Password:", newPassword);
    setOldPassword("");
    setNewPassword("");
    setPasswordDialogOpen(false);
  };

  const handleDeleteAccount = () => {
    console.log("Account deleted.");
    setDeleteDialogOpen(false);
  };

  return (
    <Box display="flex" height="100vh">
      <Box display={{ xs: "none", sm: "block" }} width="auto">
        <Settings />
      </Box>

      <Box m="auto" p={4} width={{ xs: "90%", sm: "75%" }}>
        <Typography variant="h4" fontWeight="bold" mb={4}>
          Account
        </Typography>

        {/* Email Section */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Typography>
            <strong>Email:</strong> {email}
          </Typography>
          <IconButton></IconButton>
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={() => setEditEmailDialogOpen(true)}
          >
            Change Email
          </Button>
        </Box>

        {/* Password Section */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Typography>
            <strong>Password:</strong> **********
          </Typography>
          <Button
            variant="outlined"
            startIcon={<LockResetIcon />}
            onClick={() => setPasswordDialogOpen(true)}
          >
            Change Password
          </Button>
        </Box>

        {/* Delete Account Section */}
        <Box>
          <Typography variant="h6">Delete Account</Typography>
          <Typography mt={1}>
            Deleting your account will permanently erase all data. This action
            cannot be undone.
          </Typography>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            sx={{ mt: 2 }}
            onClick={() => setDeleteDialogOpen(true)}
          >
            Delete Account
          </Button>
        </Box>

        {/* Go Back Link */}
        <NavLink
          to="/settings"
          className="sm:hidden flex w-32 mt-4 rounded-md px-3 py-2 text-gray-600"
        >
          <Typography fontWeight="bold">Go Back</Typography>
        </NavLink>

        {/* --- Email Dialog --- */}
        <Dialog
          open={editEmailDialogOpen}
          onClose={() => setEditEmailDialogOpen(false)}
          fullWidth
          maxWidth="xs"
        >
          <DialogTitle>Change Email</DialogTitle>
          <DialogContent
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              label="New Email"
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              fullWidth
              sx={{marginTop:1}}
            />
            <Button variant="contained" onClick={handleSaveEmail}>
              Send OTP
            </Button>
            <TextField
              label="Enter OTP"
              value={emailOtp}
              onChange={(e) => setEmailOtp(e.target.value)}
              fullWidth
            />
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Box display="flex" width="100%" gap={2}>
              <Button
                onClick={() => setEditEmailDialogOpen(false)}
                color="primary"
                variant="outlined"
                fullWidth
              >
                Cancel
              </Button>
              <Button
                onClick={handleChangeEmail}
                color="primary"
                variant="contained"
                fullWidth
              >
                Change Email
              </Button>
            </Box>
          </DialogActions>
        </Dialog>

        {/* --- Password Dialog --- */}
        <Dialog
          open={passwordDialogOpen}
          onClose={() => setPasswordDialogOpen(false)}
          fullWidth
          maxWidth={"xs"}
        >
          <DialogTitle>Change Password</DialogTitle>
          <DialogContent
            sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
          >
            <TextField
              label="Old Password"
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              fullWidth
            />
            <TextField
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              fullWidth
            />
            <TextField
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
            />
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Box display="flex" width="100%" gap={2}>
              <Button
                onClick={() => setPasswordDialogOpen(false)}
                color="primary"
                variant="outlined"
                fullWidth
              >
                Cancel
              </Button>
              <Button
                onClick={handleSavePassword}
                color="primary"
                variant="contained"
                fullWidth
              >
                Save Password
              </Button>
            </Box>
          </DialogActions>
        </Dialog>

        {/* --- Delete Confirmation Dialog --- */}
        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
        >
          <DialogTitle>Confirm Account Deletion</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete your account? This action cannot
              be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setDeleteDialogOpen(false)}
              variant="contained"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteAccount}
              color="error"
              variant="contained"
            >
              Confirm Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default Account;
