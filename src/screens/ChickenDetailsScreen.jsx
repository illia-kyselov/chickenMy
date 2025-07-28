import React, { useState } from 'react';
import {
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Image,
    ImageBackground,
    View,
    TouchableOpacity,
    Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ArrowArcLeftSVG from '../../assets/svg/ArrowArcLeftSVG';
import PlusSVG from '../../assets/svg/PlusSVG';

const ChickenDetailsScreen = ({ route }) => {
    const { chicken } = route.params;
    const navigation = useNavigation();

    const [isAnimating, setIsAnimating] = useState(false);
    const animationOpacity = useState(new Animated.Value(0))[0];

    const handlePlusPress = () => {
        setIsAnimating(true);
        animationOpacity.setValue(1);

        Animated.timing(animationOpacity, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
        }).start(() => {
            setIsAnimating(false);
            navigation.navigate('EditChicken', { chicken: { ...chicken } });
        });
    };

    return (
        <ImageBackground
            source={require('../../assets/BGimg.jpg')}
            style={styles.background}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={styles.content}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <ArrowArcLeftSVG width={40} height={40} />
                        </TouchableOpacity>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>{chicken.name}</Text>
                        </View>
                    </View>

                    {chicken.photoUri && (
                        <Image source={{ uri: chicken.photoUri }} style={styles.image} />
                    )}

                    <View style={styles.infoContainer}>
                        <View style={styles.statItem}>
                            <View style={styles.labelWrapper}>
                                <Text style={styles.statLabel}>Date</Text>
                                <View style={styles.underlineDate} />
                            </View>
                            <Text style={styles.statValue}>{chicken.date}</Text>
                        </View>

                        <View style={styles.statItem}>
                            <View style={styles.labelWrapper}>
                                <Text style={styles.statLabel}>Breed</Text>
                                <View style={styles.underlineBreed} />
                            </View>
                            <Text style={styles.statValue}>{chicken.breed}</Text>
                        </View>

                        <View style={styles.statItem}>
                            <View style={styles.labelWrapper}>
                                <Text style={styles.statLabel}>Status</Text>
                                <View style={styles.underlineStatus} />
                            </View>
                            <Text style={styles.statValue}>{chicken.health}</Text>
                        </View>

                        <View style={styles.statItem}>
                            <View style={styles.labelWrapper}>
                                <Text style={styles.statLabel}>Last Check</Text>
                                <View style={styles.underlineLastCheck} />
                            </View>
                            <Text style={styles.statValue}>{chicken.lastCheck}</Text>
                        </View>

                        <View style={styles.statItem}>
                            <View style={styles.labelWrapper}>
                                <Text style={styles.statLabel}>Vaccinations</Text>
                                <View style={styles.underlineVaccinations} />
                            </View>
                            <Text style={styles.statValue}>{chicken.vaccinations}</Text>
                        </View>
                    </View>

                    <View style={styles.plusWrapper}>
                        {isAnimating && (
                            <Animated.View
                                style={[styles.circleEffect, { opacity: animationOpacity }]}
                            />
                        )}
                        <TouchableOpacity onPress={handlePlusPress}>
                            <PlusSVG width={48} height={48} />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    content: {
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    titleContainer: {
        flex: 1,
        alignItems: 'center',
        marginRight: 40,
    },
    title: {
        fontFamily: 'Exo2-Bold',
        fontSize: 36,
        lineHeight: 38,
        letterSpacing: -0.41,
        color: '#5E2D1D',
    },
    image: {
        width: 358,
        height: 372,
        borderRadius: 20,
        resizeMode: 'cover',
        marginBottom: 32,
    },
    infoContainer: {
        width: 358,
        backgroundColor: '#FFFFFFCC',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 8,
        justifyContent: 'flex-start',
    },
    statItem: {
        marginBottom: 8,
    },
    labelWrapper: {
        alignSelf: 'flex-start',
    },
    statLabel: {
        fontFamily: 'Exo2-Regular',
        fontWeight: '400',
        fontSize: 18,
        lineHeight: 18,
        letterSpacing: -0.41,
        textAlign: 'center',
        color: '#FFC108',
    },
    underlineDate: {
        height: 2,
        backgroundColor: '#FFC108',
        marginTop: 2,
        width: 42,
        borderRadius: 1,
    },
    underlineBreed: {
        height: 2,
        backgroundColor: '#FFC108',
        marginTop: 2,
        width: 54,
        borderRadius: 1,
    },
    underlineStatus: {
        height: 2,
        backgroundColor: '#FFC108',
        marginTop: 2,
        width: 60,
        borderRadius: 1,
    },
    underlineLastCheck: {
        height: 2,
        backgroundColor: '#FFC108',
        marginTop: 2,
        width: 92,
        borderRadius: 1,
    },
    underlineVaccinations: {
        height: 2,
        backgroundColor: '#FFC108',
        marginTop: 2,
        width: 110,
        borderRadius: 1,
    },
    statValue: {
        fontFamily: 'Exo2-Light',
        fontWeight: '300',
        fontSize: 18,
        lineHeight: 18,
        letterSpacing: -0.32,
        color: '#5E2D1D',
        textTransform: 'capitalize',
        marginTop: 4,
    },
    plusWrapper: {
        marginTop: 32,
        marginBottom: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    circleEffect: {
        position: 'absolute',
        width: 40,
        height: 40,
        backgroundColor: '#FFC108',
        borderRadius: 50,
        zIndex: -1,
    },
});

export default ChickenDetailsScreen;