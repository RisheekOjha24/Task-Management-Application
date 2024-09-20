import React, { useEffect, useState } from "react";
import {
  Button,Input,Form,List,Modal,Select,Space,Row,Col,message,Spin} from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import "antd/dist/reset.css"; // Ensure Ant Design CSS is included
import Navbar from "../components/Navbar";
import sweetAlert from "../components/sweetNotification";
import {
  deleteTask as deleteTaskUrl,
  getAllTask as getAllTaskUrl,
  createTask as createTaskUrl,
} from "../utils/APIRoute";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const { Option } = Select;

const TaskManagementPage = () => {
  const { useremail, username } = useSelector((store) => store.userData);
  const navigate = useNavigate();

  useEffect(() => {
    if (username === "") navigate("/");
  }, [username, navigate]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const listId = queryParams.get("listId");

  // State management
  const [tasks, setTasks] = useState([]);
  const [isTaskModalVisible, setIsTaskModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [sortMode, setSortMode] = useState("dueDate");
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true); // Loading state
  const [creatingTask, setCreatingTask] = useState(false); // New state for creating list
  const [form] = Form.useForm();

  // Fetch tasks
  useEffect(() => {
    async function fetchTasks() {
      setLoading(true); // Set loading to true
      try {
        const response = await axios.get(getAllTaskUrl, {
          params: { useremail, listId },
        });
        setTasks(response.data);
      } catch (error) {
        console.log(error);
        message.error("Unable to fetch tasks");
      } finally {
        setLoading(false); // Set loading to false
      }
    }
    fetchTasks();
  }, [useremail, listId]);

  // Handle task edit
  const handleEdit = (task) => {
    setEditingTask(task);
    form.setFieldsValue({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      priority: task.priority,
      status: task.status,
    });
    setIsTaskModalVisible(true);
  };

  // Handle task save (create or update)
  const handleSave = async (values) => {
    setCreatingTask(true);
    try {
      const payload = {
        ...values,
        listId,
        useremail,
        taskId: editingTask ? editingTask._id : undefined, // Include taskId for editing
      };
      await axios.post(createTaskUrl, payload);

      // Fetch tasks after creating/updating
      const response = await axios.get(getAllTaskUrl, {
        params: { useremail, listId },
      });
      setTasks(response.data);

      setIsTaskModalVisible(false);
      setEditingTask(null);
    } catch (error) {
      console.log(error);
      message.error("Unable to save task");
    } finally {
      setCreatingTask(false); // End loading for creating task
    }
  };

  // Handle task deletion
  const handleDelete = async (taskId) => {
    try {
      const res = await sweetAlert("Delete");
      if (!res.isConfirmed) return;

      // Optimistically update the UI

      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
      message.success("Task Deleted", 0.85);

      await axios.delete(deleteTaskUrl, {
        params: { taskId, listId },
      });
    } catch (error) {
      console.log(error);
      message.error("Unable to delete task");
    }
  };

  // Toggle task completion
  const handleCompleteToggle = async (taskId) => {
    try {
      const taskToUpdate = tasks.find((task) => task._id === taskId);
      if (!taskToUpdate) {
        message.error("Task not found");
        return;
      }

      const updatedStatus =
        taskToUpdate.status === "Pending" ? "Completed" : "Pending";

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, status: updatedStatus } : task
        )
      );

      await axios.post(createTaskUrl, {
        ...taskToUpdate,
        status: updatedStatus,
        listId,
        useremail,
        taskId, // Include taskId for updating
      });
    } catch (error) {
      console.log(error);
      message.error("Unable to update task status");
    }
  };

  // Sorting tasks
  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortMode === "dueDate") {
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    if (sortMode === "priority") {
      return a.priority - b.priority;
    }
    return 0;
  });

  // Filtering tasks
  const filteredTasks = sortedTasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchText.toLowerCase()) ||
      task.description.toLowerCase().includes(searchText.toLowerCase())
  );

  // Open task modal
  const openTaskModal = () => {
    setEditingTask(null);
    form.resetFields();
    setIsTaskModalVisible(true);
  };

  return (
    <div className="flex backgroundImg">
      <Navbar />
      <div className="p-4 flex-auto">
        <Row justify="center" gutter={[16, 16]}>
          <Col xs={24} sm={12} lg={8}>
            <Input
              className="mt-8"
              placeholder="Search tasks by title or description"
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
            />
          </Col>
          <Col xs={24} sm={12} lg={8}>
            <Space className="w-full">
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={openTaskModal}
                className="add-task-btn"
              >
                Add Task
              </Button>
              <Select
                defaultValue="dueDate"
                onChange={(value) => setSortMode(value)}
              >
                <Option value="dueDate">Sort by Due Date</Option>
                <Option value="priority">Sort by Priority</Option>
              </Select>
            </Space>
          </Col>
        </Row>

        <Row justify="center" gutter={[18, 18]}>
          <Col xs={24} sm={20} lg={16}>
            <div
              style={{
                maxHeight: "76vh",
                overflowY: "auto",
                minWidth: "60vw",
                border: "1px solid #d9d9d9",
              }}
            >
              {loading ? ( // Show spinner while loading
                <div style={{ textAlign: "center", padding: "20px" }}>
                  <Spin size="large" />
                </div>
              ) : (
                <List
                  bordered
                  dataSource={filteredTasks}
                  renderItem={(task) => (
                    <List.Item
                      actions={[
                        <Button
                          type="link"
                          icon={<EditOutlined />}
                          onClick={() => handleEdit(task)}
                          className="style-btn-other"
                        >
                          Edit
                        </Button>,
                        <Button
                          type="link"
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => handleDelete(task._id)}
                          className="style-btn-other"
                        >
                          Delete
                        </Button>,
                        <Button
                          type="link"
                          onClick={() => handleCompleteToggle(task._id)}
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            backgroundColor:
                              task.status !== "Pending" ? "green" : "red",
                          }}
                        >
                          {task.status !== "Pending" ? "Complete" : "Pending"}
                        </Button>,
                      ]}
                    >
                      <div>
                        <div>
                          <strong>Title:</strong> {task.title}
                        </div>
                        <div>
                          <strong>Description:</strong> {task.description}
                        </div>
                        <div>
                          <strong>Due Date:</strong> {task.dueDate}
                        </div>
                        <div>
                          <strong>Priority:</strong> {task.priority}
                        </div>
                        <div>
                          <strong>Status:</strong> {task.status}
                        </div>
                      </div>
                    </List.Item>
                  )}
                />
              )}
            </div>
          </Col>
        </Row>

        <Modal
          title={editingTask ? "Edit Task" : "Add Task"}
          open={isTaskModalVisible}
          onCancel={() => setIsTaskModalVisible(false)}
          footer={null}
        >
          <Form form={form} onFinish={handleSave} layout="vertical">
            <Form.Item
              name="title"
              label="Title"
              rules={[
                { required: true, message: "Please enter the task title" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                { required: true, message: "Please enter the Description" },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              name="dueDate"
              label="Due Date"
              rules={[{ required: true, message: "Please enter the Due date" }]}
            >
              <Input type="date" />
            </Form.Item>
            <Form.Item
              name="priority"
              label="Priority"
              rules={[
                { required: true, message: "Please enter the priority number" },
              ]}
            >
              <Input type="number" min={1} />
            </Form.Item>
            <Form.Item
              name="status"
              label="Status"
              rules={[
                { required: true, message: "Please enter the status" },
              ]}
            >
              <Select>
                <Option value="Pending">Pending</Option>
                <Option value="Completed">Completed</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={creatingTask}>
                {editingTask ? "Save" : "Add Task"}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default TaskManagementPage;
