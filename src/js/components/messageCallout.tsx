import { Callout } from '@radix-ui/themes';
import { InfoCircledIcon } from '@radix-ui/react-icons'

type MessageCalloutProps = {
  color: "green" | "red",
  message: string,
}

export default function MessageCallout({ color, message }: MessageCalloutProps) {
  if (message === '') {
    return null;
  }

  return (
    <>
      <Callout.Root color={color}>
        <Callout.Icon>
          <InfoCircledIcon />
        </Callout.Icon>
        <Callout.Text>
          {message}
        </Callout.Text>
      </Callout.Root>
    </>
  );
}
