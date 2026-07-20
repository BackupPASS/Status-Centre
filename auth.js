// auth.js

import { auth } from "./firebase.js";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signOut,
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";



const CSS = `
#vintiAuthOverlay .auth-msg,
#vPwOverlay .auth-msg{
  display: none;
  margin: 0 0 10px 0;
  padding: 10px 12px;
  border-radius: 12px;
  font-size: 12px;
  line-height: 1.35;
  border: 1px solid rgba(255,255,255,.12);
  background: rgba(0,0,0,.22);
  color: #e8f0ff;
}

#vintiAuthOverlay .auth-msg.bad,
#vPwOverlay .auth-msg.bad{
  border-color: rgba(239,68,68,.40);
  background: rgba(239,68,68,.14);
  box-shadow: 0 10px 24px rgba(239,68,68,.06);
}

#vintiAuthOverlay .auth-msg.good,
#vPwOverlay .auth-msg.good{
  border-color: rgba(34,197,94,.40);
  background: rgba(34,197,94,.14);
  box-shadow: 0 10px 24px rgba(34,197,94,.06);
}

#vintiAuthOverlay,
#vPwOverlay{
  position: fixed;
  inset: 0;
  z-index: 2147483647;
  display: none;         
  align-items: center;
  justify-content: center;
  padding: 18px;
  background: rgba(0,0,0,.55);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

#vintiAuthOverlay *,
#vPwOverlay *{
  box-sizing: border-box;
}

#vintiAuthOverlay .auth-card,
#vPwOverlay .auth-card{
  width: min(520px, 100%);
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,.12);
  background: rgba(0,0,0,.35);
  box-shadow: 0 10px 30px rgba(0,0,0,.35);
  padding: 14px;
  color: #e8f0ff;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, "Helvetica Neue", Arial, sans-serif;
}

#vintiAuthOverlay .auth-top,
#vPwOverlay .auth-top{
  display:flex;
  flex-direction: column;
  gap: 12px;
  padding: 10px 10px 14px 10px;
  border-bottom: 1px solid rgba(255,255,255,.12);
}

#vintiAuthOverlay .auth-brand,
#vPwOverlay .auth-brand{
  display:flex;
  gap: 10px;
  align-items: center;
}

#vintiAuthOverlay .auth-brand img,
#vPwOverlay .auth-brand img{
  width: 34px;
  height: 34px;
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,.12);
  background: rgba(0,0,0,.22);
  object-fit: cover;
}

#vintiAuthOverlay .auth-title,
#vPwOverlay .auth-title{
  font-size: 18px;
  letter-spacing: .2px;
  font-weight: 700;
}

#vintiAuthOverlay .auth-sub,
#vPwOverlay .auth-sub{
  color: rgba(255,255,255,.8);
  font-size: 12px;
}

#vintiAuthOverlay .auth-sub a,
#vPwOverlay .auth-sub a{
  color: inherit;         
  text-decoration: underline;
}

#vintiAuthOverlay .auth-sub a:hover,
#vPwOverlay .auth-sub a:hover{
  opacity: .85;         
}

#vintiAuthOverlay .auth-tabs,
#vPwOverlay .auth-tabs{
  display:flex;
  gap: 8px;
  flex-wrap: wrap;
}

#vintiAuthOverlay .auth-tab,
#vPwOverlay .auth-tab{
  all: unset;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,.12);
  background: rgba(255,255,255,.06);
  font-size: 12px;
  color: #e8f0ff;
  line-height: 1;          
  display: inline-flex; 
  align-items: center;
  justify-content: center;
}

#vintiAuthOverlay .auth-tab.active,
#vPwOverlay .auth-tab.active{
  background: rgba(90,200,250,.14);
  border-color: rgba(255,255,255,.18);
}

#vintiAuthOverlay .auth-body,
#vPwOverlay .auth-body{
  padding: 14px 14px 12px 14px;
}

#vintiAuthOverlay .auth-label,
#vPwOverlay .auth-label{
  display:block;
  margin: 10px 0 6px;
  font-size: 12px;
  color: rgba(255,255,255,.8);
}

#vintiAuthOverlay .auth-input,
#vPwOverlay .auth-input{
  width: 100%;
  display:block;
  margin: 0;            
  padding: 10px 12px;
  border-radius: 12px;
  outline: none;
  border: 1px solid rgba(255,255,255,.12);
  background: rgba(0,0,0,.22);
  color: #e8f0ff;
}

#vintiAuthOverlay .auth-input:focus,
#vPwOverlay .auth-input:focus{
  border-color: rgba(90,200,250,.35);
}

#vintiAuthOverlay .auth-actions,
#vPwOverlay .auth-actions{
  display:flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  flex-wrap: wrap;
}

#vintiAuthOverlay .auth-divider,
#vPwOverlay .auth-divider{
  height: 1px;
  background: rgba(255,255,255,.12);
  margin: 12px 0;
}

#vintiAuthOverlay .auth-msg,
#vPwOverlay .auth-msg{
  border: 1px solid rgba(255,255,255,.12);
  background: rgba(0,0,0,.22);
  padding: 10px 12px;
  border-radius: 12px;
  font-size: 12px;
  color: #e8f0ff;
  display:none;
}

#vintiAuthOverlay .btn,
#vPwOverlay .btn{
  all:unset;
  cursor:pointer;
  background: transparent;
  color:#fff;
  padding:10px 14px;
  border-radius:10px;
  font-size:14px;
  border:1px solid rgba(255,255,255,.12);
  transition: background .18s ease, transform .12s ease;
  user-select:none;
  display:inline-flex;
  align-items:center;
  justify-content:center;
}

#vintiAuthOverlay .btn:hover,
#vPwOverlay .btn:hover{
    background: rgba(255,255,255,.06);
    box-shadow: 0 10px 22px rgba(0,0,0,.20);
}

#vintiAuthOverlay .btn:active,
#vPwOverlay .btn:active{
  transform: translateY(0px) scale(.98);
}

#vintiAuthOverlay .btn.danger,
#vPwOverlay .btn.danger{
  border-color: rgba(239,68,68,.35);
  background: rgba(239,68,68,.15);
}

#vintiAuthOverlay .btn.warn,
#vPwOverlay .btn.warn{
  border-color: rgba(251,191,36,.35);
  background: rgba(251,191,36,.15);
}

body.app-locked > :not(#vintiAuthOverlay):not(#vPwOverlay){
  filter: blur(6px);
  pointer-events: none;
  user-select: none;
}

    @font-face {
      font-family: 'Alba';
      src: url('ALBA____.TTF') format('truetype');
    }
    @font-face {
      font-family: 'Albas';
      src: url('ALBAS___.TTF') format('truetype');
    }

    .btn.ghost{
      background:transparent;
      box-shadow: none;
    }
    .btn.ghost:hover{
      background: rgba(255,255,255,.06);
      box-shadow: 0 10px 22px rgba(0,0,0,.20);
    }

    .btn.ghost:active{
  transform: translateY(0px) scale(.98);
}

#deleteAccountOverlay{
  position: fixed;
  inset:0;
  z-index:2147483647;
  display:none;
  align-items:center;
  justify-content:center;
  padding:18px;
  background:rgba(0,0,0,.55);
  backdrop-filter:blur(10px);
}


#deleteAccountOverlay .auth-card{
  width:min(520px,100%);
}


#deleteAccountOverlay .tp-warning{
  border:1px solid rgba(239,68,68,.35);
  background:rgba(239,68,68,.12);
  padding:14px;
  border-radius:14px;
}


#deleteAccountOverlay .tp-warning-title{
  font-weight:700;
  color:#fee2e2;
  margin-bottom:8px;
}


#deleteAccountOverlay .tp-warning-text{
  font-size:13px;
  color:#fee2e2;
}
`;



