import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, ImageBackground, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import Colors from "../constants/colors";

import { useSelector, useDispatch } from 'react-redux';
import { addFavourite, removeFavourite, addTag, removeTag, filterEvents, updateTag } from '../redux/actions';

const { width } = Dimensions.get("screen");

export default AppHeader = (props) => {

  //console.log('header props', props)

  const { title, subTitle, img, tags, navigation, clickableTag, item } = props;

  //ordinary tag bar
  
  const Tag = () =>  {
    return (
      tags.map((item, index)=>
        <View key={index + item} style={{paddingTop: 20}} >
          <View style={styles.tag}>
            <Text style={styles.tagText}>#{item}</Text>
          </View>
        </View>)
      )
  }

  /*-----code-block for the clickable tag bar-------------*/

  const { tag, favourites, events, parent } = useSelector(state => state.eventsReducer);
  const dispatch = useDispatch();

  //const filter = (tag, filteredEvents, events) => dispatch(filterEvents(tag, filteredEvents, events ));

  //const addTheTag = tag => dispatch(addTag(tag));
  //const removeTheTag = tag => dispatch(removeTag(tag));
  
  const updateTags = (tag, filteredEvents) => dispatch(updateTag(tag, filteredEvents));

  const handleAddTag = t => {
    let temp = JSON.parse(JSON.stringify(events));
    console.log(temp);
    updateTags([...tag,t], temp);

    //addTheTag(t);
  };

  const handleRemoveTag = t => {
    let temp = JSON.parse(JSON.stringify(events));
    updateTags(tag.filter((tag)=> tag!=t), temp);
    //removeTheTag(t);
  };

  const ifExistsTag = t => {
    if (tag.filter(item => item === t).length > 0) {
      return true;
    }
      return false;
  };

  // !!!!!!!!  WORKS ONLY FOR VISUAL REPRESENTATION, STILL CLICKABLE AND AFFECTS THE FILTERING
  const ifParentTag = t => {  
    if (parent.tags.filter(tag => tag === t).length > 0) {
      return true;
    }
      return false;
  };

  const ClickableTag = () =>  {
    return (
      tags.map((item, index)=> 
        <TouchableOpacity
            key={index + item}
            onPress={() =>
              ifExistsTag(item) ? handleRemoveTag(item) : handleAddTag(item)
            } >
            <View style={{paddingTop: 20}} >
              <View  style={{
                backgroundColor: ifExistsTag(item) || ifParentTag(item) ? Colors.blueColor : null, 
                padding: 4, 
                margin: 8, 
                borderRadius: 16, 
                borderColor: ifExistsTag(item) || ifParentTag(item) ? Colors.blueColor : Colors.whiteColor, 
                borderWidth: 1 }}>
                <Text style={{color: Colors.whiteColor, fontSize: 16}}>{item}</Text>
              </View>
            </View>
        </TouchableOpacity>
      )
    )
  }
  
  /*-----end of clickable tag------- */

  /*-----code-block for handling favourites-------- NEED TO BE REFACTORED!!! -----*/

  const addToFavouriteList = event => dispatch(addFavourite(event));
  const removeFromFavouriteList = event => dispatch(removeFavourite(event));

  const handleAddFavourite = event => {
    addToFavouriteList(event);
    Alert.alert("The event is saved in Favourites")
  };

  const handleRemoveFavourite = event => {
    removeFromFavouriteList(event);
    Alert.alert("The event is removed from Favourites")
  };

  const ifExists = event => {
    if (favourites.filter(item => item.eventId === event.eventId).length > 0) {
      return true;
    }
      return false;
  };

  const FavButton = () => {
    return (
      <TouchableOpacity
        style={{ justifyContent: 'space-between', flexDirection: "row", }}
          onPress={() =>
            ifExists(item) ? handleRemoveFavourite(item) : handleAddFavourite(item)
          }
        >
          <Icon
            size={22}
            name={ifExists(item) ? 'star-sharp' : 'star-outline'}
            type='ionicon'
            color={Colors.whiteColor}
          />
          <Text style={{color: Colors.whiteColor, fontSize: 16, paddingTop: 4, paddingLeft: 5}}>My Schedule</Text>
        </TouchableOpacity>
    )
  } 

  return (
    <View style={{ height: 210 }}>
      <ImageBackground source={img} style={{ width: width, height: 210}}  >
          
        <View style={{ justifyContent: 'space-between', flexDirection: "row", paddingLeft: 10, paddingRight: 10, paddingTop: 50 }}>
          {!props.leftButton ? (<Text style={{ paddingTop: 10}}></Text> ) 
          : ( <FavButton />
          )}
          {!props.rightButton ? (<Text></Text> ) 
          : ( <Icon
                name='close'
                type='ionicon'
                color='white'
                onPress={props.rightButton ? () => navigation.goBack() : {} }
              />
          )}
        </View>

        <View style={{  justifyContent: 'center', flexDirection: "column", paddingTop: 10 }}>
          <Text style={{ fontSize: 32, fontFamily: 'System', color: Colors.whiteColor, marginLeft: 15 }}>{title}</Text>
          <Text style={{ fontSize: 16, fontFamily: 'System', color: Colors.whiteColor, marginLeft: 15 }}>{subTitle}</Text>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
            >
            {clickableTag ? <ClickableTag /> : <Tag /> } 
            </ScrollView>
        </View>

      </ImageBackground>
  </View>
  )
} 

 const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.backwhite,
      paddingTop: StatusBar.currentHeight,
    }, 
    tag: {
      //backgroundColor: Colors.blueColor,
      padding: 4,
      margin: 8,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: Colors.whiteColor,
    },
    tagText: {
      color: Colors.whiteColor,
      fontSize: 16
    },
    image: {
      flex: 1,
      width: width,
      height: 160,
      resizeMode: "cover",
      paddingTop: 10,
    },
  }
  );


  /* how to use: 

  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false});
  }, [navigation]);


    let tags = ["No smoking", "No smoking", "No smoking", "No smoking", "No smoking", "No smoking"];

        <AppHeader 
          tags={tags}
          img={null}
          title={events.parentEvent.title} 
          subTitle={events.parentEvent.eventVenues[0].venue.name + ', ' + (moment(events.parentEvent.startDate).format("MMM Do") +  " - " + moment(events.parentEvent.endDate).format("Do YYYY"))}
          backButton={false}
          adminButton={true}
        />
  */