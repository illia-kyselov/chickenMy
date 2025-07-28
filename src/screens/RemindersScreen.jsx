import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ImageBackground,
    View,
    TouchableOpacity,
    Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import TouchBar from '../components/TouchBar';
import RemindersSVG from '../../assets/svg/RemindersSVG';
import ChickenSVG from '../../assets/svg/ChickenSVG';

const RemindersScreen = () => {
    const navigation = useNavigation();

    return (
        <ImageBackground
            source={require('../../assets/BGimg.jpg')}
            style={styles.background}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.container}>
                {/* Заголовок */}
                <View style={styles.header}>
                    <RemindersSVG width={240} height={34} />
                </View>

                {/* Категорії */}
                <View style={styles.listWrapper}>
                    <TouchableOpacity onPress={() => navigation.navigate('FeedingScreen')}>
                        <Text style={styles.categoryText}>Feeding</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('CleaningScreen')}>
                        <Text style={styles.categoryText}>Cleaning the chicken coop</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('HealthScreen')}>
                        <Text style={styles.categoryText}>Vaccinations and health</Text>
                    </TouchableOpacity>
                </View>

                {/* Балончик із текстом */}
                <View style={styles.speechBubble}>
                    <Text style={styles.speechText}>
                        Rather, set a reminder{'\n'}so that you don't forget anything.
                    </Text>
                </View>

                {/* Курка поверх TouchBar */}
                <View style={styles.chickenWrapper}>
                    <ChickenSVG width={160} height={160} />
                </View>

                {/* Тачбар */}
                <TouchBar activeIndex={2} />
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
    },
    header: {
        alignItems: 'center',
    },
    listWrapper: {
        marginTop: 30,
        alignItems: 'center',
        gap: 20,
    },
    categoryText: {
        fontFamily: 'Moderustic-Regular',
        fontSize: 24,
        lineHeight: 28,
        letterSpacing: -0.41,
        color: '#5E2D1D',
        textAlign: 'center',
    },
    speechBubble: {
        width: 212,
        height: 74,
        borderRadius: 30,
        backgroundColor: '#FFC10899',
        borderColor: '#5E2D1D',
        borderWidth: 1,
        paddingVertical: 4,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginTop: 320,
        marginRight: -10,
        zIndex: 12,
    },
    speechText: {
        fontFamily: 'Moderustic-Regular',
        fontSize: 18,
        lineHeight: 21,
        letterSpacing: -0.41,
        color: '#5E2D1D',
        textAlign: 'center',
    },
    chickenWrapper: {
        position: 'absolute',
        bottom: 80,
        alignSelf: 'center',
        zIndex: 11,
        marginLeft: -170,
    },
});

export default RemindersScreen;
