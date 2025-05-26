import React from 'react';
import { Select, Avatar } from 'antd';
import './GroupMemberSelector.css';

const { Option } = Select;

const GroupMemberSelector = ({ users, selectedUserIds, onChange }) => {
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
  );
};

export default GroupMemberSelector;
