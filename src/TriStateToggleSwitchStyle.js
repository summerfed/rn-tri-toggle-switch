export default {
  container: {
    width: 120,
    height: 24,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  circle: {
    backgroundColor: '#fff',
    width: 10 * 2,
    height: 10 * 2,
    borderRadius: 10,
    padding: 2,
    position: 'relative'
  },

  formContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  questionText: {
    fontSize: 18,
    color: '#303030',
    alignSelf: 'flex-start'
  },

  toggleSwitch: {
    position: 'absolute',
    top: -30,
    left: -60,
    transform: [{ scale: 0.4 }]
  },

  labelText: {
    fontSize: 15,
    fontWeight: 'bold',
    padding: 5,
    marginLeft: 10,
    color: '#303030',
    position: 'absolute',
    top: 30,
    left: -10
  },

  itemsContainerBackgroundStyle: {
    position: 'absolute',
    height: 66,
    left: 0,
    right: 0,
    top: 0.5,
    marginTop: 15,
    marginLeft: 7.5,
    marginRight: 7.5,
    borderRadius: 33
  },

  touchableStyle: {width: '100%', alignItems: 'center'},
  touchableTextStyle: {color: '#fff'}
}