function injectCSS() {

  if (document.getElementById('vintiAuthCSS')) return;

  const s = document.createElement('style');

  s.id = 'vintiAuthCSS';

  s.textContent = CSS;

  (document.head || document.documentElement).appendChild(s);

}




function ensureOverlay() {

  if (document.getElementById('vintiAuthOverlay')) return;


  const ov = document.createElement('div');

  ov.id = 'vintiAuthOverlay';


  ov.innerHTML = `

    <div class="auth-card">

      <div class="auth-top">

        <div style="display:flex; justify-content:space-between; align-items:center; width:100%;">

          <div class="auth-brand">

            <img src="PlingifyPlugLogo.png" alt="PlingifyPlug"/>

            <div>

              <div class="auth-title" style="font-family:'Alba',sans-serif;">
                PlingifyPlug Account
              </div>

              <div class="auth-sub" id="vAccountSubtitle">
               Sign In or Register to access PlingifyPlug
              </div>

            </div>

          </div>


          <div style="display:flex; gap:6px;">

            <button id="auth-close" class="btn ghost">
              ✕
            </button>

          </div>


        </div>


        <div class="auth-tabs">

          <button class="auth-tab active" id="vTabSignIn">
            Sign In
          </button>

          <button class="auth-tab" id="vTabCreate">
            Register
          </button>


        </div>


      </div>

<div class="auth-body">


  <div class="auth-msg" id="vAuthMsg"></div>


  <!-- Logged out view -->
  <div id="vLoggedOutContent">

    <label class="auth-label">
      Email
    </label>

    <input 
      class="auth-input"
      id="vAuthEmail"
      type="email"
      placeholder="name@example.com"
    >


    <label class="auth-label">
      Password
    </label>

    <input 
      class="auth-input"
      id="vAuthPass"
      type="password"
      placeholder="••••••••"
    >


    <div class="auth-actions">

      <button class="btn ghost" id="vBtnResetPw">
        Reset password
      </button>

      <div style="flex:1"></div>

      <button class="btn ghost" id="vBtnGo">
        Continue
      </button>

    </div>

    <div class="auth-divider"></div>

    <div class="auth-sub" style="margin-top:10px;">
          By continuing you agree to the Vinti's & the Account<a href="https://plingifyplug.odoo.com/Privacy"> ToS and Privacy Policy</a>.
        </div>

  </div>



  <!-- Logged in view -->
  <div id="vLoggedInContent" style="display:none;">


    <label class="auth-label">
      Signed in as
    </label>


    <div 
      class="auth-input" 
      id="vAccountEmail"
    >
      Email
    </div>


    <div class="auth-actions">

      <button 
        class="btn ghost" 
        id="vBtnResetPwLogged"
      >
        Reset password
      </button>

    </div>



    <div class="auth-divider"></div>



    <div class="auth-actions">


      <button 
        class="btn ghost danger"
        id="vBtnDeleteMeLogged"
      >
        Delete my account
      </button>


      <div style="flex:1"></div>


      <button 
        class="btn"
        id="vBtnSignOutLogged"
      >
        Sign out
      </button>


    </div>


  </div>


</div>

<div id="deleteAccountOverlay" style="display:none;">

  <div class="auth-card auth-style">

    <div class="auth-top">

      <div class="auth-brand">

        <img src="PlingifyPlugLogo.png" alt="PlingifyPlug">

        <div>

          <div class="auth-title">
            Delete Account?
          </div>

          <div class="auth-sub">
            Permanently remove your PlingifyPlug account
          </div>

        </div>

      </div>

    </div>


    <div class="auth-body">


      <div class="tp-warning" style="display:block;">

        <div class="tp-warning-title">
          Are you sure?
        </div>


        <div class="tp-warning-text">

          This action cannot be undone.

          <br><br>

          Deleting your account will remove:

          <ul style="margin:8px 0 0 16px; padding:0;">
            <li>Your authentication account</li>
            <li>Your saved account data</li>
            <li>Access to PlingifyPlug services</li>
          </ul>


<div style="margin-top:12px;">
  Please wait <b id="deleteCountdown">3</b> seconds before confirming.
</div>


<div id="deletePasswordBox" style="display:none; margin-top:14px;">

  <label class="auth-label">
    Confirm your password
  </label>

  <input
    class="auth-input"
    id="deletePasswordInput"
    type="password"
    placeholder="••••••••"
  >

</div>

        </div>

      </div>



      <div class="auth-actions">


        <button class="btn ghost" id="btnDeleteCancel">
          Cancel
        </button>


        <div style="flex:1"></div>


        <button 
          class="btn danger" 
          id="btnDeleteConfirm"
          disabled
        >
          Delete Account
        </button>


      </div>


    </div>


  </div>

</div>

  `;


  document.body.appendChild(ov);



const emailInput = document.getElementById("vAuthEmail");
const passInput = document.getElementById("vAuthPass");

const msg = document.getElementById("vAuthMsg");

const btnGo = document.getElementById("vBtnGo");

const btnReset = document.getElementById("vBtnResetPw");
const btnResetLogged = document.getElementById("vBtnResetPwLogged");

const btnSignOut = document.getElementById("vBtnSignOutLogged");
const btnDelete = document.getElementById("vBtnDeleteMeLogged");

const btnDeleteCancel = document.getElementById("btnDeleteCancel");
const btnDeleteConfirm = document.getElementById("btnDeleteConfirm");

const tabSign = document.getElementById("vTabSignIn");
const tabRegister = document.getElementById("vTabCreate");

const closeBtn = document.getElementById("auth-close");


let registerMode = false;



function showMessage(text, type){

  msg.textContent = text;
  msg.className = "auth-msg " + type;
  msg.style.display = "block";

}



closeBtn.onclick = () => {

  ov.style.display = "none";

};

btnDeleteCancel.onclick = ()=>{

  document.getElementById("deleteAccountOverlay").style.display = "none";

};


tabSign.onclick = () => {

  registerMode = false;

  tabSign.classList.add("active");
  tabRegister.classList.remove("active");

  btnGo.textContent = "Continue";

  msg.style.display = "none";

};



tabRegister.onclick = () => {

  registerMode = true;

  tabRegister.classList.add("active");
  tabSign.classList.remove("active");

  btnGo.textContent = "Register";

  msg.style.display = "none";

};



btnGo.onclick = async () => {


  try {


    if(registerMode){


      await createUserWithEmailAndPassword(
        auth,
        emailInput.value,
        passInput.value
      );


      showMessage(
        "Account created successfully.",
        "good"
      );


    } else {


      await signInWithEmailAndPassword(
        auth,
        emailInput.value,
        passInput.value
      );


      showMessage(
        "Signed in successfully.",
        "good"
      );


    }


  } catch(error){


    showMessage(
      error.message,
      "bad"
    );


  }


};

async function resetPassword(){

  try {

    let email;

    if(auth.currentUser){
      email = auth.currentUser.email;
    } else {
      email = emailInput.value;
    }


    await sendPasswordResetEmail(
      auth,
      email
    );


    showMessage(
      "Password reset email sent.",
      "good"
    );


  } catch(error){

    showMessage(
      error.message,
      "bad"
    );

  }

}


btnReset.onclick = resetPassword;
btnResetLogged.onclick = resetPassword;


btnSignOut.onclick = async () => {

  await signOut(auth);

  showMessage(
    "Signed out.",
    "good"
  );

};

btnDelete.onclick = () => {

  const overlay = document.getElementById("deleteAccountOverlay");

  overlay.style.display="flex";


  let seconds = 3;

const countdown = document.getElementById("deleteCountdown");
const confirm = document.getElementById("btnDeleteConfirm");
const passwordBox = document.getElementById("deletePasswordBox");


confirm.disabled = true;


const timer = setInterval(()=>{

  seconds--;

  countdown.textContent = seconds;


  if(seconds <= 0){

    clearInterval(timer);


    passwordBox.style.display = "block";


    confirm.disabled = false;

    confirm.textContent = "Delete Account";

  }


},1000);

};

btnDeleteConfirm.onclick = async ()=>{

  const user = auth.currentUser;

  if(!user) return;


  const password = document.getElementById("deletePasswordInput").value;


  try {


    const credential = EmailAuthProvider.credential(
      user.email,
      password
    );


    await reauthenticateWithCredential(
      user,
      credential
    );


    await deleteUser(user);


    document.getElementById("deleteAccountOverlay").style.display="none";


    showMessage(
      "Account deleted.",
      "good"
    );


  } catch(error){


    showMessage(
      error.message,
      "bad"
    );


  }

};
}



