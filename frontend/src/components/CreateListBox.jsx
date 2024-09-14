import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import { Button, Input, Form, List, Modal, message } from "antd";
import { PlusOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "antd/dist/reset.css";
import {
  createList as createListUrl,
  deleteList as deleteListUrl,
  getAllList as getAllListUrl,
} from "../utils/APIRoute"; // Import URLs
import { useSelector } from "react-redux"; // For state management
import { useNavigate } from "react-router-dom";
import AddTaskButton from "./AddTaskBtn";

const CreateListBox = () => {
  const { useremail } = useSelector((store) => store.userData);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [lists, setLists] = useState([]);
  const [currentList, setCurrentList] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [isTaskModalVisible, setIsTaskModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all lists when the component mounts
  useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await axios.get(getAllListUrl, {
          params: { useremail }, // Send useremail as query parameter
        });
        setLists(response.data); // Update state with the fetched lists
      } catch (error) {
        message.error("Failed to fetch lists.");
      }
    };

    fetchLists();
  }, [useremail]);

  // Handle adding a new list
  const handleAddList = async (values) => {
    if (lists.some((list) => list.name === values.listName)) {
      message.error("List name already exists.", 1);
      return;
    }
    try {
      await axios.post(createListUrl, {
        useremail,
        listName: values.listName,
      }); // Create the list using the API
      message.success("List created successfully.",1);
      const response = await axios.get(getAllListUrl, {
        params: { useremail }, // Refresh the list
      });
      setLists(response.data); // Update state with the new list
      form.resetFields();
    } catch (error) {
      message.error("Failed to create list.",1);
    }
  };
  const handleAddTask=()=>{
    console.log("Still wokring on it");
  }

  // Handle deleting a list
  const handleDeleteList = async (listId) => {
    try {
      await axios.delete(deleteListUrl, {
        params: { useremail, id: listId }, // Send useremail and listId as query parameters
      }); // Delete the list using the API
      message.success("List deleted successfully.",1);
      setLists(lists.filter((list) => list.id !== listId)); // Update state to remove deleted list
      setTasks(tasks.filter((task) => task.listId !== listId)); // Remove associated tasks if necessary
    } catch (error) {
      message.error("Failed to delete list.",1);
    }
  };

  // Filter lists based on search term
  const filteredLists = lists.filter((list) =>
    list.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 ml-1/4 p-4 h-screen overflow-auto">
      <Form
        form={form}
        onFinish={handleAddList}
        layout="inline"
        className="mb-4"
      >
        <Form.Item
          name="listName"
          rules={[{ required: true, message: "Please enter a list name" }]}
        >
          <Input placeholder="List Name" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create List
          </Button>
        </Form.Item>
      </Form>
      <Input
        placeholder="Search Lists"
        className="mb-4"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="overflow-y-auto max-h-80">
        <List
          bordered
          dataSource={filteredLists}
          renderItem={(list) => (
            <List.Item
              className="h-12 p-2 flex items-center"
              actions={[
                <Link
                  to={`/manage-task?listId=${list.id}`}
                  key={`view-${list.id}`}
                >
                  <Button
                    type="link"
                    icon={<EyeOutlined />}
                    className="style-btn-other"
                  >
                    View Tasks
                  </Button>
                </Link>,
                // <Button
                //   icon={<PlusOutlined />}
                //   onClick={() => showTaskModal(list.id)}
                //   key={`add-${list.id}`}
                // >
                //   Add Task
                // </Button>,
                <AddTaskButton
                  // key={`add-${list.id}`}
                  listId={list.id}
                  onAddTask={null}
                />,
                <Button
                  type="link"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleDeleteList(list.id)}
                  key={`delete-${list.id}`}
                  className="style-btn-other"
                >
                  Delete List
                </Button>,
              ]}
            >
              {list.name}
            </List.Item>
          )}
        />
      </div>
      <Modal
        title="Add Task"
        open={isTaskModalVisible}
        onCancel={() => setIsTaskModalVisible(false)}
        footer={null}
      >
        <Form onFinish={handleAddTask} layout="vertical">
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please enter a task title" }]}
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
            <Input type="number" min={1} placeholder="Enter priority number" />
          </Form.Item>
          <Form.Item name="status" label="Status">
            <Input placeholder="Pending or Completed" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Task
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateListBox;
