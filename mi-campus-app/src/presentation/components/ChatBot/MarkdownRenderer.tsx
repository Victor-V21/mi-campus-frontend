
export const MarkdownRenderer = ({ text }: { text: string }) => {
    const renderMarkdown = (content: string) => {
        // Convertir **texto** a <strong>
        content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        // Convertir *item de lista* a <li>
        const lines = content.split('\n');
        return lines.map((line, i) => {
            if (line.startsWith('* ')) {
                return <li key={i} className="ml-4 list-disc">{line.substring(2)}</li>;
            }
            return <p key={i} dangerouslySetInnerHTML={{ __html: line }} />;
        });
    };

    return <div className="markdown-content">{renderMarkdown(text)}</div>;
};