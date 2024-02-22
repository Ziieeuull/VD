function updateTimer() {
    // Get the start date (January 7, 2024)
    const startDate = new Date('2024-01-07T00:00:00');

    // Get the current date and time
    const currentDate = new Date();

    // Calculate the difference in milliseconds between the start date and current date
    let differenceInMs = currentDate - startDate;

    // Calculate the number of days, hours, minutes, and seconds
    const days = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
    differenceInMs -= days * (1000 * 60 * 60 * 24);
    const hours = Math.floor(differenceInMs / (1000 * 60 * 60));
    differenceInMs -= hours * (1000 * 60 * 60);
    const minutes = Math.floor(differenceInMs / (1000 * 60));
    differenceInMs -= minutes * (1000 * 60);
    const seconds = Math.floor(differenceInMs / 1000);

    // Display the elapsed time with colons
    document.querySelector(".days").textContent = days;
    document.querySelector(".hours").textContent = hours < 10 ? "0" + hours : hours;
    document.querySelector(".minutes").textContent = minutes < 10 ? "0" + minutes : minutes;
    document.querySelector(".seconds").textContent = seconds < 10 ? "0" + seconds : seconds;
}

// Update the timer every second
setInterval(updateTimer, 1000);

// Run the updateTimer function once immediately to display the initial time
updateTimer();
