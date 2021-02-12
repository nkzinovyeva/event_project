import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator} from '@react-navigation/stack';
import MainScreen from "../screens/MainScreen";
import MySchedule from "../screens/MyScheduleScreen";
import { Icon } from 'react-native-elements';
import Colors from "../assets/constants/colors";

//default options for the screens
const defaultNavOptions =  {
  headerStyle: {
    backgroundColor: Colors.backwhite,
  },
  headerTintColor: Colors.whiteColor,
  headerTitleStyle: {
    //fontWeight: 'bold',
    fontSize: 32,
    alignSelf: 'center',
    justifyContent: 'center',
    fontFamily: 'System',
  },
  headerBackTitleStyle: {
  }
}

// main stack 
const mainStack = createStackNavigator();

function MainStackScreen() {
    return (
      <mainStack.Navigator screenOptions={() => (defaultNavOptions)}  >
        <mainStack.Screen name="Night(s) of Arts" component={MainScreen} />
        <mainStack.Screen name="MySchedule" component={MySchedule} />
      </mainStack.Navigator>
    );
}

// mySchedule stack  - fake at this moment
const myScheduleStack = createStackNavigator();

function MyScheduleStackScreen() {
    return (
        <myScheduleStack.Navigator screenOptions={() => (defaultNavOptions)}  >
            <myScheduleStack.Screen name="Events" component={MainScreen} />
            <myScheduleStack.Screen name="My Schedule" component={MySchedule} />
      </myScheduleStack.Navigator>
    );
}

// restorants stack - fake at this moment
const restStack = createStackNavigator();

function restorantsStackScreen() {
    return (
      <restStack.Navigator screenOptions={() => (defaultNavOptions)}  >
        <restStack.Screen name="Events" component={MainScreen}  />
        <restStack.Screen name="My Schedule" component={MySchedule} />
      </restStack.Navigator>
    );
}

// mySchedule stack  - fake at this moment
const infoStack = createStackNavigator();

function InfoStackScreen() {
    return (
        <infoStack.Navigator screenOptions={() => (defaultNavOptions)}  >
            <infoStack.Screen name="Events" component={MainScreen}  />
            <infoStack.Screen name="My Schedule" component={MySchedule} />
      </infoStack.Navigator>
    );
}

const MainNav = createBottomTabNavigator();

export default function AppNav() {

  return (
      <MainNav.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName, iconType;

            if (route.name === 'My Schedule') {
                iconName = 'star-outline';
                iconType = 'material-community';
            } else if (route.name === 'Events') {
              iconName = 'drama-masks';
              iconType = 'material-community';
            } else if (route.name === 'Late Bites') {
                iconName = 'fast-food-outline';
                iconType = 'ionicon';
            } 

            return <Icon name={iconName} type={iconType} size={size} color={color}/>
          },
        })}
        tabBarOptions={{
          activeTintColor: Colors.blueColor,
          inactiveTintColor: Colors.grayColor,
          style: { 
            backgroundColor: Colors.whiteColor,
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowColor: Colors.grayColor,
            shadowOpacity: 2,
            shadowRadius: 2,
            elevation: 2,
            //borderTopWidth: 1,
            //top: 1,
            },
        }}
      >
        <MainNav.Screen key="1" name="My Schedule" component={MyScheduleStackScreen} />
        <MainNav.Screen key="2" name="Events" component={MainStackScreen} />
        <MainNav.Screen key="3" name="Late Bites" component={restorantsStackScreen} />
      </MainNav.Navigator>
  );

}