import { createStyles, Theme } from '@material-ui/core/styles';

export const commonStyles = (theme: Theme) => {
  return createStyles({
    textField: {
      width: '100%',
      marginBottom: '20px !important',
      '& .MuiInputBase-root': {
        '&.Mui-focused': {
          boxShadow: 'none',
        },
      },
      '& .MuiOutlinedInput-notchedOutline': {
        borderRadius: '32px',
        borderWidth: '2px',
        borderColor: theme.palette.text.primary,
      },
      '@media (hover:none)': {
        '& .MuiOutlinedInput-root:hover': {
          '&:not(.Mui-focused):not(.Mui-error) .MuiOutlinedInput-notchedOutline':
          {
            borderColor: theme.palette.text.primary + ' !important',
          },
        },
      },
      '& label': {
        color: theme.palette.text.primary,
        transform: 'translate(16px, 18px) scale(1)',
        maxWidth: '90%',
        lineHeight: '1.3',
        '&.Mui-focused': {
          maxWidth: 'none',
          left: '3px',
        },
        '&.MuiInputLabel-shrink': {
          paddingLeft: 6,
          paddingRight: 8,
          background: theme.palette.background.default,
        },
      },
      '&:last-child': {
        marginBottom: '0',
      },
      '& .MuiInputBase-input::placeholder': {
        color: 'white',
        opacity: 0.8,
      },
      '& input:-webkit-autofill': {
        transition: 'all 0s 2147483647s',
      },
    },
  });
};
