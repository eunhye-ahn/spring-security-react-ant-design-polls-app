import React, { useState } from 'react';
import { Input, Button, Form, message } from 'antd';
import axios from 'axios';

const NewGroupPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post('/api/groups', {
        name,
        description,
        imageUrl,
      });

      message.success('�׷��� ���������� �����Ǿ����ϴ�!');
      // �Է�â �ʱ�ȭ
      setName('');
      setDescription('');
      setImageUrl('');
    } catch (error) {
      console.error(error);
      message.error('�׷� ���� ����!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      <h1>�� �׷� ����</h1>
      <Form layout="vertical" onSubmitCapture={handleSubmit}>
        <Form.Item label="�׷� �̸�">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="��: ���͵� �׷�"
          />
        </Form.Item>

        <Form.Item label="�׷� ����">
          <Input.TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="��: �Բ� �����ϴ� ���͵��Դϴ�."
            rows={4}
          />
        </Form.Item>

        <Form.Item label="�̹��� URL">
          <Input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="��: https://example.com/image.jpg"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            �׷� ����
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default NewGroupPage;
