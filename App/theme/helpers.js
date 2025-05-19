import { themeTools } from 'native-base';

const disabledTextColor = (props) =>
  themeTools.mode(`muted.500`, `muted.300`)(props);

export function variantPrimary(props) {
  const { colorScheme: c } = props;
  if (c === 'muted') {
    return {
      _text: {
        color: disabledTextColor(props)
      }
    };
  }
  return {
    _text: {
      padding: 1,
      fontSize: 20,
      color: props.isDisabled
        ? disabledTextColor(props)
        : themeTools.mode(`#FFF`, `${c}.300`)(props)
    },
    _web: {
      outlineWidth: '0'
    },
    bg: themeTools.mode('app.primary', `${c}.200`)(props),
    _hover: {
      borderColor: themeTools.mode(`app.primary`, `${c}.200`)(props),
      bg: themeTools.transparentize(
        themeTools.mode(`app.primary`, `${c}.400`)(props),
        0.5
      )(props.theme)
    },
    _focusVisible: {
      borderColor: themeTools.mode(`app.primary`, `${c}.200`)(props),
      bg: themeTools.transparentize(
        themeTools.mode(`app.primary`, `${c}.400`)(props),
        0.5
      )(props.theme)
    },
    _pressed: {
      borderColor: themeTools.mode(`app.primary`, `${c}.200`)(props),
      bg: themeTools.transparentize(
        themeTools.mode(`app.primary`, `${c}.500`)(props),
        0.5
      )(props.theme)
    },
    _spinner: {
      size: 'sm'
    }
  };
}

export function variantLink(props) {
  const { colorScheme: c } = props;

  return {
    ...variantPrimary(props),
    bg: 'transparent',
    _text: {
      color:
        c === 'muted'
          ? themeTools.mode(`muted.800`, `${c}.200`)(props)
          : props.isDisabled
          ? disabledTextColor(props)
          : themeTools.mode(`app.primary`, `${c}.300`)(props)
    },
    _hover: {
      _text: {
        color: themeTools.transparentize(
          themeTools.mode(`app.primary`, `${c}.400`)(props),
          0.5
        )(props.theme)
      }
    },
    _focusVisible: {
      _text: {
        color: themeTools.transparentize(
          themeTools.mode(`app.primary`, `${c}.400`)(props),
          0.5
        )(props.theme)
      }
    },
    _pressed: {
      _text: {
        color: themeTools.transparentize(
          themeTools.mode(`app.primary`, `${c}.400`)(props),
          0.5
        )(props.theme)
      }
    }
  };
}
