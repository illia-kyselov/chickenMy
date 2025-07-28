import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ImageBackground,
    View,
    TextInput,
    Text,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    Alert,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { addReminder } from '../store/remindersSlice';

import notifee, {
    TimestampTrigger,
    TriggerType,
    AndroidImportance,
    RepeatFrequency,
} from '@notifee/react-native';

import NewReminderSVG from '../../assets/svg/NewReminderSVG';
import ArrowDownSVG from '../../assets/svg/ArrowDownSVG';
import ArrowLeftLightSVG from '../../assets/svg/ArrowLeftLightSVG';
import ArrowArcLeftSVG from '../../assets/svg/ArrowArcLeftSVG';

const { width, height } = Dimensions.get('window');

const daysOptions = [
    'Daily',
    'Every Monday',
    'Every Tuesday',
    'Every Wednesday',
    'Every Thursday',
    'Every Friday',
    'Every Saturday',
    'Every Sunday',
];

const repeatOptions = ['No repeat', 'Repeat daily', 'Repeat weekly'];

const NewReminderScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch();

    const category = route.params?.category || 'feeding';

    const [title, setTitle] = useState('');
    const [selectedDay, setSelectedDay] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);

    const [selectedRepeat, setSelectedRepeat] = useState('No repeat');
    const [showRepeatDropdown, setShowRepeatDropdown] = useState(false);

    const [selectedTime, setSelectedTime] = useState(new Date());
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [savePressed, setSavePressed] = useState(false);

    const handleTimePress = () => {
        setShowTimePicker(!showTimePicker);
    };

    const handleSavePress = async () => {
        setSavePressed(true);

        const now = new Date();
        if (selectedTime <= now) {
            Alert.alert('⏰ Invalid Time', 'Please select a future time for the reminder.');
            setSavePressed(false);
            return;
        }

        dispatch(
            addReminder({
                category,
                reminder: {
                    title,
                    day: selectedDay,
                    time: selectedTime.toISOString(),
                    repeat: selectedRepeat,
                },
            })
        );

        await notifee.requestPermission();

        await notifee.createChannel({
            id: 'default',
            name: 'Default Channel',
            importance: AndroidImportance.HIGH,
            sound: 'default',
            vibration: true,
        });

        const trigger = {
            type: TriggerType.TIMESTAMP,
            timestamp: selectedTime.getTime(),
            alarmManager: true,
            ...(selectedRepeat === 'Repeat daily' && {
                repeatFrequency: RepeatFrequency.DAILY,
            }),
            ...(selectedRepeat === 'Repeat weekly' && {
                repeatFrequency: RepeatFrequency.WEEKLY,
            }),
        };

        await notifee.createTriggerNotification(
            {
                title: '🐔 Reminder',
                body: title || 'Reminder',
                android: {
                    channelId: 'default',
                    sound: 'default',
                    vibrationPattern: [300, 500],
                    pressAction: { id: 'default' },
                },
            },
            trigger
        );

        setTimeout(() => {
            setSavePressed(false);
            navigation.goBack();
        }, 300);
    };

    return (
        <ImageBackground
            source={require('../../assets/BGimg.jpg')}
            style={styles.background}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    {/* Header */}
                    <View style={styles.headerRow}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton} activeOpacity={0.8}>
                            <ArrowArcLeftSVG width={45} height={45} />
                        </TouchableOpacity>
                        <NewReminderSVG width={240} height={34} />
                    </View>

                    {/* Input */}
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.inputFull}
                            placeholder="Title"
                            placeholderTextColor="#5E2D1D"
                            value={title}
                            onChangeText={setTitle}
                        />
                    </View>

                    {/* Day dropdown */}
                    <View style={[styles.dropdownWrapper, showDropdown && styles.dropdownWrapperOpened]}>
                        <TouchableOpacity
                            style={styles.dropdownHeader}
                            onPress={() => setShowDropdown(!showDropdown)}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.dropdownText}>{selectedDay || 'Days'}</Text>
                            {showDropdown ? <ArrowLeftLightSVG width={24} height={24} /> : <ArrowDownSVG width={24} height={24} />}
                        </TouchableOpacity>

                        {showDropdown && (
                            <View style={styles.dropdownList}>
                                {daysOptions.map((day, idx) => (
                                    <TouchableOpacity
                                        key={idx}
                                        style={styles.dropdownItem}
                                        onPress={() => {
                                            setSelectedDay(day);
                                            setShowDropdown(false);
                                        }}
                                    >
                                        <Text style={styles.dropdownItemText}>{day}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>

                    {/* Repeat dropdown */}
                    <View style={[styles.dropdownWrapper, showRepeatDropdown && styles.dropdownWrapperOpened]}>
                        <TouchableOpacity
                            style={styles.dropdownHeader}
                            onPress={() => setShowRepeatDropdown(!showRepeatDropdown)}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.dropdownText}>{selectedRepeat}</Text>
                            {showRepeatDropdown ? (
                                <ArrowLeftLightSVG width={24} height={24} />
                            ) : (
                                <ArrowDownSVG width={24} height={24} />
                            )}
                        </TouchableOpacity>

                        {showRepeatDropdown && (
                            <View style={styles.dropdownList}>
                                {repeatOptions.map((option, idx) => (
                                    <TouchableOpacity
                                        key={idx}
                                        style={styles.dropdownItem}
                                        onPress={() => {
                                            setSelectedRepeat(option);
                                            setShowRepeatDropdown(false);
                                        }}
                                    >
                                        <Text style={styles.dropdownItemText}>{option}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>

                    {/* Time Picker */}
                    <View style={styles.inputWrapper}>
                        <TouchableOpacity
                            style={[styles.inputFull, showTimePicker && styles.inputFullActive]}
                            activeOpacity={0.8}
                            onPress={handleTimePress}
                        >
                            <Text style={[styles.timeText, showTimePicker && styles.timeTextActive]}>
                                {selectedTime.toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {showTimePicker && (
                        <View style={styles.pickerWrapper}>
                            <DatePicker
                                date={selectedTime}
                                onDateChange={setSelectedTime}
                                mode="time"
                                androidVariant="nativeAndroid"
                                textColor="#5E2D1D"
                                fadeToColor="transparent"
                            />
                        </View>
                    )}

                    {/* Save */}
                    <View style={styles.buttonWrapper}>
                        <TouchableOpacity
                            style={[styles.saveButton, savePressed && styles.saveButtonPressed]}
                            activeOpacity={0.8}
                            onPress={handleSavePress}
                        >
                            <Text style={[styles.saveButtonText, savePressed && styles.saveButtonTextPressed]}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: { flex: 1, width, height },
    container: { flex: 1, paddingHorizontal: 16 },
    scrollContent: { paddingBottom: 80 },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        gap: 20,
    },
    backButton: { marginRight: 10 },
    inputWrapper: { alignItems: 'center', marginTop: 25 },
    inputFull: {
        width: 358,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#5E2D1D',
        paddingVertical: 10,
        paddingHorizontal: 16,
        backgroundColor: '#FFFFFF4D',
        justifyContent: 'center',
    },
    inputFullActive: { backgroundColor: '#5E2D1D' },
    timeText: {
        fontFamily: 'Exo2-Light',
        fontSize: 18,
        lineHeight: 22,
        letterSpacing: -0.41,
        color: '#5E2D1D',
    },
    timeTextActive: { color: '#FFC108' },
    dropdownWrapper: {
        width: 358,
        alignSelf: 'center',
        marginTop: 15,
        backgroundColor: '#FFFFFFB2',
        borderRadius: 30,
        zIndex: 20,
    },
    dropdownWrapperOpened: {
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    dropdownHeader: {
        paddingHorizontal: 16,
        height: 48,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dropdownText: {
        fontFamily: 'Exo2-Light',
        fontSize: 16,
        lineHeight: 20,
        letterSpacing: -0.41,
        color: '#5E2D1D',
    },
    dropdownList: {
        backgroundColor: '#FFFFFFB2',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    dropdownItem: {
        paddingVertical: 10,
        paddingHorizontal: 16,
    },
    dropdownItemText: {
        fontFamily: 'Exo2-Light',
        fontSize: 16,
        lineHeight: 22,
        letterSpacing: -0.41,
        color: '#5E2D1D',
    },
    pickerWrapper: {
        width: 280,
        height: 214,
        alignSelf: 'center',
        backgroundColor: '#FFFFFFB2',
        borderRadius: 30,
        padding: 12,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonWrapper: {
        marginTop: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    saveButton: {
        width: 358,
        height: 49,
        backgroundColor: '#FFC108',
        borderRadius: 30,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 3,
    },
    saveButtonPressed: {
        backgroundColor: '#5E2D1D',
    },
    saveButtonText: {
        fontFamily: 'Moderustic-SemiBold',
        fontSize: 24,
        lineHeight: 24,
        letterSpacing: -0.41,
        color: '#5E2D1D',
        textAlign: 'center',
    },
    saveButtonTextPressed: {
        color: '#FFC108',
    },
});

export default NewReminderScreen;
