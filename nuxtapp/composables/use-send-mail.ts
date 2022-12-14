import { merge } from "@/utils";

interface ISendMailResponse { 
  messageId: string | undefined; 
};

export const useSendMail = () => {
  const { SEND_MAIL_ENDPOINT, MAIL_CONFIG: CONFIG } = useAppConfig();
  const sendMail = async ({
    message = {},
    template = "text-message",
    locals = {},
    config = {}
  }) => {
    let messageId;
    try {
      const options = merge({}, CONFIG, config);
      const res: ISendMailResponse = 
        await $fetch(`${SEND_MAIL_ENDPOINT}/${template}`, {
        method: "post",
        body: {
          ...message,
          ...locals,
        },
        headers: options.http.headers
      });
      messageId = res.messageId;
    } catch (error) {
      console.error(error);
    }

    return { messageId };
  };

  return { sendMail };
};
