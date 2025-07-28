import React, { useEffect, useState } from 'react';
import { LogBox, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import notifee, { AndroidImportance } from '@notifee/react-native';

import AppNavigator from './src/navigation/AppNavigator';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store/store';

const STORAGE_FLAG = 'hasClearedOnce';

const ClearStorageOnce = ({ onDone }) => {
    useEffect(() => {
        const clearIfNeeded = async () => {
            const alreadyCleared = await AsyncStorage.getItem(STORAGE_FLAG);
            if (!alreadyCleared) {
                await AsyncStorage.clear();
                await AsyncStorage.setItem(STORAGE_FLAG, 'true');
                console.log('✅ AsyncStorage очищено один раз');
            } else {
                console.log('ℹ️ Очистка вже виконувалась раніше');
            }
            onDone();
        };

        clearIfNeeded();
    }, []);

    return null;
};

const App = () => {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);
    }, []);

    useEffect(() => {
        const setupNotifee = async () => {
            await notifee.requestPermission();

            if (Platform.OS === 'android') {
                await notifee.createChannel({
                    id: 'default',
                    name: 'Default Channel',
                    importance: AndroidImportance.HIGH,
                    sound: 'default',
                    vibration: true,
                });
            }
        };

        setupNotifee();
    }, []);

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {!ready ? (
                    <ClearStorageOnce onDone={() => setReady(true)} />
                ) : (
                    <AppNavigator />
                )}
            </PersistGate>
        </Provider>
    );
};

export default App;
