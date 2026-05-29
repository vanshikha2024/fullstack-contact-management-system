const form = document.getElementById("contactForm");
const responseMessage = document.getElementById("responseMessage");
const submitBtn = document.getElementById("submitBtn");

const messageField = document.getElementById("message");
const charCount = document.getElementById("charCount");

// Character Counter
messageField.addEventListener("input", () => {
    charCount.textContent = messageField.value.length;
});

// Form Submit
form.addEventListener("submit", async (e) => {

    e.preventDefault();

    responseMessage.style.display = "none";

    submitBtn.innerHTML = "⏳ Submitting...";
    submitBtn.disabled = true;

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // Validation
    if (!name || !email || !message) {

        responseMessage.style.display = "block";
        responseMessage.innerHTML = "❌ Please fill all fields";

        submitBtn.innerHTML = "Submit";
        submitBtn.disabled = false;

        return;
    }

    if (!email.includes("@")) {

        responseMessage.style.display = "block";
        responseMessage.innerHTML = "❌ Invalid Email";

        submitBtn.innerHTML = "Submit";
        submitBtn.disabled = false;

        return;
    }

    try {

        const response = await fetch("/submit", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name,
                email,
                message
            })
        });

        const result = await response.json();

        responseMessage.style.display = "block";

        if (result.success) {

            responseMessage.innerHTML =
            "✅ Form Submitted Successfully";

            form.reset();
            charCount.textContent = "0";

        } else {

            responseMessage.innerHTML =
            "❌ Database Error";
        }

    } catch (error) {

        console.log(error);

        responseMessage.style.display = "block";
        responseMessage.innerHTML =
        "❌ Server Error";
    }

    submitBtn.innerHTML = "Submit";
    submitBtn.disabled = false;
});