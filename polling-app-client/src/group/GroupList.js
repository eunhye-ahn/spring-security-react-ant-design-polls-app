import React from 'react';
import './GroupList.css';

function GroupList({ groups }) {
  if (!groups || groups.length === 0) return null;

  return (
    <div className="group-slider">
      <h3>내가 가입한 그룹</h3>
      <div className="slider-container">
        {groups.map(group => (
          <div className="group-card" key={group.id}>
            <a href={`/groups/${group.id}`}>
              <div className="group-name">{group.name}</div>
              <div className="group-members">{group.memberCount}명 참여 중</div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GroupList;
