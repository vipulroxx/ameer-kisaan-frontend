import React, { useCallback, useEffect, useState } from 'react';
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
  Alert,
  CircularProgress,
} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonIcon from '@mui/icons-material/Person';
import ReplyIcon from '@mui/icons-material/Reply';
import { forumApi, getCurrentUser, onSessionChange } from '../services/api';

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [commentText, setCommentText] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selected, setSelected] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const [me, setMe] = useState(getCurrentUser());

  useEffect(() => onSessionChange((u) => setMe(u)), []);

  const load = useCallback(async (next) => {
    setLoading(true);
    try {
      const page = await forumApi.list(next);
      setPosts((prev) => {
        if (next) return [...prev, ...page.items];
        // Keep posts created while this page was loading, so a slow load cannot drop them.
        const ids = new Set(page.items.map((p) => p.id));
        return [...prev.filter((p) => p.local && !ids.has(p.id)), ...page.items];
      });
      setCursor(page.nextCursor);
      setError('');
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const replacePost = (updated) => setPosts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));

  const run = async (fn) => {
    try {
      await fn();
      setError('');
    } catch (e) {
      setError(e.message);
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const text = commentText.trim();
    if (!text) return;
    run(async () => {
      if (editingId) {
        replacePost(await forumApi.edit(editingId, text));
        setEditingId(null);
      } else {
        const post = await forumApi.create(text);
        setPosts((prev) => [{ ...post, local: true }, ...prev]);
      }
      setCommentText('');
    });
  };

  const handleReplySubmit = (e, post) => {
    e.preventDefault();
    const text = replyText.trim();
    if (!text) return;
    run(async () => {
      const reply = await forumApi.reply(post.id, text);
      replacePost({ ...post, replyCount: post.replyCount + 1, replies: [...post.replies, reply] });
      setReplyText('');
    });
  };

  const toggleLike = (post) => run(async () => {
    replacePost(post.likedByMe ? await forumApi.unlike(post.id) : await forumApi.like(post.id));
  });

  const handleEdit = () => {
    setCommentText(selected.text);
    setEditingId(selected.id);
    closeMenu();
  };

  const handleDelete = () => {
    const post = selected;
    closeMenu();
    run(async () => {
      await forumApi.remove(post.id);
      setPosts((prev) => prev.filter((p) => p.id !== post.id));
    });
  };

  const closeMenu = () => {
    setAnchorEl(null);
    setSelected(null);
  };

  const canModify = (post) => me && (post.authorId === me.id || me.role === 'admin');

  return (
    <Box sx={{ padding: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>Community Forum</Typography>
      <Typography variant="body1" sx={{ marginBottom: 2 }}>Join the discussion and share your experiences!</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>{error}</Alert>}

      <form onSubmit={handleCommentSubmit} style={{ marginBottom: '20px' }}>
        <TextField
          fullWidth
          label={editingId ? 'Edit your post' : 'Add a comment'}
          variant="outlined"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          inputProps={{ maxLength: 2000 }}
          multiline
          required
        />
        <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 1 }}>
          {editingId ? 'Save' : 'Post'}
        </Button>
        {editingId && (
          <Button sx={{ marginTop: 1, ml: 1 }} onClick={() => { setEditingId(null); setCommentText(''); }}>Cancel</Button>
        )}
      </form>

      <List sx={{ marginTop: 2 }}>
        {posts.map((post) => (
          <div key={post.id}>
            <ListItem sx={{ display: 'flex', alignItems: 'center', padding: '10px 0' }}>
              <Avatar sx={{ marginRight: 2 }}><PersonIcon /></Avatar>
              {/* React escapes text, so user content can never inject HTML or script */}
              <ListItemText
                primary={`${post.authorName}: ${post.text}`}
                secondary={`${new Date(post.createdAt).toLocaleString()}${post.editedAt ? ' (edited)' : ''}`}
              />
              <IconButton onClick={() => toggleLike(post)} color="primary" aria-label="like">
                {post.likedByMe ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
              </IconButton>
              <Typography variant="body2" sx={{ marginLeft: 1 }}>{post.likes}</Typography>
              {canModify(post) && (
                <IconButton onClick={(e) => { setAnchorEl(e.currentTarget); setSelected(post); }} aria-label="more">
                  <MoreVertIcon />
                </IconButton>
              )}
              <IconButton onClick={() => setExpanded(expanded === post.id ? null : post.id)} aria-label="reply">
                <ReplyIcon />
              </IconButton>
              <Typography variant="body2">{post.replyCount}</Typography>
            </ListItem>
            <Collapse in={expanded === post.id} timeout="auto" unmountOnExit>
              <Box sx={{ paddingLeft: 4 }}>
                <form onSubmit={(e) => handleReplySubmit(e, post)} style={{ display: 'flex', marginBottom: '10px' }}>
                  <TextField
                    label="Reply"
                    variant="outlined"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    inputProps={{ maxLength: 2000 }}
                    required
                    size="small"
                    sx={{ flexGrow: 1, marginRight: 1 }}
                  />
                  <Button type="submit" variant="contained" color="primary" size="small">Reply</Button>
                </form>
                {post.replies.map((reply) => (
                  <Box key={reply.id} sx={{ display: 'flex', alignItems: 'center', padding: '5px 0' }}>
                    <Avatar sx={{ marginRight: 1 }}><PersonIcon /></Avatar>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{reply.authorName}:</Typography>
                    <Typography variant="body2" sx={{ marginLeft: 1 }}>{reply.text}</Typography>
                  </Box>
                ))}
              </Box>
            </Collapse>
          </div>
        ))}
      </List>
      {loading && <CircularProgress size={24} />}
      {!loading && posts.length === 0 && <Typography color="text.secondary">No posts yet. Start the conversation!</Typography>}
      {cursor && !loading && <Button onClick={() => load(cursor)}>Load more</Button>}

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
        {selected && me && selected.authorId === me.id && <MenuItem onClick={handleEdit}>Edit</MenuItem>}
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>

      <Divider sx={{ margin: '20px 0' }} />

      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Comment Sorting:</Typography>
      <Button variant="outlined" onClick={() => setPosts([...posts].sort((a, b) => b.likes - a.likes))} sx={{ marginRight: 1 }}>
        Most Liked
      </Button>
      <Button variant="outlined" onClick={() => setPosts([...posts].sort((a, b) => b.createdAt.localeCompare(a.createdAt)))}>
        Most Recent
      </Button>
    </Box>
  );
};

export default Forum;
