import React from 'react';
import { Select, Avatar } from 'antd';

const { Option } = Select;

const GroupMemberSelector = ({ users, selectedUserIds, onChange }) => {
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
  );
};

export default GroupMemberSelector;
