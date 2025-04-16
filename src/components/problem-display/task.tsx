
interface TaskProps {
    description : string
}

const Task = ({description} : TaskProps) => {
    return <div>
        <p className={"text-white"}>
            {description}
        </p>
    </div>
}

export default Task