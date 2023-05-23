import 'react-quill/dist/quill.snow.css';

import { FormControl, FormHelperText } from '@mui/material';
import dynamic from 'next/dynamic';
import React, { FC, useEffect, useRef } from 'react';
import { mainBlue300, mainBlue500, mainBlue900, monoGrey, monoLightGrey1, monoLightGrey2 } from 'styles/colorPalette';
import { makeStyles } from 'tss-react/mui';

// Quill.reqister('modules/imageResize', ImageResize);
const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill');

    const icons = RQ.Quill.import('ui/icons');
    icons['image'] = `<i class="ui_image-plus" style='color: #5656FF'/>`;

    // RQ.Quill.register('modules/imageResize', ImageResize);
    return ({ forwardedRef, ...props }) => <RQ ref={forwardedRef} {...props} />;
  },
  {
    ssr: false,
  },
);

const useStyles = makeStyles<{ isValid: boolean; helperText: string }>()((theme, { isValid, helperText }) => ({
  quillContainer: {
    '.ql-link': {
      marginLeft: 8,
    },
    '& .ql-toolbar': {
      '& button': {
        'transition': 'all, 0.3s',
        'borderRadius': 8,
        'marginRight': theme.spacing(0.8),
        '& path': {
          stroke: mainBlue900,
        },
        '& line': {
          stroke: mainBlue900,
        },
        '&:hover': {
          backgroundColor: mainBlue300,
        },
      },
      '& .ql-fill': {
        stroke: 'unset',
        fill: mainBlue900,
      },
      '& .ql-active': {
        backgroundColor: mainBlue500,
        borderRadius: 8,
      },
      '& .ql-picker.ql-expanded .ql-picker-label': {
        borderColor: 'transparent',
      },
      '& .ql-color-picker': {
        'backgroundColor': mainBlue300,
        'borderRadius': 8,
        '& polyline': {
          stroke: mainBlue900,
        },
        '& .ql-stroke:last-child': {
          stroke: mainBlue900,
        },
      },
      '& .ql-color-picker.ql-expanded': {
        '& .ql-stroke:last-child': {
          stroke: '#ccc',
        },
      },
    },
    '& .ql-editor.ql-blank::before': {
      left: 16,
      top: 15,
      color: monoGrey,
      fontStyle: 'normal',
    },
    '& .ql-editor': {
      'wordBreak': 'break-all',
      'padding': '24px',
      '& ul': {
        paddingLeft: 0,
      },
      '& ol': {
        paddingLeft: 0,
      },
      '&::-webkit-scrollbar': {
        width: 5,
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: monoLightGrey1,
        borderRadius: 20,
      },
      '&::-webkit-scrollbar-track': {
        marginTop: 7,
        marginBottom: 7,
      },
      [theme.breakpoints.down('md')]: {
        padding: theme.spacing(2),
      },
    },
    '& .ql-toolbar.ql-snow .ql-formats': {
      marginRight: 0,
    },
    '& .ql-toolbar.ql-snow': {
      borderRadius: '12px 12px 0px 0px',
      border: !isValid && helperText !== '' ? '1px solid red' : `1px solid ${monoLightGrey2}`,
      borderBottom: 'none',
      padding: '13px 10px 0px 14px',
    },
    '& .ql-container.ql-snow': {
      border: !isValid && helperText !== '' ? '1px solid red' : `1px solid ${monoLightGrey2}`,
      borderRadius: '0px 0px 12px 12px',
      overflow: 'hidden',
      [theme.breakpoints.down('md')]: {
        '& span': {
          fontSize: theme.typography.pxToRem(12),
          lineHeight: '115%',
        },
        '& p': {
          fontSize: theme.typography.pxToRem(16),
          lineHeight: '115%',
          marginBottom: theme.spacing(0.5),
        },
      },
    },
    '& .ql-container': {
      height: 300,
      fontFamily: 'Raleway',
    },
    '& .ql-tooltip': {
      left: '0 !important',
    },
    '& .ql-container .ql-editor': {
      fontWeight: 500,
      fontSize: '1rem',
      padding: theme.spacing(2),
    },
  },
}));

type FormValueString = {
  value: string;
  isValid: boolean;
  message: string;
};

type Props = {
  value: string;
  onChange: (result: FormValueString) => void;
  onFocus: () => void;
  onBlur: () => void;
  isValid: boolean;
  helperText: string;
  maxLength?: number;
  name?: string;
};

const TextEditor: FC<Props> = ({ onChange, isValid, maxLength = 2000, helperText, value, ...other }) => {
  const { classes } = useStyles({ isValid, helperText });
  const quillRef = useRef();

  useEffect(() => {
    const init = (quill) => {
      // console.log(quill);
    };
    const check = () => {
      if (quillRef.current) {
        init(quillRef.current);
        return;
      }
      setTimeout(check, 200);
    };
    check();
  }, [quillRef]);

  const handleChange = (value: string, delta: any, source: any) => {
    let result = {
      value,
      isValid: true,
      message: '',
      code: '',
      extra: {},
    };

    if (quillRef?.current?.editor.getLength() - 1 > maxLength) {
      result = {
        ...result,
        ...{
          isValid: false,
          message: `Количество вводимых символов не должно превышать ${maxLength}`,
          code: 'MAX_STRING',
          extra: { maxLength },
        },
      };
    }

    if (quillRef?.current?.editor.getLength() - 1 === 0) {
      result = {
        ...result,
        ...{
          isValid: false,
          message: `Поле обязательно для заполнения`,
          code: 'required',
        },
      };
    }

    if (source === 'user') {
      if (onChange) {
        onChange(result);
      }
    }
  };

  return (
    <FormControl fullWidth error={!isValid} sx={{ opacity: other.readOnly ? 0.5 : 1 }}>
      <ReactQuill
        forwardedRef={quillRef}
        className={classes.quillContainer}
        placeholder="Напишите что-нибудь..."
        modules={{
          clipboard: { matchVisual: false },
          toolbar: [
            ['bold', 'italic'],
            [{ list: 'ordered' }, { list: 'bullet' }],
          ],
        }}
        formats={['bold', 'italic', 'list', 'bullet']}
        onChange={handleChange}
        value={value}
        bounds={`[data-text-editor="name"]`}
        {...other}
      />
      {!isValid && (
        <FormHelperText sx={{ color: monoGrey, fontSize: 12, mt: 0, ml: 0, lineHeight: '20px !important', height: 20 }}>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default TextEditor;
