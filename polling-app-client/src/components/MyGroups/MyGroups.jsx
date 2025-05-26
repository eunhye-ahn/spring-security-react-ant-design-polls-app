import React, { Component } from "react";
<<<<<<< HEAD
<<<<<<< HEAD
import "./MyGroups.css";
import { withRouter } from 'react-router-dom';
import { getMyGroups } from '../../util/APIUtils';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

=======
import { ACCESS_TOKEN } from '../../constants';
=======
>>>>>>> 62f553a (apiUtil 이용해서 api 접근)
import "./MyGroups.css";
import { getMyGroups } from '../../util/APIUtils';
>>>>>>> 5216a66 (그룹멤버 수 추가)


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
<<<<<<< HEAD
<<<<<<< HEAD
=======
    const token = localStorage.getItem(ACCESS_TOKEN);
>>>>>>> 5216a66 (그룹멤버 수 추가)
=======
>>>>>>> 62f553a (apiUtil 이용해서 api 접근)

    getMyGroups()
    .then((data) => {
      this.setState({ groups: data, loading: false });
    })
    .catch((error) => {
      this.setState({ error: error.message || "에러 발생", loading: false });
    });
<<<<<<< HEAD
<<<<<<< HEAD

  }

    handleGroupClick = (groupId) => {
    this.props.history.push(`/groups/${groupId}/polls`);
  };

  render() {
    const { groups, loading, error } = this.state;
    
=======
=======

>>>>>>> 62f553a (apiUtil 이용해서 api 접근)
  }

  render() {
    const { groups, loading, error } = this.state;
>>>>>>> 5216a66 (그룹멤버 수 추가)

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
<<<<<<< HEAD
              <div className="group-list">
            {groups.map((group) => (
    <div key={group.id}>
      <div className="group-card"
      onClick={() => this.handleGroupClick(group.id)}
      style={{ cursor: "pointer" }}>
        <div className="group-avatar">
          <img src={group.imageUrl} alt="Group Avatar" />
        </div>
        <div className="group-info">
          <div className="group-name">{group.name}</div>
         <div className="group-count">
멤버 {group.memberCount != null ? group.memberCount : 0}명
</div>
        </div>
      </div>
    </div>
  ))}
      </div>
=======
          <div className="group-card-list">
            {groups.map((group) => (
              <div key={group.id} className="group-card">
                <div className="group-avatar"> 
                    <img src={group.imageUrl} alt="Group Avatar" />
</div>
                
                <div className="group-info">
                  <div className="group-name">{group.name}</div>
                  <div className="group-count">멤버 {group.memberCount}명</div>
                </div>
              </div>
            ))}
          </div>
>>>>>>> 5216a66 (그룹멤버 수 추가)
        )}
      </div>
    );
  }
}
<<<<<<< HEAD
export default withRouter(MyGroups);
=======

export default MyGroups;
>>>>>>> 5216a66 (그룹멤버 수 추가)
