import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ImageBackground,
    Image,
    View,
    TouchableOpacity,
    Text,
    ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

import ProductionSVG from '../../assets/svg/ProductionSVG';
import CalendarIconSVG from '../../assets/svg/CalendarIconSVG';
import ArrowArcLeftSVG from '../../assets/svg/ArrowArcLeftSVG';
import ArrowDownSVG from '../../assets/svg/ArrowDownSVG';
import ArrowLeftLightSVG from '../../assets/svg/ArrowLeftLightSVG';
import MinusSVG from '../../assets/svg/MinusSVG';
import PlusMiniSVG from '../../assets/svg/PlusMiniSVG';
import CalendarView from '../components/CalendarView';
import TouchBar from '../components/TouchBar';

import { addEggEntry } from '../store/chickensSlice';

const AddEggScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [eggCount, setEggCount] = useState(1);
    const [selectedChicken, setSelectedChicken] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);

    const chickens = useSelector((state) => state.chickens.items);
    const chickenNames = chickens.map((chicken) => chicken.name);

    const handleDateSelect = (day) => {
        setSelectedDate(day.dateString);
        setShowCalendar(false);
    };

    const handleSave = () => {
        if (!selectedDate || !selectedChicken) return;

        const chicken = chickens.find((c) => c.name === selectedChicken);
        if (!chicken) return;

        dispatch(
            addEggEntry({
                chickenId: chicken.id,
                date: selectedDate,
                count: eggCount,
            })
        );

        navigation.navigate('Stats');

    };

    return (
        <ImageBackground
            source={require('../../assets/BGimg.jpg')}
            style={styles.background}
            resizeMode="cover"
        >
            {/* Монети поверх фону, але під контентом */}
            <View style={StyleSheet.absoluteFill} pointerEvents="none">
                <Image
                    source={require('../../assets/AddonForBG.png')}
                    style={styles.coins}
                />
            </View>

            <SafeAreaView style={styles.container}>
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Header */}
                    <View style={styles.topRow}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                            <ArrowArcLeftSVG width={45} height={45} />
                        </TouchableOpacity>
                        <ProductionSVG width={240} height={40} />
                    </View>

                    {/* Date Picker */}
                    <View style={styles.datePickerWrapper}>
                        <TouchableOpacity
                            style={styles.dateInputRow}
                            onPress={() => setShowCalendar(!showCalendar)}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.dateText}>{selectedDate || 'Date'}</Text>
                            <CalendarIconSVG width={30} height={30} />
                        </TouchableOpacity>
                        {showCalendar && (
                            <View style={styles.calendarWrapper}>
                                <CalendarView selectedDate={selectedDate} onDaySelect={handleDateSelect} />
                            </View>
                        )}
                    </View>

                    {/* Egg Counter */}
                    <View style={styles.counterWrapper}>
                        <TouchableOpacity
                            style={styles.counterButton}
                            onPress={() => setEggCount((prev) => Math.max(0, prev - 1))}
                        >
                            <MinusSVG width={24} height={24} />
                        </TouchableOpacity>

                        <View style={styles.counterValueWrapper}>
                            <Text style={styles.counterValueText}>{eggCount}</Text>
                        </View>

                        <TouchableOpacity
                            style={styles.counterButton}
                            onPress={() => setEggCount((prev) => prev + 1)}
                        >
                            <PlusMiniSVG width={24} height={24} />
                        </TouchableOpacity>
                    </View>

                    {/* Dropdown Chicken Selector */}
                    <View style={styles.dropdownWrapper}>
                        <TouchableOpacity
                            style={styles.dropdownHeader}
                            onPress={() => setShowDropdown(!showDropdown)}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.dropdownText}>
                                {selectedChicken || 'Select chicken'}
                            </Text>
                            {showDropdown ? (
                                <ArrowLeftLightSVG width={24} height={24} />
                            ) : (
                                <ArrowDownSVG width={24} height={24} />
                            )}
                        </TouchableOpacity>

                        {showDropdown && (
                            <View style={styles.dropdownList}>
                                {chickenNames.map((name, idx) => (
                                    <TouchableOpacity
                                        key={idx}
                                        style={styles.dropdownItem}
                                        onPress={() => {
                                            setSelectedChicken(name);
                                            setShowDropdown(false);
                                        }}
                                    >
                                        <Text style={styles.dropdownItemText}>{name}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>

                    {/* Save Button */}
                    <View style={styles.buttonWrapper}>
                        <TouchableOpacity
                            style={styles.saveButton}
                            activeOpacity={0.8}
                            onPress={handleSave}
                        >
                            <Text style={styles.saveButtonText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>

            {/* TouchBar */}
            <TouchBar
                activeIndex={1}
                onPressIndex0={() => navigation.navigate('MainScreen')}
                onPressIndex1={() => { }}
                onPressIndex2={() => navigation.navigate('StatsScreen')}
                onPressIndex3={() => { }}
                onPressIndex4={() => { }}
            />
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: { flex: 1 },
    container: { flex: 1 },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 140,
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 50,
        marginRight: 90,
    },
    backButton: { marginRight: 10 },
    datePickerWrapper: {
        width: 358,
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: '#5E2D1D',
        borderRadius: 30,
        backgroundColor: '#FFFFFF4D',
        overflow: 'hidden',
        marginTop: 15,
        zIndex: 10,
    },
    dateInputRow: {
        height: 40,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    dateText: {
        fontFamily: 'Exo2-Light',
        fontSize: 18,
        lineHeight: 18,
        letterSpacing: -0.41,
        color: '#5E2D1D',
    },
    calendarWrapper: {
        borderTopWidth: 1,
        borderColor: '#5E2D1D',
        backgroundColor: '#FFFFFF4D',
    },
    counterWrapper: {
        width: 358,
        height: 45,
        borderRadius: 30,
        backgroundColor: '#FFFFFFCC',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        alignSelf: 'center',
        overflow: 'hidden',
        zIndex: 3,
        paddingHorizontal: 16,
    },
    counterButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    counterValueWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    counterValueText: {
        fontSize: 24,
        color: '#5E2D1D',
        fontFamily: 'Moderustic-SemiBold',
        letterSpacing: -0.41,
        textTransform: 'uppercase',
    },
    dropdownWrapper: {
        width: 358,
        alignSelf: 'center',
        marginTop: 15,
        borderRadius: 30,
        backgroundColor: '#FFFFFFB2',
        overflow: 'hidden',
        zIndex: 20,
    },

    dropdownHeader: {
        height: 48,
        paddingHorizontal: 16,
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
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        overflow: 'hidden',
        marginTop: -1,
    },
    dropdownItem: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderTopWidth: 1,
        borderColor: '#EAE2D9',
    },
    dropdownItemText: {
        fontFamily: 'Exo2-Light',
        fontSize: 16,
        lineHeight: 16,
        letterSpacing: -0.41,
        color: '#5E2D1D',
    },
    buttonWrapper: {
        marginTop: 40,
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
    saveButtonText: {
        fontFamily: 'Moderustic-SemiBold',
        fontSize: 24,
        lineHeight: 24,
        letterSpacing: -0.41,
        color: '#5E2D1D',
        textAlign: 'center',
    },
    coins: {
        position: 'absolute',
        bottom: -100,
        left: 0,
        width: 513,
        height: 523,
        opacity: 0.8,
        resizeMode: 'contain',
        transform: [{ translateX: -45 }],
        zIndex: 0,
    },
});

export default AddEggScreen;
