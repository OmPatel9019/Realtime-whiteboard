import { Canvas } from "./_components/canvas";
import { Room } from "@/components/room";
import { Loading } from "./_components/canvas-laodind";

interface BoardIdPageProps {
    params: Promise<{
        boardId: string;
    }>;
};

const BoardIdPage = async ({ params }: BoardIdPageProps) => {
    const resolvedParams = await params;
    
    return (
        <Room roomId={resolvedParams.boardId} fallback={<Loading />}>
            <Canvas boardId={resolvedParams.boardId} />
        </Room>
    );
};

export default BoardIdPage;
