import { ShowLoggedInUserInfo, DownloadProfilePic } from "./MyUtil";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const storage = getStorage();
const storageRef = ref(storage, 'profilePic');
var uploadPicInput = document.querySelector("#uploadProfilePicInput");


window.addEventListener("load", () => {
  //imported function displays current User
  ShowLoggedInUserInfo();
});

uploadPicInput.addEventListener("change", () => {
    //local function stores new picture
    UploadProfilePic();
});

async function UploadProfilePic(){
    const filesList = uploadPicInput.files;
    const uploadPromise = await uploadBytes(storageRef, filesList[0]).then((snapshot) => {
        //console.log('Uploaded a blob or file!');
      });
      DownloadProfilePic(storageRef);
}

