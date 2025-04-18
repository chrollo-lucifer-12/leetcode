interface TaskProps {
    description: string
}

const Task = ({ description }: TaskProps) => {
    return (
        <div className="prose prose-invert max-w-none h-[500px]">
            <div className="text-gray-200 leading-relaxed">
                {description}
            </div>
        </div>
    );
}

export default Task;