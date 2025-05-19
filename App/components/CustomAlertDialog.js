import React from 'react';
import { AlertDialog, Button } from 'native-base';

const CustomAlertDialog = ({
  title = '',
  isOpen = false,
  onClose,
  body = '',
  buttons = [
    {
      label: 'Close',
      onPress: onClose,
      colorScheme: 'blue',
      variant: 'primary'
    }
  ]
}) => {
  return (
    <AlertDialog isOpen={isOpen} onClose={onClose}>
      <AlertDialog.Content>
        <AlertDialog.CloseButton />
        <AlertDialog.Header>{title}</AlertDialog.Header>
        <AlertDialog.Body>{body}</AlertDialog.Body>
        <AlertDialog.Footer>
          <Button.Group space={2}>
            {buttons.map(({ label, ...restProps }, i) => (
              <Button key={i + label} {...restProps}>
                {label}
              </Button>
            ))}
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
};

export default CustomAlertDialog;
