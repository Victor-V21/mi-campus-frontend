interface Props {
    text: string;
    className?: string;
}

export const Title = ({ text, className = "" }: Props) => {
    return (
        <div className={`mb-4 ${className}`}>
            <h1 className="text-3xl font-LexendDeca-Bold text-unah-blue">
                {text}
            </h1>
            <hr className="my-4 border-top border-blue-400" />
        </div>
    )
}