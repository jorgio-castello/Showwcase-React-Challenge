const AppStyles = {
  container: "flex h-screen container mx-auto lg:max-w-6xl max-w-lg justify-center items-center py-10",
}

const IntroStyles = {
  container: "mx-auto lg:w-3/4 w-11/12 p-5 rounded-lg shadow-lg border border-solid border-gray-100",
  headerContainer: "w-full text-center h-32",
  headerGreeting: "text-3xl font-light text-gray-700",
  headerWelcome: "text-lg font-light text-gray-500",
  projectNotes: "leading-10 h-64 lg:pl-10 font-light",
  gitHubLink: "text-blue-500",
  form: "flex flex-col lg:h-64 h-32 justify-center items-center",
  formFields: "w-64 flex items-center mb-2 leading-tight",
  submitButton: "bg-teal-400 w-64 py-4 text-lg text-white rounded-lg",
}

const CreateUserStyles = {
  container: "flex flex-col lg:w-2/3 w-full justify-center items-center",
  headerContainer: "h-32 text-center",
  headerTitle: "text-2xl font-light text-gray-700",
  headerMessage: "text-sm font-light text-gray-500",
  form: "flex items-center border-b border-teal-500 py-2 w-3/4",
  nameInput: "appearance-none bg-transparent border-non w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none",
  submitButton: "flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded",
}

const MainStyles = {
  container: "h-full mx-auto w-full p-5",
  welcomeMessage: "text-2xl mb-2 font-hairline text-gray-500",
  createEducationButton: "bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded mb-8",
  sidePanelContainer: "flex h-auto mt-5 justify-around",
  sidePanelResponiveCondition: "lg:inline-flex lg:flex-col hidden p-2",
  sidePanelElement: "bg-gray-400 px-5 text-white py-2 rounded-full shadow-lg mb-2 text-center",
  educationCardContainer: "flex flex-col lg:w-2/3 w-full justify-center",
  cardContainer: "rounded-lg shadow-xl border border-solid border-gray-100 p-5 w-11/12 mb-5",
  cardHeaderContainer: "flex justify-between",
  educationDetailsContainer: "flex flex-col justify-between items-start",
  schoolStyles: "text-lg text-gray-700 font-light",
  degreeStyles: "text-sm text-gray-500 font-hairline",
  dateStyles: "text-gray-500 font-hairline",
  descriptionStyles: "flex flex-wrap text-gray-600 font-thin my-5",
  editButton: "flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-5 rounded mt-16"
}

const ModalStyles = {
  autoCompleteActiveBtn: "text-left appearance-none bg-teal-100 leading-tight focus:outline-none p-3 w-full text-teal-600 font-light",
  autoCompleteInactiveBtn: "text-left appearance-none bg-white leading-tight focus:outline-none p-3 w-full text-gray-500 font-light",
  autoCompleteContainer: "fixed rounded-lg shadow-lg max-w-md w-1/2",
  container: "flex w-full bg-gray-300 bg-opacity-50 z-10 absolute top-0 left-0 h-screen items-center justify-center",
  form: "lg:w-5/12 w-3/4 bg-white p-10 rounded-lg",
  addEducation: "inline-flex bg-gray-400 rounded-full px-5 py-2 mb-5 text-white font-light",
  inputContainer: "flex items-center border-b border-teal-300 py-2 w-full mb-3",
  descriptionContainer: "flex items-center border-b border-teal-300 py-2 w-full mt-8",
  inputStyling: "appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none placeholder-gray-400 font-light",
  rangeContainer: "flex mt-5 lg:w-1/2 w-full justify-between mb-3",
  rangeButton: "bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 w-20 rounded text-right font-light",
  labelStyles: "text-teal-500 font-light pl-2",
  submitButton: "flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-10 rounded mt-16",
  deleteButton: "ml-2 flex-shrink-0 bg-red-600 hover:bg-red-700 border-red-600 hover:border-red-700 text-sm border-4 text-white py-1 px-10 rounded mt-16",
}

export { AppStyles, IntroStyles, CreateUserStyles, MainStyles, ModalStyles };