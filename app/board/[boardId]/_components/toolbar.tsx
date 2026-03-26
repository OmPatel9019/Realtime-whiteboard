export const Toolbar = () => {
    return (
        <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4">
            <div className="bg-white font-medium rounded-md p-1.5 flex flex-col shadow-md">
                <div>Pencil</div>
                <div>Eraser</div>
                <div>Square</div>
                <div>Circle</div>
                <div>Ellipsis</div>
            </div>
            <div className="bg-white font-medium rounded-md p-1.5 flex flex-col shadow-md">
                <div>Undo</div>
                <div>Redo</div>
            </div>
        </div>
    );
};