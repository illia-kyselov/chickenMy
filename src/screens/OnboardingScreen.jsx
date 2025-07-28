import React from 'react';
import {
    Image,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    ImageBackground,
    ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import WelcomeSVG from '../../assets/svg/WelcomeSVG';

const OnboardingScreen = () => {
    const navigation = useNavigation();

    return (
        <ImageBackground
            source={require('../../assets/BGimg.jpg')}
            style={styles.background}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.header}>
                        <WelcomeSVG width={300} height={70} />
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
                            Keep records of chickens and{'\n'}egg production conveniently
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={styles.nextButton}
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate('Second')}
                    >
                        <Text style={styles.nextButtonText}>NEXT</Text>
                    </TouchableOpacity>
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
        paddingHorizontal: 16,
        justifyContent: 'flex-start',
        marginHorizontal: 16,
    },
    scrollContent: {
        flexGrow: 1, 
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    header: {
        alignItems: 'flex-start',
        paddingHorizontal: 34,
    },

    imageContainer: {
        alignItems: 'center',
        marginTop: 20,
    },

    chickenIcon: {
        width: 358,
        height: 365,
    },
    infoBox: {
        backgroundColor: '#FFC108',
        borderRadius: 30,
        height: 70,
        paddingVertical: 5,
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        marginHorizontal: 16,
    },
    infoText: {
        fontFamily: 'Moderustic-SemiBold',
        fontSize: 22,
        lineHeight: 28,
        textAlign: 'center',
        color: '#A55238',
    },
    nextButton: {
        backgroundColor: '#FFC108',
        borderRadius: 30,
        height: 49,
        paddingHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop: 20,
        marginBottom: 150,
    },
    nextButtonText: {
        fontFamily: 'Moderustic-SemiBold',
        fontSize: 24,
        fontWeight: '600',
        color: '#5E2D1D',
    },
});

export default OnboardingScreen;
