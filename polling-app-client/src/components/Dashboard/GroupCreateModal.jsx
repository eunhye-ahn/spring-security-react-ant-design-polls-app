import React, { Component } from 'react';
<<<<<<< HEAD
<<<<<<< HEAD
import { createGroup, getAllUsers } from '../../util/APIUtils';
import { Modal, Input, message} from 'antd';
import GroupMemberSelector from './GroupMemberSelector';

=======
import { Modal, Input, message } from 'antd';
<<<<<<< HEAD
import { ACCESS_TOKEN } from '../../constants';
>>>>>>> 62f553a (apiUtil 이용해서 api 접근)
=======
import { createGroup } from '../../util/APIUtils';
=======
import { createGroup, getAllUsers } from '../../util/APIUtils';
import { Modal, Input, message, Checkbox, Spin } from 'antd';
>>>>>>> 512ca26 (멤버 추가 로직 생성)

>>>>>>> 59d3021 (그룹 생성 오류 수정)

class GroupCreateModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 512ca26 (멤버 추가 로직 생성)
      imageUrl: '',
        users: [],
  selectedUserIds: [],
  loading: false
<<<<<<< HEAD
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

=======
      imageUrl: ''
    };
  }

>>>>>>> 62f553a (apiUtil 이용해서 api 접근)
=======
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

>>>>>>> 512ca26 (멤버 추가 로직 생성)
  handleChange = (field, value) => {
    this.setState({ [field]: value });
  }

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 512ca26 (멤버 추가 로직 생성)
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



=======
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

<<<<<<< HEAD
      })
>>>>>>> 62f553a (apiUtil 이용해서 api 접근)
=======
            setTimeout(() => {
        window.location.reload();
      }, 500);
    })



>>>>>>> 8564125 (그룹 생성 후 창 close & 자동 새로고침)
      .catch(() => {
        message.error('그룹 생성에 실패했습니다.');
      });
  }

  render() {
    const { visible, onClose } = this.props;
<<<<<<< HEAD
<<<<<<< HEAD
    const { name, description, imageUrl, users, selectedUserIds } = this.state;
=======
    const { name, description, imageUrl } = this.state;
>>>>>>> 62f553a (apiUtil 이용해서 api 접근)
=======
    const { name, description, imageUrl, users, selectedUserIds,  loading } = this.state;
>>>>>>> 512ca26 (멤버 추가 로직 생성)

    return (
      <Modal
        title="새 그룹 만들기"
        visible={visible}
        onOk={this.handleSubmit}
        onCancel={onClose}
        okText="생성"
        cancelText="취소"
      >
<<<<<<< HEAD
        <div className="form-group">
          <label className="form-label" style={{display:"flex"}}>그룹 이름<p style={{color : "red"}}> *</p></label>
=======
>>>>>>> 62f553a (apiUtil 이용해서 api 접근)
        <Input
          placeholder="그룹 이름"
          value={name}
          onChange={e => this.handleChange('name', e.target.value)}
          style={{ marginBottom: 12 }}
        />
<<<<<<< HEAD
        </div>
          <div className="form-group">
          <label className="form-label">그룹 소개</label>
=======
>>>>>>> 62f553a (apiUtil 이용해서 api 접근)
        <Input.TextArea
          placeholder="그룹 소개"
          value={description}
          onChange={e => this.handleChange('description', e.target.value)}
<<<<<<< HEAD
                      maxLength={200}
          rows={3}
          style={{ marginBottom: 12 }}
        />
                </div>

                <div className="form-group">
          <label className="form-label">그룹 이미지</label>
                  <Input
=======
          rows={3}
          style={{ marginBottom: 12 }}
        />
        <Input
>>>>>>> 62f553a (apiUtil 이용해서 api 접근)
          placeholder="이미지 URL (선택)"
          value={imageUrl}
          onChange={e => this.handleChange('imageUrl', e.target.value)}
        />
<<<<<<< HEAD
<<<<<<< HEAD
        </div>
                <div className="form-group">
          <label className="form-label">그룹 멤버 선택</label>
          
<GroupMemberSelector
  users={users}
  selectedUserIds={selectedUserIds}
  onChange={(ids) => this.setState({ selectedUserIds: ids })}
/>
        </div>
=======
>>>>>>> 62f553a (apiUtil 이용해서 api 접근)
=======
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
>>>>>>> 512ca26 (멤버 추가 로직 생성)
      </Modal>
    );
  }
}

export default GroupCreateModal;
