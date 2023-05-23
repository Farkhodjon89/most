import { Box, Grid, Typography } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { monoDarkGrey, monoGrey } from 'styles/colorPalette';
import { makeStyles } from 'tss-react/mui';
import { MadFormatter } from 'utils/common';

import ChatFooter from './ChatFooter';
import ChatHeader from './ChatHeader';
import FileBox from './FileBox';

const MOCK_MESSAGES = [
  {
    text: '1 Сложно сказать, почему предприниматели в сети интернет указаны как претенденты на роль ключевых факторов. Как принято считать, сделанные на базе интернет-аналитики выводы, инициированные',
    author: { logo: '/img/chat/logo-2.png', name: 'Лукойл' },
    date: 1669144272,
    file: null,
  },

  {
    text: '2 Сложно сказать, почему предприниматели в сети интернет указаны как претенденты',
    author: { logo: '/img/chat/logo-1.png', name: 'Зёрна России' },
    date: 1669149912,
    file: null,
  },

  {
    text: '',
    author: { logo: '/img/chat/logo-1.png', name: 'Зёрна России' },
    file: { name: 'Договор на поставку зерна.pdf', size: '12мБ', format: 'pdf' },
    date: 1669014012,
  },

  {
    text: '4 Сложно сказать, почему предприниматели в сети интернет указаны как претенденты',
    author: { logo: '/img/chat/logo-1.png', name: 'Лукойл' },
    file: { name: 'Договор на поставку зерна.pdf', size: '12мБ', format: 'pdf' },
    date: 1669032492,
  },

  {
    text: '5 Сложно сказать, почему предприниматели в сети интернет указаны как претенденты на роль ключевых факторов. Как принято считать, сделанные на базе интернет-аналитики выводы, инициированные',
    author: { logo: '/img/chat/logo-2.png', name: 'Лукойл' },
    date: 1669034412,
    file: null,
  },

  {
    text: '',
    author: { logo: '/img/chat/logo-1.png', name: 'Зёрна России' },
    file: { name: 'Договор на поставку зерна.pdf', size: '12мБ', format: 'pdf' },
    date: 1668915012,
  },

  {
    text: '6 Сложно сказать, почему предприниматели в сети интернет указаны как претенденты',
    author: { logo: '/img/chat/logo-1.png', name: 'Лукойл' },
    file: { name: 'Договор на поставку зерна.pdf', size: '12мБ', format: 'pdf' },
    date: 1668922212,
  },

  {
    text: '7 Сложно сказать, почему предприниматели в сети интернет указаны как претенденты на роль ключевых факторов. Как принято считать, сделанные на базе интернет-аналитики выводы, инициированные',
    author: { logo: '/img/chat/logo-2.png', name: 'Лукойл' },
    date: 1668935052,
    file: null,
  },

  {
    text: '',
    author: { logo: '/img/chat/logo-1.png', name: 'Зёрна России' },
    file: { name: 'Договор на поставку зерна.pdf', size: '12мБ', format: 'pdf' },
    date: 1668938412,
  },

  {
    text: '9 Сложно сказать, почему предприниматели в сети интернет указаны как претенденты',
    author: { logo: '/img/chat/logo-1.png', name: 'Лукойл' },
    file: { name: 'Договор на поставку зерна.pdf', size: '12мБ', format: 'pdf' },
    date: 1668939612,
  },

  {
    text: '117 Сложно сказать, почему предприниматели в сети интернет указаны как претенденты на роль ключевых факторов. Как принято считать, сделанные на базе интернет-аналитики выводы, инициированные',
    author: { logo: '/img/chat/logo-2.png', name: 'Лукойл' },
    date: 1668935052,
    file: null,
  },

  {
    text: '118 Сложно сказать, почему предприниматели в сети интернет указаны как претенденты на роль ключевых факторов. Как принято считать, сделанные на базе интернет-аналитики выводы, инициированные',
    author: { logo: '/img/chat/logo-1.png', name: 'Зёрна России' },
    file: { name: 'Договор на поставку зерна.pdf', size: '12мБ', format: 'pdf' },
    date: 1668938412,
  },

  {
    text: '119 Сложно сказать, почему предприниматели в сети интернет указаны как претенденты',
    author: { logo: '/img/chat/logo-1.png', name: 'Лукойл' },
    file: { name: 'Договор на поставку зерна.pdf', size: '12мБ', format: 'pdf' },
    date: 1668939612,
  },
];

const useStyles = makeStyles()((theme) => ({
  chat: {
    'borderRadius': 24,
    'backgroundColor': '#fff',
    'height': 748,
    'overflowY': 'scroll',

    'position': 'relative',
    '&::-webkit-scrollbar': {
      width: 0,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'transparent',
      borderRadius: 0,
    },
  },
  chatMessages: {
    padding: '10px 32px 32px 16px',
  },
  logo: {
    'width': 24,
    'height': 24,
    'borderRadius': '50%',
    'overflow': 'hidden',
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center',
    },
  },
  text: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 500,
    lineHeight: '143%',
    color: monoDarkGrey,
    wordWrap: 'break-word',
  },
  company: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 600,
  },
  time: {
    color: monoGrey,
    fontSize: theme.typography.pxToRem(10),
    fontWeight: 700,
  },
}));

const Chat = () => {
  const { classes } = useStyles();

  const scrollRef = useRef(null);

  useEffect(() => handleScrollToBottom(), [scrollRef]);

  //чтобы при первой загрузке чат опускался к первому сообщению, заведомо огромное число чтобы в 100% случаев опустился вниз, у меня только так сработало
  const handleScrollToBottom = () => {
    scrollRef.current.scroll({ top: 99999999, behavior: 'smooth' });
  };

  return (
    <Box className={classes.chat} ref={scrollRef}>
      <ChatHeader name="Лукойл" inn="99888990998" />
      <Box className={classes.chatMessages}>
        <Grid container rowSpacing={2} direction="column-reverse">
          {MOCK_MESSAGES.map((message, key) => (
            <Grid item key={key}>
              <Grid container columnSpacing={1}>
                <Grid item>
                  <Box className={classes.logo}>
                    <img src={message.author.logo} />
                  </Box>
                </Grid>
                <Grid item xs>
                  <Grid container rowSpacing={0.5}>
                    <Grid item xs={12}>
                      <Grid container rowSpacing={2} justifyContent="space-between" alignItems="flex-end">
                        <Grid item>
                          <Typography className={classes.company}>{message.author.name}</Typography>
                        </Grid>
                        <Grid item>
                          <Typography className={classes.time}>{MadFormatter.toTime(message.date)}</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    {message.text.length > 0 && (
                      <Grid item xs={12}>
                        <Typography className={classes.text}>{message.text}</Typography>
                      </Grid>
                    )}
                    {message.file && (
                      <Grid item xs={12}>
                        <FileBox file={message.file} />
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Box>
      <ChatFooter />
    </Box>
  );
};

export default Chat;
