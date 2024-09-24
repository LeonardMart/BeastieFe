import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface Props {
    disabled?: boolean;
    children: React.ReactNode;
    loading?: boolean;
    onClick: () => void;
}

const NextButton = ({
    disabled = false,
    children,
    loading = false,
    onClick,
}: Props) => {
    const handleClick = () => {
        if (!disabled && !loading) onClick();
    };

    return (
        <TouchableOpacity
            onPress={handleClick}
            disabled={disabled || loading}
            style={[
                styles.button,
                { backgroundColor: disabled ? '#CCCCCC' : '#007bff' },
                { opacity: loading ? 0.5 : 1 },
            ]}
        >
            <Text style={styles.buttonText}>
                {loading ? 'Please wait...' : children}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        width: '100%',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default NextButton;
