import { extendTheme } from 'native-base';
import { variantLink, variantPrimary } from './helpers';

const theme = extendTheme({
  colors: {
    app: {
      primary: '#007AFF',
      text: '#202020',
      subText: 'rgba(32, 32, 32, 0.5)',
      placeholder: 'rgba(32, 32, 32, 0.5)',
      border: '#DDDDDD'
    }
  },
  components: {
    Input: {
      baseStyle: {
        borderRadius: 8,
        paddingRight: 5,
        paddingLeft: 4,
        borderColor: 'app.border',
        _focus: {
          borderColor: 'app.primary'
        }
      }
    },
    Button: {
      baseStyle: {
        borderRadius: 8
      },
      defaultProps: {},
      variants: {
        primary: variantPrimary,
        'link-btn': variantLink
      },
      sizes: {
        large: {
          px: '5',
          py: '2',
          _text: {
            fontSize: 'lg'
          }
        },
        noPadding: {
          _text: {
            fontSize: 'md'
          }
        }
      }
    }
  }
});

export { theme };
