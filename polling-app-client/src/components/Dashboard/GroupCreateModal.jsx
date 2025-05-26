import React, { Component } from 'react';
import { createGroup, getAllUsers } from '../../util/APIUtils';
import { Modal, Input, message, Checkbox, Spin } from 'antd';


class GroupCreateModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      imageUrl: '',
        users: [],
  selectedUserIds: [],
  loading: false
    };
  }

  componentDidMount() {
  this.setState({ loading: true });
  getAllUsers()
    .then(users => {
      this.setState({ users, loading: false });
    })
    .catch(() => {
      message.error('유저 목록을 불러오는 데 실패했습니다.');
      this.setState({ loading: false });
    });
}

  handleChange = (field, value) => {
    this.setState({ [field]: value });
  }

    handleUserSelect = userId => {
    const { selectedUserIds } = this.state;
    const newList = selectedUserIds.includes(userId)
      ? selectedUserIds.filter(id => id !== userId)
      : [...selectedUserIds, userId];
    this.setState({ selectedUserIds: newList });
  }

  handleSubmit = () => {

    const { name, description, imageUrl, selectedUserIds } = this.state;

       createGroup({ name, description, imageUrl, memberIds : selectedUserIds })
      .then(data => {
         if (!data || !data.name) {
             throw new Error("응답에 그룹 이름이 없습니다.");
      }
        message.success(`그룹 "${data.name}" 생성 완료`);

              if (this.props.onClose) {
        this.props.onClose();
      }

            setTimeout(() => {
        window.location.reload();
      }, 500);
    })



      .catch(() => {
        message.error('그룹 생성에 실패했습니다.');
      });
  }

  render() {
    const { visible, onClose } = this.props;
    const { name, description, imageUrl, users, selectedUserIds,  loading } = this.state;

    return (
      <Modal
        title="새 그룹 만들기"
        visible={visible}
        onOk={this.handleSubmit}
        onCancel={onClose}
        okText="생성"
        cancelText="취소"
      >
        <Input
          placeholder="그룹 이름"
          value={name}
          onChange={e => this.handleChange('name', e.target.value)}
          style={{ marginBottom: 12 }}
        />
        <Input.TextArea
          placeholder="그룹 소개"
          value={description}
          onChange={e => this.handleChange('description', e.target.value)}
          rows={3}
          style={{ marginBottom: 12 }}
        />
        <Input
          placeholder="이미지 URL (선택)"
          value={imageUrl}
          onChange={e => this.handleChange('imageUrl', e.target.value)}
        />
         <div style={{ maxHeight: 150, overflowY: 'auto', border: '1px solid #eee', padding: 8 }}>
          {loading ? (
            <Spin />
          ) : users.map(user => (
            <Checkbox
              key={user.id}
              checked={selectedUserIds.includes(user.id)}
              onChange={() => this.handleUserSelect(user.id)}
              style={{ display: 'block', marginBottom: 6 }}
            >
              {user.name} ({user.username})
            </Checkbox>
          ))}
        </div>
      </Modal>
    );
  }
}

export default GroupCreateModal;
