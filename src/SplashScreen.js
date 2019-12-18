import React from 'react';
import {
  View,
  Text,
  Image,
  Animated,
  Dimensions,
  StatusBar,
  StyleSheet,
  PermissionsAndroid,
  ToastAndroid,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('window');

class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.animatedView = new Animated.Value(0);
  }

  componentDidMount() {
    this.animatedView.setValue(0);

    Animated.spring(this.animatedView, {
      toValue: 1,
      duration: 1000,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        this.navigateToHome();
      }, 10);
    });
  }

  navigateToHome = () => {
    this.props.navigation.navigate('GithubUsersListView');
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
        <LinearGradient
          colors={['#ffffff', '#209FCD60']}
          style={styles.linearGradient}>
          <Animated.View
            style={{
              backfaceVisibility: 'hidden',
              transform: [
                {
                  scale: this.animatedView.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.2, 1],
                  }),
                },
                {
                  translateY: this.animatedView.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-100, 1],
                  }),
                },
              ],
            }}>
            <Image
              source={require('./assets/Images/Gitlogo.png')}
              resizeMode="contain"
              style={styles.imageStyle}
            />
          </Animated.View>
          <Animated.View
            style={[
              styles.bottomView,
              {
                backfaceVisibility: 'hidden',
                transform: [
                  {
                    scale: this.animatedView.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.2, 1],
                    }),
                  },
                  {
                    translateY: this.animatedView.interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, 1],
                    }),
                  },
                ],
              },
            ]}>
            <Text
              style={{
                fontSize: 15,
                color: 'black',
                marginBottom: -10,
                fontFamily: 'Montserrat-Bold',
              }}>
              Alluzo
            </Text>
          </Animated.View>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textStyles: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 10,
    color: 'black',
  },
  bottomView: {
    flexDirection: 'column',
    width,
    justifyContent: 'center',
    paddingHorizontal: 0,
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
  },
  imageStyle: {
    width,
    marginTop: -height / 4,
    height: width,
  },
  linearGradient: {
    width,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
});

export default SplashScreen;
