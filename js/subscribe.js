document.addEventListener("DOMContentLoaded", function () {
    const subscribeButton = document.getElementById("subscribe");
    const emailInput = document.getElementById("email-4");

    // Event listener for pressing Enter key in the email input field
    emailInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent form submission
            subscribe(); // Call the subscribe function
        }
    });

    // Event listener for clicking or pressing on the subscribe button
    subscribeButton.addEventListener("pointerdown", function (event) {
        event.preventDefault(); // Prevent default action for pointerdown event
        subscribe(); // Call the subscribe function
    });

    // Function to handle subscription process
    function subscribe() {
        const emailValue = emailInput.value.trim();

        if (!emailValue) {
            alert("Please enter your email.");
            return;
        }

        const formData = {
            email: emailValue
        };

        // Make a POST request to the /subscribe endpoint
        fetch("http://webserver.transpify.com/api/v1/subscribe", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to subscribe. Please try again later.");
                }
                return response.json();
            })
            .then(data => {
                alert("Subscription successful!");
                emailInput.value = "";
                // You can optionally perform any additional actions here after successful subscription
            })
            .catch(error => {
                alert(error.message);
            });
    }
});
