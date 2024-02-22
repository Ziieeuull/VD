function popUp(ticket) {
    ticket.classList.add('pop');
    setTimeout(() => {
        ticket.classList.remove('pop');
    }, 1000); // Adjust the duration of the pop-up effect as needed (in milliseconds)
}
