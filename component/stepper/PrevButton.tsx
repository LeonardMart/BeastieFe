import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
// import ArrowLeftIcon from 'your-arrow-left-icon'; // Replace 'your-arrow-left-icon' with the appropriate icon component

interface Props {
    onClick: () => void;
}

const PrevButton = ({ onClick }: Props) => {
    const handleClick = () => {
        onClick();
    };

    return (
        <TouchableOpacity
            onPress={handleClick}
            style={styles.button}
        >
            <View>haha</View>
            {/* <ArrowLeftIcon style={styles.icon} /> */}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 8,
    },
    icon: {
        width: 20,
        height: 20,
        color: '#808080',
    },
});

export default PrevButton;
