import {useSelf, useMutation} from "@liveblocks/react/suspense";

export const useDeleteLayers = () => {
    const selection = useSelf((me) => me.presence.selection);

    return useMutation(( 
        {storage, setMyPresence}
    ) => {
        const liveLayers = storage.get("layers");
        const liveLayerIds = storage.get("layerIds");

        for(const id of selection
            
        )
    }, [selection]);
};