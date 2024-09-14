import React, { useState } from "react";
import {
  Button,
  Input,
  Form,
  List,
  Modal,
  Select,
  Space,
  Row,
  Col,
} from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import "antd/dist/reset.css"; // Ensure Ant Design CSS is included

const { Option } = Select;
const { Search } = Input;

const TaskManagementPage = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Task 1",
      description: "Description 1",
      dueDate: "2024-09-15",
      priority: 1,
      status: "Pending",
    },
    {
      id: 2,
      title: "Task 2",
      description: "Description 2",
      dueDate: "2024-09-16",
      priority: 2,
      status: "Completed",
    },
    // Add more dummy tasks here
  ]);
  const [isTaskModalVisible, setIsTaskModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [sortMode, setSortMode] = useState("dueDate"); // Default sorting by due date
  const [searchText, setSearchText] = useState(""); // State for search input
  const [form] = Form.useForm();

  const handleEdit = (task) => {
    setEditingTask(task);
    form.setFieldsValue(task);
    setIsTaskModalVisible(true);
  };

  const handleSave = (values) => {
    if (editingTask) {
      setTasks(
        tasks.map((task) =>
          task.id === editingTask.id ? { ...task, ...values } : task
        )
      );
      setEditingTask(null);
    } else {
      const newTask = {
        id: tasks.length + 1, // Simple ID generation logic
        ...values,
        priority: parseInt(values.priority, 10),
      };
      setTasks([...tasks, newTask]);
    }
    setIsTaskModalVisible(false);
  };

  const handleDelete = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleCompleteToggle = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: task.status === "Pending" ? "Completed" : "Pending",
            }
          : task
      )
    );
  };

  // Fixed sorting logic
  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortMode === "dueDate") {
      return new Date(a.dueDate) - new Date(b.dueDate); // Sort by due date as Date object
    }
    if (sortMode === "priority") {
      return a.priority - b.priority; // Sort by priority
    }
    return 0;
  });

  // Filter tasks based on search input
  const filteredTasks = sortedTasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchText.toLowerCase()) ||
      task.description.toLowerCase().includes(searchText.toLowerCase())
  );

  const openTaskModal = () => {
    setEditingTask(null);
    form.resetFields();
    setIsTaskModalVisible(true);
  };

  return (
    <div className="p-4">
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
                  >
                    Edit
                  </Button>,
                  <Button
                    type="link"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete(task.id)}
                  >
                    Delete
                  </Button>,
                  <Button
                    type="link"
                    onClick={() => handleCompleteToggle(task.id)}
                    style={{
                      color: task.status !== "Pending" ? "green" : "red",
                      borderColor: task.status !== "Pending" ? "green" : "red",
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
            rules={[{ required: true, message: "Please enter the task title" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="dueDate" label="Due Date">
            <Input type="date" />
          </Form.Item>
          <Form.Item name="priority" label="Priority">
            <Input type="number" min={1} />
          </Form.Item>
          <Form.Item name="status" label="Status">
            <Select>
              <Option value="Pending">Pending</Option>
              <Option value="Completed">Completed</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingTask ? "Save" : "Add Task"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TaskManagementPage;
