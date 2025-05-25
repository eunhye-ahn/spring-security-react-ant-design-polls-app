import React, { Component } from 'react';
import { Modal, Input, message, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { ACCESS_TOKEN } from '../../constants';

class GroupCreateModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      imageUrl: ''  // Base64 또는 업로드된 이미지 URL 저장용
    };
  }

  handleChange = (field, value) => {
    this.setState({ [field]: value });
  }

  // 이미지 업로드 시 파일을 Base64로 변환해 상태에 저장
  beforeUpload = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.setState({ imageUrl: reader.result });
    };
    // 업로드 버튼 기본 동작 막기 위해 false 반환
    return false;
  }

  handleSubmit = () => {
    const { name, description, imageUrl } = this.state;
    const token = localStorage.getItem(ACCESS_TOKEN);

    fetch('/api/groups', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, description, imageUrl }),
    })
      .then(res => {
        if (!res.ok) throw new Error('생성 실패');
        return res.json();
      })
      .then(data => {
        message.success(`그룹 "${data.name}" 생성 완료`);
        this.props.onCreated(); // 부모 콜백 실행
        this.props.onClose();   // 모달 닫기
      })
      .catch(() => {
        message.error('그룹 생성에 실패했습니다.');
      });
  }

  render() {
    const { visible, onClose } = this.props;
    const { name, description, imageUrl } = this.state;

    return (
      <Modal
        title="새 그룹 만들기"
        visible={visible}
        onOk={this.handleSubmit}
        onCancel={onClose}
        okText="생성"
        cancelText="취소"
      >
        {/* 그룹 이름 */}
        <div style={{ marginBottom: 6, fontWeight: '600', color: '#333' }}>
          그룹 이름 <span style={{ color: 'red' }}>*</span>
        </div>
        <Input
          placeholder="그룹 이름을 입력해주세요."
          value={name}
          onChange={e => this.handleChange('name', e.target.value)}
          style={{ marginBottom: 12 }}
        />

        {/* 그룹 소개 */}
        <div style={{ marginBottom: 6, fontWeight: '600', color: '#333' }}>
          그룹 소개
        </div>

        <Input.TextArea
          placeholder="그룹 소개를 입력해주세요."
          value={description}
          onChange={e => this.handleChange('description', e.target.value)}
          rows={3}
          style={{ marginBottom: 12 }}
        />

        {/* 이미지 미리보기 & 업로드 */}
        {imageUrl && (
          <img
            src={imageUrl}
            alt="그룹 이미지 미리보기"
            style={{
              width: 200,
              height: 200,
              objectFit: 'cover',
              borderRadius: 8,
              marginBottom: 12,
            }}
          />
        )}
        <div style={{ marginBottom: 8, fontWeight: '600', color: '#333' }}>
          그룹 이미지
        </div>
        <Upload
          beforeUpload={this.beforeUpload}
          showUploadList={false}
          accept="image/*"
        >
          <Button icon={<UploadOutlined />}>이미지 업로드</Button>
        </Upload>
      </Modal>

    );
  }
}

export default GroupCreateModal;
