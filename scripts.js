document.addEventListener('DOMContentLoaded', () => {
    canvas();

    const commandInput = document.getElementById('commandInput');
    const outputDiv = document.getElementById('output');
    let autoClearEnabled = true;
    const history = [];
    let historyIndex = -1;
    let matchingCommands = []; // Store matching commands
    let suggestionIndex = -1; // Track the current suggestion index

    // List of commands as JSON
    const commands = [
        {
            command: 'help',
            output: 'Available commands: \n' +
                '<a href="#" class="command-link" data-command="help">help</a>\t\tDisplay this help message<br>' +
                '<a href="#" class="command-link" data-command="clear">clear</a>\t\tClear the output<br>' +
                '<a href="#" class="command-link" data-command="autoclear">autoclear</a>\tToggle autoclear<br>' +
                '<br><a href="#" class="command-link" data-command="whoami">whoami</a>\t\tGet to know who I am<br>' +
                '<a href="#" class="command-link" data-command="experience">experience</a>\tList my work experience<br>' +
                '<a href="#" class="command-link" data-command="education">education</a>\tList my education background<br>' +
                '<a href="#" class="command-link" data-command="skills">skills</a>\t\tList my key skills<br>' +
                '<a href="#" class="command-link" data-command="projects">projects</a>\tShow my key projects<br>' +
                '<a href="#" class="command-link" data-command="contact">contact</a>\t\tDisplay contact information'
        },
        {
            command: 'clear',
            output: '', // No output since this clears the terminal
            action: 'clear'
        },
        {
            command: 'whoami',
            output: 'My name is Kennedy Surianto, and I proudly balance my role as a part-time software laboratory assistant with my studies at BINUS Alam Sutera, where I major in Information Systems. \n\nIn my position, I teach several classes covering a variety of coding languages and tools, sharing my passion for technology with my fellow students. I strive to create an engaging learning environment, helping others to navigate the complexities of programming while fostering their curiosity and creativity. \n\nEvery day, I aim to make coding as fun as possible—after all, if we’re not having a good laugh while debugging, are we really coding at all?'
        },
        {
            command: 'experience',
            output: '- Intern at PT Digital Mediatama Maxima TBK (2022)\n- Part-time Software Lab Assistant at BINUS (2024 - Present)'
        },
        {
            command: 'education',
            output: 'Student of Information Systems, BINUS University (2023 - Present)'
        },
        {
            command: 'skills',
            output: `- Web Design \t\tHTML, CSS, JavaScript, Bootstrap, jQuery
- Web Programming \tLaravel, PHP, NodeJS, NPM, ExpressJS
- Database \t\tT-SQL, MySQL, SQLite, PostgreSQL, MongoDB
- Tools \t\tFigma, Visual Paradigm, Postman, Eclipse
- Others \t\tA&DS using C, OOP using Java, JavaFX, Git`
        },
        {
            command: 'contact',
            output: `Email\t\t<a href="mailto:kennedysrnt@gmail.com" class="command-link" target="_blank">kennedysrnt@gmail.com</a>
LinkedIn\t<a href="https://www.linkedin.com/in/kennedy-surianto/" class="command-link" target="_blank">https://www.linkedin.com/in/kennedy-surianto/</a>
GitHub\t\t<a href="https://github.com/KennedySurianto" class="command-link" target="_blank">https://github.com/KennedySurianto</a>`
        },
        {
            command: 'projects',
            output: `- <a href="https://github.com/kennedysurianto/pulse" class="command-link" target="_blank">Pulse</a>: Real-time messaging platform
    NodeJS, ExpressJS, PostgreSQL

- <a href="https://github.com/kennedysurianto/click-and-checkout" class="command-link" target="_blank">Click & Checkout</a>: Online Retail Platform
    NodeJS, ExpressJS, PostgreSQL

- <a href="https://github.com/kennedysurianto/artisan-fragrance-backend" class="command-link" target="_blank">Artisan Fragrance</a>: Online Fragrance Retail Platform
    MERN Stack

- <a href="https://github.com/kennedysurianto/cue-haven" class="command-link" target="_blank">Cue Haven</a>: Billiard Billing System
    JavaFX, PostgreSQL`
        },
        {
            command: 'autoclear',
            output: '',
            action: 'autoclear'
        }
    ];

    // Handle Enter key down in input
    commandInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            const command = commandInput.value.trim(); // Get and trim the input
            if (command !== '') {
                history.push(command);
                historyIndex = history.length; // Reset history index
                processCommand(command); // Process the command
            }
            commandInput.value = ''; // Clear the input field
            suggestionIndex = -1; // Reset suggestion index
            matchingCommands = []; // Clear matching commands
        } else if (event.key === 'ArrowUp') {
            // Navigate up in history
            if (historyIndex > 0) {
                historyIndex--;
                commandInput.value = history[historyIndex];
            }
        } else if (event.key === 'ArrowDown') {
            // Navigate down in history
            if (historyIndex < history.length - 1) {
                historyIndex++;
                commandInput.value = history[historyIndex];
            } else {
                historyIndex = history.length; // Reset index if at the bottom
                commandInput.value = ''; // Clear input if at the bottom
            }
        } else if (event.key === 'Tab') {
            event.preventDefault(); // Prevent default tab behavior

            if (commandInput.value.trim() === '') {
                return;
            }

            // Check if it's the first Tab press or subsequent presses
            if (suggestionIndex === -1) {
                // First tab press: find all matching commands
                matchingCommands = commands.filter(cmd =>
                    cmd.command.startsWith(commandInput.value)
                );
            }

            // If we have matching commands, cycle through them
            if (matchingCommands.length > 0) {
                suggestionIndex = (suggestionIndex + 1) % matchingCommands.length; // Cycle index
                commandInput.value = matchingCommands[suggestionIndex].command; // Set the command
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

    // Process the command using the JSON list
    function processCommand(command) {
        const matchedCommand = commands.find(cmd => cmd.command === command.toLowerCase());

        if (matchedCommand) {
            // Check if action is 'clear'
            if (matchedCommand.action === 'clear') {
                outputDiv.textContent = ''; // Clear the output
                return; // Exit function early
            } else if (matchedCommand.action === 'autoclear') {
                autoClearEnabled = !autoClearEnabled;
                matchedCommand.output = `Auto-clear is ${(autoClearEnabled) ? "enabled" : "disabled"}.`;
            }

            // Check if autoclear is enabled
            if (autoClearEnabled) {
                outputDiv.textContent = ''; // Clear the output
            }

            // Display the command and its output in the output area
            outputDiv.innerHTML += `<div><p class="submitted-command">&gt; ${command}</p><p>${matchedCommand.output}</p></div>`;
        } else {
            // Check if autoclear is enabled
            if (autoClearEnabled) {
                outputDiv.textContent = ''; // Clear the output
            }
            // Handle unknown commands
            outputDiv.innerHTML += `<div><p class="submitted-command">&gt; ${command}</p><p>Command not recognized: ${command}</p></div>`;
        }

        outputDiv.scrollTop = outputDiv.scrollHeight; // Scroll to the bottom

        // Add event listeners to dynamically created command links
        const commandLinks = document.querySelectorAll('.command-link');
        commandLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault(); // Prevent default anchor behavior
                const command = this.getAttribute('data-command');
                processCommand(command); // Trigger the command when link is clicked
            });
        });
    }
});


