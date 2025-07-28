import React from 'react';
import {
    StyleSheet,
    ImageBackground,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { updateChicken } from '../store/chickensSlice';
import ChickenForm from '../components/ChickenForm';

const EditChickenScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch();
    const { chicken } = route.params;

    const handleSubmit = (updatedData) => {
        dispatch(updateChicken({ id: chicken.id, ...updatedData }));
        navigation.navigate('MainScreen');
    };

    return (
        <ImageBackground
            source={require('../../assets/BGimg.jpg')}
            style={styles.background}
            resizeMode="cover"
        >
            <ChickenForm
                initialData={chicken}
                onSubmit={handleSubmit}
                onGoBack={() => navigation.goBack()}
                buttonLabel="Save"
            />
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
});

export default EditChickenScreen;
