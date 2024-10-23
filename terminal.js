import { commands } from './commands.js';

document.addEventListener('DOMContentLoaded', () => {
    const commandInput = document.getElementById('commandInput');
    const outputDiv = document.getElementById('output');
    let autoClearEnabled = true;
    const history = [];
    let historyIndex = -1;
    let matchingCommands = [];
    let suggestionIndex = -1;

    // Handle keydown event
    commandInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            const command = commandInput.value.trim();
            if (command !== '') {
                history.push(command);
                historyIndex = history.length;
                processCommand(command);
            }
            commandInput.value = '';
            suggestionIndex = -1;
            matchingCommands = [];
        } else if (event.key === 'ArrowUp') {
            if (historyIndex > 0) {
                historyIndex--;
                commandInput.value = history[historyIndex];
            }
        } else if (event.key === 'ArrowDown') {
            if (historyIndex < history.length - 1) {
                historyIndex++;
                commandInput.value = history[historyIndex];
            } else {
                historyIndex = history.length;
                commandInput.value = '';
            }
        } else if (event.key === 'Tab') {
            event.preventDefault();
            if (commandInput.value.trim() === '') return;

            if (suggestionIndex === -1) {
                matchingCommands = commands.filter(cmd => cmd.command.startsWith(commandInput.value.trim()));
            }

            if (matchingCommands.length > 0) {
                suggestionIndex = (suggestionIndex + 1) % matchingCommands.length;
                commandInput.value = matchingCommands[suggestionIndex].command;
            }
        }
    });

    // Handle suggestion button clicks
    const suggestionButtons = document.querySelectorAll('.suggestion-btn');
    suggestionButtons.forEach(button => {
        button.addEventListener('click', function () {
            const command = this.getAttribute('data-command'); // Get the command from data attribute
            commandInput.value = command; // Set the input value to the command
            commandInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' })); // Simulate Enter key press
            commandInput.focus(); // Set focus back to the input field
        });
    });

    function processCommand(command) {
        const matchedCommand = commands.find(cmd => cmd.command === command.toLowerCase());
        if (matchedCommand) {
            if (matchedCommand.action === 'clear') {
                outputDiv.textContent = '';
                return;
            } else if (matchedCommand.action === 'autoclear') {
                autoClearEnabled = !autoClearEnabled;
                matchedCommand.output = `Auto-clear is ${(autoClearEnabled) ? "enabled" : "disabled"}.`;
            }

            if (autoClearEnabled) {
                outputDiv.textContent = '';
            }

            outputDiv.innerHTML += `<div><p class="submitted-command">&gt; ${command}</p><p>${matchedCommand.output}</p></div>`;
        } else {
            if (autoClearEnabled) {
                outputDiv.textContent = '';
            }
            outputDiv.innerHTML += `<div><p class="submitted-command">&gt; ${command}</p><p>Command not recognized: ${command}</p></div>`;
        }

        outputDiv.scrollTop = outputDiv.scrollHeight;

        const commandLinks = document.querySelectorAll('.command-link');
        commandLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                const command = this.getAttribute('data-command');
                processCommand(command);
            });
        });
    }
});
