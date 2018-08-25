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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  questionText: {
    fontSize: 18,
    color: '#303030',
    alignSelf: 'flex-start'
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

  touchableStyle: { width: '100%', alignItems: 'center' },
  touchableTextStyle: { color: '#fff' }
};
