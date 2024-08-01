import { Message, useToaster } from "rsuite";

export function useMessage() {
  const toaster = useToaster();
  const message = (text) => (
    <Message showIcon type="info">
      {text}
    </Message>
  );
  const option = { placement: "topEnd", duration: 5000 };

  const goToPush = (messageText = "Что-то произошло!") => {
    toaster.push(message(messageText), option);
  };

  return { toaster, message, option, goToPush };
}
