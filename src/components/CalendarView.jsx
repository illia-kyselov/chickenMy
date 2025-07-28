import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarView = ({ selectedDate, onDaySelect }) => {
  return (
    <View style={styles.wrapper}>
      <Calendar
        onDayPress={onDaySelect}
        markedDates={{
          [selectedDate]: {
            selected: true,
            marked: true,
            selectedColor: '#FFC108',
          },
        }}
        theme={{
          backgroundColor: 'transparent',
          calendarBackground: 'transparent',
          textSectionTitleColor: '#5E2D1D',
          dayTextColor: '#5E2D1D',
          todayTextColor: '#5E2D1D',
          selectedDayBackgroundColor: '#5E2D1D',
          selectedDayTextColor: '#fff',
          arrowColor: '#5E2D1D',
          monthTextColor: '#5E2D1D',
          textDayFontFamily: 'Exo2-Light',
          textMonthFontFamily: 'Exo2-Bold',
          textDayHeaderFontFamily: 'Exo2-Light',
        }}
        style={{
          borderWidth: 0,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: 358,
    alignSelf: 'center',
    paddingHorizontal: 0,
    paddingBottom: 8,
    backgroundColor: 'transparent',
  },
});

export default CalendarView;
