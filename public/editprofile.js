import { ShowLoggedInUserInfo } from "./MyUtil";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const storage = getStorage();
const storageRef = ref(storage, 'profilePic');
var uploadPicInput = document.querySelector("#uploadProfilePicInput");

uploadPicInput.addEventListener("change", () => {
    UploadProfilePic();
});

window.addEventListener("load", () => {
    DownloadProfilePic();
});

async function UploadProfilePic(){
    const filesList = uploadPicInput.files;
    const uploadPromise = await uploadBytes(storageRef, filesList[0]).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      });
      DownloadProfilePic();
}

async function DownloadProfilePic(){
    getDownloadURL(ref(storage, 'profilePic'))
  .then((url) => {
    // Or inserted into an <img> element
    const img = document.getElementById('profilePic');
    console.log(url);
    sessionStorage.setItem("profilePic", url);
    ShowLoggedInUserInfo();
  })
  .catch((error) => {
    // Handle any errors
  });
}