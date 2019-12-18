import React from 'react';
import {
  View,
  Text,
  Image,
  Animated,
  Dimensions,
  StatusBar,
  StyleSheet,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  Linking,
  BackHandler,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ModalLoader from './ChildComponents/ModalLoader';
import Entypo from 'react-native-vector-icons/Entypo';

const {width, height} = Dimensions.get('window');

class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      gitUsers: [],
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });
    this.fetchUsersList();
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', () => {
      return true;
    });
  }

  fetchUsersList = () => {
    this.setState({
      loader: true,
    });
    fetch('https://api.github.com/users', {
      headers: {
        'Access-Control-Allow-Origin': true,
        'Content-type': 'application/json',
      },
      method: 'GET',
    })
      .then(res => res.json())
      .then(response => {
        this.setState({
          loader: false,
          gitUsers: response,
        });
        console.log(response);
      })
      .catch(err => {
        this.setState({
          loader: false,
        });
        console.log(err);
      });
  };

  navigateToProfileView = user => {
    const {
      navigation: {navigate},
    } = this.props;
    navigate('GithubUserProfileView', {user});
  };

  renderGitUsersList() {
    const {gitUsers} = this.state;
    if (gitUsers.length == 0) {
      return <Text>No records found</Text>;
    }

    return gitUsers.map((user, idx) => {
      return (
        <TouchableOpacity onPress={() => this.navigateToProfileView(user)}>
          <View style={styles.cardView}>
            <Image
              source={{uri: user.avatar_url}}
              style={{
                width: width / 8,
                height: width / 8,
                borderRadius: width / 16,
                backgroundColor: 'white',
              }}
              resizeMode="cover"
            />
            <View
              style={{
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                width: '80%',
                padding: 10,
              }}>
              <View style={styles.textView}>
                <Text style={styles.cardTitleText}>User name: </Text>
                <Text style={styles.cardValueText}>{user.login}</Text>
              </View>
              <View style={styles.textView}>
                <Text numberOfLines={1} style={styles.cardTitleText}>
                  Link:{' '}
                </Text>
                <Text
                  onPress={() => Linking.openURL(user.html_url)}
                  numberOfLines={1}
                  style={styles.cardValueText}>
                  {user.html_url}
                </Text>
              </View>
            </View>
            <Entypo name="chevron-right" color="#d2dae2" size={25} />
          </View>
        </TouchableOpacity>
      );
    });
  }

  render() {
    const {loader} = this.state;
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#3259A8" barStyle="dark-content" />
        <ModalLoader visible={loader} />
        <LinearGradient
          colors={['#ffffff', '#209FCD60']}
          style={styles.linearGradient}>
          <View style={styles.headerStyle}>
            <Text
              style={[
                styles.inActiveTabText1,
                {fontFamily: 'Montserrat-SemiBold', fontSize: 20},
              ]}>
              Git Users List
            </Text>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            alwaysBounceVertical={true}
            refreshControl={
              <RefreshControl
                refreshing={loader}
                onRefresh={this.fetchUsersList}
                title="Loading..."
              />
            }>
            {this.renderGitUsersList()}
          </ScrollView>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  cardView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    width,
    borderBottomWidth: 1,
    borderColor: '#d2dae2',
    paddingVertical: 8,
  },
  headerStyle: {
    width,
    height: width / 7,
    elevation: 10,
    backgroundColor: '#3259A8',
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inActiveTabText1: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: 'white',
    marginLeft: 8,
  },
  textView: {
    flexDirection: 'row',
    marginLeft: 4,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  cardTitleText: {
    fontFamily: 'Montserrat-SemiBold',
    color: 'black',
    fontSize: 16,
    textAlign: 'left',
  },
  cardValueText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    textAlign: 'left',
    color: '#576574',
  },
});

export default SplashScreen;
