import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ImageBackground,
    Dimensions,
    Text,
    FlatList,
    TouchableOpacity,
    View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import AccountingSVG from '../../assets/svg/AccountingSVG';
import ChickenSVG from '../../assets/svg/ChickenSVG';
import TouchBar from '../components/TouchBar';

const { width, height } = Dimensions.get('window');

const MainScreen = () => {
    const navigation = useNavigation();
    const chickens = useSelector((state) => state.chickens.items);
    const [isPressed, setIsPressed] = useState(false);

    const handlePress = () => {
        setIsPressed(true);
        setTimeout(() => {
            setIsPressed(false);
            navigation.navigate('AddChicken');
        }, 200);
    };

    const handleChickenPress = (chicken) => {
        navigation.navigate('ChickenDetails', { chicken });
    };

    return (
        <ImageBackground
            source={require('../../assets/BGimg.jpg')}
            style={styles.background}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <AccountingSVG width={358} height={80} />
                </View>

                <View style={styles.scrollContainer}>
                    <FlatList
                        data={chickens}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => handleChickenPress(item)}>
                                <View style={styles.nameItem}>
                                    <Text style={styles.chickenName}>{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                        ListEmptyComponent={() => (
                            <View style={styles.nameItem}>
                                <Text style={styles.chickenName}>No chickens yet</Text>
                            </View>
                        )}
                        showsVerticalScrollIndicator={false}
                    />
                </View>

                {/* 🔽 Блок з куркою і кнопкою */}
                <View style={styles.bottomSection}>
                    <View style={styles.chickenImage}>
                        <ChickenSVG width={200} height={204} />
                    </View>

                    <View style={styles.addButtonWrapper}>
                        <TouchableOpacity
                            style={[styles.addButton, isPressed && styles.addButtonActive]}
                            onPress={handlePress}
                            activeOpacity={0.8}
                        >
                            <Text
                                style={[
                                    styles.addButtonText,
                                    isPressed && styles.addButtonTextActive,
                                ]}
                            >
                                Add the chicken
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchBar
                    activeIndex={0}
                    onPressIndex1={() => navigation.navigate('Stats')}
                />
            </SafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: { width, height },
    container: {
        flex: 1,
        paddingHorizontal: 16,
        justifyContent: 'flex-start',
    },
    header: {
        alignItems: 'center',
    },
    scrollContainer: {
        maxHeight: 190,
        marginTop: 16,
        width: 358,
        alignSelf: 'center',
    },
    nameItem: {
        paddingVertical: 4,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    chickenName: {
        fontFamily: 'Moderustic',
        fontWeight: '400',
        fontSize: 24,
        lineHeight: 30,
        letterSpacing: -0.41,
        textAlign: 'center',
        color: '#5E2D1D',
    },
    clearBtn: {
        marginTop: 12,
        alignSelf: 'center',
    },
    clearText: {
        color: 'red',
        fontSize: 16,
    },

    /** 🐔 КУРКА + КНОПКА */
    bottomSection: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 90,
    },
    chickenImage: {
        position: 'absolute',
        bottom: 145,
        left: -15,
        zIndex: 10,
    },
    addButtonWrapper: {
        marginBottom: 30,
        zIndex: 5,
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
        fontWeight: '600',
        fontSize: 24,
        lineHeight: 24,
        letterSpacing: -0.41,
        textAlign: 'center',
        color: '#5E2D1D',
    },
    addButtonTextActive: {
        color: '#FFC108',
    },
});

export default MainScreen;
