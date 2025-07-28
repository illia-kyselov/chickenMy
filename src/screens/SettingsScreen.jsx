import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ImageBackground,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { setNotificationsEnabled } from '../store/remindersSlice';

import BGimg from '../../assets/BGimg.jpg';
import TouchBar from '../components/TouchBar';
import SettingsSVG from '../../assets/svg/SettingsSVG';
import SwitchGreenSVG from '../../assets/svg/SwitchGreenSVG';
import SwitchRedSVG from '../../assets/svg/SwitchRedSVG';

import notifee, {
    AndroidImportance,
    RepeatFrequency,
    TriggerType,
} from '@notifee/react-native';

const SettingsScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const notificationsEnabled = useSelector(state => state.reminders.notificationsEnabled);
    const reminders = useSelector(state => state.reminders.items);

    const recreateNotification = async (reminder) => {
        const { title, time, repeat } = reminder;

        await notifee.createChannel({
            id: 'default',
            name: 'Default Channel',
            importance: AndroidImportance.HIGH,
            sound: 'default',
            vibration: true,
        });

        const trigger = {
            type: TriggerType.TIMESTAMP,
            timestamp: new Date(time).getTime(),
            alarmManager: true,
            ...(repeat === 'Repeat daily' && { repeatFrequency: RepeatFrequency.DAILY }),
            ...(repeat === 'Repeat weekly' && { repeatFrequency: RepeatFrequency.WEEKLY }),
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
    };

    const toggleNotifications = async () => {
        const newValue = !notificationsEnabled;
        dispatch(setNotificationsEnabled(newValue));

        const allReminders = Object.values(reminders).flat();

        if (!newValue) {
            const ids = allReminders.map(r => r.notificationId).filter(Boolean);
            for (const id of ids) {
                await notifee.cancelNotification(id);
            }
            console.log('🔕 Notifications disabled');
        } else {
            for (const r of allReminders) {
                await recreateNotification(r);
            }
            console.log('🔔 Notifications restored');
        }
    };

    return (
        <ImageBackground source={BGimg} style={styles.background} resizeMode="cover">
            <View style={styles.headerWrapper}>
                <SettingsSVG width={358} height={34} />
            </View>

            {/* Notifications row */}
            <View style={styles.notificationsRow}>
                <Text style={styles.settingText}>Notifications</Text>
                <TouchableOpacity onPress={toggleNotifications}>
                    {notificationsEnabled ? <SwitchGreenSVG /> : <SwitchRedSVG />}
                </TouchableOpacity>
            </View>

            {/* Centered setting items */}
            <View style={styles.listWrapper}>
                <TouchableOpacity onPress={() => navigation.navigate('UnitsScreen')}>
                    <Text style={styles.settingText}>Units of measurement</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('DateFormatScreen')}>
                    <Text style={styles.settingText}>Date format</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text style={styles.settingText}>Data backup</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text style={styles.settingText}>Privacy Policy</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text style={styles.settingText}>About the Developer</Text>
                </TouchableOpacity>
            </View>

            <TouchBar activeIndex={4} />
        </ImageBackground>
    );
};

export default SettingsScreen;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'flex-start',
        padding: 16,
    },
    headerWrapper: {
        alignItems: 'center',
        marginTop: 58,
        marginBottom: 24,
    },
    notificationsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        paddingHorizontal: 66,
    },
    listWrapper: {
        gap: 16,
        alignItems: 'center',
    },
    settingText: {
        fontFamily: 'Moderustic-Regular',
        fontSize: 24,
        lineHeight: 24,
        letterSpacing: -0.41,
        textAlign: 'center',
        color: '#5E2D1D',
    },
});
