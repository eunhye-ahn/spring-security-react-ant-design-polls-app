import React, { Component } from 'react';

class MyComments extends Component {
  state = {
    comments: [],
    newComment: '',
    loading: false,
    error: null,
  };

  componentDidMount() {
    this.loadComments();
  }

  getJwtToken = () => localStorage.getItem('accessToken');

  loadComments = () => {
    const pollId = this.props.match.params.pollId;
    const token = this.getJwtToken();

    this.setState({ loading: true, error: null });

    fetch(`/api/polls/${pollId}/comments`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        if (!res.ok) throw new Error('댓글 목록을 불러올 수 없습니다.');
        return res.json();
      })
      .then(data => {
        this.setState({
          comments: Array.isArray(data.content) ? data.content : [],
          loading: false,
        });
      })
      .catch(error => this.setState({ error: error.message, loading: false }));
  };

  handleInputChange = e => {
    this.setState({ newComment: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const pollId = this.props.match.params.pollId;
    const { newComment } = this.state;
    const token = this.getJwtToken();

    if (!newComment.trim()) return;

    fetch(`/api/polls/${pollId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content: newComment }),
    })
      .then(res => {
        if (!res.ok) throw new Error('댓글 작성에 실패했습니다.');
        return res.json();
      })
      .then(() => {
        this.setState({ newComment: '' });
        this.loadComments();
      })
      .catch(error => this.setState({ error: error.message }));
  };

  handleDelete = commentId => {
    const token = this.getJwtToken();

    fetch(`/api/comments/${commentId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        if (!res.ok) throw new Error('댓글 삭제에 실패했습니다.');
        return res.json();
      })
      .then(() => this.loadComments())
      .catch(error => this.setState({ error: error.message }));
  };

  render() {
    const { comments, newComment, loading, error } = this.state;

    return (
      <div style={{ maxWidth: 600, margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
        <h3 style={{ borderBottom: '2px solid #1890ff', paddingBottom: 8 }}>댓글</h3>

        {error && (
          <p style={{ color: 'red', backgroundColor: '#fff1f0', padding: 10, borderRadius: 4 }}>
            {error}
          </p>
        )}

        {loading ? (
          <p>로딩 중...</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {comments.map(c => (
              <li
                key={c.id}
                style={{
                  borderBottom: '1px solid #f0f0f0',
                  padding: '12px 0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div style={{ fontWeight: 'bold', color: '#1890ff' }}>
                    {c.username || `User${c.userId || ''}`}
                  </div>
                  <div style={{ fontSize: 14, color: '#555', margin: '4px 0' }}>{c.content}</div>
                  <div style={{ fontSize: 12, color: '#999' }}>{c.createdAt}</div>
                </div>
                <button
                  onClick={() => this.handleDelete(c.id)}
                  style={{
                    border: 'none',
                    backgroundColor: 'transparent',
                    color: '#ff4d4f',
                    cursor: 'pointer',
                    fontSize: 14,
                  }}
                  title="댓글 삭제"
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
        )}

        <form onSubmit={this.handleSubmit} style={{ marginTop: 20 }}>
          <textarea
            value={newComment}
            onChange={this.handleInputChange}
            placeholder="댓글을 입력하세요"
            rows={4}
            style={{
              width: '100%',
              padding: 10,
              fontSize: 14,
              borderRadius: 4,
              border: '1px solid #d9d9d9',
              resize: 'vertical',
            }}
          />
          <button
            type="submit"
            disabled={!newComment.trim()}
            style={{
              marginTop: 8,
              padding: '8px 16px',
              fontSize: 14,
              backgroundColor: '#1890ff',
              color: 'white',
              border: 'none',
              borderRadius: 4,
              cursor: newComment.trim() ? 'pointer' : 'not-allowed',
            }}
          >
            댓글 작성
          </button>
        </form>
      </div>
    );
  }
}

export default MyComments;
