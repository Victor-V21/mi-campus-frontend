import { useMutation } from "@tanstack/react-query"
import type { ChatBotPrompt } from "../../core/models/chatbot.model"
import { chatPrompt } from "../../core/actions/chatBot/chatbot.prompt.action"

export const useGemini = () => {

    const chatResponse = useMutation
        (
            {
                mutationFn: (prompt: ChatBotPrompt) => chatPrompt(prompt),
                onError: (data) => {
                    console.log(data);
                }
            }
        )

    return {
        chatResponse

        //Methods
    }
}
