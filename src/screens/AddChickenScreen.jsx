import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    SafeAreaView,
    ImageBackground,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { launchImageLibrary } from 'react-native-image-picker';
import ArrowArcLeftSVG from '../../assets/svg/ArrowArcLeftSVG';
import CalendarIconSVG from '../../assets/svg/CalendarIconSVG';
import CalendarView from '../components/CalendarView';
import { addChicken } from '../store/chickensSlice'; 

const { width, height } = Dimensions.get('window');

const AddChickenScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [breed, setBreed] = useState('');
    const [health, setHealth] = useState('');
    const [vaccinations, setVaccinations] = useState('');
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [showLastCheckCalendar, setShowLastCheckCalendar] = useState(false);
    const [selectedLastCheckDate, setSelectedLastCheckDate] = useState('');
    const [vaccinationHeight, setVaccinationHeight] = useState(40);
    const [photoUri, setPhotoUri] = useState(null);

    const handleDateSelect = (day) => {
        setSelectedDate(day.dateString);
        setShowCalendar(false);
    };

    const handleLastCheckSelect = (day) => {
        setSelectedLastCheckDate(day.dateString);
        setShowLastCheckCalendar(false);
    };

    const handlePickPhoto = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (response.assets && response.assets.length > 0) {
                setPhotoUri(response.assets[0].uri);
            }
        });
    };

    const chickenData = {
        name,
        breed,
        health,
        vaccinations,
        date: selectedDate,
        lastCheck: selectedLastCheckDate,
        photoUri,
    };

    const handleAddChicken = () => {
        if (!chickenData.name?.trim()) return;

        dispatch(addChicken(chickenData));
        navigation.navigate('MainScreen');
    };

    return (
        <ImageBackground
            source={require('../../assets/BGimg.jpg')}
            style={styles.background}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.safe}>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <ScrollView
                            contentContainerStyle={styles.scrollContent}
                            keyboardShouldPersistTaps="handled"
                        >
                            <View style={styles.backWrapper}>
                                <TouchableOpacity onPress={() => navigation.goBack()}>
                                    <ArrowArcLeftSVG width={45} height={45} />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.titleWrapper}>
                                <Text style={styles.title}>New chicken</Text>
                            </View>

                            <View style={styles.formWrapper}>
                                <View style={styles.inputWrapper}>
                                    <TextInput
                                        style={styles.inputFull}
                                        placeholder="Name"
                                        placeholderTextColor="#5E2D1D"
                                        value={name}
                                        onChangeText={setName}
                                    />
                                </View>

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
                                            <CalendarView
                                                selectedDate={selectedDate}
                                                onDaySelect={handleDateSelect}
                                            />
                                        </View>
                                    )}
                                </View>

                                <View style={styles.inputWrapper}>
                                    <TextInput
                                        style={styles.inputFull}
                                        placeholder="Breed"
                                        placeholderTextColor="#5E2D1D"
                                        value={breed}
                                        onChangeText={setBreed}
                                    />
                                </View>

                                <View style={styles.labelWrapper}>
                                    <Text style={styles.label}>Health:</Text>
                                </View>

                                <View style={styles.inputWrapper}>
                                    <TextInput
                                        style={styles.inputFull}
                                        placeholder="Status"
                                        placeholderTextColor="#5E2D1D"
                                        value={health}
                                        onChangeText={setHealth}
                                    />
                                </View>

                                <View style={styles.datePickerWrapper}>
                                    <TouchableOpacity
                                        style={styles.dateInputRow}
                                        onPress={() => setShowLastCheckCalendar(!showLastCheckCalendar)}
                                        activeOpacity={0.8}
                                    >
                                        <Text style={styles.dateText}>
                                            {selectedLastCheckDate || 'Last check'}
                                        </Text>
                                        <CalendarIconSVG width={30} height={30} />
                                    </TouchableOpacity>
                                    {showLastCheckCalendar && (
                                        <View style={styles.calendarWrapper}>
                                            <CalendarView
                                                selectedDate={selectedLastCheckDate}
                                                onDaySelect={handleLastCheckSelect}
                                            />
                                        </View>
                                    )}
                                </View>

                                <View style={styles.inputWrapper}>
                                    <TextInput
                                        style={[styles.inputFull, { height: vaccinationHeight }]}
                                        placeholder="Vaccinations"
                                        placeholderTextColor="#5E2D1D"
                                        multiline
                                        textAlignVertical="top"
                                        value={vaccinations}
                                        onChangeText={setVaccinations}
                                        onContentSizeChange={(e) =>
                                            setVaccinationHeight(Math.max(40, e.nativeEvent.contentSize.height))
                                        }
                                    />
                                </View>

                                <TouchableOpacity
                                    style={[
                                        styles.photoWrapperBase,
                                        photoUri ? styles.photoWrapperWithImage : styles.photoWrapperInitial,
                                    ]}
                                    onPress={handlePickPhoto}
                                    activeOpacity={0.8}
                                >
                                    {photoUri ? (
                                        <Image source={{ uri: photoUri }} style={styles.photoPreview} />
                                    ) : (
                                        <View style={styles.photoTextRow}>
                                            <Text style={styles.photoLabel}>Photo</Text>
                                            <Text style={styles.photoPlus}>+</Text>
                                        </View>
                                    )}
                                </TouchableOpacity>

                                <View style={styles.buttonWrapper}>
                                    <TouchableOpacity
                                        style={{
                                            width: 358,
                                            height: 49,
                                            borderRadius: 30,
                                            padding: 10,
                                            backgroundColor: '#FFC108',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                        activeOpacity={0.8}
                                        onPress={handleAddChicken}
                                    >
                                        <Text
                                            style={{
                                                fontFamily: 'Moderustic-SemiBold',
                                                fontWeight: '600',
                                                fontSize: 24,
                                                lineHeight: 24,
                                                letterSpacing: -0.41,
                                                color: '#5E2D1D',
                                                textAlign: 'center',
                                            }}
                                        >
                                            Add
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ScrollView>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: { width, height, flex: 1 },
    safe: { flex: 1 },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 16,
        paddingBottom: 60,
    },
    backWrapper: {
        marginLeft: -5,
        alignItems: 'flex-start',
    },
    titleWrapper: {
        marginTop: -43,
        alignItems: 'center',
    },
    title: {
        width: 210,
        height: 43,
        fontFamily: 'Exo2-Bold',
        fontSize: 36,
        lineHeight: 36,
        letterSpacing: -0.41,
        textAlign: 'center',
        color: '#5E2D1D',
    },
    formWrapper: {
        marginTop: 10,
        alignItems: 'center',
        gap: 10,
    },
    inputWrapper: { alignItems: 'center' },
    inputFull: {
        width: 358,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#5E2D1D',
        paddingTop: 8,
        paddingBottom: 10,
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor: '#FFFFFF4D',
        fontFamily: 'Exo2-Light',
        fontSize: 18,
        lineHeight: 18,
        letterSpacing: -0.41,
        color: '#5E2D1D',
    },
    datePickerWrapper: {
        width: 358,
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: '#5E2D1D',
        borderRadius: 30,
        backgroundColor: '#FFFFFF4D',
        overflow: 'hidden',
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
    labelWrapper: {
        width: 323,
        alignSelf: 'center',
        marginTop: 5,
    },
    label: {
        fontFamily: 'Exo2-Light',
        fontSize: 18,
        lineHeight: 18,
        letterSpacing: -0.41,
        color: '#5E2D1D',
    },
    photoWrapperBase: {
        width: 358,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#5E2D1D',
        backgroundColor: '#FFFFFF4D',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    photoWrapperInitial: {
        height: 197,
        padding: 16,
    },
    photoWrapperWithImage: {
        height: 313,
        overflow: 'hidden',
    },
    photoTextRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    photoLabel: {
        fontFamily: 'Exo2-Light',
        fontSize: 18,
        lineHeight: 18,
        letterSpacing: -0.41,
        color: '#5E2D1D',
    },
    photoPlus: {
        fontFamily: 'Exo2-Light',
        fontSize: 34,
        lineHeight: 34,
        color: '#5E2D1D',
        marginTop: -5,
    },
    photoPreview: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
        borderRadius: 30,
    },
    buttonWrapper: {
        marginTop: 63,
        marginBottom: 40,
    },
});

export default AddChickenScreen;