function canvas() {
    const canvas = document.getElementById('matrixCanvas');
    const ctx = canvas.getContext('2d');

    // Characters to display
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const fontSize = 16; // Size of the characters
    let columns = Math.floor(canvas.width / fontSize); // Number of columns for the characters

    // Array to keep track of y positions of each column
    let drops = Array(columns).fill(1); // Start each column at 1

    function resizeCanvas() {
        // Set canvas width and height to match the window size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Recalculate columns based on the new width
        columns = Math.floor(canvas.width / fontSize);
        // Reset drops array for the new columns
        drops = Array(columns).fill(1);
    }

    function draw() {
        // Clear the canvas with a slightly transparent black rectangle to create the trail effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#0F0'; // Green color for the characters
        ctx.font = `${fontSize}px monospace`;

        // Draw characters
        for (let i = 0; i < drops.length; i++) {
            const text = characters.charAt(Math.floor(Math.random() * characters.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            // Reset drop position if it reaches the bottom
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            // Increment the drop position
            drops[i]++;
        }
    }

    // Add the event listener for window resize
    window.addEventListener('resize', resizeCanvas);

    // Initialize the canvas size when the page loads
    resizeCanvas();

    // Update the canvas every 50 milliseconds to animate the effect
    setInterval(draw, 50);
}