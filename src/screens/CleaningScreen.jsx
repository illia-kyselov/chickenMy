import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ImageBackground,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import ArrowArcLeftSVG from '../../assets/svg/ArrowArcLeftSVG';

const CleaningScreen = () => {
    const navigation = useNavigation();
    const [isPressed, setIsPressed] = useState(false);

    const reminders = useSelector((state) => state.reminders.items.cleaning || []);

    const handleAddPress = () => {
        setIsPressed(true);
        setTimeout(() => {
            setIsPressed(false);
            navigation.navigate('NewReminderScreen', { category: 'cleaning' });
        }, 200);
    };

    return (
        <ImageBackground
            source={require('../../assets/BGimg.jpg')}
            style={styles.background}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.container}>
                {/* Заголовок з кнопкою назад */}
                <View style={styles.headerWrapper}>
                    <View style={styles.leftBlock}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={styles.backButton}
                            activeOpacity={0.8}
                        >
                            <ArrowArcLeftSVG width={45} height={45} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.centerBlock}>
                        <Text style={styles.title}>Cleaning the chicken coop</Text>
                    </View>

                    <View style={styles.rightBlock} />
                </View>

                {/* Список нагадувань */}
                <View style={styles.listWrapper}>
                    {reminders.length === 0 ? (
                        <Text style={styles.emptyText}>No reminders yet</Text>
                    ) : (
                        reminders.map((reminder, index) => {
                            const formattedTime = new Date(reminder.time).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                            });

                            return (
                                <View key={index} style={styles.reminderItem}>
                                    <Text style={styles.reminderText}>
                                        {reminder.title} – {reminder.day} at {formattedTime}
                                    </Text>
                                </View>
                            );
                        })
                    )}
                </View>

                {/* Add Button */}
                <View style={styles.buttonWrapper}>
                    <TouchableOpacity
                        style={[styles.addButton, isPressed && styles.addButtonActive]}
                        activeOpacity={0.8}
                        onPress={handleAddPress}
                    >
                        <Text
                            style={[
                                styles.addButtonText,
                                isPressed && styles.addButtonTextActive,
                            ]}
                        >
                            Add
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        paddingHorizontal: 16,
        justifyContent: 'space-between',
    },
    headerWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 26,
    },
    leftBlock: {
        width: 60,
        alignItems: 'flex-start',
    },
    backButton: {
        marginLeft: -15,
    },
    centerBlock: {
        flex: 1,
        alignItems: 'center',
    },
    rightBlock: {
        width: 60,
    },
    title: {
        fontSize: 32,
        fontFamily: 'Moderustic-Bold',
        color: '#5E2D1D',
        textAlign: 'center',
    },
    listWrapper: {
        marginTop: 40,
        alignItems: 'center',
        gap: 12,
    },
    reminderItem: {
        backgroundColor: '#FFFFFFB2',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 16,
        width: 340,
    },
    reminderText: {
        fontFamily: 'Exo2-Light',
        fontSize: 16,
        color: '#5E2D1D',
    },
    emptyText: {
        fontFamily: 'Exo2-Light',
        fontSize: 16,
        color: '#999999',
    },
    buttonWrapper: {
        alignItems: 'center',
        marginBottom: 40,
    },
    addButton: {
        width: 358,
        height: 49,
        borderRadius: 30,
        backgroundColor: '#FFC108',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    addButtonActive: {
        backgroundColor: '#5E2D1D',
    },
    addButtonText: {
        fontFamily: 'Moderustic-SemiBold',
        fontSize: 24,
        lineHeight: 24,
        fontWeight: '600',
        letterSpacing: -0.41,
        color: '#5E2D1D',
        textAlign: 'center',
    },
    addButtonTextActive: {
        color: '#FFC108',
    },
});

export default CleaningScreen;
