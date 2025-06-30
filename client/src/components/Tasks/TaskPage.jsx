import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  Stack,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
} from "@mui/material";
import { FilePenLine, Trash2 } from "lucide-react";

// import AddTask from './AddTask';
// import CreateTask from './CreateTask';
import "../../styles/taskPage.css";
import CreateTaskDialog from "./CreateTask";

const TaskPage = () => {
  const [noTask, setNoTask] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const handleEditTask = (index) => {
    console.log("Edit task", index);
  };

  const handleDeleteTask = (index) => {
    console.log("Delete task", index);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Box>
        {tasks.length === 0 ? (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={4}
            sx={{ minHeight: "70vh" }}
          >
            <Box
              component="img"
              src="/media/images/woman-sigh.png"
              alt="No tasks"
              sx={{ width: "25%", objectFit: "contain" }}
            />
            <Box>
              <Typography variant="h5" gutterBottom>
                No tasks available. Start by adding one!
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setOpenDialog(true)}
              >
                Add Task
              </Button>
            </Box>
          </Stack>
        ) : (
          <>
            <Box display="flex" justifyContent="flex-end" mb={2}>
              <Button variant="contained" onClick={() => setOpenDialog(true)}>
                Add Task
              </Button>
            </Box>

            <Paper elevation={3}>
              <List>
                {tasks.map((task, index) => (
                  <ListItem
                    key={index}
                    secondaryAction={
                      <Box>
                        <IconButton
                          edge="end"
                          onClick={() => handleEditTask(index)}
                        >
                          <FilePenLine size={20} />
                        </IconButton>
                        <IconButton
                          edge="end"
                          onClick={() => handleDeleteTask(index)}
                        >
                          <Trash2 size={20} />
                        </IconButton>
                      </Box>
                    }
                  >
                    <ListItemText primary={task} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </>
        )}

        {/* Dialog to add a new task */}
        <CreateTaskDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
        />
      </Box>
    </Container>
  );
};

export default TaskPage;
