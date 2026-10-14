import { ReactNode } from 'react';

import {
  Arrow,
  Content,
  PopoverContentProps,
  Portal,
  Root,
  Trigger,
} from '@radix-ui/react-popover';

interface IPopover extends PopoverContentProps {
  children: ReactNode;
  trigger: ReactNode;
}

const Popover = ({ children, trigger, className, ...props }: IPopover) => {
  return (
    <Root>
      <Trigger asChild>{trigger}</Trigger>
      <Portal>
        <Content {...props} className={`z-50 ${className}`}>
          {children}
          <Arrow />
        </Content>
      </Portal>
    </Root>
  );
};

export default Popover;
