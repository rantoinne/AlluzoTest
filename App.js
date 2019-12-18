import {Animated, Easing} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import SplashScreen from './src/SplashScreen';
import GithubUserProfileView from './src/GithubUserProfileView';
import GithubUsersListView from './src/GithubUsersListView';

const App = createStackNavigator(
  {
    SplashScreen: {
      screen: SplashScreen,
      navigationOptions: {
        header: null,
      },
    },
    GithubUsersListView: {
      screen: GithubUsersListView,
      navigationOptions: {
        header: null,
      },
    },
    GithubUserProfileView: {
      screen: GithubUserProfileView,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    headerMode: 'none',
    mode: 'modal',
    initialRouteName: 'SplashScreen',
    defaultNavigationOptions: {
      gesturesEnabled: false,
    },
    transitionConfig: () => ({
      transitionSpec: {
        duration: 500,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
      },
      screenInterpolator: sceneProps => {
        const {layout, position, scene} = sceneProps;
        const {index} = scene;

        const width = layout.initWidth;

        const translateX = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [width, 0, -width],
        });

        const opacity = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [0, 1, 0],
        });

        const scale = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [0.7, 1, 0.7],
        });

        const rotate = position.interpolate({
          inputRange: [index - 1, index - 0.5, index],
          outputRange: ['10deg', '5deg', '0deg'],
        });

        return {opacity, transform: [{translateX}, {scale}, {rotate}]};
      },
    }),
  },
);

export default createAppContainer(App);
