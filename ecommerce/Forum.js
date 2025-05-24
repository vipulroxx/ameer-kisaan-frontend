import React, { useState, useEffect } from 'react';
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
  Grid,
  Paper,
  Snackbar,
  Alert,
  ImageList,
  ImageListItem,
} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonIcon from '@mui/icons-material/Person';
import ReplyIcon from '@mui/icons-material/Reply';
import { FaShoppingCart } from 'react-icons/fa';
import { initialInventoryData } from './MarketPrices';
import GooglePayButton from '@google-pay/button-react'; // Import Google Pay button

const Forum = () => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [replyText, setReplyText] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const [marketItems, setMarketItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [itemQuantities, setItemQuantities] = useState({});
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    // Load market items from local storage on component mount
    const storedMarketItems = localStorage.getItem('marketItems');
    if (storedMarketItems) {
      setMarketItems(JSON.parse(storedMarketItems));
    } else {
      setMarketItems([]); // Initialize with an empty array
    }
  }, []);

  useEffect(() => {
    // Save market items to local storage whenever it changes
    localStorage.setItem('marketItems', JSON.stringify(marketItems));
  }, [marketItems]);

  const handleAddToMarket = (item, quantity) => {
    setMarketItems((prev) => {
      const existingItemIndex = prev.findIndex((i) => i.id === item.id);
      if (existingItemIndex > -1) {
        const updatedItems = [...prev];
        updatedItems[existingItemIndex].quantity = parseInt(quantity, 10) || 1;
        return updatedItems;
      } else {
        return [...prev, { ...item, quantity: parseInt(quantity, 10) || 1 }];
      }
    });
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const filteredItems = initialInventoryData.filter(item =>
    item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.variety.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.packagingType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalCost = marketItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleQuantityChange = (itemId, quantity) => {
    setItemQuantities(prev => ({ ...prev, [itemId]: quantity }));
  };

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

  const handlePayment = (upiId) => {
    // In a real application, you would integrate with a payment gateway here
    // This is a simplified example
    console.log(`Payment initiated via UPI: ${upiId} for ₹${totalCost}`);
    // Simulate a successful payment
    setTimeout(() => {
      setPaymentSuccess(true);
      setMarketItems([]); // Clear the cart after successful payment
      localStorage.removeItem('marketItems'); // Clear local storage
    }, 2000);
  };

  const handleClearCart = () => {
    setMarketItems([]);
    localStorage.removeItem('marketItems');
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>Community Forum & Trading Market</Typography>
      <Typography variant="body1" sx={{ marginBottom: 2 }}>Join the discussion, share your experiences, and trade items!</Typography>

      {/* Forum Section */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>Forum</Typography>
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

      {/* Trading Market Section */}
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>Trading Market</Typography>

        <TextField
          label="Search Products"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 3 }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Grid container spacing={3} sx={{ maxHeight: 400, overflowY: 'auto' }}>
          {filteredItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
              <Paper
                sx={{
                  padding: 2,
                  backgroundColor: '#e3f2fd',
                  height: '100%',
                  transition: '0.3s',
                  '&:hover': {
                    boxShadow: 4,
                    backgroundColor: '#bbdefb',
                  },
                }}
              >
                <Typography variant="h6" sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                  {item.productName} ({item.variety})
                </Typography>
                <Typography variant="body2">{`Available: ${item.quantity} units`}</Typography>
                <Typography variant="body2">{`Price: ₹${item.price} per unit`}</Typography>
                <Typography variant="body2">{`Harvest Date: ${item.harvestDate}`}</Typography>
                <Typography variant="body2">{`Quality Grade: ${item.qualityGrade}`}</Typography>
                <Typography variant="body2">{`Packaging: ${item.packagingType}`}</Typography>

                <TextField
                  label="Enter Quantity"
                  type="number"
                  defaultValue={1}
                  sx={{ width: '100%', marginTop: 1 }}
                  onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                />

                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddToMarket(item, itemQuantities[item.id] || 1)}
                  sx={{ marginTop: 1 }}
                >
                  Add to Market
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Typography variant="h5" gutterBottom sx={{ marginTop: 3, color: 'primary.main' }}>
          Market Items <FaShoppingCart />
        </Typography>
        <Box sx={{ maxHeight: 200, overflowY: 'auto', marginBottom: 2, padding: 1, border: '1px solid #ccc', borderRadius: 1 }}>
          {marketItems.map((item, index) => (
            <Typography key={index} variant="body2" sx={{ padding: 0.5 }}>
              {item.productName} ({item.variety}) - ₹{item.price} x {item.quantity} = ₹{item.price * item.quantity}
            </Typography>
          ))}
        </Box>

        <Typography variant="h6" sx={{ color: 'red', fontWeight: 'bold', marginTop: 2 }}>
          Total Cost: ₹{totalCost}
        </Typography>
        <Button variant="contained" color="secondary" onClick={handleClearCart} sx={{ marginTop: 2 }}>
          Clear Cart
        </Button>

        <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
          <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
            Item added to market!
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default Forum;