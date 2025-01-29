import { useNavigate } from "react-router-dom";
import axios from "../../Axios/axios";
import React, { useEffect } from "react";

const SignInButton = ({ number }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Ensure phone number is present before script execution
    if (!number) {
      console.error("Phone number is missing");
    //   return;
    }

    // Create the external script element
    const script = document.createElement("script");
    script.src = "https://www.phone.email/sign_in_button_v1.js?number=94250";
    script.async = true;

    // Ensure the script is appended once the element is available
    const buttonElement = document.querySelector(".pe_signin_button");

    if (buttonElement) {
      buttonElement.appendChild(script);
    } else {
      console.error("Sign-in button element not found");
    }

    // Define the listener function after the script is loaded
    script.onload = () => {
      console.log("Phone email script loaded successfully.");

      // Try to manually set the phone number (if the API allows)
      const phoneInput = document.querySelector(".pe_signin_button input[type='tel']");
      if (phoneInput && number) {
        phoneInput.value = number;  // Attempt to manually set the phone number
      }

      // Set up the listener function
      window.phoneEmailListener = async function (userObj) {
        const user_json_url = userObj.user_json_url;

        try {
          // Send user_json_url to your backend using axios
          const response = await axios.post("/user/verify-user", {
            user_json_url,
          });

          if (response.status === 200) {
            console.log("User verification data sent successfully");
            navigate("/");  // Navigate to homepage upon success
          } else {
            console.error("Failed to send user verification data", response);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };
    };

    script.onerror = () => {
      console.error("Failed to load the Phone.Email script");
    };

    // Clean up the listener when the component unmounts
    return () => {
      window.phoneEmailListener = null;
    };
  }, [navigate, number]);

  return (
    <div
    className="pe_signin_button"
    data-client-id="14604034181908959338"
    data-phone-number={number} // Dynamically pass phone number
  ></div>
  );
};

export default SignInButton;
