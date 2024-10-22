export const commands = [
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
        output: '- UPH College (2020 - 2023)\n- Information Systems, BINUS University (2023 - Present)'
    },
    {
        command: 'skills',
        output: `- Frontend \tHTML, CSS, JavaScript, Bootstrap, jQuery
- Backend \tLaravel, PHP, Node.js, NPM, Express.js
- Database \tT-SQL, MySQL, SQLite, PostgreSQL, MongoDB
- Tools \tFigma, Visual Paradigm, Postman, Eclipse
- Others \tA&DS in C, OOP in Java, JavaFX`
    },
    {
        command: 'contact',
        output: `<a href="https://www.linkedin.com/in/kennedy-surianto/" class="command-link" target="_blank">LinkedIn</a>
<a href="mailto:kennedysrnt@gmail.com" class="command-link" target="_blank">Email</a>
<a href="https://github.com/KennedySurianto" class="command-link" target="_blank">GitHub</a>`
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
