import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  StyleSheet,
} from 'react-native';
import CalendarView from './CalendarView';
import CalendarIconSVG from '../../assets/svg/CalendarIconSVG';
import ArrowArcLeftSVG from '../../assets/svg/ArrowArcLeftSVG';
import { launchImageLibrary } from 'react-native-image-picker';

const ChickenForm = ({ initialData = {}, onSubmit, buttonLabel = 'Save', onGoBack }) => {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [health, setHealth] = useState('');
  const [vaccinations, setVaccinations] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedLastCheckDate, setSelectedLastCheckDate] = useState('');
  const [photoUri, setPhotoUri] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showLastCheckCalendar, setShowLastCheckCalendar] = useState(false);
  const [vaccinationHeight, setVaccinationHeight] = useState(40);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setBreed(initialData.breed || '');
      setHealth(initialData.health || '');
      setVaccinations(initialData.vaccinations || '');
      setSelectedDate(initialData.date || '');
      setSelectedLastCheckDate(initialData.lastCheck || '');
      setPhotoUri(initialData.photoUri || null);
    }
  }, [initialData]);

  const handlePhotoPick = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets && response.assets.length > 0) {
        setPhotoUri(response.assets[0].uri);
      }
    });
  };

  const handleSubmit = () => {
    onSubmit({
      name,
      breed,
      health,
      vaccinations,
      date: selectedDate,
      lastCheck: selectedLastCheckDate,
      photoUri,
    });
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ alignItems: 'center', paddingBottom: 60 }}>
          <View style={styles.backWrapper}>
            <TouchableOpacity onPress={onGoBack}>
              <ArrowArcLeftSVG width={45} height={45} />
            </TouchableOpacity>
          </View>

          {name ? <Text style={styles.title}>{name}</Text> : null}

          <TextInput
            style={styles.inputFull}
            placeholder="Name"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#5E2D1D"
          />

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
                  onDaySelect={(d) => {
                    setSelectedDate(d.dateString);
                    setShowCalendar(false);
                  }}
                />
              </View>
            )}
          </View>

          <TextInput
            style={styles.inputFull}
            placeholder="Breed"
            value={breed}
            onChangeText={setBreed}
            placeholderTextColor="#5E2D1D"
          />

          <View style={styles.labelWrapper}>
            <Text style={styles.label}>Health:</Text>
          </View>

          <TextInput
            style={styles.inputFull}
            placeholder="Status"
            value={health}
            onChangeText={setHealth}
            placeholderTextColor="#5E2D1D"
          />

          <View style={styles.datePickerWrapper}>
            <TouchableOpacity
              style={styles.dateInputRow}
              onPress={() => setShowLastCheckCalendar(!showLastCheckCalendar)}
              activeOpacity={0.8}
            >
              <Text style={styles.dateText}>{selectedLastCheckDate || 'Last check'}</Text>
              <CalendarIconSVG width={30} height={30} />
            </TouchableOpacity>
            {showLastCheckCalendar && (
              <View style={styles.calendarWrapper}>
                <CalendarView
                  selectedDate={selectedLastCheckDate}
                  onDaySelect={(d) => {
                    setSelectedLastCheckDate(d.dateString);
                    setShowLastCheckCalendar(false);
                  }}
                />
              </View>
            )}
          </View>

          <TextInput
            style={[styles.inputFull, { height: vaccinationHeight }]}
            placeholder="Vaccinations"
            value={vaccinations}
            multiline
            onChangeText={setVaccinations}
            onContentSizeChange={(e) =>
              setVaccinationHeight(Math.max(40, e.nativeEvent.contentSize.height))
            }
            placeholderTextColor="#5E2D1D"
          />

          <TouchableOpacity onPress={handlePhotoPick} style={[styles.photoWrapper, photoUri && styles.photoWithImage]}>
            {photoUri ? (
              <Image source={{ uri: photoUri }} style={styles.photoPreview} />
            ) : (
              <Text style={styles.photoText}>+ Add Photo</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSubmit} style={styles.submitBtn}>
            <Text style={styles.submitText}>{buttonLabel}</Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  backWrapper: {
    marginTop: 60,
    marginLeft: 16,
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: 36,
    color: '#5E2D1D',
    marginTop: -40,
    marginBottom: 12,
    letterSpacing: -0.41,
    fontFamily: 'Exo2-Bold',
    lineHeight: 36,
    textAlign: 'center',
  },
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
    marginBottom: 10,
  },
  datePickerWrapper: {
    width: 358,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#5E2D1D',
    borderRadius: 30,
    backgroundColor: '#FFFFFF4D',
    overflow: 'hidden',
    marginBottom: 10,
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
    marginBottom: 4,
  },
  label: {
    fontFamily: 'Exo2-Light',
    fontSize: 18,
    lineHeight: 18,
    letterSpacing: -0.41,
    color: '#5E2D1D',
    marginBottom: 5,
  },
  photoWrapper: {
    width: 358,
    height: 197,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#5E2D1D',
    backgroundColor: '#FFFFFF4D',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  photoWithImage: {
    height: 313,
    overflow: 'hidden',
  },
  photoPreview: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    resizeMode: 'cover',
  },
  photoText: {
    color: '#5E2D1D',
    fontSize: 18,
  },
  submitBtn: {
    backgroundColor: '#FFC108',
    width: 358,
    padding: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 30,
  },
  submitText: {
    color: '#5E2D1D',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ChickenForm;
