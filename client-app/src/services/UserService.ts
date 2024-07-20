/**
 * Author: Bhavisha Oza
 * Banner ID: B00935827
 */
import { postData, putData , getData} from "./utils";

export async function loginUser(userData: any) {
  try {
    const response = await postData(JSON.stringify(userData), "/auth/login");
    return response;
  } catch (error) {
    console.error("Error adding user:", error);
    return null;
  }
}

export async function registerUser(userData: any) {
  try {
    const response = await postData(JSON.stringify(userData), "/auth/register");
    return response;
  } catch (error) {
    console.error("Error adding user:", error);
    return null;
  }
}

export async function sendVerificationLink(emailData: any) {
  try {
    const response = await postData(
      JSON.stringify(emailData),
      "/auth/send-verification"
    );
    return response;
  } catch (error) {
    console.error("Error adding user:", error);
    return null;
  }
}

export async function resetPassword(userData: any) {
  try {
    const response = await postData(
      JSON.stringify(userData),
      "/auth/reset-password"
    );
    return response;
  } catch (error) {
    console.error("Error adding user:", error);
    return null;
  }
}

export async function updateUser(userId: string, userData: any) {
  try {
    const response = await putData(
      JSON.stringify(userData),
      "/user/update/" + userId
    );
    return response;
  } catch (error) {
    console.error("Error updating user: ", error);
    return null;
  }
}

export async function emailSend(emailData: any) {
  try {
    const response = await postData(
      JSON.stringify(emailData),
      "/user/send-email/"
    );
    return response;
  } catch (error) {
    console.error("Error Sending email: ", error);
    return null;
  }
}

export async function getUserNamebyId(userId: string) {
  try {
      const response = await getData("/user/get-user-name/" + userId);
      return response;
  } catch (error) {
      console.error("Error getting event:", error);
      return null;
  }
}
