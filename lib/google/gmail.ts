const { NEXT_PUBLIC_GOOGLE_ID } = process.env;
const { NEXT_PUBLIC_GOOGLE_API_KEY } = process.env;

const discoveryDocs = [
  "https://people.googleapis.com/$discovery/rest?version=v1",
];

// Enter one or more authorization scopes. Refer to the documentation for
// the API or https://developers.google.com/people/v1/how-tos/authorizing
// for details.
const scopes = "email";

class DoreanGAPI {
  authorizeButton;
  signoutButton;

  constructor() {}

  handleClientLoad = () => {
    // Load the API client and auth2 library
    gapi.load("client:auth2", this.initClient);
  };

  public initClient() {
    console.log("initClient");
    gapi.client
      .init({
        apiKey: NEXT_PUBLIC_GOOGLE_API_KEY,
        clientId: NEXT_PUBLIC_GOOGLE_ID,
        discoveryDocs: discoveryDocs,
        scope: scopes,
      })
      .then(() => {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);

        // Handle the initial sign-in state.
        this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());

        this.authorizeButton.onclick = this.handleAuthClick;
        this.signoutButton.onclick = this.handleSignoutClick;
      });
  }

  updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
      this.authorizeButton.style.display = "none";
      this.signoutButton.style.display = "block";
      this.makeApiCall();
    } else {
      this.authorizeButton.style.display = "block";
      this.signoutButton.style.display = "none";
    }
  }

  handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
  }

  handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
  }

  // Load the API and make an API call.  Display the results on the screen.
  makeApiCall() {
    gapi.client.people.people
      .get({
        resourceName: "people/me",
        "requestMask.includeField": "person.names",
      })
      .then((resp) => {
        const p = document.createElement("p");
        const name = resp.result.names[0].givenName;
        p.appendChild(document.createTextNode(`Hello, ${name}!`));
        document.getElementById("content").appendChild(p);
      });
  }
}

const doreanGAPI = new DoreanGAPI();
export default doreanGAPI;
