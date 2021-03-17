import React from 'react';
import { ScrollView, StyleSheet, SafeAreaView, Text } from 'react-native';
import Colors from "../constants/colors";
import AppHeader from "../components/header";
import theme from '../constants/theme';
import { useSelector } from 'react-redux';

export default function StagesDetails({ route, navigation }) {

    const { stages, parent } = useSelector(state => state.eventsReducer);
    const stage_id = route.params;
    const stage = stages.filter((stage) => stage.stage_id === stage_id)[0];
  
    //header component 
    React.useLayoutEffect(() => {
        navigation.setOptions({
            header: () =>
                <AppHeader
                    item={stage}
                    //tags={parent.tags}
                    img={require('../assets/stagePic.jpg')}
                    title={`${stage.venue.name}, ${stage.name}`}
                    subTitle={stage.venue.city}
                    leftButton={false}
                    rightButton={true}
                    navigation={navigation}
                    clickableTag={false}
                />,
        });
    }, [navigation]); 

    return (
        <SafeAreaView style={styles.screen}>
            <ScrollView showsHorizontalScrollIndicator={true}>
                <Text style={styles.title}>TRANSPORTATION</Text>
                <Text style={styles.title}>FACILITIES</Text>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.backwhite,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: theme.fontSizes.detailsTitle,
        fontFamily: theme.fonts.fontFamily,
        margin: 16
    },
    text: {
        fontSize: theme.fontSizes.detailsText,
        fontFamily: theme.fonts.fontFamily,
        lineHeight: 30,
        margin: 16,
        marginTop: 0,
    }
});