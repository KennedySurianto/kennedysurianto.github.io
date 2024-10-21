document.addEventListener('DOMContentLoaded', () => {
    canvas();

    const commandInput = document.getElementById('commandInput');
    const outputDiv = document.getElementById('output');
    let autoClearEnabled = true;

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
                '<a href="#" class="command-link" data-command="contact">contact</a>\t\tDisplay contact information<br>' +
                '<a href="#" class="command-link" data-command="projects">projects</a>\tShow my key projects' 
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
            output: '- Part-time Software Lab Assistant at BINUS (2023 - Present)\n- Intern at TechCorp (2022)\n- Freelance Web Developer (2021 - Present)'
        },
        {
            command: 'education',
            output: 'Bachelor of Information Systems, BINUS University (2020 - 2024)'
        },
        {
            command: 'skills',
            output: '- Programming: JavaScript, Python, R, PHP\n- Web Development: HTML, CSS, Node.js, Laravel\n- Data Analysis: R, Python\n- Tools: Git, RapidMiner, Three.js'
        },
        {
            command: 'contact',
            output: 'Email: kennedy.surianto@example.com\nLinkedIn: linkedin.com/in/kennedysurianto\nGitHub: github.com/kennedysurianto'
        },
        {
            command: 'projects',
            output: '- Online Course Website: Built with Laravel and Bootstrap\n- 3D Classroom Simulation: Built using Three.js\n- Anime Dataset Visualization: Created using R'
        },
        {
            command: 'autoclear',
            output: `Auto-clear is ${(autoClearEnabled) ? "enabled" : "disabled"}.`,
            action: 'autoclear'
        }
    ];

    // Handle Enter key press in input
    commandInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') { // Check if the Enter key was pressed
            const command = commandInput.value.trim(); // Get and trim the input
            processCommand(command); // Process the command
            commandInput.value = ''; // Clear the input field
        }
    });

    // Handle suggestion button clicks
    const suggestionButtons = document.querySelectorAll('.suggestion-btn');
    suggestionButtons.forEach(button => {
        button.addEventListener('click', function () {
            const command = this.getAttribute('data-command'); // Get the command from data attribute
            commandInput.value = command; // Set the input value to the command
            commandInput.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' })); // Simulate Enter key press
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
            }
            
            // Check if autoclear is enabled
            if (autoClearEnabled) {
                outputDiv.textContent = ''; // Clear the output
            }
            
            // Display the command and its output in the output area
            outputDiv.innerHTML += `<p class="submitted-command">&gt; ${command}</p><p>${matchedCommand.output}</p>`;
        } else {
            // Check if autoclear is enabled
            if (autoClearEnabled) {
                outputDiv.textContent = ''; // Clear the output
            }
            // Handle unknown commands
            outputDiv.innerHTML += `<p class="submitted-command">&gt; ${command}</p><p>Command not recognized: ${command}</p>`;
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

    // Set the canvas to full screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Characters to display
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const fontSize = 16; // Size of the characters
    const columns = Math.floor(canvas.width / fontSize); // Number of columns for the characters

    // Array to keep track of y positions of each column
    const drops = Array.from({ length: columns }).fill(1); // Start each column at 1

    function draw() {
        // Clear the canvas
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'; // Slightly transparent to create a trail effect
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#0F0'; // Green color for the characters
        ctx.font = `${fontSize}px monospace`;

        // Draw characters
        for (let i = 0; i < drops.length; i++) {
            const text = characters.charAt(Math.floor(Math.random() * characters.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            // Reset drop position if it reaches the bottom
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0; // Reset position
            }

            // Increment the drop position
            drops[i]++;
        }
    }

    // Update the canvas every 50 milliseconds
    setInterval(draw, 50);
}