import { useEffect, useRef, useState } from "react";
import { PanResponder, View, PanResponderGestureState } from "react-native";

interface Position {
    x: number;
    y: number;
}

export function useDragging(_x: number, _y: number, parentSizeX: number, parentSizeY: number) {
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [pos, setPos] = useState<Position>({ x: _x, y: _y });
    const ref = useRef<View>(null);

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                setIsDragging(true);
            },
            onPanResponderMove: (_event, gestureState: PanResponderGestureState) => {
                if (isDragging) {
                    setPos({
                        x: pos.x + gestureState.dx,
                        y: pos.y + gestureState.dy
                    });
                }
            },
            onPanResponderRelease: () => {
                setIsDragging(false);
            }
        })
    ).current;

    useEffect(() => {
        const node = ref.current;

        if (node) {
            node.setNativeProps({
                ...panResponder.panHandlers
            });
        }

        return () => {
            // Cleanup
        };
    }, [panResponder, ref.current]);

    return { ref, x: pos.x, y: pos.y, isDragging, setPos };
}
