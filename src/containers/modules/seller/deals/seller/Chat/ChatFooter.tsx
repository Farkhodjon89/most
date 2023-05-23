import { Box, Grid, IconButton, Typography } from '@mui/material';
import Clip from 'components/icons/Clip';
import Send from 'components/icons/Send';
import { TextField } from 'components/Textfield';
import React, { useState } from 'react';
import { monoLightGrey2 } from 'styles/colorPalette';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  footer: {
    backgroundColor: '#fff',
    zIndex: 20,
    position: 'sticky',
    bottom: -2,
    width: '100%',
    padding: '12px 5px 16px 12px',
    borderRadius: '0px 0px 24px 24px',
    borderTop: `1px solid ${monoLightGrey2}`,
  },
  clipFileName: {
    fontSize: theme.typography.pxToRem(10),
    marginBottom: -2,
    textDecoration: 'underline',
  },
}));

const ChatFooter = () => {
  const { classes } = useStyles();
  const [newMessage, setNewMessage] = useState('');

  //здесь имитация прикрепленных файлов, если раскоментить то можно увидеть верстку
  // const [clipFile, setClipFile] = useState({ name: 'Договор на поставку зерна.pdf', size: '12мБ', format: 'pdf' });
  const [clipFile, setClipFile] = useState({ name: '', size: '', format: '' });

  const handleSendMessage = () => {
    console.log('send!');
  };

  const handleDeleteFile = () => {
    console.log('delete file!');
  };
  return (
    <Box className={classes.footer}>
      <Grid container columnSpacing={0.5} rowSpacing={1} alignItems="flex-end">
        <Grid item xs>
          <TextField
            placeholder="Ваше сообщение..."
            size={'extraSmall'}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            multiline
          />
        </Grid>
        <Grid item>
          <IconButton aria-label="прикрепить файл" onClick={handleSendMessage}>
            <Clip />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton aria-label="отправить сообщение" onClick={handleSendMessage}>
            <Send />
          </IconButton>
        </Grid>
        {clipFile.name && (
          <Grid item xs={12}>
            <Grid container alignItems="center" columnSpacing={0.5}>
              <Grid item>
                <Typography className={classes.clipFileName}>{clipFile?.name}</Typography>
              </Grid>
              <Grid item>
                <IconButton size="small" aria-label="удалить прикрепленный файл" onClick={handleDeleteFile}>
                  <i className="ui_close" style={{ fontSize: 10 }} />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default ChatFooter;
