import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import TB1Icon from '../../assets/svg/TB1IconSVG';
import TB1IconOnPress from '../../assets/svg/TB1IconSVGOnPress';
import TB2Icon from '../../assets/svg/TB2IconSVG';
import TB2IconOnPress from '../../assets/svg/TB2IconSVGOnPress';
import TB3Icon from '../../assets/svg/TB3IconSVG';
import TB3IconOnPress from '../../assets/svg/TB3IconSVGOnPress';
import TB4Icon from '../../assets/svg/TB4IconSVG';
import TB4IconOnPress from '../../assets/svg/TB4IconSVGOnPress';
import TB5Icon from '../../assets/svg/TB5IconSVG';
import TB5IconOnPress from '../../assets/svg/TB5IconSVGOnPress';

const TouchBar = ({ activeIndex = 0 }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('MainScreen')}>
        {activeIndex === 0 ? <TB1IconOnPress /> : <TB1Icon />}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Stats')}>
        {activeIndex === 1 ? <TB2IconOnPress /> : <TB2Icon />}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('RemindersScreen')}>
        {activeIndex === 2 ? <TB3IconOnPress /> : <TB3Icon />}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('StatisticsPageScreen')}>
        {activeIndex === 3 ? <TB4IconOnPress /> : <TB4Icon />}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('SettingsScreen')}>
        {activeIndex === 4 ? <TB5IconOnPress /> : <TB5Icon />}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 358,
    height: 60,
    borderRadius: 40,
    backgroundColor: '#FFC108CC',
    paddingTop: 10,
    paddingRight: 16,
    paddingBottom: 10,
    paddingLeft: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 40,
    zIndex: 10,
  },
});

export default TouchBar;
