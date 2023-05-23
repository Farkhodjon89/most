import ClickAwayListener from '@mui/base/ClickAwayListener';
import { Box, Stack, Typography } from '@mui/material';
import cx from 'classnames';
import Image from 'next/image';
import { useState } from 'react';
import { makeStyles } from 'tss-react/mui';

import { mainBlue900, monoDarkBlack } from '../../../styles/colorPalette';

const useStyles = makeStyles()((theme) => ({
  activeIcon: {
    transform: 'rotate(180deg)',
    transition: '0.3s',
  },
  title: {
    fontSize: theme.typography.pxToRem(26),
    fontWeight: 700,
    lineHeight: '32px',
    color: monoDarkBlack,
    marginBottom: '16px',
  },
  subtitle: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 700,
    lineHeight: '22px',
    color: monoDarkBlack,
    marginBottom: '8px',
  },
  text: {
    fontSize: theme.typography.pxToRem(14),
    lineHeight: '20px',
    color: monoDarkBlack,
    marginBottom: '16px',
  },
  label: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 600,
    lineHeight: '22px',
    color: mainBlue900,
    cursor: 'pointer',
  },
}));

const CompanyDescription = ({ title }: any) => {
  const [open, setOpen] = useState(false);
  const { classes } = useStyles();

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };
  return (
    <>
      <Typography className={classes.title} variant={'h4'}>
        {title}
      </Typography>
      <Typography className={classes.subtitle} variant={'h5'}>
        Заголовок
      </Typography>
      <Typography className={classes.text}>
        Приятно, граждане, наблюдать, как действия представителей оппозиции, инициированные исключительно синтетически,
        ассоциативно распределены по отраслям. Таким образом, экономическая повестка сегодняшнего дня представляет собой
        интересный эксперимент проверки своевременного выполнения сверхзадачи! Учитывая ключевые сценарии поведения,
        разбавленное изрядной долей эмпатии, рациональное мышление играет важную роль в формировании кластеризации
        усилий.
      </Typography>
      <Stack mb={2} direction={'row'} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
        <ClickAwayListener onClickAway={handleClickAway}>
          <Box sx={{ position: 'relative' }}>
            {open ? (
              <>
                <Stack direction={'row'} spacing={1}>
                  <Box>
                    <Image src="/detailImage.png" alt="Image" width={241} height={160} />
                  </Box>
                  <Box>
                    <Image src="/detailImage.png" alt="Image" width={241} height={160} />
                  </Box>
                </Stack>
                <Typography className={classes.subtitle} variant={'h5'}>
                  Заголовок
                </Typography>
                <Typography className={classes.text}>
                  Приятно, граждане, наблюдать, как действия представителей оппозиции, инициированные исключительно
                  синтетически, ассоциативно распределены по отраслям. Таким образом, экономическая повестка
                  сегодняшнего дня представляет собой интересный эксперимент проверки своевременного выполнения
                  сверхзадачи! Учитывая ключевые сценарии поведения, разбавленное изрядной долей эмпатии, рациональное
                  мышление играет важную роль в формировании кластеризации усилий.
                </Typography>
                <Typography className={classes.text}>
                  Приятно, граждане, наблюдать, как действия представителей оппозиции, инициированные исключительно
                  синтетически, ассоциативно распределены по отраслям. Таким образом, экономическая повестка
                  сегодняшнего дня представляет собой интересный эксперимент проверки своевременного выполнения
                  сверхзадачи! Учитывая ключевые сценарии поведения, разбавленное изрядной долей эмпатии, рациональное
                  мышление играет важную роль в формировании кластеризации усилий.
                </Typography>
              </>
            ) : null}
            <Typography onClick={handleClick} className={classes.label}>
              <i
                className={open ? cx('ui_down-arrow', classes.activeIcon) : 'ui_down-arrow'}
                style={{ fontSize: 12, marginRight: '10px' }}
              />
              {!open ? 'Показать больше' : 'Показать меньше'}
            </Typography>
          </Box>
        </ClickAwayListener>
      </Stack>
    </>
  );
};

export default CompanyDescription;
