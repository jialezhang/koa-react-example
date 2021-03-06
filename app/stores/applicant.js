import request from "superagent";

let _applicant = null;
let _changeListeners = [];
let _initCalled = false;

const URLS = {
  APPLICANT: "/applicant",
  GENERATE_CODE: "/generatecode"
};

function generateCode(url, email, done) {
  request.post(url)
         .set("Accept", "application/json")
         .set("Content-Type", "applicant/json")
         .send({ email: email })
         .end(function(err, res) {
           return res.body;
         });
}
const ApplicantStore = {
  init: function() {
    if (_initCalled) {
      return ;
    }
    _initCalled = true;
    this.fetchUser();
  },
  invitationcode: function(email,  done) {
    let code = generateCode(URLS.GENERATE_CODE, email, done);

  },
  notifyChange: function() {
    _changeListeners.forEach(function(listener) {
      listener();
    });
  },
  addChangeListener: function(listener) {
    _changeListeners.push(listener);
  },
  removeChangeListener: function(listener) {
    _changeListeners = _changeListeners.filter(function(l) {
      return listener !== l;
    });
  },
};

export default ApplicantStore;
