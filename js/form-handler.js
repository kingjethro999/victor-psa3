// Form validation and submission script
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Show loading state
      const submitButton = contactForm.querySelector('button[type="submit"]')
      const originalButtonText = submitButton.textContent
      submitButton.textContent = "Sending..."
      submitButton.disabled = true

      // Get form data
      const formData = new FormData(contactForm)
      const formObject = {}
      formData.forEach((value, key) => {
        formObject[key] = value
      })

      // Send data to PHP backend
      fetch("/api/contact.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formObject),
      })
        .then((response) => response.json())
        .then((data) => {
          // Create or get status message element
          let statusMessage = document.getElementById("formStatusMessage")
          if (!statusMessage) {
            statusMessage = document.createElement("div")
            statusMessage.id = "formStatusMessage"
            contactForm.insertBefore(statusMessage, submitButton.parentNode)
          }

          // Display success or error message
          if (data.success) {
            statusMessage.className = "p-3 rounded-md bg-green-100 text-green-800 mb-4"
            statusMessage.textContent = data.message
            contactForm.reset()
          } else {
            statusMessage.className = "p-3 rounded-md bg-red-100 text-red-800 mb-4"
            statusMessage.textContent = data.message || "Something went wrong. Please try again."
          }

          // Reset button state
          submitButton.textContent = originalButtonText
          submitButton.disabled = false
        })
        .catch((error) => {
          // Handle network errors
          let statusMessage = document.getElementById("formStatusMessage")
          if (!statusMessage) {
            statusMessage = document.createElement("div")
            statusMessage.id = "formStatusMessage"
            contactForm.insertBefore(statusMessage, submitButton.parentNode)
          }

          statusMessage.className = "p-3 rounded-md bg-red-100 text-red-800 mb-4"
          statusMessage.textContent = "An error occurred. Please try again or contact us directly."

          // Reset button state
          submitButton.textContent = originalButtonText
          submitButton.disabled = false
        })
    })
  }
})
