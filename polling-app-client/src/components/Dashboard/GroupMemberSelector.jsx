import React from 'react';
import { Select, Avatar } from 'antd';
<<<<<<< HEAD
import './GroupMemberSelector.css';
=======
>>>>>>> 93b26a7 (css 기본 생성스타일 추가)

const { Option } = Select;

const GroupMemberSelector = ({ users, selectedUserIds, onChange }) => {
<<<<<<< HEAD
  // 선택된 사용자 정보 추출
  const selectedUsers = users.filter(u => selectedUserIds.includes(u.id));

  return (
    <div className="group-member-selector-wrapper">
      {/* 입력창 위에 보여줄 선택된 유저 */}
      <div className="selected-user-tags">
        {selectedUsers.map(user => (
          <div key={user.id} className="selected-user-tag">
            <Avatar className="avatar">{user.name[0]}</Avatar>
            <span className="name">{user.name}</span>
            <span
              className="remove"
              onClick={() => onChange(selectedUserIds.filter(id => id !== user.id))}
            >
              ×
            </span>
          </div>
        ))}
      </div>

      <Select
        mode="multiple"
        value={selectedUserIds}
        onChange={onChange}
        showSearch
        optionFilterProp="label"
        placeholder="이름 검색"
        tagRender={() => null} // 태그 숨기기
          maxTagCount={0} 
            maxTagPlaceholder={() => null} 
        style={{ width: '100%' }}
      >
        {users.map(user => (
          <Option key={user.id} value={user.id} label={user.name}>
            <div className={`user-option ${selectedUserIds.includes(user.id) ? 'selected' : ''}`}>
              <div className="user-info">
                <Avatar className="avatar">{user.name[0]}</Avatar>
                <span>{user.name}</span>
              </div>
              {selectedUserIds.includes(user.id) && <span className="check">✔</span>}
            </div>
          </Option>
        ))}
      </Select>
    </div>
=======
  return (
    <Select
      mode="multiple"
      showSearch
      placeholder="이름 검색"
      value={selectedUserIds}
      onChange={onChange}
      optionFilterProp="label"
      style={{ width: '100%', marginTop: 8 }}
    >
      {users.map(user => (
        <Option key={user.id} value={user.id} label={user.name}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '4px 8px',
              backgroundColor: selectedUserIds.includes(user.id) ? '#f5f5f5' : 'transparent',
              borderRadius: 4,
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Avatar style={{ backgroundColor: '#f56a00' }}>{user.name[0]}</Avatar>
              <span>{user.name}</span>
            </div>
            {selectedUserIds.includes(user.id) && <span style={{ color: '#52c41a' }}>✔</span>}
          </div>
        </Option>
      ))}
    </Select>
>>>>>>> 93b26a7 (css 기본 생성스타일 추가)
  );
};

export default GroupMemberSelector;
