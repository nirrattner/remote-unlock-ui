import { Callout } from '@radix-ui/themes';
import { InfoCircledIcon } from '@radix-ui/react-icons'

export default function ErrorCallout({ errorMessage }: { errorMessage: string}) {
  if (errorMessage === '') {
    return null;
  }

  return (
    <>
      <Callout.Root color="red">
        <Callout.Icon>
          <InfoCircledIcon />
        </Callout.Icon>
        <Callout.Text>
          {errorMessage}
        </Callout.Text>
      </Callout.Root>
    </>
  );
}
