import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Grid,
  Select,
  InputLabel,
  FormControl,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import { createTask } from "../../services/api";
import useAuth from "../Auth/useAuth";

function CreateTaskDialog({ open, onClose }) {
  const { user } = useAuth();
  const [taskName, setTaskName] = useState("");
  const [target, setTarget] = useState("");
  const [unit, setUnit] = useState("select");
  const [rewards, setRewards] = useState([]);
  const [error, setError] = useState("");

  const handleTaskSubmit = async (e) => {
    e.preventDefault();

    const taskData = {
      userId: user.uid,
      name: taskName,
      target: target,
      unit: unit,
      rewards: rewards,
    };

    try {
      const response = await createTask(taskData);
      console.log("Task created:", response);
      onClose(); // Close dialog on success
    } catch (err) {
      setError("Failed to create task");
      console.error("Error creating task:", err);
    }
  };

  const addReward = () => {
    setRewards([...rewards, { unit: "select", name: "" }]);
  };

  const handleRewardChange = (index, field, value) => {
    const updatedRewards = [...rewards];
    updatedRewards[index][field] = value;
    setRewards(updatedRewards);
  };

  const handleTargetChange = (e) => {
    const value = e.target.value;
    if (value === "" || (!isNaN(value) && Number(value) >= 1)) {
      setTarget(value);
    }
  };

  const handleClose = () => {
    setTaskName("");
    setTarget("");
    setUnit("select");
    setRewards([]);
    setError("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Create Task
        {/* <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton> */}
      </DialogTitle>
      <DialogContent dividers>
        <Box component="form" onSubmit={handleTaskSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid size={{xs:12}}>
              <TextField
                label="Task Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                required
              />
            </Grid>

            <Grid size={{xs:12, sm:6}}>
              <TextField
                label="Target"
                type="number"
                fullWidth
                variant="outlined"
                value={target}
                onChange={handleTargetChange}
                required
              />
            </Grid>
            <Grid size={{xs:12, sm:6}}>
              <FormControl fullWidth>
                <InputLabel>Unit</InputLabel>
                <Select
                  value={unit}
                  label="Unit"
                  onChange={(e) => setUnit(e.target.value)}
                  required
                >
                  <MenuItem value="select">Select</MenuItem>
                  <MenuItem value="kg">Kilogram (kg)</MenuItem>
                  <MenuItem value="g">Gram (g)</MenuItem>
                  <MenuItem value="lb">Pound (lb)</MenuItem>
                  <MenuItem value="hr">Hour (hr)</MenuItem>
                  <MenuItem value="time">Time</MenuItem>
                  <MenuItem value="min">Minutes (min)</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Box textAlign="right" mt={2}>
            <Button variant="outlined" onClick={addReward}>
              Add Reward
            </Button>
          </Box>

          <Box mt={2}>
            {rewards.map((reward, index) => (
              <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
                <Grid size={{xs:6}}>
                  <FormControl fullWidth>
                    <InputLabel>Percentage</InputLabel>
                    <Select
                      value={reward.unit}
                      label="Percentage"
                      size="small"
                      onChange={(e) =>
                        handleRewardChange(index, "unit", e.target.value)
                      }
                    >
                      <MenuItem value="select">Select</MenuItem>
                      {[
                        "10%",
                        "20%",
                        "30%",
                        "40%",
                        "50%",
                        "60%",
                        "70%",
                        "80%",
                        "90%",
                        "100%",
                      ].map((value) => (
                        <MenuItem key={value} value={value}>
                          {value}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{xs:6}}>
                  <TextField
                    placeholder="Reward Name"
                    fullWidth
                    size="small"
                    value={reward.name}
                    onChange={(e) =>
                      handleRewardChange(index, "name", e.target.value)
                    }
                  />
                </Grid>
              </Grid>
            ))}
          </Box>

          {error && (
            <Alert severity="error" sx={{ my: 2 }}>
              {error}
            </Alert>
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Box display="flex" width="100%" gap={2}>
          <Button
            onClick={handleClose}
            color="primary"
            variant="outlined"
            fullWidth
          >
            Cancel
          </Button>
          <Button
            onClick={handleTaskSubmit}
            color="primary"
            variant="contained"
            fullWidth
          >
            Create Task
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}

export default CreateTaskDialog;
