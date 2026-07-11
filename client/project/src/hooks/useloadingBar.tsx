import { useLoadingBar } from "react-top-loading-bar"

export function useLoadingBarHook() {
    const { start, complete } = useLoadingBar({
        color: '#f87171',
        height: 3
    })

    return { start, complete }
}