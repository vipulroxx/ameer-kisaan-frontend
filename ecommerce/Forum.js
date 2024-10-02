import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Menu,
  MenuItem,
  Avatar,
  Collapse,
} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonIcon from '@mui/icons-material/Person';
import ReplyIcon from '@mui/icons-material/Reply';

const Forum = () => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [replyText, setReplyText] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [expanded, setExpanded] = useState(null);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      const newComment = {
        id: Date.now(),
        text: commentText,
        likes: 0,
        user: { username: 'User123' }, // Placeholder for username
        replies: [],
      };
      setComments((prev) => [...prev, newComment]);
      setCommentText('');
    }
  };

  const handleReplySubmit = (e, id) => {
    e.preventDefault();
    if (replyText.trim()) {
      const newReply = {
        id: Date.now(),
        text: replyText,
        user: { username: 'User123' }, // Placeholder for username
      };
      setComments((prev) =>
        prev.map((comment) =>
          comment.id === id ? { ...comment, replies: [...comment.replies, newReply] } : comment
        )
      );
      setReplyText('');
      setExpanded(null);
    }
  };

  const handleLike = (id) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === id ? { ...comment, likes: comment.likes + 1 } : comment
      )
    );
  };

  const handleEdit = (id) => {
    const commentToEdit = comments.find((comment) => comment.id === id);
    setCommentText(commentToEdit.text);
    setComments((prev) => prev.filter((comment) => comment.id !== id));
    handleCloseMenu();
  };

  const handleDelete = (id) => {
    setComments((prev) => prev.filter((comment) => comment.id !== id));
    handleCloseMenu();
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedCommentId(null);
  };

  const handleMenuOpen = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedCommentId(id);
  };

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>Community Forum</Typography>
      <Typography variant="body1" sx={{ marginBottom: 2 }}>Join the discussion and share your experiences!</Typography>

      <form onSubmit={handleCommentSubmit} style={{ marginBottom: '20px' }}>
        <TextField
          fullWidth
          label="Add a comment"
          variant="outlined"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 1 }}>
          Post
        </Button>
      </form>

      <List sx={{ marginTop: 2 }}>
        {comments.map((comment) => (
          <div key={comment.id}>
            <ListItem sx={{ display: 'flex', alignItems: 'center', padding: '10px 0' }}>
              <Avatar sx={{ marginRight: 2 }}><PersonIcon /></Avatar>
              <ListItemText primary={`${comment.user.username}: ${comment.text}`} />
              <IconButton onClick={() => handleLike(comment.id)} color="primary">
                <ThumbUpIcon />
              </IconButton>
              <Typography variant="body2" sx={{ marginLeft: 1 }}>{comment.likes}</Typography>
              <IconButton onClick={(event) => handleMenuOpen(event, comment.id)} color="default">
                <MoreVertIcon />
              </IconButton>
              <IconButton onClick={() => toggleExpand(comment.id)} color="default">
                <ReplyIcon />
              </IconButton>
            </ListItem>
            <Collapse in={expanded === comment.id} timeout="auto" unmountOnExit>
              <Box sx={{ paddingLeft: 4 }}>
                <form onSubmit={(e) => handleReplySubmit(e, comment.id)} style={{ display: 'flex', marginBottom: '10px' }}>
                  <TextField
                    label="Reply"
                    variant="outlined"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    required
                    size="small"
                    sx={{ flexGrow: 1, marginRight: 1 }}
                  />
                  <Button type="submit" variant="contained" color="primary" size="small">Reply</Button>
                </form>
                {comment.replies.map((reply) => (
                  <Box key={reply.id} sx={{ display: 'flex', alignItems: 'center', padding: '5px 0' }}>
                    <Avatar sx={{ marginRight: 1 }}><PersonIcon /></Avatar>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{reply.user.username}:</Typography>
                    <Typography variant="body2" sx={{ marginLeft: 1 }}>{reply.text}</Typography>
                  </Box>
                ))}
              </Box>
            </Collapse>
          </div>
        ))}
      </List>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={() => handleEdit(selectedCommentId)}>Edit</MenuItem>
        <MenuItem onClick={() => handleDelete(selectedCommentId)}>Delete</MenuItem>
      </Menu>

      <Divider sx={{ margin: '20px 0' }} />

      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Comment Sorting:</Typography>
      <Button variant="outlined" onClick={() => setComments([...comments].sort((a, b) => b.likes - a.likes))} sx={{ marginRight: 1 }}>
        Most Liked
      </Button>
      <Button variant="outlined" onClick={() => setComments([...comments].sort((a, b) => b.id - a.id))}>
        Most Recent
      </Button>
    </Box>
  );
};

export default Forum;
