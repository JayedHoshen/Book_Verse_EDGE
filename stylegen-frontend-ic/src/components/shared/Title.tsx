
type TitleProps = {
    text: string
}


const Title = ({ text }: TitleProps) => {
    return (
        <h1 className="text-2xl sm:text-4xl font-bold my-6 text-center">
            {text}
        </h1>
    )
}

export default Title