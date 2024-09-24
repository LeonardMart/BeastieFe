import { useEffect, useRef } from 'react';
import { TextInput } from 'react-native';

export function useFocusRef(isSelected: boolean) {
    const ref = useRef<TextInput>(null);

    useEffect(() => {
        if (!isSelected || !ref.current) return;

        const focusTimeout = setTimeout(() => {
            ref.current?.focus();
        }, 100); // Delay to ensure ref is properly set

        return () => clearTimeout(focusTimeout);
    }, [isSelected]);

    return ref;
}
