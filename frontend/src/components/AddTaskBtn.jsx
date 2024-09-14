import React, { useState } from "react";
import { Button, Modal, Form, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const AddTaskButton = ({ listId, onAddTask }) => {
  const [isTaskModalVisible, setIsTaskModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showTaskModal = () => {
    setIsTaskModalVisible(true);
  };
const handleAddTask = (values) => {
      
    if(onAddTask!=null)onAddTask(values);

    form.resetFields();
    setIsTaskModalVisible(false);
  };


  return (
    <>
      <Button
        className="style-btn"
        type="link"
        icon={<PlusOutlined />}
        onClick={showTaskModal}
      >
        Add Task
      </Button>

      <Modal
        title="Add Task"
        open={isTaskModalVisible}
        onCancel={() => setIsTaskModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleAddTask} layout="vertical">
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
            <Input />
          </Form.Item>
          <Form.Item name="status" label="Status">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Task
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddTaskButton;
