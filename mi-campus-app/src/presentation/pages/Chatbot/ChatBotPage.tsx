import { useFormik } from "formik";
import { useGemini } from "../../hooks/useChatBot";
import type { ChatBotPrompt } from "../../../core/models/chatbot.model";
import { ChatLoader } from "../../components/shared/Loader";
import { BotMessage, UserMessage } from "../../components/ChatBot/MessageBubbles";
import { useState } from "react";
import { Send, Bot } from "lucide-react";

interface ChatMessage {
    text: string;
    sender: 'user' | 'bot';
    isMarkdown?: boolean;
}

export const GeminiChatbot = () => {
    const { chatResponse } = useGemini();
    const [messages, setMessages] = useState<ChatMessage[]>([]);

    const formik = useFormik<ChatBotPrompt>({
        initialValues: { prompt: "" },
        onSubmit: async (values, { resetForm }) => {
            setMessages(prev => [...prev, { text: values.prompt, sender: "user" }]);
            resetForm();

            try {
                const response = await chatResponse.mutateAsync(values);

                if (response.status && response.data) {
                    setMessages(prev => [...prev, {
                        text: response.data?.response || "No response found",
                        sender: "bot",
                        isMarkdown: true
                    }]);
                } else {
                    setMessages(prev => [...prev, {
                        text: response.message || "Error en la respuesta",
                        sender: "bot"
                    }]);
                }
            } catch (error) {
                setMessages(prev => [...prev, {
                    text: "Error al conectar con el servidor",
                    sender: "bot"
                }]);
            }
        },
    });

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)] bg-gray-50">
            {/* Header - Azul UNAH exacto */}
            <div className="bg-[#005baa] px-6 py-4 text-white shadow-sm">
                <div className="container mx-auto">
                    <div className="flex items-center gap-3">
                        <Bot className="h-6 w-6 text-white" />
                        <div>
                            <h1 className="text-xl font-semibold">PumindAI</h1>
                            <p className="text-blue-100 text-sm">Asistente Virtual de Mi Campus UNAH</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Área de mensajes con márgenes laterales */}
            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
                {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center text-gray-600 px-4">
                        <Bot className="h-12 w-12 mb-4 text-[#005baa]" />
                        <h2 className="text-xl font-medium mb-2">Asistente Virtual</h2>
                        <p className="text-sm max-w-md">Escribe tu pregunta sobre trámites, horarios o cualquier tema universitario</p>
                    </div>
                ) : (
                    <div className="container mx-auto max-w-4xl">
                        {messages.map((message, index) => (
                            message.sender === "user" ? (
                                <UserMessage key={index} text={message.text} />
                            ) : (
                                <BotMessage
                                    key={index}
                                    text={message.text}
                                    isMarkdown={message.isMarkdown}
                                />
                            )
                        ))}
                    </div>
                )}
                {chatResponse.isPending && <ChatLoader />}
            </div>

            {/* Área de input - Corregido el botón */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 py-3">
                <form onSubmit={formik.handleSubmit} className="container mx-auto max-w-4xl">
                    <div className="flex">
                        <input
                            type="text"
                            name="prompt"
                            value={formik.values.prompt}
                            onChange={formik.handleChange}
                            disabled={chatResponse.isPending}
                            placeholder="Escribe tu mensaje..."
                            className="w-full px-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005baa] focus:border-transparent disabled:bg-gray-100"
                            autoFocus
                        />
                        <button
                            type="submit"
                            disabled={chatResponse.isPending || !formik.values.prompt.trim()}
                            className="p-4 hover: bg-amber-400"
                        >
                            Enviar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};