export default (state) => ({
  isLoaded: () => state.auth.isLoaded,
  getCredentials: () => state.auth.credentials
})
