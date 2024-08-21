interface HeadingProps {
    heading: string;
}

const Heading: React.FC<HeadingProps> = ({heading}) => {
    return (
        <h1 className="text-4xl text-slate-800 font-normal">{heading}</h1>
    )
}

export default Heading;