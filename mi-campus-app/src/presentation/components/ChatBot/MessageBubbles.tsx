import { MarkdownRenderer } from "./MarkdownRenderer";

interface MessageProps {
    text: string;
    isMarkdown?: boolean;
}

export const UserMessage = ({ text }: MessageProps) => {
    return (
        <div className="flex justify-end mb-4 p-2">
            <div className="bg-blue-600 text-white px-4 py-2 rounded-lg max-w-[85%]">
                {text}
            </div>
        </div>
    );
};

export const BotMessage = ({ text, isMarkdown = false }: MessageProps) => {
    return (
        <div className="flex justify-start mb-4">
            <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg max-w-[85%]">
                {isMarkdown ? (
                    <MarkdownRenderer text={text} />
                ) : (
                    <p className="whitespace-pre-wrap">{text}</p>
                )}
            </div>
        </div>
    );
};