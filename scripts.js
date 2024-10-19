document.addEventListener('DOMContentLoaded', () => {
    const commandInput = document.getElementById('commandInput');
    const outputDiv = document.getElementById('output');

    // Handle Enter key press in input
    commandInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') { // Check if the Enter key was pressed
            const command = commandInput.value.trim(); // Get and trim the input
            processCommand(command); // Process the command
            commandInput.value = ''; // Clear the input field
        }
    });

    // Handle suggestion button clicks
    const suggestionButtons = document.querySelectorAll('.suggestion-btn');
    suggestionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const command = this.getAttribute('data-command'); // Get the command from data attribute
            commandInput.value = command; // Set the input value to the command
            commandInput.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' })); // Simulate Enter key press
            commandInput.focus(); // Set focus back to the input field
        });
    });

    function processCommand(command) {
        let output = '';

        switch (command.toLowerCase()) {
            case 'help':
                output = 'Available commands:\n- help: Display this help message\n- clear: Clear the output\n- hello: Greet the user';
                break;
            case 'clear':
                outputDiv.textContent = ''; // Clear the output
                return; // Exit function early
            case 'hello':
                output = 'Hello, user! How can I assist you today?';
                break;
            default:
                output = `Command not recognized: ${command}`; // Handle unknown commands
        }

        // Display the command and output in the output area
        outputDiv.innerHTML += `<p class="submitted-command">&gt; ${command}</p><p>${output}</p>`; // Using <p> tags for output
        outputDiv.scrollTop = outputDiv.scrollHeight; // Scroll to the bottom
    }
});
