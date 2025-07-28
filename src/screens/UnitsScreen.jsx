import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ImageBackground,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { setUnits } from '../store/unitsSlice';

import BGimg from '../../assets/BGimg.jpg';
import ArrowArcLeftSVG from '../../assets/svg/ArrowArcLeftSVG';
import UnitsSVG from '../../assets/svg/UnitsSVG';

const UnitsScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const currentUnit = useSelector(state => state.units?.type || 'pieces');

    const handleSelect = (unit) => {
        dispatch(setUnits(unit));
    };

    return (
        <ImageBackground source={BGimg} style={styles.background} resizeMode="cover">
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ArrowArcLeftSVG width={45} height={45} />
                    </TouchableOpacity>
                    <UnitsSVG width={260} height={36} />
                </View>

                <View style={styles.buttonsRow}>
                    <TouchableOpacity
                        style={[
                            styles.button,
                            currentUnit === 'pieces' ? styles.buttonActive : styles.buttonInactive,
                            { marginRight: 10 },
                        ]}
                        onPress={() => handleSelect('pieces')}
                    >
                        <Text style={[styles.buttonText, currentUnit === 'pieces' && styles.buttonTextActive]}>
                            Pieces
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.button,
                            currentUnit === 'boxes' ? styles.buttonActive : styles.buttonInactive,
                        ]}
                        onPress={() => handleSelect('boxes')}
                    >
                        <Text style={[styles.buttonText, currentUnit === 'boxes' && styles.buttonTextActive]}>
                            Boxes
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
};

export default UnitsScreen;

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
        gap: 30,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    buttonsRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 50,
    },
    button: {
        width: 171,
        height: 39,
        borderRadius: 30,
        paddingVertical: 4,
        paddingHorizontal: 24,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 1,
    },
    buttonActive: {
        backgroundColor: '#5E2D1D',
    },
    buttonInactive: {
        backgroundColor: '#FFFFFF',
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Moderustic-Regular',
        color: '#5E2D1D',
    },
    buttonTextActive: {
        color: '#FFFFFF',
    },
});
