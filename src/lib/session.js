export class Session {
  key = "session-issue-tracker-react";
  blank = {
    Name: "",
    UserName: "",
    Token: "",
    UUID: "",
    SessionId: "",
    signedIn: false
  };
  data = {};

  constructor() {
    this.loadData();
  }

  getData() {
    return this.data;
  }

  storeData() {
    sessionStorage.setItem(this.key, JSON.stringify(this.data));
  }

  loadData() {
    const loaded = sessionStorage.getItem(this.key);
    if (loaded) {
      this.data = JSON.parse(loaded);
    } else {
      this.data = JSON.parse(JSON.stringify(this.blank));
    }
  }

  logout() {
    sessionStorage.removeItem(this.key);
  }

  login(response = {}) {
    this.data = response;
    this.data.signedIn = true;
    this.storeData();
  }
}
