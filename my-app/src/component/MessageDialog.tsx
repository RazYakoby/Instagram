import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from '@mui/material';

interface MessageDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: (text: string, message: string) => void;
    comments: string[];
}

function MessageDialog({ open, onClose, onConfirm, comments }: MessageDialogProps) {
    const [text, setText] = useState('');
    const [message, setMessage] = useState('');

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

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Comments</DialogTitle>
            <DialogContent>
                {comments.map((comment, index) => (
                    <Typography key={index} variant="body1">{comment}</Typography>
                ))}
                <TextField
                    autoFocus
                    margin="dense"
                    label="comment"
                    type="text"
                    fullWidth
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




