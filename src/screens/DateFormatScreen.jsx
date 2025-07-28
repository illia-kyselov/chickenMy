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

import BGimg from '../../assets/BGimg.jpg';
import ArrowArcLeftSVG from '../../assets/svg/ArrowArcLeftSVG';
import DateFormatSVG from '../../assets/svg/DateFormatSVG'; 

import { setDateFormat } from '../store/dateFormatSlice';

const DateFormatScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const currentFormat = useSelector(state => state.dateFormat.format);

    const handleSelect = (format) => {
        dispatch(setDateFormat(format));
    };

    return (
        <ImageBackground source={BGimg} style={styles.background} resizeMode="cover">
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ArrowArcLeftSVG width={45} height={45} />
                    </TouchableOpacity>
                    <DateFormatSVG width={260} height={36} />
                </View>

                <View style={styles.buttonsRow}>
                    <TouchableOpacity
                        style={[
                            styles.button,
                            currentFormat === 'Day/Month/Year' ? styles.buttonActive : styles.buttonInactive,
                            { marginRight: 10 },
                        ]}
                        onPress={() => handleSelect('Day/Month/Year')}
                    >
                        <Text
                            style={[
                                styles.buttonText,
                                currentFormat === 'Day/Month/Year' ? styles.buttonTextActive : styles.buttonTextInactive,
                            ]}
                        >
                            Day/Month/Year
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.button,
                            currentFormat === 'Year/Day/Month' ? styles.buttonActive : styles.buttonInactive,
                        ]}
                        onPress={() => handleSelect('Year/Day/Month')}
                    >
                        <Text
                            style={[
                                styles.buttonText,
                                currentFormat === 'Year/Day/Month' ? styles.buttonTextActive : styles.buttonTextInactive,
                            ]}
                        >
                            Year/Day/Month
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
};

export default DateFormatScreen;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 40,
    },
    buttonsRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30,
    },
    button: {
        height: 35,
        borderRadius: 34,
        paddingVertical: 4,
        paddingHorizontal: 24,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 1,
        minWidth: 120,   
        maxWidth: 171,
    },
    buttonActive: {
        backgroundColor: '#5E2D1D',
    },
    buttonInactive: {
        backgroundColor: '#FFFFFF',
    },
    buttonText: {
        fontFamily: 'CrimsonText-Regular',
        fontStyle: 'normal',
        fontSize: 18,
        lineHeight: 18,
        letterSpacing: -0.32,
        textAlign: 'center',
        flexShrink: 1,      
    },
    buttonTextActive: {
        color: '#FFFFFF',
    },
    buttonTextInactive: {
        color: '#5E2D1D',
    },
});
