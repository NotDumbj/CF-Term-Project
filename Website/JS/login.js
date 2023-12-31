let registeredUsers = [];

        function signup(event) {
            event.preventDefault();
            console.log("Signup function called");

            const username = document.getElementById('signupUsername').value;
            const password = document.getElementById('signupPassword').value;

            const userExists = registeredUsers.some(user => user.username === username);

            if (userExists) {
                alert('Username already exists. Please choose a different username.');
            } else {
                registeredUsers.push({ username, password });
                alert('Registration successful! Now you can login.');
                showLogin();
            }
        }

        function login(event) {
            event.preventDefault();
            console.log("Login function called");

            const username = document.getElementById('loginUsername').value;
            const password = document.getElementById('loginPassword').value;

            const user = registeredUsers.find(user => user.username === username && user.password === password);

            if (user) {
                alert('Login successful! You can access the website now.');
                window.location.href = 'home.html';
            } else {
                alert('Invalid username or password');
            }
        }

        function showSignup() {
            document.getElementById('formContainer').classList.add('show-signup');
            document.getElementById('formContainer').classList.remove('show-login');
        }

        function showLogin() {
            document.getElementById('formContainer').classList.remove('show-signup');
            document.getElementById('formContainer').classList.add('show-login');
        }