injectCSS();
ensureOverlay();

document.getElementById("auth-close").onclick = () => {
    document.getElementById("vintiAuthOverlay").style.display="none";
};


const accountButton = document.getElementById("accountButton");


document.getElementById("accountButton").onclick = () => {

    document.getElementById("vintiAuthOverlay").style.display="flex";

};



onAuthStateChanged(auth,(user)=>{

    const loggedOut = document.getElementById("vLoggedOutContent");
    const loggedIn = document.getElementById("vLoggedInContent");
    const accountEmail = document.getElementById("vAccountEmail");
    const accountButton = document.getElementById("accountButton");
    const accountSubtitle = document.getElementById("vAccountSubtitle");

    const authTabs = document.querySelector(".auth-tabs");


    if(user){

        // Change top button
        accountButton.textContent = user.email;

        accountSubtitle.textContent = "Manage your PlingifyPlug account settings";

        authTabs.style.display = "none";

        // Show account page
        loggedOut.style.display = "none";
        loggedIn.style.display = "block";


        // Show email
        accountEmail.textContent = user.email;


    } else {

        authTabs.style.display = "flex";


        // Change top button
        accountButton.textContent = "Account";


        // Show login page
        loggedOut.style.display = "block";
        loggedIn.style.display = "none";
        
        accountSubtitle.textContent = "Sign In or Register to access PlingifyPlug";

    }

});
