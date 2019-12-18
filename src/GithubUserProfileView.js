import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
  BackHandler,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import ModalLoader from './ChildComponents/ModalLoader';
import moment from 'moment';

const {width, height} = Dimensions.get('window');

class GithubUserProfileView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      reposArray: [],
      gistsArray: [],
      repoActive: true,
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack();
    });
    const {user} = this.props.navigation.state.params;
    this.fetchDetailsOfGitUser(user);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack();
    });
  }

  fetchDetailsOfGitUser = user => {
    this.setState({
      loader: true,
    });
    const urls = [user.repos_url, user.url + '/gists'];
    fetch(urls[0], {
      headers: {
        'Access-Control-Allow-Origin': true,
        'Content-type': 'application/json',
      },
      method: 'GET',
    })
      .then(res => res.json())
      .then(response => {
        this.setState({
          reposArray: response,
        });
        console.log(response);
      })
      .catch(err => {
        this.setState({
          loader: false,
        });
        console.log(err);
      });
    fetch(urls[1], {
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
          gistsArray: response,
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

  renderRepos() {
    if (this.state.reposArray.length == 0) {
      return <Text style={{width}}>No records</Text>;
    }
    return this.state.reposArray.map((user, idx) => {
      return (
        <View style={styles.cardView}>
          <Image
            source={{uri: user.owner.avatar_url}}
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
              <Text style={styles.cardTitleText}>Repo Name : </Text>
              <Text style={styles.cardValueText}>{user.name}</Text>
            </View>
            <View style={styles.textView}>
              <Text numberOfLines={1} style={styles.cardTitleText}>
                Full Name :{' '}
              </Text>
              <Text numberOfLines={1} style={styles.cardValueText}>
                {user.full_name}
              </Text>
            </View>
          </View>
          <Entypo name="chevron-right" color="#d2dae2" size={25} />
        </View>
      );
    });
  }

  renderGists() {
    if (this.state.gistsArray.length == 0) {
      return <Text style={{width}}>No records</Text>;
    }
    return this.state.gistsArray.map((user, idx) => {
      return (
        <View style={styles.cardView}>
          <Image
            source={{uri: user.owner.avatar_url}}
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
              <Text numberOfLines={1} style={styles.cardTitleText}>
                Created :
              </Text>
              <Text numberOfLines={1} style={styles.cardValueText}>
                {moment(user.created_at).format('MMMM Do YYYY, h:mm a')}
              </Text>
            </View>
            <View style={styles.textView}>
              <Text numberOfLines={1} style={styles.cardTitleText}>
                Updated :
              </Text>
              <Text numberOfLines={1} style={styles.cardValueText}>
                {moment(user.updated_at).format('MMMM Do YYYY, h:mm a')}
              </Text>
            </View>
            <View style={styles.textView}>
              <Text style={styles.cardTitleText}>Total Comments: </Text>
              <Text style={styles.cardValueText}>{user.comments}</Text>
            </View>
          </View>
          <Entypo name="chevron-right" color="#d2dae2" size={25} />
        </View>
      );
    });
  }

  changeMode = arg => {
    if (arg == 1) {
      this.setState({
        repoActive: false,
      });
      this.refs.bottomView.scrollTo({x: width, y: 0, animated: true});
    } else {
      this.setState({
        repoActive: true,
      });
      this.refs.bottomView.scrollTo({x: 0, y: 0, animated: true});
    }
  };

  render() {
    const {loader, repoActive} = this.state;
    const {user} = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <ModalLoader visible={loader} />
        <LinearGradient
          colors={['#ffffff', '#209FCD70']}
          style={styles.linearGradient}>
          <Image
            source={{uri: user.avatar_url}}
            style={styles.imageStyle}
            resizeMode="cover"
          />
          <Text style={{marginTop: 10, fontFamily: 'Montserrat-SemiBold'}}>
            {user.login}
          </Text>
          <Text
            onPress={() => Linking.openURL(user.html_url)}
            style={{marginTop: 10, fontFamily: 'Montserrat-SemiBold'}}>
            {user.html_url}
          </Text>
        </LinearGradient>
        <View style={{width, flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => this.changeMode(2)}
            style={{
              width: width / 2,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 12,
              backgroundColor: repoActive ? '#54a0ff' : 'gray',
              borderRightWidth: 1,
              elevation: repoActive ? 4 : 0,
            }}>
            <Text style={styles.btnTitle}>Repositories</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.changeMode(1)}
            style={{
              width: width / 2,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 12,
              backgroundColor: !repoActive ? '#54a0ff' : 'gray',
              borderLeftWidth: 1,
              elevation: !repoActive ? 4 : 0,
            }}>
            <Text style={styles.btnTitle}>Gists</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          ref="bottomView"
          horizontal
          pagingEnabled
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {this.renderRepos()}
          </ScrollView>
          <ScrollView showsVerticalScrollIndicator={false}>
            {this.renderGists()}
          </ScrollView>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  linearGradient: {
    width,
    height: height / 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 8,
    borderColor: '#bdc3c7',
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
  inActiveTabText1: {
    fontSize: 12,
    fontFamily: 'Montserrat-SemiBold',
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
  imageStyle: {
    width: width / 4,
    height: width / 4,
    borderRadius: width / 8,
    backgroundColor: 'white',
  },
  btnTitle: {
    color: 'white',
    fontFamily: 'Montserrat-SemiBold',
  },
});

export default GithubUserProfileView;
