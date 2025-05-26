import React, { Component } from 'react';
import { ACCESS_TOKEN } from '../../constants';
import "./MyGroups.css";

class MyGroups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    const token = localStorage.getItem(ACCESS_TOKEN);
    console.log('JWT 토큰:', token);

    if (!token) {
      this.setState({ error: '로그인 후 이용해 주세요.', loading: false });
      return;
    }

    fetch('http://localhost:8080/api/groups/my', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          let errMsg = "그룹 목록을 불러오지 못했습니다.";
          try {
            const json = JSON.parse(text);
            errMsg = json.message || errMsg;
          } catch(e) {
            if (text.startsWith('<!DOCTYPE')) {
              errMsg = "서버 오류 또는 인증이 필요합니다.";
            } else {
              errMsg = text;
            }
          }
          throw new Error(errMsg);
        }
        return res.json();
      })
      .then((data) => {
        this.setState({ groups: data, loading: false });
      })
      .catch((error) => {
        this.setState({ error: error.message, loading: false });
      });
  }

  render() {
    const { groups, loading, error } = this.state;

    return (
      <div className="my-groups-container">
        <h3>참여 중인 그룹</h3>
        {loading ? (
          <p>로딩 중...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : groups.length === 0 ? (
          <p>참여한 그룹이 없습니다.</p>
        ) : (
          <div className="group-card-list">
            {groups.map((group) => (
              <div key={group.id} className="group-card">
                <div
                  className="group-avatar"
                  style={{
                    backgroundImage: group.imageUrl
                      ? `url(${group.imageUrl})`
                      : 'url(/default-group.png)',
                  }}
                />
                <div className="group-info">
                  <div className="group-name">{group.name}</div>
                  <div className="group-count">멤버 {group.memberCount}명</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default MyGroups;
