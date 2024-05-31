import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from '@mui/material';
import '../cssFile/comment.css';

interface MessageDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: (text: string, message: string) => void;
    comments: string[];
}

function MessageDialog({ open, onClose, onConfirm, comments }: MessageDialogProps) {
    const [text, setText] = useState('');
    const [message, setMessage] = useState('');
    const [isEnglish, setIsEnglish] = useState(true);

    const handleClose = () => {
        onClose();
        setText('');
        setMessage('');
    };

    const handleConfirm = () => {
        onConfirm(text, message);
        setText('');
        setMessage('');
    };

    useEffect(() => {
        const handleKeyDown = (event:any) => {
          const charCode = event.which || event.keyCode;
          const charStr = String.fromCharCode(charCode);
          const isEnglishChar = /^[A-Za-z\s]+$/.test(charStr);
          setIsEnglish(isEnglishChar);
        };
    
        window.addEventListener('keydown', handleKeyDown);
    
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
        };
      }, []);

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Comments</DialogTitle>
            <DialogContent>
                {comments.map((comment, index) => (
                    <Typography key={index} variant="body1">{comment}</Typography>
                ))}
                <TextField className='comment'
                    autoFocus
                    margin="normal"
                    label="comment"
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleConfirm}>Comment</Button>
            </DialogActions>
        </Dialog>
    );
}

export default MessageDialog;




