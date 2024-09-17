import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Input, Form, List, Modal, message, Select } from "antd";
import { PlusOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "antd/dist/reset.css";
import {
  createList as createListUrl,
  deleteList as deleteListUrl,
  getAllList as getAllListUrl,
  createTask as createTaskUrl,
} from "../utils/APIRoute";
import { useSelector } from "react-redux";
import sweetAlert from "./sweetNotification";

const CreateListBox = () => {
  const { useremail } = useSelector((store) => store.userData);
  const [form] = Form.useForm();
  const [lists, setLists] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [isTaskModalVisible, setIsTaskModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedListId, setSelectedListId] = useState(null);
  
  // Fetch all lists when the component mounts
  useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await axios.get(getAllListUrl, {
          params: { useremail },
        });
        setLists(response.data);
      } catch (error) {
        message.error("Failed to fetch lists.",1);
      }
    };

    fetchLists();
  }, [useremail]);

  const handleAddList = async (values) => {
    const listName=values.listName.trim();
    if(listName===""){
            message.error("Please Enter a list Name", 1);
            return;
    }
    if (lists.some((list) => list.name === listName)) {
      message.error("List name already exists.",1);
      return;
    }
    try {
      await axios.post(createListUrl, {
        useremail,
        listName: values.listName,
      });
      message.success("List created successfully.",1);
      const response = await axios.get(getAllListUrl, {
        params: { useremail },
      });
      setLists(response.data);
      form.resetFields();
    } catch (error) {
      message.error("Failed to create list.",1);
    }
  };

  const showTaskModal = (listId) => {
    setSelectedListId(listId);
    setIsTaskModalVisible(true);
  };

  const handleAddTask = async (values) => {
    try {
          console.log(selectedListId);
          console.log(values);
            await axios.post(createTaskUrl, {
        ...values,
        listId: selectedListId,
        useremail,
      });
      message.success("Task added successfully.",1);
      setIsTaskModalVisible(false);
    } catch (error) {
      message.error("Failed to add task.",1);
    }
  };

  const handleDeleteList = async (listId) => {
    const response=await sweetAlert();
    if(!response.isConfirmed) return 
    try {
      await axios.delete(deleteListUrl, {
        params: { useremail, id: listId },
      });
      message.success("List deleted successfully.",1);
      setLists(lists.filter((list) => list.id !== listId));
      setTasks(tasks.filter((task) => task.listId !== listId));
    } catch (error) {
      message.error("Failed to delete list.",1);
    }
  };

  const filteredLists = lists.filter((list) =>
    list.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1  p-4 h-screen overflow-auto bgMainPage"
    >
      <Form
        form={form}
        onFinish={handleAddList}
        layout="inline"
        className="mb-4 ListNamebx"
      >
        <Form.Item
          name="listName"
          label={
            <span className="font-bold text-lg text-blue-500">List Name</span>
          }
        >
          <Input placeholder="Enter List Name" />
        </Form.Item>
        <Form.Item className="btnCreateList">
          <Button type="primary" htmlType="submit" className="mb-20 ">
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
              className="h-12 p-2 flex items-center text-base font-semibold"
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
                <Button
                  icon={<PlusOutlined />}
                  onClick={() => showTaskModal(list.id)}
                  className="style-btn"
                  key={`add-${list.id}`}
                >
                  Add Task
                </Button>,
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
              <h1 className="">{list.name}</h1>
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
            <Select placeholder="Select status">
              <Select.Option value="Pending">Pending</Select.Option>
              <Select.Option value="Completed">Completed</Select.Option>
            </Select>
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
