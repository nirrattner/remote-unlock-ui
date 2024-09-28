import { useRef } from 'react';
import { Select } from '@radix-ui/themes';

const useSelectInteractionFix = (selectors: string) => {
  const timeoutRef = useRef<number | undefined>();
  const root = document.querySelector<HTMLElement>(selectors);

  if (!root) {
    throw new Error("Root was not found");
  }

  const disableClicks = () => {
    root.style.setProperty("pointer-events", "none");
  };

  const enableClicks = () => {
    root.style.removeProperty("pointer-events");
    // or root.removeAttribute("style") to remove empty attribute.
  };

  const openChangeHandler = (open: boolean) => {
    if (open) {
      clearTimeout(timeoutRef.current);
      disableClicks();
    } else {
      // Casting it here because Node is returning `Timeout` and this handler will run in the browser.
      timeoutRef.current = setTimeout(enableClicks, 50) as unknown as number;
    }
  };

  return openChangeHandler;
};

const FixedSelect: React.FC<React.PropsWithChildren<any>> = ({
  children,
  ...props
}) => {

  return (
    <Select.Root
      onOpenChange={useSelectInteractionFix('#root')}
      {...props}
    >
      {children}
    </Select.Root>
  );
};

export default FixedSelect;

