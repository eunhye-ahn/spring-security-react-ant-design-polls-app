import React, { Component } from 'react';
import { Modal, Input, message } from 'antd';
import { joinGroupByCode } from '../../util/APIUtils';

class GroupJoinModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: ''
    };
  }

  handleChange = (e) => {
    this.setState({ code: e.target.value });
  }

  handleSubmit = () => {
     const { code } = this.state;

joinGroupByCode(code)
    .then(data => {
      const messageText = (typeof data === 'string')
  ? data
  : (data && data.name)
    ? `"${data.name}" 그룹에 입장했어요!`
    : '그룹 참여 완료';
    message.success(messageText);

if (typeof this.props.onJoined === 'function') {
  this.props.onJoined();
}

  if (typeof this.props.onClose === 'function') {
    this.props.onClose();
  }

    setTimeout(() => {
    window.location.reload(); 
  }, 500);
  })
.catch(error => {
  const messageText = typeof error.message === 'string' ? error.message : JSON.stringify(error);
 console.error('Join group error:', error);
  if (error.status === 409 || messageText.includes('이미')) {
    message.success('이미 그룹에 참여하셨습니다.');

    if (this.props.onClose) {
      this.props.onClose();  // ✅ 안전한 방식
    }

    setTimeout(() => window.location.reload(), 500);
  } else {
    message.error('유효하지 않은 코드입니다.');
  }
});
  }
  
  render() {
    const { visible, onClose } = this.props;

    return (
      <Modal
        title="참여 코드 입력"
        visible={visible}
        onOk={this.handleSubmit}
        onCancel={onClose}
        okText="입장"
        cancelText="취소"
      >
        <Input
          placeholder="초대 코드 입력 (예: ABC123)"
          value={this.state.code}
          onChange={this.handleChange}
        />
      </Modal>
    );
  }
}

export default GroupJoinModal;
