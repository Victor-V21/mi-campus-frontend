interface Props {
text: string;
}

export const Title = ({text} : Props) => {
return (
    <div>
    <h1 className="text-3xl font-LexendDeca-Bold text-blue-400">
        {text}
    </h1>
    <hr className="my-4 border-blue-400" />
    </div>
)
}
