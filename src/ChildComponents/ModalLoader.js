import React, {Component} from 'react';
import {
  Modal,
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {SkypeIndicator} from 'react-native-indicators';

const {width, height} = Dimensions.get('window');

class ModalLoader extends Component {
  render() {
    const {visible} = this.props;
    return (
      <Modal animationType="fade" transparent={true} visible={visible}>
        <TouchableOpacity activeOpacity={1}>
          <View style={styles.modalContainer}>
            <View style={styles.innerModalContainer}>
              <TouchableWithoutFeedback>
                <>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-SemiBold',
                      fontSize: 15,
                      color: 'white',
                      marginBottom: 4,
                    }}>
                    Processing
                  </Text>
                  <View style={styles.parentModal}>
                    <SkypeIndicator color="#3359A8" size={height / 12} />
                  </View>
                </>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  innerModalContainer: {
    borderRadius: 10,
    marginTop: 22,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: '100%',
    height,
    backgroundColor: '#2f364099',
  },
  parentModal: {
    borderRadius: height / 16,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 2,
    width: height / 8,
    height: height / 8,
    elevation: 8,
    backgroundColor: 'white',
  },
  modalTitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
  },
});

export default ModalLoader;
