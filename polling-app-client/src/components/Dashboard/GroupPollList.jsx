import React, { Component } from 'react';
import { getPollsByGroupId, castVote } from '../../util/APIUtils';
import Poll from '../../poll/Poll';
import LoadingIndicator from '../../common/LoadingIndicator';
import { notification } from 'antd';

class GroupPollList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      polls: [],
      currentVotes: [],
      isLoading: false
    };
  }

  componentDidMount() {
    const groupId = this.props.match.params.groupId;
    this.setState({ isLoading: true });
    getPollsByGroupId(groupId)
.then(response => {
  this.setState({
    polls: response.content,  // ✅ content만 꺼내기
    currentVotes: Array(response.content.length).fill(null),
    isLoading: false
  });
})
      .catch(error => {
        console.error("Error fetching polls:", error);
        this.setState({ isLoading: false });
      });
  }

  handleVoteChange = (event, index) => {
    const newVotes = [...this.state.currentVotes];
    newVotes[index] = event.target.value;
    this.setState({ currentVotes: newVotes });
  };

  handleVoteSubmit = (event, index) => {
    event.preventDefault();
    if (!this.props.isAuthenticated) {
      this.props.history.push("/login");
      notification.info({ message: 'Polling App', description: 'Please login to vote.' });
      return;
    }

    const voteData = {
      pollId: this.state.polls[index].id,
      choiceId: this.state.currentVotes[index]
    };

    castVote(voteData)
      .then(response => {
        const updated = [...this.state.polls];
        updated[index] = response;
        this.setState({ polls: updated });
      })
      .catch(error => {
        if (error.status === 401) {
          this.props.handleLogout('/login', 'error', 'You have been logged out.');
        } else {
          notification.error({ message: 'Polling App', description: error.message });
        }
      });
  };

  render() {
    const { polls, isLoading, currentVotes } = this.state;

    return (
      <div className="polls-container">
        {polls.map((poll, index) => (
          <Poll
            key={poll.id}
            poll={poll}
            currentVote={currentVotes[index]}
            handleVoteChange={e => this.handleVoteChange(e, index)}
            handleVoteSubmit={e => this.handleVoteSubmit(e, index)}
          />
        ))}
        {!isLoading && polls.length === 0 && <div>No Polls Found.</div>}
        {isLoading && <LoadingIndicator />}
      </div>
    );
  }
}

export default GroupPollList;
