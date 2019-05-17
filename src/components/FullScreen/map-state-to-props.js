const mapStateToProps = ({ main }) => ({
  isUserInteractionAllowed: main.isUserInteractionAllowed,
  fullScreenText: main.fullScreenText,
  uiMode: main.uiMode
})

export default mapStateToProps
