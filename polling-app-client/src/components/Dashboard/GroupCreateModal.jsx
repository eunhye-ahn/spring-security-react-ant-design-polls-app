import React, { Component } from 'react';
import { Modal, Input, message } from 'antd';
import { createGroup } from '../../util/APIUtils';


class GroupCreateModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      imageUrl: ''
    };
  }

  handleChange = (field, value) => {
    this.setState({ [field]: value });
  }

  handleSubmit = () => {

    const { name, description, imageUrl } = this.state;

       createGroup({ name, description, imageUrl })
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
      </Modal>
    );
  }
}

export default GroupCreateModal;
