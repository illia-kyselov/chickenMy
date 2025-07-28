import React from 'react';
import {
    View,
    Image,
    StyleSheet,
    Dimensions,
    SafeAreaView,
    Text,
    TouchableOpacity,
    ScrollView, // Імпортуємо ScrollView
} from 'react-native';
import MonitorTheSVG from '../../assets/svg/MonitorTheSVG';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const SecondScreen = () => {
    const navigation = useNavigation();

    const handleStartNow = () => {
        navigation.navigate('MainScreen');
    };

    return (
        <SafeAreaView style={styles.container}>
            <Image
                source={require('../../assets/BGimg.jpg')}
                style={styles.background}
                resizeMode="cover"
            />

            {/* Додаємо ScrollView */}
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.svgWrapper}>
                    <MonitorTheSVG width={358} height={102} />
                </View>

                <View style={styles.imageContainer}>
                    <Image
                        source={require('../../assets/pictures/ChickenIcon.png')}
                        style={styles.chickenIcon}
                        resizeMode="contain"
                    />
                </View>

                <View style={styles.infoBox}>
                    <Text style={styles.infoText}>
                        Get reminders of important actions and keep statistics on eggs
                    </Text>
                </View>

                {/* Кнопка START NOW */}
                <TouchableOpacity style={styles.startButton} onPress={handleStartNow}>
                    <Text style={styles.startButtonText}>START NOW</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        justifyContent: 'flex-start',
    },
    background: {
        position: 'absolute',
        width,
        height,
        top: 0,
        left: 0,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    svgWrapper: {
        alignItems: 'flex-start',
        paddingHorizontal: 21,
    },
    imageContainer: {
        alignItems: 'center',
    },
    chickenIcon: {
        width: 358,
        height: 365,
    },
    infoBox: {
        marginTop: 0,
        width: 358,
        height: 110,
        backgroundColor: '#FFC108',
        borderRadius: 30,
        paddingVertical: 12,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    infoText: {
        fontFamily: 'Moderustic-SemiBold',
        fontSize: 22,
        lineHeight: 28,
        color: '#A55238',
        letterSpacing: -0.41,
        textAlign: 'center',
    },
    startButton: {
        marginTop: 20,
        width: 358,
        height: 49,
        backgroundColor: '#FFC108',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        paddingHorizontal: 16,
    },
    startButtonText: {
        fontFamily: 'Moderustic-SemiBold',
        fontSize: 24,
        lineHeight: 24,
        letterSpacing: -0.41,
        textAlign: 'center',
        color: '#5E2D1D',
    },
});

export default SecondScreen;
